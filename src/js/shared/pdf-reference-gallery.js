(() => {
  let dialog;
  let title;
  let description;
  let gallery;
  let closeButton;
  let currentTrigger = null;

  function ensureDialog() {
    if (dialog) return;

    dialog = document.createElement("dialog");
    dialog.id = "pdf-reference-gallery-dialog";
    dialog.className = "pdf-reference-gallery-dialog";
    dialog.setAttribute("aria-labelledby", "pdf-reference-gallery-title");
    dialog.setAttribute("aria-describedby", "pdf-reference-gallery-description");

    const header = document.createElement("div");
    header.className = "pdf-reference-gallery-head";
    const headingGroup = document.createElement("div");
    title = document.createElement("h2");
    title.id = "pdf-reference-gallery-title";
    description = document.createElement("p");
    description.id = "pdf-reference-gallery-description";
    closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "flowchart-modal-close";
     closeButton.setAttribute("aria-label", "Close reference images");
    closeButton.textContent = "×";
    headingGroup.append(title, description);
    header.append(headingGroup, closeButton);

    gallery = document.createElement("div");
    gallery.className = "pdf-reference-gallery-grid";
    gallery.setAttribute("role", "list");
     gallery.setAttribute("aria-label", "Failure reference images");
    dialog.append(header, gallery);
    document.body.appendChild(dialog);

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      if (currentTrigger?.isConnected) currentTrigger.focus({ preventScroll: true });
    });
  }

  function createReferenceCard(reference, index) {
    const figure = document.createElement("figure");
    figure.className = "pdf-reference-gallery-item";
    figure.setAttribute("role", "listitem");

    const image = document.createElement("img");
    image.src = reference.src;
    image.alt = reference.alt || reference.caption || `Imagen de referencia ${index + 1}`;
    image.loading = "lazy";
    image.decoding = "async";

    const zoomButton = document.createElement("button");
    zoomButton.type = "button";
    zoomButton.className = "reference-image-open pdf-reference-gallery-zoom";
     zoomButton.setAttribute("aria-label", `Enlarge image: ${image.alt}`);
    zoomButton.setAttribute("aria-haspopup", "dialog");
    zoomButton.appendChild(image);
    zoomButton.addEventListener("click", () => {
      if (typeof window.FFDG_MTF_OPEN_REFERENCE !== "function") return;
      window.FFDG_MTF_OPEN_REFERENCE({
        ...reference,
        sourcePage: reference.sourcePage || reference.page,
      }, zoomButton);
    });

    const caption = document.createElement("figcaption");
    const page = reference.sourcePage || reference.page;
    const baseCaption = reference.caption || `Imagen de referencia ${index + 1}`;
    const hasPage = page && new RegExp(`(?:página|p\\.)\\s*${page}(?:\\D|$)`, "i").test(baseCaption);
    caption.textContent = page && !hasPage ? `${baseCaption} · PDF · página ${page}` : baseCaption;
    figure.append(zoomButton, caption);

    if (reference.instructions) {
      const instructions = document.createElement("p");
      instructions.className = "reference-image-guidance";
      instructions.textContent = reference.instructions;
      figure.appendChild(instructions);
    }

    return figure;
  }

  window.FFDG_OPEN_REFERENCE_GALLERY = (heading, refs, trigger, referenceKey) => {
    const references = Array.isArray(refs) ? refs : [];
    if (!references.length) return;
    ensureDialog();
    currentTrigger = trigger;
    dialog.dataset.referenceKey = referenceKey || "";
    title.textContent = heading;
    description.textContent = `${references.length} ${references.length === 1 ? "imagen de referencia" : "imágenes de referencia"} para la falla seleccionada.`;
    gallery.replaceChildren(...references.map(createReferenceCard));
    dialog.showModal();
    closeButton.focus({ preventScroll: true });
  };

  window.FFDG_SYNC_REFERENCE_GALLERY = (referenceKey, trigger) => {
    if (!dialog?.open) return;
    if (dialog.dataset.referenceKey !== (referenceKey || "")) {
      currentTrigger = trigger || null;
      dialog.close();
      return;
    }
    if (trigger) currentTrigger = trigger;
  };
})();
