(() => {
  "use strict";

  const referenceMap = window.FFDG_L11_REFERENCE_IMAGES || {};

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function openGallery(references, trigger, errorCode, procedureId) {
    const heading = `Reference Images · ${errorCode || "L11 FA"}`;
    if (typeof window.FFDG_OPEN_REFERENCE_GALLERY === "function") {
      window.FFDG_OPEN_REFERENCE_GALLERY(heading, references, trigger, `l11-${procedureId}`);
      return;
    }
    if (typeof window.FFDG_MTF_OPEN_REFERENCE === "function") {
      window.FFDG_MTF_OPEN_REFERENCE(references[0], trigger);
    }
  }

  function render(host, procedure, errorCode) {
    if (!host) return;
    const references = referenceMap[procedure?.id] || [];
    host.replaceChildren();
    host.hidden = references.length === 0;
    if (!references.length) return;

    const heading = node("div", "l11-reference-heading");
    heading.append(
      node("strong", "", "Reference Images"),
      node("span", "l11-reference-count", String(references.length))
    );
    const grid = node("div", "l11-reference-grid");

    references.forEach(reference => {
      const figure = node("figure", "l11-reference-item");
      const openButton = node("button", "l11-reference-thumbnail");
      openButton.type = "button";
      openButton.setAttribute("aria-label", `Enlarge reference image: ${reference.alt}`);
      openButton.setAttribute("aria-haspopup", "dialog");
      const image = node("img", "");
      image.src = reference.src;
      image.alt = reference.alt;
      image.loading = "lazy";
      image.decoding = "async";
      openButton.append(image);
      openButton.addEventListener("click", () => openGallery(references, openButton, errorCode, procedure.id));

      const caption = node("figcaption", "", `${reference.caption} · PDF p. ${reference.sourcePage}`);
      figure.append(openButton, caption);
      if (reference.instructions) figure.append(node("p", "l11-reference-guidance", reference.instructions));
      grid.append(figure);
    });

    host.append(heading, grid);
  }

  window.FFDG_L11_REFERENCE_VIEW = { render };
})();
