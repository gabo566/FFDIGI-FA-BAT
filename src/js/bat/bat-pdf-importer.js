
  const fileInput = document.getElementById("bat-pdf-file-input");
  const importButton = document.getElementById("bat-pdf-import-btn");
  const status = document.getElementById("bat-pdf-status");
  const catalog = window.FFDG?.data?.failureCatalog;
  if (fileInput && importButton && status && Array.isArray(catalog)) {
    const storageKey = "ffdg-bat-catalog-v1";
    let pdfjsLibPromise;
    const loadPdfjs = () => pdfjsLibPromise ||= import("../../../vendor/pdfjs/pdf.min.mjs").then(pdfjsLib => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("../../../vendor/pdfjs/pdf.worker.min.mjs", import.meta.url).href;
      return pdfjsLib;
    });
    const normalize = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
    const canonicalLabel = value => normalize(value).replace(/\bEEMPROM\b/g, "EEPROM").replace(/\bSECUNDARY\b/g, "SECONDARY").replace(/\bNVILINK\b/g, "NVLINK").replace(/\bCLODPLATE\b/g, "COLDPLATE");
    const correctedLabel = value => String(value || "").replace(/\bEEMPROM\b/gi, "EEPROM").replace(/\bSECUNDARY\b/gi, "SECONDARY").replace(/\bNVILINK\b/gi, "NVLINK").replace(/\bCLODPLATE\b/gi, "COLDPLATE");
    const uidFor = item => item.uid || `${item.code}::${normalize(item.label).replace(/\s+/g, "-")}`;
    const familyFor = label => {
      const text = normalize(label);
      if (/NO\s*BOOT/.test(text)) return ["NOBOOT", "No Boot / Secuencia Eléctrica"];
      if (/LEAK|LEAKAGE|MANIFOLD/.test(text)) return ["LEAK", "Sensores de Fuga Líquida"];
      if (/FAN|FANS|VENTILADOR/.test(text)) return ["FAN", "Ventiladores / Enfriamiento"];
      if (/FPGA|CPLD|LOGIC|LOGICA/.test(text)) return ["LOGIC", "FPGA / CPLD / Lógica"];
      return ["FRU", "FRU / EEPROM (Bus I2C/SMBus)"];
    };
    const textSimilarity = (left, right) => {
      const a = new Set(canonicalLabel(left).split(/\s+/).filter(Boolean));
      const b = new Set(canonicalLabel(right).split(/\s+/).filter(Boolean));
      const union = new Set([...a, ...b]);
      if (!union.size) return 0;
      let shared = 0;
      a.forEach(token => { if (b.has(token)) shared += 1; });
      return shared / union.size;
    };
    const setStatus = message => {
      status.hidden = false;
      status.textContent = message;
    };
    function pageLines(items) {
      const rows = [];
      items.filter(item => item.str?.trim()).forEach(item => {
        const y = item.transform?.[5] || 0;
        let row = rows.find(candidate => Math.abs(candidate.y - y) <= 2.25);
        if (!row) rows.push(row = { y, items: [] });
        row.items.push({ x: item.transform?.[4] || 0, str: item.str });
      });
      return rows.sort((a, b) => b.y - a.y).map(row => row.items.sort((a, b) => a.x - b.x)
        .map(item => item.str).join(" ").replace(/NDBG_\s+(\d+)/gi, "NDBG_$1")
        .replace(/\s+/g, " ").trim()).filter(Boolean);
    }
    function parseBatPage(lines, fileName) {
      const heading = lines.find(line => /^Error\s+.*NDBG_/i.test(line));
      if (!heading) return [];
      const codeMatches = [...heading.matchAll(/NDBG_\s*\d+/gi)].map(match => match[0].replace(/\s+/g, "").toUpperCase());
      const codes = [...new Set(codeMatches)];
      if (!codes.length) return [];
      const stationLine = lines.find(line => /^Station\s*:/i.test(line));
      const stations = stationLine?.replace(/^Station\s*:\s*/i, "").split(/[,/;&]+/).map(value => value.trim().toUpperCase()) || [];
      if (!stations.includes("BAT")) return [];
      const descriptionStart = lines.findIndex(line => /Error Description\s*\(s\)\s*:/i.test(line));
      const stepsStart = lines.findIndex(line => /^FA\s+Steps\b/i.test(line));
      if (descriptionStart < 0 || stepsStart < 0 || stepsStart <= descriptionStart) return [];
      const descriptionLines = lines.slice(descriptionStart + 1, stepsStart).filter(line =>
        !/^Back to error list$|^Last Update\s*:/i.test(line) && !/^Station\s*:/i.test(line));
      const labelsByCode = new Map();
      const unlabeledDescriptions = [];
      const noteLines = [];
      let activeDescriptionCode = "";
      let inNote = false;
      descriptionLines.forEach(line => {
        if (/^Note\s*:/i.test(line)) {
          inNote = true;
          noteLines.push(line.replace(/^Note\s*:\s*/i, "").trim());
          return;
        }
        if (inNote) {
          noteLines.push(line.trim());
          return;
        }
        const match = line.match(/^\s*(NDBG_\s*\d+)\s*:\s*(.*)$/i);
        if (match) {
          activeDescriptionCode = match[1].replace(/\s+/g, "").toUpperCase();
          labelsByCode.set(activeDescriptionCode, match[2].trim());
        } else if (activeDescriptionCode) {
          labelsByCode.set(activeDescriptionCode, `${labelsByCode.get(activeDescriptionCode)} ${line.trim()}`.trim());
        } else {
          const referencedCode = line.match(/\b(NDBG_\s*\d+)\b/i)?.[1]?.replace(/\s+/g, "").toUpperCase();
          if (referencedCode && codes.includes(referencedCode)) {
            const label = line.replace(/\(?\s*NDBG_\s*\d+\s*\)?/gi, "").trim();
            if (label) labelsByCode.set(referencedCode, label);
          } else unlabeledDescriptions.push(line.trim());
        }
      });
      const note = noteLines.join(" ").trim();
      const parsedSteps = [];
      lines.slice(stepsStart + 1).forEach(line => {
        if (/^\d+\s*\/\s*\d+$/.test(line) || /^(?:ffdg\.md|Back to error list|Last Update\s*:|Station\s*:|Error\s+NDBG_)/i.test(line)) return;
        const match = line.match(/^\s*(\d+)\s*[.)]\s*(.+)$/);
        if (match) parsedSteps.push({ number: Number(match[1]), text: match[2].trim() });
        else if (parsedSteps.length && line.trim()) parsedSteps[parsedSteps.length - 1].text += ` ${line.trim()}`;
      });
      if (!parsedSteps.length) return [];
      const fallbackLabel = (codes.length === 1 ? unlabeledDescriptions[0] : unlabeledDescriptions.join(" ")).trim();
      return codes.map((code, index) => {
        const label = labelsByCode.get(code) || (codes.length === 1 ? fallbackLabel : unlabeledDescriptions.length === codes.length ? unlabeledDescriptions[index] : "");
        if (!label) return null;
        const [family, familyLabel] = familyFor(label);
        return {
          code,
          label: label.replace(/\s+/g, " ").trim(),
          family,
          familyLabel,
          pdfImported: true,
          sourcePdf: fileName,
          steps: parsedSteps.map(step => ({
            q: `Paso ${step.number} · ${step.text}`,
            detail: note && step.number === 1 ? note : "",
            fail: "No se pudo completar este paso. Registra la observación y escala según el criterio FA del FFDG."
          }))
        };
      }).filter(Boolean);
    }
    function mergeProcedures(procedures) {
      let updated = 0;
      let added = 0;
      procedures.forEach(procedure => {
        procedure.label = correctedLabel(procedure.label);
        let match = null;
        let bestScore = 0;
        catalog.forEach(item => {
          if (item.code !== procedure.code) return;
          const score = textSimilarity(item.label, procedure.label);
          if (score > bestScore) { match = item; bestScore = score; }
        });
        if (match && bestScore >= 0.65) {
          Object.assign(match, procedure, { uid: uidFor(match) });
          updated += 1;
        } else {
          procedure.uid = uidFor(procedure);
          catalog.push(procedure);
          added += 1;
        }
      });
      return { updated, added };
    }
    async function readBatProcedures(file) {
      const pdfjsLib = await loadPdfjs();
      const document = await pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const procedures = [];
      try {
        for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
          const page = await document.getPage(pageNumber);
          const content = await page.getTextContent();
          procedures.push(...parseBatPage(pageLines(content.items), file.name));
          if (pageNumber % 15 === 0 || pageNumber === document.numPages) {
            setStatus(`Leyendo PDF: página ${pageNumber} de ${document.numPages}…`);
            await new Promise(resolve => requestAnimationFrame(resolve));
          }
        }
      } finally {
        await document.destroy();
      }
      return procedures;
    }
    function rebuildFailureSelect(selectedUid) {
      const select = document.getElementById("failure");
      if (!select) return;
      select.replaceChildren();
      const groups = new Map();
      catalog.forEach(item => {
        const label = item.familyLabel || item.family;
        if (!groups.has(label)) {
          const group = document.createElement("optgroup");
          group.label = label;
          groups.set(label, group);
          select.appendChild(group);
        }
        const option = document.createElement("option");
        option.value = uidFor(item);
        option.textContent = `${item.code} | ${item.label}`;
        groups.get(label).appendChild(option);
      });
      select.value = catalog.some(item => uidFor(item) === selectedUid) ? selectedUid : uidFor(catalog[0]);
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    async function importPdf(file) {
      if (!file) return;
      if (!/\.pdf$/i.test(file.name) && file.type !== "application/pdf") {
        setStatus("Selecciona un archivo PDF.");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setStatus("El PDF supera el límite de 50 MB.");
        return;
      }
      importButton.disabled = true;
      fileInput.disabled = true;
      try {
        setStatus(`Analizando ${file.name}…`);
        const procedures = await readBatProcedures(file);
        if (!procedures.length) throw new Error("No encontré procedimientos con Station: BAT, Error Description(s) y FA Steps en este PDF.");
        const previousUid = document.getElementById("failure")?.value;
        const { updated, added } = mergeProcedures(procedures);
        const savedAt = new Date().toISOString();
        let persisted = true;
        try {
          localStorage.setItem(storageKey, JSON.stringify({ version: 1, failures: catalog, fileName: file.name, importedAt: savedAt }));
        } catch (error) {
          console.warn("No se pudo guardar el catálogo BAT localmente:", error);
          persisted = false;
        }
        rebuildFailureSelect(previousUid);
        window.FFDG.refreshBatBoard?.();
        const navSummary = document.querySelector("#nav-bat .tile-tx small");
        if (navSummary) navSummary.textContent = `Step-by-step diagnostics · ${catalog.length} NDBG codes`;
        const storageMessage = persisted ? "guardado en este navegador" : "activo solo en esta sesión; no se pudo guardar localmente";
        setStatus(`PDF procesado: ${procedures.length} procedimientos BAT · ${updated} actualizados · ${added} nuevos · ${catalog.length - updated - added} conservados · ${storageMessage}.`);
      } catch (error) {
        console.error("No se pudo importar el FFDG BAT desde PDF:", error);
        setStatus(`No se actualizó el FFDG BAT: ${error.message}`);
      } finally {
        importButton.disabled = false;
        fileInput.disabled = false;
        fileInput.value = "";
      }
    }
    importButton.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => importPdf(fileInput.files?.[0]));
    let hasSavedCatalog = false;
    try {
      const savedCatalog = JSON.parse(localStorage.getItem(storageKey) || "null");
      hasSavedCatalog = savedCatalog?.version === 1 && Array.isArray(savedCatalog.failures) && savedCatalog.failures.length > 0;
    } catch (error) {
      console.warn("No se pudo verificar el catálogo BAT guardado:", error);
    }
    if (!hasSavedCatalog && Array.isArray(window.FFDG.batPdfSeed) && window.FFDG.batPdfSeed.length) {
      const currentUid = document.getElementById("failure")?.value;
      const { updated, added } = mergeProcedures(window.FFDG.batPdfSeed);
      try {
        localStorage.setItem(storageKey, JSON.stringify({ version: 1, failures: catalog, fileName: "ffdg.pdf", importedAt: new Date().toISOString() }));
      } catch (error) {
        console.warn("No se pudo guardar el catálogo BAT inicial localmente:", error);
      }
      rebuildFailureSelect(currentUid);
      window.FFDG.refreshBatBoard?.();
      const navSummary = document.querySelector("#nav-bat .tile-tx small");
      if (navSummary) navSummary.textContent = `Step-by-step diagnostics · ${catalog.length} NDBG codes`;
      setStatus(`PDF inicial aplicado: ${updated} fallas BAT actualizadas · ${added} nuevas.`);
    }
  }
