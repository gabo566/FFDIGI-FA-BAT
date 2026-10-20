# CONTEXTO_FFDIGI.md — Memoria técnica del proyecto

> Corte de auditoría: 2026-10-11. Describe el contenido observado **dentro de esta raíz Git** y su árbol de trabajo; separa archivos versionados de los cambios locales. Si el código cambia, vuelve a comprobar cada dato antes de usarlo.

## 1. Identidad y alcance

- Nombre visible en la interfaz: **NVIDIA RACKS FFDG · Guía de análisis de falla GB200 y GB300**.
- El proyecto combina un flujo BAT de diagnóstico guiado básico y un catálogo MTF de fallas de línea con procedimientos y disposiciones.
- En la interfaz, BAT se despliega como **Basic Assurance Test**; MTF se presenta como **MTF L10 Failure**. FA se usa en el sentido de análisis/escalación de falla.
- **FFDG** y **FFDIGI** aparecen como nombres/identificadores del sistema. Su expansión formal no está demostrada por los archivos del proyecto y no se debe inventar.
- Uso objetivo deducible por la interfaz: personal que selecciona fallas y consulta pasos técnicos; el reporte BAT está dirigido a revisión de Calidad. El código no implementa autenticación ni roles.
- BAT y MTF son flujos distintos: BAT guía comprobaciones iniciales y captura de diagnóstico; MTF permite buscar fallas de estación, leer pasos/comandos y consultar la ruta visual asociada.

## 2. Raíz y arquitectura actual

### Raíz efectiva

La raíz Git confirmada es este directorio (`pagina ffdg`). La página de entrada versionada es `index.html`. No hay framework de frontend ni sistema de build requerido por esa entrada: HTML, CSS y JavaScript se ejecutan en el navegador, con módulos y recursos locales.

### Archivos principales

| Ruta dentro del proyecto | Responsabilidad comprobada |
| --- | --- |
| `index.html` | Entrada principal. Contiene estructura BAT/MTF, estilos base y responsive, catálogo BAT base, 113 registros MTF base, estado/funciones `window.FFDG`, formularios, modales, importadores, diagramas SVG y plantillas de impresión. En MTF, `renderFlowchart` y el observer tardío `drawFlow` conservan diagramas fuente y, solo si no hay uno verificado, muestran una secuencia lineal basada en los pasos existentes, sin decisiones/resultados añadidos. `drawFlowLegacy` es código histórico dormido; no reactivarlo. |
| `ffdg-motion.css` | Hoja local cargada después de los estilos inline para mantener separados los tokens de tiempo/curvas, microinteracciones, transiciones BAT/MTF, View Transitions y reglas `prefers-reduced-motion`; incluye el override de altura del stage MTF. |
| `ffdg-detail-presentation.css` | Capa visual posterior a `ffdg-motion.css`, compartida por los detalles BAT/MTF; define cards, metadatos con iconos, estado del paso y marcos, sin datos de fallas. |
| `assets/ui-icons/` | Recursos SVG locales de Bootstrap Icons con licencia MIT; decorativos y cargados sin CDN. |
| `bat-pdf-seed.js` | Semilla de 25 procedimientos/casos BAT. Se carga antes de inicializar los controles y se combina con el catálogo BAT base si no existe catálogo guardado válido. |
| `mtf-pdf-additions.js` | Datos MTF derivados del manual: 175 adiciones en el estado auditado, IDs de reversión y asociaciones de flowcharts ya definidas para casos anteriores. |
| `mtf-pdf-reference-map.js` | En el árbol actual de trabajo, asocia imágenes/páginas/indicaciones de referencia MTF y define enriquecimiento de registros. **No estaba rastreado por Git al corte**. |
| `mtf-pdf-flowcharts.js` | En el árbol actual de trabajo, mantiene/renderiza modelos vectoriales alternos de flowcharts. **No estaba rastreado por Git al corte**. La imagen PDF tiene prioridad cuando el registro trae `flowchartImage`. |
| `mtf-procedure-sequence-flowchart.js` | Genera SVG lineal para fallas MTF sin flowchart fuente verificado, usando únicamente los títulos y el orden de sus pasos activos; no crea rombos, Pass/Fail ni resultados. **Sin seguimiento Git al corte de 2026-10-11**. |
| `mtf-pdf-procedure-overrides.js` | Correcciones MTF ancladas por estación, código, descripción y páginas verificadas de `ffdg.pdf`; complementa pasos incompletos y asigna la imagen original cuando está disponible. Se aplica al merge del catálogo inicial, restaurado e importado. |
| `pdf-reference-gallery.js` | En el árbol actual de trabajo, crea el modal reutilizable para galerías MTF y expone sus funciones globales. **No estaba rastreado por Git al corte**. |
| `assets/mtf-flowcharts/` | Figuras flowchart MTF: 99 PNG fuente (98 del catálogo/additions y AST-01 p. 63) más 99 exportaciones hi-res 400 ppp. Las alternativas conservan los originales; el mapa modal enlaza por nombre de archivo. |
| `assets/mtf-reference-images/` | 12 imágenes de referencia MTF observadas; rastreadas al corte. |
| `assets/reference-images/` | Imágenes asociadas a referencias; 31 presentes, 30 rastreadas al corte. |
| `gb300-board-topology.png` | Esquema de topología GB300 mostrado en el panel MTF y ampliado en modal. |
| `ingrasys-logo.png`, `ingrasys-logo-dark.png`, `LOGO NVIDIA NEGRO.png` | Recursos gráficos de marca referenciados por la interfaz/impresión según el modo correspondiente. |
| `xlsx.full.min.js`, `SHEETJS-LICENSE.txt` | Distribución local de SheetJS usada para leer Excel; no se carga desde CDN. |
| `vendor/pdfjs/pdf.min.mjs`, `vendor/pdfjs/pdf.worker.min.mjs` | PDF.js local, importado bajo demanda para extraer texto de PDF BAT. |
| `vendor/pdfjs/LICENSE` | Licencia del PDF.js vendorizado. |
| `HISTORIAL_CAMBIOS_FFDIGI.md` | Bitácora cronológica. No sustituye este documento. |
| `AGENTS.md` | Reglas obligatorias de trabajo para agentes. |
| `CONTEXTO_FFDIGI.md` | Esta memoria técnica actual. |

