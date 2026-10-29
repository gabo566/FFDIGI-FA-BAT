# Nvidia Racks FFDG — Guía de análisis de fallas GB200 y GB300

Aplicación web estática para consultar procedimientos de diagnóstico **BAT** y fallas de línea **MTF L10** asociadas con sistemas GB200 y GB300. Reúne catálogos, pasos técnicos, referencias visuales y reportes que se preparan en el navegador.

El nombre **FFDG/FFDIGI** se conserva como identificador del proyecto. El repositorio no documenta una expansión formal de esos nombres.

## Para qué sirve

La aplicación ayuda al personal técnico a seleccionar una falla, revisar la información disponible para ella y seguir o registrar actividades de diagnóstico. Tiene dos áreas con objetivos distintos:

- **BAT — Basic Assurance Test:** guía un diagnóstico paso a paso para fallas NDBG y permite preparar un reporte para revisión de Calidad.
- **MTF L10 Failure:** permite buscar fallas de estación, consultar sus metadatos y procedimientos, revisar flowcharts y referencias.

La aplicación es una herramienta de consulta y captura. Incluye una pantalla de inicio de sesión local para una cuenta inicial y cierre de sesión; como la app es estática y no tiene backend, este control no protege frente a la inspección o modificación del código del navegador. No asigna roles ni sustituye los manuales, el workbook fuente o los procesos de autorización y liberación del nodo.

## Acceso

- La portada muestra **FFDG L10/L11 GB200/GB300** sobre **NVIDIA RACKS**, con letras destacadas, imagen local de racks y logotipo Ingrasys integrado visualmente al fondo. La sesión permanece durante la pestaña actual; el botón **Cerrar sesión** aparece junto a FFDG en el encabezado de la aplicación.
- La primera cuenta se configura en el cliente. El proyecto no tiene servicio de identidad ni backend: la pantalla es una barrera de interfaz, no un mecanismo de seguridad para datos sensibles. Para acceso seguro entre usuarios se necesita autenticación en un servidor.

## Funciones

### BAT

- Catálogo de fallas organizado por familias como FRU, Logic, Leak, Fan y No Boot, con un icono local por categoría.

- Búsqueda y selección de fallas; el detalle muestra la secuencia completa, con el paso activo resaltado y los pasos confirmados en verde al pulsar «Paso siguiente». El estado es temporal mientras la falla permanece abierta; no se persiste.
- La navegación BAT/MTF usa tabs amplios con icono lateral, BAT activo en verde y MTF claro; la barra de acciones usa un control rail compacto para Catálogo BAT, Tablero de fallas, búsqueda, Modo Noche, actualización PDF y Customer notifications. Los estados, foco y comportamiento existente se conservan; logos, categorías y recuadros de fallas permanecen sin cambios.
- En escritorio, las filas reparten el espacio disponible y Disposition Flow obtiene algo más de ancho; en móvil/tableta las cards se apilan. El flowchart BAT conserva su SVG original y su proporción.
- En escritorio, **Anterior**, **Paso siguiente** y **Ampliar diagrama** quedan centrados al fondo de **Disposition Flow**; el regreso al catálogo se hace con **Cambiar falla**.
- Recorrido de diagnóstico con respuestas y notas durante la sesión.
- Captura de identificación del nodo, validaciones, disposición final, causa raíz (RCA) y evidencia fotográfica.
- Al seleccionar No Boot, la ficha técnica aparece limpia de identificación, historial y paneles auxiliares. Su botón verde **Realizar reporte de falla** es compacto y centrado en la ficha; abre un modal para identificar nodo y analista, elegir el estado del diagnóstico, el procedimiento FFDG aplicado, clasificación, retest, acciones, RCA y evidencias antes/después con nombre editable por imagen. También pregunta si hubo cambio de tarjeta o hardware; al responder **Sí**, solicita P/N y S/N de la tarjeta dañada y los agrega al PDF. Si la respuesta es **No**, esos datos no aparecen en el reporte.
- La captura No Boot no requiere ejecutar el diagnóstico guiado en pantalla; reutiliza los pasos de la falla activa para ofrecer el procedimiento aplicado. El PDF **Reporte de Análisis de Falla Nvidia Racks** presenta seis secciones ejecutivas: identificación, estado y resultado, procedimiento, análisis y diagnóstico, evidencia y firmas. Su hoja A4 replica la referencia gerencial con logo NVIDIA verde/negro y logo Ingrasys, fecha y hora de emisión, título azul marino centrado, seis encabezados numerados en verde, identificación en seis columnas, estado/retest/acción con iconos, clasificación en franja verde, paso aplicado, diagnóstico en tres columnas, hardware, evidencia Antes/Después siempre visible y bloques de firma alineados con renglones separados para nombre y fecha. Los valores siguen siendo los capturados en el reporte; campos sin evidencia se indican explícitamente, sin usar datos ni fotos demostrativas. La hoja utiliza márgenes de 5 mm; contenido extenso puede continuar en otra página según el motor de impresión.
- Secuencia de potencia informativa cuando corresponde.
- Importación local de procedimientos BAT desde PDF y combinación con los datos de la aplicación.
- Preparación de un reporte imprimible para revisión de Calidad. El archivo PDF se crea desde el diálogo del navegador cuando se elige **Guardar como PDF**.

