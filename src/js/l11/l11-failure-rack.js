(() => {
  "use strict";

  const data = window.FFDG_L11_DATA;
  if (!data) return;

  const $ = id => document.getElementById(id);
  const boardStationOrder = ["FLA", "PRET", "FLB", "AST", "FCT", "RIN", "FLC", "DCC", "PT1", "HPT", "RST"];
  const stationOrder = [
    ...boardStationOrder.filter(station => data.stations.includes(station)),
    ...data.stations.filter(station => !boardStationOrder.includes(station))
  ];
  const caseById = new Map(data.catalog.map(item => [item.id, item]));
  const procedureById = new Map(data.procedures.map(item => [item.id, item]));
  const state = {
    query: "",
    failure: null,
    procedureIds: [],
    procedureId: "",
    groupIndex: 0,
    stepIndex: 0,
    focusTarget: null
  };

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function normalized(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function currentProcedure() {
    return procedureById.get(state.procedureId) || null;
  }

  function currentGroup() {
    const groups = currentProcedure()?.stepGroups || [];
    return groups[state.groupIndex] || null;
  }

  function filteredCatalog() {
    const query = normalized(state.query.trim());
    return data.catalog.filter(item => {
      if (!query) return true;
      const searchable = normalized([
        item.station,
        item.errorCode,
        item.description,
        item.failureType,
        item.isSupplemental ? "source fa detail" : "station index"
      ].join(" "));
      return searchable.includes(query);
    });
  }

  function renderCatalog() {
    const items = filteredCatalog();
    window.FFDG_L11_STATION_BOARD.render({
      host: $("l11-station-board"),
      stationOrder,
      items,
      onSelect: selectFailure,
      showAllMatches: Boolean(state.query.trim())
    });
    $("l11-results-count").textContent = `${items.length} of ${data.catalog.length} failures`;
    $("l11-empty-state").hidden = items.length !== 0;
  }

  function addRecordField(host, label, value) {
    const field = element("div", "l11-record-field");
    field.append(element("span", "l11-record-label", label), element("strong", "l11-record-value", value || "Not specified in source"));
    host.append(field);
  }

  function renderRecord(item) {
    const host = $("l11-record-content");
    host.replaceChildren();
    const tags = element("div", "l11-record-tags");
    item.stations.forEach(station => tags.append(element("span", "l11-tag l11-tag-station", station)));
    if (item.failureType) tags.append(element("span", "l11-tag", item.failureType));
    tags.append(element("span", `l11-tag ${item.isSupplemental ? "l11-tag-source" : ""}`, item.isSupplemental ? "FA PDF detail" : "Station index"));
    host.append(tags);

    addRecordField(host, "Error Code", item.errorCode);
    addRecordField(host, "Failure Type", item.failureType || "Uncategorized in source");

    const descriptionBlock = element("div", "l11-record-description");
    descriptionBlock.append(element("span", "l11-record-label", "Error Description"));
    (item.description || "No description in the station index.").split(/\n+/).forEach(description => {
      descriptionBlock.append(element("p", "", description));
    });
    host.append(descriptionBlock);

    const sourcePage = item.isSupplemental
      ? `FA record · PDF page${item.sourcePages?.length > 1 ? "s" : ""} ${item.sourcePages?.join(", ") || item.sourcePage}`
      : `Station index · PDF page ${item.indexPage}`;
    addRecordField(host, "Source", sourcePage);
  }

  function procedureLabel(procedure) {
    const detail = procedure.failureType || procedure.descriptions?.[0] || "FA procedure";
    const page = procedure.sourcePages?.length > 1
      ? `PDF pp. ${procedure.sourcePages.join("–")}`
      : `PDF p. ${procedure.sourcePage}`;
    return `${detail} · ${page}`;
  }

  function fillProcedureOptions() {
    const select = $("l11-procedure-select");
    const wrap = $("l11-procedure-select-wrap");
    const available = state.procedureIds.filter(id => procedureById.has(id));
    state.procedureIds = available;
    if (!available.length) {
      state.procedureId = "";
      wrap.hidden = true;
      select.replaceChildren();
      return;
    }
    if (!available.includes(state.procedureId)) state.procedureId = available[0];
    wrap.hidden = available.length < 2;
    select.replaceChildren();
    available.forEach(id => {
      const option = element("option", "", procedureLabel(procedureById.get(id)));
      option.value = id;
      option.selected = id === state.procedureId;
      select.append(option);
    });
  }

  function renderStepGroupOptions(procedure) {
    const select = $("l11-step-group-select");
    const wrap = $("l11-step-group-wrap");
    const groups = procedure?.stepGroups || [];
    if (!groups.length) {
      wrap.hidden = true;
      select.replaceChildren();
      state.groupIndex = 0;
      return;
    }
    state.groupIndex = Math.min(state.groupIndex, groups.length - 1);
    wrap.hidden = groups.length < 2;
    select.replaceChildren();
    groups.forEach((group, index) => {
      const option = element("option", "", `${group.label} · ${group.steps.length} steps`);
      option.value = String(index);
      option.selected = index === state.groupIndex;
      select.append(option);
    });
  }

  function renderStepList(procedure) {
    const group = currentGroup();
    const host = $("l11-step-list");
    const noSteps = $("l11-no-steps");
    host.replaceChildren();

    if (!group?.steps?.length) {
      noSteps.hidden = false;
      $("l11-prev-step").hidden = true;
      $("l11-next-step").hidden = true;
      noSteps.textContent = procedure
        ? "The source PDF does not list FA steps for this failure. Check the related source details when available."
        : "No exact FA procedure was found for this indexed failure in the supplied PDF.";
      $("l11-step-progress").textContent = procedure ? procedureLabel(procedure) : "No source procedure linked";
      $("l11-step-progress-fill").style.width = "0%";
      $("l11-source-details").hidden = !procedure?.sourceText;
      $("l11-source-text").textContent = procedure?.sourceText || "";
      return;
    }

    noSteps.hidden = true;
    $("l11-prev-step").hidden = false;
    $("l11-next-step").hidden = false;
    state.stepIndex = Math.min(state.stepIndex, group.steps.length - 1);
    group.steps.forEach((step, index) => {
      const item = element("li", `l11-step-item${index === state.stepIndex ? " is-active" : ""}`);
      item.dataset.stepIndex = String(index);
      item.append(element("span", "l11-step-number", String(step.number)), element("span", "l11-step-copy", step.text));
      if (step.substeps?.length) {
        const substeps = element("ul", "l11-step-sublist");
        step.substeps.forEach(copy => substeps.append(element("li", "", copy)));
        item.append(substeps);
      }
      host.append(item);
    });
    $("l11-step-progress").textContent = `Step ${state.stepIndex + 1} of ${group.steps.length} · ${procedureLabel(procedure)}`;
    $("l11-step-progress-fill").style.width = `${((state.stepIndex + 1) / group.steps.length) * 100}%`;
    $("l11-prev-step").disabled = state.stepIndex === 0;
    $("l11-next-step").disabled = state.stepIndex >= group.steps.length - 1;
    $("l11-source-details").hidden = !procedure?.sourceText;
    $("l11-source-text").textContent = procedure?.sourceText || "";
  }

  function wrapText(value, maxLength) {
    const lines = [];
    let line = "";
    String(value || "").split(/\s+/).forEach(word => {
      while (word.length > maxLength) {
        if (line) { lines.push(line); line = ""; }
        lines.push(word.slice(0, maxLength));
        word = word.slice(maxLength);
      }
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length > maxLength && line) {
        lines.push(line);
        line = word;
      } else line = candidate;
    });
    if (line) lines.push(line);
    return lines.length ? lines : [""];
  }

  function derivedFlowchart(group) {
    const ns = "http://www.w3.org/2000/svg";
    const width = 680;
    const x = 56;
    const boxWidth = 568;
    const gap = 28;
    const rows = group.steps.map(step => {
      const lines = wrapText(`Step ${step.number}: ${step.text}`, 68);
      (step.substeps || []).forEach(substep => wrapText(`• ${substep}`, 68).forEach(line => lines.push(line)));
      return { step, lines, height: Math.max(64, 28 + lines.length * 18) };
    });
    const height = 28 + rows.reduce((sum, row) => sum + row.height + gap, 0);
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Step sequence derived from the source FA steps; no decision branches added");
    svg.classList.add("l11-derived-flowchart");
    const title = document.createElementNS(ns, "title");
    title.textContent = "Source FA steps shown as a sequential route";
    svg.append(title);

    const defs = document.createElementNS(ns, "defs");
    const marker = document.createElementNS(ns, "marker");
    marker.setAttribute("id", "l11-flow-arrow");
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "6");
    marker.setAttribute("markerHeight", "6");
    marker.setAttribute("orient", "auto-start-reverse");
    const arrow = document.createElementNS(ns, "path");
    arrow.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
    arrow.setAttribute("fill", "#55783b");
    marker.append(arrow);
    defs.append(marker);
    svg.append(defs);

    let y = 16;
    rows.forEach((row, index) => {
      if (index > 0) {
        const connector = document.createElementNS(ns, "path");
        connector.setAttribute("d", `M ${width / 2} ${y - gap + 2} V ${y - 6}`);
        connector.setAttribute("stroke", "#55783b");
        connector.setAttribute("stroke-width", "2");
        connector.setAttribute("marker-end", "url(#l11-flow-arrow)");
        svg.append(connector);
      }
      const rect = document.createElementNS(ns, "rect");
      rect.setAttribute("x", String(x));
      rect.setAttribute("y", String(y));
      rect.setAttribute("width", String(boxWidth));
      rect.setAttribute("height", String(row.height));
      rect.setAttribute("rx", "12");
      rect.classList.add(index === state.stepIndex ? "l11-derived-node-active" : "l11-derived-node");
      svg.append(rect);
      const text = document.createElementNS(ns, "text");
      text.setAttribute("x", String(width / 2));
      text.setAttribute("y", String(y + 22));
      text.setAttribute("text-anchor", "middle");
      text.classList.add("l11-derived-node-label");
      row.lines.forEach((line, lineIndex) => {
        const tspan = document.createElementNS(ns, "tspan");
        tspan.setAttribute("x", String(width / 2));
        tspan.setAttribute("dy", lineIndex === 0 ? "0" : "18");
        tspan.textContent = line;
        text.append(tspan);
      });
      svg.append(text);
      y += row.height + gap;
    });
    return svg;
  }

  function renderFlowchart(procedure) {
    const host = $("l11-flowchart-preview");
    const sourceLabel = $("l11-flow-source");
    const note = $("l11-flow-note");
    const openButton = $("l11-flowchart-open");
    const controls = $("l11-step-controls");
    const syncControlsVisibility = () => {
      const hasStepControls = !$("l11-prev-step").hidden || !$("l11-next-step").hidden;
      controls.hidden = !hasStepControls && openButton.hidden;
    };
    host.replaceChildren();
    openButton.hidden = true;

    if (procedure?.flowchartImage) {
      const image = element("img", "l11-source-flowchart");
      image.src = procedure.flowchartImage;
      image.alt = `Source flowchart from PDF page ${procedure.flowchartPage}`;
      image.dataset.flowchartTitle = state.failure?.errorCode || procedure.id || "L11";
      if (procedure.flowchartHiResImage) {
        image.dataset.flowchartHiResSrc = procedure.flowchartHiResImage;
        image.dataset.flowchartDpi = String(procedure.flowchartDpi || 400);
      }
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => {
        host.replaceChildren(element("p", "l11-no-flowchart", "The source flowchart image could not be loaded."));
        openButton.hidden = true;
        syncControlsVisibility();
      }, { once: true });
      host.append(image);
      sourceLabel.textContent = `Source PDF · page ${procedure.flowchartPage}`;
      note.textContent = "Original flowchart extracted from the supplied L11 PDF.";
      openButton.hidden = false;
      syncControlsVisibility();
      return;
    }

    const group = currentGroup();
    if (group?.steps?.length) {
      const svg = derivedFlowchart(group);
      svg.dataset.flowchartTitle = state.failure?.errorCode || procedure?.id || "L11";
      host.append(svg);
      sourceLabel.textContent = "Derived sequence · source FA steps";
      note.textContent = "Sequential view only. No Pass/Fail decisions or branches were added.";
      openButton.hidden = false;
      syncControlsVisibility();
      return;
    }

    sourceLabel.textContent = procedure ? "No source flowchart" : "No linked FA procedure";
    note.textContent = "The supplied PDF does not document a flowchart or FA step sequence for this failure.";
    host.append(element("p", "l11-no-flowchart", "No flowchart documented for this failure."));
    openButton.hidden = true;
    syncControlsVisibility();
  }

  function renderProcedure() {
    fillProcedureOptions();
    const procedure = currentProcedure();
    renderStepGroupOptions(procedure);
    renderStepList(procedure);
    window.FFDG_L11_REFERENCE_VIEW?.render($("l11-reference-images"), procedure, state.failure?.errorCode);
    renderFlowchart(procedure);
  }

  function selectFailure(item, trigger) {
    state.failure = item;
    state.focusTarget = trigger;
    state.procedureIds = (item.procedureIds || []).filter(id => procedureById.has(id));
    state.procedureId = state.procedureIds[0] || "";
    state.groupIndex = 0;
    state.stepIndex = 0;
    $("l11-board-view").hidden = true;
    $("l11-detail-view").hidden = false;
    const label = item.description.split(/\n+/)[0] || item.errorCode;
    $("l11-detail-heading").textContent = `Failure details · ${label}`;
    renderRecord(item);
    renderProcedure();
    requestAnimationFrame(() => $("l11-detail-heading").focus({ preventScroll: true }));
  }

  function backToCatalog() {
    $("l11-detail-view").hidden = true;
    $("l11-board-view").hidden = false;
    state.failure = null;
    state.procedureId = "";
    requestAnimationFrame(() => state.focusTarget?.focus({ preventScroll: true }));
  }

  function updateStep(direction) {
    const group = currentGroup();
    if (!group?.steps?.length) return;
    state.stepIndex = Math.max(0, Math.min(group.steps.length - 1, state.stepIndex + direction));
    renderStepList(currentProcedure());
    renderFlowchart(currentProcedure());
  }

  $("l11-case-count").textContent = String(data.catalog.length);
  $("nav-l11-summary").textContent = `${data.stations.length} stations · ${data.catalog.length} failure records`;
  renderCatalog();

  function syncL11ThemeButton() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    const label = dark ? "Day Mode" : "Night Mode";
    const currentIcon = $("theme-icon");
    if (currentIcon) $("l11-theme-icon").innerHTML = currentIcon.innerHTML;
    $("l11-theme-label").textContent = label;
    $("l11-theme-toggle").setAttribute("aria-label", label);
    $("l11-theme-toggle").title = label;
  }

  $("nav-l11").addEventListener("click", () => window.FFDG?.ui?.setMode("l11"));
  $("l11-catalog-all").addEventListener("click", () => {
    state.query = "";
    $("l11-search").value = "";
    renderCatalog();
    $("l11-search").focus({ preventScroll: true });
  });
  $("l11-search").addEventListener("input", event => {
    state.query = event.currentTarget.value;
    renderCatalog();
  });
  syncL11ThemeButton();
  $("l11-theme-toggle").addEventListener("click", () => {
    window.FFDG?.ui?.toggleTheme();
    syncL11ThemeButton();
  });
  $("l11-update-pdf").addEventListener("click", () => $("mtf-pdf-file-input").click());
  $("l11-back-to-catalog").addEventListener("click", backToCatalog);
  $("l11-procedure-select").addEventListener("change", event => {
    state.procedureId = event.currentTarget.value;
    state.groupIndex = 0;
    state.stepIndex = 0;
    renderProcedure();
  });
  $("l11-step-group-select").addEventListener("change", event => {
    state.groupIndex = Number(event.currentTarget.value) || 0;
    state.stepIndex = 0;
    renderProcedure();
  });
  $("l11-prev-step").addEventListener("click", () => updateStep(-1));
  $("l11-next-step").addEventListener("click", () => updateStep(1));
})();