### Archivos locales que no son fuente canónica

- `ffdg_bat.html` existe en el directorio, pero `.gitignore` lo excluye. Es una copia local con rutas antiguas, entre ellas una referencia a `node_modules/xlsx`; no asumir que coincide con `index.html` ni usarla como fuente versionada.
- `package.json` y `package-lock.json` están excluidos por `.gitignore`; el manifiesto presente al corte solo contiene una prueba placeholder y una dependencia `xlsx`. No hay `node_modules` ni una suite de pruebas FFDIGI configurada en este árbol.
- La página principal carga `xlsx.full.min.js` directamente desde el proyecto. No inferir que el manifiesto local ignorado sea necesario para ejecutarla.
- Los manuales/workbooks fuente no aparecen dentro de este árbol auditado. El código contiene datos y referencias derivadas y ofrece importar archivos locales del usuario; una copia limpia no tiene por sí sola los documentos fuente para revalidar todo el contenido.

### Dependencias y orden de carga de `index.html`

1. Carga SheetJS desde `./xlsx.full.min.js`.
2. Carga `mtf-pdf-additions.js`, `mtf-pdf-reference-map.js`, `pdf-reference-gallery.js`, `mtf-pdf-flowcharts.js` y `mtf-procedure-sequence-flowchart.js` antes del bloque inline que arma `window.FFDG.data`.
3. El bloque principal define datos, estado, UI y reportes.
4. Carga `bat-pdf-seed.js`; el importador BAT es un script de módulo que importa localmente PDF.js y su worker cuando el usuario selecciona un PDF.
5. Scripts inline adicionales enlazan el tablero BAT, el tema, notificaciones, marca y modales.
6. `ffdg-motion.css` se enlaza después de todos los bloques de estilo inline y define sus propios tokens de movimiento; los estilos previos resuelven esas variables una vez cargada la hoja, conservando el orden y la prioridad de la cascada.
7. `ffdg-detail-presentation.css` se carga después de la hoja de movimiento y unifica la presentación de las fichas BAT/MTF. Los iconos son recursos locales, decorativos y con `alt` vacío/`aria-hidden`; no se agregan dependencias de red.

La mayor parte de estilos y funciones sigue dentro del HTML; movimiento compartido y acabado visual MTF se mantienen en hojas CSS locales separadas. No se detectó una API de FFDIGI ni una llamada `fetch` de la página; las referencias HTTP halladas pertenecen a instrucciones/comandos de diagnóstico o namespaces SVG, no a recursos CDN configurados.

## 3. Flujo general de usuario

1. La página inicia en BAT y permite cambiar entre BAT y MTF.
2. En BAT, el usuario busca/elige una falla en el tablero; la selección sincroniza el catálogo de fallas y muestra el detalle, pasos y diagrama. El caso No Boot activa además el formulario de nodo y el recorrido guiado.
3. En MTF, el usuario busca por identificador, estación, código, nombre, componente o texto de origen; filtra por estación y abre una falla.
4. En el detalle MTF puede elegir las pestañas compactas `Paso 1…N` para ver la descripción de la validación activa, seleccionar una variante si existe, consultar referencias del PDF y ampliar el flowchart.
5. En BAT, el recorrido guiado registra respuestas/notas en memoria de la sesión. El formulario captura identificación, análisis/RCA y evidencias; la impresión del navegador permite elegir Guardar como PDF.
6. El catálogo BAT puede actualizarse desde PDF. El parser MTF de Excel y `loadExcelFile` permanecen en el código, pero se retiró el botón que abría el selector: la barra MTF ya no ofrece una vía visible para importar Excel. También conserva el botón `Actualizar PDF FFDG`, que solo abre el selector de archivos PDF; aún no extrae, sube ni guarda el documento ni modifica el catálogo. Los catálogos importados se guardan en `localStorage` del navegador cuando el almacenamiento está disponible.
7. Las notificaciones y topología son paneles informativos; no son una API ni una fuente de verdad técnica por sí mismos.

## 4. Flujo BAT

### Datos y organización

- El catálogo base se declara dentro de `index.html`, en `FFDG.data.failureCatalog`, agrupado por familias FRU, Logic, Leak, Fan y No Boot.
 La falla No Boot `Central IO board panel LEDs do not turn on` usa `NDBG_092`, etiqueta propia y UID código+etiqueta, porque el catálogo también conserva el registro FRU existente `NDBG_092 · FRONT IO FRU EEPROM`. Al restaurar un catálogo local, el inicializador elimina la etiqueta española anterior exacta de esa falla administrada y persiste de nuevo el registro canónico en inglés. `NDBG_122 · FW ISSUE` es otra adición No Boot, insertada después de NDBG_092 incluso al restaurar un catálogo guardado, con tres pasos propios aportados por el usuario para revisar y actualizar firmware BMC/HMC y validarlo mediante BAT Script.
