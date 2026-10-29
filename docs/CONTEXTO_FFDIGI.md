# CONTEXTO_FFDIGI.md — Memoria técnica del proyecto

> Corte de auditoría: 2026-10-29. Describe el contenido observado **dentro de esta raíz Git** y su árbol de trabajo; separa archivos versionados de los cambios locales. Si el código cambia, vuelve a comprobar cada dato antes de usarlo.

## 1. Identidad y alcance

- Nombre visible en la interfaz: **Nvidia Racks FFDG · Guía de análisis de falla GB200 y GB300**. El wordmark oficial NVIDIA puede conservar su tratamiento gráfico en mayúsculas.
- El proyecto ofrece tres áreas: BAT para diagnóstico guiado, MTF para fallas L10 y L11 Failure Rack para fallas L11 por estación, tipo y procedimiento de FA.
- En la interfaz, BAT se despliega como **Basic Assurance Test**; MTF se presenta como **MTF L10 Failure**. FA se usa en el sentido de análisis/escalación de falla.
- **FFDG** y **FFDIGI** aparecen como nombres/identificadores del sistema. Su expansión formal no está demostrada por los archivos del proyecto y no se debe inventar.
- Uso objetivo deducible por la interfaz: personal que selecciona fallas y consulta pasos técnicos; el reporte BAT está dirigido a revisión de Calidad. La versión actual incluye un inicio de sesión solo en cliente para una cuenta; no tiene backend, autenticación segura ni roles.
- BAT, MTF y L11 son flujos distintos: BAT guía comprobaciones iniciales y captura de diagnóstico; MTF consulta fallas L10 con pasos/comandos; L11 reúne fallas por estación y vincula procedimientos, detalles e imágenes del PDF fuente.

## 2. Raíz y arquitectura actual

### Raíz efectiva

La raíz Git confirmada es este directorio (`pagina ffdg`). `index.html` sigue como entrada versionada de GitHub Pages. El proyecto no requiere framework ni build: HTML, CSS y JavaScript se ejecutan en el navegador con recursos locales.

### Archivos principales

| Ruta dentro del proyecto | Responsabilidad comprobada |
| --- | --- |
| `index.html` | Entrada HTML; conserva markup, controles, modales y plantillas. Sus bloques de estilo/scripts inline se extrajeron a `src/` preservando sus posiciones de carga. |
| `src/js/data/app-catalog.js` | Catálogos base BAT/MTF y `window.FFDG.data`; se carga antes de los módulos que consumen esos datos. |
| `src/js/data/l11/l11-catalog.js` | Datos extraídos del PDF L11 suministrado: fallas por estación, páginas FA, pasos y referencias a procedimientos/flowcharts. |
| `src/js/l11/l11-failure-rack.js` | Búsqueda por código, descripción, tipo o estación; controles de catálogo/tema/PDF; selección de fallas, pasos, detalles fuente y modal de flowcharts L11. |
| `src/js/l11/l11-station-board.js` | Tablero L11 en carriles por estación; muestra tres fallas por bloque. El buscador permite localizar otras fallas del catálogo. |
| `src/js/l11/l11-reference-view.js` + `src/js/data/l11/l11-reference-images.js` | Render de imágenes de referencia L11 con captions; asociaciones explícitas por procedimiento y página del PDF. |
| `src/js/app/ffdg-app-core.js` | Núcleo BAT/MTF y navegación entre las tres áreas: estado, renderizadores, importación, reportes y eventos. Sigue siendo un archivo grande; modularizarlo después, una función a la vez, con pruebas de regresión. |
| `src/js/bat/` | Render BAT, importador PDF, board y vista de componentes BAT. |
| `src/js/mtf/` | Flowcharts SVG MTF, secuencia de pasos y modal de topología. |
| `src/js/shared/` | Galería, modal de diagramas, marca, mejora M3 y ajuste visual compartido de flowcharts. |
| `src/js/data/bat/` | Semilla de 25 procedimientos/casos BAT. |
| `src/js/data/mtf/` | Adiciones, mapa de referencias, overrides y asociaciones MTF. El mapa resuelve `document.currentScript.src` hasta la raíz del sitio para evitar rutas rotas tras el movimiento. |
| `src/css/shared/` | Estilos base extraídos, movimiento, presentación, paleta de flowcharts, marca, densidad compartida, `control-rail.css` para la navegación/acciones superiores y `login-gate.css` para el acceso local. |
| `src/css/bat/` | Catálogo BAT y estilo de impresión No Boot. |
| `src/css/mtf/` | Ajustes de selección y resultados MTF. |
| `src/css/l11/l11-failure-rack.css` | Diseño adaptable de catálogo, las tres tarjetas de detalle, pasos y modal L11. |
| `assets/icons/` | Iconos SVG locales de Bootstrap Icons con licencia MIT. |
| `assets/flowcharts/mtf/` | 198 imágenes MTF: fuentes PNG y alternativas hi-res 400 ppp; se movieron sin cambiar contenido. |
| `assets/flowcharts/l11/` | 45 flowcharts raster extraídos de páginas FA del PDF L11; conservan sus diagramas fuente, incluido el conjunto NVLINK de páginas 77–78. |
| `assets/reference-images/l11/` | Imágenes fuente de ubicación de CBC FRU EEPROM (p. 79) y mapa de índices de slots (p. 80), asociadas solo con procedimientos FLA correspondientes. |
| `assets/reference-images/mtf/` | 43 imágenes de referencia MTF previamente ubicadas en dos carpetas; las asociaciones ahora usan esta ruta unificada. |
| `assets/brand/`, `assets/topology/` | Logotipos, fondo generado para la pantalla de acceso y topología GB300. |
| `vendor/pdfjs/`, `vendor/sheetjs/` | Dependencias locales y licencias; el importador BAT carga PDF.js desde el módulo `src/js/bat/`. |
| `docs/CONTEXTO_FFDIGI.md` | Memoria técnica actual. |
| `docs/HISTORIAL_CAMBIOS_FFDIGI.md` | Bitácora cronológica del proyecto. |
| `docs/design-qa.md` | Criterios y notas de revisión visual. |
| `AGENTS.md`, `README.md` | Instrucciones de trabajo y guía del proyecto; permanecen en la raíz. |

