# AGENTS.md — Reglas obligatorias FFDIGI

Aplica únicamente al repositorio `C:\Users\Jair Iván\Documents\FFDIGI FA BAT\pagina ffdg`.

## Antes de cualquier cambio

1. Leer completos, en este orden:
   - `AGENTS.md`
   - `docs/CONTEXTO_FFDIGI.md`
   - `docs/HISTORIAL_CAMBIOS_FFDIGI.md`
2. Inspeccionar `git status --short --branch`. Preservar cambios modificados, no rastreados e ignorados; no sobrescribir ni descartar trabajo local.
3. Localizar la implementación y todos sus consumidores. Comparar documentación, código actual y estado Git; el código observado demuestra el comportamiento, no necesariamente la intención.
4. Si hay discrepancia o falta una fuente necesaria, investigar y dejarla explícita. No inventar datos, rutas, pasos, asociaciones, etiquetas ni requisitos.

## Alcance y cambios

- Hacer el cambio mínimo. No refactorizar, mover, borrar ni reemplazar archivos sin necesidad autorizada y análisis de impacto.
- Mantener separados BAT y MTF. Un cambio MTF no altera BAT; conservar los diagramas BAT vigentes salvo solicitud explícita.
- Para procedimientos/figuras, asociar por estación, identificador, código, descripción y página fuente. No crear decisiones o ramas que el documento fuente no contenga.
- No tratar `ffdg_bat.html` ignorado como fuente canónica. `index.html` es la entrada versionada; comprobar cualquier copia antes de usarla.
- No introducir dependencias externas sin justificación. La aplicación usa recursos locales; preservar sus rutas y comprobar disponibilidad.
- No cambiar esquemas de `localStorage`, estructura de catálogo, IDs/clases o selectores sin buscar todos sus consumidores.
- No subir archivos ni publicar, hacer commit, push o cambiar autoría salvo petición explícita.

## Validación y documentación

- Validar sintaxis afectada, rutas/archivos referenciados, importación/restauración si aplica, modales e impresión cuando aplique.
- Para cambios visuales, comprobar móvil, tableta y escritorio, más teclado y movimiento reducido para controles interactivos.
- Informar solo pruebas realmente ejecutadas; no confundir revisión estática con prueba en navegador.
- Después de cada cambio relevante, actualizar `docs/HISTORIAL_CAMBIOS_FFDIGI.md`. Actualizar `docs/CONTEXTO_FFDIGI.md` si cambia arquitectura, comportamiento, dependencias, fuentes de verdad, decisiones o estado.
- La entrada de historial registra: fecha, solicitud, objetivo, estado previo, análisis, causa, solución, archivos, funciones/secciones, impacto, validaciones, resultado, pendientes y riesgos.
- Antes de operar Git, revisar rama, tracking, remoto y archivos locales. Nunca usar operaciones destructivas para “limpiar” el árbol sin autorización expresa.

## Secuencia obligatoria

`LEER → INVESTIGAR → ANALIZAR IMPACTO → CAMBIAR LO MÍNIMO → VALIDAR → DOCUMENTAR`.