- Fans incluye NDBG_104–106 (FAN SPEED 1–3) y NDBG_117–121 (FAN SPEED 4–8). Las ocho fallas tienen procedimiento propio de cuatro pasos, con el número del ventilador correspondiente: validar ruteo, ejecutar el script BMC Sensors, validar resultados y hacer reseat, retest. Todas se marcan `managedAddition`; al restaurar el catálogo local se agregan las ausentes y se sincronizan esos pasos en registros FAN existentes.
- `bat-pdf-seed.js` aporta 25 registros iniciales. Si no hay catálogo guardado válido, `mergeProcedures` los asocia/combina con el catálogo base y guarda el resultado localmente.
- El código BAT asigna UID compuesto de código + etiqueta normalizada para diferenciar casos que comparten código.
- El tablero agrupa por familia, mantiene búsqueda y selección, y alimenta el detalle desde el elemento seleccionado.
- En BAT, «Cambiar falla» limpia la selección activa y oculta ficha, evidencia fotográfica y secuencia de potencia antes de mostrar el tablero; seleccionar una falla vuelve a abrir su detalle. En No Boot, la ficha de falla y sus pasos quedan como vista inicial; se ocultan identificación del nodo, historial, evidencia lateral y secuencia de potencia. El botón «Realizar reporte de falla» dentro de Failure Record abre la captura de reporte.
- En escritorio, Anterior, Paso siguiente y Ampliar diagrama permanecen dentro de Disposition Flow y se centran abajo usando el espacio libre del panel; el retorno al catálogo se realiza con «Cambiar falla». No se modifica el tamaño de las otras dos tarjetas. En móvil/tableta los tres controles siguen después del diagrama.
- En el detalle del tablero, `getBatDetailSteps` muestra `failure.steps` para adiciones `customProcedure`; el diagnóstico guiado legacy que inicia el formulario No Boot asigna siempre `FFDG.data.flows.NOBOOT` a `FFDG.state.steps`, aun si la falla tiene pasos propios. El modal de reporte usa `getBatDetailSteps`, igual que la tabla visible, para generar opciones de detención/Pass; no usa el historial del diagnóstico ni inventa registros. La diferencia entre el flujo guiado legacy y el procedimiento particular del detalle queda como pendiente de alineación, pero no altera la fuente de pasos usada por el modal. Las adiciones NDBG_092 y NDBG_122 definen tres pasos propios cada una; las ocho fallas Fan (NDBG_104–106 y NDBG_117–121) definen cuatro pasos personalizados por velocidad. Las adiciones administradas se restauran sobre un catálogo BAT guardado y sincronizan procedimientos propios cuando cambia la versión de esos pasos, sin reemplazar los demás registros; las que declaran `insertAfterCode` respetan esa posición al reinsertarse. El estado del diagnóstico (paso, respuestas, hora, notas y evidencias) vive en `FFDG.state` durante la sesión.
- El importador PDF local usa PDF.js. Busca páginas que contengan encabezado de error NDBG, estación BAT, descripción y FA Steps; extrae el texto, fusiona por código/etiqueta y persiste el catálogo con clave `ffdg-bat-catalog-v1`.
- El flowchart BAT se genera como SVG a partir de los pasos. La implementación vigente dibuja una validación compartida de estación, conexiones Pass/Fail, secuencia de acciones y escalación terminal cuando los datos tienen pasos. No sustituir el diagrama BAT existente al modificar exclusivamente MTF.

### Formulario y reporte BAT

- Las familias BAT que usan cierre guiado conservan el formulario de identificación, clasificación, retest, acción, causa raíz, evidencia de causa y siguiente acción.
- No Boot presenta primero Failure Record, Troubleshooting Sequence y Disposition Flow. El modal dedicado captura serial/P/N/analista, estado reportado (Resuelta, En validación, NVIDIA, Reparación o Pruebas), retest, procedimiento aplicado según el FFDG de NVIDIA, clasificación, siguiente acción, RCA, intervención y fotos antes/después. Cada foto permite editar su nombre de evidencia. No muestra checklist de todas las validaciones; el selector de procedimiento usa `getBatDetailSteps` de la falla activa. No pide un paso/acción separado donde se obtuvo Pass.
- Las evidencias generales de imagen se mantienen con Object URLs en memoria; las evidencias No Boot antes/después se leen como Data URLs para que estén listas al imprimir. Ambas modalidades viven solo en la sesión y no se guardan en `localStorage`.
- `printBatReport` valida clasificación, causa raíz y siguiente acción. El reporte BAT normal requiere historial; el modal No Boot puede generarlo sin ejecutar esa guía, porque captura directamente el procedimiento aplicado y el resultado declarado, sin fabricar registros en `FFDG.state.history`. En ambos casos abre la plantilla BAT existente para impresión del navegador. El PDF No Boot se titula **Reporte de Análisis de Falla NVIDIA RACKS** e incluye identificación, estado, síntesis del caso, siguiente acción, causa raíz, intervención, procedimiento FFDG aplicado, resultado de retest, evidencia antes/después con nombres editables, hora local de generación y firmas del analista y Claudia Itzel Almaza Lopez para revisión de Calidad. Omite el folio y el selector separado del paso Pass. Su CSS de impresión usa una jerarquía y superficies tonales inspiradas en Material Design 3 con acentos verdes, azules y ámbar, numeración visual de secciones y una banda de estado diferenciada por resultado. No imprime checklist, bitácora ni flowchart. El modal se mantiene abierto mientras se invoca sincrónicamente el diálogo de impresión; se cierra al recibir el evento afterprint. La persona usuaria elige Guardar como PDF. La paginación A4 depende del motor y del contenido; no se afirma una hoja garantizada. BAT general y MTF conservan sus campos y reportes.
- Al imprimir BAT se oculta el resto mediante `body[data-print-mode]` y estilos `@media print`.

