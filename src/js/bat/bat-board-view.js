/* BAT board view */
  (() => {
    "use strict";
    const board = document.getElementById("bat-board");
    const search = document.getElementById("bat-board-search");
    const select = document.getElementById("failure");
    const catalog = window.FFDG?.data?.failureCatalog || [];
    if (!board || !search || !select || !catalog.length) return;
    let selectedCode = select.value;
    const familyOrder = ["FRU", "LEAK", "FAN", "LOGIC", "NOBOOT"];
    const familyLabels = { FRU: "FRU / EEPROM", LOGIC: "LOGIC", LEAK: "LEAKAGE", FAN: "FANS", NOBOOT: "NO BOOT" };
    const familyIcons = {
      FRU: "cpu.svg",
      LEAK: "droplet.svg",
      FAN: "fan.svg",
      LOGIC: "code-slash.svg",
      NOBOOT: "power.svg"
    };
    const familyRank = family => { const index = familyOrder.indexOf(family); return index < 0 ? 99 : index; };
    function render() {
      const familyCounts = catalog.reduce((counts, item) => {
        counts[item.family] = (counts[item.family] || 0) + 1;
        return counts;
      }, {});
      const query = search.value.trim().toLowerCase();
      const matches = catalog.filter(item => `${item.code} ${item.label} ${item.familyLabel}`.toLowerCase().includes(query));
      const groups = matches.reduce((result, item) => {
        (result[item.family] ||= []).push(item);
        return result;
      }, {});
      board.replaceChildren();
      document.getElementById("bat-board-count").textContent = `${matches.length} CASOS`;
      Object.keys(groups).sort((a, b) => familyRank(a) - familyRank(b) || familyCounts[b] - familyCounts[a]).forEach(family => {
        const column = document.createElement("section");
        column.className = "bd-col";
        column.dataset.st = family;
        const heading = document.createElement("div");
        heading.className = "bd-h";
        heading.title = groups[family][0].familyLabel;
        const headingLabel = document.createElement("span");
        headingLabel.className = "bd-heading-label";
        const familyIcon = familyIcons[family];
        if (familyIcon) {
          const icon = document.createElement("img");
          icon.className = "bd-family-icon";
          icon.src = `./assets/icons/${familyIcon}`;
          icon.alt = "";
          icon.setAttribute("aria-hidden", "true");
          headingLabel.appendChild(icon);
        }
        const familyName = document.createElement("span");
        familyName.className = "bd-family-label";
        familyName.textContent = familyLabels[family] || family;
        headingLabel.appendChild(familyName);
        const count = document.createElement("small");
        count.textContent = groups[family].length;
        heading.append(headingLabel, count);
        const list = document.createElement("div");
        list.className = "bd-l";
        groups[family].forEach(item => {
          const card = document.createElement("button");
          card.type = "button";
          card.dataset.uid = item.uid;
          card.className = `bd-item${item.uid === selectedCode ? " selected" : ""}`;
          card.setAttribute("aria-label", `Seleccionar ${item.code}: ${item.label}`);
          card.setAttribute("aria-pressed", String(item.uid === selectedCode));
          const code = document.createElement("b");
          code.textContent = item.code;
          const label = document.createElement("span");
          label.textContent = item.label;
          const meta = document.createElement("small");
          meta.textContent = item.familyLabel;
          card.append(code, label, meta);
          card.addEventListener("click", () => {
            selectedCode = item.uid;
            select.value = item.uid;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            board.querySelectorAll(".bd-item").forEach(node => node.classList.toggle("selected", node === card));
            const detailPanel = document.getElementById("bat-failure-detail");
            if (detailPanel) requestAnimationFrame(() => requestAnimationFrame(() => detailPanel.scrollIntoView({
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
              block: "start"
            })));
          });
          list.appendChild(card);
        });
        column.append(heading, list);
        board.appendChild(column);
      });
    }
    search.addEventListener("input", () => window.FFDG.ui.runMotionTransition(render));
    select.addEventListener("change", () => {
      selectedCode = select.value;
      const selectedFailure = catalog.find(item => item.uid === selectedCode || item.code === selectedCode);
      window.FFDG.ui.renderBatSelection(selectedFailure || null);
      board.querySelectorAll(".bd-item").forEach(node => {
        const isSelected = node.dataset.uid === selectedCode;
        node.classList.toggle("selected", isSelected);
        node.setAttribute("aria-pressed", String(isSelected));
      });
    });
    render();
    window.FFDG.refreshBatBoard = render;
  })();