# NVIDIA RACKS FFDG — Guía de análisis de fallas GB200 y GB300

Aplicación web estática para consultar procedimientos de diagnóstico **BAT** y fallas de línea **MTF L10** asociadas con sistemas GB200 y GB300. Reúne catálogos, pasos técnicos, referencias visuales y reportes que se preparan en el navegador.

El nombre **FFDG/FFDIGI** se conserva como identificador del proyecto. El repositorio no documenta una expansión formal de esos nombres.

## Para qué sirve

La aplicación ayuda al personal técnico a seleccionar una falla, revisar la información disponible para ella y seguir o registrar actividades de diagnóstico. Tiene dos áreas con objetivos distintos:

- **BAT — Basic Assurance Test:** guía un diagnóstico paso a paso para fallas NDBG y permite preparar un reporte para revisión de Calidad.
- **MTF L10 Failure:** permite buscar fallas de estación, consultar sus metadatos y procedimientos, revisar flowcharts y referencias y, para un caso piloto específico, preparar un reporte de intervención.

La aplicación es una herramienta de consulta y captura. No autentica usuarios, asigna roles ni sustituye los manuales, el workbook fuente o los procesos de autorización y liberación del nodo.

## Funciones

### BAT

- Catálogo de fallas organizado por familias como FRU, Logic, Leak, Fan y No Boot.

- Búsqueda y selección de fallas; el detalle muestra los pasos y recursos asociados.
- Recorrido de diagnóstico con respuestas y notas durante la sesión.
- Captura de identificación del nodo, validaciones, disposición final, causa raíz (RCA) y evidencia fotográfica.
- Secuencia de potencia informativa cuando corresponde.
- Importación local de procedimientos BAT desde PDF y combinación con los datos de la aplicación.
- Preparación de un reporte imprimible para revisión de Calidad. El archivo PDF se crea desde el diálogo del navegador cuando se elige **Guardar como PDF**.

### MTF L10

- Catálogo de fallas con búsqueda y filtros, incluida la selección por estación.
- En la vista Tablero, las estaciones se presentan en orden fijo: FLA, PRET, FLB, AST, FTS, IOT, FCT, RIN, T_VI, OBA y PACKING. Las estaciones disponibles que no estén en esa lista se muestran después por nombre; los conteos se calculan según el catálogo actual.
- Ficha **Failure Record** con la identificación y los metadatos de la falla.
- Secuencia de troubleshooting, pasos, comandos y variantes cuando están disponibles.
- Flowcharts y referencias visuales locales; algunos diagramas se pueden ampliar en un modal.
- Paneles informativos de topología y notificaciones cuando hay contenido asociado.
- Reporte de intervención piloto para la falla **FLA-04** con identidad completa. La captura reúne identificación del nodo, analista, pasos declarados como ejecutados, AC Cycle, resultado, retest, acciones, RCA y evidencia antes/después.
- El reporte FLA-04 se prepara para imprimir; el usuario debe elegir **Guardar como PDF** en el navegador.

### Tema y presentación

- Tema claro y oscuro.
- El título de la falla seleccionada se muestra centrado sobre el fondo rojo oscuro, con texto blanco en BAT y MTF.
- Los pasos BAT y el botón del paso MTF activo tienen un brillo rojo pulsante; la animación se desactiva cuando el sistema solicita movimiento reducido.
- Diseño adaptable para distintos anchos de pantalla.
- Al abrir una falla MTF, el detalle pasa a ocupar la pantalla disponible: se ocultan los logotipos, el selector BAT/MTF, la búsqueda y los controles de la barra; «Cambiar Falla» permite volver al catálogo.
- Diagramas, logotipos y referencias se sirven desde archivos del repositorio; la aplicación no depende de un CDN para esos recursos.

## Límites actuales que conviene conocer

- El botón **Actualizar Excel FFDG** fue retirado de la barra MTF. El parser Excel y la función `loadExcelFile` siguen en el código, pero la interfaz ya no ofrece un selector para cargar un workbook.
- El botón **Actualizar PDF FFDG** de MTF abre un selector de archivo PDF. Actualmente no importa el PDF, no actualiza el catálogo y no guarda el archivo.
- El importador BAT desde PDF sí forma parte del flujo BAT.
- El piloto de reporte MTF está limitado al registro FLA-04 que valida por estación, ID, código y descripción. No debe suponerse habilitado para otras fallas.
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
- **SheetJS** empaquetado como `xlsx.full.min.js`, acompañado por `SHEETJS-LICENSE.txt`, para leer workbooks Excel en los flujos que lo invocan.
- **PDF.js** bajo `vendor/pdfjs/` para procesar PDF BAT localmente.
- Imágenes, flowcharts y referencias dentro de `assets/` y en la raíz.

No se requiere `npm install` ni hay un paso de build definido por el proyecto. No agregues una dependencia externa o una ruta CDN sin revisar el impacto y las reglas del repositorio.

## Estructura del repositorio