## 5. Flujo MTF

### Catálogo, búsqueda e importación

- Datos iniciales: 113 objetos `mtfRaw` inline en `index.html` más 175 `FFDG_MTF_PDF_ADDITIONS`. Se excluye estación OBA en el mapper principal: 288 registros previos al filtro → 287 disponibles al usuario en el corte auditado.
- El número 113 escrito en el HTML es un valor inicial de placeholder. El render actualiza el contador desde los registros resultantes.
- El usuario puede buscar por id, station, code, name, components y `sourceSearchText`; el filtro usa tokens de estación para soportar campos con varias estaciones.
- Con resultados filtrados, MTF ofrece lista técnica, mosaico o tablero agrupado por estación. El tablero centra las estaciones que coinciden, incluso cuando la búsqueda devuelve pocas columnas. En vista Tablero, mantiene orden fijo FLA, PRET, FLB, AST, FTS, IOT, FCT, RIN, T_VI, OBA y PACKING; las estaciones presentes en los datos pero fuera de la lista se conservan al final en orden alfabético. El conteo visible se calcula a partir del catálogo.
- En lista técnica, los resultados ocupan el ancho disponible y se muestran como filas de ancho completo. Al seleccionar una falla en lista, mosaico o tablero, una transición de estado común oculta explícitamente la fila del catálogo y muestra la ficha; «Cambiar falla» o modificar la búsqueda devuelve los resultados. El botón usa el color primario del tema. La selección común pasa por `FFDG.ui.selectMtfFault`; `buildBoard` usa el mismo registro, no simula el click de una tarjeta oculta.
- En el detalle MTF, la fila `.mtf-row-1` (búsqueda, tema y selector PDF) se oculta; el encabezado deja visible solo «Cambiar Falla», con icono y etiqueta iguales a BAT. Al volver al catálogo se restauran los controles. Las dimensiones propias del detalle MTF no se alteran por este ocultamiento.
- En escritorio, BAT y MTF conservan sus dimensiones de detalle propias; la capa visual compartida unifica encabezados verdes, banner de falla rojo con alerta, metadatos ordenados con iconos y jerarquía de pasos/disposición. Los metadatos y paneles respetan los tokens de tema; los iconos locales son decorativos y no agregan datos accesibles duplicados. MTF conserva su estructura vertical de criterio, acción, stage y controles; el stage centra y escala con `contain` los diagramas fuente o generados, conserva fallback desplazable y no recorta el recurso. En móvil/tableta los paneles mantienen su apilado responsive y controles.
- Sistema de movimiento común: tokens CSS `--motion-micro` (120 ms), `--motion-control` (160 ms), `--motion-content` (180 ms) y `--motion-panel` (220 ms), con curvas reutilizables. Botones, tarjetas, pasos y superficies refinan hover/active/focus/selected; pasos, referencias, vistas y módulos usan entradas breves; diálogos nativos animan apertura/cierre sin cambiar listeners ni foco.
- La selección/regreso de fallas mantiene las transiciones existentes; MTF usa 180 ms con retrasos escalonados de 12/24 ms. El cambio BAT↔MTF tiene entrada suave; la búsqueda/filtro no usa debounce ni temporizadores. `FFDG.ui.runMotionTransition` usa View Transitions en las áreas de resultados BAT/MTF si están soportadas y ejecuta la actualización directa como fallback.
- Las animaciones nuevas se desactivan bajo `prefers-reduced-motion`; el paso activo BAT/MTF usa el mismo pulso verde y se desactiva al reducir movimiento. El estado de falla/paso continúa en `FFDG.state`.
- Las pestañas superiores muestran solo `Paso N` y son botones accesibles para seleccionar directamente la validación; el contenido descriptivo permanece debajo de `Validación N de total` y no se duplica en las pestañas. Una barra verde accesible (`role=progressbar`) acompaña el paso activo: refleja `paso actual / total`, avanza con Anterior/Siguiente o al seleccionar una pestaña y alcanza 100 % cuando la ruta se completa. Sin pasos, no se muestra barra. No registra respuestas individuales ni persiste el avance.
- El importador Excel localiza una tabla con Tab No, Error Code y Error Code Description, asocia la hoja de detalle por Tab No y toma sus pasos, metadatos, comandos y variantes. Genera `recordKey` por ocurrencia/fila para mantener registros duplicados separados.
- El parser Excel MTF y `loadExcelFile` permanecen implementados, pero se retiró el botón y el manejador del input de la barra MTF; actualmente no hay una vía visible para seleccionar un workbook desde la interfaz. `Actualizar PDF FFDG` abre un selector limitado a PDF, pero sigue sin parser ni manejador de selección y no modifica ni persiste información.
- La lectura de detalles reconoce filas de flujo y columnas de variantes; actualiza el catálogo MTF y lo persiste en `localStorage` con clave `ffdg-mtf-catalog-v2`. Al restaurar también pasa por la función de combinación/enriquecimiento.
- Si no hay hoja de procedimiento asociada, la interfaz informa el faltante; no debe inventarse un procedimiento para “completar” una falla.

### Imágenes, diagramas y disposición

