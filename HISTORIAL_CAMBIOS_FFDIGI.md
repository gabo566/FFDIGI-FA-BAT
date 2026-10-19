# Historial de cambios — FFDIGI FA BAT / MTF

Bitácora acumulativa del proyecto. Consultarla antes de modificar BAT/MTF y actualizarla después de cada cambio solicitado, separando lo implementado, la validación real y lo pendiente. No asumir que un cambio local fue publicado.

## 1. Propósito y alcance

- La guía BAT se enfocó en el primer diagnóstico de ensamble y encendido: conectividad, alimentación, comunicación y daños físicos observables. BAT no dispone de logs detallados por tarjeta; pruebas más profundas corresponden a MTF/FLA/FLB.
- Se conservaron dos recorridos: BAT para encendido básico y MTF para catálogo de fallas, validaciones, comandos y disposiciones.
- El flujo de diagnóstico se planteó como selección de falla → validaciones → acciones → resultado/disposición, con trazabilidad suficiente para generar un reporte de calidad.

## 2. Estructura, navegación y presentación

- Se desarrolló una página interactiva para BAT y MTF usando como referencia el HTML, el código compartido, la hoja de cálculo FFDG y los materiales de GB200/GB300 proporcionados.
- Se separó y luego se volvió a unificar el código según las iteraciones solicitadas; se incorporaron estilos y scripts en una página HTML autocontenida cuando se pidió.
- Se reorganizó la interfaz para usar el ancho disponible, evitar contenido centrado con espacio desperdiciado y aprovechar mejor la pantalla con navegación lateral.
- La navegación lateral se hizo retraíble. Se trabajaron vistas de catálogo/tablero, tarjetas por estación y filtros/búsqueda para recorrer fallas con mayor rapidez.
- Se retiró el bloque explicativo “Cómo sustituye al Excel”.
- Se rediseñó la cabecera: logotipo NVIDIA a la izquierda, identidad FFDG centrada dentro del área del encabezado, jerarquía más visible y nombres sin duplicación.
- Se añadieron mejoras de interacción: al seleccionar una falla de las tablas, la vista se desplaza a los paneles inferiores de diagnóstico; el diagrama de flujo puede abrirse en una ventana modal.
- Se ajustaron títulos y presentación de los tres paneles inferiores: “Failure Record”, “Troubleshooting Sequence” y “Disposition Flow”, sin numeración y con colores de acento diferenciados. El contenido interno conserva fondo neutro cuando corresponde.
- Se solicitaron y aplicaron iteraciones de color por familia/categoría de falla en el tablero BAT, además de normalización de términos como “Leakage”, “Fans” y “No Boot”.

## 3. Guía BAT y tablero de fallas

- Las fallas BAT se presentaron en formato de tablero visual similar a MTF, organizadas por familias como FRU, Logic, Leak, Fan y No Boot.
- Al elegir una tarjeta de falla BAT, el código seleccionado se carga automáticamente en “Código de Falla”.
- Se incorporó a la guía el flujo BAT No Boot facilitado por el usuario, con estos puntos:
  1. Revisar el enlace entre GPUs mediante cables B2B y Clink entre Biancas.
  2. Revisar ruta principal de hardware: LEDs Standby, cables J21/J22, FP_IO, BD J9 y módulos BMC/HMC; usar consola para descartar una falla funcional antes de concluir daño físico.
  3. Revisar conexión y ensamble del cable J15 PDB/Bianca, pines doblados y puertos; considerar el error de lectura FRU/I2C descrito en la referencia.
  4. Medir salidas J3/J4/J5/J6 antes y después del boot; comprobar impedancia entre Biancas e inspeccionar físicamente la PDB.
  5. Aislar la Bianca derecha desconectando B2B y energizando; inspeccionar componentes si solo giran los ventiladores del lado izquierdo.
  6. Si no hay daño visible, validar con Bianca Golden y comandos de consola.
- La guía no sustituye procedimientos oficiales ni pruebas MTF/FLA/FLB. Las decisiones deben contrastarse con el procedimiento autorizado de la estación.

## 4. Formulario BAT

- Se añadieron opciones de número de parte (P/N): `675-24975-2000-000`, `675-24975-3000-000`, `675-24975-3100-000` y `675-24059-3000-000`.
- Se conservó el serial como captura manual, tras revertir la propuesta de autogenerarlo.
- Se añadió captura de analista por número de empleado, con nombre asociado para el equipo FA:
  - `140784` — Gabriel Medina Ramirez.
  - `140785` — Alexander Cordova Villa.
  - `140783` — Brandon Garcia Olguin.
  - `140787` — Daniel Ornelas Carmona.
  - `140789` — Oscar Tomas Esparza Mendoza.
- Se solicitó una alternativa “Otro” para registrar a un analista adicional.
- Se redistribuyeron los campos para mejorar lectura y reducir amontonamiento.

## 5. Reporte PDF para Calidad

- Se corrigió el flujo de “Generar Reporte Oficial” para imprimir/guardar como PDF desde el navegador con datos del nodo y del análisis RCA.
- Se reorganizó el reporte con jerarquía visual, colores, espacios y secciones más legibles; se añadió marca Ingrasys y el logotipo suministrado.
- Se eliminaron del reporte las explicaciones de procedimiento FA y, específicamente, “Ruta de diagnóstico y decisiones registradas”, porque el documento está dirigido a Calidad.
- Se mantuvieron datos técnicos y de identificación, falla, causa raíz, siguiente acción, evidencias disponibles y firmas.
- La causa raíz se estructuró con opciones funcionales/firmware y daño físico, incluyendo componentes como BMC, HMC, interposer y cables J21/J22 cuando aplican.
- La siguiente acción contempla opciones como Retest/AC y Reparación.
- La firma de diagnóstico muestra el nombre y número de empleado del analista; la firma de Calidad se configuró con el nombre indicado por el usuario: Claudia Itzel Almaza Lopez. Se incluyeron fechas en las firmas.
- El reporte probado quedó distribuido en dos páginas, con encabezado de continuación e inclusión condicional de evidencia fotográfica.

## 6. Adaptabilidad y validación

- Se pidió mantener compatibilidad con móvil, tableta y computadora.
- Se validaron anchos de referencia de 390 px, 768 px y 1440 px; se revisó que el documento no desbordara horizontalmente y que los controles BAT/MTF fueran utilizables.
- Se verificó sintaxis de scripts embebidos, diferencias limpias con `git diff --check` y coherencia entre la copia de trabajo `ffdg_bat.html` y la página del repositorio `pagina ffdg/index.html` en la revisión más reciente.
- Para los cambios de reporte se generó un PDF de prueba temporal de dos páginas y se inspeccionó visualmente; ese archivo de prueba se eliminó después de validar.

## 7. GitHub y publicación

- Se preparó el proyecto para GitHub Pages y se dieron indicaciones para habilitar la visibilidad web.
- A lo largo de la conversación hubo solicitudes de subir cambios y configurar una segunda cuenta/remoto de GitHub.
- **Estado de publicación más reciente conocido:** los ajustes recientes del reporte Ingrasys quedaron validados localmente, pero no se confirmó su publicación en GitHub. El estado observado fue `develop...origin/develop [ahead 2]`, con `pagina ffdg/index.html` modificado y `pagina ffdg/ingrasys-logo.png` sin seguimiento. Por tanto, este registro no afirma que la última versión esté publicada.
- El archivo de trabajo `ffdg_bat.html` y el archivo del repositorio `pagina ffdg/index.html` se mantuvieron como copias equivalentes para la iteración validada.

## 8. Archivos vinculados al trabajo reciente

- `ffdg_bat.html` — copia local usada/abierta en el navegador.
- `pagina ffdg/index.html` — página dentro del repositorio Git.
- `pagina ffdg/ingrasys-logo.png` — recurso de marca para el PDF.
- `ingrasys-logo.png` — copia del recurso junto al HTML local.
- Este historial es informativo; no cambia el estado de Git ni publica archivos.

## 9. Pendiente / límites del registro

- Publicar la última versión en GitHub y verificar el resultado remoto.
- La sincronización automática desde un nuevo Excel FFDG fue solicitada como comportamiento deseado; este historial no confirma una conexión automática permanente a un archivo externo. La actualización depende de cargar/importar el workbook soportado por la página.
- Los nombres, números de empleado, P/N, firmas y recomendaciones deben revisarse contra la lista/procedimiento vigente antes de usar el reporte como documento controlado.

## 10. Reglas para continuar este proyecto

- Leer esta bitácora antes de modificar el proyecto; reutilizar las decisiones confirmadas y no revertir cambios sin petición explícita.
- Mantener separados los alcances BAT y MTF. Si se pide un cambio MTF, no reemplazar ni alterar los diagramas BAT.
- Para flowcharts, preferir la imagen fuente asociada a la falla y página del PDF. No inventar nodos, decisiones, ramales ni etiquetas; preservar los PNG originales y el modal de ampliación.
- Revisar la identidad completa de cada falla (estación, código, descripción y página), no asociar solo por código cuando existan duplicados.
- Conservar las dos copias HTML (`pagina ffdg/index.html` y `ffdg_bat.html`) sincronizadas en el comportamiento y resolver rutas de recursos desde ambas ubicaciones.
- Verificar sintaxis, existencia de recursos, `git diff --check` y, cuando sea posible, probar visualmente móvil, tableta y escritorio. Si el navegador o una prueba está bloqueada, registrar el límite sin declarar esa validación como aprobada.
- Antes de cualquier publicación, revisar rama, remoto, cambios locales y tracking; no publicar ni atribuir autoría sin petición explícita.
- En cada actualización registrar fecha, solicitud, solución, archivos, validaciones y estado de publicación. No repetir un historial completo ni guardar datos que no sean necesarios para dar continuidad técnica.

## 11. 2026-10-10 — Flowcharts MTF como imágenes originales del PDF

### Solicitud

Reemplazar la representación vectorial reconstruida de los flowcharts MTF por las figuras originales del PDF, con sus pasos, decisiones y ramales tal como aparecen en la fuente.

### Cambios aplicados

- La tarjeta MTF ahora prioriza `flowchartImage` antes que el renderer vectorial en ambas copias HTML; las asociaciones con imagen no pasan por el diagrama reconstruido.
- Se resolvieron las rutas de los PNG del catálogo existente usando `FFDG_MTF_PDF_REFERENCE_ASSET_URL`, para que funcionen desde `index.html` y desde `ffdg_bat.html`.
- El módulo MTF asocia la imagen fuente al grafo por la identidad/página correspondiente y la muestra dentro de SVG para conservar el flujo de ampliación existente.
- La falla heredada `AST-01` corresponde a la p. 62 del procedimiento y su flowchart está en la p. 63. Se extrajo la figura original de la p. 63 como `assets/mtf-flowcharts/mtf-flow-109.png` y se vinculó a esa falla.
- Referencias verificadas: `PDF-MTF-CASE-0001` y `FLA-19` → p. 18 / `mtf-flow-001.png`; `AST-06` → p. 57 / `mtf-flow-025.png`; `FLB-02` → p. 154 / `mtf-flow-083.png`; `PDF-MTF-CASE-0199` → p. 155 / `mtf-flow-084.png`. Los casos de pp. 154 y 155 permanecen diferenciados.
- Alcance MTF; no se alteraron los flowcharts BAT, las acciones/steps del procedimiento ni APIs.

### Archivos afectados

- `pagina ffdg/index.html` — prioridad de la imagen fuente y normalización de rutas del catálogo.
- `ffdg_bat.html` — mismo orden de render y rutas de recursos para la copia local.
- `pagina ffdg/mtf-pdf-flowcharts.js` — metadatos de imagen fuente, asociación AST-01 y render de PNG original.
- `pagina ffdg/assets/mtf-flowcharts/mtf-flow-109.png` — recorte del diagrama de la p. 63 de `ffdg.pdf`.

### Validación y límites

- Sintaxis comprobada en los scripts inline de ambas páginas y en `mtf-pdf-flowcharts.js`; `git diff --check` y revisión de espacios finales sin errores.
- Se comprobaron 216 asociaciones de flowcharts: todas cuentan con PNG existente y el renderer genera imagen fuente, no polígonos reconstruidos. También se revisaron los ejemplos de pp. 18, 57, 63, 154 y 155.
- El recorte nuevo de AST-01 se inspeccionó visualmente contra la p. 63 del PDF.
- La recarga de la página local `file://` fue bloqueada por la política del navegador. Por eso no se declara prueba visual en vivo como completada.
- Estado Git al registrar: rama `develop`, `ahead 3`; cambios locales pendientes. Sin commit ni push en esta iteración. La raíz Git operativa es `pagina ffdg`.

## 12. Cronología ampliada del proyecto y registro completo

### Alcance de este registro

Esta cronología reúne los hitos, decisiones, solicitudes recurrentes, correcciones y reversiones identificables en el historial de conversación y en el registro Git local disponible. Las peticiones de navegador se agrupan por intención cuando fueron iteraciones del mismo ajuste. El registro Git abajo es el historial local de la rama examinada; por sí solo no prueba que cada commit siga publicado en GitHub. Los reportes históricos de publicación se conservan como reportes de la conversación, no como verificación remota actual.

### 2026-10-01 — Inicio, alcance BAT/MTF y material de referencia

- Se inició la guía FFDIGI a partir de una interfaz HTML existente, workbook FFDG, capturas y materiales GB200/GB300.
- Se aclaró el sentido de BAT (Basic Assurance Test en el contexto del proyecto) y que su evaluación inicial debía centrarse en ensamble, encendido, alimentación y comunicación; las investigaciones detalladas por errores/tarjeta pertenecen al flujo MTF/FA.
- Se estructuraron las áreas BAT y MTF, con selección de falla, pasos/validaciones, disposición y registro para reportar calidad.
- Se trabajó el caso No Boot NDBG_107 y sus validaciones; se diferenciaron los procedimientos documentados y las recomendaciones operativas.
- Hubo iteraciones de arquitectura para separar scripts/estilos y luego volver a una página unificada/autocontenida cuando el usuario lo solicitó. Esta preferencia de consolidación debe contrastarse con el estado real más reciente antes de una nueva refactorización.
- Se incorporó el concepto de reporte PDF oficial de Calidad y se detectó que el reporte MTF necesitaba tratamiento propio.

### 2026-10-02 — Consolidación del HTML

- Se solicitó reunir la experiencia en un solo archivo/página HTML. Se volvió a unificar la implementación en vez de dejar al usuario con una estructura dividida que no pidió.
- Se mantuvo la interacción de BAT/MTF y se prepararon controles visuales para continuar el trabajo de diagramas e información técnica.

### 2026-10-03 — Reportes, disposición de paneles y publicación inicial

- Se ajustaron los tres paneles de detalle y su jerarquía: Failure Record, Troubleshooting Sequence y Disposition Flow.
- Se trabajaron títulos, acentos, diagrama de topología y distribución visual del panel MTF.
- Se preparó el sitio para GitHub Pages y se mejoró el PDF de Calidad BAT; el historial Git registra los commits `9c0ca2f`, `d268e7c`, `3621d41`, `d7e4c0a`, `fdfabfc` y `e7517dc`.
- Se revisó la interacción de ampliación de diagramas y el comportamiento del reporte desde la página.
- Las solicitudes de publicar/configurar GitHub se trataron por separado del trabajo local. Un commit en la rama no equivale a comprobar publicación actual.

### 2026-10-04 — Tablero BAT, familias y reporte RCA

- Se desarrolló el tablero de fallas BAT por grupos/familias y el enlace desde selección de tarjeta hasta código/detalle.
- Se incorporaron flujos de diagnóstico No Boot y estructura de reporte/RCA; se probaron colores por familia y legibilidad.
- Se registró el identificador de nodo y el flujo de decisión en reportes mediante commits de distintos autores. La autoría de Git y la autenticación/push remoto son conceptos distintos.
- Se ajustó el PDF oficial para hacer legibles los datos de análisis, las firmas y la disposición.

### 2026-10-05 — Calidad, firmas y mantenimiento GB200

- Se refinaron los campos de causa raíz, acción siguiente, evidencias y firmas del reporte de Calidad; se separó el contenido técnico de diagnóstico que no debía aparecer en ese informe.
- Se registraron opciones de retest/AC y reparación, datos de identificación de analista/calidad y fechas; el reporte de prueba se revisó en dos páginas con evidencia fotográfica condicional.
- Se consultó material de mantenimiento GB200 para mejorar la secuencia No Boot. El procedimiento oficial de la estación sigue siendo la fuente de autoridad.

### 2026-10-06 — Marca, controles MTF y navegación

- Se ajustaron marca/cabecera: NVIDIA RACKS, título FFDG y marca Ingrasys, con alineación y jerarquía.
- Se refinaron títulos de fallas, pestañas BAT/MTF y controles del catálogo, búsqueda, filtros y tema; varias iteraciones corrigieron centrado/orden entre vistas.
- Se incorporó una notificación al cliente y se trabajó la barra de búsqueda MTF.
- Se registró el P/N de BAT con varias opciones, serial manual (sin autogeneración) y selección/registro de analista, incluyendo alternativa Otro. Los datos personales/configurables deben verificarse antes del uso operativo.
- Se solicitó un archivo de contexto de cambios y se creó el historial del proyecto; este archivo es ese registro acumulativo.

### 2026-10-07 — Tableros, catálogo MTF y experiencia de diagnóstico

- Se iteraron la cuadrícula BAT/MTF, los filtros por estación, el orden de familias y la cantidad de tarjetas visibles; se revirtieron propuestas de distribución que no ajustaron como se esperaba.
- Se importaron procedimientos BAT desde el PDF y se revisó cómo mantener los detalles y botones visibles sin desplazamientos innecesarios.
- Se aproximó la vista de detalle BAT al patrón MTF y se ajustó la relación entre registro, pasos y diagrama.
- Se revisaron scroll, botones Anterior/Siguiente/Ampliar y selección de falla; el requisito estable es que los controles sigan accesibles y que la selección lleve al detalle esperado.
- Se inició la mejora responsive para escritorio, tableta y móvil.

### 2026-10-08 — Responsive, lógica BAT y manual MTF

- Se corrigieron desbordamientos horizontales de página, cabecera, toolbar y controles en anchos de tableta; se mantuvo como referencia de responsive 390, 768 y 1440 px.
- Se hicieron iteraciones del flowchart BAT para representar acciones ordenadas, resultados, retest y ramales. Hubo varias correcciones de conexiones y de decisiones; los commits locales conservan esas iteraciones y reversiones.
- Se probaron brevemente vistas de centro de control y referencias interactivas de rack GB200; ambas propuestas se revirtieron después. No deben considerarse características actuales por el solo hecho de aparecer en Git.
- Se agregó/ubicó la notificación al cliente junto a las acciones BAT correspondientes.
- Se reconstruyó el catálogo MTF desde `ffdg.pdf`, se incorporaron procedimientos faltantes y se relacionaron flowcharts fuente con fallas. El PDF citado por el usuario tiene 231 páginas; `ffdf.pdf` no se tomó como manual MTF completo.
- Se separó el problema de imágenes de referencia por falla: deben asociarse por error/procedimiento, aparecer en la sección correspondiente y conservar indicaciones/página, no vivir en una galería global.

### 2026-10-09 — Diseño MTF, restauración y protección de BAT

- Se refinaron el ancho de las tres tarjetas, el catálogo MTF, el comportamiento al abrir una falla, la visibilidad de pasos y la posición de los controles del diagrama.
- Se corrigieron botones que quedaban debajo del pliegue y diagramas demasiado desplazados; la disposición debe dejar visible la secuencia y controles sin romper el tamaño de las tarjetas.
- Se revisó ocultar el catálogo de fallas y la inclusión de OBA; la evidencia del snapshot actual indica que OBA se filtra del catálogo en el código presente. Ese comportamiento debe confirmarse antes de cambiarlo.
- A petición del usuario se restauró la versión de referencia `032cbcebe37be47b53dc56fdc9799aadbd904df2`, preservando el trabajo local mediante resguardo/reaplicación según el registro de la conversación.
- Se pidió recuperar mejoras estéticas anteriores sin reemplazar ni borrar los flowcharts BAT existentes. Se restauraron los diagramas BAT mediante los commits `c7f4e80` y `371a42b` del historial local; el requisito explícito es no sustituirlos con imágenes reconstruidas desde otro PDF.
- Se reiteró que el usuario quería publicar al repo de Gabo y usar autor Gabo en solicitudes anteriores. Eso solo se aplicó en los casos que la conversación reportó como completados; no se debe inferir que el estado remoto actual esté sincronizado.

### 2026-10-10 — Imágenes por falla, galerías y flowcharts MTF

- Se pidió recuperar diagramas e imágenes que permanecían en BAT; alcance y asociaciones se fueron precisando para conservar los flowcharts BAT actuales.
- Se incorporaron referencias de MTF por falla a partir del PDF, con texto de indicación y páginas. El usuario enfatizó que faltaban imágenes; el estándar es auditar todas las figuras pertinentes, no solo una selección, y evitar cruces entre errores.
- Se atendió que las galerías alargaban las tarjetas: se definió control plegable con contador para galerías PDF BAT/MTF, manteniendo el acordeón de topología GB300 independiente. Las galerías empiezan plegadas, y la ampliación individual continúa en modal.
- Se aclaró que una imagen de referencia de topología no reemplaza las demás imágenes asociadas a la falla. Cualquier figura documental pertinente debe aparecer en la sección de referencia correcta.
- Se pidió rediseñar flowcharts MTF en forma ancha con acciones/rombos/ramales de validación según el PDF. Durante la implementación se detectó que algunas reconstrucciones añadían Pass/Fail o rombos que no estaban en la fuente. El usuario corrigió el requisito: reemplazar las reconstrucciones por las imágenes originales de los flowcharts del PDF. Esta instrucción posterior es la vigente.
- En ambas páginas MTF se priorizó la imagen original cuando existe; se documentaron ejemplos de asociación y un recorte nuevo para AST-01. BAT queda fuera de ese cambio.
- Se documentó la limitación de que el navegador bloqueó recargar la ruta local `file://`; por tanto no se aseguró prueba visual en vivo en esa iteración.

### Requisitos transversales que se mantienen

- Respetar la separación funcional BAT/MTF y distinguir guía inicial de diagnóstico avanzado.
- Usar material PDF con trazabilidad: página, falla, descripción, figura e indicación; no inventar lógica ni asociación.
- Preservar datos/cambios locales de usuario al restaurar o sincronizar Git. Revisar estado y rama antes de cualquier operación remota.
- No declarar push, publicación, importación Excel o prueba visual si no se ejecutó y verificó.
- Mantener responsive y accesibles los controles de selección, galerías y modales; comprobar móvil/tableta/escritorio al realizar cambios que los afecten.
- Mantener equivalentes las dos copias activas del HTML cuando se solicita que el cambio aplique en ambas; verificar diferencias/rutas de recursos.

### Estado Git observado para esta ampliación

- La raíz Git inspeccionada es `pagina ffdg`; rama `develop`, tracking `origin/develop`, estado reportado `ahead 3` al iniciar esta ampliación.
- HEAD local observado: `371a42b`; referencia local `origin/develop`: `4d47d1a`; referencia local `secundaria/main`: `371a42b`.
- El árbol tenía cambios locales en `index.html`, módulos MTF y recursos PNG; no se modificaron esos archivos para escribir esta bitácora.
- No se hizo commit ni push para esta actualización del historial. Las referencias locales no confirman el estado actual del servidor remoto.

### Registro íntegro de commits de la rama local examinada

Se incluyen hash corto, fecha, autor y asunto según `git log HEAD`. Es evidencia del historial local, no una lista de publicaciones verificadas.

- 9c0ca2f | 2026-10-03 | Julia Dhamar Regules Mendez | chore(pages): prepare safe FFDG site
- d268e7c | 2026-10-03 | Julia Dhamar Regules Mendez | fix(pdf): improve BAT quality report
- 3621d41 | 2026-10-03 | Julia Dhamar Regules Mendez | style(mtf): emphasize panel headings
- d7e4c0a | 2026-10-03 | Julia Dhamar Regules Mendez | feat(mtf): add topology diagram and layout
- fdfabfc | 2026-10-03 | Julia Dhamar Regules Mendez | style(mtf): differentiate diagnostic panels
- e7517dc | 2026-10-03 | Julia Dhamar Regules Mendez | style(mtf): highlight diagnostic headings
- 2a6cb75 | 2026-10-04 | Julia Dhamar Regules Mendez | feat(bat): add fault board and no boot flow
- 2b95397 | 2026-10-04 | Julia Dhamar Regules Mendez | feat(bat): structure quality report and RCA
- 042d171 | 2026-10-04 | Julia Dhamar Regules Mendez | style(bat): color fault family board
- 3928bac | 2026-10-04 | gabo566 | feat(bat): add node identifiers
- 7c64bd1 | 2026-10-04 | gabo566 | feat(report): add diagnostic decision flow
- 1fa294c | 2026-10-05 | gabo566 | fix(report): polish Ingrasys quality PDF
- 9aae43c | 2026-10-06 | Jair Iván Martínez Palacios | feat: add RACKS beside NVIDIA logo
- 2adfe9d | 2026-10-06 | Jair Iván Martínez Palacios | style: center failure titles
- 4eaebfb | 2026-10-06 | Jair Iván Martínez Palacios | style: center BAT and MTF fault headings
- 76c64e8 | 2026-10-06 | Jair Iván Martínez Palacios | feat: add Ingrasys logo to header
- 33d8614 | 2026-10-06 | Jair Iván Martínez Palacios | style: center and rename BAT and MTF menu tiles
- 7012c9a | 2026-10-06 | Jair Iván Martínez Palacios | style: balance MTF detail panels and center controls
- bce64dc | 2026-10-06 | Jair Iván Martínez Palacios | style: center MTF design controls in catalog header
- cff7bf4 | 2026-10-06 | Jair Iván Martínez Palacios | fix: keep MTF design controls centered in all views
- 0997d4c | 2026-10-06 | Jair Iván Martínez Palacios | style: set MTF catalog toolbar to black
- e9e8b4c | 2026-10-06 | Jair Iván Martínez Palacios | style: color MTF station filters NVIDIA green
- 47ab0ab | 2026-10-06 | Jair Iván Martínez Palacios | feat: add NVIDIA customer notification
- 4cf1ef5 | 2026-10-06 | Jair Iván Martínez Palacios | style: darken customer notifications button
- d8da8fd | 2026-10-06 | Jair Iván Martínez Palacios | style: center and narrow MTF search panel
- eedb9be | 2026-10-06 | Jair Iván Martínez Palacios | style: shorten and center MTF search field
- 43603d7 | 2026-10-06 | Jair Iván Martínez Palacios | fix: keep MTF filters ordered in every view
- cda16b4 | 2026-10-06 | Jair Iván Martínez Palacios | style: reduce and center Ingrasys header block
- 45fcfc4 | 2026-10-06 | Jair Iván Martínez Palacios | feat: move theme control above Excel upload
- bede8ca | 2026-10-06 | Jair Iván Martínez Palacios | refactor: streamline MTF search toolbar
- c201f08 | 2026-10-06 | Jair Iván Martínez Palacios | style: order BAT failure families by case count
- 2a4f443 | 2026-10-06 | Jair Iván Martínez Palacios | fix: keep BAT failure families on one row
- 165b40a | 2026-10-06 | Jair Iván Martínez Palacios | style: show three BAT failures per family
- 929ae27 | 2026-10-06 | Jair Iván Martínez Palacios | style: cap visible MTF failures and sort groups
- f77ff5c | 2026-10-07 | Jair Iván Martínez Palacios | style: match MTF board layout to BAT
- 89fb4eb | 2026-10-07 | Jair Iván Martínez Palacios | style: align MTF ALL card below FLC
- 4924c8a | 2026-10-07 | Jair Iván Martínez Palacios | fix: join MTF FLC ALL and diagnostic panels
- 52cd46f | 2026-10-07 | Jair Iván Martínez Palacios | fix: merge MTF ALL failure into RIN
- 7d4e18a | 2026-10-07 | Jair Iván Martínez Palacios | style: compact BAT and MTF boards headers
- 09851af | 2026-10-07 | Jair Iván Martínez Palacios | style: tighten RACKS wordmark typography
- 255a754 | 2026-10-07 | Jair Iván Martínez Palacios | style: align brand marks to header edges
- 5f69f68 | 2026-10-07 | Jair Iván Martínez Palacios | style: show three failure groups across BAT and MTF
- 6a69f58 | 2026-10-07 | Jair Iván Martínez Palacios | Revert "style: show three failure groups across BAT and MTF"
- 8f9d84a | 2026-10-07 | Jair Iván Martínez Palacios | style: fit three complete failures in each station board
- 60e495a | 2026-10-07 | Jair Iván Martínez Palacios | style: enlarge NVIDIA wordmark beside RACKS
- 2ceecc5 | 2026-10-07 | Jair Iván Martínez Palacios | style: slightly reduce RACKS wordmark
- b8f347d | 2026-10-07 | Jair Iván Martínez Palacios | Style left half of BAT search strip black
- 779483d | 2026-10-07 | Jair Iván Martínez Palacios | Make BAT search strip split visually clear
- 26b1321 | 2026-10-07 | Jair Iván Martínez Palacios | Revert "Make BAT search strip split visually clear"
- 5295f67 | 2026-10-07 | Jair Iván Martínez Palacios | Revert "Style left half of BAT search strip black"
- a007b3b | 2026-10-07 | Jair Iván Martínez Palacios | Center BAT search and add theme toggle
- 61a5efe | 2026-10-07 | Jair Iván Martínez Palacios | Import BAT failure procedures from PDF
- b637536 | 2026-10-07 | Jair Iván Martínez Palacios | Show BAT failure details without scrolling
- a0d21b1 | 2026-10-07 | Jair Iván Martínez Palacios | Add MTF-style BAT failure detail flow
- 8da1023 | 2026-10-07 | Jair Iván Martínez Palacios | Improve BAT and MTF diagnostic navigation
- 8d39b4b | 2026-10-07 | Jair Iván Martínez Palacios | Fix MTF failure selection scroll
- a5a80d0 | 2026-10-07 | Jair Iván Martínez Palacios | Compact BAT failure detail panels
- b01bbb1 | 2026-10-07 | Jair Iván Martínez Palacios | Match BAT detail sizing to MTF
- 2813932 | 2026-10-07 | Jair Iván Martínez Palacios | Keep BAT detail navigation buttons visible
- 5328cff | 2026-10-07 | Jair Iván Martínez Palacios | Align BAT failure view with MTF detail
- 85deab1 | 2026-10-07 | Jair Iván Martínez Palacios | Match BAT failure detail view to MTF layout
- 9c51fa2 | 2026-10-07 | Jair Iván Martínez Palacios | Give BAT flowchart more panel space
- 1703da8 | 2026-10-07 | Jair Iván Martínez Palacios | Move BAT diagram controls to one row
- ee8c98c | 2026-10-07 | Jair Iván Martínez Palacios | Align MTF diagram controls and remove chart scrolling
- e3d3c46 | 2026-10-08 | Jair Iván Martínez Palacios | Prevent horizontal overflow in diagnostic controls
- c69ed3b | 2026-10-08 | Jair Iván Martínez Palacios | Remove page-level horizontal overflow
- 1bf1d66 | 2026-10-08 | Jair Iván Martínez Palacios | Fit BAT toolbar within viewport at tablet widths
- 3657db9 | 2026-10-08 | Jair Iván Martínez Palacios | Keep Ingrasys logo clear of viewport edge
- 4802be6 | 2026-10-08 | Jair Iván Martínez Palacios | Compact top navigation and brand header
- 0bd88c4 | 2026-10-07 | gabo566 | style: improve responsive BAT/MTF boards
- 081a862 | 2026-10-07 | gabo566 | style: expand MTF catalog views
- e13594e | 2026-10-08 | Jair Iván Martínez Palacios | Prevent horizontal page scrolling
- 7a928a5 | 2026-10-08 | Jair Iván Martínez Palacios | Match BAT and MTF diagnostic panel sizing
- 264c0c0 | 2026-10-08 | Jair Iván Martínez Palacios | Align MTF detail inset with BAT panels
- 02038b3 | 2026-10-08 | Jair Iván Martínez Palacios | Correct BAT retest flowchart decisions
- b6c8a80 | 2026-10-08 | Jair Iván Martínez Palacios | Align BAT flowchart with station pass fail logic
- 8310485 | 2026-10-08 | Jair Iván Martínez Palacios | Simplify BAT flowchart retest loop
- 5e005a2 | 2026-10-08 | Jair Iván Martínez Palacios | Route BAT troubleshooting outcomes through ordered steps
- 60500e7 | 2026-10-08 | Jair Iván Martínez Palacios | Add BAT validation decision after every corrective step
- 1769576 | 2026-10-08 | Jair Iván Martínez Palacios | Use one BAT station validation decision
- e81c4e4 | 2026-10-08 | Jair Iván Martínez Palacios | Reuse one BAT station validation decision
- a906eef | 2026-10-08 | Jair Iván Martínez Palacios | Show all BAT steps with clear flow junctions
- 2542037 | 2026-10-08 | Jair Iván Martínez Palacios | Fix BAT flowchart connections
- 89aafc4 | 2026-10-08 | Jair Iván Martínez Palacios | Align BAT and MTF failure boards
- e2e753e | 2026-10-08 | Jair Iván Martínez Palacios | Show two MTF failures per category
- df3363f | 2026-10-08 | Jair Iván Martínez Palacios | Fit two MTF failures per category
- 744f423 | 2026-10-08 | Jair Iván Martínez Palacios | Add FFDG control center and local case log
- 21a37a8 | 2026-10-08 | Jair Iván Martínez Palacios | Add interactive GB200 rack and server references
- e3d68fc | 2026-10-08 | Jair Iván Martínez Palacios | Revert "Add interactive GB200 rack and server references"
- f572482 | 2026-10-08 | Jair Iván Martínez Palacios | Revert "Add FFDG control center and local case log"
- e34d89a | 2026-10-08 | Jair Iván Martínez Palacios | Add customer notification button to BAT
- 6c7c53f | 2026-10-08 | Jair Iván Martínez Palacios | Move BAT customer notification beside PDF update
- b495301 | 2026-10-08 | Jair Iván Martínez Palacios | Raise BAT controls and fault categories
- d98a64b | 2026-10-08 | Jair Iván Martínez Palacios | Deduplicate BAT terminal escalation
- 76f5ffc | 2026-10-08 | Jair Iván Martínez Palacios | Space BAT flowchart arrows from blocks
- c385154 | 2026-10-08 | Jair Iván Martínez Palacios | Lower BAT escalation terminal in flowchart
- 29b9885 | 2026-10-08 | Jair Iván Martínez Palacios | Add missing MTF procedures from FFDG PDF
- 09003cc | 2026-10-08 | Jair Iván Martínez Palacios | Rebuild MTF catalog from FFDG PDF
- 7f584ad | 2026-10-08 | Jair Iván Martínez Palacios | Use source PDF flowcharts for new MTF failures
- a41aad2 | 2026-10-08 | Jair Iván Martínez Palacios | Show original PDF flowcharts throughout MTF catalog
- e43a7df | 2026-10-09 | Jair Iván Martínez Palacios | Show PDF reference images on matched MTF failures
- 032cbce | 2026-10-09 | Jair Iván Martínez Palacios | Unify duplicate MTF FA escalation node
- 0dc5fa7 | 2026-10-09 | Gabo | fix(mtf): fit three cards and compact nav
- 0e18304 | 2026-10-09 | Gabo | fix(mtf): improve catalog layout
- 76c4a95 | 2026-10-09 | Gabo | fix(mtf): expand detail and toggle
- 1dba3bb | 2026-10-09 | Gabo | fix(mtf): align technical panels
- 8d4fbc7 | 2026-10-09 | Gabo | fix(mtf): keep flowchart controls visible
- 9443c72 | 2026-10-09 | Gabo | fix(mtf): align flowchart and controls
- f5489df | 2026-10-09 | Gabo | fix(mtf): expand selected technical detail
- 4d47d1a | 2026-10-09 | Gabo | Revert "fix(mtf): expand selected technical detail"
- bf23bd3 | 2026-10-09 | Gabo | feat(ui): improve catalog and diagram access
- c7f4e80 | 2026-10-09 | Gabo | fix(bat): restore branching flowchart
- 371a42b | 2026-10-09 | Gabo | fix(bat): restore 032 flowcharts
+
## 13. 2026-10-10 — Memoria técnica y reglas obligatorias FFDIGI