| Ruta | Propósito |
| --- | --- |
| `index.html` | Entrada versionada de la aplicación. Contiene la estructura principal, estilos, datos base, estado, renderizado, eventos, importadores, diálogos y plantillas de impresión. |
| `bat-pdf-seed.js` | Datos iniciales/semilla de procedimientos BAT. |
| `mtf-pdf-additions.js` | Registros MTF adicionales derivados de la documentación fuente. |
| `mtf-pdf-procedure-overrides.js` | Ajustes de procedimientos MTF asociados a identidades y páginas verificadas. |
| `mtf-pdf-flowcharts.js` | Datos y lógica complementaria para flowcharts MTF. |
| `mtf-pdf-reference-map.js` | Mapa de referencias visuales MTF y asociaciones con sus registros. |
| `pdf-reference-gallery.js` | Componente reutilizable para presentar galerías de referencias. |
| `mtf-procedure-sequence-flowchart.js` | Presentación lineal de pasos MTF cuando no se dispone de un flowchart fuente aplicable. No agrega ramas ni resultados al procedimiento. |
| `assets/mtf-flowcharts/` | Flowcharts MTF en sus variantes de imagen disponibles. |
| `assets/mtf-reference-images/` | Imágenes de referencia vinculadas con registros MTF. |
| `assets/reference-images/` | Otras capturas de páginas y referencias visuales. |
| `vendor/pdfjs/` | Archivos locales de PDF.js y su licencia. |
| `xlsx.full.min.js`, `SHEETJS-LICENSE.txt` | Distribución local de SheetJS y su licencia. |
| `gb300-board-topology.png` | Imagen de topología GB300 usada por la interfaz. |
| `CONTEXTO_FFDIGI.md` | Memoria técnica: arquitectura, decisiones, flujos, límites y puntos de impacto. |
| `HISTORIAL_CAMBIOS_FFDIGI.md` | Solicitudes y registro de cambios relevantes del proyecto. |
| `AGENTS.md` | Reglas obligatorias para investigar, modificar, validar y documentar este repositorio. |

Los scripts y recursos se cargan en un orden definido desde `index.html`. Antes de moverlos o cambiar su orden, revisa quién consume sus datos y funciones.

## Datos y almacenamiento

Los datos se componen de catálogos base, módulos de adiciones y overrides relacionados con procedimientos o recursos visuales. Los manuales fuente no se incluyen aquí, por lo que las descripciones y asociaciones que estén en el repositorio deben tratarse como contenido versionado del proyecto, no como comprobación automática frente a una edición nueva del manual.

Cuando el usuario importa un catálogo en un flujo disponible, la aplicación puede guardarlo en almacenamiento local del navegador. Las claves observadas son:

- BAT: `ffdg-bat-catalog-v1`
- MTF: `ffdg-mtf-catalog-v2`

El estado guardado puede ser distinto entre navegadores y perfiles. La aplicación no ofrece una API, base de datos central ni sincronización multiusuario.

## Privacidad y alcance de los reportes

- La captura del reporte de intervención MTF FLA-04 se mantiene en memoria para preparar la impresión; no se guarda en el catálogo ni se transmite a un servidor.
- La evidencia seleccionada para ese reporte se prepara localmente en el navegador.
- El contenido impreso es información declarada por la persona que completa el formulario. No autentica al analista, no confirma el resultado de retest y no libera automáticamente un nodo.
- En BAT, la información de diagnóstico y evidencia del reporte se prepara desde la sesión de la página; revisa el reporte antes de guardarlo o compartirlo.

No incluyas datos sensibles en un reporte salvo que el flujo operativo de tu organización lo permita.

## Desarrollo y cambios

Antes de modificar el proyecto:

1. Lee `AGENTS.md`, `CONTEXTO_FFDIGI.md` e `HISTORIAL_CAMBIOS_FFDIGI.md`.
2. Confirma la rama y los cambios presentes; conserva cualquier trabajo existente.
3. Localiza el código y todos sus consumidores. Mantén BAT y MTF separados salvo que el cambio requiera explícitamente afectar a ambos.
4. Haz el cambio acotado, valida el comportamiento afectado y registra el resultado en `HISTORIAL_CAMBIOS_FFDIGI.md`.
5. Actualiza este `README.md` con cada modificación del proyecto para que siempre describa el comportamiento, los archivos y las instrucciones vigentes. Comprueba que sigue correcto incluso cuando el cambio no requiera editar su contenido.
6. Actualiza `CONTEXTO_FFDIGI.md` cuando cambie la arquitectura, el comportamiento, las dependencias o el estado documentado.

El repositorio no tiene una suite automatizada de pruebas configurada según la documentación técnica actual. Una revisión estática no equivale a una prueba de la aplicación en navegador; describe con precisión qué validación se realizó.

## Compilación y despliegue

El proyecto se ejecuta como una página estática y actualmente no define un proceso de build ni requiere una carpeta `dist`. No generes artefactos de distribución ni despliegues el sitio como parte de una modificación ordinaria. El despliegue a un servidor debe hacerse solo cuando se solicite expresamente y se acuerde el flujo correspondiente.

## Documentación del proyecto

- Este archivo: descripción general y guía de uso/desarrollo.
- [`CONTEXTO_FFDIGI.md`](CONTEXTO_FFDIGI.md): contexto técnico y mapa de impacto.
- [`HISTORIAL_CAMBIOS_FFDIGI.md`](HISTORIAL_CAMBIOS_FFDIGI.md): trazabilidad de solicitudes y cambios.
- [`AGENTS.md`](AGENTS.md): reglas de trabajo para futuras modificaciones.