### Archivos locales que no son fuente canónica

- `ffdg_bat.html` permanece en la raíz, pero `.gitignore` lo excluye. Se conservaron sus datos/markup y solo se actualizaron las rutas locales de SheetJS y el logotipo que cambiaron de ubicación; no es fuente versionada ni necesariamente coincide con `index.html`.
- `package.json` y `package-lock.json` están excluidos por `.gitignore`; el manifiesto local tiene una prueba placeholder y una dependencia `xlsx`. No hay suite FFDIGI configurada.
- `output/playwright/`, `output/l11-*.png` y `.playwright-cli/` contienen capturas/sesiones locales de validación y siguen ignorados por Git.
- Los manuales/workbooks fuente no aparecen dentro de este árbol auditado. Los datos derivados no permiten revalidar por sí solos el contenido contra una nueva edición.

### Dependencias y orden de carga de `index.html`

1. SheetJS se carga desde `./vendor/sheetjs/xlsx.full.min.js`.
2. Los scripts de datos MTF y módulos compartidos se cargan antes de `src/js/data/app-catalog.js`; este define `window.FFDG.data`.
3. `src/js/app/ffdg-app-core.js` se carga después del catálogo base y antes del seed BAT, conservando el orden original de inicialización.
4. `src/js/data/bat/bat-pdf-seed.js` se carga antes del importador; `src/js/bat/bat-pdf-importer.js` conserva `type="module"` y resuelve PDF.js con `../../../vendor/pdfjs/` desde su propia ruta.
5. Los scripts de board, diálogos, marca y diagramas permanecen en el mismo orden que sus bloques inline originales.
6. Las hojas CSS extraídas reemplazan sus bloques inline en el mismo punto de `index.html`; los enlaces al final conservan la cascada anterior. En CSS, los recursos del repo usan rutas relativas desde `src/css/`.
7. Los scripts externos conservan carga clásica parser-blocking salvo el importador `type="module"` y el ajuste `defer` de flowcharts.

Los estilos y scripts ya no están incrustados en el HTML; el núcleo de aplicación permanece concentrado en un módulo grande a separar gradualmente. No se detectó API de FFDIGI ni llamadas `fetch` configuradas para recursos remotos.

## 3. Flujo general de usuario

1. La página presenta el inicio de sesión local; una sesión válida abre BAT y permite cambiar entre BAT, MTF y L11 Failure Rack.
2. En BAT, el usuario busca/elige una falla en el tablero; la selección sincroniza el catálogo de fallas y muestra el detalle, pasos y diagrama. El caso No Boot activa además el formulario de nodo y el recorrido guiado.
3. En MTF, el usuario busca por identificador, estación, código, nombre, componente o texto de origen; filtra por estación y abre una falla.
4. En el detalle MTF puede elegir las pestañas compactas `Paso 1…N` para ver la descripción de la validación activa, seleccionar una variante si existe, consultar referencias del PDF y ampliar el flowchart.
5. En L11, el catálogo presenta bloques compactos por carriles de estación, con tres fallas visibles por bloque mientras no haya búsqueda activa. Al buscar, muestra todas las coincidencias en una lista desplazable para no ocultar resultados; el buscador acepta código, descripción, tipo o estación. La barra permite volver al catálogo completo, alternar tema día/noche y abrir el selector PDF existente. El registro AST se excluyó del catálogo activo a petición del usuario; quedan 122 fallas en 10 estaciones. En escritorio hay cinco carriles, con PT1 primero y RST debajo. Cada falla abre Failure Record, Troubleshooting Sequence y Disposition Flow; si hay más de un procedimiento o grupo de pasos fuente, se puede elegirlo. Los detalles FA y flowcharts conservan su página de origen. Las referencias visuales de CBC FRU EEPROM solo aparecen en procedimientos FLA asociados a las páginas 79–80. Si una falla no trae flowchart, la vista lineal derivada representa solo sus pasos y no inventa decisiones.
6. En BAT, el recorrido guiado registra respuestas/notas en memoria de la sesión. El formulario captura identificación, análisis/RCA y evidencias; la impresión del navegador permite elegir Guardar como PDF.
   En el reporte No Boot, cada imagen se lee y decodifica antes de liberar el estado de carga; la impresión reutiliza el elemento ya decodificado para evitar que el diálogo PDF lo capture antes de que aparezca.