### Fecha
2026-10-10.

### Solicitud
Analizar el proyecto sin cambios funcionales; crear `CONTEXTO_FFDIGI.md` y `AGENTS.md` en la raíz del repositorio; mantener este archivo como cronología y actualizarlo solo para registrar el sistema de documentación. Alcance confirmado: únicamente `C:\Users\Jair Iván\Documents\FFDIGI FA BAT\pagina ffdg`.

### Objetivo
Que una sesión nueva pueda entender arquitectura, datos, fuentes de verdad, flujos, dependencias, riesgos y decisiones vigentes antes de modificar código.

### Estado anterior
Existía una bitácora acumulativa, pero no memoria técnica ni reglas locales obligatorias. El árbol ya tenía cambios de código/recursos locales sin commit; esos cambios se preservaron y no se tocaron.

### Análisis
- Se confirmó que esta carpeta es la raíz Git, en rama `develop`, con `ahead 3`.
- Se revisaron archivos, módulos, estilos, importadores, catálogos, persistencia, diagramas, modales, formularios y generación de impresión.
- Se comparó la bitácora con el código actual y se separaron hechos versionados, archivos ignorados y recursos sin seguimiento.
- Conteos observados: 113 registros MTF base + 175 adiciones = 288 antes del filtro; OBA se excluye y quedan 287. La semilla BAT contiene 25 casos. Los conteos describen el código observado, no una cifra permanente.
- Se comprobó que manuales/workbook fuente no forman parte del árbol; hay referencias derivadas y herramientas de importación local.
- Se identificaron discrepancias: módulos/PNG MTF locales sin seguimiento, fallback MTF que puede inventar Re-Test/Pass/Fail, copia `ffdg_bat.html` ignorada y sin dependencias disponibles.
- Se constató que el historial anterior afirmaba equivalencia de copias; el código actual demuestra que la copia ignorada no es la fuente versionada.

### Causa
La bitácora sola no daba suficiente contexto operativo ni prevenía modificaciones a ciegas; además, algunos estados históricos ya no describían exactamente el árbol actual.

### Solución
- Se creó `CONTEXTO_FFDIGI.md` como memoria técnica actual, con arquitectura, flujo BAT/MTF, fuentes de verdad, mapa de dependencias, funciones críticas, decisiones, comportamientos a conservar, problemas, deuda y pendientes.
- Se creó `AGENTS.md` con lectura previa obligatoria, reglas de análisis, protección BAT/MTF, validación y actualización documental.
- Se mantiene esta bitácora separada como cronología; no se cambió su registro previo para aparentar validaciones nuevas.

### Archivos modificados
- `AGENTS.md` — reglas obligatorias para tareas FFDIGI.
- `CONTEXTO_FFDIGI.md` — memoria técnica basada en el árbol observado.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada de documentación.

### Funciones o secciones afectadas
Solo documentación: reglas, arquitectura, dependencias, flujos de datos/UI, riesgos y decisiones. Ninguna función, selector, estilo ni dato de aplicación se modificó.

### Impacto
Las futuras sesiones deben leer los tres documentos antes de cualquier cambio; el contexto distingue `index.html` versionado de archivos locales ignorados/no rastreados. Los límites encontrados quedan visibles para prevenir despliegues incompletos o asociaciones/flowcharts inferidos.

### Validaciones realizadas
- Se volvió a comprobar rama/estado Git y que los módulos/recursos pendientes ya existían antes de escribir estos documentos.
- Se verificaron conteos de catálogos, archivos de imágenes, referencias de módulos y rutas locales señaladas en el contexto.
- Se comprobó el inventario del proyecto y los manuales/workbooks fuente no están incluidos en este árbol.
- Después de escribir: revisar conteo de archivos, encabezados, rutas citadas, `git diff --check` y estado Git.
- No se ejecutaron pruebas funcionales ni se modificó/levantó la aplicación; por tanto no se declara validación visual end-to-end.

### Resultado
Contexto y reglas creados dentro de esta raíz Git. Sin cambios funcionales, commit ni push.

### Pendientes
Completar validaciones visuales antes de futuras modificaciones de UI y resolver el seguimiento Git de recursos MTF antes de confiar en un checkout limpio.

### Riesgos
En el corte de la auditoría inicial, el estado local contenía recursos sin seguimiento y el renderer genérico MTF requería revisión. La entrada 14 registra la corrección de ese renderer; la distribución aún debe incluir los módulos y PNG locales correspondientes.

## 14. 2026-10-10 — Mostrar únicamente flowcharts MTF fuente

### Fecha
2026-10-10.

### Solicitud
Corregir los diagramas de fallas MTF para que correspondan a los flowcharts de `C:\Users\Jair Iván\Downloads\ffdg.pdf`; leer contexto e historial antes de actuar y registrar la intervención completa.

### Objetivo
Que las fallas MTF muestren el diagrama original aplicable del PDF y eliminar rutas inventadas; conservar BAT y el resto de su lógica.

### Estado anterior
`renderFlowchart` mostraba imágenes cuando estaban asociadas, pero si faltaban podía recurrir a un modelo vectorial o generar un SVG genérico con decisiones Re-Test y ramas Pass/Fail. Había adiciones MTF sin figura registrada, incluidas descripciones distintas que reutilizan códigos.

### Análisis
- Se leyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md` antes de editar; se confirmó que el alcance Git es únicamente esta carpeta `pagina ffdg`, rama `develop`, con tres commits locales adelantados y otros cambios locales preexistentes que se conservaron.
- Se revisaron `index.html`, `mtf-pdf-additions.js`, `mtf-pdf-flowcharts.js`, `mtf-pdf-reference-map.js`, recursos PNG y los registros sin imagen. Se verificó el PDF de 231 páginas con extracción de texto.
- Se contrastaron ejemplos: p. 57 (decisión Yes/No seguida por resultado Pass/Fail), pp. 154–155 (fallas distintas y diagramas distintos) y pp. 74–76 (inspección de conectores/sensores y validación). Las imágenes p. 76 (`mtf-flow-038.png`) y p. 154 (`mtf-flow-083.png`) son los recortes originales disponibles.
- Se identificó `PDF-MTF-CASE-0166` como un registro FTS de lectura AIN0 cuyo código y descripción corresponden al procedimiento de fuga de sensor de la p. 74 y al flowchart de la p. 76. Se excluyeron asociaciones solo por coincidencia de código, incluida la variante de SSD y otros procedimientos AIN0 sin ese mismo flowchart.
- Se revisaron los otros registros adición sin imagen y las cuatro entradas base sin imagen directa; no se asoció una figura cuando la página de su procedimiento no incluye un flowchart aplicable. AST-01 ya tenía una asociación específica a la p. 63 en el módulo de flowcharts.
- Inventario observado: 175 adiciones MTF; 20 sin imagen directa antes de esta corrección; 99 PNG flowchart presentes. Todas las rutas de imagen declaradas por mapa/adiciones se comprobaron contra archivos existentes.

### Causa
El renderer conservaba una plantilla histórica que infería rutas genéricas aun cuando no había una imagen PDF verificada. Además, una variante FTS de lectura AIN0 (case 0166) no heredaba la figura correcta de p. 76, aunque había otro registro de la misma fuente y código/descripción compatible.

### Solución
- Se eliminó el renderer MTF que fabricaba rombos Re-Test, Pass/Fail y rutas de sustitución. Sin imagen original directa o en una asociación verificada, se muestra un aviso de ausencia; no se dibuja un diagrama inferido. La imagen fuente se evalúa antes de comprobar si el catálogo trae pasos, para no ocultar una figura existente.
- Se añadió una asociación puntual para `PDF-MTF-CASE-0166`, reutilizando la imagen p. 76 solo si estación, código y texto AIN0 cumplen las condiciones del caso fuente p. 76.
- No se cambiaron imágenes BAT, `renderBatFlowchart`, procedimientos, catálogo general, API ni selección de pasos.
- Se actualizó el contexto para reflejar la política de imágenes fuente y el caso verificado.

### Archivos modificados
- `index.html` — `renderFlowchart`; retirada de SVG genérico y secuencia representada como diagrama.
- `mtf-pdf-flowcharts.js` — asociación condicionada para `PDF-MTF-CASE-0166` a p. 76.
- `CONTEXTO_FFDIGI.md` — fuente de verdad, renderer, problema corregido y pendiente de validación visual.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada cronológica.

### Funciones o secciones afectadas
- `renderFlowchart` muestra primero el `flowchartImage` original directo o la imagen que porta la asociación MTF, aunque falten pasos; para ausencia usa aviso textual accesible.
- `associatePage` registra p. 76 para case 0166 con validaciones de estación, código, página de origen y descripción AIN0.
- Solo cambia el panel de flowchart MTF; la navegación de diagnóstico continúa estática y no permite elegir ramas.

### Impacto
Fallas MTF con imagen fuente verificada mantienen el flujo y etiquetas exactamente como están en el PDF. Casos sin diagrama fuente dejan de presentar ramas potencialmente falsas. Se conservan los fallbacks de datos/pasos y todo BAT.

### Validaciones realizadas
- PDF: se verificaron páginas 57, 74–76, 110–111, 147, 154–155 y las páginas de casos sin imagen asociada que reutilizaban códigos. Se confirmó que p. 147 (FLB “failed device”) no tiene flowchart y no se confundió con CX8_PORT de p. 110–111.
- Recursos: se comprobaron 99 PNG existentes y que las rutas declaradas por mapas/adiciones apuntan a archivos presentes.
- Sintaxis: `node --check` para los módulos MTF; compilación sintáctica de los 8 scripts inline de `index.html`; `git diff --check` sin errores.
- Prueba estática del registro/render: se comprobó la asociación e imagen de p. 57 (AST-06), p. 63 (AST-01), p. 76 (case 0166), p. 154 (FLB-02) y p. 155 (case 0199); case 0167 no hereda la imagen. El render MTF no contiene ya `Re-Test`, flechas sintéticas ni `renderStepSequenceSvg` y muestra el aviso para ausencia de fuente.
- Se inspeccionaron visualmente los PNG fuente p. 57, 76, 154 y 155. La visita end-to-end a la página local no se pudo realizar: la política del navegador bloquea URLs `file:`. Quedan pendientes modal, restauración/importación Excel y responsive; no se declaran validados.

### Resultado
Los diagramas MTF no deben volver a inferirse desde los pasos. Los casos con imagen muestran la fuente; los casos sin fuente quedan identificados como tales. No se modificó ni sustituyó ningún flowchart BAT.

### Pendientes
- Probar visualmente las fallas de p. 57, p. 76, p. 154, p. 155 y ausencia de fuente; verificar catálogo restaurado/importado y modal.
- Resolver el seguimiento Git de módulos y recursos locales conforme a una decisión separada; no se hizo commit ni push.

### Riesgos
La fuente `ffdg.pdf` está fuera del repositorio y no puede acompañar un clon limpio. Módulos/PNG locales aún sin seguimiento deben incluirse en cualquier distribución; de otro modo el mapa y las imágenes no se cargarán.

## 15. 2026-10-10 — Pasos MTF revisados y prioridad de flowcharts fuente

### Fecha

2026-10-10.

### Solicitud

Completar correctamente los pasos de las fallas MTF según `ffdg.pdf` y usar el flowchart fuente correspondiente en vez de diagramas genéricos inferidos.

### Objetivo

Conservar el orden y las condiciones documentadas, asociar cada imagen por identidad de falla/página, y evitar que la navegación MTF reemplace un diagrama PDF con ramas sintéticas.

### Estado anterior

- Existían 55 overlays verificados sobre 113 registros base. FLA-07 y FLB-08 tenían sus pasos e imagen fuente disponibles.
- El primer render MTF priorizaba imágenes fuente, pero un observer M3 tardío (`drawFlow`) redibujaba sobre el mismo panel una plantilla con Re-Test, Pass/Fail, resultados y escalación genéricos al cambiar el paso. Por eso la imagen no se veía como fuente pese a estar asociada.
- Quedaban 58 de 113 registros base sin overlay PDF verificado. No se podían declarar completos sus pasos solo por similitud de código o descripción.

### Análisis y causa

- Se inspeccionaron `renderFlowchart`, `renderMtfPdfDecisionFlowchart`, el observer `watch("mtf-step", drawFlow)`, el mapa de asociaciones y los módulos de overlays. El observer tardío escribía directamente en `#mtf-flowchart-diagram` sin revisar `flowchartImage` y volvía a introducir la plantilla genérica histórica.
- La selección de FLB-08 muestra 9 pasos; su página fuente tiene un flowchart vertical con decisión sobre si el error sigue al SSD. FLA-07 presenta 5 pasos y un flowchart con retornos Pass/Fail directos, sin rombo Re-Test.
- No se usó código de error aislado para extender las asociaciones; los códigos pueden repetirse entre estaciones/casos.

### Solución

- Se renombró el callback antiguo como `drawFlowLegacy` y se dejó fuera de los observers. Se añadió advertencia para no reactivarlo accidentalmente.
- El `drawFlow` activo ahora respeta la imagen original asociada a la falla; como alternativa solo delega en un grafo vinculado al PDF; si no hay fuente verificable, presenta un mensaje en vez de inferir decisiones.
- Se conservaron los overlays ya asociados: FLA-07 (pp. 23–24; 5 pasos e imagen del flowchart) y FLB-08 (pp. 149–151; 9 pasos e imagen del flowchart p. 151). No se modificó BAT, API, datos de selección ni rutas de decisión interactivas.
- Se actualizó `CONTEXTO_FFDIGI.md` con la causa del observer tardío, la nueva prioridad y el estado pendiente de los 58 registros restantes.

### Archivos modificados

- `index.html` — el callback MTF activo ya no reconstruye diagramas genéricos; respeta imágenes y modelos PDF asociados.
- `CONTEXTO_FFDIGI.md` — arquitectura, regla de render y evidencia visual actualizadas.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada.
- `mtf-pdf-procedure-overrides.js` — conserva los 55 overlays anteriores, incluida la asociación explícita FLA-07; en esta iteración no se amplió el número de overrides.

### Funciones o secciones afectadas

- `drawFlow` — prioridad `flowchartImage`, después grafo MTF asociado y aviso de ausencia.
- `drawFlowLegacy` — función histórica no llamada; contiene la antigua plantilla genérica y queda expresamente marcada como no reactivable.
- `renderFlowchart` y observer del diálogo — el modal sigue clonando la superficie de diagrama generada por el render fuente.
- Catálogo base MTF: 113 fallas; 55 identidades con overlay inequívoco en esta auditoría, otras 58 pendientes de transcripción/confirmación completa.

### Impacto

Al cambiar de paso, el observer deja de tapar el flowchart fuente. Los casos sin imagen o asociación verificada ya no presentan la plantilla de decisiones genéricas. La secuencia textual de pasos y el resto de los módulos permanecen separados.

### Validaciones realizadas

- Navegador local: FLB-08 muestra 9 pasos y la imagen original vertical de su flowchart, incluyendo la decisión “failure moves with SSD”; FLA-07 muestra 5 pasos y el flowchart original con sus conexiones directas.
- Navegador local: se abrió el modal de ampliación de FLA-07 y se verificó el título y la imagen fuente dentro del diálogo.
- Sintaxis: `node --check` para módulos MTF afectados; los 7 scripts inline no modulares de `index.html` compilaron mediante `vm.Script`.
- Auditoría de overlays: 55 asociaciones hacen coincidencia única contra los 113 registros base; 0 imágenes declaradas faltantes.
- `git diff --check` sin errores.
- No se probó el catálogo importado/restaurado, móvil/tableta ni los 58 casos restantes en esta iteración. No se declara completa la revisión de procedimientos de todas las fallas.

### Resultado

Corregida la causa por la que la imagen de PDF era reemplazada por el diagrama genérico para FLB-08 y FLA-07. Los diagramas verificados permanecen estáticos y fieles al PDF; no se presentan decisiones inventadas en la superficie activa.

### Pendientes

- Auditar, transcribir y asociar las 58 fallas base que no tienen overlay verificado. Debe hacerse por estación, código, descripción y página; no por coincidencia de código aislada.
- Revisar las variantes y los casos que no tienen figura en PDF para distinguir “sin flowchart fuente” de un faltante de extracción.
- Validar importación/restauración del catálogo y probar tamaños móvil/tableta/escritorio.
- Resolver el seguimiento Git de módulos/recursos no rastreados en una solicitud separada; no se hizo commit ni push.

### Riesgos

- `drawFlowLegacy` permanece definido pero no se invoca; un cambio posterior en su observer podría reintroducir decisiones genéricas si ignora esta regla.
- El avance cubre 55 de 113 registros base de manera inequívoca; los pasos de los demás no están certificados y podrían permanecer incompletos o diferir del PDF.
- La fuente PDF está fuera de la raíz Git y los recursos nuevos están sin seguimiento al corte; un clon limpio podría no incluirlos.

## 16. Mosaicos MTF filtrados, centrado y apertura del detalle

### Fecha

2026-10-10.

### Solicitud

Al buscar una falla, mostrar las fallas similares agrupadas por estación y centradas en el tablero. Al elegir una, ocultar los mosaicos y presentar su ficha completa, con transición visual. BAT queda fuera del cambio.

### Objetivo

Pasar de resultados MTF agrupados por estación a una sola ficha seleccionada, sin dejar el tablero visible detrás o junto al detalle.

### Estado anterior

- La búsqueda agrupaba coincidencias (por ejemplo FLB/FLC/FCT), pero las columnas del tablero quedaban pegadas a la izquierda.
- El click del tablero se reenviaba a una tarjeta de lista oculta. La selección podía marcarse, pero la apertura y el colapso del catálogo no quedaban garantizados en ese recorrido.
- La vista de selección y el panel de detalle compartían el layout y el estado `mtf-detail-open`.

### Análisis y causa

- Se revisaron el render de `#mtf-fault-list`, el tablero construido por M3, el listener de búsqueda, `setMtfCatalogCollapsed` y las reglas responsive/transición existentes.
- El tablero usaba `c.click()` sobre un nodo oculto como puente. Se sustituyó por una función compartida que recibe el registro seleccionado.
- El tablero usaba grid con cinco columnas. Las búsquedas parciales ocupaban columnas iniciales sin centrar los grupos restantes.

### Solución

- Se centralizó selección MTF en `selectMtfFault(failure)`: actualiza la falla/paso, abre el detalle y colapsa el catálogo en mosaico/tablero; conserva lista técnica cuando esa vista está elegida.
- Tarjeta normal y tablero llaman a la misma función; cada tarjeta conserva una referencia al registro.
- El tablero filtrado usa flex-wrap, centrado y ancho máximo por estación, con ajuste para pantallas estrechas.
- Al buscar o pulsar «Cambiar falla», se cierra el detalle y regresan los resultados filtrados. BAT permanece intacto.

### Archivos modificados

- `index.html` — selección MTF compartida, enlace del tablero al registro y estilos de centrado/responsive.
- `CONTEXTO_FFDIGI.md` — ciclo búsqueda → mosaicos → ficha y mapa de responsabilidades.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada.

### Funciones o secciones afectadas

- `selectMtfFault` — coordina estado, visibilidad, render y enfoque del detalle.
- `renderMtfList` — asocia cada tarjeta al registro.
- `buildBoard` — agrupa por estación, reconstruye botones y activa la clase de centrado.
- Listener `mtf-search` y `mtf-selection-toggle` — regresan a los resultados filtrados.
- CSS `mtf-selection-results-layout` — distribución flexible centrada y ancho máximo por estación.

### Impacto

Solo selección y presentación del catálogo MTF de `index.html`. No cambia datos, procedimientos, imágenes, API, flowcharts ni BAT.

### Validaciones realizadas

- Navegador local HTTP: una búsqueda de descripción compartida mostró tres coincidencias FLB/FLC/FCT centradas.
- Al seleccionar FLB-08, el tablero desapareció y la ficha mostró Failure Record, nueve pasos, referencia de imagen y flowchart; el botón «Cambiar falla» quedó disponible.
- Las transiciones respetan la regla CSS existente `prefers-reduced-motion: no-preference`.
- `git diff --check` y compilación sintáctica de scripts inline ejecutados después de editar. Revisión visual en escritorio; no se hizo matriz de dispositivos físicos móvil/tableta.

### Resultado

Las coincidencias se muestran centradas; seleccionar un caso abre su detalle sin mosaicos. «Cambiar falla» restaura el catálogo MTF filtrado. BAT intacto.

### Pendientes

- Probar «Cambiar falla», volver a buscar con el detalle abierto y seleccionar desde Mosaico/Lista técnica.
- Revisar viewports móvil/tableta. No hubo cambios Git ni publicación.

### Riesgos

- `buildBoard` depende del observer existente sobre cambios de hijos del catálogo para reconstruirse después de filtrar.
- `index.html` conserva estilos inline tardíos superpuestos; no se hizo refactor fuera de alcance.

## 17. 2026-10-10 — Vista completa del detalle MTF y modal de topología

### Fecha

2026-10-10.

### Solicitud

Al seleccionar una falla MTF desde los mosaicos, mostrar las tres tarjetas del detalle desde el inicio sin desplazar la página; abrir GB300 System Topology directamente en modal; separar visualmente los pasos de la etiqueta de validación.

### Objetivo

Evitar que la ficha aparezca fuera de vista o requiera scroll vertical de página en escritorio, prevenir que la topología expanda la tarjeta y mejorar la lectura del encabezado de validación.

### Estado anterior

- `scrollMtfDetailIntoView()` desplazaba la ficha seleccionada hacia su inicio; con el encabezado de aplicación fuera del viewport, el usuario veía solo la parte inferior de la página.
- La topología se encontraba dentro de un acordeón con una vista previa; el botón de ampliación estaba dentro de esa tarjeta y no lanzaba el modal al primer acceso.
- El stepper de pasos y la etiqueta de validación estaban visualmente muy juntos.

### Análisis y causa

- Se revisaron los documentos obligatorios, el estado Git y los consumidores de selección MTF, eventos de búsqueda/regreso, estilos responsive y listener/modal de topología.
- El HTML ya contiene un `<dialog>` de topología con imagen dimensionada; el desbordamiento ocurría porque el resumen permitía expandir una vista previa dentro de la tarjeta.
- La ficha MTF ya tenía layout de pantalla completa parcial, pero no se activaba al seleccionar desde mosaico/tablero y el scroll automático apuntaba al detalle en vez del inicio.

### Solución

- La selección desde mosaico/tablero activa una clase visual exclusiva de detalle MTF en escritorio, sube la página al inicio y limita el área de las tres tarjetas al viewport; el contenido largo puede desplazarse dentro de su propia tarjeta.
- Buscar otra falla o volver al catálogo limpia dicha clase. La vista de lista técnica conserva su comportamiento previo; hasta 1080 px se mantiene el diseño apilado responsive.
- Se reemplazó el acordeón/vista previa de topología por un botón de lanzamiento visible que abre el `<dialog>` existente; la imagen no se expande dentro de la tarjeta.
- Se aumentó el espacio entre stepper y validación y entre sus etiquetas; textos y pasos no cambian.
- No se tocaron BAT, datos, flowcharts ni APIs.

### Archivos modificados

- `index.html` — selección/scroll MTF, launcher de topología y estilos de viewport, modal y espaciado.
- `CONTEXTO_FFDIGI.md` — comportamiento vigente del detalle y la topología.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada.

### Funciones o secciones afectadas

- `selectMtfFault` y `scrollMtfDetailIntoView` — apertura y posicionamiento de la ficha.
- Eventos `mtf-search` y `mtf-selection-toggle` — limpieza del modo de detalle al regresar.
- `#mtf-topology-open` — activa el listener existente del diálogo.
- CSS de `#mtf-layout.mtf-detail-viewport`, stepper y launcher topológico.

### Impacto

Solo presentación/navegación de detalle MTF en `index.html`. Los paneles del detalle permanecen visibles simultáneamente en escritorio, con scroll local si una sección supera su altura disponible. En móvil/tableta no se fuerza una composición de tres columnas ni se bloquea el scroll natural.

### Validaciones realizadas

- Inspección estática de los selectores, markup modal y listeners existentes; el id del botón se conserva para reutilizar el diálogo.
- `node --check` pasó para los cuatro módulos MTF locales; los siete scripts clásicos inline de `index.html` compilaron con `vm.Script`.
- `git diff --check` terminó sin errores.
- Pendiente ejecutar prueba visual de selección, cierre modal y responsive: el navegador integrado bloquea la URL local `file://` y no se inició un servidor alterno.

### Resultado

La selección de mosaico/tablero está configurada para abrir el detalle desde arriba en el viewport; GB300 System Topology ya no se despliega en línea y su acceso abre el modal existente. Validación sintáctica y de diff correcta; no se declara validación visual end-to-end.

### Pendientes

- Confirmar visualmente en escritorio que las tres tarjetas caben, y que el contenido extenso se desplaza dentro de su panel.
- Comprobar el modal, teclado y tamaños móvil/tableta/escritorio en un entorno permitido.

### Riesgos

- La altura disponible depende del encabezado real del navegador y de la resolución; CSS reserva 260 px y las tarjetas tienen scroll propio en escritorio.
- Compatibilidad del anclaje del viewport depende de `:has()`/`100dvh`, selectores que ya se utilizan en el HTML, pero requiere comprobación visual en navegadores objetivo.