### MTF L10

- Catálogo de fallas con búsqueda y filtros, incluida la selección por estación.
- En la vista Tablero, las estaciones se presentan en orden fijo: FLA, PRET, FLB, AST, FTS, IOT, FCT, RIN, T_VI, OBA y PACKING. Las estaciones disponibles que no estén en esa lista se muestran después por nombre; los conteos se calculan según el catálogo actual.
- Ficha **Failure Record** con la identificación y los metadatos de la falla.
- Secuencia de troubleshooting, pasos, comandos y variantes cuando están disponibles; incluye una barra verde de avance que sigue el paso activo y llega al 100 % al finalizar la ruta.
- Flowcharts y referencias visuales locales; algunos diagramas se pueden ampliar en un modal.
- Las fichas BAT y MTF comparten encabezados verdes, tres columnas simétricas en escritorio, aviso de falla con icono, filas de identificación con iconos, paso activo verde y controles/diagramas enmarcados.
- En la ficha BAT de escritorio, los recuadros de Failure Record se estiran de forma uniforme para ocupar el alto libre; el flowchart usa un marco verde de mayor contraste. Los controles se compactan a 34 px en escritorio y conservan 44 px en tableta/teléfono.
- Paneles informativos de topología y notificaciones cuando hay contenido asociado.

### Tema y presentación

- Tema claro y oscuro.
- Microinteracciones refinadas para botones, tarjetas, pasos, cambios BAT/MTF, paneles, referencias y diálogos. La mayoría usa 120–180 ms; paneles y modales llegan como máximo a 220 ms.
- La capa de movimiento completa, incluidos tokens de tiempo/curvas y reglas compartidas BAT/MTF, está aislada en `src/css/shared/ffdg-motion.css`.
- Búsqueda y filtros siguen actualizando sin debounce ni temporizadores; cuando el navegador ofrece View Transitions se usa una transición corta en el área de resultados, con actualización directa como fallback.
- Las animaciones nuevas respetan `prefers-reduced-motion`; BAT y MTF resaltan el paso activo en verde con pulso sutil.
- El título de la falla se resalta con tokens de error y contraste adaptado al tema; el nombre/código permanece centrado.
- Los pasos activos BAT/MTF usan el mismo brillo verde sutil; se desactiva con `prefers-reduced-motion`.
- Diseño adaptable para distintos anchos de pantalla.
- Diagramas, logotipos y referencias se sirven desde archivos del repositorio; la aplicación no depende de un CDN para esos recursos.

## Límites actuales que conviene conocer

