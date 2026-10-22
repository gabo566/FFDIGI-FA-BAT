(() => {
  const dialog = document.getElementById("mtf-topology-modal");
  const openButton = document.getElementById("mtf-topology-open");
  const closeButton = document.getElementById("mtf-topology-close");
  if (!dialog || !openButton || !closeButton) return;
  openButton.addEventListener("click", () => {
    dialog.showModal();
    closeButton.focus();
  });
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
})();