## 18. 2026-10-10 — Flowchart MTF fuente a 400 ppp con lupa modal

### Fecha

2026-10-10.

### Solicitud

Exportar las imágenes de flowchart a 400 ppp cuando exista resolución suficiente y habilitar lupa para ver el diagrama con detalle dentro del modal MTF.

### Objetivo

Mejorar legibilidad del flowchart de FLB-08 en el modal sin reemplazar ni degradar la imagen original.

### Estado anterior

- El registro que usa el flowchart MTF de la p. 151 mostraba `mtf-flow-081.png` (1036×1307 px, metadatos de 96 ppp) tanto en tarjeta como en el modal; el modal ajustaba el diagrama al ancho disponible sin opción de zoom.
- El diálogo y el click del diagrama ya existían; BAT comparte el diálogo, por lo que el control nuevo debía limitarse a casos MTF con alternativa de alta resolución.

### Análisis y causa

- Se leyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md`; se revisaron los renderers MTF, observer de pasos, asociaciones de `mtf-flow-081.png` y listeners del modal.
- Se verificó que el flowchart pertenece a la p. 151 del PDF. El PNG existente no tenía densidad suficiente para afirmar 400 ppp; cambiar solo sus metadatos no aportaría detalle.
- Se renderizó la p. 151 desde el PDF a 400 ppp y se inspeccionó el recorte para conservar todos los nodos, etiquetas y ramales.

### Solución

- Se creó una alternativa separada de 2835×3580 px, con metadatos de 399.9992 ppp (redondeo de Poppler) y se conservó sin cambios el PNG original.
- `mtf-pdf-reference-map.js` registra la alternativa de alta resolución por nombre del recurso base; el modal cambia a dicha imagen al abrir para los diagramas asociados.
- El diálogo MTF habilita «Lupa · 400 ppp» solo si el registro dispone de esa imagen; alterna entre ajuste y 200% con desplazamiento interno. BAT no muestra ni recibe el nuevo control.
- No se alteraron las asociaciones, procedimientos, diagramas BAT ni decisiones del flowchart.

### Archivos modificados

- `index.html` — botón accesible del modal, activación de imagen de alta resolución y zoom 200%.
- `mtf-pdf-reference-map.js` — asociación del recurso alternativo 400 ppp.
- `assets/mtf-flowcharts/mtf-flow-081-400dpi.png` — derivado rasterizado de la p. 151.
- `CONTEXTO_FFDIGI.md` — regla vigente para alternativas de alta resolución.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada.

### Funciones o secciones afectadas

- `renderFlowchart` y `drawFlow` — registran la alternativa hi-res en la superficie SVG sin cambiar el preview original.
- `openDiagram` — usa el recurso de 400 ppp en el modal y expone la lupa solo para esa fuente.
- Listener `mtf-flowchart-zoom` — alterna tamaño 100%/200% y restablece el scroll.

### Impacto

Mejora el modal MTF para los flowcharts que tengan alternativa hi-res registrada. Actualmente se registra el recurso de la p. 151, compartido por las fallas que apuntan a `mtf-flow-081.png`. Los demás conservan su resolución anterior y no anuncian una lupa de 400 ppp. BAT conserva su diálogo y diagrama.

### Validaciones realizadas

- PDF original: render p. 151 con Poppler a 400 ppp; comprobado tamaño 3400×4400 px y metadato 399.9992 ppp.
- Recurso final: recorte visual inspeccionado, 2835×3580 px, metadato 399.9992 ppp, tamaño aproximado 300 KB; nodos/ramales visibles y PNG anterior preservado.
- Pendiente la prueba interactiva del modal/lupa en navegador: el navegador integrado bloquea `file://`; no se inició un servidor alterno.
- `node --check` pasó para los cinco módulos MTF; los siete scripts clásicos inline compilaron con `vm.Script`; `git diff --check` terminó limpio.

### Resultado

La imagen original sigue sirviendo de preview. Los flowcharts asociados a la fuente de la p. 151 pueden abrir en el modal con una alternativa de 400 ppp y control de lupa. No se declara prueba visual end-to-end del diálogo.

### Pendientes

- Comprobar el modal y lupa en navegador, incluida navegación por teclado y tamaños móvil/escritorio.
- Exportar otras páginas solo cuando exista una correspondencia inequívoca y se necesite mayor detalle; no se cambiaron recursos adicionales.

### Riesgos

- Los PNG de otros flowcharts siguen sin conversión a 400 ppp; la lupa se oculta si no tienen alternativa registrada.
- El zoom al 200% requiere desplazamiento dentro del modal para recorrer imágenes altas.

## 19. 2026-10-10 — Exportar todas las imágenes fuente de flowchart MTF a 400 ppp

### Fecha

2026-10-10.

### Solicitud

Extender la exportación a 400 ppp y la lupa a todas las imágenes de diagramas MTF.

### Objetivo

Que cada flowchart de imagen existente y asociado por el catálogo abra con detalle en el mismo modal, sin alterar diagramas ni asociaciones.

### Estado anterior

- Había una alternativa 400 ppp solo para `mtf-flow-081.png`, fuente de la p. 151; los demás PNG fuente conservaban su resolución previa y no ofrecían lupa.
- El modal ya alternaba a 200% cuando encontraba una alternativa hi-res.

### Análisis y causa

- Se leyeron las reglas, contexto e historial completos; se revisaron los mapas de imágenes, source pages, MTF additions y overrides.
- El catálogo y sus additions contienen 98 nombres únicos de imagen flowchart con página fuente asociada; además, el módulo vectorial registra AST-01 en la p. 63 con `mtf-flow-109.png`. Algunas imágenes se comparten entre fallas y no deben duplicarse ni reasignarse.
- Cada imagen PNG original se usó como plantilla de coincidencia contra el render de su página PDF a 150 ppp para ubicar el recorte. No se tomó ningún número de página por inferencia.

### Solución

- Se generaron 99 PNG alternativos: 98 imágenes únicas del catálogo/additions y el recurso legacy AST-01 de la p. 63; todos renderizados desde sus páginas fuente a 400 ppp. Los PNG originales se conservan.
- La coincidencia plantilla-página tuvo puntuación mínima 0.747 para las 98 imágenes catalogadas y 0.781 para AST-01; no hubo páginas ni recortes sin correspondencia. Hojas de contacto y el recorte AST-01 fueron revisados visualmente.
- `mtf-pdf-reference-map.js` registra el mapa hi-res de recursos del catálogo y AST-01; los renderers MTF adjuntan el alternativo al SVG y el modal muestra lupa solo para fuentes registradas.
- Las fallas que comparten PNG conservan el mismo hi-res; diagramas BAT, datos, pasos y asociaciones no cambiaron.

### Archivos modificados

- `assets/mtf-flowcharts/*-400dpi.png` — 99 exportaciones MTF desde las páginas fuente correspondientes.
- `mtf-pdf-reference-map.js` y `mtf-pdf-flowcharts.js` — registro de AST-01, mapa hi-res y atributos para lupa en el renderer de graphs.
- `CONTEXTO_FFDIGI.md` — alcance hi-res vigente, 99 fuentes registradas.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada.

### Funciones o secciones afectadas

- Registro `FFDG_MTF_PDF_FLOWCHART_ZOOM_IMAGES` — asocia recursos 400 ppp a cada nombre de archivo fuente catalogado y a AST-01.
- `renderFlowchart` / `drawFlow`, `renderMtfPdfVectorFlowchart` y `openDiagram` — agregan la alternativa hi-res para imágenes fuente MTF, incluida AST-01.

### Impacto

Los 99 diagramas MTF asociados a PNG fuente pueden abrirse con alternativa 400 ppp y lupa 200%. Archivos base de menor resolución siguen siendo preview en la tarjeta. Casos sin imagen fuente inequívoca continúan sin diagrama.

### Validaciones realizadas

- PDF: 98 páginas fuente únicas del catálogo/additions más p. 63 de AST-01; 98 páginas se renderizaron a 150 ppp y p. 63 a 200 ppp para ubicar recortes. Las 99 páginas se renderizaron a 400 ppp para los assets finales.
- Búsqueda de imagen contra página: 99/99 coincidencias aceptadas; mínimo 0.747 en catálogo, 0.781 en AST-01; sin fallos.
- Inspección visual: cinco hojas de contacto más el recorte AST-01 revisados para comprobar que los flowcharts no quedaran vacíos ni truncados.
- `node --check` pasó para los cinco módulos MTF; los siete scripts clásicos inline compilaron con `vm.Script`.
- Se verificaron 99/99 assets presentes, metadatos 399.9992 ppp y dimensiones superiores a 2500 px de ancho; total adicional aproximado 16.5 MB.
- `git diff --check` terminó limpio.
- No se declara interacción visual end-to-end: la política del navegador bloquea `file://`.

### Resultado

Generadas las 99 alternativas source-backed de 400 ppp y ampliado el mapa de lupa a todo el conjunto, incluida AST-01. No se sobrescribió ningún PNG fuente.

### Pendientes

- Comprobar el diálogo/lupa en un navegador permitido.

### Riesgos

- Las exportaciones hi-res ocupan aproximadamente 16.5 MB adicionales; conservarlas junto con las imágenes fuente para que la lupa funcione.

## 20. 2026-10-10 — Restaurar scroll vertical en detalle MTF

### Solicitud

Corregir el scroll bloqueado al seleccionar una falla MTF desde el tablero y permitir recorrer la ficha completa.

### Análisis y causa

- El modo de detalle de escritorio activaba `overflow: hidden` en `html` y `body`.
- También fijaba la altura de la fila de detalle al viewport y daba scroll interno a las tarjetas; los flowcharts altos podían quedar fuera del área visible mientras el scroll principal estaba desactivado.

### Solución

- Se reactivó el scroll vertical de página durante el detalle.
- La fila y las tres tarjetas ahora crecen con el contenido; se mantiene la distribución horizontal de tres paneles en escritorio y el desplazamiento inicial al abrir la falla.
- BAT, datos, procedimientos, diagramas e imágenes no se modificaron.

### Archivos modificados

- `index.html` — CSS `#mtf-selection-results-layout` para overflow, altura natural y paneles MTF.
- `CONTEXTO_FFDIGI.md` — comportamiento actual de scroll en detalle.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Validación y resultado

- Se revisaron los selectores que activan el modo de detalle y los estilos previos de fila, cuadrícula y tarjetas.
- `git diff --check` terminó limpio; los siete scripts clásicos inline y los cuatro módulos MTF pasaron comprobación de sintaxis.
- La prueba visual sigue limitada por el navegador, que bloquea la URL local `file://`; no se declara validación interactiva completada.

### Pendientes y riesgos

- Confirmar visualmente en el navegador que la página desplaza el detalle completo y que las imágenes grandes conservan su ampliación modal.
- El alto natural de una falla con muchos pasos/diagramas puede requerir más scroll de página; ahora es accesible en lugar de quedar recortado.

## 21. 2026-10-10 — Lista técnica a ancho completo y ficha MTF ajustada al viewport

### Fecha

2026-10-10.

### Solicitud

En Lista técnica, mostrar las fallas como lista amplia a todo el ancho; al elegir una, ocultar la lista y presentar la ficha MTF completa con sus tres paneles y botones de navegación/diagrama visibles. Aplicar la selección de ficha también desde Mosaico y Tablero.

### Objetivo

Quitar la vista estrecha de maestro/detalle y reducir el scroll de página necesario para ver el encabezado de las secciones, el flowchart y sus controles en escritorio.

### Estado anterior

- Lista técnica usaba una cuadrícula de dos columnas; las fallas ocupaban solo el panel izquierdo y la ficha permanecía al lado al seleccionar.
- Esa ruta no activaba `mtf-detail-viewport`, por lo que no recibía el ajuste de ficha aplicado a Mosaico/Tablero.
- Las reglas heredadas de `.mtf-split` limitaban la altura de lista y ficha y podían bloquear el scroll de página en escritorio.

### Análisis y causa

- Se leyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md`, `HISTORIAL_CAMBIOS_FFDIGI.md` y las instrucciones operativas indicadas por el usuario antes de modificar.
- Se siguieron las clases `mtf-split`, `mtf-detail-open`, `mtf-selection-collapsed` y `mtf-detail-viewport` desde el toggle de vistas, `selectMtfFault`, el botón Cambiar falla y las reglas responsive.
- La excepción `keepTechnicalListVisible` preservaba el catálogo solo para Lista técnica y evitaba activar el modo de detalle; las reglas antiguas de `.mtf-split` seguían controlando la altura y el overflow.

### Solución

- La Lista técnica sin detalle usa una sola columna; las filas de falla ocupan el ancho disponible y la lista crece con sus resultados.
- Seleccionar una falla en cualquiera de las vistas activa el mismo colapso del catálogo y la misma ficha; Cambiar falla conserva la vista seleccionada y restaura la lista.
- En escritorio, los tres paneles se ajustan al espacio vertical: títulos y controles permanecen visibles, el flowchart se escala dentro de su panel y el contenido de pasos largos conserva scroll interno.
- Se mantiene habilitado el scroll general como respaldo en ventanas bajas; hasta 1080 px sigue vigente el diseño apilado.
- BAT, datos, pasos del PDF, imágenes, API y diagramas no se modificaron.

### Archivos modificados

- `index.html` — `selectMtfFault` y CSS `mtf-selection-results-layout` para lista, colapso y ajuste de ficha.
- `CONTEXTO_FFDIGI.md` — comportamiento actual de selección y layouts MTF.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada.

### Funciones o secciones afectadas

- `selectMtfFault` — activa el estado de detalle y colapsa la lista para todas las vistas.
- `setMtfCatalogCollapsed` y `mtf-selection-toggle` — mantienen el retorno al catálogo y el foco.
- CSS `mtf-selection-results-layout` — ancho completo de la lista y distribución/alto de los tres paneles de detalle.

### Impacto

Solo navegación y presentación del catálogo MTF en `index.html`; no cambia los datos ni los procedimientos. BAT permanece intacto. En pantallas pequeñas, la ficha se apila y puede requerir scroll de página.

### Validaciones realizadas

- Revisión estática de clases, selectores, listeners y ruta de foco/cambio de vista; confirmado que el diálogo del flowchart mantiene sus IDs y handlers.
- Los siete scripts clásicos inline y seis archivos JavaScript locales pasaron comprobación de sintaxis; `git diff --check` terminó limpio.
- La hoja CSS afectada tiene llaves balanceadas y los selectores esperados. No había un parser CSS instalado en el entorno.
- La herramienta del navegador rechazó la ruta `file://` por política; no se intentó eludir esa restricción. No se declara validación visual interactiva.

### Resultado

Implementación local aplicada; no se hizo commit ni push. La lista queda definida a ancho completo, selección común oculta el catálogo y el detalle de escritorio reserva su alto para encabezados, diagrama y controles con scroll interno localizado.

### Pendientes y riesgos

- Revisar visualmente Lista técnica, Mosaico y Tablero con fallas cortas/largas en escritorio, tableta y móvil desde un navegador que permita la página.
- La proporción de flowcharts puede hacerlos pequeños en el panel de escritorio; la lupa/modal de 400 ppp sigue disponible para lectura detallada.
- Si el viewport es más bajo que el mínimo del detalle, se permite scroll de página en vez de bloquearlo.

## 22. 2026-10-10 — Zoom progresivo, flowchart contenido y botón verde

### Fecha

2026-10-10.

### Solicitud

Corregir el zoom del modal para que sea progresivo y no desplace el diagrama lateralmente; reducir/contener flowcharts largos para conservar botones y elementos del detalle MTF; cambiar «Cambiar falla» de negro a verde como los encabezados del registro.

### Objetivo

Mantener la imagen fuente de alta resolución legible mediante un zoom centrado y conservar los controles de la ficha a la vista aunque una falla tenga un flowchart vertical grande.

### Estado anterior

- La lupa cambiaba el ancho del SVG a `200%`, expandía la caja modal y podía dejar el diagrama visible solo en el lado derecho con scroll horizontal.
- El modal no reservaba explícitamente una altura al contenido; el SVG conservaba estilos inline del preview.
- Algunos previews heredaban un alto máximo grande y podían ocupar el espacio vertical de los botones.
- «Cambiar falla» usaba fondo negro aunque los bloques de detalle llevan verde primario.

### Análisis y causa

- Se revisaron `openDiagram`, el listener del botón de lupa, los SVG fuente con viewBox y sus imágenes 400 ppp, estilos del modal y reglas de detalle responsive.
- La causa lateral era la regla CSS que duplicaba el ancho del SVG sin recentrar su viewBox; además, la tarjeta no imponía un límite efectivo de alto al SVG fuente.
- Las variables `--md-sys-color-primary` y `--md-sys-color-on-primary` son los colores de fondo/texto usados por los encabezados y adaptan el contraste al tema.

### Solución

- El modal reserva un viewport fijo responsive, ajusta el SVG/imagen a ese espacio y lo centra; la caja mantiene overflow horizontal oculto.
- La rueda sobre el diagrama ajusta el zoom de manera progresiva; el botón avanza por incrementos y reinicia al máximo. El tamaño de la zona vertical acompaña la escala para recorrer un diagrama ampliado, sin desplazamiento lateral. Sigue usando la alternativa MTF 400 ppp registrada.
- El preview MTF queda limitado al espacio disponible en escritorio y a un máximo responsive en móvil/tableta; el flowchart no invade la fila de botones.
- «Cambiar falla» usa el token verde primario y su color de texto accesible en ambos temas.
- No se cambió la imagen fuente, asociación, flowchart BAT, pasos ni catálogo.

### Archivos modificados

- `index.html` — modal y escala del flowchart, CSS del panel de disposición y estilos del botón MTF.
- `CONTEXTO_FFDIGI.md` — comportamiento vigente de zoom y tamaño de previews.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — esta entrada.

### Funciones o secciones afectadas

- `openDiagram` — crea un stage modal centrado y usa el raster de alta resolución cuando existe.
- `fitDiagramToModal` / `setZoomScale` — ajustan tamaño base y niveles de zoom.
- Listener de rueda y botón de lupa — zoom progresivo entre 100% y 300%.
- CSS `.flowchart-modal-content`, `.flowchart-modal-stage` y `#mtf-flowchart-diagram` — contención, centrado y reserva para controles.
- CSS `#mtf-selection-toggle` — fondo y texto verde dinámicos por tema.

### Impacto

Solo presentación del flowchart y selector de falla MTF; el modal compartido sigue habilitado para diagramas existentes. No se cambian datos, API, procedimientos ni los diagramas BAT.

### Validaciones realizadas

- Los siete scripts clásicos inline y seis archivos JavaScript locales pasaron comprobación de sintaxis.
- La hoja CSS de layout afectada tiene llaves balanceadas; `git diff --check` terminó limpio.
- Se verificó visualmente el PNG local `mtf-flow-083.png` asociado a FLB-02: la imagen fuente completa está íntegra y centrada; la captura del navegador muestra que el problema aparece al ampliar el SVG al 200%.
- No se ejecutó una prueba interactiva del modal: el navegador bloquea la ruta `file://` y no se usó otra vía.

### Resultado

La lupa queda preparada para zoom progresivo centrado usando los recursos hi-res existentes; el layout limita el preview para dejar accesibles los botones. El botón Cambiar falla usa el verde primario. No se declara la interacción visual comprobada en navegador.

### Pendientes y riesgos

- Confirmar modal, zoom con rueda y botón, FLB-02 y una falla con flowchart ancho en escritorio/tableta/móvil cuando la página pueda probarse en navegador permitido.
- Un zoom alto en diagramas apaisados puede recortar sus bordes horizontalmente por diseño para evitar el paneo lateral; el zoom puede bajarse con la rueda.

## 23. 2026-10-10 — Contención final de flowcharts MTF y registro de nueva falla BAT pendiente

### Fecha

2026-10-10.

### Solicitud

Reducir/contener los diagramas MTF que se salen del detalle para que el flujo completo y los botones Anterior, Paso siguiente y Ampliar diagrama queden visibles; asegurar que seleccionar desde Lista técnica abra la ficha. Añadir en BAT una falla de LEDs apagados del panel IO central con pasos definidos por el usuario.

### Objetivo

Corregir la cascada de estilos del detalle MTF sin modificar diagramas fuente; no incorporar al catálogo BAT un identificador o texto ambiguo como si estuviera confirmado.

### Estado anterior

- La selección MTF usa `selectMtfFault` desde las tarjetas, Lista técnica y el tablero; colapsa el catálogo y muestra `#mtf-detail`.
- Reglas posteriores del modo Lista técnica podían restablecer altura natural en el panel de detalle, y el layout flexible del tercer panel no reservaba de forma inequívoca el espacio de navegación frente a SVG altos.
- El catálogo BAT modela fallas con código y etiqueta; la solicitud nueva no especifica un código NDBG. La voz/transcripción dice “ASIC cycle”, aunque los datos vigentes usan “AC Cycle/AC cycle”.

### Análisis

- Se releen `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md` antes de intervenir; se comprueban estado Git, markup de los tres paneles, selección común MTF, renderizador de imágenes fuente y reglas CSS finales.
- Se confirma que el bloque de selección comparte la función `selectMtfFault`; Lista técnica no tiene una ruta de render distinta. El síntoma de ficha incompleta coincide con la colisión de alturas y el crecimiento intrínseco del flowchart.
- No se presume el código de la nueva falla ni se sustituye “ASIC cycle” por “AC cycle”. Los pasos técnicos de tarjeta/cables indicados por el usuario quedan pendientes de integrar con el código y la denominación de ciclo confirmados.

### Causa

La cascada MTF contenía reglas incompatibles entre el tamaño automático de la fila de detalle y las reglas del modo viewport; además el tercer panel no fijaba su distribución como encabezado/contenido/controles en todas las vistas de escritorio. Un SVG alto podía consumir el espacio disponible y empujar los botones.

### Solución

- Se añade al final de la cascada una regla exclusiva del detalle MTF de escritorio: limita la altura del panel según viewport, mantiene el scroll vertical general como respaldo, fuerza tres columnas y reserva filas para encabezado, diagrama y controles.
- El contenido Disposition usa filas con mínimo cero; el SVG de la imagen fuente se ajusta al rectángulo disponible y se centra sin alterar nodos, imagen, página, pasos o asociación.
- El preview del MTF usa `xMidYMid meet` para centrar la imagen fuente vertical dentro del viewport.
- Se conserva el comportamiento apilado existente hasta 1080 px.
- No se modifica BAT: queda pendiente añadir la falla hasta recibir el código NDBG y aclarar “ASIC cycle” vs “AC cycle”.

### Archivos modificados

- `index.html` — regla CSS final del detalle MTF y `preserveAspectRatio` en `renderFlowchart`.
- `CONTEXTO_FFDIGI.md` — altura/contención actual del detalle MTF y pendiente BAT confirmado.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `renderFlowchart` — centra la imagen source-backed en su caja; no cambia el recurso ni su asociación.
- CSS final `mtf-detail-open` — fija el panel de disposición y reserva la navegación; limita SVG y scroll interno de pasos.
- `selectMtfFault`/Lista técnica — inspeccionados y conservados; todas las tarjetas pasan por el mismo selector existente.

### Impacto

Presentación del detalle MTF en escritorio, independientemente de si se llega desde Lista técnica, Mosaico o Tablero. En móvil/tableta permanece el apilado y scroll natural. No se modifica ningún dato, diagrama BAT, paso de diagnóstico, modal o API. La nueva falla BAT todavía no aparece en el catálogo.

### Validaciones realizadas

- Revisión de markup: `#mtf-flowchart-diagram` y la fila `.mtf-detail-controls-right` son hijos separados de `#mtf-disposition-content`; el grid reserva la fila de controles.
- Confirmado en código que cada tarjeta técnica escucha click/teclado y llama `selectMtfFault`, igual que el resto de vistas.
- `node --check` pasó en los cinco módulos JavaScript locales; los siete scripts clásicos inline compilaron con `vm.Script`; los cuatro bloques CSS quedaron balanceados; `git diff --check` terminó limpio.
- No se realizó prueba visual: la sesión actual usa una URL local `file://`, bloqueada por la política del navegador; no se abrió por otra vía.

### Resultado

El cambio MTF está implementado localmente; selección técnica sigue conectada al detalle común y el CSS ahora contiene las imágenes altas para reservar la navegación. Validación estática aprobada; no se afirma validación visual ni se agregó la falla BAT incompleta.

### Pendientes

- Ejecutar verificaciones estáticas y corregir cualquier error detectado.
- Probar Lista técnica/Mosaico/Tablero y diagramas altos/ancho en escritorio, tableta y móvil desde un navegador permitido.
- Obtener el código NDBG de la falla nueva y confirmar el literal del primer paso (“ASIC cycle” o “AC cycle”); entonces implementar la entrada BAT y sus tres pasos sin inventar datos.

### Riesgos

- En escritorio bajo, el mínimo de 420 px puede hacer que la página necesite scroll vertical; se mantiene habilitado para evitar cortar la ficha.
- Si el código real BAT no se confirma, no es seguro asociar la nueva entrada en búsquedas y formulario.

## 24. 2026-10-10 — Sincronizar el clic de Lista técnica con el detalle MTF

### Fecha

2026-10-10.

### Solicitud

Corregir que al seleccionar una falla en Lista técnica el catálogo permanece visible y no aparece la ficha completa, a diferencia de Mosaico y Tablero.

### Objetivo

Usar una sola transición para cerrar el catálogo y abrir el detalle en todas las vistas MTF.

### Estado anterior

- `selectMtfFault` modificaba directamente `mtf-detail-open` y delegaba el colapso del catálogo a `setMtfCatalogCollapsed`.
- Los eventos de búsqueda y «Cambiar falla» también manipulaban esas clases por separado.
- La captura confirma que la lista seguía visible tras seleccionar una fila de Lista técnica.

### Análisis

- Se releen `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md`, además de verificar rama/estado local.
- Se siguió el evento click/teclado de `.mtf-item-card` hasta `selectMtfFault`, el toggle «Cambiar falla», la búsqueda y los estilos de visibilidad. Las tres vistas ya usan `selectMtfFault`; no se requiere una ruta nueva de selección.
- La visibilidad dependía de sincronizar por separado `mtf-selection-collapsed`, `mtf-detail-open` y la visibilidad CSS de las dos filas.

### Causa

El estado de navegación estaba repartido entre la selección y los handlers de regreso/búsqueda. El detalle y el catálogo no se exponían como una única transición explícita.

### Solución

- `setMtfCatalogCollapsed` ahora coordina las clases de selección/detalle y aplica/remueve `.hidden` directamente en la fila del catálogo y en la fila de detalle.
- La selección, el botón «Cambiar falla» y el cambio de búsqueda llaman esta función común para alternar catálogo ↔ ficha.
- Mosaico, Lista técnica y Tablero conservan el mismo `selectMtfFault`; no cambian datos, pasos, diagramas, BAT ni API.

### Archivos modificados

- `index.html` — `setMtfCatalogCollapsed`, `selectMtfFault` y eventos de búsqueda/regreso MTF.
- `CONTEXTO_FFDIGI.md` — estado de navegación descrito como transición común explícita.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `setMtfCatalogCollapsed` — punto único de apertura/cierre de catálogo y detalle.
- `selectMtfFault` — sigue siendo la selección única para fallas MTF.
- Listeners `mtf-search` y `mtf-selection-toggle` — devuelven catálogo mediante el punto común.

### Impacto

Solo navegación MTF. Al elegir una fila debe ocultarse la lista y aparecer Failure Record, Troubleshooting Sequence y Disposition Flow; al cambiar falla o editar la búsqueda, vuelve el catálogo. BAT intacto.

### Validaciones realizadas

- Inspección estática de los listeners para confirmar que filas de Lista técnica y botones de Tablero/Mosaico siguen llamando el selector común.
- `node --check` pasó en los cinco módulos locales; los siete scripts clásicos inline compilaron con `vm.Script`; los cuatro bloques CSS quedaron balanceados; `git diff --check` terminó limpio.
- No se ejecutó una prueba visual/interactiva; no se abrió la URL local `file://` por otra vía.

### Resultado

La transición MTF quedó centralizada y ahora oculta/muestra explícitamente ambas filas; los chequeos estáticos pasaron. Falta la validación visual permitida.

### Pendientes

- Probar selección desde Lista técnica, Mosaico y Tablero, y regreso con «Cambiar falla»/búsqueda.

### Riesgos

- El retorno de vista depende de los handlers comunes; cualquier código nuevo que manipule clases de visibilidad debe seguir usando `setMtfCatalogCollapsed`.

## 25. 2026-10-11 — Añadir falla BAT de LEDs de IO board central

### Fecha

2026-10-11.

### Solicitud

Agregar en BAT una falla llamada “No encendido de los LEDs en panel de la IO board central”, con el código proporcionado por el usuario y tres pasos: ASIC cycle; validar tarjetas del panel; validar cable de IO board central hacia FIO y conexiones J21/J22.

### Objetivo

Incluir la falla en No Boot y conservar sus tres pasos propios, incluso si el navegador ya tiene un catálogo BAT guardado.

### Estado anterior

- El código adjunto `NDBG_092` ya estaba en la familia FRU bajo “FRONT IO FRU EEPROM”.
- La sección No Boot contenía NDBG_107 y usaba una guía común de siete pasos para cualquier falla de esa familia, ignorando `failure.steps` individuales.
- El inicio reemplazaba el catálogo base por el guardado; una falla añadida solo al catálogo base podía desaparecer cuando existía `ffdg-bat-catalog-v1`.

### Análisis

- Se leyeron los documentos obligatorios y se verificó el estado de Git antes de cambiar.
- Se revisó la imagen del usuario: fila `NDBG_092 | DEBUG | FRONT IO FRU EEPROM`. Se confirmó que NDBG_092 ya existía como caso FRU, y que la identidad BAT se distingue por código+etiqueta.
- Se siguieron `failureCatalog`, `makeBatUid`, restauración y escritura de `ffdg-bat-catalog-v1`, `getBatDetailSteps`, `renderBatSelection` e importación PDF `mergeProcedures`.
- Se preserva el caso FRU original y se agrega un segundo caso con mismo código, etiqueta distinta y UID propio. El texto “ASIC cycle” se conserva literalmente como lo indicó el usuario; no se cambió a “AC cycle”.

### Causa

El catálogo guardado sustituía el arreglo base, y el selector de pasos priorizaba siempre el procedimiento general cuando `family === NOBOOT`; ambas reglas impedían que una nueva entrada No Boot con procedimiento particular fuera visible y mostrara sus tres pasos.

### Solución

