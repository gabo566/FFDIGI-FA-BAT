(() => {
  "use strict";

  const escape = value => String(value ?? "").replace(/[&<>"']/g,
    char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const style = {
    width: 480, fontSize: 16, lineHeight: 22, gap: 28,
    actionX: 260, checkX: 500, checkWidth: 310, decisionHeight: 120,
    failBus: 800, returnX: 130, validationX: 1110, validationWidth: 270,
    loopX: 1320, successWidth: 300, successHeight: 64, padding: 32
  };
  const wrap = (value, limit) => {
    const lines = [];
    let line = "";
    for (let word of String(value).replace(/\s+/g, " ").trim().split(" ")) {
      if (word.length > limit) {
        if (line) { lines.push(line); line = ""; }
        while (word.length > limit) { lines.push(word.slice(0, limit)); word = word.slice(limit); }
      }
      if (line && (line + " " + word).length > limit) { lines.push(line); line = word; }
      else line = line ? line + " " + word : word;
    }
    if (line) lines.push(line);
    return lines;
  };
  const isEscalation = title => /(?:move|escal|mover).{0,50}(?:secondary|2nd|second|nivel\s*2|level\s*2)|(?:secondary|2nd|second).{0,20}\bFA\b/i.test(title);

  function renderMtfProcedureStepFlowchart(container, steps, activeIndex = 0, faultLabel = "") {
    if (!container || !Array.isArray(steps) || !steps.length) return false;
    const s = style;
    const active = Math.max(0, Math.min(steps.length - 1, Number(activeIndex) || 0));
    const id = "mtf-route-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    const nodes = steps.map((step, index) => {
      const title = String(step?.title || step?.q || "Paso " + (index + 1)).trim();
      const lines = wrap("Paso " + (index + 1) + " · " + title, Math.floor((s.width - 40) / (s.fontSize * 0.56)));
      return { index, title, lines, height: Math.max(72, lines.length * s.lineHeight + 28), escalation: isEscalation(title) };
    });
    nodes[0].y = 18;
    const checkY = nodes[0].y + nodes[0].height + 96;
    let cursor = checkY + s.decisionHeight / 2 + 80;
    nodes.slice(1).forEach(node => { node.y = cursor; cursor += node.height + s.gap; });
    const validationY = checkY + 200;
    const station = String(faultLabel).split(" · ")[0].trim();
    const checkLines = steps.some(step => /run_cable_check/i.test((step.title || step.q || "") + " " + (step.detail || "")))
      ? ["Run_cable_check", "script"] : ["Validar resultado", "Re-Test"];
    const validationLines = wrap("Re-run diags up to and including " + (station || "the failing station"), 25);
    const validationHeight = Math.max(s.decisionHeight, validationLines.length * s.lineHeight + 56);
    const successY = validationY + validationHeight / 2 + 56;
    const onlyEscalation = nodes.length === 1 && nodes[0].escalation;
    const height = onlyEscalation ? nodes[0].y + nodes[0].height + s.padding
      : Math.max(cursor, successY + s.successHeight) + s.padding;
    const width = s.loopX + s.padding;
    const text = (x, y, lines) => '<text text-anchor="middle" font-size="' + s.fontSize + '" font-weight="700">' +
      lines.map((line, i) => '<tspan x="' + x + '" y="' + (y - (lines.length - 1) * s.lineHeight / 2 + i * s.lineHeight + 5) + '">' + escape(line) + "</tspan>").join("") + "</text>";
    const edge = (d, label = "", x = 0, y = 0, marker = true) => {
      const kind = label === "Pass" ? " is-pass" : label === "Fail" ? " is-fail" : "";
      const labelMarkup = label
        ? '<rect class="mtf-flow-edge-label-bg" x="' + (x - Math.max(28, label.length * 4.8 + 10)) + '" y="' + (y - 18) + '" width="' + Math.max(56, label.length * 9.6 + 20) + '" height="26" rx="13"/><text class="mtf-flow-edge-label" x="' + x + '" y="' + y + '" font-size="13" font-weight="800">' + escape(label) + "</text>"
        : "";
      return '<g class="mtf-flow-edge' + kind + '"><path d="' + d + '" fill="none" stroke-width="2.5"' +
        (marker ? ' marker-end="url(#' + id + (label === "Fail" ? "-fail" : "") + ')"' : "") + "/>" + labelMarkup + "</g>";
    };
    const diamond = (x, y, w, h, lines) => '<g class="mtf-flow-node mtf-flow-node-decision"><polygon points="' +
      x + "," + (y - h / 2) + " " + (x + w / 2) + "," + y + " " + x + "," + (y + h / 2) + " " + (x - w / 2) + "," + y +
      '" stroke-width="2"/>' + text(x, y, lines) + "</g>";
    const sourceNode = node => {
      const state = node.index === active ? " is-active" : node.index < active ? " is-done is-complete" : "";
      const kind = node.escalation ? "escalation" : node.index === 0 ? "start" : "action";
      return '<g class="mtf-procedure-step-node mtf-flow-node mtf-flow-node-' + kind + state + '" data-step="' + (node.index + 1) +
        '"><rect x="' + s.actionX + '" y="' + node.y + '" width="' + s.width + '" height="' + node.height +
        '" rx="' + (node.index === 0 || node.escalation ? 24 : 10) + '" stroke-width="' + (node.index === active ? 4 : 2) +
        '"/>' + text(s.actionX + s.width / 2, node.y + node.height / 2, node.lines) + "</g>";
    };
    let paths = "", shapes = nodes.map(sourceNode).join("");
    if (!onlyEscalation) {
      paths += edge("M" + s.checkX + " " + (nodes[0].y + nodes[0].height) + "V" + (checkY - s.decisionHeight / 2));
      shapes += diamond(s.checkX, checkY, s.checkWidth, s.decisionHeight, checkLines);
      paths += edge("M" + (s.checkX + s.checkWidth / 2) + " " + checkY + "H" + s.validationX + "V" + (validationY - validationHeight / 2), "Pass", 850, checkY - 12);
      shapes += diamond(s.validationX, validationY, s.validationWidth, validationHeight, validationLines);
      paths += edge("M" + (s.validationX + s.validationWidth / 2) + " " + validationY + "H" + s.loopX + "V" + (nodes[0].y + nodes[0].height / 2) + "H" + (s.actionX + s.width), "Fail", s.loopX - 48, validationY - 12);
      paths += edge("M" + s.validationX + " " + (validationY + validationHeight / 2) + "V" + successY, "Pass", s.validationX + 12, successY - 20);
      shapes += '<g class="mtf-flow-node mtf-flow-node-end"><rect x="' + (s.validationX - s.successWidth / 2) + '" y="' + successY +
        '" width="' + s.successWidth + '" height="' + s.successHeight + '" rx="24" stroke-width="2"/>' +
        text(s.validationX, successY + s.successHeight / 2, ["Continue to Next Station"]) + "</g>";
      const actions = nodes.slice(1);
      if (actions.length) {
        const last = actions[actions.length - 1];
        paths += edge("M" + s.checkX + " " + (checkY + s.decisionHeight / 2) + "V" + (actions[0].y - s.gap) +
          "H" + s.failBus + "V" + (last.y + last.height / 2), "Fail", s.checkX + 12, checkY + s.decisionHeight / 2 + 22, false);
        actions.forEach((node, index) => {
          const y = node.y + node.height / 2;
          paths += edge("M" + s.failBus + " " + y + "H" + (s.actionX + s.width));
          if (!node.escalation) {
            const lane = s.returnX - Math.min(index * 14, 84);
            paths += edge("M" + s.actionX + " " + y + "H" + lane + "V" + checkY + "H" + (s.checkX - s.checkWidth / 2));
          }
        });
      } else {
        paths += edge("M" + s.checkX + " " + (checkY + s.decisionHeight / 2) + "V" + (checkY + 100) + "H" + s.returnX +
          "V" + (nodes[0].y + nodes[0].height / 2) + "H" + s.actionX, "Fail", s.checkX + 12, checkY + 88);
      }
    }
    const summary = nodes.map(node => "Paso " + (node.index + 1) + ": " + node.title).join(". ");
    container.innerHTML = '<p class="mtf-generated-flow-note">Ruta visual según el modelo proporcionado · Pasos de la falla seleccionada.</p>' +
      '<svg class="mtf-procedure-step-flowchart mtf-pdf-flowchart-svg mtf-generated-branch-flowchart" viewBox="0 0 ' + width + " " + height +
      '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + escape("Ruta de diagnóstico " + faultLabel + ". " + summary) +
      '" style="display:block;width:100%;height:auto;max-width:100%"><title>Ruta de diagnóstico · ' + escape(faultLabel) + "</title><desc>" + escape(summary) +
      '</desc><defs><marker id="' + id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1L9 5L0 9Z"/></marker>' +
      '<marker id="' + id + '-fail" class="mtf-flow-fail-marker" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1L9 5L0 9Z"/></marker></defs>' +
      paths + shapes + "</svg>";
    return true;
  }

  window.FFDG = window.FFDG || {};
  window.FFDG.renderMtfProcedureStepFlowchart = renderMtfProcedureStepFlowchart;
})();