7. El catálogo BAT puede actualizarse desde PDF. El parser MTF de Excel y `loadExcelFile` permanecen en el código, pero se retiró el botón que abría el selector: la barra MTF ya no ofrece una vía visible para importar Excel. También conserva el botón `Actualizar PDF FFDG`, que solo abre el selector de archivos PDF; aún no extrae, sube ni guarda el documento ni modifica el catálogo. Los catálogos importados se guardan en `localStorage` del navegador cuando el almacenamiento está disponible.
8. Las notificaciones y topología son paneles informativos; no son una API ni una fuente de verdad técnica por sí mismos.
9. La persona puede cerrar la sesión desde la barra superior; el cierre elimina la marca temporal de sesión y cierra los diálogos abiertos.

## 4. Flujo BAT

### Datos y organización

- El catálogo base se declara dentro de `index.html`, en `FFDG.data.failureCatalog`, agrupado por familias FRU, Logic, Leak, Fan y No Boot.
 La falla No Boot `Central IO board panel LEDs do not turn on` usa `NDBG_092`, etiqueta propia y UID código+etiqueta, porque el catálogo también conserva el registro FRU existente `NDBG_092 · FRONT IO FRU EEPROM`. Al restaurar un catálogo local, el inicializador elimina la etiqueta española anterior exacta de esa falla administrada y persiste de nuevo el registro canónico en inglés. `NDBG_122 · FW ISSUE` es otra adición No Boot, insertada después de NDBG_092 incluso al restaurar un catálogo guardado, con tres pasos propios aportados por el usuario para revisar y actualizar firmware BMC/HMC y validarlo mediante BAT Script.
- Fans incluye NDBG_104–106 (FAN SPEED 1–3) y NDBG_117–121 (FAN SPEED 4–8). Las ocho fallas tienen procedimiento propio de cuatro pasos, con el número del ventilador correspondiente: validar ruteo, ejecutar el script BMC Sensors, validar resultados y hacer reseat, retest. Todas se marcan `managedAddition`; al restaurar el catálogo local se agregan las ausentes y se sincronizan esos pasos en registros FAN existentes.
- `bat-pdf-seed.js` aporta 25 registros iniciales. Si no hay catálogo guardado válido, `mergeProcedures` los asocia/combina con el catálogo base y guarda el resultado localmente.
- El código BAT asigna UID compuesto de código + etiqueta normalizada para diferenciar casos que comparten código.
- El tablero agrupa por familia, mantiene búsqueda y selección, y alimenta el detalle desde el elemento seleccionado.
- Los encabezados del tablero BAT acompañan FRU/EEPROM, LEAKAGE, FANS, LOGIC y NO BOOT con iconos locales decorativos; no añaden etiquetas ni cambian la agrupación. En la ficha se muestran los títulos de toda la secuencia en vertical; `aria-current="step"` marca el paso activo, y su detalle/guía de fallo se revela solo en ese elemento cuando existe.
- La secuencia compacta conserva los procedimientos y los controles Anterior/Paso siguiente. El detalle mantiene tres columnas desde 1024 px; por debajo conserva el apilado responsive. El flowchart y sus datos técnicos no se modifican.
- En BAT, «Cambiar falla» limpia la selección activa y oculta ficha, evidencia fotográfica y secuencia de potencia antes de mostrar el tablero; seleccionar una falla vuelve a abrir su detalle. En No Boot, la ficha de falla y sus pasos quedan como vista inicial; se ocultan identificación del nodo, historial, evidencia lateral y secuencia de potencia. El botón «Realizar reporte de falla» dentro de Failure Record abre la captura de reporte.
- La secuencia de la ficha muestra todos los títulos. El paso activo conserva `aria-current="step"`; al pulsar «Paso siguiente» el técnico confirma visualmente como completado el paso que deja atrás. El último requiere «Completar secuencia». Los completados siguen verdes al volver a pasos anteriores; solo viven en `FFDG.state` mientras la ficha permanece abierta y se reinician al cambiar/cerrar la falla. No se guardan en `localStorage` ni certifican un resultado técnico externo.
- En escritorio amplio, las tres cards BAT conservan altura compartida; la ficha usa `max(420px, calc(100dvh - 284px))`. Los metadatos parten de 50 px y no se estiran para rellenar la card, aunque crecen si el texto ocupa más líneas. Los pasos parten de 50 px, conservan altura natural con 6 px de separación y pueden desplazarse dentro de la secuencia si exceden el espacio; el detalle activo puede crecer para mostrar su contenido sin recortes. Disposition Flow mantiene algo más de ancho. El stage del flowchart conserva el SVG en su proporción nativa, con fondo blanco, marco visible y nodos ligeramente más anchos; no cambia el contenido ni las conexiones. Anterior, Paso siguiente y Ampliar diagrama permanecen dentro del panel y al fondo; los controles miden 34 px en escritorio y al menos 44 px en tableta/teléfono. «Cambiar falla» regresa al catálogo. En tablet/teléfono las cards se apilan y mantienen los controles después del diagrama.
- En el detalle del tablero, `getBatDetailSteps` muestra `failure.steps` para adiciones `customProcedure`; el diagnóstico guiado legacy que inicia el formulario No Boot asigna siempre `FFDG.data.flows.NOBOOT` a `FFDG.state.steps`, aun si la falla tiene pasos propios. El modal de reporte usa `getBatDetailSteps`, igual que la tabla visible, para generar opciones de detención/Pass; no usa el historial del diagnóstico ni inventa registros. La diferencia entre el flujo guiado legacy y el procedimiento particular del detalle queda como pendiente de alineación, pero no altera la fuente de pasos usada por el modal. Las adiciones NDBG_092 y NDBG_122 definen tres pasos propios cada una; las ocho fallas Fan (NDBG_104–106 y NDBG_117–121) definen cuatro pasos personalizados por velocidad. Las adiciones administradas se restauran sobre un catálogo BAT guardado y sincronizan procedimientos propios cuando cambia la versión de esos pasos, sin reemplazar los demás registros; las que declaran `insertAfterCode` respetan esa posición al reinsertarse. El estado del diagnóstico (paso, respuestas, hora, notas y evidencias) vive en `FFDG.state` durante la sesión.
- El importador PDF local usa PDF.js. Busca páginas que contengan encabezado de error NDBG, estación BAT, descripción y FA Steps; extrae el texto, fusiona por código/etiqueta y persiste el catálogo con clave `ffdg-bat-catalog-v1`.
- El flowchart BAT se genera como SVG a partir de los pasos. La implementación vigente dibuja una validación compartida de estación, conexiones Pass/Fail, secuencia de acciones y escalación terminal cuando los datos tienen pasos. `src/css/shared/ffdg-flowchart-theme.css` aplica tonos ejecutivos suavizados: azul pizarra a acciones, ámbar claro a decisiones, verde salvia a Pass y rojo apagado a Fail/escalación. Las cajas de paso miden 410×38 px; rombos naranjas y salida verde son más anchos. El lienzo horizontal se redistribuye para conservar los tramos horizontales entre pasos y carriles; alturas, coordenadas verticales y secuencia no cambian. No cambia ramas ni etiquetas. No sustituir el diagrama BAT existente al modificar exclusivamente MTF.

