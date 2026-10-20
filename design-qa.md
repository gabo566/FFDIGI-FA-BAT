# Revisión visual — catálogo y detalle BAT

final result: passed

## Referencia

- Mockup adjunto por la persona usuaria: `C:\Users\JAIRIV~1\AppData\Local\Temp\codex-clipboard-70a1199e-6421-499a-9241-9a93e350a941.png`.
- Se interpretó como referencia visual para iconos de familia, jerarquía de tres cards y secuencia compacta. El flowchart de muestra no se trató como fuente técnica: se conserva el diagrama BAT real.

## Evidencia capturada

- Ficha BAT, NDBG_080, escritorio 1080×768: `../output/playwright/bat-detail-final-1080x768.png`.
- Catálogo BAT con iconos de las cinco familias, tema claro, escritorio 1468×884: `../output/playwright/bat-catalog-icons-light-1468x884.png`.
- Catálogo BAT con iconos de las cinco familias, tema oscuro, escritorio 1468×884: `../output/playwright/bat-catalog-icons-dark-1468x884.png`.
- Ficha apilada en móvil, 390×844: `../output/playwright/bat-detail-mobile-390x844.png`.

## Comparación y validación

- La ficha usa tres cards simétricas desde 1024 px y cambia a una columna por debajo, sin desbordamiento horizontal.
- La Troubleshooting Sequence conserva todos los títulos en orden; el paso actual se marca y el detalle solo aparece ahí cuando está disponible.
- Los iconos locales de FRU/EEPROM, LEAKAGE, FANS, LOGIC y NO BOOT se distinguen en temas claro y oscuro.
- NDBG_080 y FAN SPEED 1 fueron comprobadas con cinco y cuatro pasos, respectivamente. La navegación actualiza el contador y el paso accesible activo.
- Viewports probados: escritorio 1468×884, 1080×768 y 1024×768; tableta 768×1024; teléfono 390×844. Consola sin errores/advertencias; movimiento reducido desactiva el pulso activo; teclado conserva foco visible.
- Se preservó el flowchart BAT generado a partir de los datos existentes y se evitó copiar contenido técnico inventado del mockup.

## Iteración 2026-10-20 — progreso de pasos y espacio BAT

### Referencia

- Referencia nueva: `C:\Users\JAIRIV~1\AppData\Local\Temp\codex-clipboard-bc79ac58-e8bc-4e4b-8a63-846fb08dfbae.png`.
- Se tomó el acomodo de filas, estados verdes y distribución como guía visual. El diagrama ilustrativo de la imagen no es fuente técnica; se conserva el SVG BAT real y su proporción.

### Evidencia capturada

- NDBG_080, 5 pasos, paso 1 completado/paso 2 activo, escritorio 1113×770: `../output/playwright/bat-step-status-final-1113x770.png`.
- NDBG_031, secuencia de 2 pasos, escritorio 1113×770: `../output/playwright/bat-two-steps-optimized-1113x770.png`.
- NDBG_080, detalle apilado, teléfono 390×844 (captura de página completa): `../output/playwright/bat-detail-mobile-final-390x844.png`.

### Resultado

- El avance se marca al confirmar «Paso siguiente»; el último paso tiene confirmación «Completar secuencia». El estado se conserva al regresar a un paso previo y no se escribe en `localStorage`.
- En escritorio BAT mantiene tres columnas; las filas distribuyen el alto y el flowchart usa el espacio disponible sin deformar el SVG. En tableta/teléfono las cards se apilan.
- Chromium/Playwright comprobó NDBG_080 (5 pasos), NDBG_031 (2 pasos), NDBG_084 (sin pasos), navegación atrás/adelante, finalización, teclado/foco, movimiento reducido y ausencia de overflow a 1113×770, 1024×768, 768×1024 y 390×844.
- Consola: 0 errores y 0 advertencias. Sintaxis de 7 scripts inline clásicos validada. `git diff --check` pasó.

final result: passed

## Iteración 2026-10-20 — ajustar espacios y flowchart BAT

### Evidencia capturada

- NDBG_080, cinco pasos, escritorio 1113×770: `../output/playwright/bat-refine-after-1113x770.png`.
- NDBG_080, cinco pasos, teléfono 390×844: `../output/playwright/bat-refine-mobile-390x844.png`.

### Resultado y validación

- Los cinco metadatos se distribuyen de forma uniforme en la altura restante de Failure Record; no se añadieron ni alteraron campos.
- Flowchart BAT conserva su SVG, proporción y textos. El marco, conectores y bordes de nodos tienen más contraste; el contenido no se recorta.
- Los botones de navegación quedan en 34 px en escritorio y 44 px en anchos táctiles. La barra «Cambiar Falla» y el resto de cards no cambian.
- Playwright/Chromium comprobó NDBG_080 (5 pasos), NDBG_031 (2 pasos) y NDBG_084 (sin pasos; conserva el aviso y no se inventa SVG); viewports 1113×770, 1024×768, 768×1024 y 390×844. Sin overflow horizontal; cards apiladas en tablet/teléfono y controles visibles.
- `prefers-reduced-motion: reduce` mantuvo `animation-duration: 0s`; el foco de teclado quedó visible. Consola de Chromium: 0 errores y 0 advertencias en el servidor correcto.
