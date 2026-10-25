(() => {
  const assetBase = new URL("../../../../", document.currentScript.src);
  const image = (sourcePage, file, caption, instructions) => ({
    src: new URL(`./assets/reference-images/mtf/${file}`, assetBase).href,
    sourcePage,
    caption,
    instructions,
  });

  window.FFDG_MTF_PDF_REFERENCE_IMAGES = {
    "PDF-MTF-CASE-0001": [
      image(17, "ffdg-page-017-ref-01.png", "IMAGE_024 · detección de HGX en FirmwareInventory", "Usa la salida de FirmwareInventory para comprobar que todos los HGX instalados aparecen detectados."),
      image(17, "ffdg-page-017-ref-02.png", "IMAGE_025 · validación con Golden Interposer", "Si con el Golden Interposer aparecen todos los HGX, sustituye el interposer sospechoso."),
    ],
    "FLA-07": [
      image(23, "ffdg-page-023-ref-03.png", "Bianca primaria (J79) y secundaria (J58)", "Referencia visual de las dos tarjetas Bianca mencionadas en los pasos de actualización FPGA y revisión del cable B2B."),
    ],
    "FLA-11": [
      image(40, "ffdg-page-040-ref-04.png", "PDB J15, cable sideband 1 y Bianca JSB2", "Localiza PDB J15 y Bianca_0 JSB2 para inspeccionar, reasentar o reemplazar el cable sideband indicado."),
    ],
    "AST-07": [
      image(55, "ffdg-page-055-ref-05.png", "IMAGE_015 · ubicación de capacitores cerca de J115 y MEC47", "Para la inspección visual del paso 2, revisa la fila de capacitores AC entre J115 y el tornillo MEC47; considera también la zona J52/J54 indicada en el PDF."),
      image(55, "ffdg-page-055-ref-06.png", "IMAGE_016 · ejemplo de capacitor dañado", "Compara el componente con este ejemplo. Sustituye la Bianca sospechosa solo si confirmas daño."),
      image(55, "ffdg-page-055-ref-07.png", "IMAGE_017 · fila de capacitores próxima a J115", "Úsala durante la inspección del paso 5, después de retirar coldplate y módulo CX8 cuando el paso 4 aplique."),
      image(55, "ffdg-page-055-ref-08.png", "IMAGE_018 · ejemplo de daño cerca de J115", "Compara la fila de capacitores con este ejemplo; si se confirma daño, sustituye la Bianca sospechosa."),
    ],
    "FCT-05": [
      image(67, "ffdg-page-067-ref-09.png", "Configuración de ventiladores por Bianca y bandeja 1U/2U", "Antes de reasentar o sustituir cables, compara las conexiones con la configuración aplicable a la bandeja 1U o 2U."),
    ],
    "FCT-06": [
      image(67, "ffdg-page-067-ref-09.png", "Configuración de ventiladores por Bianca y bandeja 1U/2U", "Antes de reasentar o sustituir cables, compara las conexiones con la configuración aplicable a la bandeja 1U o 2U."),
    ],
    "AST-14": [
      image(67, "ffdg-page-067-ref-09.png", "Configuración de ventiladores por Bianca y bandeja 1U/2U", "Antes de reasentar o sustituir cables, compara las conexiones con la configuración aplicable a la bandeja 1U o 2U."),
    ],
    "PDF-MTF-CASE-0084": [
      image(67, "ffdg-page-067-ref-09.png", "Configuración de ventiladores por Bianca y bandeja 1U/2U", "Antes de reasentar o sustituir cables, compara las conexiones con la configuración aplicable a la bandeja 1U o 2U."),
    ],
    "PDF-MTF-CASE-0085": [
      image(67, "ffdg-page-067-ref-09.png", "Configuración de ventiladores por Bianca y bandeja 1U/2U", "Antes de reasentar o sustituir cables, compara las conexiones con la configuración aplicable a la bandeja 1U o 2U."),
    ],
    "PDF-MTF-CASE-0091": [
      image(75, "ffdg-page-075-ref-10.png", "IMAGE_010 · ubicación de conectores J18 y J125", "Usa el diagrama para localizar J18 (sensor de fuga CP) y J125 (sensor de fuga QD) en la Bianca."),
      image(75, "ffdg-page-075-ref-11.png", "IMAGE_011 · conectores de sensores CP y QD", "Comprueba que los cables estén conectados y que J18/J125 no estén levantados; si un conector se levantó, reemplaza la Bianca."),
      image(75, "ffdg-page-075-ref-12.png", "IMAGE_012 · ejemplo de sensor de fuga dañado", "Inspecciona el sensor por arañazos o roturas; si está dañado, reemplázalo."),
    ],
    "PDF-MTF-CASE-0092": [
      image(75, "ffdg-page-075-ref-10.png", "IMAGE_010 · ubicación de conectores J18 y J125", "Usa el diagrama para localizar J18 (sensor de fuga CP) y J125 (sensor de fuga QD) en la Bianca."),
      image(75, "ffdg-page-075-ref-11.png", "IMAGE_011 · conectores de sensores CP y QD", "Comprueba que los cables estén conectados y que J18/J125 no estén levantados; si un conector se levantó, reemplaza la Bianca."),
      image(75, "ffdg-page-075-ref-12.png", "IMAGE_012 · ejemplo de sensor de fuga dañado", "Inspecciona el sensor por arañazos o roturas; si está dañado, reemplázalo."),
    ],
    "PDF-MTF-CASE-0093": [
      image(75, "ffdg-page-075-ref-10.png", "IMAGE_010 · ubicación de conectores J18 y J125", "Usa el diagrama para localizar J18 (sensor de fuga CP) y J125 (sensor de fuga QD) en la Bianca."),
      image(75, "ffdg-page-075-ref-11.png", "IMAGE_011 · conectores de sensores CP y QD", "Comprueba que los cables estén conectados y que J18/J125 no estén levantados; si un conector se levantó, reemplaza la Bianca."),
      image(75, "ffdg-page-075-ref-12.png", "IMAGE_012 · ejemplo de sensor de fuga dañado", "Inspecciona el sensor por arañazos o roturas; si está dañado, reemplázalo."),
    ],
    "PDF-MTF-CASE-0094": [
      image(75, "ffdg-page-075-ref-10.png", "IMAGE_010 · ubicación de conectores J18 y J125", "Usa el diagrama para localizar J18 (sensor de fuga CP) y J125 (sensor de fuga QD) en la Bianca."),
      image(75, "ffdg-page-075-ref-11.png", "IMAGE_011 · conectores de sensores CP y QD", "Comprueba que los cables estén conectados y que J18/J125 no estén levantados; si un conector se levantó, reemplaza la Bianca."),
      image(75, "ffdg-page-075-ref-12.png", "IMAGE_012 · ejemplo de sensor de fuga dañado", "Inspecciona el sensor por arañazos o roturas; si está dañado, reemplázalo."),
    ],
    "FCT-13": [
      image(79, "ffdg-page-079-ref-13.png", "IMAGE_033 · ejemplo de daño en el componente blanco entre NVLinks", "Inspecciona el componente blanco situado arriba, entre los NVLinks, comparándolo con el ejemplo de daño físico."),
    ],
    "IOT-01": [
      image(88, "ffdg-page-088-ref-14.png", "IMAGE_030 · ejemplo de dispositivos BF3 detectados", "Compara la salida de mst status -v y confirma que se detecten los BF3 de ambos lados."),
      image(89, "ffdg-page-089-ref-15.png", "IMAGE_031 · configuración de INTERNAL_CPU", "Usa la salida como referencia para configurar INTERNAL_CPU_MODEL e INTERNAL_CPU_OFFLOAD_ENGINE en ambos BF3."),
      image(89, "ffdg-page-089-ref-16.png", "IMAGE_032 · interfaces rshim0 y rshim1", "Desde el host, confirma que rshim0 y rshim1 existan; si falta una, instala un Golden BF3 en esa posición y vuelve a comprobar."),
    ],
    "PDF-MTF-CASE-0112": [
      image(88, "ffdg-page-088-ref-14.png", "IMAGE_030 · ejemplo de dispositivos BF3 detectados", "Compara la salida de mst status -v y confirma que se detecten los BF3 de ambos lados."),
      image(89, "ffdg-page-089-ref-15.png", "IMAGE_031 · configuración de INTERNAL_CPU", "Usa la salida como referencia para configurar INTERNAL_CPU_MODEL e INTERNAL_CPU_OFFLOAD_ENGINE en ambos BF3."),
      image(89, "ffdg-page-089-ref-16.png", "IMAGE_032 · interfaces rshim0 y rshim1", "Desde el host, confirma que rshim0 y rshim1 existan; si falta una, instala un Golden BF3 en esa posición y vuelve a comprobar."),
    ],
    "IOT-02": [
      image(95, "ffdg-page-095-ref-17.png", "Ubicación de capacitores AC alrededor de los conectores CX7", "Inspecciona las zonas marcadas alrededor del conector CX7 correspondiente al lado indicado por mlx5_0/1 o mlx5_4/5."),
      image(96, "ffdg-page-096-ref-18.png", "Ejemplo de capacitor roto en TX Lane 9", "Compara los capacitores con el ejemplo; si se confirma daño, reemplaza la Bianca afectada."),
    ],
    "FLB-06": [
      image(100, "ffdg-page-100-ref-19.png", "IMAGE_028 · referencia para restablecer configuración BF3", "Usa la secuencia mostrada para restablecer INTERNAL_CPU_MODEL e INTERNAL_CPU_OFFLOAD_ENGINE; después ejecuta diagnósticos desde FLA."),
      image(100, "ffdg-page-100-ref-20.png", "IMAGE_029 · conexiones de alimentación y red del BF3", "Comprueba la conexión de red frontal, alimentación hacia la riser y alimentación del BF3 antes de continuar."),
    ],
    "PDF-MTF-CASE-0118": [
      image(100, "ffdg-page-100-ref-19.png", "IMAGE_028 · referencia para restablecer configuración BF3", "Usa la secuencia mostrada para restablecer INTERNAL_CPU_MODEL e INTERNAL_CPU_OFFLOAD_ENGINE; después ejecuta diagnósticos desde FLA."),
      image(100, "ffdg-page-100-ref-20.png", "IMAGE_029 · conexiones de alimentación y red del BF3", "Comprueba la conexión de red frontal, alimentación hacia la riser y alimentación del BF3 antes de continuar."),
    ],
    "RIN-15": [
      image(107, "ffdg-page-107-ref-21.png", "IMAGE_034 · identificación de modelos de backplane E1.S", "Confirma que el backplane instalado corresponda al modelo aplicable antes de revisar sus cables."),
    ],
    "PDF-MTF-CASE-0158": [
      image(134, "ffdg-page-134-ref-22.png", "Respuesta exitosa al cambio de ActiveCores", "Compara la respuesta del PATCH con el ejemplo exitoso; valida después el cambio desde el host con lscpu."),
    ],
    "PDF-MTF-CASE-0165": [
      image(142, "ffdg-page-142-ref-23.png", "IMAGE_035 · ejemplo de contacto entre sensor de fuga y coldplate", "Inspecciona el coldplate indicado por el código y confirma que el sensor no esté tocándolo ni presente daño físico."),
    ],
    "PDF-MTF-CASE-0166": [
      image(142, "ffdg-page-142-ref-23.png", "IMAGE_035 · ejemplo de contacto entre sensor de fuga y coldplate", "Inspecciona el coldplate indicado por el código y confirma que el sensor no esté tocándolo ni presente daño físico."),
    ],
    "PDF-MTF-CASE-0167": [
      image(142, "ffdg-page-142-ref-23.png", "IMAGE_035 · ejemplo de contacto entre sensor de fuga y coldplate", "Inspecciona el coldplate indicado por el código y confirma que el sensor no esté tocándolo ni presente daño físico."),
    ],
    "FLB-03": [
      image(159, "ffdg-page-159-ref-24.png", "Ejemplo de pin doblado en cable UltraPass", "Si el dispositivo afectado es CX7/CX8, inspecciona los cables y conectores UltraPass por daño, contaminación o pines doblados."),
    ],
    "PDF-MTF-CASE-0202": [
      image(159, "ffdg-page-159-ref-24.png", "Ejemplo de pin doblado en cable UltraPass", "Si el dispositivo afectado es CX7/CX8, inspecciona los cables y conectores UltraPass por daño, contaminación o pines doblados."),
    ],
    "FLB-04": [
      image(161, "ffdg-page-161-ref-25.png", "Pin doblado en conector del cable sideband", "Inspecciona ambos extremos del cable sideband y sus pines; sustituye el cable o componente si hay daño."),
      image(161, "ffdg-page-161-ref-26.png", "Header de cable sideband dañado", "Compara el conector con el ejemplo y reemplaza el componente dañado según el procedimiento."),
    ],
    "PDF-MTF-CASE-0204": [
      image(161, "ffdg-page-161-ref-25.png", "Pin doblado en conector del cable sideband", "Inspecciona ambos extremos del cable sideband y sus pines; sustituye el cable o componente si hay daño."),
      image(161, "ffdg-page-161-ref-26.png", "Header de cable sideband dañado", "Compara el conector con el ejemplo y reemplaza el componente dañado según el procedimiento."),
    ],
    "FLA-16": [
      image(172, "ffdg-page-172-ref-27.png", "IMAGE_026 · ejemplo de consulta de componentes en Reporter/BD", "Revisa la sección DATABASE COMPONENT y compara el ensamble y el número de parte del BF3 con el ejemplo correcto."),
    ],
    "PRET-04": [
      image(183, "ffdg-page-183-ref-28.png", "IMAGE_027 · interfaz enP5p9s0 operativa", "Tras ejecutar ifconfig, confirma que la interfaz enP5p9s0 aparezca y esté operativa."),
    ],
    "FTS-01": [
      image(110, "ffdg-page-110-ref-31.png", "Mapeo de puertos CX8 y BF3 · GB200/GB300", "Usa el modelo de bandeja (GB200 o GB300) y el lado del tray para identificar qué puertos mlx5 corresponden al CX8 afectado; consulta el mapeo antes de reasentar el conector Ultrapass."),
    ],
    "PDF-MTF-CASE-0133": [
      image(110, "ffdg-page-110-ref-31.png", "Mapeo de puertos CX8 y BF3 · GB200/GB300", "Usa el modelo de bandeja (GB200 o GB300) y el lado del tray para identificar qué puertos mlx5 corresponden al CX8 afectado; consulta el mapeo antes de reasentar el conector Ultrapass."),
    ],
  };

  window.FFDG_MTF_PDF_CABLE_GUIDE_REFERENCE = image(
    216,
    "ffdg-page-216-ref-29.png",
    "Cable Debug Guide · mapa de cables numerados",
    "Cuando el procedimiento remita al Cable Debug Guide, usa el número para localizar el cable antes de inspeccionarlo o reasentarlo."
  );

  // The procedure on page 54 explicitly cites the PCIe topology reference.
  window.FFDG_MTF_PDF_REFERENCE_IMAGES["AST-07"].push(image(
    231, "ffdg-page-231-ref-30.png", "Mapa PCIe/UPHY de componentes de la bandeja · Apéndice A",
    "Localiza el dispositivo y los identificadores PCIe/UPHY que aparecen en el error antes de seguir la hoja de topología PCIe indicada en el paso 1 de la página 54."
  ));
  // This legacy record contains both descriptions documented on pages 74 and 141.
  window.FFDG_MTF_PDF_REFERENCE_IMAGES["RIN-16"] = [
    ...window.FFDG_MTF_PDF_REFERENCE_IMAGES["PDF-MTF-CASE-0091"],
    ...window.FFDG_MTF_PDF_REFERENCE_IMAGES["PDF-MTF-CASE-0165"],
  ];
  // Additional variants explicitly covered by the same source procedures.
  const aliases = {
    "FLA-19": "PDF-MTF-CASE-0001",
    "FLB-05": "FLB-03",
    "FLB-07": "PDF-MTF-CASE-0118",
    "PDF-MTF-CASE-0203": "FLB-03",
    "FCT-09": "PDF-MTF-CASE-0165",
    "FCT-12": "PDF-MTF-CASE-0093",
    "IOT-04": "IOT-02"
  };
  Object.entries(aliases).forEach(([id, source]) => {
    window.FFDG_MTF_PDF_REFERENCE_IMAGES[id] = window.FFDG_MTF_PDF_REFERENCE_IMAGES[source];
  });
  // Cable-guide citations: POST (p27), power-on (p38), SSD repair (p149/p153).
  ["FLA-04", "FLA-10", "FLA-08", "FLB-02", "FLC-01", "FLC-02", "FCT-07", "FCT-10", "FCT-04", "FCT-08", "FLB-08", "FLB-15", "FLB-16"].forEach(id => {
    window.FFDG_MTF_PDF_REFERENCE_IMAGES[id] = [window.FFDG_MTF_PDF_CABLE_GUIDE_REFERENCE];
  });

  const normalize = value => String(value || "").normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  const codes = value => String(value || "").replace(/\s+/g, "").split(",").map(normalize).filter(Boolean);
  const stations = value => String(value || "").toUpperCase().split(/[,/\s]+/).filter(Boolean);
  const sameFailure = (item, source) => {
    if (!codes(item.code).some(code => codes(source.code).includes(code))) return false;
    if (!stations(item.station).some(station => stations(source.station).includes(station))) return false;
    const name = normalize(item.name), sourceName = normalize(source.name);
    return Boolean(name && sourceName && (name === sourceName ||
      (Math.min(name.length, sourceName.length) >= 32 && (name.startsWith(sourceName) || sourceName.startsWith(name)))));
  };
  const resolveAsset = src => {
    const path = String(src || "").match(/(?:^|\/)assets\/(?:reference-images(?:\/mtf)?|mtf-reference-images|flowcharts\/mtf|mtf-flowcharts)\/[^?#]+/);
    if (!path) return new URL(src, assetBase).href;
    const relativePath = path[0].replace(/^\//, "")
      .replace(/^assets\/mtf-flowcharts\//, "assets/flowcharts/mtf/")
      .replace(/^assets\/mtf-reference-images\//, "assets/reference-images/mtf/")
      .replace(/^assets\/reference-images\/(?!mtf\/)/, "assets/reference-images/mtf/");
    const relative = `./${relativePath}`;
    return new URL(relative, assetBase).href;
  };
  const sourceFlowcharts = [
    ...Object.values(window.FFDG_MTF_PDF_EXISTING_FLOWCHARTS || {}),
    ...(window.FFDG_MTF_PDF_ADDITIONS || []),
  ];
  const flowchartFiles = new Set(sourceFlowcharts
    .map(item => String(item?.flowchartImage || item?.src || "").match(/(?:^|\/)(mtf-flow-\d+\.png)$/)?.[1])
    .filter(Boolean));
  // AST-01 p. 63 is a verified legacy association registered by mtf-pdf-flowcharts.js.
  flowchartFiles.add("mtf-flow-109.png");
  window.FFDG_MTF_PDF_FLOWCHART_ZOOM_IMAGES = Object.fromEntries([...flowchartFiles].map(file => [
    file,
    new URL(`./assets/flowcharts/mtf/${file.slice(0, -4)}-400dpi.png`, assetBase).href,
  ]));
  window.FFDG_MTF_PDF_REFERENCE_ASSET_URL = resolveAsset;
  window.FFDG_MTF_ENRICH_REFERENCES = (item, catalog) => {
    const source = catalog.find(candidate => candidate.id === item.id && sameFailure(item, candidate))
      || catalog.find(candidate => sameFailure(item, candidate));
    const mapped = window.FFDG_MTF_PDF_REFERENCE_IMAGES[item.id]
      || (source ? window.FFDG_MTF_PDF_REFERENCE_IMAGES[source.id] : null)
      || [];
    const pages = new Set(mapped.map(reference => reference.sourcePage));
    const references = (item.referenceImages || []).filter(reference =>
      !(pages.has(reference.sourcePage) && /\/(?:mtf-reference-images|reference-images\/mtf)\//.test(reference.src || ""))
    ).map(reference => ({ ...reference, src: resolveAsset(reference.src) }));
    references.push(...mapped);
    const steps = [...(item.steps || []), ...(source?.steps || [])];
    if (steps.some(step => /cable debug guide/i.test(`${step.title || ""} ${step.detail || ""}`))) {
      references.push(window.FFDG_MTF_PDF_CABLE_GUIDE_REFERENCE);
    }
    const unique = new Map();
    references.forEach(reference => { if (reference.src && !unique.has(reference.src)) unique.set(reference.src, reference); });
    return { ...item, referenceImages: [...unique.values()] };
  };

  let referenceDialog, referenceTitle, referenceDescription, referenceImage, referenceCaption, referenceClose, referenceTrigger;
  window.FFDG_MTF_OPEN_REFERENCE = (reference, trigger) => {
    if (!referenceDialog) {
      referenceDialog = document.createElement("dialog");
      referenceDialog.id = "mtf-reference-modal";
      referenceDialog.className = "mtf-reference-modal";
      referenceDialog.setAttribute("aria-labelledby", "mtf-reference-modal-title");
      referenceDialog.setAttribute("aria-describedby", "mtf-reference-modal-description");
      const header = document.createElement("div");
      header.className = "flowchart-modal-head";
      const text = document.createElement("div");
      referenceTitle = document.createElement("h2");
      referenceTitle.id = "mtf-reference-modal-title";
      referenceDescription = document.createElement("p");
      referenceDescription.id = "mtf-reference-modal-description";
      referenceDescription.className = "topology-modal-description";
      referenceClose = document.createElement("button");
      referenceClose.type = "button";
      referenceClose.className = "flowchart-modal-close";
       referenceClose.setAttribute("aria-label", "Close reference image");
      referenceClose.textContent = "×";
      text.append(referenceTitle, referenceDescription);
      header.append(text, referenceClose);
      const figure = document.createElement("figure");
      figure.className = "topology-modal-figure";
      referenceImage = document.createElement("img");
      referenceImage.style.cssText = "display:block;max-width:100%;height:auto;max-height:65dvh;object-fit:contain;margin:auto;background:white";
      referenceCaption = document.createElement("figcaption");
      figure.append(referenceImage, referenceCaption);
      referenceDialog.append(header, figure);
      document.body.appendChild(referenceDialog);
      referenceClose.addEventListener("click", () => referenceDialog.close());
      referenceDialog.addEventListener("click", event => { if (event.target === referenceDialog) referenceDialog.close(); });
      referenceDialog.addEventListener("close", () => { if (referenceTrigger?.isConnected) referenceTrigger.focus({ preventScroll: true }); });
    }
    referenceTrigger = trigger;
    referenceTitle.textContent = reference.caption || "Imagen de referencia";
    referenceDescription.textContent = reference.instructions || "Referencia original del procedimiento.";
    referenceImage.src = reference.src;
    referenceImage.alt = reference.caption || "Imagen de referencia del procedimiento";
    referenceCaption.textContent = reference.sourcePage ? `FFDG PDF · página ${reference.sourcePage}` : "";
    referenceDialog.showModal();
    referenceClose.focus({ preventScroll: true });
  };

  window.FFDG_MTF_PDF_FLOWCHART_GRAPHS = {
    "FLA-07": {
      sourcePage: 24,
      actions: [
        "AC Cycle",
        "Update Bianca_1 FPGA",
        "Reseat or replace B2B cable",
        "Replace Bianca_1",
      ],
      decision: "Re-test",
      passLabel: "Pass",
      failLabel: "Fail",
      continueLabel: "Continue testing",
      escalationLabel: "Move to Secondary-Level FA",
    },
  };
})();