- La asociación de referencias MTF depende de `mtf-pdf-reference-map.js` y de recursos bajo `assets/`; el mapa agrega página/indicaciones y enriquece registros por identidad/fuente, no solo por texto parecido.
- `mtf-pdf-procedure-overrides.js` contiene 55 overlays MTF, cada uno con coincidencia única contra el catálogo base verificada en el corte del 2026-10-10. Se identifican por estación+código+descripción y guardan páginas fuente; no usar el código por sí solo. Las entradas suplementarias `PDF-MTF-CASE-*` conservan sus transcripciones particulares y no reciben overlays por coincidencia parcial.
- El módulo de overlays se ejecuta dentro de `mergeMtfPdfAdditions`, por lo que alcanza los datos base y los recorridos de restauración/importación que llaman esa función. Si una futura fuente cambia la identidad o estructura de catálogo, volver a auditar sus coincidencias antes de ampliar las reglas.
- Cuando existe `flowchartImage` con dimensiones o un grafo PDF asociado válido, `renderFlowchart` y el observer tardío `drawFlow` conservan el diagrama fuente. Si no existe fuente verificada y sí hay pasos, `mtf-procedure-sequence-flowchart.js` dibuja un recuadro por paso, con flechas que solo expresan el orden enumerado; el aviso identifica que es una secuencia visual derivada, no un flowchart del PDF. No añade decisiones, Pass/Fail, resultados, retests ni acciones terminales. Sin pasos disponibles, conserva el aviso de procedimiento faltante.
- `mtf-pdf-reference-map.js` registra alternativas raster de alta resolución para 99 imágenes fuente únicas de flowchart MTF: las 98 asociadas por catálogo/additions y el flowchart legacy AST-01 de la p. 63. El modal usa la copia de 400 ppp en fuentes registradas. Rueda y botón aumentan/reducen el zoom progresivamente, centrado y con desplazamiento vertical; el preview queda contenido para mantener visibles los controles. PNG originales y asociaciones permanecen intactos. Figuras sin imagen fuente mapeada no reciben imagen inventada ni lupa.
- Si no hay una imagen original asociada con certeza, la secuencia visual se deriva solo de los pasos del caso y se rotula como tal; no se presenta como fuente PDF ni inventa rombos, ramas Pass/Fail o resultados. Las asignaciones de imágenes existentes requieren estación, código y descripción concordantes, porque el manual reutiliza códigos entre procedimientos diferentes.
- Caso de asociación validado: `PDF-MTF-CASE-0166` (FTS, lectura AIN0 de Bianca) toma la imagen de la p. 76, respaldada por el procedimiento de fuga de sensor de las pp. 74–76. No se aplica a otros registros con el mismo código y descripciones de SSD u otros procedimientos.
- Casos con overlays revisados visualmente en navegador: `FLA-07` (pp. 23–24; 5 pasos e imagen del flowchart p. 24) y `FLB-08` (pp. 149–151; 9 pasos y flowchart original p. 151). Ambos se probaron en la página servida localmente tras corregir el observer; el modal de ampliación también fue comprobado para FLA-07. FLB-08 conserva la decisión explícita de si la falla se movió con el SSD.
- Límite de auditoría: 58 de los 113 registros base no recibieron overlay en este corte; mantienen sus datos previos. No afirmar que sus pasos fueron re-transcritos o verificados integralmente contra el PDF. Se dejaron intactos cuando no se confirmó una correspondencia inequívoca, hasta revisar las páginas candidatas.
- La galería se abre en un `<dialog>` reutilizable, cada imagen conserva caption y guía; el diagrama/topología tienen sus propios modales. El botón GB300 System Topology abre directamente su modal, sin expandir una imagen dentro de la tarjeta. En MTF, los botones compactos `Paso N` permiten seleccionar directamente la validación activa; esto no selecciona ramales del PDF ni cambia la ruta del procedimiento.
- El flowchart de salida MTF contiene una disposición final textual general además de los pasos y diagrama.

### Impresión MTF

`printMtfReport` toma estación, código, descripción, componentes, datos fuente y todas las variantes/pasos disponibles, compone una plantilla y abre impresión del navegador. No crea automáticamente un PDF ni persiste un archivo en el proyecto. El prototipo de reporte de intervención FLA-04 conserva markup y lógica interna, pero se retiró su CTA de MTF; no hay acceso a ese prototipo desde la interfaz. Su formulario anterior capturaba el S/N, P/N, empleado/analista, pasos marcados, AC Cycle, resultado/retest, RCA e imágenes antes/después. No se amplía ni reactiva para otras fallas. El modal de reporte No Boot es un flujo BAT independiente y no reactiva el prototipo MTF. Este prototipo no escribe catálogo, `localStorage`, servidor ni archivos automáticamente.

## 6. Fuentes de verdad del sistema

