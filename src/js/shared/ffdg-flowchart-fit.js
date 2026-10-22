(() => {
  "use strict";

  // Fit the complete drawing, including labels, without moving any nodes or edges.
  const hosts = ["bat-disposition-flow", "mtf-flowchart-diagram"]
    .map(id => document.getElementById(id)).filter(Boolean);
  const scheduled = new WeakSet();
  function schedule(host) {
    if (scheduled.has(host)) return;
    scheduled.add(host);
    requestAnimationFrame(() => {
      scheduled.delete(host);
      const svg = host.querySelector(":scope > svg");
      if (!svg || !host.clientWidth || !host.clientHeight) return;
      // Raster figures already include their original page framing.
      if (svg.querySelector("image")) return;
      try {
        const bounds = svg.getBBox();
        if (![bounds.x, bounds.y, bounds.width, bounds.height].every(Number.isFinite)
            || bounds.width <= 0 || bounds.height <= 0) return;
        // Leave room for stroke widths, arrowheads and focus outlines.
        const padding = Math.max(16, Math.max(bounds.width, bounds.height) * 0.025);
        svg.setAttribute("viewBox", [bounds.x - padding, bounds.y - padding,
          bounds.width + padding * 2, bounds.height + padding * 2].join(" "));
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      } catch {
        // Hidden/detached SVGs keep their original viewBox until visible again.
      }
    });
  }
  hosts.forEach(host => {
    new MutationObserver(() => schedule(host)).observe(host, { childList: true, subtree: true });
    if (typeof ResizeObserver === "function") new ResizeObserver(() => schedule(host)).observe(host);
    schedule(host);
  });
  if (document.fonts?.ready) document.fonts.ready.then(() => hosts.forEach(schedule));
})();