- El botón **Actualizar Excel FFDG** fue retirado de la barra MTF. El parser Excel y la función `loadExcelFile` siguen en el código, pero la interfaz ya no ofrece un selector para cargar un workbook.
- El botón **Actualizar PDF FFDG** de MTF abre un selector de archivo PDF. Actualmente no importa el PDF, no actualiza el catálogo y no guarda el archivo.
- El importador BAT desde PDF sí forma parte del flujo BAT.
- Se corrigió el alcance de los helpers MTF que impedía renderizar diagramas. La prueba local mostró el flowchart fuente de FLA-04 y la secuencia SVG de tres pasos para FLA-10, que no tiene diagrama fuente verificado.
- El piloto de reporte MTF FLA-04 sigue sin acceso desde la interfaz; el modal nuevo pertenece únicamente a BAT No Boot y no reactiva ese piloto.
- Los reportes se preparan en el cliente. La aplicación no sube imágenes ni reportes a un servidor y no genera ni descarga automáticamente un PDF.
- Los catálogos importados por la aplicación se guardan en `localStorage` del navegador. Esa información pertenece al perfil/navegador local: no se sincroniza con otros equipos o usuarios y puede perderse al borrar los datos del sitio.
- Los manuales y workbooks originales usados como referencia no forman parte de este repositorio. Los datos y asociaciones incluidos en el código no permiten revalidar por sí solos el contenido contra una versión nueva de esas fuentes.

## Cómo abrir la aplicación localmente

No se requiere un framework, una instalación de paquetes ni un proceso de compilación para servir la página principal. Se recomienda abrir el proyecto mediante un servidor HTTP local porque usa módulos JavaScript y recursos locales.