| Tipo de dato/comportamiento | Fuente con autoridad en este árbol | Observación |
| --- | --- | --- |
| UI y comportamiento actual | `index.html` + `ffdg-motion.css` + `ffdg-detail-presentation.css` + `assets/ui-icons/` | Entrada versionada, movimiento compartido y presentación común BAT/MTF; los recursos locales aportan iconos decorativos. Revisar también módulos cargados y estado Git. |
| Catálogo BAT base y flujo No Boot | `index.html` | `FFDG.data.failureCatalog` y `FFDG.data.flows`. |
| Seed BAT del manual | `bat-pdf-seed.js` | Se fusiona solo al iniciar sin un catálogo local válido. |
| Importación/merge BAT | Script de módulo inline de `index.html` | PDF.js procesa el archivo elegido por el usuario; no asume conexión a un manual instalado. |
| Catálogo MTF base y overlays verificados | `index.html` + `mtf-pdf-procedure-overrides.js` | 113 registros inline; 55 identidades tenían overlay inequívoco al corte del 2026-10-10. |
| Casos MTF PDF adicionales | `mtf-pdf-additions.js` | Contiene 175 adiciones en el snapshot auditado; confirmar estado del archivo antes de distribuir. |
| Procedimientos cargados por Excel | Workbook seleccionado por el usuario + parser de `index.html` | Tab No identifica hoja maestra/detalle; el importado se mantiene local. |
| Flowcharts MTF fuente | `mtf-pdf-additions.js`, mapa de referencias y PNG de `assets/mtf-flowcharts/` | La imagen asociada a identidad/página prevalece; el módulo vectorial es fallback, no sustituto documental. |
| Secuencia visual MTF cuando falta flowchart fuente | Pasos activos del registro + `mtf-procedure-sequence-flowchart.js` | Representación secundaria lineal; no certifica estructura o decisiones del PDF y no sustituye una imagen/grafo fuente existente. |
| Imágenes de referencia MTF | `mtf-pdf-reference-map.js` + `assets/mtf-reference-images/` y `assets/reference-images/` | Mapa y parte de los PNG estaban sin seguimiento al corte. El árbol de trabajo actual no equivale al checkout limpio. |
| Topología GB300 | `gb300-board-topology.png` + modal/markup en `index.html` | Recurso visual; no reemplaza el procedimiento de una falla. |
| Reporte BAT/MTF | `index.html` | Plantillas HTML y CSS de impresión; el motor final es `window.print()`. |
| Tema | `localStorage` (`ffdg-theme`) | Preferencia por navegador, no sincronizada entre usuarios. |
| Catálogos importados | `localStorage` (claves versionadas BAT/MTF) | Estado local por navegador; puede estar ausente, antiguo, bloqueado o lleno. |
| Registro diagnóstico BAT/evidencia | `FFDG.state` en memoria | No es almacenamiento persistente. |
| Dependencias de Excel/PDF | Archivos locales `xlsx.full.min.js` y `vendor/pdfjs/` | Evitar convertirlos en CDNs sin autorización y análisis de impacto. |

Los manuales/workbooks fuente no están incluidos en el árbol observado; por eso, los datos extraídos solo pueden reauditarse contra una fuente si esta se incorpora/autorizase para la tarea. No afirmar que un dato se verificó contra el documento fuente cuando solo se comprobó el catálogo.

## 7. Mapa de dependencias e impacto

- Cambiar forma/campos de BAT → afecta `mergeProcedures`, tablero/selector, `renderBatSelection`, diagrama SVG, contador, importación/restauración, `localStorage` y reporte BAT.
- Cambiar `failureCatalog` o su UID → afecta selección inicial, opciones del formulario, asociación del seed, selección de tarjeta y restauración guardada.
- Cambiar `flows.NOBOOT` → afecta el stepper, texto/validación, diagrama y flujo del formulario No Boot; validar también resultado y reporte.
- Cambiar forma de un caso MTF → afecta merge base+adiciones, búsqueda/filtros, selección, stepper/variantes, referencias/flowchart, importación/restauración y reporte MTF.
- Cambiar títulos/orden de pasos MTF → afecta pestañas `Paso N`, validación activa y, solo si falta diagrama fuente, los nodos/secuencia del SVG secundario.
- Cambiar `recordKey`, id o deduplicación MTF → puede colapsar fallas distintas que compartan código/Tab No; comprobar todas las fuentes y usos.
- Cambiar referencias de imagen → afecta mapa, URL relativa, galerías, captions/página, modal y PNG; comprobar la ruta desde `index.html` y existencia física.
- Cambiar render de diagramas → afecta área de detalle, botón/modal, SVG/image cloning, accesibilidad y layout responsive. BAT y MTF comparten modal, pero tienen generadores separados.
- Cambiar IDs/markup → los scripts enlazan por ID explícito; revisar todas las búsquedas `getElementById`, selectores, listeners y CSS.
- Cambiar reportes → afecta validaciones previas, plantillas, reglas `@media print`, evidencias, encabezados/firmas y flujo `afterprint`.
- Cambiar dependencias locales → afecta la ejecución desde archivo/servidor, worker PDF.js, import de Excel y políticas de CORS del navegador.

## 8. Funciones críticas