### Formulario y reporte BAT

- Las familias BAT que usan cierre guiado conservan el formulario de identificación, clasificación, retest, acción, causa raíz, evidencia de causa y siguiente acción.
- No Boot presenta primero Failure Record, Troubleshooting Sequence y Disposition Flow. El botón verde «Realizar reporte de falla» es compacto y centrado dentro de Failure Record. El modal dedicado captura serial/P/N del nodo y analista, estado reportado (Resuelta, En validación, NVIDIA, Reparación o Pruebas), retest, procedimiento aplicado según el FFDG de NVIDIA, clasificación, siguiente acción, RCA, intervención y fotos antes/después. Cada foto permite editar su nombre de evidencia. Pregunta si hubo cambio de tarjeta/hardware; solo si se responde «Sí» exige P/N y S/N de la tarjeta dañada; con «No» los inputs quedan ocultos y vacíos. En el PDF, P/N y S/N muestran «No aplica» cuando la respuesta no es Sí. No muestra checklist de todas las validaciones; el selector de procedimiento usa `getBatDetailSteps` de la falla activa. No pide un paso/acción separado donde se obtuvo Pass.
- La captura del reporte No Boot se presenta en un diálogo ejecutivo amplio, con logo NVIDIA visible en el encabezado, identificación superior, dos columnas verticales compactas y evidencia antes/después. Sigue el tema global: superficies blancas en modo día y oscuras en modo noche. Los iconos de sección se muestran ampliados; RCA e intervención comparten columnas del mismo ancho, con textarea limitado a su columna. Conserva campos, IDs, validaciones, opciones dinámicas, evidencia y plantilla de impresión PDF.
- Las evidencias generales de imagen se mantienen con Object URLs en memoria; las evidencias No Boot antes/después se leen como Data URLs para que estén listas al imprimir. Ambas modalidades viven solo en la sesión y no se guardan en `localStorage`.
- `printBatReport` valida clasificación, causa raíz y siguiente acción. El reporte BAT normal requiere historial; el modal No Boot puede generarlo sin ejecutar esa guía, porque captura directamente el procedimiento aplicado y el resultado declarado, sin fabricar registros en `FFDG.state.history`. En ambos casos abre la plantilla BAT existente para impresión del navegador. El PDF No Boot conserva identificación, estado, retest, clasificación, acción siguiente, procedimiento FFDG, RCA, intervención, respuesta de cambio de hardware, evidencia adjunta, fecha y hora local, y firmas de diagnóstico/Calidad. Si hubo cambio de hardware, agrega P/N y S/N reales de la tarjeta dañada; si no, conserva «No» y marca P/N/S/N como «No aplica». No imprime folio, checklist, bitácora ni flowchart. Su capa `ffdg-report-print.css` limita el estilo a impresión No Boot, asigna página A4 con márgenes de 5 mm y distribuye el reporte en la hoja. La composición replica la referencia gerencial: bloque de marcas NVIDIA/Ingrasys y fecha/hora; título azul marino centrado con sello informativo; seis encabezados numerados verdes con títulos centrados; identificación en seis columnas; resultados con iconos; clasificación en franja verde; procedimiento aplicado; diagnóstico en tres columnas; bloque verde de hardware; dos paneles visibles Antes/Después con imagen adjunta o marcador explícito; y firmas en columnas alineadas con renglones independientes para nombre y fecha. P/N/S/N y el paso proceden de la captura real; las evidencias ausentes se indican sin simular fotos. Entradas extensas pueden paginarse; la apariencia final depende del motor de impresión. No se verificó visualmente en navegador en esta sesión. BAT general y MTF conservan sus plantillas.
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
- La barra superior usa `src/css/shared/control-rail.css`: BAT/MTF son tabs primarios amplios con icono lateral y estado BAT verde/MTF claro; BAT muestra Catálogo BAT, Tablero de fallas, buscador, Modo Noche, actualización PDF y Customer notifications en un rail compacto. Los controles llaman la lógica existente; no cambia el contenido, orden o geometría de categorías, recuadros, pasos ni diagramas.
- El importador Excel localiza una tabla con Tab No, Error Code y Error Code Description, asocia la hoja de detalle por Tab No y toma sus pasos, metadatos, comandos y variantes. Genera `recordKey` por ocurrencia/fila para mantener registros duplicados separados.
- El parser Excel MTF y `loadExcelFile` permanecen implementados, pero se retiró el botón y el manejador del input de la barra MTF; actualmente no hay una vía visible para seleccionar un workbook desde la interfaz. `Actualizar PDF FFDG` abre un selector limitado a PDF, pero sigue sin parser ni manejador de selección y no modifica ni persiste información.
- La lectura de detalles reconoce filas de flujo y columnas de variantes; actualiza el catálogo MTF y lo persiste en `localStorage` con clave `ffdg-mtf-catalog-v2`. Al restaurar también pasa por la función de combinación/enriquecimiento.
- Si no hay hoja de procedimiento asociada, la interfaz informa el faltante; no debe inventarse un procedimiento para “completar” una falla.