- Se añade NDBG_092 con etiqueta “No encendido de los LEDs en panel de la IO board central”, familia No Boot y tres pasos explícitos en el orden pedido.
- La marca `customProcedure` permite que solo esta entrada use sus pasos propios; NDBG_107 y los demás casos No Boot conservan el flujo común.
- La marca `managedAddition` permite reinyectar por UID la falla si falta en el catálogo BAT guardado y persistirla sin reemplazar el resto del catálogo ni sus metadatos de archivo.
- El caso FRU NDBG_092 “FRONT IO FRU EEPROM” se mantiene sin cambios. No se modifican flowcharts BAT, MTF ni API.

### Archivos modificados

- `index.html` — catálogo BAT, `getBatDetailSteps` y restauración/persistencia del catálogo BAT local.
- `CONTEXTO_FFDIGI.md` — fuente del nuevo registro, pasos personalizados y restauración sobre catálogo guardado.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `FFDG.data.failureCatalog` — añade la falla No Boot NDBG_092 con UID generado por código+etiqueta.
- `getBatDetailSteps` — respeta `failure.steps` solo cuando `customProcedure` está marcado; flujo general No Boot queda igual.
- Inicializador BAT — restaura adiciones administradas faltantes sin descartar el catálogo guardado y actualiza la persistencia local.
- `renderBatSelection` y renderer del tablero — consumen el registro/pasos ya integrados; no se modificó su lógica.

### Impacto

BAT añade una tarjeta en No Boot y una ficha con tres pasos. FRU conserva su entrada NDBG_092 original. La nueva entrada también se repone después de recarga cuando el almacenamiento local ya tenía un catálogo anterior. Ningún cambio MTF ni API.

### Validaciones realizadas

- `node --check` pasó en los cinco módulos JavaScript locales; los siete scripts clásicos inline compilaron con `vm.Script`.
- Los cuatro bloques CSS quedaron balanceados; `git diff --check` terminó limpio.
- Comprobación estática confirmó código, etiqueta, secuencia textual, marcador de pasos propios y mecanismo de re-inyección.
- Prueba aislada de `getBatDetailSteps`: la nueva entrada devuelve sus 3 pasos y NDBG_107 conserva la guía general de 7 pasos.
- No se realizó selección visual/interactiva ni una prueba real de `localStorage`; el navegador local `file://` no se abrió por otra vía.

### Resultado

La falla quedó implementada en el catálogo fuente con pasos propios y lógica para incorporarla a catálogos guardados. Validación estática aprobada; la prueba visual/recarga real queda pendiente.

### Pendientes

- Probar que aparece bajo No Boot, conserva sus tres pasos al seleccionarla y que el caso FRU existente mantiene su ficha.
- Probar restauración con catálogo guardado anterior, persistencia y selección desde el tablero BAT.

### Riesgos

- `NDBG_092` queda compartido por dos entradas deliberadamente distintas; búsquedas por código mostrarán ambas. Si el usuario pretendía reemplazar el caso FRU existente en vez de agregar una variante, se requeriría una decisión posterior.
- La prueba real de persistencia y flujo visual aún no se ejecutó.

## 26. 2026-10-11 — Traducir al inglés el nombre de la falla BAT de LEDs

### Fecha

2026-10-11.

### Solicitud

El usuario aclaró que el nombre de la falla “No encendido de los LEDs en panel de la IO board central” debe estar en inglés.

### Objetivo

Mostrar el nombre de la falla en inglés, manteniendo código, familia y procedimiento sin cambios.

### Estado anterior

La falla BAT NDBG_092 estaba en No Boot, con etiqueta en español y tres pasos personalizados.

### Análisis

Se releyeron las reglas y el contexto FFDIGI, se revisó el estado de Git y se localizó la única etiqueta del registro administrado; el contexto confirma el UID compuesto por código y etiqueta, y el historial confirma los pasos que deben conservarse.

### Causa

La solicitud inicial especificó el nombre en español; la aclaración posterior indicó que el nombre debe ser inglés.

### Solución

Se cambió la etiqueta a `Central IO board panel LEDs do not turn on`. Al restaurar el catálogo, se elimina únicamente el registro No Boot NDBG_092 con la etiqueta española anterior y se persiste la entrada canónica en inglés, evitando mostrar ambas tarjetas. No se alteraron el registro FRU homónimo por código ni los tres pasos BAT.

### Archivos modificados

- `index.html` — etiqueta de la falla NDBG_092 de No Boot.
- `CONTEXTO_FFDIGI.md` — nombre actual de la falla.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `FFDG.data.failureCatalog` — cambia únicamente el texto `label`; la identidad administrada sigue derivándose de código y etiqueta.
- Inicializador BAT — migra el nombre anterior exacto de la entrada No Boot guardada, reinserta el nombre canónico y persiste el catálogo.

### Impacto

La tarjeta y los lugares que presentan la etiqueta de la falla mostrarán el nombre en inglés también con catálogo previamente guardado. Código, familia, pasos y flujo general BAT permanecen iguales; la persistencia se actualiza solo cuando se detecta la etiqueta anterior.

### Validaciones realizadas

- Revisión estática confirmó la etiqueta inglesa en el registro, el retiro selectivo de la etiqueta anterior guardada y su repersistencia mediante la ruta existente de adiciones administradas.
- `git diff --check` ejecutado después del cambio.
- No se realizó prueba visual en navegador ni se alteró el catálogo `localStorage` del usuario.

### Resultado

Nombre de la falla actualizado a inglés; procedimiento y demás datos preservados.

### Pendientes

- Confirmar visualmente el nombre al seleccionar NDBG_092 en la sección No Boot cuando se pruebe la página en navegador.

### Riesgos

- La migración solo elimina la combinación exacta NDBG_092 + No Boot + etiqueta española anterior; cualquier registro diferente se conserva.

## 28. 2026-10-11 — Ocultar detalle BAT al volver al catálogo

### Fecha

2026-10-11.

### Solicitud

Al pulsar «Cambiar falla» en BAT, ocultar la tabla/ficha de descripción y mostrar únicamente el menú de fallas. El detalle debe regresar al seleccionar una falla.

### Objetivo

Hacer que el botón de retorno vuelva realmente al catálogo, sin dejar visible el registro anterior.

### Estado anterior

Los handlers de «Cambiar falla» y «Volver a fallas» solo expandían el catálogo mediante `setBatCatalogCollapsed(false)`. No limpiaban `FFDG.state.batDetailFailure` ni ocultaban el área de detalle, por lo que tablero y ficha quedaban visibles juntos.

### Análisis

Se releyeron las reglas/contexto/historial obligatorios y se inspeccionaron `renderBatSelection`, `setBatCatalogCollapsed`, el evento de selección del tablero BAT y ambos botones de retorno. `renderBatSelection(null)` ya restablece estado, modo, formulario y visibilidad de detalle; el listener de cada tarjeta vuelve a llamarla con la falla seleccionada.

### Causa

El retorno llamaba únicamente la función visual de expandir catálogo, en lugar de limpiar también la selección y el panel asociado.

### Solución

- Los botones «Cambiar falla» y «Volver a fallas» ahora llaman `renderBatSelection(null)` antes de enfocar y desplazar al catálogo.
- Se conserva la tarjeta seleccionada como foco visual; al pulsar cualquier tarjeta, el evento existente vuelve a mostrar su ficha.
- No se cambió el flujo MTF ni el esquema/datos BAT.

### Archivos modificados

- `index.html` — handlers de los dos botones para volver al catálogo BAT.
- `CONTEXTO_FFDIGI.md` — comportamiento actual de navegación BAT.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `renderBatSelection(null)` — reutilizada como limpieza central del detalle y estado seleccionado.
- Eventos `bat-selection-toggle` y `bat-back-to-faults` — regresan al tablero tras limpiar la ficha.
- Evento `change` del selector BAT y click de tarjetas — sin cambios; siguen abriendo la ficha de la falla seleccionada.

### Impacto

En BAT, el retorno deja visible solo el catálogo y oculta la descripción, secuencia, diagrama y paneles de diagnóstico asociados. El siguiente click de falla vuelve a presentar el detalle.

### Validaciones realizadas

- Los scripts clásicos inline de `index.html` se compilaron con `vm.Script`.
- Comprobación estática verificó que ambos handlers limpian con `renderBatSelection(null)` y que el selector de fallas sigue llamando `renderBatSelection(selectedFailure || null)`.
- `git diff --check` terminó limpio.
- No se hizo prueba interactiva/visual en navegador.

### Resultado

Al volver al catálogo BAT, la ficha se oculta; la selección siguiente la muestra de nuevo.

### Pendientes

- Verificar visualmente «Cambiar falla», «Volver a fallas» y selección de tarjeta en el navegador local.

### Riesgos

- `renderBatSelection(null)` limpia el fallo activo y reinicia el índice del detalle, comportamiento esperado al abandonar esa ficha; las respuestas/historial general del diagnóstico se conservan según los estados separados existentes.

## 29. 2026-10-11 — Ocultar evidencia y secuencia de potencia en el catálogo BAT

### Fecha

2026-10-11.

### Solicitud

Ocultar los bloques «Evidencia Fotográfica» y «Secuencia de Potencia» señalados mientras se vuelve al menú de fallas BAT.

### Objetivo

Dejar despejada la vista de catálogo cuando no hay una falla seleccionada y conservar la información contextual donde sí corresponde.

### Estado anterior

Al volver al tablero, `renderBatSelection(null)` ocultaba la ficha pero la barra lateral `<aside>` seguía visible con evidencia y secuencia de potencia. Para fallas No Boot, esa barra también aparece junto al detalle.

### Análisis

Se releyeron las reglas y el contexto FFDIGI, y se revisaron el historial BAT reciente, el HTML de ambos bloques, los cambios de clase de `renderBatSelection` y las reglas CSS de `bat-details-mode`/`bat-no-boot-mode`. La barra contiene solo esos dos bloques; el CSS ya la reserva para el detalle No Boot.

### Causa

La visibilidad del `<aside>` no dependía del estado sin selección, por lo que continuaba renderizado después de ocultar la ficha.

### Solución

- Se oculta el `<aside>` cuando `#bat-layout` no tiene `bat-details-mode`, estado usado por el catálogo sin ficha.
- Se conserva la regla existente que muestra la barra en detalles No Boot y la oculta para las demás familias.
- No se eliminan ni se modifican el adjunto fotográfico, sus datos, el reporte PDF ni el contenido de la secuencia.

### Archivos modificados

- `index.html` — regla CSS para la barra lateral BAT en estado catálogo.
- `CONTEXTO_FFDIGI.md` — visibilidad de los bloques según el estado.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- CSS `#bat-layout:not(.bat-details-mode) > aside` — oculta la barra sin falla activa.
- `renderBatSelection` — sin cambios; su clase `bat-details-mode` determina el estado.
- Entrada de evidencia y `printBatReport` — sin cambios; archivos y generación del reporte permanecen disponibles durante el detalle.

### Impacto

El catálogo BAT queda sin esos dos bloques laterales. En el detalle No Boot se conserva la barra; para otras familias continúa oculta según la regla previa.

### Validaciones realizadas

- Revisión estática confirmó que la nueva regla depende de ausencia de `bat-details-mode`, y que la regla previa específica para las otras fallas permanece.
- `git diff --check` terminó limpio.
- No se ejecutó prueba visual responsive ni de adjuntos/reporte en navegador.

### Resultado

Los bloques solicitados quedan ocultos al volver al catálogo BAT, sin borrar su funcionalidad.

### Pendientes

- Comprobar visualmente catálogo, ficha No Boot, ficha de otra familia y vista móvil.

### Riesgos

- La barra seguirá mostrándose en detalles No Boot, ya que contiene controles de evidencia/reportes y contexto de alimentación asociados a ese modo. Si se buscaba ocultarla permanentemente también durante el diagnóstico, requeriría una instrucción distinta.

## 30. 2026-10-11 — Reorganizar reporte BAT No Boot para revisión gerencial

### Fecha

2026-10-11.

### Solicitud

Mejorar la posición de los bloques del PDF No Boot para presentarlo a Gerencia, organizar el reporte y agregar imágenes si es posible.

### Objetivo

Hacer más clara la lectura ejecutiva del caso sin alterar el contenido fuente ni los reportes de otras fallas.

### Estado anterior

`printBatReport` componía un solo formato BAT con metadatos, resumen, salto de página, RCA/acciones, evidencia adjunta y firmas. No imprimía la bitácora completa de pasos ni el diagrama BAT. El logo Ingrasys y las fotos adjuntadas ya estaban disponibles.

### Análisis

Se releyeron las instrucciones FFDIGI y el contexto, y se revisaron el historial de reportes, `printBatReport`, `openPrintDialog`, los campos de impresión, la forma real de `FFDG.state.history`, el renderer del flowchart y el ciclo de vida de evidencias. La fuente de PDF es HTML/CSS de impresión en `index.html`; `window.print()` crea el PDF en el navegador. Se preservan el reporte general y el flujo MTF.

### Causa

La salida común no separaba el informe No Boot con jerarquía ejecutiva ni incluía la trazabilidad de validaciones y su diagrama, aunque esos datos/recursos ya existen en memoria y en la interfaz.

### Solución

- Se activa un formato ejecutivo condicional únicamente cuando `failure.family === "NOBOOT"`: título/resumen gerencial, datos de identificación, bitácora, RCA y plan de acción, ruta visual, evidencia fotográfica y firmas.
- La bitácora presenta paso, validación, resultado, observación/acción y hora, usando los registros reales de `FFDG.state.history`.
- El diagrama es una copia del SVG BAT ya generado; las imágenes fotográficas son exclusivamente archivos adjuntados por el usuario. Se mantiene el logo local existente. No se generan ni infieren imágenes o información de falla.
- Se aislaron la construcción de la bitácora y la clonación del diagrama en helpers dentro del motor de impresión.
- Los reportes BAT de otras familias y el reporte MTF conservan su flujo anterior.

### Archivos modificados

- `index.html` — markup, estilos `@media print`, helpers de impresión BAT y presentación condicional No Boot.
- `CONTEXTO_FFDIGI.md` — describe el formato ejecutivo y sus fuentes de datos/imagen.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `printBatReport` — elige el formato por familia, ordena campos y prepara bloques de No Boot.
- `renderBatPrintDiagnostics` — arma tabla semántica desde la bitácora existente.
- `renderBatPrintFlowchart` — clona el SVG del detalle BAT y añade una leyenda.
- `#bat-print-report` y estilos de impresión — jerarquía de página, tabla y límites del diagrama.
- `printMtfReport` / navegación MTF — sin cambios.

### Impacto

Los reportes No Boot muestran una portada ejecutiva y una continuación técnica con validaciones, RCA/acciones, flowchart, fotografías disponibles y firmas. Puede ocupar más de dos páginas si hay muchas validaciones o fotos. No cambia el estado de diagnóstico, el formulario ni `localStorage`.

### Validaciones realizadas

- Los siete scripts clásicos inline de `index.html` compilaron mediante `vm.Script`.
- Verificación estática confirmó que el formato ejecutivo se limita a No Boot, que la bitácora y flowchart son condicionales y que fotos/logo reutilizan fuentes existentes.
- `git diff --check` terminó limpio.
- No se guardó un PDF de muestra ni se inspeccionó visualmente una impresión; la política del navegador rechazó la URL `file://`, y no se intentó una ruta alternativa. La verificación visual permanece pendiente.

### Resultado

Implementación del informe ejecutivo No Boot realizada; validación estática aprobada, revisión visual del PDF pendiente.

### Pendientes

- Generar desde el navegador un caso No Boot con pocas y varias validaciones, con/sin fotos, y revisar saltos de página, legibilidad del diagrama y firmas.
- Confirmar que el formato general de otras familias sigue igual en una impresión real.

### Riesgos

- El flowchart se copia como SVG del estado visible en el detalle; si los estilos/tokens cambian, revisar legibilidad en impresión clara y modo oscuro.
- La paginación final depende del motor/ajustes del navegador y del número de fotos; revisar escala, márgenes y fondos al guardar como PDF.

## 27. 2026-10-11 — Añadir falla BAT No Boot NDBG_122 FW ISSUE

### Fecha

2026-10-11.

### Solicitud

Agregar debajo de NDBG_092 una falla No Boot con código NDBG_122 (fila aportada: DEBUG / FW ISSUE) y tres pasos: validar firmware de componentes principales BMC/HMC; actualizar firmware de componentes; validar firmware actualizado mediante BAT Script.

### Objetivo

Incorporar la falla FW ISSUE al tablero No Boot y mostrar los tres pasos como procedimiento personalizado, sin alterar el flujo general de otras fallas.

### Estado anterior

El catálogo contenía NDBG_107 y la adición NDBG_092 en No Boot. No existía NDBG_122; las fallas sin procedimiento propio consumían la guía común de No Boot.

### Análisis

Se leyeron AGENTS.md, CONTEXTO_FFDIGI.md e HISTORIAL_CAMBIOS_FFDIGI.md antes del cambio y se revisó el estado Git. Se buscó NDBG_122 en los archivos del proyecto: no existía. Se inspeccionaron la estructura `failureCatalog`, el renderer `getBatDetailSteps`, la identidad BAT por código+etiqueta y la restauración de adiciones administradas desde `localStorage`.

### Causa

La nueva falla y su procedimiento aún no estaban representados en el catálogo fuente BAT.

### Solución

- Se añadió `NDBG_122 · FW ISSUE` a la familia No Boot, inmediatamente después de NDBG_092. `insertAfterCode` mantiene esa posición al reponerla en catálogos guardados.
- Se marcaron `managedAddition` y `customProcedure` para reponerla en catálogos locales previos y usar únicamente sus tres pasos definidos, sin sustituir la secuencia general No Boot.
- Se registraron los pasos solicitados. Se corrigió únicamente el typo “Scrip” a “Script”; se conserva el texto “Update firmware” indicado por el usuario.
- No se asignó una imagen o flowchart no proporcionado ni se modificó MTF.

### Archivos modificados

- `index.html` — entrada BAT NDBG_122 con metadatos y procedimiento.
- `CONTEXTO_FFDIGI.md` — fuente de catálogo y comportamiento de pasos personalizados.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `FFDG.data.failureCatalog` — incorpora la falla No Boot NDBG_122.
- `getBatDetailSteps` — consume los tres pasos debido al marcador `customProcedure`; no se modifica su lógica.
- Inicializador BAT — detecta la adición administrada ausente, la inserta tras el código ancla y la persiste por la ruta existente.
- Tablero BAT — consume la nueva entrada desde el catálogo compartido; no se modificó el renderer.

### Impacto

No Boot muestra un caso adicional debajo de NDBG_092. Al seleccionarlo, la ficha toma sus tres pasos; el diagrama BAT existente se genera a partir de esos pasos. El resto de familias y el flujo común de No Boot permanecen sin cambio.

### Validaciones realizadas

- Búsqueda estática confirmó que NDBG_122 no existía previamente y que la entrada nueva conserva código, etiqueta FW ISSUE, familia y orden solicitado.
- La verificación de estructura confirmó exactamente tres pasos en el orden proporcionado, con `managedAddition` y `customProcedure`.
- Los scripts clásicos inline de `index.html` compilaron mediante `vm.Script`; `git diff --check` terminó limpio.
- No se probó visualmente el tablero ni la persistencia real de `localStorage` en navegador.

### Resultado

La falla NDBG_122 FW ISSUE quedó agregada debajo de NDBG_092 al catálogo fuente No Boot, con procedimiento propio de tres pasos; la restauración local conserva ese orden.

### Pendientes

- Confirmar visualmente que aparece debajo de NDBG_092, abrir la ficha y avanzar sus tres pasos.
- Confirmar restauración/persistencia y posición justo después de NDBG_092 al cargar un catálogo BAT previo.

### Riesgos

- La fila fuente clasifica el registro como DEBUG, pero la solicitud indica expresamente agregarlo a No Boot; se conserva esa categoría de interfaz solicitada y el texto de origen `FW ISSUE` como etiqueta.
- “Update firmware” no especifica paquete, versión ni procedimiento de actualización; no se inventó esa información.

## 31. 2026-10-11 — Sintetizar y ordenar el reporte BAT No Boot

### Fecha

2026-10-11.

### Solicitud

Reorganizar el PDF de No Boot para Calidad: quitar la bitácora y, si es posible, la ruta de diagnóstico; dejar un reporte limpio, claro, con evidencia y firmas separadas, en una sola hoja.

### Objetivo

Priorizar la identificación del nodo y una síntesis suficiente para que Calidad entienda qué se encontró, qué intervención se hizo, cómo quedó el retest y qué acción sigue, sin revisar una bitácora paso por paso.

### Estado anterior

La variante ejecutiva de No Boot agregaba una continuación con salto forzado de página, tabla completa de validaciones y clon del flowchart BAT. Metadatos, evidencia y firmas estaban repartidos entre bloques, lo que extendía el documento y dificultaba su lectura ejecutiva.

### Análisis

Se leyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md`; se revisó el estado Git y los consumidores de `printBatReport`, el HTML de impresión, el historial de diagnóstico, los datos RCA, los adjuntos de evidencia y los reportes BAT no-No-Boot/MTF. El reporte se genera con `window.print()` y no con una biblioteca PDF; el historial sigue siendo entrada/condición del diagnóstico, aunque ya no se imprime en esta variante.

### Causa

El diseño anterior forzaba una página adicional y repetía información de diagnóstico en tabla y diagrama, priorizando trazabilidad interna sobre el resumen de intervención solicitado por Gerencia/Calidad.

### Solución

- Se quitó del HTML de impresión No Boot la tabla de bitácora y la sección de ruta/flowchart; se eliminaron sus dos helpers de render, conservando el diagrama y el historial visibles en la interfaz.
- Se retiró del reporte No Boot la continuación con salto de página y el folio local de sesión, conservándolos sin cambios para reportes de otras familias.
- El resumen ejecutivo muestra resultado, clasificación, retest y siguiente acción; el bloque de trabajo concentra causa raíz, evidencia de causa e intervención realizada.
- Las fotos adjuntadas siguen en el reporte en una galería compacta de hasta cuatro columnas; se ordenó antes de las dos áreas de firma, cada una en su propio recuadro y columna.
- Se ajustó tipografía, espacios, metadatos, bloques y miniaturas únicamente bajo la clase ejecutiva No Boot para favorecer una hoja A4. No se cambió el contenido técnico, el flujo de diagnóstico ni los datos guardados.

### Archivos modificados

- `index.html` — plantilla HTML de impresión, estilos de impresión ejecutiva y `printBatReport`.
- `CONTEXTO_FFDIGI.md` — descripción vigente de contenido y alcance del reporte No Boot.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `printBatReport` — prepara el reporte ejecutivo compacto solo para No Boot; conserva los controles y lógica base.
- `#bat-print-report` — orden de resumen, intervención, evidencia y firmas.
- `@media print` — densidad y tamaño de bloques No Boot; reglas de otras familias no se alteraron.
- Eliminados `renderBatPrintDiagnostics` y `renderBatPrintFlowchart`, ya que únicamente servían las secciones retiradas del PDF.
- `printMtfReport`, UI de diagnóstico BAT, MTF y generación de flowchart en pantalla — sin cambios intencionales.

### Impacto

El reporte No Boot ahora omite bitácora y ruta visual, conservando evidencia fotográfica adjunta y firmas separadas. La bitácora continúa usándose para registrar el diagnóstico y habilitar el reporte, pero no aparece impresa. Otras familias BAT y MTF mantienen su comportamiento anterior.

### Validaciones realizadas

- Los siete scripts clásicos inline de `index.html` compilaron con `vm.Script`.
- Cuatro bloques CSS quedaron balanceados.
- Verificación estática confirmó que el markup de bitácora/ruta y sus helpers ya no están; intervención, siguiente acción, galería y firmas separadas siguen presentes.
- `git diff --check` terminó limpio.
- No se creó ni se revisó visualmente un PDF. La vista local `file://` está bloqueada por el navegador y no se probó mediante otro mecanismo; la paginación real de impresión queda pendiente de inspección.

### Resultado

Plantilla ejecutiva No Boot reorganizada y simplificada; validación estática aprobada. La salida de una sola hoja está optimizada para contenido habitual, pero no se declara confirmada sin revisar el PDF renderizado.

### Pendientes

- Abrir la ficha No Boot en la aplicación, adjuntar el número habitual de fotos, imprimir a A4 y confirmar visualmente que contenido, evidencia y ambas firmas caben en una sola página.
- Comparar una impresión de otra falla BAT para verificar visualmente que mantiene su formato previo.

### Riesgos

- La cantidad de fotos y la longitud de textos capturados pueden superar el espacio de una página; el navegador y las opciones de escala/márgenes influyen en la paginación. No se recortan ni descartan evidencias automáticamente.
- La validación de clasificación, causa raíz, siguiente acción y al menos un paso de diagnóstico se conserva aunque la bitácora no se imprima.

## 32. 2026-10-11 — Añadir fallas FAN SPEED 4–8

### Fecha

2026-10-11.

### Solicitud

Agregar en la sección BAT Fans las fallas NDBG_117 a NDBG_121, mostradas en la imagen como DEBUG / FAN SPEED 4, 5, 6, 7 y 8.

### Objetivo

Completar el tablero de ventiladores, que solo contenía FAN SPEED 1–3, sin alterar otras familias.

### Estado anterior

La familia Fans contenía NDBG_104 FAN SPEED 1, NDBG_105 FAN SPEED 2 y NDBG_106 FAN SPEED 3. Los códigos NDBG_117–121 no estaban en los archivos del proyecto.

### Análisis

Se leyeron las reglas, contexto e historial FFDIGI y se inspeccionó `git status`. Se revisaron `FFDG.data.failureCatalog`, la familia FAN, el generador de UID por código+etiqueta, el flujo de restauración BAT desde `localStorage`, `getBatDetailSteps` y los consumidores del tablero/lista de fallas. La captura aportada es la fuente de identidad disponible: código, clasificación DEBUG y etiquetas FAN SPEED 4–8.

### Causa

El catálogo fuente incluía únicamente las tres primeras velocidades; por eso el tablero no podía mostrar los registros 4–8.

### Solución

- Se agregaron NDBG_117 FAN SPEED 4, NDBG_118 FAN SPEED 5, NDBG_119 FAN SPEED 6, NDBG_120 FAN SPEED 7 y NDBG_121 FAN SPEED 8 a la familia `FAN`, con la etiqueta de categoría existente `Ventiladores / Enfriamiento`.
- Cada alta se marcó `managedAddition` para que el inicializador la reponga en un catálogo local anterior guardado, usando la identidad BAT existente y sin reemplazar el resto del catálogo.
- No se agregaron pasos de troubleshooting: la imagen solo aporta identidad/categoría, no un procedimiento. La ficha existente indica que no hay pasos asociados al registro.
- No se cambió el seed PDF, el flujo No Boot, MTF ni el renderer del tablero.

### Archivos modificados

- `index.html` — cinco entradas BAT de familia FAN en `FFDG.data.failureCatalog`.
- `CONTEXTO_FFDIGI.md` — fuente de datos Fans y condición de pasos no disponibles.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `FFDG.data.failureCatalog` — incorpora NDBG_117–121 como registros FAN administrados.
- Inicializador BAT — detecta y reincorpora adiciones `managedAddition` ausentes del catálogo local.
- `renderBatSelection` / `getBatDetailSteps` — consumen la entrada compartida; sin cambios de lógica. Al no haber procedimiento fuente, muestran el estado existente de “No hay pasos asociados”.

### Impacto

El tablero Fans pasa de 3 a 8 fallas en un catálogo nuevo y también recupera las cinco nuevas en catálogos locales previos. Los conteos y filtros que derivan de `failureCatalog` se actualizan automáticamente. Ninguna otra familia cambia.

### Validaciones realizadas

- Búsqueda estática comprobó que los cinco códigos no existían previamente y que quedaron asignados a `FAN`, con códigos/etiquetas exactamente como en la captura.
- Se comprobó que cada alta declara `managedAddition` y que el inicializador actual ya reinyecta esas adiciones por UID sobre catálogos guardados.
- Los scripts clásicos inline se compilaron mediante `vm.Script`; los bloques CSS permanecieron balanceados; `git diff --check` terminó limpio.
- No se validó el tablero ni la persistencia real en navegador; la página `file://` no se prueba mediante otra ruta.

### Resultado

Catálogo fuente actualizado con cinco fallas FAN; los procedimientos no se inventaron. Verificación estática aprobada.

### Pendientes

- Confirmar visualmente que Fans muestre ocho tarjetas y que las cinco adiciones permanezcan tras recargar con un catálogo guardado previo.
- Si se requieren procedimientos de reparación, hace falta la fuente con sus pasos.

### Riesgos

- Un catálogo importado desde PDF puede no tener instrucciones para estas cinco fallas; la ficha quedará sin pasos asociados hasta que se proporcione el procedimiento.
- La fila muestra “DEBUG” como clasificación de la fuente; se agrega a Fans porque así lo pidió el usuario y las etiquetas describen explícitamente velocidades de ventilador.

## 33. 2026-10-11 — Añadir troubleshooting por velocidad a fallas Fans

### Fecha

2026-10-11.

### Solicitud

Agregar cuatro fases a las fallas Fan: validar ruteo, ejecutar el script BMC Sensors, validar resultados y hacer reseat, y retest; identificar en cada fase el número de ventilador correspondiente a FAN SPEED.

### Objetivo

Que FAN SPEED 1–8 muestre una secuencia de cuatro pasos específica para su número y conserve el procedimiento después de restaurar el catálogo BAT guardado.

### Estado anterior

NDBG_104–106 y NDBG_117–121 estaban en la familia Fans, pero no tenían pasos propios; al seleccionarlas, la ficha indicaba que no había pasos asociados. El inicializador solo agregaba adiciones administradas faltantes y no actualizaba propiedades de una falla que ya existiera en `localStorage`.

### Análisis