| Función / archivo | Entrada → salida/efecto | Llamador/dependencias | Riesgo al modificar |
| --- | --- | --- | --- |
| `window.FFDG.data` / `index.html` | Catálogos inline + globals MTF → `failureCatalog`, `mtfFaults`, `flows`, merge helper | Inicialización, UI, importadores | Cambia la fuente que alimenta ambas áreas; puede perder adiciones/enriquecimiento u ocultar fallas. |
| `mergeMtfPdfAdditions` / `index.html` | Casos base/importados + metadatos de adiciones → catálogo combinado con flowcharts/referencias | Inicio, importación Excel, restauración | Riesgo de duplicar, reemplazar mal casos del mismo ID o asociar PDF incorrecto. Mantener reglas de reversión/enriquecimiento. |
| `renderMtfList`, `filterStation` / `index.html` | Búsqueda, estación, catálogo → tarjetas/contador/filtros | Eventos de búsqueda y chips | Puede dejar fallas inaccesibles o romper selección, teclado y conteos. |
| `FFDG.ui.runMotionTransition` / `index.html` | Callback de actualización → transición nativa del área de resultados cuando se soporta | Búsqueda BAT/MTF y filtros MTF | No introducir debounce, timers ni pérdida de estado; bajo movimiento reducido o sin API, actualizar directamente. |
| `FFDG.data.applyMtfPdfProcedureOverride` / `index.html` | Registro MTF → copia con pasos/páginas/flowchart de overrides cuya identidad coincide | Fusión del catálogo y `renderFlowchart` | Se expone en el objeto de datos para que la capa UI no dependa del cierre léxico privado que lo define. |
| `renderMtfDetail`, `getActiveSteps` / `index.html` | Falla, índice y variante → metadatos, pasos, referencias, acciones y controles | Selección de caso, siguiente/anterior, variante | Riesgo de mezclar casos, perder paso/variante o renderizar contenido no asociado. |
| `renderFlowchart`, `drawFlow` / `index.html` | Falla seleccionada + fuente/steps activos → imagen/grafo PDF o SVG lineal secundario | `renderMtfDetail`, observer de `mtf-step` | Prioridad de fuente obligatoria; el fallback solo enumera pasos y no puede crear ramas. |
| `renderMtfProcedureStepFlowchart` / `mtf-procedure-sequence-flowchart.js` | Lista de pasos e índice activo → SVG de cajas y flechas consecutivas | `renderFlowchart`, `drawFlow` | Debe preservar todos los títulos y el orden; no representar decisiones, resultados ni ramas ausentes. |
| `FFDG_MTF_ENRICH_REFERENCES` / `mtf-pdf-reference-map.js` | Caso + catálogo → caso con referencias según mapa/relaciones | `mergeMtfPdfAdditions` | Asociación cruzada puede mostrar la imagen de otra falla; validar id, estación, descripción y página. |
| `FFDG_OPEN_REFERENCE_GALLERY` / `pdf-reference-gallery.js` | Título, refs, botón y clave → modal accesible | Botón de imágenes de referencia | Afecta teclado, restauración de foco, navegación y carga de imágenes. |
| `getBatDetailSteps`, `renderBatSelection` / `index.html` | Falla + paso → procedimiento, datos y DOM BAT | Selector/board y navegación | Puede romper pasos terminales, No Boot, diagrama o progreso. |
| `renderBatFlowchart` / `index.html` | Lista BAT de pasos + índice → SVG de acciones, retest, ramas y escalación | `renderBatSelection` | Regresión afecta diagramas BAT que el usuario pidió conservar; no editar por cambios MTF. |
| `readWorksheetCatalog`, `parseDetailWorksheet` / `index.html` | Workbook SheetJS → registros maestros, hojas por Tab No, pasos, variantes y metadatos | `loadExcelFile` | Puede romper asociación de hojas, variantes o conservar duplicados. |
| `persistCatalog`, `restoreCatalog`, `loadExcelFile` / `index.html` | Catálogo/archivo → `localStorage`, estado y rerender | Input Excel e inicialización | Riesgo de perder datos del navegador o cargar esquema incompatible. |
| `parseBatPage`, `mergeProcedures`, `importPdf` / `index.html` | Texto PDF por página → procedimientos NDBG combinados | Input PDF BAT; PDF.js | Falsas fusiones por código/etiqueta o pérdida de pasos; preservar selección y catálogo guardado. |
| `printBatReport`, `printMtfReport`, `openMtfCaseReport`, `submitMtfCaseReport`, `openPrintDialog` / `index.html` | Estado/captura por caso → DOM de impresión y diálogo del navegador | Botones PDF; caso piloto MTF limitado a FLA-04 | Reportes incompletos, identidad equivocada, pérdida de imágenes o contenido de pantalla; validar impresión real y mantener las firmas de Calidad sin persona preasignada. |
| `openDiagram`, `prepareDiagramTarget` / `index.html` | SVG/imagen activa → modal ampliado y foco restaurado | MutationObserver, botones, teclado | Romper teclado, foco, ampliación o diálogos compartidos BAT/MTF. |

## 9. Decisiones técnicas y comportamientos que deben conservarse

- `index.html` es la única entrada principal rastreada. No sustituirla por el HTML ignorado.
- BAT y MTF comparten tema, diseño de detalle e infraestructura de modales/impresión, pero sus catálogos y generadores de flowchart son separados.
- Los flowcharts BAT actuales se deben preservar ante cambios MTF.
- Para MTF, cuando exista imagen/grafo fuente asociado, debe prevalecer sin cambios. Si falta, puede mostrarse una secuencia SVG secundaria basada en los pasos disponibles; identificarla como derivada y limitarla a cajas/flechas de orden, sin decisiones, Pass/Fail, rombos o resultados no sustentados.
- MTF debe conservar identidad compuesta y registros duplicados cuando sean casos distintos; código repetido no basta para fusionarlos.
- Los procedimientos faltantes deben señalarse, no rellenarse con una recomendación inventada.
- La salida de reporte se hace con impresión del navegador; no reemplazarla sin verificar diseño de papel y flujo después de imprimir.
- Las galerías de referencia abren en modal; captions, página e indicaciones deben acompañar a la imagen y la imagen debe corresponder a la falla.
- Mantener el tema y catálogos locales compatibles con las claves/versiones actuales hasta diseñar migración explícita.
- Diseño responsive, navegación por teclado, foco visible y `prefers-reduced-motion` son parte del comportamiento a conservar.
- El título de la falla seleccionada se centra en un banner de error con alerta; pasos BAT/MTF comparten estado activo verde y pulso sutil, desactivado con `prefers-reduced-motion`.

## 10. Reglas de modificación segura

- Buscar todos los consumidores de estructuras, IDs, clases y globals antes de cambiar.
- No borrar “código sin uso” sin verificar referencias, incluyendo scripts cargados y entradas de datos.
- No duplicar catálogos o mapas que ya tengan una fuente.
- No convertir datos importados o PDF en instrucciones inferidas.
- No cambiar rutas de assets sin probar desde la raíz `index.html`.
- Al tocar MTF, comparar BAT antes/después; viceversa.
- Proteger datos `localStorage`; probar esquema existente, importación, restauración y error de almacenamiento.
- Tratar nombres/IDs de analistas y los avisos técnicos embebidos como datos internos: no copiar datos personales a documentación ni a logs innecesarios.
- No exponer errores ni afirmar pruebas, deploy o sincronización remota no ejecutados.

## 11. Problemas conocidos (confirmados al corte)

