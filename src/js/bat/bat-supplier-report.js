(() => {
  "use strict";

  const FFDG = window.FFDG;
  const $ = id => document.getElementById(id);
  const drafts = new Map();

  function caseKey(failure) {
    return String(failure?.uid || `${failure?.code || "BAT"}::${failure?.label || ""}`);
  }

  function snapshot(form) {
    return Array.from(form.elements)
      .filter(field => field.name && field.type !== "file" && !(field instanceof HTMLButtonElement))
      .map(field => [field.name, field.value]);
  }

  function saveDraft(key, form, announce = false) {
    if (!key || !form) return false;
    drafts.set(key, snapshot(form));
    if (announce) {
      const status = $("bat-no-boot-report-status");
      status.textContent = "Borrador guardado solo en esta sesión del navegador. No se envió al servidor.";
      status.style.color = "var(--md-sys-color-on-surface-variant)";
    }
    return true;
  }

  function restoreDraft(key, form) {
    const saved = drafts.get(key);
    if (!saved) return false;
    saved.forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (field && !(field instanceof RadioNodeList)) field.value = value;
    });
    updateProgress(form);
    return true;
  }

  function renderSteps(steps) {
    const list = $("bat-supplier-step-list");
    list.replaceChildren();
    if (!steps.length) {
      const empty = document.createElement("li");
      empty.className = "bat-supplier-step-empty";
      empty.textContent = "No hay pasos BAT asociados a esta falla en el catálogo actual.";
      list.appendChild(empty);
      return;
    }

    steps.forEach((step, index) => {
      const item = document.createElement("li");
      item.className = "bat-supplier-step-row";
      item.dataset.stepIndex = String(index);

      const number = document.createElement("span");
      number.className = "bat-supplier-step-number";
      number.textContent = String(step.sourceNumber || index + 1);

      const content = document.createElement("div");
      content.className = "bat-supplier-step-copy";
      const title = document.createElement("strong");
      title.textContent = step.title || `Paso ${index + 1}`;
      content.appendChild(title);
      if (step.detail) {
        const detail = document.createElement("small");
        detail.textContent = step.detail;
        content.appendChild(detail);
      }

      const resultLabel = document.createElement("label");
      resultLabel.className = "bat-supplier-step-result";
      resultLabel.textContent = "Observed result / Resultado";
      const result = document.createElement("select");
      result.className = "m3-select";
      result.name = `diagnosticStepResult${index}`;
      result.setAttribute("aria-label", `Resultado observado, paso ${step.sourceNumber || index + 1}: ${step.title || "validación BAT"}`);
      [["", "Not recorded / No registrado"], ["Pass", "Pass"], ["Fail", "Fail"], ["N/A", "Not applicable / No aplica"]]
        .forEach(([value, label]) => result.add(new Option(label, value)));
      resultLabel.appendChild(result);

      const noteLabel = document.createElement("label");
      noteLabel.className = "bat-supplier-step-note";
      noteLabel.textContent = "Evidence note / Observación";
      const note = document.createElement("input");
      note.className = "m3-input";
      note.type = "text";
      note.name = `diagnosticStepNote${index}`;
      note.maxLength = 240;
      note.placeholder = "Optional result detail";
      noteLabel.appendChild(note);

      item.append(number, content, resultLabel, noteLabel);
      list.appendChild(item);
    });
  }

  function updateProgress(form = $("bat-no-boot-report-form")) {
    if (!form) return;
    const hasResponse = names => names.some(name => String(form.elements.namedItem(name)?.value || "").trim());
    const technicalStarted = Array.from($("bat-supplier-step-list").querySelectorAll(".bat-supplier-step-row"))
      .some(row => row.querySelector('[name^="diagnosticStepResult"]')?.value || row.querySelector('[name^="diagnosticStepNote"]')?.value.trim());
    const evidenceAttached = ["bat-no-boot-evidence-before-preview", "bat-no-boot-evidence-after-preview"]
      .some(id => $(id)?.querySelector("img"));
    const sectionsStarted = [
      hasResponse(["part", "serial"]),
      technicalStarted,
      hasResponse(["supplierName", "supplierContact", "supplierContainment", "supplierResponseDeadline"]),
      hasResponse(["supplierRootCause", "supplierCorrective", "supplierPreventive"]),
      hasResponse(["supplierEffectiveness"]) || evidenceAttached,
    ];
    const completed = sectionsStarted.filter(Boolean).length;
    const meter = $("bat-supplier-progress");
    meter.value = completed;
    meter.setAttribute("aria-valuetext", `${completed} de ${sectionsStarted.length} secciones iniciadas`);
    $("bat-supplier-progress-label").textContent = `${completed} de ${sectionsStarted.length} secciones iniciadas`;
  }

  function collect(form) {
    const read = name => String(form.elements.namedItem(name)?.value || "").trim();
    const steps = Array.from($("bat-supplier-step-list").querySelectorAll(".bat-supplier-step-row")).map(row => ({
      number: row.querySelector(".bat-supplier-step-number")?.textContent || "",
      title: row.querySelector(".bat-supplier-step-copy strong")?.textContent || "",
      result: row.querySelector('[name^="diagnosticStepResult"]')?.value || "",
      note: row.querySelector('[name^="diagnosticStepNote"]')?.value.trim() || "",
    }));
    return {
      supplierReport: true,
      steps,
      supplierName: read("supplierName"),
      supplierContact: read("supplierContact"),
      supplierPartNumber: read("supplierPartNumber"),
      supplierDateCode: read("supplierDateCode"),
      supplierResponseDeadline: read("supplierResponseDeadline"),
      supplierContainment: read("supplierContainment"),
      supplierRootCause: read("supplierRootCause"),
      supplierCorrective: read("supplierCorrective"),
      supplierPreventive: read("supplierPreventive"),
      supplierPlannedDate: read("supplierPlannedDate"),
      supplierEffectiveness: read("supplierEffectiveness"),
    };
  }

  function appendCell(row, value, tag = "td") {
    const cell = document.createElement(tag);
    cell.textContent = value;
    row.appendChild(cell);
    return cell;
  }

  function renderPrint(report) {
    const section = $("bat-print-supplier-section");
    const isSupplierReport = Boolean(report?.supplierReport);
    section.classList.toggle("hidden", !isSupplierReport);
    if (!isSupplierReport) return;

    const stepsHost = $("bat-print-supplier-steps");
    stepsHost.replaceChildren();
    const steps = document.createElement("table");
    steps.className = "bat-print-supplier-step-table";
    const head = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Step", "BAT guide action / Acción", "Reported result / Resultado", "Evidence note / Observación"]
      .forEach(label => appendCell(headRow, label, "th"));
    head.appendChild(headRow);
    const body = document.createElement("tbody");
    (report.steps || []).forEach(step => {
      const row = document.createElement("tr");
      appendCell(row, step.number);
      appendCell(row, step.title);
      appendCell(row, step.result || "Not recorded / No registrado");
      appendCell(row, step.note || "—");
      body.appendChild(row);
    });
    steps.append(head, body);
    stepsHost.appendChild(steps);
    if (!report.steps?.length) {
      const empty = document.createElement("p");
      empty.textContent = "No hay pasos asociados en el catálogo BAT para esta falla.";
      stepsHost.appendChild(empty);
    }

    const response = $("bat-print-supplier-response");
    response.replaceChildren();
    const fields = [
      ["Supplier / Proveedor", [report.supplierName, report.supplierContact].filter(Boolean).join(" · ")],
      ["Supplier response due date", report.supplierResponseDeadline],
      ["Suspected component P/N", report.supplierPartNumber],
      ["Date code / Lot", report.supplierDateCode],
      ["Containment and affected scope", report.supplierContainment],
      ["Supplier root cause and contributing factors", report.supplierRootCause],
      ["Corrective action", report.supplierCorrective],
      ["Preventive action", report.supplierPreventive],
      ["Planned completion date", report.supplierPlannedDate],
      ["Effectiveness verification / Retest", report.supplierEffectiveness],
    ];
    fields.forEach(([label, value]) => {
      const item = document.createElement("div");
      item.className = "bat-print-supplier-response-item";
      const title = document.createElement("strong");
      title.textContent = label;
      const detail = document.createElement("span");
      detail.textContent = value || "Pending supplier response / Pendiente de respuesta del proveedor";
      item.append(title, detail);
      response.appendChild(item);
    });
  }

  const form = $("bat-no-boot-report-form");
  if (form) {
    const evidenceObserver = new MutationObserver(() => updateProgress(form));
    ["bat-no-boot-evidence-before-preview", "bat-no-boot-evidence-after-preview"].forEach(id => {
      const preview = $(id);
      if (preview) evidenceObserver.observe(preview, { childList: true, subtree: true });
    });
    form.addEventListener("input", () => updateProgress(form));
    form.addEventListener("change", () => updateProgress(form));
    $("bat-no-boot-report-save-draft")?.addEventListener("click", () => saveDraft(form.dataset.reportKey, form, true));
    document.querySelectorAll("[data-supplier-nav]").forEach(link => {
      link.addEventListener("click", () => {
        document.querySelectorAll("[data-supplier-nav]").forEach(item => item.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "step");
      });
    });
    $("bat-no-boot-report-dialog")?.addEventListener("close", () => {
      if (form.dataset.reportKey) saveDraft(form.dataset.reportKey, form, false);
    });
  }

  FFDG.batSupplierReport = { caseKey, saveDraft, restoreDraft, renderSteps, updateProgress, collect, renderPrint };
})();