Se releyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md`; se inspeccionó rama/estado Git y se siguió la ruta de `failureCatalog`, `managedBatAdditions`, `makeBatUid`, restauración y persistencia, `getBatDetailSteps`, navegación BAT y `renderBatFlowchart`. Se confirmó que `customProcedure` hace que las fallas no-No-Boot utilicen `failure.steps`, mientras el diagrama BAT existente se genera desde esa secuencia.

### Causa

Los ocho registros no tenían procedimientos y el merge de catálogo persistido omitía toda actualización cuando encontraba un UID ya existente.

### Solución

- Se unificaron las ocho velocidades en el modelo de catálogo FAN con un constructor de pasos parametrizado por número de ventilador.
- Cada procedimiento tiene exactamente cuatro pasos: `Validación de ruteo del ventilador N`; `Run the BMC Sensors script for Fan Speed N`; `Validar resultados y hacer reseat del ventilador N`; `Retest del ventilador N`. Se normalizó el typo “scrip” a “script” sin cambiar la acción solicitada.
- Se marcaron las ocho entradas como `managedAddition` y `customProcedure`.
- Al restaurar un registro existente, el inicializador sincroniza los pasos administrados cuando faltan o difieren; los demás campos/casos no se reemplazan. Si falta una entrada, continúa la reinyección previa.
- No se alteraron MTF ni el procedimiento No Boot. El flowchart BAT existente toma los nuevos pasos desde el renderer actual, sin una plantilla nueva.

### Archivos modificados

- `index.html` — constructor de pasos FAN, ocho registros y sincronización de procedimientos administrados existentes.
- `CONTEXTO_FFDIGI.md` — pasos FAN y alcance de la restauración actualizados.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `buildFanTroubleshootingSteps` — crea las cuatro fases con número específico.
- `FFDG.data.failureCatalog` — asocia el procedimiento a FAN SPEED 1–8.
- Inicializador BAT / `managedBatAdditions.forEach` — actualiza `customProcedure` y `steps` en registros guardados con la misma identidad, o inserta los faltantes.
- `getBatDetailSteps` y `renderBatFlowchart` — consumen el procedimiento vía su lógica existente.

### Impacto

Las ocho fallas muestran la secuencia adecuada para su fan; cambiar de FAN SPEED 1 a 8 cambia el número mencionado en los pasos. Catálogos locales existentes reciben estos procedimientos y se guardan mediante la persistencia BAT actual. La generación de diagramas BAT cambia indirectamente porque recibe cuatro pasos en estas fallas.

### Validaciones realizadas

- Los siete scripts clásicos inline compilaron con `vm.Script`; los cuatro bloques CSS quedaron balanceados.
- Evaluación aislada del catálogo confirmó ocho fallas FAN con cuatro pasos por falla, etiqueta y número correctos, y banderas `customProcedure`/`managedAddition`.
- La lógica de merge se ejecutó contra ocho registros simulados guardados sin pasos; los ocho quedaron actualizados con su procedimiento correspondiente.
- `git diff --check` terminó limpio.
- No se ejecutó selección visual ni `localStorage` real en el navegador; esa comprobación queda pendiente.

### Resultado

Secuencia de cuatro pasos implementada para FAN SPEED 1–8, con adaptación por número y sincronización sobre catálogo guardado.

### Pendientes

- Confirmar visualmente que cada tarjeta muestra los cuatro pasos y que su flowchart cambia al número correspondiente.
- Probar en navegador la actualización de una copia real guardada antes de esta modificación.

### Riesgos

- La secuencia sigue el texto proporcionado por el usuario; no se especificaron comandos, validaciones detalladas del script ni criterios de aprobación/rechazo. Esos detalles no se inventaron.
- La persistencia en navegador puede no ejecutarse si el almacenamiento está bloqueado o falla; el inicializador ya captura ese error y continúa con los datos de sesión.

## 34. 2026-10-11 — Agregar selector PDF MTF sin importar contenido

### Fecha

2026-10-11.

### Solicitud

Agregar a MTF un botón para elegir un PDF FFDG de actualización futura, sin modificar ahora el catálogo ni el contenido del sistema.

### Objetivo

Dejar visible un botón que abra el selector de archivos PDF y conservar intacto el importador Excel existente y los datos actuales.

### Estado anterior

MTF mostraba el botón `Actualizar Excel FFDG`, conectado a `loadExcelFile`. No había un botón MTF para seleccionar PDF.

### Análisis

Se releyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md`; se inspeccionaron el estado Git, la barra de acciones MTF, el selector Excel, su listener y el importador. BAT ya tiene su propio selector/parser PDF y permanece fuera de alcance. La solicitud limita esta intervención a preparar el control visual, no implementar extracción ni mapeo PDF.

### Causa

No había un control MTF para elegir un PDF futuro. El parser Excel existente no debe recibir un PDF ni usarse para inferir su estructura.

### Solución

- Se agregó `Actualizar PDF FFDG` como botón accesible con nombre visible y foco de teclado; al presionarlo abre un input oculto que acepta archivos PDF.
- La selección queda sin procesar: no se lee, transmite, importa ni persiste el archivo, y no se modifica el catálogo.
- Se conservó sin cambios el botón, input, listener y parser Excel actual.
- Se amplió el breakpoint responsive de la barra de acciones MTF a 1500 px para acomodar el nuevo control sin solaparlo con la búsqueda.

### Archivos modificados

- `index.html` — botón/input PDF MTF, apertura del selector y quiebre responsive de la barra.
- `CONTEXTO_FFDIGI.md` — distingue el selector PDF futuro del importador Excel MTF operativo.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- Toolbar MTF — nuevo botón `mtf-pdf-select-button` y input `mtf-pdf-file-input`.
- Inicialización de eventos — el click del botón activa el selector; no se agregó evento `change` ni parser.
- Estilos responsive de `.mtf-row-1` — la distribución con varias acciones se activa hasta 1500 px.

### Impacto

Solo cambia la barra MTF y su selector de archivos. BAT, Excel MTF, procedimientos, flowcharts, catálogo, filtros y almacenamiento permanecen sin cambios. Elegir un archivo PDF no produce una actualización.

### Validaciones realizadas

- Siete scripts inline clásicos compilaron con `vm.Script`.
- Comprobación estática: un botón y un input PDF, `accept="application/pdf,.pdf"`, listener de click al selector, sin manejador de `change` para importar, IDs únicos y listener Excel existente.
- `git diff --check` terminó limpio.
- La página local `file://` fue bloqueada por la política del navegador; no se validaron visualmente escritorio/tableta/móvil ni se abrió el diálogo nativo. No se intentó una vía alternativa.

### Resultado

Control de selección PDF agregado; no implementa todavía la lectura o importación de documentos.

### Pendientes

- Definir e implementar el parser/mapeo PDF en una solicitud futura, usando una muestra representativa y una vista previa antes de aplicar datos.
- La prueba visual del botón y el selector en escritorio, tableta y móvil queda pendiente porque el navegador bloqueó la URL local.

### Riesgos

- El texto `Actualizar PDF FFDG` puede sugerir que el catálogo ya se actualiza; el tooltip aclara que por ahora solo abre el selector.
- El PDF seleccionado no se adjunta a ningún servidor ni se conserva para sesiones futuras; solo queda seleccionado temporalmente en el control hasta que se cierre o reinicie la página.

## 35. 2026-10-11 — Secuencia visual MTF para fallas sin flowchart fuente

### Fecha

2026-10-11.

### Solicitud

Cuando una falla MTF no tenga diagrama fuente en el PDF, generar un diagrama a partir de sus pasos sin cambiar los flowcharts existentes. Reducir las pestañas superiores a `Paso 1…N` y mostrar la descripción en la validación activa para que el texto no se encime.

### Objetivo

Dar una representación visual de la secuencia técnica disponible en los casos que hoy muestran “No hay un diagrama fuente verificado”, y permitir abrir directamente cada paso sin repetir sus títulos en la fila superior.

### Estado anterior

El caso AST-07 del ejemplo tenía nueve pasos y no tenía imagen/grafo fuente asociado; el panel mostraba únicamente el aviso de ausencia. Las pestañas MTF mostraban el título completo de cada paso, repetido respecto a la validación activa y difícil de leer cuando había muchas.

### Análisis

Se releyeron las reglas y el contexto FFDIGI; se consultaron las entradas históricas sobre preservación de flowcharts fuente, prioridad del observer y navegación MTF. Se inspeccionaron `renderFlowchart`, `renderMtfDetail`, `getActiveSteps`, el observer `drawFlow`, las asociaciones existentes y los datos base/additions/overrides. La auditoría estática identificó 287 registros únicos: 235 con imagen fuente verificada y 52 sin imagen asociada pero con pasos; AST-07 tiene nueve pasos y no figura con flowchart verificado. Ningún registro del conjunto actual quedó sin imagen y sin pasos.

### Causa

La política implementada anteriormente prefería dejar vacío el panel si faltaba una figura PDF, aunque existiera una secuencia de pasos. El stepper mostraba título completo en cada elemento, causando repetición y saturación visual.

### Solución

- Se agregó `mtf-procedure-sequence-flowchart.js`, que dibuja una caja por cada título de paso y una flecha entre consecutivos. El aviso informa que es una secuencia visual derivada, no una transcripción fuente. No dibuja rombos, Pass/Fail, resultados, retest ni terminales no expresados.
- `renderFlowchart` y el observer tardío `drawFlow` conservan primero la imagen/grafo fuente existente; solo cuando no hay fuente verificada usan el renderer nuevo y los pasos de la variante activa. Si tampoco hay pasos, se conserva el aviso de procedimiento faltante.
- Las pestañas superiores ahora son botones accesibles con los rótulos cortos `Paso 1`, `Paso 2`, etc. Cada botón permite seleccionar ese paso; el título y detalle permanecen en la validación de abajo.
- Los diagramas fuente, asociaciones, imágenes y código BAT no se modificaron.

### Archivos modificados

- `index.html` — carga del módulo, prioridad/fallback del renderer, stepper MTF accesible y estilos de pasos.
- `mtf-procedure-sequence-flowchart.js` — nuevo renderer SVG lineal para casos sin figura fuente.
- `CONTEXTO_FFDIGI.md` — arquitectura, fuente de verdad y límites actualizados.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `renderFlowchart` / `index.html` — conserva fuentes y delega al fallback únicamente ante ausencia de imagen/grafo válido.
- `renderMtfDetail` / `index.html` — genera pestañas `Paso N`, con selección directa y nombre accesible descriptivo.
- `drawFlow` / observer de `mtf-step` — mantiene sincronizado el fallback sin reemplazar la fuente.
- `renderMtfProcedureStepFlowchart` / módulo nuevo — produce las cajas, flechas, rótulos accesibles y destaca el paso activo.

### Impacto

Solo presentación y navegación de pasos MTF. Los 52 casos actuales sin flowchart fuente y con pasos presentan su secuencia; los 235 con fuente conservan el diagrama existente. No cambia el orden, contenido, variantes, selección de fallas, importadores, datos, API ni BAT.

### Validaciones realizadas

- `node --check` pasó para el nuevo renderer y los módulos MTF relevantes; los siete scripts inline clásicos de `index.html` compilaron con `vm.Script`.
- Prueba aislada de AST-07: 9 pasos → 9 cajas y 8 flechas, sin decisión, rama Pass/Fail o retorno añadido.
- Prueba estática de todos los registros actuales sin figura fuente: se generaron 52 diagramas; cada uno tuvo tantas cajas como pasos y exactamente una flecha entre pasos contiguos; cero etiquetas/figuras de decisión añadidas y cero fallas del renderer.
- La revisión del árbol confirmó 235 registros con asociaciones de imagen fuente; el cambio no editó recursos ni el módulo que conserva esas asociaciones.
- `git diff --check` terminó limpio.
- La visita visual se detuvo porque el navegador bloqueó el URL local `file://`; no se probaron dimensiones reales ni clicks en pantalla y no se usó otra vía de navegador.

### Resultado

Los casos sin flowchart fuente muestran una secuencia SVG transparente basada en sus pasos. Los flowcharts PDF existentes mantienen prioridad e integridad; las pestañas de validación quedan compactas y seleccionables.

### Pendientes

- Confirmar visualmente en navegador AST-07, una falla con imagen PDF y vistas de móvil, tableta y escritorio cuando la página pueda abrirse mediante un contexto permitido.
- El fallback representa orden lineal; no certifica ramas o decisiones que no estén en los pasos disponibles.

### Riesgos

- Un procedimiento puede tener condiciones internas en su descripción; el diagrama secundario muestra títulos y secuencia, no interpreta esas condiciones ni sustituye la consulta del texto completo.
- Si una falla tiene pasos incompletos, el renderer no puede reconstruir los pasos ausentes; debe corregirse desde una fuente autorizada, no por inferencia.

## 36. 2026-10-13 — Revertir acabado visual de catálogos BAT/MTF

### Fecha

2026-10-13.

### Solicitud

Revertir el retoque visual aplicado a las tablas/tableros BAT y MTF.

### Objetivo

Restablecer la apariencia previa sin afectar otros cambios acumulados del proyecto.

### Estado anterior

El turno anterior había agregado localmente el bloque CSS `ffdg-catalog-visual-polish` a `index.html` y una nota de diseño en `CONTEXTO_FFDIGI.md`; no se había creado commit ni push.

### Análisis

Se revisó el estado Git y se aisló el cambio por su identificador CSS y las dos notas asociadas. No se revirtió el archivo completo ni se tocaron cambios anteriores.

### Causa

El usuario pidió volver al aspecto anterior tras revisar el retoque.

### Solución

- Se retiró el bloque CSS temporal de `index.html`.
- Se retiró de `CONTEXTO_FFDIGI.md` la regla que describía ese acabado como vigente.
- Se conserva esta entrada únicamente como trazabilidad de la aplicación y reversión; no se preserva el estilo retirado.

### Archivos modificados

- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de la reversión.
- `index.html` y `CONTEXTO_FFDIGI.md` — los cambios temporales fueron retirados y ambos vuelven al contenido previo a ese retoque.

### Funciones o secciones afectadas

- CSS de los catálogos BAT/MTF — vuelve al estilo anterior.
- Datos, funciones, navegación, filtros, flowcharts y reportes — sin cambios.

### Impacto

Solo se deshace el tratamiento visual experimental. Se conservan los demás cambios del proyecto.

### Validaciones realizadas

- Se confirmó que `ffdg-catalog-visual-polish` ya no aparece en `index.html`.
- `git diff --check` sin errores; `index.html` y `CONTEXTO_FFDIGI.md` no presentan diferencias respecto a su estado previo al retoque.
- No se realizó prueba visual en navegador.

### Resultado

El acabado visual quedó revertido; no hubo commit ni push.

### Pendientes

- Ninguno para esta reversión.

### Riesgos

- Ningún riesgo funcional identificado; la validación fue estática.

## 37. 2026-10-13 — Realzar visualmente las fichas de diagnóstico BAT/MTF

### Fecha

2026-10-13.

### Solicitud

Rediseñar para que luzcan más llamativas, formales y de primer nivel únicamente las tarjetas de detalle BAT/MTF: Failure Record, Troubleshooting Sequence, validaciones técnicas y Disposition Flow/flowchart. No cambiar los tableros o mosaicos de fallas.

### Objetivo

Dar a los paneles de diagnóstico una jerarquía visual más clara y una presentación técnica profesional, conservando información, navegación y diagramas.

### Estado anterior

Las tres tarjetas compartían fondo transparente, bordes neutros y elementos de metadatos con poco contraste. Los encabezados ya usaban el color primario verde; los diagramas y pasos se representaban con sus estilos funcionales existentes.

### Análisis

- Se releeron `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md` antes de editar.
- Se revisaron los estilos, markup y renderizado de `#bat-failure-detail` y `#mtf-detail`, incluyendo secuencias BAT/MTF y contenedores de flowchart.
- Se confirmó que el cambio puede quedar aislado por selectores de ambas fichas, sin tocar catálogos, fuente de datos, lógica de selección ni recursos de diagramas.
- El árbol ya tenía una modificación local anterior en este historial, correspondiente a la reversión del acabado de catálogos; se preservó.

### Causa / necesidad

La solicitud previa se había interpretado como un cambio visual de las tarjetas del catálogo. El usuario aclaró que se refería a los tres paneles de diagnóstico, por lo que el ajuste debe centrarse en títulos, datos técnicos, secuencia activa y área de disposición.

### Solución

- Se añadió al final de los estilos de `index.html` un bloque CSS acotado a `#bat-failure-detail` y `#mtf-detail`.
- Se reforzaron superficies, bordes, acentos verdes, profundidad ligera y jerarquía de encabezados.
- Metadatos, identificadores, paso BAT activo, selector de pasos MTF y título de disposición ganaron contraste y separación visual.
- Se conservó el color y contenido original de los diagramas. No se añadieron gradientes ni animaciones.
- No se modificaron dimensiones, reglas de scroll, controles, catálogo, pasos, datos ni comportamiento.

### Archivos modificados

- `index.html` — estilos visuales acotados a las fichas de diagnóstico BAT y MTF.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Funciones o secciones afectadas

- CSS de `.bento-block-1/2/3`, encabezados, metadatos y título de falla dentro de los detalles BAT/MTF.
- Estilo de pasos activos BAT y pestañas de secuencia MTF.
- Marco visual de Disposition Flow y del diagrama.
- Sin funciones JavaScript modificadas.

### Impacto

Solo presentación de los paneles de diagnóstico. Los catálogos y mosaicos, pasos, diagramas fuente, navegación, importadores y reportes no cambian.

### Validaciones realizadas

- Inspección estática de los selectores para confirmar que el bloque nuevo está limitado a los detalles BAT/MTF.
- `git diff --check` sin errores.
- No se realizó validación visual interactiva; la URL local `file://` no está disponible para inspección por navegador en este entorno.

### Resultado

Las fichas BAT/MTF tienen un acabado más marcado y profesional, manteniendo contenido y funcionamiento existentes.

### Pendientes

- Revisar la apariencia final en escritorio, tableta y móvil cuando la página esté disponible en un contexto de navegador permitido.

### Riesgos

- El resultado estético definitivo no se confirmó visualmente en esta sesión. Los estilos usan tokens de tema existentes y no alteran deliberadamente layout, scroll o tamaños del diagrama.

## 38. 2026-10-13 — Resaltar paso activo y reforzar contornos de fichas

### Fecha

2026-10-13.

### Solicitud

Aplicar una iluminación pulsante al paso técnico activo y marcar con más fuerza el contorno completo de las tres tarjetas de detalle de BAT y MTF.

### Objetivo

Permitir identificar inmediatamente la validación seleccionada y delimitar mejor Failure Record, Troubleshooting Sequence y Disposition Flow.

### Estado anterior

BAT presenta la validación activa en una tarjeta dentro de `#bat-detail-steps`; MTF marca la validación activa mediante `.m3-step-pill.active`. Los paneles tenían contorno neutro de 1 px.

### Análisis

- Se leyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md`, `HISTORIAL_CAMBIOS_FFDIGI.md` y las instrucciones operativas indicadas por el usuario antes de modificar.
- Se inspeccionaron los selectores reales de la secuencia BAT y del estado activo MTF, además de la regla global `prefers-reduced-motion`.
- La intervención queda confinada al bloque CSS de fichas ya añadido; no requiere tocar código de selección/renderizado.

### Causa / necesidad

El estado activo dependía de estilos estáticos; en la vista de diagnóstico no destacaba como una señal luminosa y los bordes exteriores podían distinguirse poco del fondo.

### Solución

- Se aumentó el contorno de los tres paneles de 1 px a 2 px, conservando el borde superior verde como acento.
- Se añadió un pulso verde tenue al elemento BAT de paso actual y a la pestaña MTF `.active`.
- El pulso alterna suavemente halo y contorno, sin desplazar ni cambiar dimensiones de elementos.
- Se añadió una regla explícita para desactivar la animación con `prefers-reduced-motion: reduce`.
- No se alteraron contenido, pasos, selección, diagramas, scroll, datos ni estilos del catálogo.

### Archivos modificados

- `index.html` — estilos de borde, animación del paso activo y preferencia de movimiento reducido.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Funciones o secciones afectadas

- CSS de `#bat-failure-detail .bat-detail-sequence li`.
- CSS de `#mtf-detail .m3-step-pill.active`.
- CSS de los paneles `.bento-block-1/2/3` dentro de las fichas BAT/MTF.
- Sin funciones JavaScript modificadas.

### Impacto

Solo señalización visual del paso actual y contraste de contornos en los detalles BAT/MTF. No afecta el catálogo ni el flujo funcional.

### Validaciones realizadas

- Inspección estática de selectores BAT/MTF y consulta `prefers-reduced-motion`.
- Comprobación de balance de llaves CSS y `git diff --check`.
- No se realizó prueba visual/interactiva en navegador; la página local `file://` no está habilitada en este entorno.

### Resultado

El paso activo pulsa con un halo verde y los tres paneles tienen contornos más marcados. Usuarios con movimiento reducido reciben un estado estático destacado.

### Pendientes

- Confirmar intensidad visual en escritorio y móvil al poder abrir la página en un contexto de navegador permitido.

### Riesgos

- El pulso puede percibirse demasiado tenue o intenso según brillo/tema de pantalla; su duración e intensidad pueden ajustarse tras una revisión visual.

## 39. 2026-10-15 — Destacar la falla activa en Failure Record

### Fecha

2026-10-15.

### Solicitud

Resaltar el recuadro con el identificador y nombre de la falla que se está consultando en Failure Record para cualquier falla BAT o MTF; probar un tratamiento rojo.

### Objetivo

Hacer evidente cuál falla está abierta sin colorear todas las tarjetas de diagnóstico ni modificar el catálogo.

### Estado anterior

`#bat-detail-title` y `#mtf-detail-title` mostraban el título dinámico con fondo neutro y un acento verde lateral.

### Análisis

- Se releeron las reglas, contexto e historial FFDIGI, además de la nota operativa requerida.
- Se comprobó que ambas funciones de render asignan el ID y nombre seleccionados a esos encabezados.
- El estilo puede aplicarse a ambos encabezados existentes, sin añadir clases, estado ni código de renderizado.
- El tema define tokens semánticos de error para claro y oscuro, incluyendo texto contrastante.

### Causa / necesidad

Aunque la selección ya actualizaba el título, el fondo neutro no diferenciaba con claridad la falla activa de los demás datos técnicos.

### Solución

- Se aplicó fondo rojo suave mediante `--md-sys-color-error-container` al nombre/código de la falla activa en BAT y MTF.
- Se marcó el borde con `--md-sys-color-error` y se asignó el color de texto correspondiente para contraste.
- El tratamiento sigue automáticamente el contenido dinámico de la falla seleccionada y usa los tokens del tema claro/oscuro.
- Se dejó sin cambio el resto de las tres tarjetas, los pasos, los diagramas y la selección.

### Archivos modificados

- `index.html` — CSS de los encabezados `#bat-detail-title` y `#mtf-detail-title`.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Funciones o secciones afectadas

- Presentación del nombre/código activo en Failure Record BAT y MTF.
- Sin cambio en `renderBatSelection`, `renderMtfDetail` u otra función JavaScript.

### Impacto

Solo resalta visualmente la falla abierta. No cambia datos, lógica, navegación, paneles de Troubleshooting ni Session/Disposition Flow.

### Validaciones realizadas

- Revisión estática de los IDs compartidos por ambas fichas y de los tokens de color en temas claro/oscuro.
- `git diff --check` limpio.
- No se confirmó visualmente en navegador durante esta intervención.

### Resultado

El rótulo dinámico de la falla activa tiene fondo rojo suave y contorno rojo; se aplica a cualquier falla vista en BAT o MTF.

### Pendientes

- Revisar la intensidad del rojo visualmente en tema claro y oscuro.

### Riesgos

- El rojo puede asociarse con severidad/error; se mantiene solo en el nombre de la falla activa, no en los estados de validación ni en los diagramas.

## 40. 2026-10-15 — Mejorar el control «Cambiar Falla»

### Fecha

2026-10-15.

### Solicitud

Capitalizar «Falla» y añadir al control de cambio de falla un icono de intercambio con respuesta interactiva.

### Objetivo

Hacer más reconocible la acción para volver al catálogo BAT o MTF y seleccionar otra falla.

### Estado anterior

Los botones BAT y MTF mostraban el texto «Cambiar falla»; MTF además mostraba una flecha desplegable. Ambos ya controlaban el mismo flujo de expandir el catálogo.

### Análisis

- Se releeron `AGENTS.md`, `CONTEXTO_FFDIGI.md`, `HISTORIAL_CAMBIOS_FFDIGI.md` y la nota operativa requerida.
- Se comprobó que los controles son `#bat-selection-toggle` y `#mtf-selection-toggle`, asociados a listeners existentes que muestran nuevamente el catálogo.
- El ajuste se limita a sus etiquetas, icono SVG decorativo y CSS; se preservan IDs, atributos `aria-controls`, `aria-expanded` y listeners.

### Causa / necesidad

El control existente era solo texto; su propósito de cambiar/alternar falla podía destacarse más en ambos flujos.

### Solución

- Se cambió el texto visible y accesible a «Cambiar Falla» en BAT y MTF.
- Se añadió un SVG decorativo de intercambio horizontal, oculto a lectores de pantalla porque el texto ya nombra la acción.
- El icono rota al pasar el puntero por el botón; el efecto usa solo `transform` y se desactiva con `prefers-reduced-motion`.
- Se conservó la flecha de despliegue MTF y el comportamiento existente de ambos controles.

### Archivos modificados

- `index.html` — markup de los dos controles y estilos del icono/estado hover.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Funciones o secciones afectadas

- `#bat-selection-toggle` y `#mtf-selection-toggle`.
- CSS `.catalog-selection-toggle`, `.catalog-selection-action` y `.catalog-selection-icon`.
- Sin cambios a listeners o funciones JavaScript.

### Impacto

Solo presentación y texto de los controles para cambiar de falla BAT/MTF. El catálogo sigue expandiendo/colapsando igual que antes.

### Validaciones realizadas

- Inspección estática de ambos controles, IDs, atributos accesibles y listeners existentes.
- `git diff --check` limpio.
- No se comprobó el efecto hover visualmente en navegador.

### Resultado

Ambos controles muestran «Cambiar Falla» con icono de intercambio; el icono tiene una respuesta hover respetuosa con movimiento reducido.

### Pendientes

- Confirmar visualmente alineación/tamaño en escritorio y móvil.

### Riesgos

- La rotación podría no activarse en dispositivos exclusivamente táctiles; el texto y el icono quedan visibles como affordance estática.

## 41. 2026-10-15 — Suavizar el verde de las fichas de diagnóstico

### Fecha

2026-10-15.

### Solicitud

Evaluar y aplicar un verde más elegante y sutil en las tablas/paneles BAT y MTF, reduciendo el protagonismo del verde actual.

### Objetivo

Conservar la identidad verde del sistema y la legibilidad, pero bajar la saturación visual de encabezados, bordes y paso activo.

### Estado anterior

Los paneles de detalle y el paso activo usaban los tokens `primary` y `primary-container`, de mayor viveza. El modo oscuro ya definía variantes semánticas `secondary`/`on-secondary` y sus contenedores.

### Análisis

- Se releeron las reglas, contexto e historial FFDIGI antes de editar; se revisó el estado Git para preservar los cambios locales existentes.
- Se inspeccionaron los tokens de tema claro/oscuro y los selectores de las fichas de diagnóstico.
- Los tokens secundarios ofrecen pares fondo/texto coordinados por tema; el cambio CSS puede limitarse a las fichas sin alterar el verde global o los catálogos.

### Causa / necesidad

El color primario ocupaba áreas grandes (encabezados y acentos) y podía competir con la lectura del contenido técnico.

### Solución

- Se cambió el fondo de los encabezados de las tres tarjetas y el borde superior a `secondary`, con texto `on-secondary`.
- Se usaron acentos secundarios en metadatos, kicker de validación, número de paso BAT y paso MTF activo.
- Se atenuó el halo verde del paso activo usando el mismo token semántico.
- El rojo que destaca el nombre/código de la falla seleccionada se conservó.
- Los tokens se ajustan al modo claro/oscuro existente. Catálogos, barra, botones fuera de las fichas, procedimientos y diagramas no se modificaron.

### Archivos modificados

- `index.html` — colores CSS acotados a las fichas BAT/MTF.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Funciones o secciones afectadas

- Encabezados `.bento-block-heading` y contornos superiores de `.bento-block-1/2/3`.
- Metadatos, etiquetas de validación, número de paso y estados activos.
- Sin cambios JavaScript.

### Impacto

Solo apariencia de los paneles de detalle BAT/MTF. Se conserva el comportamiento, la jerarquía, el contraste semántico y el resaltado rojo de la falla.

### Validaciones realizadas

- Revisión estática de los tokens `secondary`/`on-secondary` en ambas paletas.
- `git diff --check` limpio.
- No se confirmó visualmente en navegador; quedan pendiente escritorio, móvil y tema oscuro.

### Resultado

El verde intenso de las superficies diagnósticas queda sustituido por el verde salvia semántico ya definido para claro/oscuro.

### Pendientes

- Revisar visualmente saturación y contraste en claro y oscuro cuando la página esté disponible en navegador permitido.

### Riesgos

- El verde secundario del modo oscuro es más claro que su equivalente en modo claro por diseño; validar que el peso visual permanezca equilibrado al cambiar de tema.

## 42. 2026-10-15 — Restaurar verde primario y centrar contador de validación

### Fecha

2026-10-15.

### Solicitud

Revertir el verde salvia aplicado a los paneles y centrar el rótulo «Validación N de total» dentro del recuadro.

### Objetivo

Recuperar el verde original de las fichas y dar una alineación central al contador de validación BAT/MTF.

### Estado anterior

Los encabezados y acentos de las fichas usaban el token secundario salvia. El texto del contador conservaba alineación inicial dentro de su banda.

### Análisis

- Se releyeron reglas, contexto e historial antes de editar; se inspeccionaron la plantilla MTF y el contador BAT.
- La solicitud se limita a revertir las declaraciones cromáticas añadidas en la intervención anterior, no a revertir estilos previos (resaltado rojo, contornos ni icono de cambio de falla).
- `.m3-step-kicker` se utiliza para el contador de paso tanto en BAT como en MTF; centrar su texto sirve a ambos sin tocar renderizado.

### Causa / necesidad

El verde más apagado no correspondió a la preferencia visual del usuario; además, el contador de validación quedaba alineado hacia una esquina.

### Solución

- Se restauraron los tokens `primary`/`on-primary` originales en encabezados, acentos y estado activo.
- Se añadió `text-align: center` al recuadro `.m3-step-kicker`.
- Se preservaron los demás cambios de interfaz ajenos a la paleta revertida.

### Archivos modificados

- `index.html` — restauración de color primario y alineación del contador.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Funciones o secciones afectadas

- CSS de encabezados, metadatos, secuencias y estado activo de las fichas BAT/MTF.
- CSS de `.m3-step-kicker` para centrar el rótulo.
- Sin cambios JavaScript.

### Impacto

Recupera el verde de las fichas anterior al intento salvia; el contador de validación queda centrado. El resaltado rojo de la falla activa se conserva.

### Validaciones realizadas

- Revisión estática de tokens restaurados y uso compartido del selector de contador.
- Comprobación de llaves CSS y `git diff --check`.
- No se confirmó visualmente en navegador.

### Resultado

Los paneles vuelven al verde primario anterior y «Validación N de total» se alinea al centro de su recuadro.

### Pendientes

- Confirmar visualmente la alineación en BAT, MTF, escritorio y móvil.

### Riesgos

- La longitud variable de «Validación N de total» puede ocupar varias líneas en pantallas estrechas; el centrado no modifica su ajuste de línea.

## 43. 2026-10-15 — Piloto de reporte de intervención MTF para FLA-04

### Fecha

2026-10-15.

### Solicitud

Probar con una sola falla MTF un reporte de intervención comparable en propósito al reporte BAT: identificar el nodo y analista, registrar los pasos realmente ejecutados y dónde pasó, AC Cycle si se usó, RCA/RGC, retest, daño físico y evidencia, y generar un PDF para revisión.

