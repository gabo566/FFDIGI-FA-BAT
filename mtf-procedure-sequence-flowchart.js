(() => {
  "use strict";

  const escapeXml = value => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

  const wrapText = (value, maxChars) => {
    const words = String(value ?? "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
    const lines = [];
    let line = "";
    words.forEach(word => {
      let pendingWord = word;
      if (pendingWord.length > maxChars) {
        if (line) { lines.push(line); line = ""; }
        while (pendingWord.length > maxChars) {
          lines.push(pendingWord.slice(0, maxChars));
          pendingWord = pendingWord.slice(maxChars);
        }
      }
      if (line && `${line} ${pendingWord}`.length > maxChars) {
        lines.push(line);
        line = pendingWord;
      } else {
        line = line ? `${line} ${pendingWord}` : pendingWord;
      }
    });
    if (line) lines.push(line);
    return lines;
  };

  function renderMtfProcedureStepFlowchart(container, steps, activeIndex = 0, faultLabel = "") {
    if (!container || !Array.isArray(steps) || !steps.length) return false;

    const width = 760;
    const nodeWidth = 730;
    const left = (width - nodeWidth) / 2;
    const center = width / 2;
    const gap = 24;
    const safeActiveIndex = Math.max(0, Math.min(steps.length - 1, Number(activeIndex) || 0));
    const nodes = steps.map((step, index) => {
      const title = String(step?.title ?? "").trim();
      const lines = wrapText(title, 68);
      const height = 58 + Math.max(1, lines.length) * 20;
      return { index, title, lines, height };
    });
    const paddingTop = 22;
    const totalHeight = paddingTop
      + nodes.reduce((sum, node) => sum + node.height, 0)
      + gap * (nodes.length - 1)
      + 22;
    const markerId = `mtf-step-arrow-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    let cursorY = paddingTop;
    const positionedNodes = nodes.map(node => {
      const positioned = { ...node, y: cursorY };
      cursorY += node.height + gap;
      return positioned;
    });

    const nodeMarkup = positionedNodes.map(node => {
      const active = node.index === safeActiveIndex;
      const done = node.index < safeActiveIndex;
      const fill = active
        ? "var(--md-sys-color-secondary-container)"
        : done
          ? "var(--md-sys-color-surface-container-high)"
          : "var(--md-sys-color-surface-container-low)";
      const stroke = active ? "var(--md-sys-color-primary)" : "var(--md-sys-color-outline-variant)";
      const labelY = node.y + 23;
      const textStartY = node.y + 48;
      const titleMarkup = node.lines.map((line, lineIndex) =>
        `<tspan x="${center}" y="${textStartY + lineIndex * 20}">${escapeXml(line)}</tspan>`
      ).join("");
      const markup = `<g class="mtf-procedure-step-node${active ? " is-active" : done ? " is-done" : ""}" data-step="${node.index + 1}">
        <rect x="${left}" y="${node.y}" width="${nodeWidth}" height="${node.height}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="${active ? 3 : 2}"/>
        <text x="${center}" y="${labelY}" text-anchor="middle" font-size="13" font-weight="800" fill="var(--md-sys-color-primary)">Paso ${node.index + 1}</text>
        ${titleMarkup ? `<text text-anchor="middle" font-size="16" font-weight="650" fill="var(--md-sys-color-on-surface)">${titleMarkup}</text>` : ""}
      </g>`;
      return markup;
    }).join("");
    const edgeMarkup = positionedNodes.slice(0, -1).map(node => {
      const edgeStartY = node.y + node.height + 2;
      const edgeEndY = node.y + node.height + gap - 7;
      return `<path class="mtf-procedure-step-arrow" d="M${center} ${edgeStartY}V${edgeEndY}" fill="none" stroke="var(--md-sys-color-primary)" stroke-width="2.5" marker-end="url(#${markerId})"/>`;
    }).join("");

    const summary = nodes.map((node, index) => `Paso ${index + 1}: ${node.title}`).join(". ");
    const safeLabel = escapeXml(faultLabel || "falla seleccionada");
    const accessibleSummary = escapeXml(`Secuencia visual derivada de los pasos de ${faultLabel || "la falla seleccionada"}. ${summary}. Las flechas indican únicamente el orden enumerado del procedimiento.`);
    container.innerHTML = `<p class="mtf-generated-flow-note">Secuencia visual basada en los pasos disponibles; no agrega decisiones ni resultados.</p>
      <svg class="mtf-procedure-step-flowchart" viewBox="0 0 ${width} ${totalHeight}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${accessibleSummary}" style="display:block;width:100%;height:auto;max-width:100%;max-height:min(68vh,600px);">
        <title>Secuencia de pasos · ${safeLabel}</title>
        <desc>${escapeXml(summary)}. Las flechas indican únicamente el orden enumerado del procedimiento.</desc>
        <defs><marker id="${markerId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1L9 5L0 9Z" fill="var(--md-sys-color-primary)"/></marker></defs>
        ${edgeMarkup}${nodeMarkup}
      </svg>`;
    return true;
  }

  window.FFDG = window.FFDG || {};
  window.FFDG.renderMtfProcedureStepFlowchart = renderMtfProcedureStepFlowchart;
})();
