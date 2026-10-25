(() => {
    const dialog = document.getElementById("mtf-flowchart-modal");
    const openButtons = [document.getElementById("mtf-flowchart-open"), document.getElementById("bat-flowchart-open")].filter(Boolean);
    const closeButton = document.getElementById("mtf-flowchart-close");
    const zoomButton = document.getElementById("mtf-flowchart-zoom");
    const content = document.getElementById("mtf-flowchart-modal-content");
    if (!dialog || !openButtons.length || !closeButton || !zoomButton || !content) return;
    let lastTrigger = null;
    let zoomScale = 1;
    let fittedDiagramSize = null;
    const maxZoomScale = 3;
    function fitDiagramToModal() {
      const stage = content.querySelector(".flowchart-modal-stage");
      const diagram = stage?.firstElementChild;
      if (!stage || !diagram) return;
      const svgBox = diagram.tagName.toLowerCase() === "svg"
        ? Array.from(diagram.getAttribute("viewBox")?.trim().split(/[ ,]+/) || []).map(Number)
        : [];
      const naturalWidth = svgBox.length === 4 && svgBox[2] > 0
        ? svgBox[2]
        : Number(diagram.getAttribute("width")) || diagram.naturalWidth || 1200;
      const naturalHeight = svgBox.length === 4 && svgBox[3] > 0
        ? svgBox[3]
        : Number(diagram.getAttribute("height")) || diagram.naturalHeight || 800;
      const style = getComputedStyle(content);
      const availableWidth = Math.max(1, content.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
      const availableHeight = Math.max(1, content.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom));
      const fitScale = Math.min(1, availableWidth / naturalWidth, availableHeight / naturalHeight);
      fittedDiagramSize = { width: naturalWidth * fitScale, height: naturalHeight * fitScale };
      diagram.style.width = `${fittedDiagramSize.width}px`;
      diagram.style.height = `${fittedDiagramSize.height}px`;
      diagram.style.maxWidth = "none";
      diagram.style.maxHeight = "none";
      stage.style.height = `${fittedDiagramSize.height * zoomScale}px`;
    }
    function setZoomScale(nextScale) {
      const stage = content.querySelector(".flowchart-modal-stage");
      const diagram = stage?.firstElementChild;
      if (!stage || !diagram || !fittedDiagramSize) return;
      zoomScale = Math.max(1, Math.min(maxZoomScale, nextScale));
      stage.style.height = `${fittedDiagramSize.height * zoomScale}px`;
      stage.style.setProperty("--flowchart-zoom", zoomScale);
      content.classList.toggle("flowchart-modal-zoomed", zoomScale > 1);
      content.scrollLeft = 0;
      zoomButton.setAttribute("aria-pressed", String(zoomScale > 1));
      zoomButton.dataset.zoomMax = String(zoomScale >= maxZoomScale);
      zoomButton.textContent = zoomScale >= maxZoomScale
        ? `Reset zoom · ${Math.round(zoomScale * 100)}%`
        : zoomScale > 1
          ? `Zoom ${Math.round(zoomScale * 100)}% · 400 dpi`
          : `Magnifier · ${diagram.dataset.flowchartDpi || 400} dpi`;
      zoomButton.setAttribute("aria-label", zoomScale >= maxZoomScale
        ? "Reset diagram zoom"
        : `Increase zoom progressively; current level ${Math.round(zoomScale * 100)} percent`);
    }
    function openDiagram(isBat, trigger) {
      const host = document.getElementById(isBat ? "bat-disposition-flow" : "mtf-flowchart-diagram");
      const sourceDiagram = host?.querySelector("svg, img");
      if (!sourceDiagram) return;
      const expandedDiagram = sourceDiagram.cloneNode(true);
      expandedDiagram.classList.remove("flowchart-zoom-target");
      expandedDiagram.removeAttribute("tabindex");
      expandedDiagram.removeAttribute("aria-haspopup");
      expandedDiagram.removeAttribute("aria-controls");
      const originalRole = sourceDiagram.dataset.flowchartOriginalRole;
      const originalLabel = sourceDiagram.dataset.flowchartOriginalLabel;
      if (originalRole) expandedDiagram.setAttribute("role", originalRole);
      else if (expandedDiagram.tagName.toLowerCase() === "svg") expandedDiagram.setAttribute("role", "img");
      else expandedDiagram.removeAttribute("role");
      if (originalLabel) expandedDiagram.setAttribute("aria-label", originalLabel);
      else if (expandedDiagram.tagName.toLowerCase() === "svg") expandedDiagram.setAttribute("aria-label", "Expanded flowchart");
      else expandedDiagram.removeAttribute("aria-label");
      delete expandedDiagram.dataset.flowchartZoomEnabled;
      delete expandedDiagram.dataset.flowchartOriginalRole;
      delete expandedDiagram.dataset.flowchartOriginalLabel;
      const highResolutionSource = !isBat ? sourceDiagram.dataset.flowchartHiResSrc : "";
      const sourceImage = expandedDiagram.querySelector("image");
      if (highResolutionSource && sourceImage) sourceImage.setAttribute("href", highResolutionSource);
      if (expandedDiagram.tagName.toLowerCase() === "svg") {
        const viewBox = expandedDiagram.getAttribute("viewBox")?.trim().split(/[ ,]+/).map(Number);
        if (viewBox?.length === 4 && viewBox[2] > 0 && viewBox[3] > 0) {
          expandedDiagram.setAttribute("width", String(viewBox[2]));
          expandedDiagram.setAttribute("height", String(viewBox[3]));
        }
      }
      expandedDiagram.removeAttribute("style");
      const stage = document.createElement("div");
      stage.className = "flowchart-modal-stage";
      stage.appendChild(expandedDiagram);
      content.replaceChildren(stage);
      content.classList.remove("flowchart-modal-zoomed");
      zoomButton.hidden = !(highResolutionSource && sourceImage);
      zoomScale = 1;
      fittedDiagramSize = null;
      content.scrollTop = 0;
      content.scrollLeft = 0;
      const faultTitle = document.getElementById(isBat ? "bat-detail-title" : "mtf-detail-title")?.textContent.trim();
      document.getElementById("mtf-flowchart-modal-title").textContent = faultTitle ? `Flowchart · ${faultTitle}` : "Flowchart";
      lastTrigger = trigger;
      dialog.showModal();
      requestAnimationFrame(() => {
        fitDiagramToModal();
        setZoomScale(1);
      });
      closeButton.focus({ preventScroll: true });
    }
    function prepareDiagramTarget(host, isBat) {
      const target = host.querySelector("svg, img");
      if (!target || target.dataset.flowchartZoomEnabled === "true") return;
      target.dataset.flowchartZoomEnabled = "true";
      target.dataset.flowchartOriginalRole = target.getAttribute("role") || "";
      target.dataset.flowchartOriginalLabel = target.getAttribute("aria-label") || "";
      const failureTitle = document.getElementById(isBat ? "bat-detail-title" : "mtf-detail-title")?.textContent.trim();
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-haspopup", "dialog");
      target.setAttribute("aria-controls", dialog.id);
      target.setAttribute("aria-label", `Enlarge diagram${failureTitle ? ` of ${failureTitle}` : ""}`);
      target.classList.add("flowchart-zoom-target");
      target.addEventListener("click", () => openDiagram(isBat, target));
      target.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openDiagram(isBat, target);
      });
    }
    const diagramSurfaces = [
      { host: document.getElementById("bat-disposition-flow"), isBat: true },
      { host: document.getElementById("mtf-flowchart-diagram"), isBat: false }
    ];
    diagramSurfaces.forEach(({ host, isBat }) => {
      if (!host) return;
      new MutationObserver(() => prepareDiagramTarget(host, isBat)).observe(host, { childList: true, subtree: true });
      prepareDiagramTarget(host, isBat);
    });
    openButtons.forEach(openButton => openButton.addEventListener("click", () => {
      openDiagram(openButton.id === "bat-flowchart-open", openButton);
    }));
    zoomButton.addEventListener("click", () => {
      setZoomScale(zoomScale >= maxZoomScale ? 1 : zoomScale + 0.25);
    });
    content.addEventListener("wheel", event => {
      if (zoomButton.hidden || !dialog.open || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      setZoomScale(zoomScale * Math.exp(-event.deltaY * 0.0015));
    }, { passive: false });
    window.addEventListener("resize", () => {
      if (!dialog.open) return;
      fitDiagramToModal();
      setZoomScale(zoomScale);
    });
    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      content.classList.remove("flowchart-modal-zoomed");
      zoomButton.hidden = true;
      zoomButton.setAttribute("aria-pressed", "false");
      zoomButton.dataset.zoomMax = "false";
      zoomScale = 1;
      fittedDiagramSize = null;
      if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    });
  })();