### Objetivo

Entregar una primera versión aislada para `FLA-04 · ERROR: POST failed to complete; timeout`, para evaluar el flujo antes de considerar otras fallas.

### Estado anterior

- `printMtfReport` imprimía datos fuente y pasos del procedimiento, pero no capturaba una intervención real por nodo.
- El reporte BAT usa otro estado/formulario y no se debía alterar para este piloto.
- Hay descripciones/códigos repetidos en MTF; `FLA-10` muestra el mismo nombre pero es un registro diferente.

### Análisis

- Se revisaron `AGENTS.md`, `CONTEXTO_FFDIGI.md`, `HISTORIAL_CAMBIOS_FFDIGI.md`, la falla base y el renderizador `getActiveSteps`, el directorio disponible de analistas, `printBatReport`, `printMtfReport`, `openPrintDialog` y las reglas `@media print`.
- Se confirmó la identidad del registro objetivo: estación `FLA`, id `FLA-04`, código `020023006_001`, descripción exacta `ERROR: POST failed to complete; timeout`, pasos fuente y flujo `Flowchart 14`.
- El código también contiene `FLA-10` con el mismo nombre, pero código distinto. `FLA-02` comparte el código `020023006_001`, pero tiene otra descripción. Por eso el acceso requiere coincidencia simultánea de id, estación, código y descripción.
- Los pasos activos pueden variar; se consumen mediante `FFDG.ui.getActiveSteps`, sin editar el procedimiento ni el diagrama.

### Causa / necesidad

El reporte MTF existente describe el procedimiento disponible, no qué hizo una persona sobre un serial particular ni el resultado del retest. Hacía falta separar los datos declarados de intervención de la guía técnica y limitar la prueba a una identidad inequívoca.

### Solución

- Se añadió el botón `Realizar reporte de falla`, visible solo al seleccionar el registro exacto FLA-04.
- El diálogo captura S/N, P/N, número de empleado y analista (autocompleta con el directorio local conocido; mantiene edición manual), pasos marcados como ejecutados desde el procedimiento activo, AC Cycle como acción adicional, resultado de la falla, paso donde pasó, resultado del retest, acciones, RCA, RGC, daño físico/detalle y hasta cuatro evidencias de imagen (8 MB máx. cada una).
- Cuando se declara «Resuelta», se requiere indicar un paso marcado o AC Cycle marcado como adicional y retest en `Pass`. El selector de paso se genera desde la secuencia activa; no codifica los pasos FLA-04.
- Se agregó una plantilla de impresión separada `mtf-case` con identificación, acciones/pasos, causas, fotos, firma del analista y espacio de firma/nombre de Calidad sin asignar persona.
- Se declara en la interfaz y pie del documento que la guía permanece intacta, que la captura no persiste ni se transmite, que es un resultado reportado por el analista y no libera automáticamente el nodo.
- `printMtfReport`, `printBatReport`, los datos de falla, los flowcharts y el catálogo no se modificaron funcionalmente.

### Archivos modificados

- `index.html` — botón condicional, diálogo accesible, controles de captura, generador de reporte y estilos de impresión aislados.
- `CONTEXTO_FFDIGI.md` — alcance actual del piloto, datos capturados, persistencia y límites de impresión.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `renderMtfDetail` — oculta/muestra el CTA según la identidad completa de FLA-04.
- `FFDG.reports.isMtfCasePilot`, `openMtfCaseReport`, `submitMtfCaseReport` y `renderMtfCaseField` — armado del formulario y su impresión.
- `openPrintDialog` — reutilizado con el modo separado `mtf-case`.
- `#mtf-case-report-dialog`, `#mtf-case-print-report` y CSS `@media print` — captura modal e impresión del piloto.

### Impacto

Solo el detalle MTF del registro FLA-04 recibe el CTA. El flujo normal de selección, secuencia, diagrama, reporte de procedimiento MTF y reporte BAT permanece sin cambios. Los archivos seleccionados como evidencia se leen en memoria del navegador solo al preparar la impresión; no se suben ni se guardan en catálogo/servidor.

### Validaciones realizadas

- Comprobación de sintaxis: siete bloques JavaScript inline clásicos y un bloque `type="module"`; todos pasaron.
- `git diff --check`; pasó.
- Inspección del gate de cuatro campos de identidad, uso dinámico de pasos, comprobación de coherencia para «Resuelta», cota de archivos adjuntos y selector de impresión aislado.
- No se ejecutó la página ni se validó visualmente el diálogo, la impresión o la paginación en navegador. La exportación PDF real queda pendiente de comprobar en impresión del navegador.

### Resultado

El piloto de captura e impresión quedó implementado en código para la falla FLA-04 exacta; el usuario podrá guardar como PDF desde el diálogo del navegador después de capturar el caso.

### Pendientes

- Revisar en navegador el modal, autocompletado, validaciones, foto, impresión A4 y paginación con entradas cortas/largas antes de considerar el formato aprobado.
- Confirmar el significado interno esperado de `RGC` si se desea cambiar o ampliar su etiqueta.
- La captura se pierde al cerrar o recargar; persistencia/historial requieren una solicitud y diseño separados.

### Riesgos

- Los datos capturados son declaraciones manuales; el formulario no autentica al analista ni verifica el resultado real del retest.
- La longitud del texto o de las fotos puede producir varias páginas; no afirmar «una hoja» hasta probar impresión real.
- La firma de Calidad permanece en blanco intencionalmente, sin asignar el nombre del reporte BAT.

## 44. 2026-10-15 — Simplificar reporte MTF y separar evidencia antes/después

### Fecha

2026-10-15.

### Solicitud

Retirar el campo RGF/RGC y el apartado de daño físico; colocar Intervención/acciones junto a RCA; agregar controles separados para evidencia antes y después de las acciones; corregir el botón que no abría la impresión del reporte.

### Objetivo

Hacer la captura del piloto FLA-04 más clara para comparar el estado inicial del nodo con el resultado posterior y que el clic de generar mantenga la activación necesaria para abrir la impresión.

### Estado anterior

- El formulario tenía un campo RGC, un selector de daño físico, un detalle de daño y una sola entrada genérica de fotos.
- La función de envío era `async`: esperaba la lectura de imágenes con `FileReader`, cerraba el diálogo y llamaba el helper, que difería `window.print()` a `requestAnimationFrame`.
- La aplicación no descarga un PDF automáticamente; el archivo se crea al elegir «Guardar como PDF» en la interfaz de impresión del navegador.

### Análisis

- Se releyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md`, `HISTORIAL_CAMBIOS_FFDIGI.md`, la forma HTML del diálogo y plantilla, el generador MTF y las reglas `@media print`.
- El clic de impresión no pudo reproducirse visualmente: la automatización del navegador falló al inicializar su kernel con error de ruta. Se inspeccionó el flujo real del código y se identificó una causa probable: `await FileReader` y `requestAnimationFrame` podían sacar la llamada de impresión del gesto directo de envío.
- El usuario se refirió a `RGF`; el formulario vigente llevaba el rótulo `RGC`, así que se eliminó ese campo por correspondencia contextual. No se interpretó ni expandió el acrónimo.

### Causa / necesidad

La entrada genérica no distinguía la condición previa de la posterior. Además, la secuencia asíncrona posponía la llamada nativa de impresión hasta después de resolver archivos y cerrar el diálogo; eso podía impedir que el navegador presentara el flujo de impresión activado por el clic.

### Solución

- Se quitaron RGC y todos los campos/valores del apartado de daño físico del diálogo y del PDF piloto.
- Se dejó una sola caja `Intervención / acciones realizadas` y RCA, en paralelo en escritorio y apiladas en pantallas estrechas.
- Se agregaron dos tarjetas con botones independientes: `Antes de aplicar acciones` y `Después de aplicar acciones`. Cada selector admite imágenes, muestra miniaturas/nombres, permite quitar imágenes y comparten el límite de cuatro imágenes, 8 MB por archivo.
- Intervención/acciones y RCA también quedan en dos columnas en la ficha imprimible, para conservar la misma jerarquía visual del formulario.
- La carga/decodificación de imágenes ocurre al elegirlas; el botón de generar queda deshabilitado mientras se preparan. El submit dejó de ser async y llama a `window.print()` directamente, sin `requestAnimationFrame`, tras cerrar el modal.
- Se añadió un aviso explícito: no hay descarga directa; en el cuadro de impresión hay que elegir `Guardar como PDF`. La imagen se elimina de memoria y se limpia la plantilla al terminar el ciclo `afterprint`.
- Se conserva la plantilla MTF/BAT general, catálogo y FLA-04 exacta. El usuario aún debe revisar el diálogo del navegador y confirmar Guardar como PDF.

### Archivos modificados

- `index.html` — diálogo, preview/validación de evidencia, controlador de impresión síncrona, salida de impresión y estilos responsivos.
- `CONTEXTO_FFDIGI.md` — descripción vigente del formulario e impresión del piloto.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `openMtfCaseReport` — reinicia controles/estados locales de evidencia.
- `updateMtfCaseEvidence`, `renderMtfCaseEvidencePreview`, `clearMtfCaseEvidence` — lectura previa, previsualización, eliminación y limpieza en memoria.
- `submitMtfCaseReport` — ya no espera archivos; prepara secciones comparativas y llama la impresión en el mismo gesto.
- `openPrintDialog` — acepta una opción local para invocación síncrona; otros modos mantienen el comportamiento previo.
- `#mtf-case-report-dialog`, `#mtf-case-print-report` y CSS responsivo/de impresión.

### Impacto

Solo cambia el piloto FLA-04. Los adjuntos son locales al navegador; no se suben ni persisten. El flujo BAT y el reporte general MTF no cambian. La impresión del navegador sigue requiriendo que el usuario escoja el destino PDF y confirme el guardado.

### Validaciones realizadas

- Pasaron los siete bloques JavaScript clásicos y el módulo inline con `node`.
- Pasó `git diff --check`; bloques CSS balanceados.
- Comprobación estática de identidad exacta FLA-04 frente a FLA-10/FLA-02; selectores y salidas Antes/Después presentes; se comprobó que no quedaron campos ni bindings RGC/daño/evidencia genérica.
- Comprobación estática de campos únicos `actions`/`rca` y de que `submitMtfCaseReport` no contiene `await` y solicita impresión síncrona mediante el helper.
- El navegador/CUA no se pudo inicializar; no se probó visualmente que el diálogo del sistema aparezca, ni la captura real de fotos o la impresión final.

### Resultado

El formulario piloto queda simplificado con evidencia comparativa antes/después y una ruta de impresión síncrona desde el clic. La generación final depende de aceptar «Guardar como PDF» en el navegador.

### Pendientes

- Probar en el navegador de escritorio la ventana de impresión y guardar un caso real de FLA-04 como PDF.
- Revisar visualmente miniaturas, navegación por teclado, mobile stacking y paginación con fotos/textos largos.

### Riesgos

- No se puede detectar de forma fiable desde la página si el usuario guardó o canceló el PDF del diálogo nativo.
- Si el entorno incrustado bloquea `window.print()`, el usuario necesitará abrir la página en un navegador que permita impresión; no se implementó una biblioteca PDF de descarga directa.
- Las fotos incrementan el tamaño del PDF y pueden llevar el reporte a más de una página.

## 45. 2026-10-17 — Retirar el botón de actualización Excel de MTF

### Fecha

2026-10-17.

### Solicitud

Quitar de la sección MTF el botón «Actualizar Excel FFDG».

### Objetivo

Eliminar ese control de la barra MTF sin alterar el catálogo, sus datos ni los demás controles.

### Estado anterior

La barra MTF mostraba un botón que abría el selector de archivos Excel y llamaba a `loadExcelFile` para importar el workbook.

### Análisis

- Se revisaron `AGENTS.md`, `CONTEXTO_FFDIGI.md`, `HISTORIAL_CAMBIOS_FFDIGI.md` y los consumidores del input `excel-file-input`.
- El control estaba limitado al markup de la barra MTF; su listener dependía de ese input. BAT no usaba este input.
- El parser y `loadExcelFile` permanecen en el código; el reinicio del input puede ser opcional cuando no existe el control.

### Causa / necesidad

El usuario pidió retirar el botón de importación Excel de la sección MTF.

### Solución

- Se quitó el label «Actualizar Excel FFDG» y su input oculto de la barra MTF.
- Se retiró el listener del input eliminado para evitar una referencia a un elemento inexistente al iniciar la página.
- Se hizo opcional el reinicio del input al final de `loadExcelFile`.
- Se conservaron el parser, el botón de PDF, el control de tema y el resto de los flujos.
- Se actualizó la documentación para reflejar que la interfaz MTF ya no ofrece un selector visible de Excel.

### Archivos modificados

- `index.html` — markup del toolbar MTF, listener y reinicio del input Excel.
- `CONTEXTO_FFDIGI.md` — descripción del estado de importación MTF.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de este cambio.

### Funciones o secciones afectadas

- `#mtf-layout .mtf-row-1-actions` — botón e input de Excel retirados.
- Listener de `excel-file-input` retirado; `loadExcelFile` queda sin disparador desde la interfaz y tolera que el input no exista.

### Impacto

El usuario ya no puede seleccionar un workbook desde el botón de la barra MTF. El importador BAT, los datos/catálogos, el control «Actualizar PDF FFDG» y los reportes no cambian.

### Validaciones realizadas

- Comprobación estática: no queda el botón, el input ni su listener en `index.html`.
- Revisión estática: se conservan los controles de tema y PDF de la barra MTF; el reinicio del input es condicional.
- No se ejecutó la aplicación ni una prueba visual en navegador.

### Resultado

La barra MTF ya no muestra «Actualizar Excel FFDG» y no registra un listener para el input eliminado.

### Pendientes

- Ninguno para el retiro del botón.

### Riesgos

- La importación Excel MTF deja de estar accesible desde la interfaz mientras no se agregue otra vía de selección.

## 46. 2026-10-17 — Documentar el proyecto en README

### Fecha

2026-10-17.

### Solicitud

Preparar un README detallado que explique de qué trata el proyecto.

### Objetivo

Dar a quien abra el repositorio una descripción clara del propósito, los flujos BAT/MTF, la arquitectura, el uso local, las limitaciones actuales y las reglas de mantenimiento.

### Estado anterior

El repositorio no tenía un README en su raíz. La información del proyecto se repartía entre el código, `CONTEXTO_FFDIGI.md`, `HISTORIAL_CAMBIOS_FFDIGI.md` y `AGENTS.md`.

### Análisis

- Se revisaron las instrucciones del repositorio, el contexto técnico, el historial, la estructura versionada y las referencias de scripts/recursos de `index.html`.
- Se separaron las funciones existentes de las limitaciones actuales: el selector PDF de MTF no importa; el botón Excel MTF fue retirado; el piloto de reporte de intervención está limitado a FLA-04.
- Se documentó el arranque mediante servidor HTTP local y se aclaró que no genera una publicación ni una carpeta `dist`.

### Causa / necesidad

Una persona que llegue al repositorio necesita entender qué resuelve la página, qué datos usa, qué no hace y cómo abrirla localmente antes de modificarla.

### Solución

- Se agregó `README.md` en español con propósito, flujos BAT y MTF, límites de importación, reportes, almacenamiento local, dependencias, estructura, ejecución local y guía para contribuciones.
- Se describió el estado real del botón Excel MTF y el selector PDF MTF para no presentar controles incompletos como funciones activas.
- Se incluyeron las claves de almacenamiento local verificadas y la ausencia documentada de una suite automatizada.

### Archivos modificados

- `README.md` — documentación principal de uso y desarrollo.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Funciones o secciones afectadas

- Documentación del proyecto; sin cambios de código ni comportamiento de la aplicación.

### Impacto

Mejora la orientación de usuarios y personas que mantienen el proyecto. No altera la página, los catálogos, los importadores ni los reportes.

### Validaciones realizadas

- Revisión estática de rutas, nombres de archivos y comportamiento descrito frente al árbol actual y al código de `index.html`.
- No se ejecutó la aplicación ni una prueba automatizada.

### Resultado

El repositorio cuenta con una guía principal detallada que distingue las capacidades implementadas de las limitaciones y especifica cómo abrir el sitio solo de forma local.

### Pendientes

- Mantener el README alineado con cambios futuros de interfaz, datos y ejecución.

### Riesgos

- La información de procedimientos depende de manuales/workbooks externos que no están versionados en el repositorio; actualizarla requiere revisar la fuente aplicable.

## 47. 2026-10-17 — Mantener README al día

### Fecha

2026-10-17.

### Solicitud

Asegurar que el README se actualice con cada modificación del proyecto y subirlo al repositorio designado con autor gabo.

### Objetivo

Dejar explícita la regla de mantenimiento de README para que las instrucciones y capacidades documentadas sigan alineadas con el código.

### Estado anterior

El README describía cómo documentar historial y contexto técnico, pero no indicaba que debía revisarse y actualizarse en cada modificación.

### Análisis

- Se comprobó que el repositorio designado es `gabo566/FFDIGI-FA-BAT`, rama `main`.
- Se verificó que el commit anterior de README registra como autor y committer a `gabo566`.
- El cambio es documental y no altera la aplicación.

### Causa / necesidad

El usuario solicitó que README se mantenga actualizado en cada modificación del proyecto.

### Solución

- Se agregó a las instrucciones de desarrollo la regla de actualizar README en cada modificación y comprobar su vigencia cuando no requiera cambios textuales.
- Se mantuvo el destino en el repositorio de gabo y se creó el commit mediante la identidad conectada de `gabo566`.

### Archivos modificados

- `README.md` — regla permanente de mantenimiento documental.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta intervención.

### Funciones o secciones afectadas

- Sección «Desarrollo y cambios» de README.

### Impacto

Fija una pauta para mantener la documentación principal alineada en cambios futuros. No cambia la interfaz ni el comportamiento de BAT o MTF.

### Validaciones realizadas

- Revisión estática del texto añadido y del destino de rama.
- No se ejecutó la aplicación ni pruebas; no hay cambios de código funcional.

### Resultado

README indica que debe actualizarse y revisarse con cada modificación del proyecto.

### Pendientes

- Aplicar esta regla en cambios posteriores.

### Riesgos

- La precisión de README dependerá de revisar el comportamiento real en cada cambio y no copiar descripciones antiguas sin verificarlas.

## 48. 2026-10-18 — Resaltar fallas y pasos con rojo

### Fecha

2026-10-18.

### Solicitud

Oscurecer el rojo del resaltado de la falla y hacer que brillen en rojo los botones/pasos.

### Objetivo

Hacer más visible la falla seleccionada y destacar visualmente el paso actual en BAT y MTF.

### Estado anterior

El título de la falla usaba un contenedor rojo claro dependiente del tema. El paso BAT y el botón activo del stepper MTF tenían un pulso verde.

### Análisis

- Se confirmó que los títulos BAT y MTF comparten el selector de resaltado.
- Los pasos BAT se representan como elementos de una secuencia; el stepper MTF crea botones `.m3-step-pill` y marca el paso vigente con `.active`.
- El estilo debía conservar contraste en temas claro/oscuro y respetar `prefers-reduced-motion`.

### Causa / necesidad

El usuario pidió un rojo más oscuro para la falla y brillo rojo para los pasos.

### Solución

- Se aplicó fondo rojo oscuro y texto blanco a los títulos de falla BAT/MTF.
- Se cambió a rojo el pulso visual de la secuencia BAT y del botón activo de MTF; el botón activo también usa fondo rojo oscuro.
- Se cambió a rojo el número de cada paso BAT.
- Se conservaron los estilos de animación reducida.

### Archivos modificados

- `index.html` — resaltado del título, números de paso y estilos de brillo.
- `README.md` — descripción de la apariencia de fallas y pasos.
- `CONTEXTO_FFDIGI.md` — decisión visual a conservar.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de este cambio.

### Funciones o secciones afectadas

- `#bat-detail-title` y `#mtf-detail-title`.
- `#bat-failure-detail .bat-detail-sequence li` y `#mtf-detail .m3-step-pill.active`.
- Animación `ffdig-active-step-red-glow`.

### Impacto

Cambio visual en el detalle BAT y MTF. No modifica lógica, datos, navegación, diagramas ni reportes.

### Validaciones realizadas

- Revisión estática de selectores, colores, texto de contraste y selector de movimiento reducido.
- No se ejecutó la página ni se comprobó visualmente en navegador.

### Resultado

La falla activa queda marcada con rojo oscuro y el paso seleccionado usa un resplandor rojo animado.

### Pendientes

- Revisar la intensidad visual en ambos temas y en móvil/escritorio en navegador.

### Riesgos

- El rojo tiene una asociación visual fuerte con error; aquí se limita al identificador de la falla y al paso activo para conservar su énfasis.

## 49. 2026-10-18 — Centrar fallas de la tabla BAT roja

### Fecha

2026-10-18.

### Solicitud

Centrar las fallas de la tabla BAT con fondo rojo.

### Objetivo

Alinear al centro el contenido de cada tarjeta en la columna No Boot, cuyo encabezado usa fondo rojo, sin modificar las demás columnas del tablero.

### Estado anterior

Las tarjetas de No Boot podían mostrar algunos campos con alineación inicial; el nombre ya tenía un estilo de centrado, mientras el código y la familia no compartían una regla específica para esa columna.

### Análisis

- El tablero BAT crea una columna con `data-st="NOBOOT"` y tarjetas `.bd-item` con tres campos: código, nombre y familia.
- La columna MTF también reutiliza `.bd-item`; por eso el ajuste debe quedar limitado a `#bat-board` y a `NOBOOT`.
- Las reglas responsive existentes ajustan el tamaño de las tarjetas; la nueva alineación no requiere cambiar sus dimensiones ni el flujo de selección.

### Causa / necesidad

El contenido de las fallas de la tabla roja no quedaba centrado de forma uniforme.

### Solución

- Se centraron el código, el nombre y la familia dentro de cada tarjeta No Boot.
- Se limitó el selector a la columna roja BAT para conservar el resto de las columnas y el tablero MTF.
- Se documentó la alineación en README y en el contexto técnico.

### Archivos modificados

- `index.html` — regla de alineación para las tarjetas BAT No Boot.
- `README.md` — descripción de la presentación del tablero BAT.
- `CONTEXTO_FFDIGI.md` — comportamiento visual a conservar.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de este cambio.

### Funciones o secciones afectadas

- `#bat-board .bd-col[data-st="NOBOOT"] .bd-item` y sus campos `b`, `span` y `small`.

### Impacto

Solo cambia la alineación del contenido de las tarjetas No Boot en BAT. MTF, las demás familias, el catálogo y la selección permanecen sin cambios.

### Validaciones realizadas

- Comprobación estática de que el selector está limitado a BAT y a `NOBOOT`.
- Comprobación estática de que código, nombre y familia usan alineación centrada.
- No se ejecutó la aplicación ni una prueba visual en navegador.

### Resultado

Los tres campos de cada falla de la columna roja BAT quedan centrados dentro de su tarjeta.

### Pendientes

- Confirmar visualmente en escritorio y móvil cuando se abra la página en navegador.

### Riesgos

- La descripción puede ocupar varias líneas; permanece centrada y conserva el ajuste de texto existente.

## 50. 2026-10-18 — Centrar el título rojo de falla BAT

### Fecha

2026-10-18.

### Solicitud

Centrar el texto del encabezado rojo que identifica la falla BAT, como «NDBG_081 · PDB FRU EEPROM».

### Objetivo

Alinear el identificador y nombre de la falla en el centro de la banda roja del detalle BAT.

### Estado anterior

El título `#bat-detail-title` tenía fondo rojo oscuro y texto blanco, pero conservaba alineación a la izquierda. La alineación también se había aplicado por error a la columna No Boot del tablero.

### Análisis

- La captura compartida identifica el encabezado del detalle BAT como el elemento que debe centrarse.
- El título MTF ya cuenta con alineación central mediante estilos existentes; el ajuste nuevo debe apuntar solo al título BAT.
- La regla previa de centrado de tarjetas No Boot no correspondía a la captura y se debe retirar.

### Causa / necesidad

La falla destacada en rojo no estaba centrada dentro de su banda.

### Solución

- Se añadió `text-align: center` a `#bat-failure-detail #bat-detail-title`.
- Se eliminó la regla de alineación añadida por error a las tarjetas No Boot y se corrigieron README/contexto.
- Se conservaron el fondo rojo oscuro, el contraste y el resaltado MTF.

### Archivos modificados

- `index.html` — alineación del título BAT y retiro de la regla No Boot.
- `README.md` — descripción del título centrado; se eliminó la nota incorrecta de No Boot.
- `CONTEXTO_FFDIGI.md` — decisión visual actualizada.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta corrección.

### Funciones o secciones afectadas

- `#bat-failure-detail #bat-detail-title`.
- Se quitó `#bat-board .bd-col[data-st="NOBOOT"] .bd-item`.

### Impacto

El texto del título BAT queda centrado. La disposición original de las tarjetas No Boot se restaura; MTF y las demás tarjetas no cambian.

### Validaciones realizadas

- Comprobación estática del selector BAT y de la regla `text-align: center`.
- Comprobación estática de que ya no existe el ajuste de centrado de No Boot.
- No se ejecutó la página ni se comprobó visualmente en navegador.

### Resultado

El encabezado de falla BAT centra el código y el nombre sobre la banda roja oscura.

### Pendientes

- Confirmar visualmente el centrado con nombres de distinta longitud y en tamaños de pantalla diferentes.

### Riesgos

- Los títulos extensos pueden ocupar varias líneas; permanecen centrados y conservan el ajuste de texto actual.

## 51. 2026-10-18 — Fijar el orden de estaciones MTF

### Fecha

2026-10-18.

### Solicitud

Presentar las estaciones MTF en el orden indicado: FLA, PRET, FLB, AST, FTS, IOT, FCT, RIN, T_VI, OBA y PACKING.

### Objetivo

Mantener posiciones estables aunque una estación tenga más fallas que otra o cambie el conteo del catálogo.

### Estado anterior

El tablero agrupaba por estación, pero ordenaba primero por cantidad descendente y usaba un orden manual solo como desempate. La lista manual incluía FLC y NVL y no incluía T_VI ni PACKING.

### Análisis

- El orden y la comparación viven en `buildBoard` del módulo de tablero MTF en `index.html`.
- Los encabezados calculan el conteo desde los casos visibles; el conteo no debe determinar la posición de la estación.
- El código parte de las estaciones que están presentes y debe conservar las adicionales que no figuren en la secuencia solicitada.

### Causa / necesidad

Las estaciones cambiaban de posición al variar el número de fallas, y el usuario definió una secuencia fija de presentación.

### Solución

- Se reemplazó el orden manual con FLA, PRET, FLB, AST, FTS, IOT, FCT, RIN, T_VI, OBA y PACKING.
- Se priorizó la posición manual por encima del número de fallas; las estaciones no listadas se conservan al final por orden alfabético.
- Se actualizaron README y el contexto técnico con la secuencia y el comportamiento de los grupos restantes.

### Archivos modificados

- `index.html` — orden manual y comparador de columnas del tablero MTF.
- `README.md` — orden fijo de estaciones.
- `CONTEXTO_FFDIGI.md` — comportamiento del tablero MTF.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de este cambio.

### Funciones o secciones afectadas

- `buildBoard` y el comparador de `orderedGroups` en el script del tablero MTF.

### Impacto

Solo cambia el orden de las columnas en la vista Tablero MTF. Los datos, conteos, filtros, lista técnica, mosaico y BAT permanecen sin cambios.

### Validaciones realizadas

- Comprobación estática de la secuencia exacta y del comparador por prioridad, con orden alfabético para grupos adicionales.
- No se ejecutó la aplicación ni se comprobó visualmente en navegador.

### Resultado

La vista Tablero presenta primero las estaciones en el orden solicitado, de manera independiente al número de fallas por estación.

### Pendientes

- Confirmar la distribución visual en la página con todos los grupos disponibles.

### Riesgos

- Las estaciones adicionales fuera de la secuencia solicitada aparecerán al final en orden alfabético hasta que se indique una posición específica.


## 52. 2026-10-18 — Ampliar detalle MTF al seleccionar una falla

### Fecha

2026-10-18.

### Solicitud

Al seleccionar cualquier falla MTF, hacer que la tabla/descripción abarque la mayor parte posible de la pantalla, ocultando los logotipos, la búsqueda y los controles de selección BAT/MTF.

### Objetivo

Dar más espacio al procedimiento y a la información del caso seleccionado, con una forma clara de volver al catálogo.

### Estado anterior

MTF contraía el catálogo al seleccionar una falla, pero conservaba la barra superior, la navegación BAT/MTF y controles de búsqueda. El detalle ampliado se activaba solo en escritorio y su altura descontaba el espacio de la cabecera.

### Análisis

- La selección común de fallas MTF se realiza en `selectMtfFault`; el tablero y las tarjetas convergen en esa función.
- `setMtfCatalogCollapsed` controla la apertura del detalle y la acción «Cambiar Falla».
- Para aprovechar el viewport sin perder el retorno al catálogo, la acción para cambiar falla permanece disponible y se ocultan la búsqueda y controles que no son necesarios mientras se lee el detalle.
- En pantallas estrechas, las columnas del detalle se apilan y el área usa desplazamiento propio para conservar acceso a todo el contenido.

### Causa / necesidad

La barra y la búsqueda reducían el espacio vertical disponible para leer la descripción y los pasos técnicos.

### Solución

- Se activó un modo de enfoque de MTF al seleccionar cualquier falla, sin límite de ancho de pantalla.
- Se ocultaron la barra superior con logotipos, el selector BAT/MTF, la búsqueda y los controles de la barra MTF.
- El panel de detalle se extiende por el viewport; en escritorio conserva tres columnas y en pantallas estrechas apila los paneles.
- Se mantuvo «Cambiar Falla» como acceso para volver a la lista.
- El modo se desactiva al volver al catálogo o cambiar a BAT.
- Se actualizó README y el contexto técnico.

### Archivos modificados

- `index.html` — activación del modo enfocado y reglas responsive.
- `README.md` — comportamiento al seleccionar fallas MTF.
- `CONTEXTO_FFDIGI.md` — decisión de presentación.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de este cambio.

### Funciones o secciones afectadas

- `selectMtfFault`, `setMtfCatalogCollapsed` y `setMode`.
- Modo visual `body.mtf-detail-focus` y layout `#mtf-layout`.

### Impacto

Aumenta el espacio para la ficha y los pasos MTF al ocultar elementos de navegación y búsqueda durante la lectura. BAT no cambia. Se conserva un control para cambiar de falla.

### Validaciones realizadas

- Comprobación estática de que la selección activa el modo enfocado, el retorno al catálogo lo retira y el cambio a BAT limpia el modo.
- Comprobación estática de las reglas de pantalla amplia, apilado en pantallas estrechas y disponibilidad de «Cambiar Falla».
- No se ejecutó la aplicación ni se comprobó visualmente en navegador.