| Problema | Área / impacto | Estado |
| --- | --- | --- |
| `index.html` referencia tres módulos MTF y recursos PNG que estaban sin seguimiento, y el propio HTML tenía cambios locales. Un checkout limpio puede carecer de la galería/mapa y de la figura nueva que sí existen en este árbol. | Integridad de despliegue MTF; alto | Pendiente de incluir/versionar según decisión del usuario. No publicar asumiendo que el árbol local equivale al repositorio remoto. |
| Algunas fallas MTF no tienen flowchart fuente; antes el panel solo mostraba un aviso aunque el caso tuviera pasos. | Consulta de procedimientos; medio | Corregido el 2026-10-11: secuencia secundaria desde pasos, rotulada como derivada y sin decisiones; las fuentes verificadas conservan prioridad. |
| `renderFlowchart` usaba helpers declarados dentro del cierre de datos como si fueran variables locales de la capa UI; en especial detenía el render con `ReferenceError`, tanto antes de insertar diagramas fuente como al buscar grafos derivados. | Render de diagramas MTF; medio | Corregido el 2026-10-18: helper expuesto como `FFDG.data.applyMtfPdfProcedureOverride` y mapa de grafos consultado desde `window.FFDG_MTF_PDF_FLOWCHART_GRAPHS`. Chromium comprobó el diagrama fuente FLA-04 y el fallback SVG generado FLA-10. |
| Las reglas MTF de escritorio imponían `height: 0 !important` al stage de Disposition Flow; un selector posterior de menor especificidad no podía reemplazarlo y el SVG quedaba colapsado. | Presentación de diagramas MTF; medio | Corregido el 2026-10-18 en `ffdg-motion.css` con un override de igual especificidad cargado al final; comprobado con imágenes fuente y fallback generado en escritorio, tableta y teléfono. |
| `ffdg_bat.html` está ignorado y no es idéntico a la entrada versionada; usa una ruta de SheetJS bajo `node_modules`, carpeta que no existe aquí. | Copia local antigua; medio | No canónico; no editar como sustituto de `index.html`. |
| Los manuales y el workbook de origen no están dentro del árbol. No es posible reproducir una auditoría completa desde un clon sin que el usuario aporte la fuente correspondiente. | Procedimientos/imágenes; medio | Limitación de fuente; conservar la trazabilidad disponible en datos y bitácora. |
| No hay pruebas automatizadas FFDIGI configuradas; el `package.json` local ignorado solo tiene un test placeholder y no existe `node_modules`. | Validación/regresión; medio | Confirmado; validar manual/estáticamente hasta que se acuerde una suite. |

## 12. Deuda técnica (no corregida en la creación de esta memoria)

- `index.html` supera 5,000 líneas y mezcla markup, estilos, catálogos, estado, importación, rendering, impresión y listeners.
- Hay estilos/scripts añadidos en bloques inline posteriores; las reglas pueden superponerse y hacen más difícil saber cuál gobierna una vista.
- Los namespaces `window.FFDG` y `window.FFDG_MTF_*` acoplan bloques; orden de carga es relevante.
- Catálogos grandes y mapas derivados del PDF son mantenidos como literales estáticos; cambios exigen validar duplicados, páginas e identidad.
- La copia `ffdg_bat.html` y el manifiesto local ignorados pueden generar deriva respecto a la entrada rastreada.
- La persistencia es por navegador, sin sincronización ni migración central entre usuarios.
- La configuración del proyecto carece de una prueba de regresión reproducible integrada en Git.

No se refactorizó ni cambió comportamiento durante la auditoría inicial.

## 13. Pendientes separados por certeza

### Pendiente confirmado

- Alinear, en una tarea posterior con análisis de impacto, los pasos No Boot mostrados para entradas `customProcedure` con el procedimiento que realmente ejecuta el formulario; actualmente el detalle puede mostrar pasos particulares, mientras que el diagnóstico guiado usa `flows.NOBOOT`.
- Resolver el estado Git de los módulos de mapa/galería/flowcharts MTF y dos PNG locales pendientes antes de depender de ellos fuera de este árbol de trabajo.
- Ejecutar prueba visual/interactiva en navegador para carga inicial, Excel importado/restaurado, galería/modal y flowcharts en móvil/tableta/escritorio antes de afirmar que este snapshot quedó validado end-to-end.
- Si se aporta otra versión del PDF, reauditar asociaciones de imágenes contra estación, código, descripción y página; el manual fuente no está versionado dentro de este árbol.

### Posible mejora, no requisito confirmado

- Separar módulos de UI/datos después de contar con pruebas y plan de regresión.
- Agregar una prueba automatizada de integridad de rutas, asociaciones de imágenes y conteos de catálogo.
- Revisar el esquema de persistencia local y estrategia para compartir catálogos entre navegadores.

### Idea futura

- Versionar junto al proyecto manifiesto/entorno de pruebas reproducible, si se acuerda un flujo de ejecución local mantenido.

## 14. Estado de Git observado durante la auditoría

- Rama: `develop`; tracking indicado: `origin/develop`; HEAD observado: `371a42b`; árbol `ahead 3`.
- Al iniciar esta documentación había modificación local en `HISTORIAL_CAMBIOS_FFDIGI.md` y `index.html), más archivos MTF nuevos sin seguimiento: `mtf-pdf-flowcharts.js`, `mtf-pdf-reference-map.js`, `pdf-reference-gallery.js`, `assets/mtf-flowcharts/mtf-flow-109.png` y `assets/reference-images/ffdg-page-110-ref-31.png`.
- No se hizo commit ni push. La documentación describe el árbol de trabajo presente y marca lo no rastreado; no equivale a contenido confirmado en el remoto.
