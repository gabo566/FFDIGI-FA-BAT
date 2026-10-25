  // 2. UI VIEW ENGINE & THEME MANAGER
  window.FFDG.ui = (() => {
    "use strict";
    const FFDG = window.FFDG;
    const $ = (id) => document.getElementById(id);
    const batFamilyLabel = label => ({
      "FRU / EEPROM (Bus I2C/SMBus)": "FRU / EEPROM (I2C/SMBus Bus)",
      "Sensores de Fuga Líquida": "Liquid Leak Sensors",
      "Ventiladores / Enfriamiento": "Fans / Cooling",
      "FPGA / CPLD / Lógica": "FPGA / CPLD / Logic",
      "No Boot / Secuencia Eléctrica": "No Boot / Power Sequence"
    }[label] || label);
    let currentStationFilter = 'ALL';
    function scrollMtfDetailIntoView() {
      const detail = $("mtf-detail");
      const panel = detail?.closest(".mtf-row-3");
      if (!detail) return;
      if (panel) panel.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
    function escapeHtml(str) {
      return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function formatStepDetail(text) {
      if (!text) return "";
      const lines = text.split("\n");
      let html = "";
      let inCode = false;
      let codeBuffer = [];
      function flushCode() {
        if (codeBuffer.length > 0) {
          const codeText = codeBuffer.join("\n");
          const escaped = escapeHtml(codeText);
          const encoded = encodeURIComponent(codeText);
          html += `<div class="m3-terminal-box">
          <div class="m3-terminal-bar">
            <div class="terminal-title-group">
              <span class="terminal-dot"></span><span class="terminal-dot"></span><span class="terminal-dot"></span>
              <span class="terminal-title">Bash / Console / IPMI</span>
            </div>
            <button class="terminal-copy-btn" type="button" onclick="navigator.clipboard.writeText(decodeURIComponent('${encoded}')); this.textContent='✓ Copiado'; setTimeout(() => this.textContent='Copiar', 1800);">Copiar</button>
          </div>
          <pre class="m3-terminal-code"><code>${escaped}</code></pre>
        </div>`;
          codeBuffer = [];
          inCode = false;
        }
      }
      for (let line of lines) {
        const trimmed = line.trim();
        const isCmd = trimmed.startsWith("$") ||
          trimmed.startsWith("sudo ") ||
          trimmed.startsWith("curl ") ||
          trimmed.startsWith("ipmitool ") ||
          trimmed.startsWith("python3 ") ||
          trimmed.startsWith("efibootmgr") ||
          trimmed.startsWith("BMC_USER=") ||
          trimmed.startsWith("BMC_PASSWORD=") ||
          trimmed.startsWith("BMC_IP=");
        if (isCmd) {
          inCode = true;
          codeBuffer.push(line);
        } else {
          if (inCode) flushCode();
          if (trimmed) {
            html += `<p class="m3-step-instruction-line">${escapeHtml(line)}</p>`;
          }
        }
      }
      if (inCode) flushCode();
      return html;
    }
    function initTheme() {
      const savedTheme = localStorage.getItem("ffdg-theme") || "light";
      setTheme(savedTheme);
    }
    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("ffdg-theme", theme);
      const isDark = theme === "dark";
      $("theme-text").textContent = isDark ? "Day Mode" : "Night Mode";
      $("theme-icon").innerHTML = isDark
        ? '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>'
        : '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>';
    }
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme === "light" ? "dark" : "light");
    }
    function runMotionTransition(update) {
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || typeof document.startViewTransition !== "function") {
        update();
        return;
      }
      let didUpdate = false;
      const applyUpdate = () => {
        didUpdate = true;
        update();
      };
      try {
        const transition = document.startViewTransition(applyUpdate);
        transition?.finished?.catch(() => {});
      } catch (error) {
        if (didUpdate) throw error;
        update();
      }
    }
    function setMode(mode) {
      const isBat = mode === "bat";
      FFDG.state.mode = mode;
      $("nav-bat").classList.toggle("active", isBat);
      $("nav-mtf").classList.toggle("active", !isBat);
      $("bat-layout").classList.toggle("hidden", !isBat);
      $("mtf-layout").classList.toggle("hidden", isBat);
      if (!isBat) {
        renderMtfList();
        renderMtfDetail();
      }
    }
    function filterStation(st) {
      runMotionTransition(() => {
        currentStationFilter = st;
        document.querySelectorAll('.filter-chip-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.station === st);
          btn.setAttribute("aria-pressed", String(btn.dataset.station === st));
        });
        renderMtfList();
      });
    }
    function showStep() {
      const step = FFDG.state.steps[FFDG.state.index];
      const total = FFDG.state.steps.length;
      const current = FFDG.state.index + 1;
      $("step-meta").textContent = `Paso ${current} de ${total} · ${FFDG.state.activeFailure.code}`;
      const pdfProcedure = Boolean(FFDG.state.activeFailure.pdfImported && FFDG.state.activeFailure.family !== "NOBOOT");
      $("yes-btn").textContent = pdfProcedure ? "✓ Paso Completado" : "✓ SÍ · Pasa Verificación";
      $("no-btn").textContent = pdfProcedure ? "✕ No se pudo completar" : "✕ NO · Presenta Anomalía";
      const isNoBootStep = FFDG.state.activeFailure?.family === "NOBOOT";
      const stepQuestion = isNoBootStep
        ? `<strong>${escapeHtml(step.q)}</strong>`
        : `<strong>${escapeHtml(step.q)}</strong>${step.detail ? `<span class="bat-step-detail">${escapeHtml(step.detail).replace(/\n/g, "<br>")}</span>` : ""}`;
      $("step-question").classList.toggle("bat-no-boot-question", isNoBootStep);
      $("step-question").innerHTML = stepQuestion;
      $("step-note").value = "";
      $("progress-bar").style.width = `${(current / total) * 100}%`;
      $("bat-prev-btn").disabled = FFDG.state.index === 0;
    }
    function renderHistory() {
      const list = $("history-list");
      list.replaceChildren();
      FFDG.state.history.forEach(item => {
        const entry = document.createElement("div");
        entry.className = `history-entry ${item.result === "OK" ? "ok" : "fail"}`;
        entry.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>Paso ${item.step}: ${item.question}</strong>
          <span class="history-chip ${item.result === "OK" ? "ok" : "fail"}">${item.result}</span>
        </div>
        <div style="font-size:12.5px; color:var(--md-sys-color-on-surface-variant); margin-top:3px;">
          ${item.note ? `<em>Nota:</em> ${item.note}<br>` : ""}
          <em>Acción FFDG:</em> ${item.recommendation}
        </div>
      `;
        list.appendChild(entry);
      });
      $("history-count").textContent = `${FFDG.state.history.length} REGISTROS`;
      $("history-empty").classList.toggle("hidden", FFDG.state.history.length > 0);
    }
    function getBatDetailSteps(failure) {
      if (!failure) return [];
      const hasCustomProcedure = failure.customProcedure && Array.isArray(failure.steps);
      const sourceSteps = hasCustomProcedure
        ? failure.steps
        : failure.family === "NOBOOT" ? FFDG.data.flows.NOBOOT : (Array.isArray(failure.steps) ? failure.steps : []);
      const steps = sourceSteps.map((step, index) => {
         const originalTitle = step.title || step.q || `Step ${index + 1}`;
        const candidateNumber = Number(step.sourceNumber || originalTitle.match(/^\s*(?:Paso\s*)?(\d+)[.:·)]?/i)?.[1] || index + 1);
        const sourceNumber = Number.isFinite(candidateNumber) ? candidateNumber : index + 1;
         let title = originalTitle.replace(/^\s*(?:Paso\s*)?\d+\s*[.:·)]\s*/i, "").trim() || `Step ${index + 1}`;
        const isEscalation = /(?:move|escal|mover|subir).{0,45}(?:secondary|2nd|second|nivel\s*2|level\s*2)\s*(?:FA)?|(?:secondary|2nd|second|nivel\s*2|level\s*2).{0,45}(?:FA|field application)/i.test(title);
        if (isEscalation) title = "Move to Secondary Level FA";
        return { sourceNumber, title, detail: step.detail || "", fail: step.fail || "", isEscalation };
      });
      // La escalación es el destino terminal: conserva ese paso y descarta cualquier
      // instrucción posterior para que el flujo no continúe después de escalar.
      const escalationIndex = steps.findIndex(step => step.isEscalation);
      return escalationIndex < 0 ? steps : steps.slice(0, escalationIndex + 1);
    }
    function setBatCatalogCollapsed(collapsed, failure = FFDG.state.batDetailFailure) {
      const shouldCollapse = Boolean(collapsed && failure);
      const boardPanel = $("bat-failure-board");
      const summary = $("bat-selection-summary");
      const toggle = $("bat-selection-toggle");
      if (!boardPanel || !summary || !toggle) return;
      boardPanel.classList.toggle("catalog-selection-collapsed", shouldCollapse);
      summary.classList.toggle("hidden", !shouldCollapse);
      $("bat-selection-text").textContent = shouldCollapse
        ? `${failure.familyLabel || failure.family || "BAT"} · ${failure.code} · ${failure.label}`
        : "";
      toggle.setAttribute("aria-expanded", String(!shouldCollapse));
    }
    function renderBatSelection(failure, keepProgress = false) {
      const layout = $("bat-layout");
      const detail = $("bat-failure-detail");
      const isNoBoot = failure?.family === "NOBOOT";
      if (!keepProgress) {
        FFDG.state.batDetailFailure = failure || null;
        FFDG.state.batDetailIndex = 0;
        FFDG.state.batDetailCompletedThrough = -1;
      }
      if (!keepProgress) {
        layout.classList.toggle("bat-details-mode", Boolean(failure));
        layout.classList.toggle("bat-no-boot-mode", isNoBoot);
        $("closing-card").classList.toggle("bat-no-boot-report", isNoBoot);
        $("bat-no-boot-report-open").classList.toggle("hidden", !failure);
        $("bat-detail-area").classList.toggle("hidden", !failure);
        $("bat-node-form").classList.add("hidden");
        $("step-card").classList.add("hidden");
        $("bat-history-card").classList.add("hidden");
        $("closing-card").classList.add("hidden");
        setBatCatalogCollapsed(Boolean(failure), failure);
      }
      detail.classList.toggle("hidden", !failure);
      if (!failure) return;

      const steps = getBatDetailSteps(failure);
      const activeIndex = steps.length ? Math.min(FFDG.state.batDetailIndex || 0, steps.length - 1) : 0;
      const completedThrough = steps.length
        ? Math.min(Number.isInteger(FFDG.state.batDetailCompletedThrough) ? FFDG.state.batDetailCompletedThrough : -1, steps.length - 1)
        : -1;
      FFDG.state.batDetailIndex = activeIndex;
      FFDG.state.batDetailCompletedThrough = completedThrough;

      $("bat-detail-station").textContent = "BAT";
       $("bat-detail-family").textContent = batFamilyLabel(failure.familyLabel || failure.family || "BAT");
      $("bat-detail-title").textContent = `${failure.code} · ${failure.label}`;
      if (!keepProgress) $("bat-detail-title").focus({ preventScroll: true });
      $("bat-detail-code").textContent = failure.code;
       $("bat-detail-component").textContent = batFamilyLabel(failure.familyLabel || failure.family || "BAT");
      $("bat-detail-description").textContent = failure.description || failure.label;
       $("bat-detail-flowchart").textContent = isNoBoot ? "No Boot · Established guide" : `FFDG BAT · ${steps.length} steps`;
      $("bat-detail-step-count").textContent = steps.length
        ? completedThrough >= steps.length - 1
          ? `Sequence completed · Step ${activeIndex + 1} of ${steps.length}`
          : `STEP ${activeIndex + 1} OF ${steps.length} · ${isNoBoot ? "established BAT guide" : "FFDG PDF"}`
        : "No steps are associated with this BAT failure.";
      const progressStep = Math.max(activeIndex + 1, completedThrough + 1);
      $("bat-detail-progress-fill").style.width = steps.length ? `${(progressStep / steps.length) * 100}%` : "0%";

      const stepList = $("bat-detail-steps");
      stepList.replaceChildren();
      steps.forEach((step, index) => {
        const item = document.createElement("li");
        const isActive = index === activeIndex;
        const isComplete = index <= completedThrough;
        item.classList.toggle("is-active", isActive);
        item.classList.toggle("is-complete", isComplete);
        if (isActive) item.setAttribute("aria-current", "step");
        const heading = document.createElement("strong");
        const number = document.createElement("span");
        number.textContent = `${step.sourceNumber || index + 1}.`;
        const title = document.createElement("span");
        title.textContent = step.title;
        const status = document.createElement("span");
        status.className = "bat-detail-step-status";
        status.textContent = "✓";
        status.setAttribute("role", "img");
         status.setAttribute("aria-label", "Step completed");
        const icon = document.createElement("img");
        icon.className = "ffdg-step-icon";
        icon.src = "./assets/icons/file-earmark-text.svg";
        icon.alt = "";
        icon.setAttribute("aria-hidden", "true");
        heading.append(icon, number);
        if (isNoBoot) {
          const suggestion = document.createElement("button");
          suggestion.className = "bat-detail-step-help";
          suggestion.type = "button";
          suggestion.setAttribute("aria-haspopup", "dialog");
          suggestion.setAttribute("aria-controls", "bat-no-boot-suggestion-dialog");
           suggestion.setAttribute("aria-label", `Open diagnostic guidance for step ${step.sourceNumber}`);
           suggestion.title = "Need help? View diagnostic guidance";
          const ideaIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          ideaIcon.setAttribute("viewBox", "0 0 24 24");
          ideaIcon.setAttribute("aria-hidden", "true");
          ideaIcon.setAttribute("focusable", "false");
          ideaIcon.classList.add("bat-detail-step-help-icon");
          const bulb = document.createElementNS("http://www.w3.org/2000/svg", "path");
          bulb.setAttribute("d", "M9.5 18h5M10 21h4m-5.2-5.1A7 7 0 1 1 15.2 15.9c-.8.7-1.2 1.4-1.2 2.1h-4c0-.7-.4-1.4-1.2-2.1ZM12 2v1M4.9 4.9l.7.7M2 12h1m16-7.1-.7.7M21 12h1");
          ideaIcon.appendChild(bulb);
          suggestion.appendChild(ideaIcon);
          suggestion.addEventListener("click", () => {
            const hasActionableFailureGuidance = step.fail && !step.fail.includes("No se pudo completar este paso");
             $("bat-no-boot-suggestion-step").textContent = `Step ${step.sourceNumber} · ${step.title}`;
             $("bat-no-boot-suggestion-detail").textContent = step.detail || "No additional guidance is documented for this step.";
            $("bat-no-boot-suggestion-detail-section").hidden = false;
            $("bat-no-boot-suggestion-fail").textContent = hasActionableFailureGuidance ? step.fail : "";
            $("bat-no-boot-suggestion-fail-section").hidden = !hasActionableFailureGuidance;
            $("bat-no-boot-suggestion-dialog").showModal();
          });
          heading.appendChild(suggestion);
        }
        heading.appendChild(title);
        if (isComplete) heading.appendChild(status);
        item.appendChild(heading);
        if (!isNoBoot && isActive && step.detail) {
          const description = document.createElement("span");
          description.className = "bat-detail-step-detail";
          description.textContent = step.detail;
          item.appendChild(description);
        }
        if (!isNoBoot && isActive && step.fail && !step.fail.includes("No se pudo completar este paso")) {
          const failureGuidance = document.createElement("span");
          failureGuidance.className = "bat-detail-step-detail";
           failureGuidance.textContent = `If it fails: ${step.fail}`;
          item.appendChild(failureGuidance);
        }
        stepList.appendChild(item);
      });
      const nextButton = $("bat-detail-next");
      const sequenceComplete = steps.length > 0 && completedThrough >= steps.length - 1;
      nextButton.disabled = !steps.length || sequenceComplete;
      nextButton.textContent = !steps.length
         ? "No Steps"
        : sequenceComplete
          ? "Sequence Completed"
          : activeIndex >= steps.length - 1
            ? "Complete Sequence"
            : "Next Step →";
      $("bat-detail-prev").disabled = !steps.length || activeIndex === 0;
      renderBatFlowchart(steps, activeIndex, completedThrough);
    }
    function renderBatFlowchart(steps, activeIndex = 0, completedThrough = -1) {
      FFDG.renderBatDiagnosticFlowchart($("bat-disposition-flow"), steps, activeIndex, completedThrough);
    }
    function advanceBatDetail() {
      const failure = FFDG.state.batDetailFailure;
      if (!failure) return;
      const steps = getBatDetailSteps(failure);
      if (!steps.length) return;
      const activeIndex = Math.min(FFDG.state.batDetailIndex || 0, steps.length - 1);
      const completedThrough = Number.isInteger(FFDG.state.batDetailCompletedThrough)
        ? FFDG.state.batDetailCompletedThrough
        : -1;
      if (completedThrough >= steps.length - 1) return;
      FFDG.state.batDetailCompletedThrough = Math.max(completedThrough, activeIndex);
      if (activeIndex < steps.length - 1) FFDG.state.batDetailIndex = activeIndex + 1;
      renderBatSelection(failure, true);
    }
    function retreatBatDetail() {
      const failure = FFDG.state.batDetailFailure;
      if (!failure || FFDG.state.batDetailIndex <= 0) return;
      FFDG.state.batDetailIndex -= 1;
      FFDG.state.batDetailCompletedThrough = Math.min(
        Number.isInteger(FFDG.state.batDetailCompletedThrough) ? FFDG.state.batDetailCompletedThrough : -1,
        FFDG.state.batDetailIndex - 1
      );
      renderBatSelection(failure, true);
    }
    function finish(recommendation, passed) {
      FFDG.state.diagFinishedAt = new Date().toISOString();
      $("step-card").classList.add("hidden");
      $("closing-card").classList.remove("hidden");
      const recBox = $("recommendation");
      recBox.className = `callout-box ${passed ? "callout-pass" : "callout-fail"}`;
      recBox.innerHTML = `<strong>${passed ? "Secuencia Eléctrica Nominal Verificada" : "Acción de Reparación Inmediata Requerida"}</strong>
                        <span>${recommendation}</span>`;
      if (!$("action").value.trim()) {
        $("action").value = recommendation;
      }
      $("closing-card").scrollIntoView({ behavior: "smooth" });
    }
    function renderEvidence() {
      const targets = [$("evidence-preview"), $("print-evidence-list")];
      targets.forEach(t => t.replaceChildren());
      FFDG.state.evidence.forEach(item => {
        targets.forEach(target => {
          const fig = document.createElement("figure");
          fig.innerHTML = `<img src="${item.url}" alt="${item.name}"><figcaption>${item.name}</figcaption>`;
          target.appendChild(fig);
        });
      });
    }
    function getActiveSteps(f) {
      if (f?.variants?.length) return f.variants[Math.min(f.activeVariant || 0, f.variants.length - 1)].steps || [];
      return f?.steps || [];
    }
    function stationTokens(f) {
      return f.stations || String(f.station || "").split(/[\/,;]+/).map(s => s.trim()).filter(Boolean);
    }
    function setMtfCatalogCollapsed(collapsed, failure = FFDG.state.mtfSelected, moveFocus = false) {
      const shouldCollapse = Boolean(collapsed && failure);
      const layout = $("mtf-layout");
      const summary = $("mtf-selection-summary");
      const toggle = $("mtf-selection-toggle");
      if (!layout || !summary || !toggle) return;
      const catalog = $("mtf-row-2");
      const detailRow = layout.querySelector(".mtf-row-3");
      layout.classList.toggle("mtf-selection-collapsed", shouldCollapse);
      layout.classList.toggle("mtf-detail-open", shouldCollapse);
      catalog?.classList.toggle("hidden", shouldCollapse);
      detailRow?.classList.toggle("hidden", !shouldCollapse);
      if (!shouldCollapse) layout.classList.remove("mtf-detail-viewport");
      summary.classList.toggle("hidden", !shouldCollapse);
      $("mtf-selection-text").textContent = shouldCollapse
        ? `${failure.station} · ${failure.id} · ${failure.name}`
        : "";
      toggle.setAttribute("aria-expanded", String(!shouldCollapse));
      if (moveFocus && shouldCollapse) toggle.focus({ preventScroll: true });
      if (moveFocus && !shouldCollapse) requestAnimationFrame(() => {
        const selected = layout.classList.contains("v-board")
          ? layout.querySelector("#mtf-board .bd-item.selected")
          : layout.querySelector("#mtf-fault-list .mtf-item-card.selected");
        (selected || $("mtf-search"))?.focus({ preventScroll: true });
      });
    }
    function selectMtfFault(failure) {
      if (!failure) return;
      FFDG.state.mtfSelected = failure;
      FFDG.state.mtfIndex = 0;
      FFDG.state.mtfFinished = false;
      failure.activeVariant = 0;
      const layout = $("mtf-layout");
      const desktopDetail = matchMedia("(min-width: 1081px)").matches;
      layout.classList.toggle("mtf-detail-viewport", desktopDetail);
      setMtfCatalogCollapsed(true, failure, true);
      renderMtfList();
      renderMtfDetail();
      scrollMtfDetailIntoView();
    }
    function renderMtfList() {
      const q = $("mtf-search").value.toLowerCase().trim();
      const matches = FFDG.data.mtfFaults.filter(f => {
        const matchesSearch = [f.id, f.station, f.code, f.name, f.components, f.sourceSearchText].join(" ").toLowerCase().includes(q);
        const matchesStation = currentStationFilter === 'ALL' || stationTokens(f).includes(currentStationFilter);
        return matchesSearch && matchesStation;
      });
      const container = $("mtf-fault-list");
      container.replaceChildren();
      matches.forEach(f => {
        const card = document.createElement("div");
        const selected = FFDG.state.mtfSelected && (f.recordKey ? FFDG.state.mtfSelected.recordKey === f.recordKey : FFDG.state.mtfSelected === f);
        card.className = `mtf-item-card ${selected ? "selected" : ""}`;
        card.mtfFailure = f;
        card.setAttribute("role", "button");
        card.tabIndex = 0;
        card.setAttribute("aria-pressed", String(Boolean(selected)));
        card.innerHTML = `
        <div class="mtf-item-top">
          <span class="mtf-tag">${escapeHtml(f.station)}</span>
          <span style="font-size:11px; font-weight:800; color:var(--md-sys-color-primary);">${escapeHtml(f.id)}</span>
        </div>
        <h3 class="mtf-item-title">${escapeHtml(f.name)}</h3>
        <span class="mtf-item-meta">${escapeHtml(f.code)} · ${escapeHtml(f.components)}</span>
      `;
        card.addEventListener("click", () => selectMtfFault(f));
        card.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            card.click();
          }
        });
        container.appendChild(card);
      });
      $("mtf-count").textContent = `${matches.length} CASES`;
      const navSummary = document.querySelector("#nav-mtf .tile-tx small");
      if (navSummary) {
        const withProcedure = FFDG.data.mtfFaults.filter(f => f.variants?.length
          ? f.variants.some(variant => variant.steps?.length)
          : f.steps?.length).length;
        navSummary.textContent = `${FFDG.data.mtfFaults.length} failures · ${withProcedure} with procedure`;
      }
    }
    function renderStepSequenceSvg(container, steps, activeIndex = 0, note = "") {
      if (!container) return;
      if (!steps.length) {
        container.innerHTML = `<div class="mtf-no-procedure">No hay pasos fuente suficientes para representar esta falla.</div>`;
        return;
      }
      const wrap = (value, limit) => {
        const words = String(value || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
        const lines = [];
        let line = "";
        words.forEach(word => {
          const next = line ? `${line} ${word}` : word;
          if (next.length > limit && line) { lines.push(line); line = word; }
          else line = next;
        });
        if (line) lines.push(line);
        return lines.length ? lines : [""];
      };
      const text = value => escapeHtml(String(value || ""));
      const attr = value => text(value).replace(/"/g, "&quot;");
      const x = 24, width = 672, center = x + width / 2;
      const prepared = steps.map((step, index) => {
        const title = step.title || step.q || `Paso ${index + 1}`;
        const detail = step.detail || "";
        const titleLines = wrap(title, 58);
        const detailLines = detail ? wrap(detail, 68) : [];
        const height = Math.max(64, 30 + titleLines.length * 19 + detailLines.length * 17);
        return { step, index, titleLines, detailLines, height };
      });
      const top = 18, gap = 26;
      let cursor = top;
      prepared.forEach(item => { item.y = cursor; cursor += item.height + gap; });
      const svgHeight = cursor - gap + 18;
      let svg = `<svg viewBox="0 0 720 ${svgHeight}" role="img" aria-label="${attr(`Secuencia de diagnóstico, ${steps.length} pasos. ${steps.map(step => step.title || step.q || "").join(". ")}`)}" style="display:block;width:100%;height:auto;max-width:100%"><title>Secuencia de pasos documentados</title>`;
      prepared.forEach((item, index) => {
        const { y, height, titleLines, detailLines } = item;
        const active = index === activeIndex;
        svg += `<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="12" fill="${active ? "var(--md-sys-color-secondary-container)" : "var(--md-sys-color-surface-container-low)"}" stroke="${active ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline-variant)"}" stroke-width="${active ? 3 : 1.5}"/><circle cx="${x + 25}" cy="${y + 26}" r="15" fill="var(--md-sys-color-primary)"/><text x="${x + 25}" y="${y + 31}" text-anchor="middle" font-size="15" font-weight="800" fill="var(--md-sys-color-on-primary)">${item.index + 1}</text>`;
        const titleX = x + 52;
        titleLines.forEach((line, lineIndex) => {
          svg += `<text x="${titleX}" y="${y + 25 + lineIndex * 19}" font-size="15" font-weight="800" fill="var(--md-sys-color-on-surface)">${text(line)}</text>`;
        });
        detailLines.forEach((line, lineIndex) => {
          svg += `<text x="${titleX}" y="${y + 32 + titleLines.length * 19 + lineIndex * 17}" font-size="13" fill="var(--md-sys-color-on-surface-variant)">${text(line)}</text>`;
        });
        svg += `</g>`;
        if (index < prepared.length - 1) {
          const lineTop = y + height, lineBottom = lineTop + gap;
          svg += `<path d="M${center} ${lineTop}V${lineBottom - 7}" fill="none" stroke="var(--md-sys-color-primary)" stroke-width="2.5"/><path d="M${center - 6} ${lineBottom - 10}L${center} ${lineBottom - 2}L${center + 6} ${lineBottom - 10}Z" fill="var(--md-sys-color-primary)"/>`;
        }
      });
      svg += `</svg>`;
      container.innerHTML = `${note ? `<p class="flowchart-source-note">${text(note)}</p>` : ""}${svg}`;
    }
    function renderMtfPdfDecisionFlowchart(container, graph, activeIndex = 0) {
      const pdfRenderer = window.FFDG && window.FFDG.renderMtfPdfVectorFlowchart;
      return typeof pdfRenderer === "function" && pdfRenderer(container, graph, activeIndex);
    }
    function renderFlowchart(f) {
      const container = $("mtf-flowchart-diagram");
      if (!container) return;
      const source = FFDG.data.applyMtfPdfProcedureOverride(f);
      if (source.flowchartImage && Number(source.flowchartImageWidth) > 0 && Number(source.flowchartImageHeight) > 0) {
        const width = Number(source.flowchartImageWidth);
        const height = Number(source.flowchartImageHeight);
        const zoomSource = window.FFDG_MTF_PDF_FLOWCHART_ZOOM_IMAGES?.[String(source.flowchartImage).split("/").pop()];
        container.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Original FFDG diagram for ${escapeHtml(source.station || "MTF")}, pages ${escapeHtml((source.sourcePdfPages || []).join(", "))}" ${zoomSource ? `data-flowchart-hi-res-src="${escapeHtml(zoomSource)}" data-flowchart-dpi="400"` : ""} style="display:block;width:100%;height:auto;max-height:min(68vh,600px)"><image href="${escapeHtml(source.flowchartImage)}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"></image></svg>`;
        return;
      }
      const flowchartGraph = source.flowchartGraph || window.FFDG_MTF_PDF_FLOWCHART_GRAPHS?.[source.id] || null;
      if (flowchartGraph
        && renderMtfPdfDecisionFlowchart(container, flowchartGraph, Math.max(0, FFDG.state.mtfIndex || 0))) return;
      const steps = getActiveSteps(source);
      if (!steps.length) {
        const message = f.procedureSheet
          ? `La pestaña ${f.procedureSheet} existe, pero no contiene pasos reconocibles. No se generó una secuencia de acciones.`
          : "El Excel no incluye una hoja de procedimiento asociada por Tab No. No se generó una secuencia de acciones.";
        container.innerHTML = `<div class="mtf-no-procedure">${escapeHtml(message)}</div>`;
        return;
      }
      const sequenceRenderer = window.FFDG.renderMtfProcedureStepFlowchart;
      if (typeof sequenceRenderer === "function"
        && sequenceRenderer(container, steps, FFDG.state.mtfIndex || 0, `${source.station || "MTF"} · ${source.id || source.code || ""}`)) return;
      container.innerHTML = '<div class="mtf-no-procedure">El PDF no contiene un flowchart fuente asociado con certeza a esta falla. No se muestra un diagrama inferido.</div>';
    }
    function renderMtfDetail() {
      const f = FFDG.state.mtfSelected;
      if (!f) {
        $("mtf-empty").classList.remove("hidden");
        $("mtf-detail").classList.add("hidden");
        return;
      }
      $("mtf-empty").classList.add("hidden");
      $("mtf-detail").classList.remove("hidden");
      $("mtf-detail-title").textContent = `${f.id} · ${f.name}`;
      $("mtf-badge-station").textContent = f.station;
      $("mtf-badge-flow").textContent = f.flowchart;
      $("mtf-station").textContent = f.station;
      $("mtf-code").textContent = f.code;
      $("mtf-components").textContent = f.components;
      $("mtf-flowchart").textContent = f.flowchart;
      const sourceDetails = $("mtf-source-details");
      const sourceList = $("mtf-source-fields");
      const sourceRaw = $("mtf-source-raw");
      sourceList.replaceChildren();
      const sourceEntries = [
        ...Object.entries(f.sourceFields || {}),
        ...Object.entries(f.detailMetadata || {}).map(([key, value]) => [`Detalle · ${key}`, value])
      ].filter(([, value]) => value !== "" && value !== null && value !== undefined);
      sourceEntries.forEach(([label, value]) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = label;
        dd.textContent = String(value);
        sourceList.append(dt, dd);
      });
      sourceRaw.textContent = f.sourceFields
        ? JSON.stringify({ headers: f.sourceHeaders, masterRow: f.sourceMasterRow, procedureSheet: f.procedureSheet, procedureRows: f.sourceProcedureRows }, null, 2)
        : "No hay datos originales de Excel cargados en esta falla.";
      sourceDetails.classList.toggle("hidden", !f.sourceFields);
      const variants = f.variants || [];
      const variantPicker = $("mtf-variants");
      variantPicker.replaceChildren();
      variantPicker.classList.toggle("hidden", variants.length < 2);
      variants.forEach((variant, idx) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `mtf-variant-btn ${idx === (f.activeVariant || 0) ? "active" : ""}`;
        button.textContent = variant.label;
        button.setAttribute("aria-pressed", String(idx === (f.activeVariant || 0)));
        button.addEventListener("click", () => {
          f.activeVariant = idx;
          FFDG.state.mtfIndex = 0;
          FFDG.state.mtfFinished = false;
          renderMtfDetail();
        });
        variantPicker.appendChild(button);
      });
      const steps = getActiveSteps(f);
      const progressValue = steps.length
        ? (FFDG.state.mtfFinished ? steps.length : Math.min(steps.length, Math.max(0, FFDG.state.mtfIndex) + 1))
        : 0;
      const progressPercent = steps.length ? (progressValue / steps.length) * 100 : 0;
       const progressLabel = FFDG.state.mtfFinished ? "Route completed" : `Step ${progressValue} of ${steps.length}`;
      // Stepper pills
      const pathContainer = $("mtf-path");
      pathContainer.replaceChildren();
      steps.forEach((s, idx) => {
        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = `m3-step-pill ${idx === FFDG.state.mtfIndex ? "active" : ""}`;
         pill.textContent = `Step ${idx + 1}`;
        pill.setAttribute("aria-label", `${pill.textContent}${s.title ? `: ${s.title}` : ""}`);
        if (idx === FFDG.state.mtfIndex) pill.setAttribute("aria-current", "step");
        pill.addEventListener("click", () => {
          if (FFDG.state.mtfIndex === idx && !FFDG.state.mtfFinished) return;
          FFDG.state.mtfIndex = idx;
          FFDG.state.mtfFinished = false;
          renderMtfDetail();
        });
        pathContainer.appendChild(pill);
      });
      // Step content with formatted terminal commands
      const step = steps[FFDG.state.mtfIndex];
      if (step) {
        $("mtf-step").innerHTML = `
        ${step.section ? `<span class="m3-step-kicker">${escapeHtml(step.section)}</span>` : ""}
         <span class="m3-step-kicker">Validation ${FFDG.state.mtfIndex + 1} of ${steps.length}${step.sourceNumber ? ` · Source ${escapeHtml(step.sourceNumber)}` : ""}</span>
         <div class="mtf-detail-progress" role="progressbar" aria-label="MTF step progress" aria-valuemin="0" aria-valuemax="${steps.length}" aria-valuenow="${progressValue}" aria-valuetext="${progressLabel}"><div class="mtf-detail-progress-fill" aria-hidden="true" style="width:${progressPercent}%"></div></div>
        <h3 class="m3-step-title"><img class="ffdg-step-icon" src="./assets/icons/file-earmark-text.svg" alt="" aria-hidden="true">${escapeHtml(step.title)}</h3>
        ${formatStepDetail(step.detail)}
      `;
         $("mtf-action-text").innerHTML = `<img src="./assets/icons/gear-fill.svg" alt="" aria-hidden="true"><span class="ffdg-action-copy"><strong>Action / Procedure:</strong>${escapeHtml(step.action || "Follow the source procedure.")}</span>`;
      } else {
        const message = f.procedureSheet
           ? `The ${f.procedureSheet} sheet exists, but it contains no recognizable steps. Check the original sheet content.`
           : "This failure has no procedure sheet associated by Tab No. Check the original fields; no recommendations were invented.";
        $("mtf-step").innerHTML = `<div class="mtf-no-procedure">${escapeHtml(message)}</div>`;
         $("mtf-action-text").innerHTML = `<img src="./assets/icons/gear-fill.svg" alt="" aria-hidden="true"><span class="ffdg-action-copy">No procedure loaded from the source file.</span>`;
      }
      const referenceHost = $("mtf-reference-images");
      if (referenceHost) {
        const references = f.referenceImages || [];
        const referenceKey = references.length
          ? `${f.id || [f.station, f.code, f.name].join("::")}::${references.map(reference => `${reference.sourcePage || ""}:${reference.src || ""}`).join("|")}`
          : "";
        referenceHost.replaceChildren();
        referenceHost.classList.toggle("hidden", !references.length);
        if (references.length) {
          referenceHost.dataset.referenceKey = referenceKey;
          const launch = document.createElement("button");
          launch.type = "button";
          launch.className = "pdf-reference-launch";
          launch.setAttribute("aria-haspopup", "dialog");
           launch.setAttribute("aria-label", `Open gallery with ${references.length} ${references.length === 1 ? "reference image" : "reference images"}`);
          const heading = document.createElement("span");
           heading.textContent = "Reference Images";
          const icon = document.createElement("img");
          icon.className = "ffdg-detail-icon";
          icon.src = "./assets/icons/images.svg";
          icon.alt = "";
          icon.setAttribute("aria-hidden", "true");
          const count = document.createElement("span");
          count.className = "topology-reference-badge";
           count.textContent = `${references.length} ${references.length === 1 ? "image" : "images"}`;
          launch.append(icon, heading, count);
          launch.addEventListener("click", () => window.FFDG_OPEN_REFERENCE_GALLERY(`${f.id} · ${f.name}`, references, launch, referenceKey));
          referenceHost.append(launch);
          window.FFDG_SYNC_REFERENCE_GALLERY?.(referenceKey, launch);
        } else {
          delete referenceHost.dataset.referenceKey;
          window.FFDG_SYNC_REFERENCE_GALLERY?.("", null);
        }
      }
      renderFlowchart(f);
      $("mtf-prev").disabled = FFDG.state.mtfIndex === 0 || !steps.length;
      $("mtf-next").disabled = !steps.length;
       $("mtf-next").textContent = FFDG.state.mtfFinished ? "Route Completed" : (FFDG.state.mtfIndex === steps.length - 1 ? "Complete Route" : "Next Step →");
      $("mtf-outcome").classList.toggle("hidden", !FFDG.state.mtfFinished || !steps.length);
      if (FFDG.state.mtfFinished) {
         $("mtf-outcome").innerHTML = `<strong>Quality Verdict:</strong><br>${escapeHtml(f.final)}`;
      }
    }
    function showNotification(msg) {
      const el = $("upload-status");
      const textEl = $("upload-status-text");
      if (el && textEl) {
        textEl.textContent = msg;
        el.classList.remove("hidden");
        setTimeout(() => el.classList.add("hidden"), 8000);
      }
    }
    function updateStationFilterCounts() {
      const host = document.querySelector(".mtf-filter-chips");
      if (!host) return;
      const counts = new Map();
      FFDG.data.mtfFaults.forEach(f => stationTokens(f).forEach(st => counts.set(st, (counts.get(st) || 0) + 1)));
      const orderedStations = [...counts.keys()];
      if (currentStationFilter !== "ALL" && !counts.has(currentStationFilter)) currentStationFilter = "ALL";
      host.replaceChildren();
      const addChip = (station, label, count) => {
        const button = document.createElement("button");
        button.type = "button";
        button.id = `chip-${station}`;
        button.dataset.station = station;
        button.className = `filter-chip-btn ${currentStationFilter === station ? "active" : ""}`;
        button.textContent = `${label} (${count})`;
        button.setAttribute("aria-pressed", String(currentStationFilter === station));
        button.addEventListener("click", () => filterStation(station));
        host.appendChild(button);
      };
      addChip("ALL", "TODAS", FFDG.data.mtfFaults.length);
      orderedStations.forEach(station => addChip(station, station, counts.get(station)));
    }
    const MTF_STORAGE_KEY = "ffdg-mtf-catalog-v2";
    const cleanText = value => value === null || value === undefined ? "" : String(value);
    const normalizeHeader = value => cleanText(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
    function readWorksheetCatalog(workbook) {
      const candidate = workbook.SheetNames.map(name => ({ name, rows: XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, defval: "" }) }))
        .map(sheet => ({
          ...sheet, headerIndex: sheet.rows.findIndex(row => {
            const headers = row.map(normalizeHeader);
            return headers.some(value => ["tabno", "tabnumber"].includes(value)) &&
              headers.some(value => value === "errorcode" || value.startsWith("errorcode")) &&
              headers.some(value => value === "errorcodedescription" || value === "description");
          })
        }))
        .find(sheet => sheet.headerIndex >= 0);
      if (!candidate) throw new Error("No se encontró una tabla con Tab No, Error Code y Error Code Description.");
      const headers = candidate.rows[candidate.headerIndex].map((value, index) => cleanText(value).trim() || `Columna ${index + 1}`);
      const exactColumn = aliases => {
        const normalizedAliases = aliases.map(normalizeHeader);
        let index = headers.findIndex(header => normalizedAliases.includes(normalizeHeader(header)));
        if (index < 0) index = headers.findIndex(header => normalizedAliases.some(alias => normalizeHeader(header).includes(alias)));
        return index;
      };
      const valueFor = (row, aliases) => {
        const index = exactColumn(aliases);
        return index < 0 ? "" : row[index] ?? "";
      };
      const sheetById = new Map(workbook.SheetNames.map(name => [normalizeHeader(name), name]));
      const occurrences = new Map();
      const cases = [];
      candidate.rows.slice(candidate.headerIndex + 1).forEach((row, rowOffset) => {
        if (!row.some(value => cleanText(value).trim())) return;
        const sourceFields = Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""]));
        const sourceId = cleanText(valueFor(row, ["Tab No", "Tab Number", "ID"])).trim();
        const code = cleanText(valueFor(row, ["Error Code", "Error Code (Filter to Find Code of Interest)"]));
        const name = cleanText(valueFor(row, ["Error Code Description", "Description"]));
        if (!sourceId || (!code.trim() && !name.trim())) return;
        const stationValues = [valueFor(row, ["GB200"]), valueFor(row, ["GB300"]), valueFor(row, ["Station"])]
          .map(value => cleanText(value).trim()).filter(Boolean);
        const stations = [...new Set(stationValues.flatMap(value => value.split(/[\/,;]+/).map(part => part.trim()).filter(Boolean)))];
        const station = stations.join(" / ");
        const components = cleanText(valueFor(row, ["Cables / Components", "Components"]));
        const flowchart = cleanText(valueFor(row, ["Flowchart"]));
        const occurrence = (occurrences.get(sourceId) || 0) + 1;
        occurrences.set(sourceId, occurrence);
        const detailSheet = sheetById.get(normalizeHeader(sourceId)) || "";
        const detail = detailSheet ? parseDetailWorksheet(workbook.Sheets[detailSheet], detailSheet) : null;
        const recordKey = `${sourceId}::${occurrence}::${rowOffset}`;
        const variants = detail?.variants || [];
        const steps = variants[0]?.steps || [];
        cases.push({
          recordKey, id: sourceId, sourceId, station, stations, code, name, components, flowchart,
          steps, variants, activeVariant: 0,
          procedureSheet: detailSheet,
          procedureStatus: detailSheet ? (steps.length ? "Disponible" : "Pestaña encontrada, sin pasos reconocibles") : "Sin pestaña asociada por Tab No",
          sourceFields, sourceHeaders: headers, sourceMasterRow: row,
          detailMetadata: detail?.metadata || {}, sourceProcedureRows: detail?.rows || null,
          sourceSearchText: row.map(cleanText).join(" ") + " " + cleanText(detail?.rows ? JSON.stringify(detail.rows) : ""),
          final: detailSheet ? `Steps from ${sourceId} completed. Verify and record the retest result at the station.` : ""
        });
      });
      if (!cases.length) throw new Error("La tabla se encontró, pero no contiene fallas válidas.");
      return { cases, sheetName: candidate.name };
    }
    function parseDetailWorksheet(sheet, sheetName) {
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
      const flowIndex = rows.findIndex(row => row.some(value => normalizeHeader(value).startsWith("dispositionflowchart")));
      const metadata = {};
      rows.slice(0, flowIndex >= 0 ? flowIndex + 1 : 10).forEach(row => {
        const label = cleanText(row[0]).trim();
        const values = row.slice(1).filter(value => cleanText(value).trim()).map(cleanText);
        if (label) metadata[label] = values.join(" | ");
      });
      if (flowIndex < 0) return { rows, metadata, variants: [] };
      const body = rows.slice(flowIndex + 1);
      const pairCount = Math.max(1, Math.ceil(body.reduce((max, row) => Math.max(max, row.length), 0) / 2));
      const variants = [];
      const variantLabels = new Map();
      for (let pair = 1; pair < pairCount; pair += 1) {
        const start = pair * 2;
        const variantTitle = body.flatMap(row => row.slice(start, start + 2))
          .map(value => cleanText(value).trim()).find(value => /^variante\b/i.test(value));
        if (variantTitle) variantLabels.set(pair, variantTitle);
      }
      const variantPairs = [...variantLabels.keys()];
      const activePairs = [0, ...variantPairs];
      for (const pair of activePairs) {
        const labelColumn = pair * 2;
        const textColumn = labelColumn + 1;
        let label = pair === 0 ? "Ruta principal" : variantLabels.get(pair);
        const steps = [];
        let pendingSection = "";
        let lastStep = null;
        const notesForRow = row => row.flatMap((value, column) => {
          if (column < 2) return [];
          const belongsToVariant = variantPairs.some(index => column >= index * 2 && column < index * 2 + 2);
          const belongsToCurrentPair = column === labelColumn || column === textColumn;
          const note = cleanText(value).trim();
          return !belongsToVariant && !belongsToCurrentPair && note ? [note] : [];
        });
        body.forEach(row => {
          const marker = cleanText(row[labelColumn]).trim();
          const rawText = cleanText(row[textColumn]);
          const content = rawText.trim();
          if (!marker && !content) {
            const notes = pair === 0 ? notesForRow(row) : [];
            if (notes.length && lastStep) lastStep.detail = [lastStep.detail, ...notes].filter(Boolean).join("\n");
            return;
          }
          if (/^variante\b/i.test(marker) || /^variante\b/i.test(content)) {
            return;
          }
          if (!marker && content) {
            pendingSection = content;
            const notes = pair === 0 ? notesForRow(row) : [];
            if (notes.length) pendingSection += `\n${notes.join("\n")}`;
            return;
          }
          if (marker && !content) return;
          const text = content;
          const lines = text.split(/\r?\n/);
          const title = (lines.shift() || text).trim();
          const notes = notesForRow(row);
          const detailText = [lines.join("\n").trim(), ...notes].filter(Boolean).join("\n");
          lastStep = {
            sourceNumber: marker && content ? marker : "",
            section: pendingSection,
            title,
            detail: detailText,
            sourceText: text,
            action: `Source: sheet ${sheetName}`
          };
          steps.push(lastStep);
          pendingSection = "";
        });
        if (steps.length) variants.push({ label, steps });
      }
      return { rows, metadata, variants };
    }
    function persistCatalog(cases, fileName, importedAt) {
      try {
        localStorage.setItem(MTF_STORAGE_KEY, JSON.stringify({ version: 2, fileName, importedAt, cases }));
        return true;
      } catch (error) {
        console.warn("No se pudo guardar el catálogo FFDG localmente:", error);
        return false;
      }
    }
    function restoreCatalog() {
      try {
        const saved = JSON.parse(localStorage.getItem(MTF_STORAGE_KEY) || "null");
        if (!saved || saved.version !== 2 || !Array.isArray(saved.cases) || !saved.cases.length) return false;
        const restoredCases = FFDG.data.mergeMtfPdfAdditions(saved.cases);
        FFDG.data.mtfFaults = restoredCases;
        FFDG.state.mtfSelected = restoredCases[0];
        FFDG.state.mtfIndex = 0;
        FFDG.state.mtfFinished = false;
        updateStationFilterCounts();
        renderMtfList();
        renderMtfDetail();
        persistCatalog(restoredCases, saved.fileName, saved.importedAt);
        showNotification(`Catálogo restaurado: ${restoredCases.length} fallas · ${saved.fileName || "archivo FFDG"}`);
        return true;
      } catch (error) {
        console.warn("Se ignoró un catálogo FFDG local inválido:", error);
        return false;
      }
    }
    async function loadExcelFile(file) {
      if (!file) return;
      if (typeof XLSX === "undefined") {
        showNotification("No está disponible SheetJS. Revisa la conexión e intenta nuevamente.");
        return;
      }
      try {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array", cellDates: false });
        const { cases: importedCases, sheetName } = readWorksheetCatalog(workbook);
        const cases = FFDG.data.mergeMtfPdfAdditions(importedCases);
        const importedAt = new Date().toISOString();
        const selectedKey = FFDG.state.mtfSelected?.recordKey;
        FFDG.data.mtfFaults = cases;
        FFDG.state.mtfSelected = cases.find(item => item.recordKey === selectedKey) || cases[0];
        FFDG.state.mtfIndex = 0;
        FFDG.state.mtfFinished = false;
        FFDG.state.mtfSelected.activeVariant = 0;
        updateStationFilterCounts();
        renderMtfList();
        renderMtfDetail();
        const saved = persistCatalog(cases, file.name, importedAt);
        const withoutProcedure = cases.filter(item => !item.steps.length).length;
        showNotification(`Catálogo actualizado: ${cases.length} fallas · ${withoutProcedure} sin pasos disponibles · Hoja: ${sheetName}${saved ? " · guardado para próximas sesiones" : " · solo disponible en esta sesión (almacenamiento local lleno o bloqueado)"}`);
      } catch (error) {
        console.error(error);
        showNotification(`No se actualizó el catálogo: ${error.message}`);
      } finally {
        const excelInput = $("excel-file-input");
        if (excelInput) excelInput.value = "";
      }
    }
    return { initTheme, toggleTheme, setMode, filterStation, runMotionTransition, showStep, renderHistory, finish, renderEvidence, renderMtfList, renderMtfDetail, selectMtfFault, renderBatSelection, setBatCatalogCollapsed, setMtfCatalogCollapsed, advanceBatDetail, retreatBatDetail, loadExcelFile, restoreCatalog, updateStationFilterCounts, getActiveSteps, getBatDetailSteps };
  })();
  // 3. PRINT ENGINE
  window.FFDG.reports = (() => {
    "use strict";
    const FFDG = window.FFDG;
    const $ = (id) => document.getElementById(id);
    const safe = (value) => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char]);
    const formattedDate = (value) => value ? new Date(value).toLocaleString("es-MX") : "No registrado";
    function setPrintStatus(message, isError = false) {
      const status = $("pdf-status");
      status.textContent = message;
      status.style.color = isError ? "var(--md-sys-color-error)" : "var(--md-sys-color-on-surface-variant)";
    }
    function addMeta(label, value, wide = false) {
      const cell = document.createElement("div");
      const emphasis = label.includes("Serial del Nodo") || label.includes("Número de Parte")
        ? "is-primary"
        : label === "Código de falla" ? "is-alert" : "";
      cell.className = `bat-meta-card ${emphasis} ${wide ? "is-description" : ""}`.trim();
      cell.innerHTML = `<strong>${safe(label)}:</strong> ${safe(value || "No registrado")}`;
      $("bat-print-meta").appendChild(cell);
    }
    function openPrintDialog(mode, title, preserveUserActivation = false, onAfterPrint = null) {
      const previousTitle = document.title;
      const cleanup = () => {
        delete document.body.dataset.printMode;
        document.title = previousTitle;
        onAfterPrint?.();
      };
      document.title = title;
      document.body.dataset.printMode = mode;
      window.addEventListener("afterprint", cleanup, { once: true });
      const print = () => {
        try {
          window.print();
        } catch (error) {
          window.removeEventListener("afterprint", cleanup);
          delete document.body.dataset.printMode;
          document.title = previousTitle;
          console.error("No se pudo abrir el diálogo de impresión:", error);
          const message = "No se pudo abrir la impresión. Revisa la configuración de impresión del navegador e inténtalo de nuevo.";
          setPrintStatus(message, true);
          if (mode === "bat" && $("bat-no-boot-report-dialog")?.open) {
            const status = $("bat-no-boot-report-status");
            status.textContent = message;
            status.style.color = "var(--md-sys-color-error)";
          }
        }
      };
      if (preserveUserActivation) print();
      else requestAnimationFrame(print);
    }
    function printBatReport(caseReport = null) {
      const failure = caseReport ? FFDG.state.batDetailFailure : FFDG.state.activeFailure;
      // The existing executive layout also serves reports from any BAT detail.
      const isNoBoot = Boolean(caseReport) || failure?.family === "NOBOOT";
      const classification = caseReport?.classification ?? $("classification").value;
      const rootCause = caseReport?.rootCause ?? $("root-cause").value;
      const nextAction = caseReport?.nextAction ?? $("next-action").value;
      const reportStatus = (message, isError = false) => {
        if (caseReport) {
          const status = $("bat-no-boot-report-status");
          status.textContent = message;
          status.style.color = isError ? "var(--md-sys-color-error)" : "var(--md-sys-color-on-surface-variant)";
          setPrintStatus(message, isError);
        } else setPrintStatus(message, isError);
      };
      if (!classification) {
        reportStatus("Selecciona la clasificación final para habilitar el reporte.", true);
        if (!caseReport) $("classification").focus();
        return;
      }
      if (!rootCause || !nextAction) {
        reportStatus("Selecciona la causa raíz y la siguiente acción antes de generar el reporte.", true);
        if (!caseReport) (!rootCause ? $("root-cause") : $("next-action")).focus();
        return;
      }
      if (!failure || (!caseReport && !FFDG.state.history.length)) {
        reportStatus("Completa la información del reporte para la falla seleccionada antes de imprimir.", true);
        return;
      }
      const generatedAt = new Date();
      const serial = caseReport?.serial ?? $("serial").value.trim();
      if (isNoBoot && (FFDG.state.noBootEvidenceLoading?.before || FFDG.state.noBootEvidenceLoading?.after)) {
        reportStatus("Espera a que termine la preparación de las imágenes antes de generar el reporte.", true);
        return;
      }
      const retest = caseReport?.retest ?? $("retest").value;
      const diagnostician = caseReport?.analyst ?? $("technician").value.trim();
      const employeeId = caseReport?.employeeId ?? $("employee-id").value.trim();
      const rootEvidence = caseReport ? "" : $("root-cause-evidence").value.trim();
      const actions = caseReport?.actions ?? $("action").value.trim();
      $("bat-print-report").classList.toggle("bat-executive-report", isNoBoot);
      $("bat-print-title").textContent = isNoBoot ? "Reporte de Análisis de Falla Nvidia Racks" : "Reporte de Calidad";
      $("bat-print-subtitle").textContent = isNoBoot
        ? `BAT · ${failure.familyLabel || failure.family} · Diagnóstico de hardware GB200 / GB300`
        : "Diagnóstico de hardware · GB200 / GB300";
      $("bat-print-summary-title").textContent = isNoBoot ? "Status de diagnóstico" : "Resumen para Calidad";
      $("bat-print-stamp").textContent = isNoBoot ? "Hora de generación" : "Control de Calidad";
      $("bat-print-type").textContent = isNoBoot ? "Fecha y hora local" : "Reporte de diagnóstico BAT";
      $("bat-print-family-title").textContent = `Reporte de análisis de falla · BAT · ${failure.familyLabel || failure.family}`;
      $("bat-print-actions-title").lastElementChild.textContent = isNoBoot ? "Análisis y diagnóstico" : "Causa raíz y acciones reportadas";
      $("bat-print-evidence-section").lastElementChild.textContent = isNoBoot ? "Evidencia fotográfica" : "Evidencia de soporte";
      $("print-date").textContent = generatedAt.toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
      $("bat-print-executive-date").textContent = generatedAt.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
      $("bat-print-executive-time").textContent = generatedAt.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false });
      $("bat-executive-print-header").classList.toggle("hidden", !isNoBoot);
      $("bat-print-identity-section").classList.toggle("hidden", !isNoBoot);
      $("bat-print-status-section").classList.toggle("hidden", !isNoBoot);
      const meta = $("bat-print-meta");
      meta.replaceChildren();
      if (isNoBoot) {
        addMeta("ID del reporte / falla de origen", `${failure.code} · ${failure.label}`);
        addMeta("Estación / línea", `BAT · ${failure.familyLabel || failure.family}`);
        addMeta("Modelo / SKU", caseReport?.part ?? $("part").value.trim());
        addMeta("Número de serie", serial);
        addMeta("Analista", diagnostician);
        addMeta("Número de empleado", employeeId);
      } else {
        addMeta("Folio de sesión local", `BAT-${serial}-${generatedAt.toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}`);
        addMeta("Estación", $("station").value);
        addMeta("Serial del Nodo (S/N)", serial);
        addMeta("Número de Parte (P/N)", $("part").value.trim());
        addMeta("Analista FA · No. de empleado", `${diagnostician} · ${employeeId}`);
        addMeta("Código de falla", failure.code);
        addMeta("Descripción reportada", failure.label, true);
        if (!caseReport) addMeta("Periodo de diagnóstico", `${formattedDate(FFDG.state.diagStartedAt)} · ${formattedDate(FFDG.state.diagFinishedAt)}`);
      }
      const showHardwareDetails = isNoBoot;
      $("bat-print-hardware").classList.toggle("hidden", !isNoBoot);
      $("bat-print-hardware-status").textContent = isNoBoot ? caseReport?.hardwareChanged || "No registrado" : "";
      $("bat-print-hardware-title").textContent = caseReport?.hardwareChanged === "Sí"
        ? "Tarjeta o hardware reemplazado"
        : "Cambio de hardware";
      $("bat-print-hardware-details").classList.toggle("hidden", !showHardwareDetails);
      $("bat-print-damaged-part").textContent = showHardwareDetails && caseReport?.hardwareChanged === "Sí" ? caseReport.damagedPart || "No registrado" : "No aplica";
      $("bat-print-damaged-serial").textContent = showHardwareDetails && caseReport?.hardwareChanged === "Sí" ? caseReport.damagedSerial || "No registrado" : "No aplica";
      const procedureApplied = isNoBoot ? caseReport?.procedureAppliedLabel || "" : "";
      $("bat-print-procedure-section").classList.toggle("hidden", !procedureApplied);
      $("bat-print-procedure").classList.toggle("hidden", !procedureApplied);
      const procedureMatch = procedureApplied.match(/^Paso\s+(.+?)\s*·\s*(.*)$/i);
      const procedureNumber = procedureMatch?.[1] || "";
      $("bat-print-procedure-number").textContent = procedureNumber;
      $("bat-print-procedure-prefix").textContent = procedureNumber ? `Paso ${procedureNumber} · ` : "";
      $("bat-print-procedure-text").textContent = procedureMatch?.[2] || procedureApplied;
      $("bat-print-continuation").textContent = `${isNoBoot ? "INGRASYS · CONTINUACIÓN DEL INFORME EJECUTIVO" : "INGRASYS · REPORTE DE CALIDAD"}  |  Serial ${serial}  |  Falla ${failure.code}`;
      const hasAnomaly = caseReport ? caseReport.outcome !== "Resuelta" : FFDG.state.history.some(item => item.result === "ANOMALÍA");
      const executiveSummary = $("bat-print-executive-summary");
      executiveSummary.classList.toggle("hidden", !isNoBoot);
      $("bat-print-executive-copy").classList.toggle("hidden", !isNoBoot);
      if (isNoBoot) {
        const reportedOutcome = caseReport?.outcome || (hasAnomaly ? "Anomalía registrada" : "Falla no reproducida");
        const statusState = { "Resuelta": "resolved", "En validación": "pending", "Pruebas": "pending", "NVIDIA": "nvidia", "Reparación": "repair" };
        const resultState = statusState[reportedOutcome] || "open";
        executiveSummary.dataset.state = resultState;
        $("bat-print-executive-status").textContent = reportedOutcome;
        $("bat-print-executive-retest").textContent = retest || "No registrado";
        $("bat-print-executive-copy").textContent =
          `Falla ${failure.code} · ${failure.label} · Nodo ${serial}. Causa raíz registrada: ${rootCause}.`;
        $("bat-print-executive-action").textContent = nextAction;
        $("bat-print-executive-classification").textContent = classification || "No registrada";
      }
      const final = $("bat-print-final");
      final.replaceChildren();
      const card = document.createElement("section");
      card.className = "print-final-card";
      const verdict = document.createElement("div");
      verdict.className = `bat-report-verdict ${hasAnomaly ? "" : "is-clear"}`.trim();
      const lead = document.createElement("div");
      lead.className = "bat-verdict-lead";
      const leadLabel = document.createElement("span");
      leadLabel.className = "bat-verdict-kicker";
      leadLabel.textContent = "Resultado de validación";
      const leadTitle = document.createElement("strong");
      leadTitle.className = "bat-verdict-title";
      leadTitle.textContent = caseReport ? caseReport.outcome : hasAnomaly ? "Anomalía registrada" : "Falla no reproducida";
      lead.append(leadLabel, leadTitle);
      verdict.appendChild(lead);
      [
        ["Clasificación final", classification],
        ["Acción siguiente", nextAction],
        ["Resultado del retest", retest || "No registrado"]
      ].forEach(([label, value]) => {
        const stat = document.createElement("div");
        stat.className = "bat-verdict-stat";
        const statLabel = document.createElement("strong");
        statLabel.textContent = label;
        const statValue = document.createElement("span");
        statValue.textContent = value || "No registrado";
        stat.append(statLabel, statValue);
        verdict.appendChild(stat);
      });
      const verdictContainer = $("bat-print-verdict");
      verdictContainer.replaceChildren(verdict);
      const grid = document.createElement("div");
      grid.className = "print-final-grid";
      const finalFields = [
        ["Causa raíz", rootCause, false, "./assets/icons/gear.svg"],
        ["Intervención realizada", actions || "No especificada", !isNoBoot],
      ];
      if (isNoBoot) finalFields.push(["Cambio de hardware", caseReport?.hardwareChanged || "No registrado", false, "./assets/icons/wrench.svg"]);
      if (!isNoBoot) finalFields.push(["Evidencia de causa raíz", rootEvidence || "No registrada"]);
      if (caseReport?.procedureAppliedLabel && !isNoBoot) finalFields.push(["Procedimiento aplicado según el FFDG de NVIDIA", caseReport.procedureAppliedLabel, true]);
      finalFields.forEach(([label, value, wide, iconPath]) => {
        const field = document.createElement("div");
        if (wide) field.className = "wide";
        if (iconPath) {
          const icon = document.createElement("img");
          icon.src = iconPath;
          icon.alt = "";
          icon.setAttribute("aria-hidden", "true");
          field.appendChild(icon);
        }
        const heading = document.createElement("strong");
        heading.textContent = label;
        field.append(heading, document.createTextNode(value));
        grid.appendChild(field);
      });
      card.appendChild(grid);
      const signatures = document.createElement("div");
      signatures.className = "print-signatures print-signature-list";
      signatures.innerHTML = `
        <div class="print-signature">
          <strong>Diagnóstico realizado por</strong>
          <span class="print-signature-name">${safe(diagnostician || "No registrado")}</span>
          <span class="print-signature-meta">Empleado ${safe(employeeId || "No registrado")}</span>
          <div class="print-signature-fields">
            <div><div class="print-signature-rule" aria-hidden="true"></div><span>Nombre y firma</span></div>
            <div><div class="print-signature-rule" aria-hidden="true"></div><span>Fecha</span></div>
          </div>
        </div>
        <div class="print-signature">
          <strong>Revisión de Calidad</strong>
          <span class="print-signature-name">Claudia Itzel Almaza Lopez</span>
          <span class="print-signature-meta">Responsable de revisión de Calidad</span>
          <div class="print-signature-fields">
            <div><div class="print-signature-rule" aria-hidden="true"></div><span>Nombre y firma</span></div>
            <div><div class="print-signature-rule" aria-hidden="true"></div><span>Fecha</span></div>
          </div>
        </div>`;
      $("bat-print-signatures").replaceChildren(signatures);
      final.appendChild(card);
      const evidence = $("print-evidence-list");
      const evidenceItems = FFDG.state.evidence.map(item => ({ name: item.name, src: item.url, label: item.name }));
      const noBootStages = {
        before: FFDG.state.noBootReportEvidence?.before || [],
        after: FFDG.state.noBootReportEvidence?.after || [],
      };
      if (isNoBoot) {
        Object.entries(noBootStages).forEach(([stage, items]) => items.forEach(item => {
          evidenceItems.push({ name: item.name, src: item.dataUrl, label: `${stage === "before" ? "Antes" : "Después"} · ${item.caption || item.name}`, stage });
        }));
      }
      evidence.replaceChildren();
      $("bat-print-evidence-empty").classList.add("hidden");
      const appendEvidenceImage = (container, item) => {
        const figure = document.createElement("figure");
        const image = item.decodedImage || document.createElement("img");
        if (!item.decodedImage) image.src = item.src;
        image.alt = item.label;
        const caption = document.createElement("figcaption");
        caption.textContent = item.label;
        figure.append(image, caption);
        container.appendChild(figure);
      };
      if (isNoBoot) {
        [
          ["before", "EVIDENCIA · ANTES", "Evidencia antes de la intervención"],
          ["after", "EVIDENCIA · DESPUÉS", "Evidencia después de la intervención"],
        ].forEach(([stage, title, emptyLabel]) => {
          const panel = document.createElement("section");
          panel.className = `bat-executive-evidence-card is-${stage}`;
          const heading = document.createElement("h3");
          const icon = document.createElement("img");
          icon.src = "./assets/icons/images.svg";
          icon.alt = "";
          icon.setAttribute("aria-hidden", "true");
          heading.append(icon, document.createTextNode(title));
          const content = document.createElement("div");
          content.className = "bat-executive-evidence-items";
          const stageItems = noBootStages[stage];
          if (stageItems.length) stageItems.forEach(item => appendEvidenceImage(content, { ...item, label: item.caption || item.name }));
          else {
            const placeholder = document.createElement("div");
            placeholder.className = "bat-executive-evidence-placeholder";
            const placeholderIcon = document.createElement("img");
            placeholderIcon.src = "./assets/icons/images.svg";
            placeholderIcon.alt = "";
            placeholderIcon.setAttribute("aria-hidden", "true");
            const message = document.createElement("span");
            message.textContent = emptyLabel;
            const detail = document.createElement("small");
            detail.textContent = "Sin evidencia adjunta";
            placeholder.append(placeholderIcon, message, detail);
            content.appendChild(placeholder);
          }
          panel.append(heading, content);
          evidence.appendChild(panel);
        });
        const additionalEvidence = evidenceItems.filter(item => !item.stage);
        if (additionalEvidence.length) {
          const additionalPanel = document.createElement("section");
          additionalPanel.className = "bat-executive-evidence-card bat-executive-evidence-additional";
          const heading = document.createElement("h3");
          const icon = document.createElement("img");
          icon.src = "./assets/icons/images.svg";
          icon.alt = "";
          icon.setAttribute("aria-hidden", "true");
          heading.append(icon, document.createTextNode("Evidencia adicional"));
          additionalPanel.appendChild(heading);
          additionalEvidence.forEach(item => appendEvidenceImage(additionalPanel, item));
          evidence.appendChild(additionalPanel);
        }
      } else evidenceItems.forEach(item => appendEvidenceImage(evidence, item));
      if (!evidenceItems.length && !isNoBoot) {
        evidence.classList.add("hidden");
        $("bat-print-evidence-section").classList.toggle("hidden", !isNoBoot);
        $("bat-print-evidence-empty").classList.toggle("hidden", !isNoBoot);
      } else {
        evidence.classList.remove("hidden");
        $("bat-print-evidence-section").classList.remove("hidden");
      }
      $("print-quality-note").textContent = isNoBoot
        ? "Resultado declarado por el analista; sujeto a validación del proceso aplicable."
        : `Documento para revisión de Calidad · ${evidenceItems.length} evidencia(s) adjunta(s). La liberación del nodo se rige por la disposición aprobada.`;
      reportStatus("El reporte está preparado. En la ventana de impresión selecciona “Guardar como PDF”. Si no aparece, el formulario permanecerá abierto para volver a intentarlo.");
      const printTitle = isNoBoot ? `Reporte_de_Analisis_de_Falla_Nvidia_Racks_${serial}` : `Reporte_BAT_${serial}_${failure.code}`;
      openPrintDialog("bat", printTitle, isNoBoot, () => {
        if (caseReport) {
          const dialog = $("bat-no-boot-report-dialog");
          if (dialog.open) dialog.close();
        }
      });
    }
    function printMtfReport() {
      const f = FFDG.state.mtfSelected;
      if (!f) return;
      const sourceFields = { ...(f.sourceFields || {}), ...Object.fromEntries(Object.entries(f.detailMetadata || {}).map(([key, value]) => [`Detalle · ${key}`, value])) };
      const sourceHtml = Object.entries(sourceFields).filter(([, value]) => value !== "" && value !== null && value !== undefined)
        .map(([key, value]) => `<div><strong>${escapeHtml(key)}:</strong> ${escapeHtml(String(value))}</div>`).join("");
      $("mtf-print-meta").innerHTML = `
      <div><strong>Estación:</strong> ${escapeHtml(f.station)}</div>
      <div><strong>Error Code:</strong> ${escapeHtml(f.code)}</div>
      <div style="grid-column:span 2;"><strong>Descripción:</strong> ${escapeHtml(f.name)}</div>
      <div style="grid-column:span 2;"><strong>Componentes:</strong> ${escapeHtml(f.components)}</div>
      ${sourceHtml}
    `;
      const steps = $("mtf-print-steps");
      steps.replaceChildren();
      const variants = f.variants?.length ? f.variants : [{ label: "Ruta", steps: f.steps || [] }];
      let printedSteps = 0;
      variants.forEach(variant => {
        if (variants.length > 1) {
          const heading = document.createElement("h3");
          heading.textContent = variant.label;
          steps.appendChild(heading);
        }
        variant.steps.forEach((step, index) => {
          printedSteps += 1;
          const row = document.createElement("div");
          row.className = "print-row";
          row.innerHTML = `<strong>${escapeHtml(step.sourceNumber || index + 1)}. ${escapeHtml(step.title)}:</strong> ${escapeHtml(step.detail)} → <em>${escapeHtml(step.action)}</em>`;
          steps.appendChild(row);
        });
      });
      if (!printedSteps) {
        const empty = document.createElement("div");
        empty.className = "print-row";
        empty.textContent = f.procedureSheet
          ? `La pestaña ${f.procedureSheet} no contiene pasos reconocibles.`
          : "El workbook no contiene una pestaña de procedimiento asociada por Tab No.";
        steps.appendChild(empty);
      }
      $("mtf-print-final").innerHTML = `<p style="margin-top:8px;">${escapeHtml(f.final || f.procedureStatus || "Sin disposición final indicada en el archivo fuente.")}</p>`;
      document.title = `FA_MTF_${f.id}_${f.code}`;
      openPrintDialog("mtf", `Guia_MTF_${f.station}_${f.id}`);
    }
    const mtfCasePilot = { id: "FLA-04", station: "FLA", code: "020023006_001", name: "ERROR: POST failed to complete; timeout" };
    function isMtfCasePilot(f) {
      return Boolean(f && f.id === mtfCasePilot.id && f.station === mtfCasePilot.station
        && f.code === mtfCasePilot.code && f.name === mtfCasePilot.name);
    }
    function openMtfCaseReport() {
      const f = FFDG.state.mtfSelected;
      if (!isMtfCasePilot(f)) return;
      const dialog = $("mtf-case-report-dialog");
      const form = $("mtf-case-report-form");
      const steps = FFDG.ui.getActiveSteps(f);
      form.reset();
      mtfCaseEvidence = { before: { files: [], photos: [], loading: false }, after: { files: [], photos: [], loading: false } };
      ["before", "after"].forEach(stage => {
        mtfCaseEvidenceTokens[stage] += 1;
        $(`mtf-case-evidence-${stage}`).value = "";
        renderMtfCaseEvidencePreview(stage);
      });
      updateMtfCaseEvidenceSubmitState();
      $("mtf-case-form-status").textContent = "";
      $("mtf-case-fault-summary").textContent = `${f.station} · ${f.id} · ${f.code} · ${f.name}`;
      const stepOptions = $("mtf-case-step-options");
      const passStep = form.elements.passStep;
      stepOptions.replaceChildren();
      passStep.replaceChildren(new Option("Selecciona", ""));
      steps.forEach((step, index) => {
        const label = document.createElement("label");
        label.className = "mtf-case-check";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "executedSteps";
        input.value = String(index);
        const text = document.createElement("span");
        text.textContent = `Paso ${index + 1} · ${step.title || "Validación"}${step.detail ? ` — ${step.detail}` : ""}`;
        label.append(input, text);
        stepOptions.appendChild(label);
        passStep.add(new Option(`Paso ${index + 1} · ${step.title || "Validación"}`, String(index)));
      });
      passStep.add(new Option("AC Cycle adicional", "ac-cycle"));
      $("mtf-case-pass-step-wrap").classList.add("hidden");
      passStep.required = false;
      dialog.showModal();
      form.elements.serial.focus();
    }
    function renderMtfCaseField(label, value, wide = false) {
      return `<div class="mtf-case-print-field${wide ? " wide" : ""}"><strong>${safe(label)}</strong><span>${safe(value || "No registrado")}</span></div>`;
    }
    let mtfCaseEvidence = { before: { files: [], photos: [], loading: false }, after: { files: [], photos: [], loading: false } };
    const mtfCaseEvidenceTokens = { before: 0, after: 0 };
    let mtfCasePrintPending = false;
    function readImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, dataUrl: reader.result });
        reader.onerror = () => reject(new Error(`No se pudo leer la imagen ${file.name}.`));
        reader.readAsDataURL(file);
      });
    }
    function updateMtfCaseEvidenceSubmitState() {
      const loading = Object.values(mtfCaseEvidence).some(stage => stage.loading);
      const submit = $("mtf-case-report-form").querySelector('[type="submit"]');
      submit.disabled = loading;
      submit.setAttribute("aria-busy", String(loading));
    }
    function clearMtfCaseEvidence() {
      ["before", "after"].forEach(stage => {
        mtfCaseEvidenceTokens[stage] += 1;
        $(`mtf-case-evidence-${stage}`).value = "";
        $(`mtf-case-evidence-${stage}-preview`).replaceChildren();
      });
      mtfCaseEvidence = { before: { files: [], photos: [], loading: false }, after: { files: [], photos: [], loading: false } };
      updateMtfCaseEvidenceSubmitState();
    }
    function renderMtfCaseEvidencePreview(stage) {
      const preview = $(`mtf-case-evidence-${stage}-preview`);
      const entry = mtfCaseEvidence[stage];
      preview.replaceChildren();
      if (entry.loading) {
        preview.textContent = "Leyendo y preparando evidencia…";
        return;
      }
      if (!entry.photos.length) {
        preview.textContent = "Sin imágenes adjuntas";
        return;
      }
      entry.photos.forEach((photo, index) => {
        const item = document.createElement("figure");
        item.className = "mtf-case-evidence-thumb";
        const image = document.createElement("img");
        image.src = photo.dataUrl;
        image.alt = `Vista previa ${stage === "before" ? "antes" : "después"}: ${photo.name}`;
        const caption = document.createElement("figcaption");
        caption.textContent = photo.name;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "mtf-case-evidence-remove";
        remove.textContent = "Quitar";
        remove.setAttribute("aria-label", `Quitar ${photo.name}`);
        remove.addEventListener("click", () => {
          entry.photos.splice(index, 1);
          entry.files.splice(index, 1);
          renderMtfCaseEvidencePreview(stage);
          $("mtf-case-form-status").textContent = "Evidencia eliminada de esta captura.";
        });
        item.append(image, caption, remove);
        preview.appendChild(item);
      });
    }
    async function updateMtfCaseEvidence(input) {
      const stage = input.dataset.evidenceStage;
      const files = [...input.files];
      if (!stage || !files.length) return;
      const otherStage = stage === "before" ? "after" : "before";
      const status = $("mtf-case-form-status");
      if (files.length + mtfCaseEvidence[otherStage].files.length > 4) {
        status.textContent = "El límite total es de 4 imágenes; conserva algunas y vuelve a seleccionar.";
        input.value = "";
        return;
      }
      if (files.some(file => !file.type.startsWith("image/") || file.size > 8 * 1024 * 1024)) {
        status.textContent = "Usa imágenes de hasta 8 MB cada una.";
        input.value = "";
        return;
      }
      const token = ++mtfCaseEvidenceTokens[stage];
      mtfCaseEvidence[stage] = { files, photos: [], loading: true };
      renderMtfCaseEvidencePreview(stage);
      updateMtfCaseEvidenceSubmitState();
      status.textContent = "Preparando las imágenes…";
      try {
        const photos = await Promise.all(files.map(readImage));
        if (token !== mtfCaseEvidenceTokens[stage]) return;
        mtfCaseEvidence[stage] = { files, photos, loading: false };
        renderMtfCaseEvidencePreview(stage);
        const images = [...$(`mtf-case-evidence-${stage}-preview`).querySelectorAll("img")];
        await Promise.all(images.map(image => image.decode().catch(() => undefined)));
        if (token !== mtfCaseEvidenceTokens[stage]) return;
        status.textContent = `${photos.length} imagen(es) listas para “${stage === "before" ? "Antes" : "Después"}”.`;
      } catch (error) {
        if (token !== mtfCaseEvidenceTokens[stage]) return;
        mtfCaseEvidence[stage] = { files: [], photos: [], loading: false };
        input.value = "";
        renderMtfCaseEvidencePreview(stage);
        status.textContent = error.message || "No se pudieron preparar las imágenes.";
      } finally {
        updateMtfCaseEvidenceSubmitState();
      }
    }
    function submitMtfCaseReport(event) {
      event.preventDefault();
      const f = FFDG.state.mtfSelected;
      const form = $("mtf-case-report-form");
      const status = $("mtf-case-form-status");
      if (!isMtfCasePilot(f)) return;
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const steps = FFDG.ui.getActiveSteps(f);
      const executed = values.getAll("executedSteps").map(Number);
      const outcome = String(values.get("outcome"));
      const passStepIndex = String(values.get("passStep"));
      const passedByAcCycle = passStepIndex === "ac-cycle";
      if (outcome === "Resuelta" && (passStepIndex === "" || (passedByAcCycle ? !form.elements.acCycle.checked : !executed.includes(Number(passStepIndex))))) {
        status.textContent = passedByAcCycle
          ? "Marca AC Cycle como acción adicional para seleccionarlo como resultado."
          : "Marca como ejecutado el paso que pasó y selecciónalo como resultado.";
        form.elements.passStep.focus();
        return;
      }
      if (outcome === "Resuelta" && values.get("retest") !== "Pass") {
        status.textContent = "Si el retest no está en Pass, no registres la falla como resuelta.";
        form.elements.retest.focus();
        return;
      }
      try {
        if (FFDG.state.mtfSelected !== f) throw new Error("La falla seleccionada cambió. Vuelve a abrir el reporte.");
        const now = new Date();
        const selectedPassStep = passStepIndex === "" ? "No aplica"
          : passStepIndex === "ac-cycle" ? "AC Cycle adicional"
          : `Paso ${Number(passStepIndex) + 1} · ${steps[Number(passStepIndex)]?.title || ""}`;
        const report = $("mtf-case-print-report");
        const photosForPrint = stage => mtfCaseEvidence[stage].photos.length
          ? `<div class="mtf-case-print-photos">${mtfCaseEvidence[stage].photos.map(photo => `<figure><img src="${safe(photo.dataUrl)}" alt="Evidencia ${stage === "before" ? "antes" : "después"} de las acciones"><figcaption>${safe(photo.name)}</figcaption></figure>`).join("")}</div>`
          : `<p class="mtf-case-print-empty">No se adjuntaron imágenes para esta etapa.</p>`;
        const executedHtml = steps.map((step, index) => `<li class="${executed.includes(index) ? "is-checked" : ""}"><strong>Paso ${index + 1} · ${safe(step.title || "Validación")}</strong>${step.detail ? `<p>${safe(step.detail)}</p>` : ""}<span>${executed.includes(index) ? "Ejecutado" : "No marcado como ejecutado"}</span></li>`).join("");
        report.innerHTML = `<header class="mtf-case-print-head"><div><span>FFDG · MTF · REPORTE DE INTERVENCIÓN</span><h1>Reporte de falla</h1><p>ERROR: POST failed to complete; timeout</p></div><strong>FLA-04</strong></header>
          <section class="mtf-case-print-section"><h2>Identificación del nodo y la falla</h2><div class="mtf-case-print-grid">${renderMtfCaseField("Estación", f.station)}${renderMtfCaseField("Serial del nodo (S/N)", values.get("serial"))}${renderMtfCaseField("Número de parte (P/N)", values.get("partNumber"))}${renderMtfCaseField("Analista", `${values.get("analyst")} · ${values.get("employeeId")}`)}${renderMtfCaseField("Código de falla", f.code)}${renderMtfCaseField("Componentes", f.components)}${renderMtfCaseField("Generado", now.toLocaleString("es-MX"))}</div></section>
          <section class="mtf-case-print-section"><h2>Validaciones y trabajo realizado</h2><p><strong>Procedimiento asociado:</strong> ${safe(f.flowchart)} · Pasos originales consultados desde la ficha activa.</p><ol class="mtf-case-print-steps">${executedHtml}</ol><div class="mtf-case-print-grid">${renderMtfCaseField("AC Cycle adicional", values.get("acCycle") ? "Sí" : "No")}${renderMtfCaseField("Resultado de la falla", outcome)}${renderMtfCaseField("Paso donde pasó", selectedPassStep)}${renderMtfCaseField("Retest", values.get("retest"))}</div><div class="mtf-case-print-analysis-grid">${renderMtfCaseField("Intervención / acciones realizadas", values.get("actions"))}${renderMtfCaseField("Causa raíz (RCA)", values.get("rca"))}</div></section>
          <section class="mtf-case-print-section"><h2>Evidencia · Antes de aplicar acciones</h2>${photosForPrint("before")}</section><section class="mtf-case-print-section"><h2>Evidencia · Después de aplicar acciones</h2>${photosForPrint("after")}</section>
          <section class="mtf-case-print-section"><h2>Firmas</h2><div class="mtf-case-print-signatures"><div><strong>Analista responsable</strong><span>${safe(values.get("analyst"))} · ${safe(values.get("employeeId"))}</span><i></i><small>Firma y fecha</small></div><div><strong>Revisión de Calidad</strong><span>Nombre: __________________________________</span><i></i><small>Firma y fecha</small></div></div></section>
          <footer class="mtf-case-print-foot">Registro de intervención capturado para este reporte. La guía FFDG/MTF permanece sin cambios. Resultado declarado por el analista; no constituye liberación automática del nodo.</footer>`;
        status.textContent = "Se abrirá la impresión. Selecciona “Guardar como PDF”.";
        if (typeof window.print !== "function") throw new Error("Este navegador no ofrece la función de impresión. Abre la página en un navegador compatible e intenta de nuevo.");
        setPrintStatus("Solicitando impresión. En el diálogo del navegador, elige “Guardar como PDF”.");
        mtfCasePrintPending = true;
        window.addEventListener("afterprint", () => {
          mtfCasePrintPending = false;
          clearMtfCaseEvidence();
          $("mtf-case-print-report").replaceChildren();
        }, { once: true });
        $("mtf-case-report-dialog").close();
        openPrintDialog("mtf-case", `Reporte_MTF_${f.station}_${f.id}_${String(values.get("serial")).trim()}`, true);
      } catch (error) {
        mtfCasePrintPending = false;
        status.textContent = error.message || "No se pudo preparar el reporte.";
        setPrintStatus(status.textContent, true);
        if (!$("mtf-case-report-dialog").open) $("mtf-case-report-dialog").showModal();
      }
    }
    $("mtf-case-report-close").addEventListener("click", () => $("mtf-case-report-dialog").close());
    $("mtf-case-report-cancel").addEventListener("click", () => $("mtf-case-report-dialog").close());
    document.querySelectorAll("#mtf-case-report-form [data-evidence-stage]").forEach(input => input.addEventListener("change", () => updateMtfCaseEvidence(input)));
    document.querySelectorAll("#mtf-case-report-form [data-evidence-target]").forEach(button => button.addEventListener("click", () => $(button.dataset.evidenceTarget).click()));
    $("mtf-case-report-form").elements.outcome.addEventListener("change", event => {
      const resolved = event.target.value === "Resuelta";
      $("mtf-case-pass-step-wrap").classList.toggle("hidden", !resolved);
      $("mtf-case-report-form").elements.passStep.required = resolved;
      if (!resolved) $("mtf-case-report-form").elements.passStep.value = "";
    });
    $("mtf-case-report-form").elements.employeeId.addEventListener("input", event => {
      const analystName = FFDG.data.analystDirectory[event.target.value.trim()];
      if (analystName) $("mtf-case-report-form").elements.analyst.value = analystName;
    });
    $("mtf-case-report-form").addEventListener("submit", submitMtfCaseReport);
    $("mtf-case-report-dialog").addEventListener("close", () => {
      if (!mtfCasePrintPending) clearMtfCaseEvidence();
    });
    return { printBatReport, printMtfReport, openMtfCaseReport, isMtfCasePilot };
  })();
  // 4. APP INITIALIZER
  (() => {
    "use strict";
    const FFDG = window.FFDG;
    const { failureCatalog, flows } = FFDG.data;
    const $ = (id) => document.getElementById(id);
    const BAT_CATALOG_STORAGE_KEY = "ffdg-bat-catalog-v1";
    const normalizeBatText = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
    const makeBatUid = item => `${item.code}::${normalizeBatText(item.label).replace(/\s+/g, "-")}`;
    const managedBatAdditions = failureCatalog.filter(item => item.managedAddition);
    const previousLedFaultLabel = "No encendido de los LEDs en panel de la IO board central";
    let savedBatCatalog = null;
    try {
      savedBatCatalog = JSON.parse(localStorage.getItem(BAT_CATALOG_STORAGE_KEY) || "null");
      if (savedBatCatalog?.version === 1 && Array.isArray(savedBatCatalog.failures) && savedBatCatalog.failures.length) {
        failureCatalog.splice(0, failureCatalog.length, ...savedBatCatalog.failures);
      }
    } catch (error) {
      console.warn("No se pudo restaurar el catálogo BAT guardado:", error);
    }
    let managedAdditionApplied = false;
    const catalogWithoutPreviousLedFaultLabel = failureCatalog.filter(item => !(
      item.code === "NDBG_092"
      && item.family === "NOBOOT"
      && normalizeBatText(item.label) === normalizeBatText(previousLedFaultLabel)
    ));
    if (catalogWithoutPreviousLedFaultLabel.length !== failureCatalog.length) {
      failureCatalog.splice(0, failureCatalog.length, ...catalogWithoutPreviousLedFaultLabel);
      managedAdditionApplied = true;
    }
    managedBatAdditions.forEach(addition => {
      const uid = addition.uid || makeBatUid(addition);
      const existing = failureCatalog.find(item => (item.uid || makeBatUid(item)) === uid);
      if (existing) {
        if (addition.customProcedure && Array.isArray(addition.steps)) {
          const sameSteps = JSON.stringify(existing.steps || []) === JSON.stringify(addition.steps);
          if (!existing.customProcedure || !sameSteps || !existing.managedAddition) {
            existing.customProcedure = true;
            existing.managedAddition = true;
            existing.steps = addition.steps.map(step => ({ ...step }));
            managedAdditionApplied = true;
          }
        }
        return;
      }
      addition.uid = uid;
      const anchorIndex = addition.insertAfterCode
        ? failureCatalog.findIndex(item => item.code === addition.insertAfterCode)
        : -1;
      failureCatalog.splice(anchorIndex >= 0 ? anchorIndex + 1 : failureCatalog.length, 0, addition);
      managedAdditionApplied = true;
    });
    failureCatalog.forEach(item => { item.uid ||= makeBatUid(item); });
    if (managedAdditionApplied) {
      try {
        localStorage.setItem(BAT_CATALOG_STORAGE_KEY, JSON.stringify({
          ...(savedBatCatalog && typeof savedBatCatalog === "object" ? savedBatCatalog : {}),
          version: 1,
          failures: failureCatalog,
          fileName: savedBatCatalog?.fileName || "ffdg.pdf",
          importedAt: savedBatCatalog?.importedAt || new Date().toISOString()
        }));
      } catch (error) {
        console.warn("No se pudo guardar la nueva falla BAT en el catálogo local:", error);
      }
    }
    FFDG.state = {
      mode: "bat",
      activeFailure: null,
      steps: [],
      index: 0,
      history: [],
      evidence: [],
      noBootReportSteps: [],
      noBootReportEvidence: { before: [], after: [] },
      noBootEvidenceLoading: { before: false, after: false },
      batDetailFailure: null,
      batDetailIndex: 0,
      batDetailCompletedThrough: -1,
      mtfSelected: null,
      mtfIndex: 0,
      mtfFinished: false,
      diagStartedAt: null,
      diagFinishedAt: null
    };
    const batEvidenceReadTokens = { before: 0, after: 0 };
    function resetNoBootReportEvidence() {
      ["before", "after"].forEach(stage => {
        batEvidenceReadTokens[stage] += 1;
        FFDG.state.noBootReportEvidence[stage] = [];
        FFDG.state.noBootEvidenceLoading[stage] = false;
        const input = $(`bat-no-boot-evidence-${stage}`);
        const preview = $(`bat-no-boot-evidence-${stage}-preview`);
        if (input) input.value = "";
        if (preview) {
          preview.replaceChildren();
          preview.setAttribute("aria-busy", "false");
        }
      });
    }
    function readBatReportImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          const decodedImage = new Image();
          decodedImage.alt = file.name;
          try {
            if (typeof decodedImage.decode === "function") {
              decodedImage.src = reader.result;
              await decodedImage.decode();
            } else {
              await new Promise((imageResolve, imageReject) => {
                decodedImage.onload = imageResolve;
                decodedImage.onerror = () => imageReject(new Error(`No se pudo decodificar la imagen ${file.name}.`));
                decodedImage.src = reader.result;
              });
            }
            resolve({ name: file.name, dataUrl: reader.result, decodedImage });
          } catch {
            reject(new Error(`No se pudo decodificar la imagen ${file.name}.`));
          }
        };
        reader.onerror = () => reject(new Error(`No se pudo leer la imagen ${file.name}.`));
        reader.readAsDataURL(file);
      });
    }
    function cloneSelectOptions(sourceId, targetId) {
      const source = $(sourceId);
      const target = $(targetId);
      target.replaceChildren(...Array.from(source.options, option => option.cloneNode(true)));
      target.value = "";
    }
    function populateNoBootStepOptions(failure) {
      const steps = FFDG.ui.getBatDetailSteps(failure);
      FFDG.state.noBootReportSteps = steps;
      const stopped = $("bat-no-boot-stopped-step");
      stopped.replaceChildren(new Option("Selecciona el procedimiento sugerido", ""));
      steps.forEach((step, index) => {
        const number = step.sourceNumber || index + 1;
        const label = `Paso ${number} · ${step.title || "Validación"}`;
        stopped.add(new Option(label, String(index)));
      });
    }
    function syncNoBootHardwareFields() {
      const changed = $("bat-no-boot-hardware-changed").value === "Sí";
      const details = $("bat-no-boot-hardware-details");
      details.classList.toggle("hidden", !changed);
      [$("bat-no-boot-damaged-part"), $("bat-no-boot-damaged-serial")].forEach(field => {
        field.required = changed;
        field.disabled = !changed;
        if (!changed) field.value = "";
      });
    }
    function openBatNoBootReport() {
      const failure = FFDG.state.batDetailFailure;
      if (!failure) return;
      const form = $("bat-no-boot-report-form");
      form.reset();
      syncNoBootHardwareFields();
      resetNoBootReportEvidence();
      cloneSelectOptions("part", "bat-no-boot-report-part");
      cloneSelectOptions("classification", "bat-no-boot-report-classification");
      cloneSelectOptions("next-action", "bat-no-boot-report-next-action");
      cloneSelectOptions("root-cause", "bat-no-boot-report-root-cause");
      cloneSelectOptions("retest", "bat-no-boot-report-retest");
      populateNoBootStepOptions(failure);
      $("bat-no-boot-report-summary").textContent = `BAT · ${failure.code} · ${failure.label}`;
      $("bat-report-family").textContent = failure.familyLabel || failure.family;
      $("bat-report-station").textContent = `BAT · ${failure.familyLabel || failure.family}`;
      $("bat-no-boot-report-status").textContent = "";
      $("bat-no-boot-report-form").querySelectorAll("[aria-invalid='true']").forEach(field => field.removeAttribute("aria-invalid"));
      FFDG.state.activeFailure = failure;
      $("bat-no-boot-report-dialog").showModal();
      $("bat-no-boot-report-serial").focus();
    }
    function submitBatNoBootReport(event) {
      event.preventDefault();
      const form = $("bat-no-boot-report-form");
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const outcome = String(values.get("outcome") || "");
      const retest = String(values.get("retest") || "");
      const status = $("bat-no-boot-report-status");
      if (outcome === "Resuelta" && retest !== "Pass (Resuelto)") {
        status.textContent = "El estado “Resuelta” requiere que el resultado del retest sea Pass.";
        $("bat-no-boot-report-retest").focus();
        $("bat-no-boot-report-outcome").setAttribute("aria-invalid", "true");
        $("bat-no-boot-report-retest").setAttribute("aria-invalid", "true");
        return;
      }
      if (FFDG.state.noBootEvidenceLoading.before || FFDG.state.noBootEvidenceLoading.after) {
        status.textContent = "Espera a que termine la preparación de las imágenes antes de generar el reporte.";
        return;
      }
      const procedureAppliedLabel = $("bat-no-boot-stopped-step").selectedOptions[0]?.textContent || "";
      const selectedRootCause = $("bat-no-boot-report-root-cause").selectedOptions[0];
      const caseReport = {
        serial: String(values.get("serial") || "").trim(),
        part: String(values.get("part") || ""),
        employeeId: String(values.get("employeeId") || "").trim(),
        analyst: String(values.get("analyst") || "").trim(),
        outcome,
        retest,
        classification: String(values.get("classification") || ""),
        nextAction: String(values.get("nextAction") || ""),
        rootCause: selectedRootCause?.textContent || "",
        actions: String(values.get("actions") || "").trim(),
        hardwareChanged: String(values.get("hardwareChanged") || ""),
        damagedPart: String(values.get("damagedPart") || "").trim(),
        damagedSerial: String(values.get("damagedSerial") || "").trim(),
        procedureAppliedLabel,
      };
      FFDG.reports.printBatReport(caseReport);
    }
    FFDG.ui.initTheme();
    $("theme-toggle").addEventListener("click", FFDG.ui.toggleTheme);
    const syncBatThemeButton = () => {
      document.querySelector("#bat-theme-toggle .bat-theme-text").textContent = $("theme-text").textContent;
      document.querySelector("#bat-theme-toggle .bat-theme-icon").innerHTML = $("theme-icon").innerHTML;
    };
    syncBatThemeButton();
    $("theme-toggle").addEventListener("click", syncBatThemeButton);
    $("bat-theme-toggle").addEventListener("click", () => {
      FFDG.ui.toggleTheme();
      syncBatThemeButton();
    });
    FFDG.ui.restoreCatalog();
    FFDG.ui.updateStationFilterCounts();
    const select = $("failure");
    const groups = {};
    failureCatalog.forEach(item => {
      if (!groups[item.familyLabel]) {
        const g = document.createElement("optgroup");
        g.label = item.familyLabel;
        groups[item.familyLabel] = g;
        select.appendChild(g);
      }
      const opt = document.createElement("option");
      opt.value = item.uid;
      opt.textContent = `${item.code} | ${item.label}`;
      groups[item.familyLabel].appendChild(opt);
    });
    const employeeIdInput = $("employee-id");
    const analystNameInput = $("technician");
    const otherAnalystWrap = $("other-analyst-wrap");
    const otherAnalystInput = $("other-analyst");
    const employeeHelp = $("employee-help");
    let lastEmployeeId = "";
    function syncAnalystName() {
      const employeeId = employeeIdInput.value.trim();
      if (employeeId !== lastEmployeeId) otherAnalystInput.value = "";
      lastEmployeeId = employeeId;
      const registeredName = FFDG.data.analystDirectory[employeeId];
      otherAnalystWrap.classList.toggle("hidden", Boolean(registeredName) || !employeeId);
      otherAnalystInput.required = Boolean(employeeId) && !registeredName;
      analystNameInput.value = registeredName || (employeeId ? otherAnalystInput.value.trim() : "");
      employeeHelp.textContent = registeredName
        ? `Analista identificado: ${registeredName}`
        : employeeId ? "Número no registrado. Captura el nombre completo en ‘Otro analista’." : "Escribe el número para completar el nombre; si no está en catálogo, podrás capturarlo.";
    }
    employeeIdInput.addEventListener("input", syncAnalystName);
    otherAnalystInput.addEventListener("input", syncAnalystName);
    let mtfOpenedOnce = false;
    $("nav-bat").addEventListener("click", () => FFDG.ui.setMode("bat"));
    $("nav-mtf").addEventListener("click", () => {
      FFDG.ui.setMode("mtf");
      if (!mtfOpenedOnce) {
        document.querySelector('.view-tg button[data-v="board"]')?.click();
        mtfOpenedOnce = true;
      }
    });
    $("start-btn").addEventListener("click", () => {
      const sn = $("serial").value.trim();
      const pn = $("part").value.trim();
      const tech = $("technician").value.trim();
      const failCode = $("failure").value;
      const selected = failureCatalog.find(f => f.uid === failCode || f.code === failCode);
      if (selected?.family !== "NOBOOT") {
        $("form-error").textContent = "El diagnóstico guiado y la identificación del nodo están disponibles únicamente para la falla No Boot.";
        return;
      }
      if (!sn || !pn || !/^\d{6}$/.test(employeeIdInput.value.trim()) || !tech || !failCode) {
        $("form-error").textContent = "Completa semana y año del serial, selecciona P/N, captura un número de empleado de 6 dígitos con su nombre y elige una falla BAT.";
        return;
      }
      $("form-error").textContent = "";
      FFDG.state.activeFailure = selected;
      FFDG.state.steps = flows.NOBOOT;
      FFDG.state.index = 0;
      FFDG.state.history = [];
      FFDG.state.diagStartedAt = new Date().toISOString();
      FFDG.state.diagFinishedAt = null;
      resetNoBootReportEvidence();
      $("step-card").classList.remove("hidden");
      $("closing-card").classList.add("hidden");
      FFDG.ui.renderHistory();
      FFDG.ui.showStep();
      $("step-card").scrollIntoView({ behavior: "smooth" });
    });
    $("yes-btn").addEventListener("click", () => {
      const step = FFDG.state.steps[FFDG.state.index];
      const note = $("step-note").value.trim();
      FFDG.state.history.push({ step: FFDG.state.index + 1, question: step.q, result: "OK", note, recommendation: "Continuar secuencia", timestamp: new Date().toISOString() });
      FFDG.ui.renderHistory();
      if (FFDG.state.index < FFDG.state.steps.length - 1) {
        FFDG.state.index += 1;
        FFDG.ui.showStep();
      } else {
        const completion = FFDG.state.activeFailure?.pdfImported && FFDG.state.activeFailure?.family !== "NOBOOT"
          ? "Se completó la secuencia FA importada del FFDG BAT. Aplicar la disposición, retest o escalamiento indicados para esta falla."
          : "Toda la secuencia de alimentación e inicialización se verificó nominalmente. No se encontró defecto de hardware reproducible. Proceder a Retest controlado (NDF/NTF).";
        FFDG.ui.finish(completion, true);
      }
    });
    $("bat-no-boot-suggestion-close").addEventListener("click", () => $("bat-no-boot-suggestion-dialog").close());
    $("bat-no-boot-suggestion-done").addEventListener("click", () => $("bat-no-boot-suggestion-dialog").close());
    $("no-btn").addEventListener("click", () => {
      const step = FFDG.state.steps[FFDG.state.index];
      const note = $("step-note").value.trim();
      FFDG.state.history.push({ step: FFDG.state.index + 1, question: step.q, result: "ANOMALÍA", note, recommendation: step.fail, timestamp: new Date().toISOString() });
      FFDG.ui.renderHistory();
      FFDG.ui.finish(step.fail, false);
    });
    $("bat-prev-btn").addEventListener("click", () => {
      if (FFDG.state.index > 0) {
        FFDG.state.history.pop();
        FFDG.state.index -= 1;
        FFDG.ui.renderHistory();
        FFDG.ui.showStep();
      }
    });
    $("reopen-btn").addEventListener("click", () => {
      $("closing-card").classList.add("hidden");
      $("step-card").classList.remove("hidden");
      if (FFDG.state.history.length > 0) {
        FFDG.state.history.pop();
        FFDG.ui.renderHistory();
        FFDG.ui.showStep();
      }
    });
    $("clear-btn").addEventListener("click", () => {
      ["serial", "part", "employee-id", "technician", "other-analyst", "action", "root-cause", "root-cause-evidence", "next-action", "step-note"].forEach(id => $(id).value = "");
      otherAnalystWrap.classList.add("hidden");
      otherAnalystInput.required = false;
      syncAnalystName();
      $("failure").value = "";
      $("failure").dispatchEvent(new Event("change", { bubbles: true }));
      $("classification").value = "";
      $("retest").value = "No aplica";
      FFDG.state.history = [];
      FFDG.state.diagStartedAt = null;
      FFDG.state.diagFinishedAt = null;
      resetNoBootReportEvidence();
      FFDG.state.evidence.forEach(item => URL.revokeObjectURL(item.url));
      FFDG.state.evidence = [];
      FFDG.ui.renderHistory();
      FFDG.ui.renderEvidence();
      $("step-card").classList.add("hidden");
      $("closing-card").classList.add("hidden");
    });
    $("new-btn").addEventListener("click", () => {
      $("closing-card").classList.add("hidden");
      resetNoBootReportEvidence();
      $("serial").value = "";
      $("action").value = "";
      $("root-cause").value = "";
      $("root-cause-evidence").value = "";
      $("next-action").value = "";
      FFDG.state.history = [];
      FFDG.state.diagStartedAt = null;
      FFDG.state.diagFinishedAt = null;
      $("classification").value = "";
      $("retest").value = "No aplica";
      FFDG.ui.renderHistory();
    });
    $("evidence-input").addEventListener("change", (e) => {
      Array.from(e.target.files).forEach(file => {
        if (file.type.startsWith("image/")) {
          FFDG.state.evidence.push({ name: file.name, url: URL.createObjectURL(file) });
        }
      });
      FFDG.ui.renderEvidence();
    });
    $("bat-no-boot-report-open").addEventListener("click", openBatNoBootReport);
    $("bat-no-boot-hardware-changed").addEventListener("change", syncNoBootHardwareFields);
    $("bat-no-boot-report-close").addEventListener("click", () => $("bat-no-boot-report-dialog").close());
    $("bat-no-boot-report-cancel").addEventListener("click", () => $("bat-no-boot-report-dialog").close());
    $("bat-no-boot-report-form").addEventListener("submit", submitBatNoBootReport);
    const clearNoBootReportValidation = () => {
      $("bat-no-boot-report-outcome").removeAttribute("aria-invalid");
      $("bat-no-boot-report-retest").removeAttribute("aria-invalid");
    };
    $("bat-no-boot-report-outcome").addEventListener("change", clearNoBootReportValidation);
    $("bat-no-boot-report-retest").addEventListener("change", clearNoBootReportValidation);
    $("bat-no-boot-report-employee").addEventListener("input", event => {
      const name = FFDG.data.analystDirectory[event.target.value.trim()];
      if (name) $("bat-no-boot-report-analyst").value = name;
    });
    document.querySelectorAll("[data-bat-evidence-target]").forEach(button => {
      button.addEventListener("click", () => $(button.dataset.batEvidenceTarget).click());
    });
    ["before", "after"].forEach(stage => {
      const input = $(`bat-no-boot-evidence-${stage}`);
      input.addEventListener("change", async () => {
        const token = ++batEvidenceReadTokens[stage];
        const files = Array.from(input.files || []).filter(file => file.type.startsWith("image/"));
        const preview = $(`bat-no-boot-evidence-${stage}-preview`);
        preview.replaceChildren();
        preview.setAttribute("aria-busy", "false");
        FFDG.state.noBootReportEvidence[stage] = [];
        FFDG.state.noBootEvidenceLoading[stage] = false;
        if (!files.length) return;
        FFDG.state.noBootEvidenceLoading[stage] = true;
        preview.textContent = "Preparando evidencia…";
        preview.setAttribute("aria-busy", "true");
        try {
          const photos = await Promise.all(files.map(readBatReportImage));
          if (token !== batEvidenceReadTokens[stage]) return;
          preview.replaceChildren();
          photos.forEach(photo => {
            const figure = document.createElement("figure");
            const image = photo.decodedImage.cloneNode(true);
            image.alt = photo.name;
            const nameLabel = document.createElement("label");
            nameLabel.textContent = "Nombre para el reporte";
            const nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = photo.caption || photo.name;
            nameInput.maxLength = 100;
            nameInput.setAttribute("aria-label", `Nombre de evidencia ${photo.name}`);
            nameInput.addEventListener("input", () => { photo.caption = nameInput.value.trim(); });
            nameLabel.appendChild(nameInput);
            figure.append(image, nameLabel);
            preview.appendChild(figure);
          });
          FFDG.state.noBootReportEvidence[stage] = photos;
          FFDG.state.noBootEvidenceLoading[stage] = false;
          preview.setAttribute("aria-busy", "false");
        } catch (error) {
          if (token !== batEvidenceReadTokens[stage]) return;
          FFDG.state.noBootEvidenceLoading[stage] = false;
          preview.setAttribute("aria-busy", "false");
          preview.textContent = "No se pudo preparar la evidencia. Vuelve a seleccionar las imágenes.";
          $("bat-no-boot-report-status").textContent = error.message;
        }
      });
    });
    $("pdf-btn").addEventListener("click", FFDG.reports.printBatReport);
    $("mtf-search").addEventListener("input", () => {
      FFDG.ui.runMotionTransition(() => {
        FFDG.ui.setMtfCatalogCollapsed(false, FFDG.state.mtfSelected);
        FFDG.ui.renderMtfList();
      });
    });
    $("mtf-pdf-select-button").addEventListener("click", () => $("mtf-pdf-file-input").click());
    $("mtf-prev").addEventListener("click", () => {
      if (FFDG.state.mtfIndex > 0) {
        FFDG.state.mtfIndex -= 1;
        FFDG.state.mtfFinished = false;
        FFDG.ui.renderMtfDetail();
      }
    });
    $("mtf-next").addEventListener("click", () => {
      const f = FFDG.state.mtfSelected;
      if (!f || FFDG.state.mtfFinished) return;
      const steps = FFDG.ui.getActiveSteps(f);
      if (FFDG.state.mtfIndex < steps.length - 1) {
        FFDG.state.mtfIndex += 1;
      } else {
        FFDG.state.mtfFinished = true;
      }
      FFDG.ui.renderMtfDetail();
    });
    $("bat-detail-next").addEventListener("click", FFDG.ui.advanceBatDetail);
    $("bat-detail-prev").addEventListener("click", FFDG.ui.retreatBatDetail);
    const scrollToTarget = target => {
      if (!target) return;
      requestAnimationFrame(() => requestAnimationFrame(() => target.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      })));
    };
    const focusSelectedBatCard = () => requestAnimationFrame(() => {
      (document.querySelector("#bat-board .bd-item.selected") || $("bat-board-search"))?.focus({ preventScroll: true });
    });
    $("bat-selection-toggle").addEventListener("click", () => {
      FFDG.ui.renderBatSelection(null);
      focusSelectedBatCard();
      scrollToTarget($("bat-failure-board"));
    });
    const openBatCatalog = () => {
      FFDG.ui.setMode("bat");
      FFDG.ui.renderBatSelection(null);
      focusSelectedBatCard();
      scrollToTarget($("bat-failure-board"));
    };
    $("bat-catalog-nav")?.addEventListener("click", openBatCatalog);
    $("bat-board-nav")?.addEventListener("click", openBatCatalog);
    $("mtf-selection-toggle").addEventListener("click", () => {
      FFDG.ui.setMtfCatalogCollapsed(false, FFDG.state.mtfSelected, true);
    });
    FFDG.ui.setMode("bat");
  })();