### Imágenes, diagramas y disposición

- La asociación de referencias MTF depende de `mtf-pdf-reference-map.js` y de recursos bajo `assets/`; el mapa agrega página/indicaciones y enriquece registros por identidad/fuente, no solo por texto parecido.
- `mtf-pdf-procedure-overrides.js` contiene 55 overlays MTF, cada uno con coincidencia única contra el catálogo base verificada en el corte del 2026-10-10. Se identifican por estación+código+descripción y guardan páginas fuente; no usar el código por sí solo. Las entradas suplementarias `PDF-MTF-CASE-*` conservan sus transcripciones particulares y no reciben overlays por coincidencia parcial.
- El módulo de overlays se ejecuta dentro de `mergeMtfPdfAdditions`, por lo que alcanza los datos base y los recorridos de restauración/importación que llaman esa función. Si una futura fuente cambia la identidad o estructura de catálogo, volver a auditar sus coincidencias antes de ampliar las reglas.
- Cuando existe `flowchartImage` con dimensiones o un grafo PDF asociado válido, `renderFlowchart` y el observer tardío `drawFlow` conservan el diagrama fuente. Si no existe fuente verificada y sí hay pasos, `mtf-procedure-sequence-flowchart.js` dibuja un recuadro por paso, con flechas que solo expresan el orden enumerado; el aviso identifica que es una secuencia visual derivada, no un flowchart del PDF. No añade decisiones, Pass/Fail, resultados, retests ni acciones terminales. Sin pasos disponibles, conserva el aviso de procedimiento faltante.
- Los SVG MTF vectoriales y de secuencia derivada reciben la misma paleta ejecutiva suavizada que BAT mediante `ffdg-flowchart-theme.css`; la clase de estado solo ayuda a presentar nodos/etiquetas existentes. Las acciones admiten hasta 320 px y decisiones hasta 336 px según el layout; el lienzo aumenta su espacio entre columnas para reservar al menos 58 unidades de conexión. El terminal rojo conserva su ancho previo. Alturas y separaciones verticales originales se conservan. La secuencia derivada usa cajas de 730 px y mantiene altura/gaps existentes. El stage usa fondo blanco. Las imágenes fuente PDF (`.mtf-pdf-flowchart-source`) conservan intactos sus píxeles; `.mtf-source-flowchart-image > image` recibe el tinte CSS Opción 1 solo en pantalla. Los SVG generados existentes no reciben ese filtro ni cambian sus nodos, conexiones o etiquetas.
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
| UI y comportamiento actual | `index.html` + `src/css/` + `src/js/` + `assets/icons/` | Entrada versionada, capas visuales locales y recursos decorativos; revisar orden de carga y estado Git. |
| Catálogo BAT base y flujo No Boot | `src/js/data/app-catalog.js` | `FFDG.data.failureCatalog` y `FFDG.data.flows`. |
| Seed BAT del manual | `src/js/data/bat/bat-pdf-seed.js` | Se fusiona solo al iniciar sin un catálogo local válido. |
| Importación/merge BAT | `src/js/bat/bat-pdf-importer.js` + núcleo | PDF.js procesa el archivo elegido por el usuario; no asume conexión a un manual instalado. |
| Catálogo MTF base y overlays verificados | `src/js/data/app-catalog.js` + `src/js/data/mtf/mtf-pdf-procedure-overrides.js` | 113 registros base; 55 identidades tenían overlay inequívoco al corte del 2026-10-10. |
| Casos MTF PDF adicionales | `src/js/data/mtf/mtf-pdf-additions.js` | Contiene 175 adiciones en el snapshot auditado. |
| Catálogo L11 | `src/js/data/l11/l11-catalog.js` | Fuente original: 111 filas del índice más 12 registros FA suplementarios; el catálogo activo excluye el caso AST por solicitud y contiene 122 grupos en 10 estaciones. Las entradas suplementarias siguen identificadas como detalles FA. |
| Procedimientos/flowcharts L11 | `src/js/data/l11/l11-catalog.js` + `assets/flowcharts/l11/` | 62 referencias de procedimiento y 45 imágenes fuente únicas. Los flowcharts se enlazan por página/código; cuando el documento no proporciona uno, se muestra una secuencia derivada sin ramas de decisión añadidas. |
| Imágenes de referencia L11 | `src/js/data/l11/l11-reference-images.js` + `src/js/l11/l11-reference-view.js` + `assets/reference-images/l11/` | Dos imágenes extraídas sin recomprimir de las páginas 79–80; se muestran solo en los procedimientos FLA `fa-p13`, `fa-p14` y `fa-p16`, con acceso a la galería compartida. |
| Procedimientos cargados por Excel | Workbook seleccionado por el usuario + parser de `index.html` | Tab No identifica hoja maestra/detalle; el importado se mantiene local. |
| Flowcharts MTF fuente | `src/js/data/mtf/` + `assets/flowcharts/mtf/` | La imagen asociada a identidad/página prevalece; el módulo vectorial es fallback, no sustituto documental. |
| Secuencia visual MTF cuando falta flowchart fuente | Pasos activos del registro + `src/js/mtf/mtf-procedure-sequence-flowchart.js` | Representación secundaria lineal; no certifica estructura o decisiones del PDF y no sustituye una imagen/grafo fuente existente. |
| Imágenes de referencia MTF | `src/js/data/mtf/mtf-pdf-reference-map.js` + `assets/reference-images/mtf/` | El helper normaliza rutas heredadas de catálogos locales a la nueva carpeta. |
| Topología GB300 | `assets/topology/gb300-board-topology.png` + markup de `index.html` | Recurso visual; no reemplaza el procedimiento de una falla. |
| Reporte BAT/MTF | `index.html` | Plantillas HTML y CSS de impresión; el motor final es `window.print()`. |
| Acceso local | `src/js/shared/login-gate.js` + `sessionStorage` (`ffdg-session-auth-v1`) | Lista de cuenta y comparación corren en cliente; solo persiste una marca temporal, no la contraseña. No es autenticación segura ni asigna roles. La portada coloca FFDG L10/L11 GB200/GB300 sobre NVIDIA RACKS; el botón de salida queda junto al nombre FFDG del encabezado. |
| Tema | `localStorage` (`ffdg-theme`) | Preferencia por navegador, no sincronizada entre usuarios. |
| Catálogos importados | `localStorage` (claves versionadas BAT/MTF) | Estado local por navegador; puede estar ausente, antiguo, bloqueado o lleno. |
| Registro diagnóstico BAT/evidencia y avance visual de pasos BAT | `FFDG.state` en memoria | No es almacenamiento persistente. El avance visual se reinicia al cambiar/cerrar la falla y no confirma Pass/Fail por sí mismo. |
| Dependencias de Excel/PDF | `vendor/sheetjs/` y `vendor/pdfjs/` | Evitar convertirlas en CDNs sin autorización y análisis de impacto. |