### Resultado

Al seleccionar cualquier falla MTF, el detalle ocupa el viewport disponible y los controles superiores dejan de ocupar espacio.

### Pendientes

- Confirmar visualmente la distribución en escritorio, tableta y móvil y revisar navegación por teclado en navegador.

### Riesgos

- En ventanas de poca altura, el detalle y sus paneles requieren desplazamiento; no se elimina contenido técnico.


## 53. 2026-10-18 — Conservar acceso a «Cambiar Falla» en el detalle ampliado

### Fecha

2026-10-18.

### Solicitud

Mantener disponible el control para regresar al catálogo en el modo MTF de pantalla amplia.

### Objetivo

Evitar que la ampliación del detalle oculte la acción de navegación que permite seleccionar otra falla.

### Estado anterior

El contenedor de «Cambiar Falla» está dentro de `.mtf-row-2-header`. La primera regla de pantalla amplia ocultaba ese encabezado junto con sus controles secundarios, ocultando también el botón.

### Análisis y solución

- Se conserva visible el contenedor del encabezado en posición flotante sobre el detalle.
- Se ocultan solo el título, el diseño y las notificaciones; el botón «Cambiar Falla» queda disponible.
- README y el contexto técnico se revisaron y siguen describiendo el comportamiento esperado; no requieren cambios de texto.

### Archivos modificados

- `index.html` — posicionamiento del botón de retorno en modo de enfoque.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta corrección.

### Validaciones realizadas

- Comprobación estática de que el contenedor permanece visible y sus controles secundarios se ocultan individualmente.
- No se ejecutó la aplicación ni una prueba visual en navegador.

### Resultado

La vista MTF ampliada conserva el acceso «Cambiar Falla» en la esquina superior derecha.

### Pendientes y riesgos

- Confirmar visualmente su posición en escritorio, tableta y móvil; el botón se mantiene dentro del viewport y sobre el panel.


## 54. 2026-10-18 — Ampliar el alto del detalle y restaurar «Cambiar Falla»

### Fecha

2026-10-18.

### Solicitud

Alargar el área del detalle MTF y conservar el botón «Cambiar Falla» tal como aparece originalmente; ocultar solo los elementos superiores indicados.

### Objetivo

Aprovechar el alto libre de la pantalla para el procedimiento y conservar intacta la presentación y ubicación del control para volver al catálogo.

### Estado anterior

La regla del modo enfocado posicionaba «Cambiar Falla» de forma flotante en la esquina superior derecha. Además ocultaba otros controles MTF y reservaba solo dos filas en el grid, provocando que el encabezado del botón y el detalle compitieran por la misma fila.

### Análisis y solución

- Se retiró el posicionamiento flotante y cualquier regla visual propia del botón «Cambiar Falla», restaurando su ubicación y estilo originales.
- El layout del modo enfocado ahora reserva filas independientes para la barra MTF restante, el encabezado original y el detalle.
- El detalle ocupa la fila flexible restante hasta el límite inferior del viewport; conserva desplazamiento cuando el contenido supera el alto.
- Se ocultan únicamente la barra superior con logos, el selector BAT/MTF y la búsqueda. Se mantienen los demás controles de la barra MTF.
- Se actualizaron README y el contexto técnico para reflejar el alcance corregido.

### Archivos modificados

- `index.html` — distribución por filas y reglas de visibilidad del modo enfocado.
- `README.md` — comportamiento de los controles al abrir un detalle MTF.
- `CONTEXTO_FFDIGI.md` — presentación del detalle y control de retorno.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta modificación.

### Funciones o secciones afectadas

- Reglas CSS `body.mtf-detail-focus` y `#mtf-layout`.

### Impacto

El detalle dispone de más altura y llega al borde inferior del viewport. El botón de regreso recupera su aspecto y ubicación originales. BAT no cambia.

### Validaciones realizadas

- Comprobación estática de que no quedan reglas de posicionamiento o alineación nuevas sobre «Cambiar Falla».
- Comprobación estática de filas independientes para barra, encabezado y detalle; la tercera fila usa el espacio restante.
- Comprobación estática de los selectores ocultos y de los controles que permanecen disponibles.
- README y contexto técnico revisados y actualizados.
- No se ejecutó la aplicación ni se comprobó visualmente en navegador.

### Resultado

La vista MTF oculta solo la cabecera de logos, el selector BAT/MTF y la búsqueda; el detalle gana altura y «Cambiar Falla» conserva su presentación original.

### Pendientes y riesgos

- Confirmar visualmente el alto final y la navegación en escritorio, tableta y móvil.


## 55. 2026-10-18 — Ocultar controles restantes y dar más altura al detalle MTF

### Solicitud

Ocultar «Modo Noche» y «Actualizar PDF FFDG» durante la consulta de una falla y dejar la tabla más alargada y despejada.

### Objetivo

Dedicar el espacio visible al detalle técnico seleccionado y reducir la sensación de contenido comprimido.

### Estado anterior

En el modo de detalle MTF, la fila de búsqueda se ocultaba, pero la fila de acciones MTF aún mostraba los botones de tema y PDF. El layout reservaba una fila para esos controles y las reglas posteriores dejaban que el detalle y sus paneles tomaran una altura automática.

### Solución

- Se ocultó la fila superior de controles MTF mientras la falla está seleccionada; esto retira búsqueda, «Modo Noche» y «Actualizar PDF FFDG» de la vista enfocada.
- Se preservó sin cambios el encabezado de catálogo y el botón «Cambiar Falla».
- Se asignó el espacio vertical restante al panel de detalle y se fijó la altura de sus paneles en escritorio para que se distribuyan en el espacio disponible.
- En pantallas estrechas se conserva el apilado y el desplazamiento del contenido extenso.
- Se revisaron y actualizaron README y contexto técnico.

### Archivos modificados

- `index.html` — visibilidad de controles y dimensiones del panel.
- `README.md` — comportamiento al abrir el detalle MTF.
- `CONTEXTO_FFDIGI.md` — controles ocultos y distribución del detalle.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de este cambio.

### Validaciones realizadas

- Comprobación estática de que la fila MTF de controles se oculta durante el enfoque y el encabezado de «Cambiar Falla» permanece fuera de esa fila.
- Comprobación estática de la fila flexible y las alturas forzadas para que el detalle ocupe el espacio disponible.
- No se ejecutó la aplicación ni se comprobó visualmente en navegador.

### Resultado

Al abrir una falla MTF solo se mantiene el encabezado original con «Cambiar Falla» y la ficha técnica extendida; desaparecen los botones de modo noche y actualizar FFDG.

### Pendientes y riesgos

- Confirmar visualmente el espacio entre paneles en escritorio, tableta y móvil; el contenido extenso conserva desplazamiento.


## 56. 2026-10-18 — Revertir los dos últimos ajustes de la vista MTF

### Solicitud

Revertir los dos cambios más recientes relacionados con la ampliación y los controles de la vista de detalle MTF.

### Solución

- Se restauró la versión de los archivos de aplicación y documentación correspondiente al commit anterior a esos dos ajustes.
- Se mantuvo el cambio previo que activa el detalle enfocado y conserva el acceso a «Cambiar Falla».
- Se creó este commit de reversión sin reescribir el historial remoto.

### Archivos restaurados

- `index.html`
- `README.md`
- `CONTEXTO_FFDIGI.md`

### Validaciones realizadas

- Se verificó que los dos commits objetivo son los dos padres inmediatos anteriores al nuevo commit de reversión.
- Se comprobó que el árbol de archivos corresponde al commit anterior a esos cambios, salvo este registro de historial.

### Resultado

Se deshicieron los dos últimos ajustes; permanece la implementación anterior de vista MTF enfocada.

### Pendientes y riesgos

- Ninguno identificado para la reversión.

## 66. 2026-10-18 — Refinar animaciones y UI/UX BAT/MTF

### Fecha

2026-10-18.

### Solicitud

Pulir de forma integral y discreta las animaciones/interacciones de BAT y MTF, con ritmo de 120–180 ms para la mayoría de estados y hasta 220 ms para paneles/modales; conservar contenido, procedimientos, datos, IDs, listeners, persistencia y flujo funcional.

### Objetivo

Unificar el movimiento de tarjetas, búsqueda/filtros, módulos, pasos, disclosures, temas y diálogos; mejorar feedback visual y accesibilidad sin rediseño ni animación de layout.

### Estado previo

- La página tenía transiciones dispersas entre 120 y 300 ms y el efecto ripple duraba 600 ms.
- El detalle MTF usaba 120 ms y retrasos 16/32 ms entre cards; el detalle BAT usaba 180 ms.
- Búsqueda y filtros ya actualizaban resultados síncronamente. El paso activo BAT/MTF ya tenía un pulso rojo con regla para movimiento reducido.
- El árbol ya tenía cambios locales previos en `index.html`, README, contexto e historial, y `develop` estaba 19 commits por delante de `origin/develop`; se preservaron sin sincronizar, revertir, commit ni push.

### Análisis

- Se revisaron los tres documentos obligatorios, todos los estilos/eventos de navegación BAT y MTF, los renderers de pasos, filtros y tarjetas, `setMode`, tema, disclosures, modales y movimiento reducido.
- La actualización BAT/MFT puede conservar el render síncrono y usar View Transitions solo como mejora progresiva en las superficies de resultado. No se añadieron debounce, temporizadores ni dependencias.
- El pulso rojo del paso activo debe conservarse como efecto único; las entradas de contenido se aplican a hijos reemplazados, no a la pestaña pulsante ni a propiedades de tamaño/posición de layout.

### Causa / necesidad

Duraciones y curvas distintas daban una respuesta visual poco coherente. El ripple de 600 ms y algunas transiciones de superficie eran más largas que el ritmo solicitado; pasos y cambios de vista podían percibirse abruptos.

### Solución

- Se centralizaron en CSS `--motion-micro` (120 ms), `--motion-control` (160 ms), `--motion-content` (180 ms), `--motion-panel` (220 ms) y dos curvas reutilizables.
- Se ajustaron feedback de botones, hover/active/focus de tarjetas, tema y módulos BAT/MTF, selección de vistas, entrada de contenido de pasos, referencias y flowcharts; las cards MTF del detalle entran con delays 0/12/24 ms.
- Los diálogos nativos usan transición de opacidad/transform y `display`/`overlay` discreta hasta 220 ms; no se cambiaron sus handlers ni su gestión de foco.
- `FFDG.ui.runMotionTransition` envuelve búsqueda BAT, búsqueda MTF y filtros MTF: usa View Transitions en las superficies de resultados cuando la API está disponible; si no está disponible o se pide movimiento reducido, ejecuta la actualización directamente. La búsqueda no se retrasa ni se debouncea.
- Se conservaron el contenido técnico, dimensiones/layout, estado, listeners, IDs, navegación, almacenamiento y el pulso rojo existente. Bajo `prefers-reduced-motion` se desactivan las animaciones nuevas y el scroll se hace instantáneo.

### Archivos modificados

- `index.html` — tokens de movimiento, helper progresivo de transición de resultados, estados interactivos, entradas de contenido, tema, disclosures y diálogos.
- `README.md` — ritmos, áreas animadas, búsqueda inmediata y movimiento reducido.
- `CONTEXTO_FFDIGI.md` — sistema de movimiento, helper y límites de comportamiento.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `FFDG.ui.runMotionTransition`, `filterStation` y listeners de búsqueda BAT/MTF.
- CSS de tarjetas BAT/MTF, controles, selector de módulo, vistas, pasos, referencias, theme surfaces, disclosures, diálogos y media queries de movimiento reducido.
- No se modificaron renderers técnicos, catálogos, procedimientos, reportes, importadores, APIs ni `localStorage`.

### Validaciones realizadas

- Scripts inline: 7 scripts clásicos y 1 módulo inline pasaron verificación sintáctica; 207 IDs HTML fueron únicos; `git diff --check` pasó.
- Prueba local HTTP con Chromium/Playwright: cargó BAT/MTF; BAT «Cambiar Falla» regresó al catálogo, la búsqueda NDBG_107 devolvió un caso y seleccionar la tarjeta reabrió su ficha; BAT avanzó al paso 2 y abrió/cerró su modal de flowchart. En MTF, la búsqueda por descripción devolvió FLA-04 y FLA-10; seleccionar FLA-04 mostró sus siete pasos; el paso 2 actualizó la validación; «Cambiar Falla» devolvió el catálogo y Tablero cambió de vista.
- Se abrieron/cerraron los diálogos de notificaciones, topología y galería de referencias. El navegador reportó además un `ReferenceError: applyMtfPdfProcedureOverride is not defined` al renderizar el flowchart MTF; la llamada pertenece al código de render existente y no se modificó en esta tarea, por lo que el flowchart MTF no queda validado.
- Viewports 390×844, 768×900 y 1440×900: sin overflow horizontal. MTF apiló a una columna en móvil/tableta y mostró tres columnas iguales en escritorio; los botones de disposición estuvieron visibles dentro del viewport móvil en la medición realizada.
- Teclado: Tab llevó al control de tema con `:focus-visible` activo y contorno de 3 px. Tema probado dos veces y regresado a `ffdg-theme=light`.
- Movimiento reducido: Chromium reportó 0 s para transiciones de diálogo, `transform:none` y animación de contenido `none`; la búsqueda mostró un resultado sin la transición animada.
- Captura desktop revisada. Servidor HTTP temporal y sesión automatizada cerrados al finalizar. No se alteró el estado persistido de catálogo; no commit ni push.

### Resultado

Ritmo visual unificado y aplicado en BAT/MTF; búsqueda y filtros conservan actualización inmediata, el pulso activo no se duplica y movimiento reducido evita desplazamientos/animaciones nuevas. Validación estática y navegador ejecutadas con la limitación MTF descrita.

### Pendientes y riesgos

- Corregir `applyMtfPdfProcedureOverride is not defined` en una tarea funcional separada; mientras exista, puede fallar la generación del flowchart MTF aunque los pasos y la ficha aparezcan.
- La captura visual interactiva del flowchart MTF y su modal queda pendiente hasta resolver ese error; los demás modales probados abrieron y cerraron.

## 60. 2026-10-18 — Ajustes al reporte BAT de fallas No Boot

### Solicitud

Trasladar a la falla No Boot BAT los cambios antes definidos para el reporte de falla: quitar la lista de validaciones ejecutadas, documentar únicamente la validación donde se obtuvo Pass, agrupar visualmente intervención y causa raíz, y hacer compactos los controles de evidencia antes/después.

### Análisis de impacto

- Se revisaron el flujo de diagnóstico BAT, `FFDG.state.history`, `FFDG.state.steps`, `printBatReport`, la plantilla ejecutiva y sus estilos de impresión.
- El historial real del diagnóstico registra el resultado de cada validación (`OK` o `ANOMALÍA`). El selector Pass usa exclusivamente pasos que aparecen en ese historial y los mapea a `FFDG.state.steps`; no añade una lista de checkboxes ni inventa validaciones.
- Se detectó una discrepancia preexistente: el detalle puede presentar `failure.steps` para `customProcedure`, mientras que el diagnóstico guiado No Boot siempre asigna `flows.NOBOOT`. Se documentó para corrección futura; esta solicitud no amplía el alcance para cambiar el procedimiento ejecutado.
- La captura nueva se limita al reporte No Boot. Se preservan los reportes BAT de otras familias, los flujos PDF/diagramas y los cambios locales MTF ya presentes en el árbol.

### Solución aplicada

- Se añadió un selector único de “Validación en la que se obtuvo Pass”; se vuelve obligatorio únicamente cuando el retest se marca `Pass (Resuelto)` y sus opciones provienen de pasos efectivamente registrados en el historial.
- Intervención y causa raíz se muestran en columnas contiguas en escritorio y se apilan en viewport estrecho.
- Se añadieron dos controles compactos de carga múltiple: “Evidencia antes” y “Evidencia después”. Las imágenes se preparan al seleccionarlas, se previsualizan en la pantalla y se imprimen con su etapa/caption correspondiente.
- La evidencia No Boot y la selección Pass se limpian al iniciar un nuevo diagnóstico o reiniciarlo; permanecen durante una reapertura del último paso.
- El reporte No Boot sigue siendo ejecutivo y no imprime la bitácora de pasos ni el diagrama. Su llamada a `window.print()` es síncrona desde el botón; el usuario debe elegir “Guardar como PDF”.

### Archivos modificados

- `index.html` — interfaz/estilos scoped al cierre No Boot, estado temporal de evidencias, carga/previsualización, selección de Pass y composición del PDF.
- `README.md` — funciones y alcance del reporte No Boot actualizados; se retiró la afirmación obsoleta de que el reporte BAT no se había alterado.
- `CONTEXTO_FFDIGI.md` — flujo nuevo de captura/impresión y discrepancia comprobada entre detalle y diagnóstico `customProcedure` documentados.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validación

- `git diff --check` pasó.
- Siete scripts clásicos inline compilaron con `vm.Script`; la revisión encontró 184 IDs HTML sin duplicados.
- No se probó la selección de archivos ni la impresión en navegador/PDF. La URL local `file:` no estuvo disponible para prueba visual en esta sesión; no se afirma validación end-to-end.

### Resultado y pendientes

- El cierre No Boot ahora permite registrar el paso con Pass y adjuntar evidencia antes/después sin modificar el formato de las otras familias.
- Pendiente separado: alinear los procedimientos custom No Boot del detalle con el diagnóstico guiado que se ejecuta.
- Los cambios locales previos en MTF se conservaron; no se hizo commit ni push.


## 61. 2026-10-18 — Abrir reporte desde la ficha No Boot

### Solicitud

Al elegir una falla No Boot, mostrar su ficha técnica como vista principal y ocultar identificación del nodo, historial, evidencia fotográfica lateral y secuencia de potencia. Añadir en Failure Record el botón verde «Realizar reporte de falla» que abre captura modal BAT para el paso detenido, el paso/acción con Pass, intervención, RCA, retest y evidencia.

### Objetivo e impacto esperado

Separar consulta de la falla y captura del caso: la ficha queda limpia y el reporte se inicia solo cuando la persona lo pide. El modal mantiene identidad del nodo necesaria para el informe y reutiliza la impresión ejecutiva BAT.

### Estado anterior

Al seleccionar No Boot, renderBatSelection mostraba el formulario de nodo y el historial; el reporte solo aparecía al terminar el diagnóstico guiado. El cierre incluía campos/selector/evidencia antes-después. Las tarjetas de evidencia fotográfica y secuencia de potencia vivían en el aside.

### Análisis

- Se revisaron renderBatSelection, getBatDetailSteps, la estructura de #bat-layout, la plantilla printBatReport, el modal piloto MTF y sus estilos/eventos. Se mantuvo BAT separado del prototipo MTF sin punto de entrada.
- El nuevo reporte usa getBatDetailSteps de la falla seleccionada, por lo que los pasos del modal corresponden al procedimiento mostrado; no presenta checklist de validaciones ejecutadas ni crea historial sintético.
- Los selects de clasificación, causa raíz, siguiente acción, P/N y retest se clonan desde controles BAT existentes para no duplicar opciones fuente.
- El motor de impresión BAT permite ahora una captura explícita No Boot sin exigir FFDG.state.history; los reportes BAT normales siguen requiriendo su historial.
- No se cambia la función de diagnóstico ni se elimina su markup legacy; sus bloques quedan ocultos al seleccionar No Boot.

### Solución aplicada

- Se ocultaron en modo No Boot el formulario de identificación inicial, historial, cierre del diagnóstico, evidencia lateral y secuencia de potencia. Failure Record, Troubleshooting Sequence y Disposition Flow permanecen visibles.
- Se añadió el CTA verde «Realizar reporte de falla» dentro de Failure Record, solo visible para No Boot.
- Se añadió modal responsivo con identidad de nodo/analista, resultado de falla, retest, paso donde se detuvo o «No se detuvo», paso/AC Cycle con Pass, clasificación, acción siguiente, RCA, intervención, notas y evidencia antes/después.
- Se valida coherencia entre estado Resuelta y retest Pass; el paso Pass es requerido si el caso se declara resuelto. Las opciones de paso salen del procedimiento visible de la falla.
- El submit pasa los datos capturados a la plantilla ejecutiva BAT existente y abre window.print() sincrónicamente; las imágenes solo permanecen en memoria local. No se modifica el reporte ni el acceso MTF.

### Archivos modificados

- index.html — layout No Boot, CTA, modal de captura, mapeo de pasos/campos y entrada No Boot a printBatReport.
- README.md — vista inicial No Boot y flujo modal de reporte documentados.
- CONTEXTO_FFDIGI.md — comportamiento, campos, fuente de pasos y requisitos de historial actualizados.
- HISTORIAL_CAMBIOS_FFDIGI.md — este registro.

### Validaciones

- Se compiló sintácticamente cada uno de los 7 scripts clásicos inline con vm.Script.
- Se comprobaron 208 IDs únicos y presencia de controles/listeners del modal.
- git diff --check pasó sin errores.
- No se probó en navegador ni se generó un PDF real; no se afirma validación visual ni de paginación.

### Resultado, pendientes y riesgos

- No Boot abre directamente su ficha; el CTA abre el nuevo modal; el modal produce el reporte con datos capturados, sin checklist ni historial inventado.
- Pendiente: prueba visual con No Boot estándar y NDBG_092/NDBG_122, resolución móvil/escritorio, captura de imágenes y diálogo PDF.
- La captura requiere selección manual veraz de paso detenido/Pass; no certifica por sí sola que la acción ocurrió. La impresión todavía requiere elegir «Guardar como PDF».

## 62. 2026-10-18 — Anclar navegación BAT al fondo de Disposition Flow

### Solicitud

Mover los controles al fondo de Disposition Flow sin cambiar el tamaño de Failure Record ni Troubleshooting Sequence. Seguimiento: eliminar «Volver a fallas» y centrar los controles restantes.

### Análisis y solución

- Se comprobó el cascade responsive: una regla posterior a la regla de margen automático volvía a asignar un margen fijo a los controles.
- Se añadió un override solo para escritorio, limitado a los controles dentro de `#bat-failure-detail .bento-block-3`; `margin-top:auto` aprovecha el espacio libre existente de Disposition Flow.
- Se quitó el botón «Volver a fallas» y su listener; el catálogo sigue accesible por «Cambiar falla». Los tres controles restantes se centran en la tarjeta.
- No se movió markup ni se alteraron alturas, columnas, diagramas o reglas de tamaño de las otras tarjetas. En móvil/tableta se conserva el orden normal después del flowchart.
- Se mantuvieron etiquetas, IDs, orden del DOM y manejadores de los tres controles restantes.

### Archivos modificados

- `index.html` — anclaje y centrado desktop; retiro del botón redundante y su listener.
- `README.md` — ubicación de los controles BAT documentada.
- `CONTEXTO_FFDIGI.md` — alcance responsive y tarjetas preservadas documentados.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validación

- Los 7 scripts clásicos inline compilaron con `vm.Script`; los IDs son únicos, no hay referencia al botón retirado y las llaves CSS están balanceadas.
- Se confirmó que el selector y centrado afectan solo los tres controles dentro de Disposition Flow desde 1081 px; `git diff --check` pasó.
- No se afirma validación visual en navegador.
- Se conservaron cambios locales preexistentes; sin commit/push.

## 63. 2026-10-18 — Ajustar encabezado y controles de Disposition Flow MTF

### Solicitud

Evitar que «Criterio de Calidad & Retest» se corte bajo el badge FLOWCHART y distribuir los botones dentro del panel, dando algo más de ancho a Disposition Flow en escritorio amplio.

### Análisis y solución

- La etiqueta FLOWCHART estaba posicionada de forma absoluta, superponiéndose al texto del criterio.
- En detalle MTF de escritorio amplio se asignó una fracción de columna ligeramente mayor a Disposition Flow; no se modificaron las alturas ni el layout BAT.
- El criterio y el badge ahora comparten una fila adaptable sin superposición. Los tres controles MTF pueden crecer y envolver dentro del panel, centrados y contenidos.
- No se alteraron listeners, nombres accesibles ni orden de teclado.

### Archivos modificados

- `index.html` — reglas responsive scoped al detalle MTF.
- `README.md` — distribución responsive de Disposition Flow documentada.
- `CONTEXTO_FFDIGI.md` — ajuste de columna/encabezado y controles MTF documentados.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validación

- Los 7 scripts clásicos inline compilaron con `vm.Script`; los 207 IDs son únicos y las llaves CSS están balanceadas.
- Se comprobó que los overrides del badge y botones están acotados a MTF/escritorio y `git diff --check` pasó.
- No se afirma validación visual en navegador.
- Se conservaron cambios locales previos; sin commit/push.

## 64. 2026-10-18 — Igualar proporción de las cards MTF

### Solicitud

Hacer simétricas las tres cards de detalle MTF, con Disposition Flow al mismo ancho que Failure Record y Troubleshooting Sequence.

### Solución

- Se sustituyó la proporción ampliada de Disposition Flow por tres columnas iguales en el detalle MTF de escritorio amplio.
- Se conservaron el contenido, alturas, encabezado sin superposición, botones, flowchart, listeners y layout BAT.

### Validación

- Los 7 scripts clásicos inline compilaron con `vm.Script`; los 207 IDs son únicos y el CSS mantiene llaves balanceadas.
- Se verificó que el selector queda limitado al grid MTF de escritorio amplio; `git diff --check` pasó.
- No se realizó prueba visual en navegador ni commit/push.

## 65. 2026-10-18 — Uniformar estética de cards MTF

### Solicitud

Uniformar la apariencia de las tres cards MTF para que Disposition Flow conserve la misma composición cuando la falla tenga pocos pasos, muchos pasos, diagrama fuente, diagrama generado o ningún diagrama.

### Análisis y solución

- Se revisaron los estados de detalle MTF, el grid simétrico, el contenedor `#mtf-disposition-content`, el stage `#mtf-flowchart-diagram` y la fila de controles.
- Se dejó el grid de tres columnas iguales y se estabilizó Disposition Flow como columna flex con contenido interno en filas: criterio, acción/resultado y stage de diagrama.
- El stage usa área flexible, centrado y `contain` para SVG/IMG; conserva `overflow:auto` únicamente como respaldo para mensajes o contenido extremo.
- Los botones permanecen en una fila inferior estable, con ancho flexible y wrapping controlado; no se modifican sus IDs ni listeners.
- El cambio está limitado a MTF; no toca BAT, catálogo, procedimientos, datos ni modales.

### Archivos modificados

- `index.html` — reglas CSS responsive scoped al detalle MTF.
- `README.md` — estética uniforme documentada.
- `CONTEXTO_FFDIGI.md` — estructura visual y fallback del stage documentados.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validación

- Los 7 scripts clásicos inline compilaron con `vm.Script`; los 207 IDs son únicos y el CSS mantiene llaves balanceadas.
- Se comprobaron estáticamente las rutas de diagrama fuente, flowchart generado, pasos disponibles y estado sin diagrama; también el grid simétrico, stage contenido y controles inferiores. `git diff --check` pasó.
- El navegador integrado no pudo inicializarse por un error local de ruta; no se afirma validación visual ni responsive interactiva.
- Sin commit/push.

## 58. 2026-10-18 — Mostrar avance de pasos en MTF

### Solicitud

Añadir en MTF una barra verde para visualizar el avance de los pasos, con una presentación equivalente a la barra de BAT.

### Objetivo

Dar una señal visual inmediata del progreso del procedimiento MTF al navegar entre sus validaciones.

### Estado anterior

MTF mostraba botones `Paso N`, coloreaba los pasos anteriores y actualizaba el contador `Validación N de total`, pero no tenía una barra continua de avance. BAT ya contaba con una barra en el detalle guiado.

### Análisis

- Se revisaron las reglas, contexto e historial FFDIGI, README, la estructura de `#mtf-step`, `renderMtfDetail`, los eventos Anterior/Siguiente y la marca existente de pasos previos.
- El índice `FFDG.state.mtfIndex`, la cantidad de pasos activos y `FFDG.state.mtfFinished` ya controlan la navegación; se pueden reutilizar sin introducir estado persistente ni modificar el catálogo.
- La barra se limita a la ficha MTF. El avance sigue la posición activa como en BAT; el estado de ruta completada llena la barra y conserva el anuncio accesible.

### Causa / necesidad

Sin indicador continuo, el usuario debía inferir cuánto faltaba revisando la serie de pestañas de pasos.

### Solución

- Se añadió una barra verde debajo del contador de validación activa.
- El llenado representa el paso activo sobre el total; los botones existentes siguen indicando visualmente los pasos anteriores y no se alteran.
- La barra llega a 100 % cuando se finaliza la ruta, se reajusta al navegar o cambiar de variante y no aparece si el caso carece de pasos.
- Se añadieron atributos `progressbar` y valores accesibles. La transición respeta la regla global de movimiento reducido.
- Se actualizaron README y contexto técnico.

### Archivos modificados

- `index.html` — CSS de barra MTF y representación accesible del porcentaje en `renderMtfDetail`.
- `README.md` — descripción de la barra de avance MTF.
- `CONTEXTO_FFDIGI.md` — semántica, estado y límites del indicador.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `renderMtfDetail` — calcula el valor desde el índice, pasos activos y estado de ruta completa.
- `#mtf-step` — muestra el contador y barra en la secuencia técnica.
- `.mtf-detail-progress` y `.mtf-detail-progress-fill` — presentación usando los tokens verdes existentes.

### Impacto

Solo añade un indicador visual y accesible al detalle MTF. No cambia procedimientos, flowcharts, botones de navegación, persistencia, catálogos ni BAT.

### Validaciones realizadas

- `git diff --check` pasó sin errores.
- `node` analizó los siete bloques JavaScript inline clásicos; la sintaxis pasó. El cálculo de proporción se comprobó con una secuencia de cinco pasos.
- Se inspeccionó el cálculo de avance para índice activo y ruta completada, además de los atributos ARIA.
- No se pudo probar visualmente en el navegador integrado: la política del navegador bloqueó el acceso a la URL `file:` local. No se usó una vía alternativa para eludir el bloqueo.

### Resultado

La barra quedó implementada y pasó validación estática; el comportamiento visual e interactivo queda pendiente de prueba en navegador.

### Pendientes

- Comprobar la navegación con pasos, variantes y ruta completada en el navegador disponible.

### Riesgos

- El porcentaje refleja el paso activo, no confirma que cada acción técnica haya sido ejecutada o pasada; la UI no registra resultados individuales de los pasos MTF.


## 59. 2026-10-18 — Retirar acceso al piloto de reporte MTF

### Solicitud

Quitar de MTF el botón «Realizar reporte de falla» y definir por separado los cambios que se realizarán en BAT.

### Objetivo

Dejar de ofrecer el reporte de intervención piloto dentro de MTF, sin alterar el reporte BAT existente ni adelantar un rediseño BAT aún por definir.

### Estado anterior

