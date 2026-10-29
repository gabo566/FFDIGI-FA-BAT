(() => {
  let initialized = false;
  let dependencyObserver = null;

  function initializeFlowchartModal() {
    if (initialized) return;
    const dialog = document.getElementById("mtf-flowchart-modal");
    const surfaces = {
      bat: { hostId: "bat-disposition-flow", titleId: "bat-detail-title", isBat: true },
      mtf: { hostId: "mtf-flowchart-diagram", titleId: "mtf-detail-title" },
      l11: { hostId: "l11-flowchart-preview", titleId: "l11-detail-heading" }
    };
    const closeButton = document.getElementById("mtf-flowchart-close");
    const zoomButton = document.getElementById("mtf-flowchart-zoom");
    const content = document.getElementById("mtf-flowchart-modal-content");
    if (!dialog || !closeButton || !zoomButton || !content) {
      if (!dependencyObserver && document.documentElement) {
        dependencyObserver = new MutationObserver(() => initializeFlowchartModal());
        dependencyObserver.observe(document.documentElement, { childList: true, subtree: true });
      }
      return;
    }
    initialized = true;
    dependencyObserver?.disconnect();
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
    function openDiagram(surfaceName, trigger) {
      const surface = surfaces[surfaceName];
      if (!surface) return;
      const host = document.getElementById(surface.hostId);
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
      const highResolutionSource = !surface.isBat ? sourceDiagram.dataset.flowchartHiResSrc : "";
      const sourceImage = expandedDiagram.matches("img") ? expandedDiagram : expandedDiagram.querySelector("image");
      if (highResolutionSource && sourceImage?.tagName.toLowerCase() === "img") {
        expandedDiagram.addEventListener("load", () => {
          if (!dialog.open || !content.contains(expandedDiagram)) return;
          fitDiagramToModal();
          setZoomScale(zoomScale);
        }, { once: true });
        expandedDiagram.src = highResolutionSource;
      } else if (highResolutionSource && sourceImage) {
        sourceImage.setAttribute("href", highResolutionSource);
      }
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
      const faultTitle = sourceDiagram.dataset.flowchartTitle || document.getElementById(surface.titleId)?.textContent.trim();
      document.getElementById("mtf-flowchart-modal-title").textContent = faultTitle ? `Flowchart · ${faultTitle}` : "Flowchart";
      lastTrigger = trigger;
      dialog.showModal();
      requestAnimationFrame(() => {
        fitDiagramToModal();
        setZoomScale(1);
        if (expandedDiagram.matches("img") && expandedDiagram.complete && expandedDiagram.naturalWidth) {
          fitDiagramToModal();
          setZoomScale(1);
        }
      });
      closeButton.focus({ preventScroll: true });
    }
    function prepareDiagramTarget(host, surfaceName) {
      const target = host.querySelector("svg, img");
      if (!target || target.dataset.flowchartZoomEnabled === "true") return;
      target.dataset.flowchartZoomEnabled = "true";
      target.dataset.flowchartOriginalRole = target.getAttribute("role") || "";
      target.dataset.flowchartOriginalLabel = target.getAttribute("aria-label") || "";
      const surface = surfaces[surfaceName];
      const failureTitle = target.dataset.flowchartTitle || document.getElementById(surface.titleId)?.textContent.trim();
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-haspopup", "dialog");
      target.setAttribute("aria-controls", dialog.id);
      target.setAttribute("aria-label", `Enlarge diagram${failureTitle ? ` of ${failureTitle}` : ""}`);
      target.classList.add("flowchart-zoom-target");
      target.addEventListener("click", () => openDiagram(surfaceName, target));
      target.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openDiagram(surfaceName, target);
      });
    }
    const diagramSurfaces = [
      { host: document.getElementById(surfaces.bat.hostId), surface: "bat" },
      { host: document.getElementById(surfaces.mtf.hostId), surface: "mtf" },
      { host: document.getElementById(surfaces.l11.hostId), surface: "l11" }
    ];
    diagramSurfaces.forEach(({ host, surface }) => {
      if (!host) return;
      new MutationObserver(() => prepareDiagramTarget(host, surface)).observe(host, { childList: true, subtree: true });
      prepareDiagramTarget(host, surface);
    });
    document.addEventListener("click", event => {
      const button = event.target instanceof Element
        ? event.target.closest("#mtf-flowchart-open, #bat-flowchart-open, #l11-flowchart-open")
        : null;
      if (!button) return;
      const surface = button.id === "bat-flowchart-open" ? "bat" : button.id === "l11-flowchart-open" ? "l11" : "mtf";
      openDiagram(surface, button);
    });
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
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeFlowchartModal, { once: true });
  window.addEventListener("load", initializeFlowchartModal, { once: true });
  if (document.readyState !== "loading") initializeFlowchartModal();
})();