Los manuales/workbooks fuente no están incluidos en el árbol observado; por eso, los datos extraídos solo pueden reauditarse contra una fuente si esta se incorpora/autorizase para la tarea. No afirmar que un dato se verificó contra el documento fuente cuando solo se comprobó el catálogo.

## 7. Mapa de dependencias e impacto

- Cambiar la pantalla/login → afecta el gate inicial, `inert`, lista local de cuentas, marca `sessionStorage`, cierre de sesión, título del documento y rutas de assets. Mantener claro que no hay autenticación de servidor.
- Cambiar forma/campos de BAT → afecta `mergeProcedures`, tablero/selector, `renderBatSelection`, diagrama SVG, contador, importación/restauración, `localStorage` y reporte BAT.
- Cambiar `failureCatalog` o su UID → afecta selección inicial, opciones del formulario, asociación del seed, selección de tarjeta y restauración guardada.
- Cambiar `flows.NOBOOT` → afecta el stepper, texto/validación, diagrama y flujo del formulario No Boot; validar también resultado y reporte.
- Cambiar forma de un caso MTF → afecta merge base+adiciones, búsqueda/filtros, selección, stepper/variantes, referencias/flowchart, importación/restauración y reporte MTF.
- Cambiar los registros/procedimientos L11 → afecta el buscador por estación/tipo, asociaciones a varias páginas FA, selector de procedimiento/grupo, pasos fuente, imágenes de referencia y flowcharts; validar IDs, estaciones y páginas contra el PDF suministrado.
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
| `window.FFDG.data` / `src/js/data/app-catalog.js` | Catálogos + globals MTF → `failureCatalog`, `mtfFaults`, `flows`, merge helper | `src/js/app/ffdg-app-core.js`, UI e importadores | Cambia la fuente que alimenta ambas áreas; puede perder adiciones/enriquecimiento u ocultar fallas. |
| `mergeMtfPdfAdditions` / `src/js/app/ffdg-app-core.js` | Casos base/importados + metadatos de adiciones → catálogo combinado con flowcharts/referencias | Inicio, importación Excel, restauración | Riesgo de duplicar, reemplazar mal casos del mismo ID o asociar PDF incorrecto. Mantener reglas de reversión/enriquecimiento. |
| `renderMtfList`, `filterStation` / `src/js/app/ffdg-app-core.js` | Búsqueda, estación, catálogo → tarjetas/contador/filtros | Eventos de búsqueda y chips | Puede dejar fallas inaccesibles o romper selección, teclado y conteos. |
| `FFDG.ui.runMotionTransition` / `src/js/app/ffdg-app-core.js` | Callback de actualización → transición nativa del área de resultados cuando se soporta | Búsqueda BAT/MTF y filtros MTF | No introducir debounce, timers ni pérdida de estado; bajo movimiento reducido o sin API, actualizar directamente. |
| `FFDG.data.applyMtfPdfProcedureOverride` / `src/js/app/ffdg-app-core.js` | Registro MTF → copia con pasos/páginas/flowchart de overrides cuya identidad coincide | Fusión del catálogo y `renderFlowchart` | Se expone en el objeto de datos para que la capa UI no dependa del cierre léxico privado que lo define. |
| `renderMtfDetail`, `getActiveSteps` / `src/js/app/ffdg-app-core.js` | Falla, índice y variante → metadatos, pasos, referencias, acciones y controles | Selección de caso, siguiente/anterior, variante | Riesgo de mezclar casos, perder paso/variante o renderizar contenido no asociado. |
| `renderFlowchart`, `drawFlow` / `src/js/app/ffdg-app-core.js`, `src/js/shared/m3-upgrade.js` | Falla seleccionada + fuente/steps activos → imagen/grafo PDF o SVG lineal secundario | `renderMtfDetail`, observer de `mtf-step` | Prioridad de fuente obligatoria; el fallback solo enumera pasos y no puede crear ramas. |
| `renderMtfProcedureStepFlowchart` / `src/js/mtf/mtf-procedure-sequence-flowchart.js` | Lista de pasos e índice activo → SVG de cajas y flechas consecutivas | `renderFlowchart`, `drawFlow` | Debe preservar todos los títulos y el orden; no representar decisiones, resultados ni ramas ausentes. |
| `FFDG_MTF_ENRICH_REFERENCES` / `src/js/data/mtf/mtf-pdf-reference-map.js` | Caso + catálogo → caso con referencias según mapa/relaciones | `mergeMtfPdfAdditions` | Asociación cruzada puede mostrar la imagen de otra falla; validar id, estación, descripción y página. |
| `FFDG_OPEN_REFERENCE_GALLERY` / `src/js/shared/pdf-reference-gallery.js` | Título, refs, botón y clave → modal accesible | Botón de imágenes de referencia | Afecta teclado, restauración de foco, navegación y carga de imágenes. |
| `getBatDetailSteps`, `renderBatSelection` / `src/js/app/ffdg-app-core.js` | Falla + paso → procedimiento, datos y DOM BAT | Selector/board y navegación | Puede romper pasos terminales, No Boot, diagrama o progreso. |
| `renderBatFlowchart` / `src/js/app/ffdg-app-core.js` | Lista BAT de pasos + índice → SVG de acciones, retest, ramas y escalación | `renderBatSelection`, `src/js/bat/ffdg-bat-flowchart.js` | Regresión afecta diagramas BAT que el usuario pidió conservar; no editar por cambios MTF. |
| `readWorksheetCatalog`, `parseDetailWorksheet` / `src/js/app/ffdg-app-core.js` | Workbook SheetJS → registros maestros, hojas por Tab No, pasos, variantes y metadatos | `loadExcelFile` | Puede romper asociación de hojas, variantes o conservar duplicados. |
| `persistCatalog`, `restoreCatalog`, `loadExcelFile` / `src/js/app/ffdg-app-core.js` | Catálogo/archivo → `localStorage`, estado y rerender | Input Excel e inicialización | Riesgo de perder datos del navegador o cargar esquema incompatible. |
| `parseBatPage`, `mergeProcedures`, `importPdf` / `src/js/bat/bat-pdf-importer.js` | Texto PDF por página → procedimientos NDBG combinados | Input PDF BAT; PDF.js | Falsas fusiones por código/etiqueta o pérdida de pasos; preservar selección y catálogo guardado. |
| `printBatReport`, `printMtfReport`, `openMtfCaseReport`, `submitMtfCaseReport`, `openPrintDialog` / `src/js/app/ffdg-app-core.js` | Estado/captura por caso → DOM de impresión y diálogo del navegador | Botones PDF; caso piloto MTF limitado a FLA-04 | Reportes incompletos, identidad equivocada, pérdida de imágenes o contenido de pantalla; validar impresión real y mantener las firmas de Calidad sin persona preasignada. |
| `openDiagram`, `prepareDiagramTarget` / `src/js/shared/flowchart-modal.js` | SVG/imagen activa → modal ampliado y foco restaurado | MutationObserver, botones, teclado | Romper teclado, foco, ampliación o diálogos compartidos BAT/MTF. |

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
| Los recursos versionados cambiaron de ubicación durante la reorganización. Catálogos de navegador pueden conservar las rutas MTF anteriores. | Carga de recursos; medio | El mapa MTF normaliza rutas heredadas; se validaron rutas en servidor HTTP para carga inicial, referencias y diagramas el 2026-10-22. |
| Algunas fallas MTF no tienen flowchart fuente; antes el panel solo mostraba un aviso aunque el caso tuviera pasos. | Consulta de procedimientos; medio | Corregido el 2026-10-11: secuencia secundaria desde pasos, rotulada como derivada y sin decisiones; las fuentes verificadas conservan prioridad. |
| `renderFlowchart` usaba helpers declarados dentro del cierre de datos como si fueran variables locales de la capa UI; en especial detenía el render con `ReferenceError`, tanto antes de insertar diagramas fuente como al buscar grafos derivados. | Render de diagramas MTF; medio | Corregido el 2026-10-18: helper expuesto como `FFDG.data.applyMtfPdfProcedureOverride` y mapa de grafos consultado desde `window.FFDG_MTF_PDF_FLOWCHART_GRAPHS`. Chromium comprobó el diagrama fuente FLA-04 y el fallback SVG generado FLA-10. |
| Las reglas MTF de escritorio imponían `height: 0 !important` al stage de Disposition Flow; un selector posterior de menor especificidad no podía reemplazarlo y el SVG quedaba colapsado. | Presentación de diagramas MTF; medio | Corregido el 2026-10-18 en `src/css/shared/ffdg-motion.css` con un override de igual especificidad cargado al final; comprobado entonces con imágenes fuente y fallback generado en escritorio, tableta y teléfono. |
| `ffdg_bat.html` está ignorado y no es idéntico a la entrada versionada. | Copia local antigua; medio | Rutas locales de SheetJS/logotipo actualizadas por la mudanza; no canónico ni sustituto de `index.html`. |
| Los manuales y el workbook de origen no están dentro del árbol. No es posible reproducir una auditoría completa desde un clon sin que el usuario aporte la fuente correspondiente. | Procedimientos/imágenes; medio | Limitación de fuente; conservar la trazabilidad disponible en datos y bitácora. |
| No hay pruebas automatizadas FFDIGI configuradas; el `package.json` local ignorado solo tiene un test placeholder y no existe `node_modules`. | Validación/regresión; medio | Confirmado; validar manual/estáticamente hasta que se acuerde una suite. |

