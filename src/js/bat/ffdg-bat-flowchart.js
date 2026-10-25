(() => {
  "use strict";

  const escape = value => String(value ?? "").replace(/[&<>"']/g,
    char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const translateFlowText = value => String(value ?? "")
    .replace(/¿BAT logra resolver y hacer ping a la IP del BMC\?/i, "Can BAT resolve and ping the BMC IP?")
    .replace(/Enlace entre Biancas \(B2B y Clink\)/i, "Link between Biancas (B2B and Clink)")
    .replace(/Ruta Standby y comunicación BMC\/HMC/i, "Standby path and BMC/HMC communication")
    .replace(/Verificación del cableado PDB por P\/N/i, "Verify PDB cabling by P/N")
    .replace(/Medición PDB e inspección física/i, "PDB measurement and physical inspection")
    .replace(/Aislamiento B2B y revisión de Biancas/i, "B2B isolation and Bianca inspection")
    .replace(/Confirmación con unidad Golden y retest/i, "Confirm with Golden unit and retest")
    .replace(/Validación de ruteo del ventilador\s*(\d+)/gi, "Fan $1 routing validation")
    .replace(/Validar resultados y hacer reseat del ventilador\s*(\d+)/gi, "Validate results and reseat Fan $1")
    .replace(/Validar las tarjetas del panel de la IO board central/gi, "Validate the central panel IO board cards")
    .replace(/Validar el correcto ensamble del cable de la IO board del panel central/gi, "Validate correct assembly of the central panel IO board cable")
    .replace(/Validar el firmware de los componentes del hardware principal BMC\/HMC/gi, "Validate the firmware of the main BMC/HMC hardware components")
    .replace(/Update firmware de los componentes/gi, "Update component firmware")
    .replace(/Validar mediante BAT Script el firmware actualizado/gi, "Validate the updated firmware using the BAT script")
    .replace(/\bPaso\b/gi, "Step");
  const layout = {
    stepLeft: 190, stepWidth: 480, stepGap: 28, stepTop: 270,
    failBus: 80, validationBus: 760, passBus: 1090,
    decisionX: 930, decisionWidth: 270, decisionHeight: 120,
    startX: 450, startWidth: 350, acWidth: 310, acY: 170,
    pillHeight: 64, successX: 1130, successWidth: 300,
    escalationX: 190, escalationWidth: 400, padding: 30,
    fontSize: 16, lineHeight: 22, textPadding: 40
  };
  const wrap = (value, maxChars = 72) => {
    const lines = [];
    let line = "";
    for (const word of String(value).split(/\s+/)) {
      if (line && (line + " " + word).length > maxChars) { lines.push(line); line = word; }
      else line = line ? line + " " + word : word;
    }
    if (line) lines.push(line);
    return lines;
  };

  function render(container, steps, activeIndex = 0, completedThrough = -1) {
    if (!container) return;
    if (!steps.length) {
      container.innerHTML = '<div class="mtf-no-procedure">No diagram was generated because the catalog contains no steps for this failure.</div>';
      return;
    }
    const l = layout;
    const terminal = steps.find(step => step.isEscalation);
    const actions = terminal ? steps.slice(0, steps.indexOf(terminal)) : steps;
    let cursor = l.stepTop;
    const nodes = steps.map((step, index) => {
      const lines = wrap(`Step ${index + 1} of ${steps.length}: ${translateFlowText(step.title || "Diagnostic step")}`,
        Math.floor((l.stepWidth - l.textPadding) / (l.fontSize * 0.56)));
      const height = Math.max(72, lines.length * l.lineHeight + 28);
      const center = cursor + height / 2;
      cursor += height + l.stepGap;
      return { step, index, lines, height, center };
    });
    const firstCenter = nodes[0].center;
    const last = actions.length ? nodes[actions.length - 1] : nodes[0];
    const validationY = actions.length ? nodes[Math.floor((actions.length - 1) / 2)].center : firstCenter;
    const failBottom = Math.max(last.center + last.height / 2 + 46, validationY + l.decisionHeight / 2 + 28);
    const terminalCenter = actions.length ? failBottom + 72 : firstCenter;
    const escalationY = terminalCenter - l.pillHeight / 2;
    const centerX = l.stepLeft + l.stepWidth / 2;
    const arrow = 'marker-end="url(#bat-fc-arrow)"';
    const redArrow = 'marker-end="url(#bat-fc-arrow-red)"';
    const path = (d, red = false, end = false) => `<path class="fc-l${red ? " fc-lr" : ""}" d="${d}"${end ? " " + (red ? redArrow : arrow) : ""}/>`;
    const label = (x, y, text, fail = false) => {
      const width = Math.max(58, text.length * 6.6 + 18);
      const className = fail ? "fc-edge-label fc-edge-label-fail" : "fc-edge-label fc-edge-label-pass";
      return `<g class="${className}"><rect x="${x - 8}" y="${y - 17}" width="${width}" height="24" rx="12"/><text class="${fail ? "fc-f" : "fc-p"}" x="${x + width / 2 - 8}" y="${y}">${escape(text)}</text></g>`;
    };
    const junction = (x, y, fail = false) => `<circle cx="${x}" cy="${y}" r="5" fill="var(--ffdg-flow-${fail ? "failure" : "connector"})" stroke="#fff" stroke-width="2"/>`;
    const pill = (x, y, width, text, kind) => `<g class="fc-g ${kind}"><rect class="fc-n" x="${x}" y="${y}" width="${width}" height="${l.pillHeight}" rx="24"/><text x="${x + width / 2}" y="${y + l.pillHeight / 2 + 5}" font-size="${l.fontSize}" text-anchor="middle">${escape(text)}</text></g>`;
    const diamond = (x, y, width, lines) => `<g class="fc-g fc-dm"><polygon class="fc-n" points="${x},${y - l.decisionHeight / 2} ${x + width / 2},${y} ${x},${y + l.decisionHeight / 2} ${x - width / 2},${y}"/>${lines.map((line, i) => `<text x="${x}" y="${y - 7 + i * l.lineHeight}" font-size="${l.fontSize}" text-anchor="middle">${escape(line)}</text>`).join("")}</g>`;
    const width = l.successX + l.successWidth + l.padding;
    const height = terminalCenter + l.pillHeight / 2 + l.padding;
    let svg = `<svg class="bat-diagnostic-flowchart" viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="BAT flowchart with all steps connected to a shared BAT station validation; Pass continues to MTF and Fail advances to the next step or escalates at the end" style="display:block">
      <defs><marker id="bat-fc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path class="fc-ar" d="M0 1.2L9 5 0 8.8z"/></marker><marker id="bat-fc-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path class="fc-arr" d="M0 1.2L9 5 0 8.8z"/></marker></defs>`;
    svg += pill(l.startX - l.startWidth / 2, 18, l.startWidth, "Run the BAT station script", "on");
    svg += path(`M${l.startX} ${18 + l.pillHeight}V${l.acY - l.decisionHeight / 2}`, false, true);
    svg += diamond(l.startX, l.acY, l.acWidth, ["Passes after an", "AC cycle"]);
    // Both Pass branches reach the same MTF outcome; paths remain unchanged in meaning.
    svg += path(`M${l.startX + l.acWidth / 2} ${l.acY}H${l.successX}`, false, true);
    svg += label(740, l.acY - 12, "Pass");
    svg += pill(l.successX, l.acY - l.pillHeight / 2, l.successWidth, "Proceed with MTF testing", "fc-ok");
    const firstTarget = actions.length ? l.stepLeft : l.escalationX;
    svg += path(`M${l.startX - l.acWidth / 2} ${l.acY}H${l.failBus}V${firstCenter}H${firstTarget}`, false, true);
    svg += label(l.startX - l.acWidth / 2 - 48, l.acY - 12, "Fail", true);
    nodes.forEach(node => {
      if (node.step.isEscalation) {
        svg += pill(l.escalationX, escalationY, l.escalationWidth, translateFlowText(node.step.title), "fc-er");
        return;
      }
      const state = node.index <= completedThrough ? "is-complete" : node.index === activeIndex ? "is-active" : "is-pending";
      const text = node.lines.map((line, i) => `<tspan x="${centerX}" y="${node.center - (node.lines.length - 1) * l.lineHeight / 2 + i * l.lineHeight + 5}">${escape(line)}</tspan>`).join("");
      svg += `<g class="fc-g fc-step ${state}"><rect class="fc-n" x="${l.stepLeft}" y="${node.center - node.height / 2}" width="${l.stepWidth}" height="${node.height}" rx="10"/><text font-size="${l.fontSize}" text-anchor="middle">${text}</text></g>`;
      svg += path(`M${l.stepLeft + l.stepWidth} ${node.center}H${l.validationBus}`) + junction(l.validationBus, node.center);
    });
    if (actions.length > 1) svg += path(`M${l.validationBus} ${firstCenter}V${last.center}`);
    if (actions.length) {
      svg += path(`M${l.validationBus} ${validationY}H${l.decisionX - l.decisionWidth / 2}`, false, true);
      svg += diamond(l.decisionX, validationY, l.decisionWidth, ["BAT station", "validation"]);
      svg += path(`M${l.decisionX + l.decisionWidth / 2} ${validationY}H${l.passBus}V${l.acY}`);
      svg += label(l.decisionX + l.decisionWidth / 2 + 8, validationY - 12, "Pass");
      svg += junction(l.passBus, l.acY);
      svg += label(l.decisionX + 12, validationY + l.decisionHeight / 2 + 20, "Fail", true);
      if (actions.length > 1) {
        svg += path(`M${l.decisionX} ${validationY + l.decisionHeight / 2}V${failBottom}H${l.failBus}`, true);
        svg += path(`M${l.failBus} ${failBottom}V${nodes[1].center}`, true) + junction(l.failBus, failBottom, true);
        for (let index = 1; index < actions.length; index++) {
          const y = nodes[index].center;
          svg += junction(l.failBus, y, true) + path(`M${l.failBus} ${y}H${l.stepLeft}`, true, true);
          svg += label(10, y - 14, `Step ${index} fail → step ${index + 1}`, true);
        }
        svg += path(`M${l.failBus} ${failBottom}V${terminalCenter}H${l.escalationX}`, true, true);
        svg += label(10, terminalCenter - 34, `Step ${actions.length} fail → escalate`, true);
      } else {
        svg += path(`M${l.decisionX} ${validationY + l.decisionHeight / 2}V${terminalCenter}H${l.escalationX + l.escalationWidth}`, true, true);
      }
    }
    if (!terminal) svg += pill(l.escalationX, escalationY, l.escalationWidth, "Move to Secondary Level FA", "fc-er");
    container.innerHTML = svg + "</svg>";
  }

  window.FFDG = window.FFDG || {};
  window.FFDG.renderBatDiagnosticFlowchart = render;
})();