Desde la raíz del repositorio, con Python 3 instalado:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000/
```

Para detener el servidor local, vuelve a la terminal y presiona `Ctrl+C`. Este servidor sirve los archivos únicamente en el equipo local; no publica el sitio.

## Tecnologías y dependencias locales

- **HTML, CSS y JavaScript** para la interfaz y la lógica de aplicación.
- **SheetJS** empaquetado en `vendor/sheetjs/`, acompañado por su licencia, para leer workbooks Excel en los flujos que lo invocan.
- **PDF.js** bajo `vendor/pdfjs/` para procesar PDF BAT localmente.
- Imágenes, flowcharts y referencias organizados dentro de `assets/`.

No se requiere `npm install` ni hay un paso de build definido por el proyecto. No agregues una dependencia externa o una ruta CDN sin revisar el impacto y las reglas del repositorio.

## Estructura del repositorio

| Ruta | Propósito |
| --- | --- |
| `index.html` | Entrada versionada de GitHub Pages; conserva el markup y carga los estilos y scripts locales en orden. |
| `src/js/app/ffdg-app-core.js` | Lógica de interfaz BAT/MTF extraída del HTML; los catálogos base ya viven en `src/js/data/app-catalog.js`. Sigue siendo un bloque grande para separar gradualmente, una función a la vez. |
| `src/js/bat/`, `src/js/mtf/`, `src/js/shared/` | Scripts organizados por flujo; el código compartido queda separado de BAT y MTF. |
| `src/js/data/` | Catálogo base, semilla BAT, adiciones, mapas y overrides MTF organizados por función y flujo. |
| `src/css/shared/`, `src/css/bat/`, `src/css/mtf/` | Estilos agrupados por ámbito; los enlaces conservan el orden de cascada existente. |
| `assets/brand/`, `assets/topology/`, `assets/icons/` | Logotipos, topología e iconos SVG locales con sus licencias. |
| `assets/flowcharts/mtf/` | Flowcharts MTF originales y sus variantes de imagen hi-res. |
| `assets/reference-images/mtf/` | Imágenes de referencia asociadas a fallas MTF. |
| `vendor/pdfjs/`, `vendor/sheetjs/` | Dependencias locales y sus licencias; no dependen de CDN. |
| `docs/CONTEXTO_FFDIGI.md` | Memoria técnica: arquitectura, decisiones, flujos, límites y puntos de impacto. |
| `docs/HISTORIAL_CAMBIOS_FFDIGI.md` | Solicitudes y registro de cambios relevantes del proyecto. |
| `docs/design-qa.md` | Criterios y notas de revisión visual. |
| `AGENTS.md` | Reglas obligatorias para investigar, modificar, validar y documentar este repositorio. |
| `ffdg_bat.html` | Copia local ignorada por Git; se conserva por compatibilidad, no es entrada canónica ni fuente de cambios. |

Los scripts y recursos se cargan en un orden definido desde `index.html`. Antes de moverlos o cambiar su orden, revisa quién consume sus datos y funciones. Las capturas locales de Playwright se quedan en `output/playwright/`, ignoradas por Git.

## Datos y almacenamiento

Los datos se componen de catálogos base, módulos de adiciones y overrides relacionados con procedimientos o recursos visuales. Los manuales fuente no se incluyen aquí, por lo que las descripciones y asociaciones que estén en el repositorio deben tratarse como contenido versionado del proyecto, no como comprobación automática frente a una edición nueva del manual.

Cuando el usuario importa un catálogo en un flujo disponible, la aplicación puede guardarlo en almacenamiento local del navegador. Las claves observadas son:

- BAT: `ffdg-bat-catalog-v1`
- MTF: `ffdg-mtf-catalog-v2`

El estado guardado puede ser distinto entre navegadores y perfiles. La aplicación no ofrece una API, base de datos central ni sincronización multiusuario.

## Privacidad y alcance de los reportes

- El código interno del piloto de reporte MTF FLA-04 se conserva temporalmente, pero no tiene un botón de acceso en la interfaz. Si se reactiva, su captura permanece en memoria y no se transmite al servidor.
- La evidencia seleccionada para ese reporte se prepara localmente en el navegador.
- El contenido impreso es información declarada por la persona que completa el formulario. No autentica al analista, no confirma el resultado de retest y no libera automáticamente un nodo.
- En BAT, la información de diagnóstico y evidencia del reporte se prepara desde la sesión de la página; revisa el reporte antes de guardarlo o compartirlo.

No incluyas datos sensibles en un reporte salvo que el flujo operativo de tu organización lo permita.

## Desarrollo y cambios

Antes de modificar el proyecto:

1. Lee `AGENTS.md`, `docs/CONTEXTO_FFDIGI.md` y `docs/HISTORIAL_CAMBIOS_FFDIGI.md`.
2. Confirma la rama y los cambios presentes; conserva cualquier trabajo existente.
3. Localiza el código y todos sus consumidores. Mantén BAT y MTF separados salvo que el cambio requiera explícitamente afectar a ambos.
4. Haz el cambio acotado, valida el comportamiento afectado y registra el resultado en `docs/HISTORIAL_CAMBIOS_FFDIGI.md`.
5. Actualiza este `README.md` con cada modificación del proyecto para que siempre describa el comportamiento, los archivos y las instrucciones vigentes. Comprueba que sigue correcto incluso cuando el cambio no requiera editar su contenido.
6. Actualiza `docs/CONTEXTO_FFDIGI.md` cuando cambie la arquitectura, el comportamiento, las dependencias o el estado documentado.

El repositorio no tiene una suite automatizada de pruebas configurada según la documentación técnica actual. Una revisión estática no equivale a una prueba de la aplicación en navegador; describe con precisión qué validación se realizó.

## Compilación y despliegue

El proyecto se ejecuta como una página estática y actualmente no define un proceso de build ni requiere una carpeta `dist`. No generes artefactos de distribución ni despliegues el sitio como parte de una modificación ordinaria. El despliegue a un servidor debe hacerse solo cuando se solicite expresamente y se acuerde el flujo correspondiente.

## Documentación del proyecto

- Este archivo: descripción general y guía de uso/desarrollo.
- [`docs/CONTEXTO_FFDIGI.md`](docs/CONTEXTO_FFDIGI.md): contexto técnico y mapa de impacto.
- [`docs/HISTORIAL_CAMBIOS_FFDIGI.md`](docs/HISTORIAL_CAMBIOS_FFDIGI.md): trazabilidad de solicitudes y cambios.
- [`docs/design-qa.md`](docs/design-qa.md): criterios y notas de revisión visual.
- [`AGENTS.md`](AGENTS.md): reglas de trabajo para futuras modificaciones.