## 12. Deuda técnica (no corregida en la creación de esta memoria)

- `index.html` sigue siendo extenso por el markup. Los estilos y scripts inline se extrajeron a carpetas por responsabilidad.
- `src/js/app/ffdg-app-core.js` todavía concentra catálogo, estado, importación, renderizado, impresión y listeners; dividirlo gradualmente, función por función y comprobando consumidores.
- Los namespaces `window.FFDG` y `window.FFDG_MTF_*` acoplan bloques; orden de carga es relevante.
- Catálogos grandes y mapas derivados del PDF son mantenidos como literales estáticos; cambios exigen validar duplicados, páginas e identidad.
- La copia `ffdg_bat.html` y el manifiesto local ignorados pueden generar deriva respecto a la entrada rastreada.
- La persistencia es por navegador, sin sincronización ni migración central entre usuarios.
- La configuración del proyecto carece de una prueba de regresión reproducible integrada en Git.

No se refactorizó ni cambió comportamiento durante la auditoría inicial.

## 13. Pendientes separados por certeza

### Pendiente confirmado

- Alinear, en una tarea posterior con análisis de impacto, los pasos No Boot mostrados para entradas `customProcedure` con el procedimiento que realmente ejecuta el formulario; actualmente el detalle puede mostrar pasos particulares, mientras que el diagnóstico guiado usa `flows.NOBOOT`.
- Confirmar la reorganización en el remoto solo cuando se solicite publicación; este cambio local aún no se ha subido.
- Completar pruebas responsive en móvil/tableta y la restauración de catálogos MTF antiguos desde `localStorage`; la validación del 2026-10-22 cubrió las entradas BAT/MTF, FLA-07, la galería de referencias, los diagramas y controles en navegador de escritorio, pero no esos escenarios adicionales.
- Si se aporta otra versión del PDF, reauditar asociaciones de imágenes contra estación, código, descripción y página; el manual fuente no está versionado dentro de este árbol.

### Posible mejora, no requisito confirmado

- Separar módulos de UI/datos después de contar con pruebas y plan de regresión.
- Agregar una prueba automatizada de integridad de rutas, asociaciones de imágenes y conteos de catálogo.
- Revisar el esquema de persistencia local y estrategia para compartir catálogos entre navegadores.

### Idea futura

- Versionar junto al proyecto manifiesto/entorno de pruebas reproducible, si se acuerda un flujo de ejecución local mantenido.

## 14. Estado de Git observado durante la auditoría

- Rama `develop`; HEAD previo a la reorganización: `ce180b2`; estado observado al iniciar: `ahead 40` respecto a `origin/develop`.
- El remoto `secundaria` apunta a Gabo (`gabo566/FFDIGI-FA-BAT`), rama `main`; al inicio coincidía con ese HEAD.
- La reorganización queda en el árbol local sin commit ni push; no equivale a publicación remota. El árbol continúa en `develop`, 40 commits locales por delante de `origin/develop`, más los cambios de esta reorganización.