El detalle MTF mostraba condicionalmente el botón para el registro exacto FLA-04. El prototipo asociado incluía un diálogo, campos de validaciones, paso Pass, acciones/RCA y evidencia antes/después. BAT conserva un reporte distinto.

### Análisis

- Se releen reglas, contexto e historial FFDIGI; se inspeccionan la condición del botón, el markup, el listener y el reporte BAT por separado.
- El cambio solicitado afecta solo el acceso MTF. No autoriza modificar los campos, impresión ni reglas de validación del reporte BAT existente.
- Se conservan temporalmente las funciones/diálogo MTF sin un punto de entrada de interfaz, evitando borrar el prototipo antes de confirmar si debe eliminarse por completo.
- Se preservan sin sobrescribir los cambios locales previos de la barra de avance MTF en los mismos archivos.

### Causa / necesidad

El piloto FLA-04 se había colocado en MTF, pero el usuario definió que los reportes se trabajarán primero en BAT y que su alcance se determinará separadamente.

### Solución

- Se retiró el botón «Realizar reporte de falla» del detalle MTF.
- Se quitaron las referencias de render y el listener que dependían del botón; los reportes normales MTF y BAT permanecen intactos.
- No se cambiaron los campos ni el diseño del reporte BAT, ni se trasladó el prototipo a una familia BAT.
- README y contexto describen que el prototipo MTF está temporalmente sin acceso y que los cambios futuros se definirán para BAT.

### Archivos modificados

- `index.html` — retiro del CTA MTF y de sus referencias de render/evento.
- `README.md` — funciones y estado del piloto actualizados.
- `CONTEXTO_FFDIGI.md` — estado del prototipo MTF y separación del trabajo BAT.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `renderMtfDetail` — ya no actualiza visibilidad de un botón retirado.
- Inicialización MTF — ya no enlaza el evento click del CTA.
- El código `openMtfCaseReport`, el diálogo y el renderer permanecen sin punto de entrada visible.
- `printBatReport` y la plantilla BAT — sin cambios.

### Impacto

La interfaz MTF ya no permite abrir el piloto de intervención. Búsqueda, selección, procedimientos, diagramas, reporte general MTF y BAT no cambian. Las modificaciones del reporte BAT quedan pendientes de definición; esta intervención no incluye botones o evidencia nuevos en BAT.

### Validaciones realizadas

- `git diff --check` pasó sin errores.
- Los siete bloques JavaScript inline clásicos compilaron con `vm.Script`.
- Búsqueda estática confirmó que el ID `mtf-case-report-open` ya no existe, que no quedan referencias de render/listener al CTA y que el botón BAT conserva su listener a `printBatReport`.
- No se ejecutó prueba visual en navegador; no se volvió a intentar acceder a la URL local `file:` bloqueada por política.

### Resultado

El acceso visible al reporte MTF fue retirado; el código del piloto se conserva temporalmente por decisión de alcance. Validación estática aprobada; sin validación visual.

### Pendientes

- Definir el alcance, fallas de ejemplo y campos requeridos para el reporte BAT.
- Confirmar en una solicitud posterior si se debe borrar el código interno del prototipo MTF.

### Riesgos

- El prototipo MTF sigue en el código fuente sin botón de acceso; una llamada programática futura podría reabrirlo si se reutiliza `FFDG.reports.openMtfCaseReport`.


## 57. 2026-10-18 — Revertir la ampliación de detalle MTF

### Solicitud

Retroceder un cambio adicional y quitar el modo que ampliaba la vista MTF al seleccionar una falla.

### Solución

- Se restauraron los archivos del repositorio al estado anterior a la implementación de la vista MTF enfocada.
- README y contexto técnico vuelven a reflejar el comportamiento de ese estado.
- Se conservó este registro del retroceso sin reescribir el historial remoto.

### Archivos restaurados

- `index.html`
- `README.md`
- `CONTEXTO_FFDIGI.md`

### Validaciones realizadas

- Se comprobó que el commit objetivo es el estado inmediatamente anterior a la ampliación de la vista.
- Se comprobó que la nueva rama conserva el historial y aplica el árbol del estado objetivo, con la excepción de este registro añadido al historial.

### Resultado

La vista MTF vuelve al comportamiento anterior al modo de pantalla enfocada. Los cambios de orden de estaciones y de color/resaltado anteriores permanecen.

### Pendientes y riesgos

- Ninguno identificado para la reversión.

## 67. 2026-10-18 — Separar estilos de movimiento en CSS

### Solicitud

Mover las reglas de animación/microinteracción a una hoja CSS aparte para reducir el HTML principal y mantener la capa visual ordenada.

### Análisis

- Se confirmó que el bloque de movimiento estaba al final del último `<style>` inline de `index.html`, después de las reglas responsive y de detalle.
- Para conservar su prioridad en la cascada, la hoja externa debe cargarse después de los estilos inline existentes.
- El JavaScript de transición permanece en `index.html`; los tokens de duración/curva también pertenecen al sistema visual y deben acompañar las reglas en la hoja externa.

### Solución

- Se trasladó sin cambios el bloque de microinteracciones, entradas, diálogos, View Transitions y `prefers-reduced-motion` a `ffdg-motion.css`.
- Se movieron a `ffdg-motion.css` los seis tokens de duración/curvas, conservando sus valores.
- Se reemplazó el bloque inline por `<link rel="stylesheet" href="./ffdg-motion.css">` al final del documento.
- Se actualizó la estructura técnica y la guía del proyecto para describir el nuevo archivo y su orden de carga.

### Archivos modificados

- `index.html` — se retiró el bloque CSS de movimiento y se añadió el enlace externo posterior a los estilos restantes.
- `ffdg-motion.css` — nueva hoja local con las reglas extraídas, sin dependencias externas.
- `README.md` — se agregó el archivo a la estructura y se describió su alcance.
- `CONTEXTO_FFDIGI.md` — se actualizó el mapa de archivos, el orden de carga y el reparto de estilos.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Impacto

El comportamiento visual se mantiene; `index.html` queda más corto y el orden de carga preserva la cascada anterior. No se modificaron JavaScript, valores de tokens, IDs, datos, listeners ni lógica técnica.

### Validaciones

- Chromium cargó `ffdg-motion.css` sin error; CSSOM reportó 31 reglas de nivel superior y la hoja quedó como la última del documento.
- El botón M3 mantuvo `transition-duration: 0.16s`; se comprobó carga de BAT, cambio al catálogo MTF y disponibilidad de las 287 fallas.
- Con emulación `prefers-reduced-motion: reduce`, el diálogo reportó transición `0s` y el contenido no conservó una animación activa.
- El DOM presentó 201 IDs y 201 valores únicos; `git diff --check` pasó.
- 7 scripts clásicos y 1 módulo inline pasaron verificación sintáctica; `index.html` quedó en 6974 líneas frente a las 7193 observadas antes del traslado (219 menos).
- Servidor HTTP local y sesión automatizada cerrados al finalizar; no commit ni push.

### Resultado

Hoja de movimiento externa cargada en último lugar y validada en Chromium; tokens, cascada, duración de controles y movimiento reducido se conservaron. El HTML principal perdió 219 líneas.

## 68. 2026-10-18 — Restaurar el render de flowcharts MTF

### Solicitud

Corregir que los diagramas MTF no aparecieran después de separar la capa CSS de movimiento.

### Análisis y causa

- La prueba anterior ya había capturado `ReferenceError: applyMtfPdfProcedureOverride is not defined`: `renderFlowchart` se ejecuta dentro de `FFDG.ui`, pero ese helper estaba declarado localmente en el cierre de `FFDG.data`.
- Al probar también fallas sin diagrama fuente, se detectó una segunda referencia fuera de alcance: `mtfPdfFlowchartGraphs` pertenecía al mismo cierre de datos. El error de `applyMtfPdfProcedureOverride` impedía incluso llegar a la selección del SVG/fuente.
- Los PNG y el markup del contenedor seguían presentes; el fallo ocurría en JavaScript antes de insertar contenido. La hoja `ffdg-motion.css` no establece `display:none` ni opacidad permanente sobre el diagrama.

### Solución

- Se expuso `applyMtfPdfProcedureOverride` en `FFDG.data` y `renderFlowchart` lo usa mediante ese namespace.
- El fallback de grafos consulta `window.FFDG_MTF_PDF_FLOWCHART_GRAPHS`, la fuente global que ya publica el módulo MTF, en vez de leer el alias privado del cierre.
- No se cambiaron archivos de diagramas, procedimientos, catálogo, IDs ni lógica de pasos.

### Archivos modificados

- `index.html` — corrección de los dos accesos entre el cierre de datos MTF y el renderizador UI.
- `README.md` — limitación sustituida por el comportamiento corregido y los casos verificados.
- `CONTEXTO_FFDIGI.md` — causa, solución y responsabilidad del helper documentadas.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validaciones

- Chromium/Playwright: seleccionar FLA-04 insertó un SVG con la imagen fuente `mtf-flow-007.png`; sin errores de consola.
- Chromium/Playwright: seleccionar FLA-10 insertó `mtf-procedure-step-flowchart`, con la nota y tres pasos de secuencia derivados del procedimiento; sin errores de consola.
- La hoja externa de movimiento cargó normalmente durante las pruebas.
- 7 scripts clásicos y 1 módulo inline pasaron verificación sintáctica; `git diff --check` pasó.
- Servidor y sesión de navegador de prueba cerrados; no commit ni push.

### Resultado

Los flowcharts fuente y las secuencias SVG para fallas sin fuente vuelven a mostrarse en MTF. No se añadieron ramas ni resultados técnicos nuevos.

## 69. 2026-10-18 — Restaurar el tamaño visible de los diagramas MTF

### Solicitud

Restaurar los diagramas MTF que aparecían vacíos en AST-02 y otras fallas.

### Objetivo

Mostrar de nuevo las imágenes fuente y las secuencias SVG generadas, manteniendo el layout responsive de las tres cards.

### Estado previo

- Los registros y assets sí contenían los diagramas; en AST-02 la ruta `mtf-flow-027.png` respondía correctamente y el SVG se insertaba en el DOM.
- En escritorio, el contenedor del diagrama y su SVG quedaban con altura efectiva cercana a cero. Los controles seguían disponibles.

### Análisis y causa

- `index.html` imponía `height: 0 !important` con un selector MTF más específico para el detalle.
- El override previo tenía menor especificidad, por lo que no reemplazaba esa altura aunque la hoja `ffdg-motion.css` cargara al final.
- El fallo era de tamaño CSS, no de asociaciones, importación ni carga de los PNG.

### Solución

- Se añadió en `ffdg-motion.css` un override de altura con la especificidad del selector que colapsaba el stage. La hoja externa conserva su posición final en la cascada.
- El stage recupera el tamaño de su celda; se mantienen centrado, `contain`, botones y estructura de las cards.
- No se cambiaron datos, procedimientos, IDs, listeners ni lógica de BAT.

### Archivos modificados

- `ffdg-motion.css` — override de altura del stage MTF de escritorio.
- `CONTEXTO_FFDIGI.md` — causa, corrección y responsabilidad visual documentadas; se retiró el pendiente obsoleto del `ReferenceError` ya resuelto.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- `#mtf-flowchart-diagram` y su SVG/imagen dentro de `Disposition Flow`.
- La regla CSS responde al detalle MTF en escritorio; no modifica la selección de fallas ni el render de datos.

### Validaciones

- Chromium/Playwright, escritorio `1468×884`: AST-02 cargó `mtf-flow-027.png` dentro de un stage de `438×338 px`; FLA-04 mostró su diagrama fuente dentro de un stage de `438×338 px`.
- FLA-10, sin diagrama fuente, mostró el SVG de secuencia generado desde sus pasos.
- Tableta `900×900` y teléfono `390×844`: diagrama visible, los tres botones presentes y sin overflow horizontal.
- Consola Chromium: cero errores y cero advertencias.
- `git diff --check` se ejecutó después del cambio; no se hicieron commit ni push.

### Resultado

Los diagramas fuente de AST-02 y FLA-04, junto con el fallback generado de FLA-10, se muestran con altura visible en los tamaños probados.

### Pendientes y riesgos

- No se hizo una inspección individual de las 287 fallas; se probaron ejemplos fuente y generados representativos.
- Los artefactos locales creados por Playwright permanecen dentro de `.playwright-cli/` y no se limpiaron.

## 70. 2026-10-19 — Aplicar propuesta visual a la ficha MTF

### Solicitud

Aplicar a BAT/MTF la propuesta visual seleccionada por el usuario. La imagen de referencia muestra la ficha de detalle MTF con navegación superior, falla activa, secuencia técnica y disposición en tres cards.

### Objetivo

Acercar la ficha MTF al diseño aprobado, conservando el comportamiento, contenido técnico, diagramas, distribución responsive y navegación existentes.

### Estado anterior

- La ficha ya tenía tres columnas simétricas, título rojo para la falla, barra de avance, área de flowchart y controles funcionales.
- Los paneles tenían bordes más pesados y encabezados más altos; el paso MTF activo usaba el pulso rojo anterior.
- BAT y MTF comparten reglas base de detalle, por lo que la nueva capa visual debía limitarse explícitamente a MTF.
- La rama estaba en `develop`, 20 commits por delante de `origin/develop`; `.playwright-cli/` ya estaba sin seguimiento y se preservó.

### Análisis

- Se leyeron `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md`; se revisaron README, markup de la ficha y reglas CSS en cascada.
- Las tres cards, IDs, listeners, título, stepper, progreso, acción, stage del flowchart y controles ya existen; no se requiere modificar renderizadores ni datos.
- La referencia enfatiza tarjetas ligeras, encabezados verdes compactos, metadatos organizados, paso activo verde y flowchart enmarcado.

### Causa / necesidad

El acabado previo no coincidía con la propuesta elegida, en especial por el grosor de contornos, altura de encabezados y color del paso MTF activo.

### Solución

- Se añadió `ffdg-mtf-presentation.css` y se cargó después de `ffdg-motion.css` para que el tratamiento quede aislado y gane prioridad sobre estilos MTF anteriores.
- Se refinaron solo las cards MTF: contorno neutro fino, superficie clara según tema, encabezados verdes compactos, banner de falla con token semántico de error, metadatos agrupados y controls/progreso contenidos.
- El paso MTF activo ahora usa verde y un pulso sutil; `prefers-reduced-motion` elimina ese pulso.
- Se conservaron la distribución de tres columnas, el apilado responsive, el tamaño/ajuste `contain` del flowchart, todos los botones, IDs, listeners, pasos y datos. BAT no se modifica.
- README y contexto describen la nueva hoja y el estado visual MTF.

### Archivos modificados

- `index.html` — enlace a la hoja MTF posterior a la capa de movimiento.
- `ffdg-mtf-presentation.css` — nueva capa CSS limitada a `#mtf-layout #mtf-detail`.
- `README.md` — presentación MTF y estructura de hojas locales actualizadas.
- `CONTEXTO_FFDIGI.md` — arquitectura, orden de carga, fuente de UI y estado visual MTF actualizados.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Funciones o secciones afectadas

- Solo estilos de Failure Record, Troubleshooting Sequence y Disposition Flow de MTF.
- No se modificaron funciones JavaScript, catálogos, localStorage, importadores, datos, procedimientos, diagramas ni BAT.

### Validaciones

- Los 15 scripts clásicos inline compilaron con `vm.Script`.
- La hoja CSS nueva tiene llaves balanceadas; el enlace local existe y queda después de `ffdg-motion.css`.
- `git diff --check` pasó.
- Se intentó reabrir el navegador integrado, pero la inicialización del kernel falló con `El sistema no puede encontrar la ruta especificada (os error 3)`. No se usó Playwright ni otro navegador; por tanto, no se declara inspección visual, interacción, responsive o comparación final.
- No se hizo commit ni push. No se tocaron las capturas preexistentes de `.playwright-cli/`.

### Resultado

La propuesta quedó aplicada localmente mediante una hoja CSS MTF aislada, con los checks estáticos aprobados. La fidelidad visual final queda pendiente de una inspección en navegador disponible.

### Pendientes y riesgos

- Revisar con el navegador del usuario escritorio, tableta, móvil, tema claro/oscuro, foco y movimiento reducido; confirmar que el flowchart y los tres controles siguen visibles.
- La referencia adjunta no incluye interacción ni estado oscuro, por lo que esos estados se conservaron según los tokens y comportamientos actuales, sin validación visual en esta sesión.

## 71. 2026-10-19 — Unificar diseño visual de fallas BAT y MTF

### Solicitud

El usuario indicó que el acabado anterior no reproducía la referencia aprobada: faltaban los iconos y el espaciado. Solicitó aplicar el diseño a las fallas de BAT y MTF.

### Objetivo

Acercar ambas fichas a la captura proporcionada: columnas simétricas, alerta visible, datos técnicos en filas con iconos, pasos/progreso claros y disposición enmarcada, sin modificar contenido técnico ni flujos.

### Análisis y causa

- La capa previa era exclusiva de MTF; BAT seguía con contornos, espaciado y paso activo distintos.
- El proyecto no tenía una biblioteca de iconos instalada/local. Añadir una fuente remota afectaría el funcionamiento sin conexión del HTML local.
- Los datos, diagramas, IDs y listeners existentes permiten presentar el diseño desde CSS, markup y los puntos actuales de renderizado.

### Solución

- Se sustituyó la hoja MTF-only por `ffdg-detail-presentation.css`, común a BAT/MTF. Igualó el ancho de las tres columnas en escritorio y normalizó encabezados, metadatos, banner de falla, progreso, espaciado y marcos.
- Se añadieron recursos oficiales SVG de Bootstrap Icons en `assets/ui-icons/` con su licencia MIT local; no hay CDN ni dependencia instalada.
- Las filas de estación, código, componente y flowchart ahora incluyen iconos decorativos accesibles; título de falla incluye alerta. Secuencia BAT/MTF comparte activo verde; `prefers-reduced-motion` apaga el pulso.
- Se incorporaron iconos a acción/procedimiento, referencias, topología y paso actual sin cambiar el texto técnico. Se conservaron IDs, listeners, datos, diagramas, navegación y reglas responsive existentes.
- README y contexto actualizaron la fuente visual compartida y el comportamiento BAT/MTF.

### Archivos modificados o añadidos

- `index.html` — estructura de banner y metadatos; referencias a iconos locales; iconos decorativos en renders BAT/MTF; hoja de presentación común.
- `ffdg-detail-presentation.css` — diseño compartido BAT/MTF, columnas y componentes visuales.
- `assets/ui-icons/*.svg` — iconos locales; `assets/ui-icons/LICENSE.txt` — licencia MIT.
- `README.md` — presentación común y archivos.
- `CONTEXTO_FFDIGI.md` — arquitectura y estado visual compartido.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validaciones

- 7 scripts clásicos inline pasaron compilación con Node `vm.Script`; el cambio de markup/render estático quedó dentro de dichos scripts.
- Llaves CSS balanceadas; los 8 archivos de iconos existen localmente.
- No hay IDs duplicados; iconos decorativos incorporados llevan `alt=""` y `aria-hidden="true"`.
- `git diff --check` pasó.
- Se intentó capturar la página con el navegador integrado; no inició por `failed to write kernel assets: El sistema no puede encontrar la ruta especificada (os error 3)`. No se usó otro navegador, por lo que no se declara validación visual, responsive, de diagramas ni interacción.
- No se hizo commit ni push; se preservó `.playwright-cli/` preexistente.

### Resultado y pendientes

Los cambios están aplicados localmente. La fidelidad final de espacios, tamaños, flowcharts, móvil/tableta, foco y movimiento reducido queda pendiente de comprobar en navegador funcional.

## 72. 2026-10-19 — Igualar la barra de selección y dimensiones de detalle BAT/MTF

### Solicitud

El usuario pidió que «Cambiar Falla» en MTF coincida con BAT, que al abrir una falla MTF desaparezcan búsqueda/tema/PDF y que las tres cards mantengan las mismas dimensiones y espacios que en BAT.

### Análisis y causa

- BAT colapsa su encabezado del catálogo y oculta búsqueda/tema/PDF; MTF conservaba su toolbar `.mtf-row-1` durante el detalle.
- El botón MTF tenía una flecha descendente y un wrapper adicional; BAT mostraba icono de intercambio y etiqueta simple.
- El alto desktop de BAT usa `max(560px, calc(100dvh - 320px))`; MTF reservaba `calc(100dvh - 260px)`, por lo que la fila MTF podía ser más alta.
- Los dos botones comparten clases, pero necesitaban una regla final común para fijar borde, alto, ancho, relleno y foco visual.

### Solución

- MTF ahora usa el mismo contenido visible del botón BAT (icono de intercambio + «Cambiar Falla»); se conserva `#mtf-selection-text` porque el render lo actualiza.
- Al seleccionar falla se oculta `.mtf-row-1`, que contiene búsqueda, Modo Noche y Actualizar PDF; al volver al catálogo se muestra de nuevo.
- El encabezado MTF seleccionado adopta la misma superficie, borde, padding y radio del encabezado BAT colapsado.
- Las dos fichas usan en escritorio la misma fórmula de alto y tres columnas iguales. El flujo apilado/tableta/móvil sigue con altura automática y controles existentes.
- Sin cambios a datos, pasos, localStorage, diagramas ni listeners.

### Archivos modificados

- `index.html` — contenido visible común del botón MTF; se preserva el ID de texto usado por el renderer.
- `ffdg-detail-presentation.css` — ocultamiento contextual del toolbar MTF, presentación compartida del botón y altura desktop común.
- `README.md` — visibilidad de controles MTF y dimensiones igualadas.
- `CONTEXTO_FFDIGI.md` — reglas visuales, navegación y comportamiento responsive.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validaciones

- 7 scripts clásicos inline pasaron `vm.Script`.
- 207 IDs únicos; se conserva `mtf-selection-text`.
- CSS con llaves balanceadas; comprobación estática de toolbar condicionado a `mtf-selection-collapsed`, botones con mismo contenido visible y fórmula desktop compartida.
- Cálculo estático a viewport de 884 px: ambas fichas usan 564 px de alto mínimo.
- `git diff --check` pasó.
- El navegador integrado no inició: `failed to write kernel assets: El sistema no puede encontrar la ruta especificada (os error 3)`. No se declara validación visual ni medición real del DOM.
- Sin commit ni push; se preservaron cambios locales y `.playwright-cli/`.

### Resultado y pendiente

La implementación está igualada en código/CSS y el toolbar MTF vuelve al mostrarse el catálogo. Falta confirmar visualmente en navegador funcional escritorio, tableta y móvil.

## 73. 2026-10-19 — Revertir igualación de barra y dimensiones BAT/MTF

### Solicitud

El usuario pidió revertir el ajuste de la barra «Cambiar Falla», ocultamiento de controles MTF y dimensiones compartidas entre las fichas.

### Solución

- Se restauró el botón MTF previo, con su icono, flecha y wrapper de acción.
- Se retiró el ocultamiento de búsqueda/tema/PDF al abrir el detalle MTF.
- Se quitaron los overrides que igualaban la altura de detalle BAT/MTF; se conservan las reglas de anchos y los acabados visuales compartidos de la propuesta anterior.
- Se preservó el contenido técnico, navegación y listeners. No se restauraron otros archivos ni cambios de tareas anteriores.

### Archivos modificados

- `index.html` — markup y estilo base del botón MTF restaurados.
- `ffdg-detail-presentation.css` — reglas de toolbar y altura compartida retiradas.
- `README.md` y `CONTEXTO_FFDIGI.md` — descripción corregida para quitar el comportamiento revertido.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — registro de esta reversión.

### Validación

- Validación pendiente; no se ejecutó navegador en esta reversión.
- Sin commit ni push.

## 74. 2026-10-19 — Ocultar controles MTF durante el detalle

### Solicitud

Al abrir cualquier falla MTF, mostrar únicamente el botón «Cambiar Falla» y la ficha completa; ocultar búsqueda, modo noche y actualizar PDF. Al volver al catálogo, recuperar los controles.

### Objetivo

Reducir elementos visibles durante la lectura de la falla sin modificar dimensiones ni contenido de sus tres cards.

### Estado previo y análisis

- `setMtfCatalogCollapsed` ya controla `mtf-selection-collapsed` y se utiliza para abrir la ficha desde las vistas MTF y regresar al catálogo.
- `.mtf-row-1` contiene búsqueda, tema y selector PDF; ocultar esa fila solo durante el estado colapsado cumple el alcance sin tocar funciones ni listeners.
- El resumen MTF conserva `#mtf-selection-text`, que actualiza la función existente; se mantiene el ID aunque el texto no sea visible.

### Solución

- Se ocultó `.mtf-row-1` cuando `#mtf-layout` tiene `mtf-selection-collapsed`; el retiro de la clase al volver muestra de nuevo búsqueda, tema y PDF.
- El botón MTF ahora comparte el icono y texto visibles «Cambiar Falla» de BAT, sin la flecha adicional. Se conservaron IDs, atributos ARIA, listeners y `#mtf-selection-text`.
- No se modificaron el alto/ancho de las cards, sus datos, pasos, diagramas, responsive ni el flujo de selección.

### Archivos modificados

- `index.html` — contenido visible del botón MTF; retirado un estilo ya sin uso del wrapper; no se alteraron listeners.
- `ffdg-detail-presentation.css` — ocultamiento de la toolbar MTF solo en detalle.
- `CONTEXTO_FFDIGI.md` — comportamiento de controles MTF actualizado.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validación

- Los siete scripts inline clásicos compilaron con Node `vm.Script`; se contaron 207 IDs únicos y se conservó `#mtf-selection-text`.
- Revisión estática confirmó que la regla oculta `.mtf-row-1` solo bajo `mtf-selection-collapsed`; la función/listener existente conserva el retorno al catálogo y la regla no toca tamaños de cards.
- `git diff --check` pasó.
- Se intentó revisar la página en el navegador integrado, pero el kernel no inició (`failed to write kernel assets: El sistema no puede encontrar la ruta especificada (os error 3)`). No se declara validación visual/interactiva ni responsive.
- Sin commit ni push.

## 75. 2026-10-19 — Fondo blanco para «Cambiar Falla» en MTF

### Solicitud

Cambiar el aspecto del botón de MTF en el detalle a fondo blanco y subir los cambios a GitHub.

### Solución

- Se aplicó fondo blanco al botón MTF visible durante el detalle, con texto/icono verde oscuro y borde neutro para conservar contraste.
- El estilo solo aplica en el estado `mtf-selection-collapsed`; BAT y el resto de controles no cambian.
- El destino GitHub confirmado es `secundaria/main` (`gabo566/FFDIGI-FA-BAT`), con autor `gabo566`. El remoto estaba alineado con HEAD antes de aplicar cambios.

### Archivos modificados

- `ffdg-detail-presentation.css` — estilo contextual blanco del botón MTF.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validación y publicación

- Compilaron los siete scripts inline clásicos; hay 207 IDs únicos, se comprobaron 17 referencias a iconos (0 ausentes) y se verificó el contraste CSS de fondo blanco/texto verde oscuro.
- `git diff --check` pasó.
- La página no pudo validarse visualmente: el navegador integrado no inició por `failed to write kernel assets: El sistema no puede encontrar la ruta especificada (os error 3)`.
- Antes de publicar, `secundaria/main` estaba alineada con HEAD; `origin/develop` no tenía commits nuevos frente al checkout. Se preservó el stash previo y se excluirá `.playwright-cli/` del commit.
- Publicado en `secundaria/main` como `b776c7654bed7f45beb9e181926bc4a368e6bb59` (`style(ffdigi): refine BAT/MTF detail UI`); autor `gabo566`. `git ls-remote` confirmó el mismo SHA en `refs/heads/main`.

## 76. 2026-10-19 — Igualar botón MTF «Cambiar Falla» con BAT

### Solicitud

Replicar el botón BAT en el detalle MTF: botón verde con texto blanco, sobre superficie blanca y con los mismos espacios.

### Solución

- Se quitó el override que volvía blanco el botón MTF; ahora conserva el verde y el texto blanco de `.catalog-selection-toggle`, con el mismo padding `8px 14px`, alto mínimo de 44 px y ancho completo que BAT.
- La barra MTF durante el detalle ahora usa la superficie y borde neutros de BAT, con padding `10px 16px`; la summary mantiene 12 px de separación y ocupa el ancho disponible.
- Se conservaron IDs, listeners, navegación y comportamiento responsive existente.

### Archivos modificados

- `ffdg-detail-presentation.css` — superficie, dimensiones y espaciado de la barra/botón MTF en detalle.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validación y publicación

- Pasaron `git diff --check`, compilación con Node de los siete scripts inline clásicos, balance de llaves CSS, 207 IDs únicos y comprobaciones estáticas de las reglas/IDs del botón.
- No hubo prueba visual: el navegador integrado falló al iniciar con `failed to write kernel assets: El sistema no puede encontrar la ruta especificada (os error 3)`.
- Antes del push, `develop` estaba en la rama correcta y sin commits nuevos en `origin/develop` (0 remotos / 22 locales); `secundaria/main` coincidía con HEAD. Se preservó y reaplicó el stash `codex pre-push MTF BAT button 2026-10-19`; `.playwright-cli/` queda fuera del commit.
- Publicado en `secundaria/main` como `8d14a73ec16e7c35008eafaeeab60b8be3384e7f` (`style(mtf): match BAT change-failure button`), autor `gabo566`; `git ls-remote` confirmó el mismo SHA en `refs/heads/main`.


## 77. 2026-10-19 — Retirar campos textuales del reporte BAT No Boot

### Solicitud

Quitar «Evidencia concluyente de RCA» y «Notas del retest / resultado» del botón **Realizar reporte de falla** de No Boot y actualizar GitHub.

### Solución

- Se retiraron los dos controles del formulario del modal No Boot y sus valores del objeto que alimenta la impresión.
- La plantilla imprimible de No Boot ya no incluye evidencia textual de RCA ni notas del retest; conserva causa raíz, resultado del retest y evidencia fotográfica antes/después.
- Se mantuvo sin cambios el campo de evidencia del flujo BAT normal, que pertenece a otro reporte.
- Se actualizó README y contexto técnico para describir los campos vigentes.

### Archivos modificados

- `index.html` — formulario y plantilla impresa de No Boot.
- `README.md` — descripción del flujo No Boot.
- `CONTEXTO_FFDIGI.md` — alcance de la plantilla BAT.
- `HISTORIAL_CAMBIOS_FFDIGI.md` — este registro.

### Validación y publicación

- Revisión estática: el modal No Boot ya no contiene los nombres/IDs de los dos campos; el objeto `caseReport` y la plantilla No Boot no consumen ni muestran sus valores.
- Revisión estática: la evidencia textual continúa disponible en la plantilla BAT normal; no se cambió el formulario general de RCA.
- No se generó `dist`, no se desplegó el sitio y no se ejecutó una suite automatizada.
- El commit y la rama remota quedan verificados al terminar la actualización GitHub.
