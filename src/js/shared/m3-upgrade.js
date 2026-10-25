/* M3 upgrade */
  /* FFDG · Capa de mejora Material Design 3
     Uso: pega este archivo completo dentro de un <script> justo antes de </body>
     (o guárdalo junto al HTML y usa <script src="ffdg-m3-upgrade.js"><\/script>). */
  (() => {
    "use strict";
    const $ = id => document.getElementById(id), FFDG = window.FFDG;
    /* ---------- 1. ESTILOS ---------- */
    const css = `
:root{--ease:cubic-bezier(.2,0,0,1);--tert:#8a5100;--tert-c:#ffdcbe;--on-tert-c:#2c1600}
[data-theme=dark]{--tert:#ffb86b;--tert-c:#5a3300;--on-tert-c:#ffdcbe}
[data-st=FLA]{--st:#1565c0}[data-st=PRET]{--st:#7b1fa2}[data-st=FLB]{--st:#00838f}[data-st=FCT]{--st:#ef6c00}
[data-st=FTS]{--st:#c62828}[data-st=IOT]{--st:#2e7d32}[data-st=NVL]{--st:#4527a0}[data-st=AST]{--st:#ad1457}[data-st=RIN]{--st:#00695c}[data-st=FLC]{--st:#5d4037}[data-st=OBA]{--st:#546e7a}[data-st=ALL]{--st:#546e7a}
body{background:radial-gradient(900px 420px at 88% -8%,color-mix(in srgb,var(--md-sys-color-primary) 16%,transparent),transparent),var(--md-sys-color-surface)}
.m3-top-app-bar{position:sticky;top:0;z-index:20;background:linear-gradient(90deg,#000 55%,#10200a)}
.m3-card{background:var(--md-sys-color-surface-container-lowest);border:1px solid var(--md-sys-color-outline-variant);border-radius:var(--md-shape-corner-xl);padding:20px 22px;margin-bottom:16px;box-shadow:var(--md-elevation-1)}
.m3-card-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.m3-card-title{margin:0;font-size:17px;font-weight:700;color:var(--md-sys-color-on-surface)}
.m3-card .mtf-tag{border-radius:var(--md-shape-corner-s);padding:3px 10px}
.m3-btn,.filter-chip-btn,.m3-seg-btn,.theme-switch-btn{position:relative;overflow:hidden;isolation:isolate;-webkit-tap-highlight-color:transparent}
.m3-btn::before,.filter-chip-btn::before,.m3-seg-btn::before,.theme-switch-btn::before{content:"";position:absolute;inset:0;background:currentColor;opacity:0;transition:opacity .15s;z-index:-1}
.m3-btn:hover::before,.filter-chip-btn:hover::before,.m3-seg-btn:hover::before,.theme-switch-btn:hover::before{opacity:.08}
.m3-btn:active::before,.filter-chip-btn:active::before,.m3-seg-btn:active::before{opacity:.14}
.m3-btn:focus-visible,.filter-chip-btn:focus-visible,.m3-seg-btn:focus-visible,.theme-switch-btn:focus-visible,.terminal-copy-btn:focus-visible{outline:3px solid var(--md-sys-color-primary);outline-offset:2px}
.m3-btn{height:40px;padding:0 24px;letter-spacing:.01em}
.m3-btn:has(svg){padding-left:16px}
.m3-btn svg{width:18px;height:18px;flex:none}
.m3-btn:active:not(:disabled){transform:scale(.97)}
.m3-btn-filled,.m3-btn-success,.m3-btn-error{box-shadow:var(--md-elevation-1)}
.m3-btn-filled:hover:not(:disabled),.m3-btn-success:hover:not(:disabled),.m3-btn-error:hover:not(:disabled){box-shadow:var(--md-elevation-2);opacity:1}
.m3-btn-outlined,.m3-btn-tonal{box-shadow:none}
.m3-ripple{position:absolute;border-radius:50%;background:currentColor;opacity:.22;transform:scale(0);animation:m3r .6s var(--ease) forwards;pointer-events:none;z-index:-1}
@keyframes m3r{to{transform:scale(1);opacity:0}}
.m3-segmented-nav{padding:4px;box-shadow:var(--md-elevation-1)}
.m3-seg-btn{height:40px}
.m3-seg-btn.active svg{display:none}
.m3-seg-btn.active::after{content:"✓";order:-1;font-weight:800}
.filter-chip-btn,.filter-chip-btn:hover{background:transparent;color:var(--md-sys-color-on-surface-variant);border-color:var(--md-sys-color-outline);height:32px;padding:0 14px;border-radius:var(--md-shape-corner-s)}
.filter-chip-btn.active,.filter-chip-btn.active:hover{background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container);border-color:transparent}
.m3-input,.m3-select,.m3-textarea{border-radius:var(--md-shape-corner-m);border-color:var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container-low)}
.m3-input:hover,.m3-select:hover,.m3-textarea:hover{border-color:var(--md-sys-color-outline)}
.m3-input:focus,.m3-select:focus,.m3-textarea:focus{outline:none;border-color:var(--md-sys-color-primary);box-shadow:0 0 0 2px var(--md-sys-color-primary);background:var(--md-sys-color-surface-container-lowest)}
.m3-progress-track{height:8px}
.m3-progress-fill{background:linear-gradient(90deg,var(--md-sys-color-primary),var(--nvidia-green))}
.history-entry{border-radius:var(--md-shape-corner-l);background:var(--md-sys-color-surface-container-low)}
.callout-box{border-radius:var(--md-shape-corner-l)}
.mtf-cards-scroll-grid{max-height:250px}
.mtf-item-card{border-radius:var(--md-shape-corner-m);border-left:5px solid var(--st,var(--md-sys-color-outline-variant))}
.mtf-item-card[data-st] .mtf-tag,.mtf-item-card.selected[data-st] .mtf-tag{background:var(--st);color:#fff}
.mtf-item-card.selected{border:2px solid var(--md-sys-color-primary);border-left:5px solid var(--st,var(--md-sys-color-primary))}
#mtf-badge-station{background:var(--st,var(--md-sys-color-primary))!important;color:#fff!important}
.m3-step-pill{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m3-step-pill.done{background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container)}
.m3-step-pill.done::before{content:"✓ ";margin-right:3px}
.mtf-row-1,.mtf-row-2,.mtf-row-3{border-radius:var(--md-shape-corner-xl)}
input[type=file]::file-selector-button{border:none;border-radius:999px;padding:8px 16px;margin-right:12px;font:600 12.5px inherit;font-family:inherit;cursor:pointer;background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container)}
#evidence-input{width:100%;padding:18px 12px;border:2px dashed var(--md-sys-color-outline-variant);border-radius:var(--md-shape-corner-l);background:var(--md-sys-color-surface-container-low);color:var(--md-sys-color-on-surface-variant)}
.pw-seq{list-style:none;margin:0;padding:0}
.pw-seq li{display:flex;gap:12px;position:relative;padding-bottom:14px}
.pw-seq li:last-child{padding-bottom:0}
.pw-seq li:not(:last-child)::after{content:"";position:absolute;left:17px;top:36px;bottom:2px;width:2px;background:var(--md-sys-color-outline-variant)}
.pw-ic{width:36px;height:36px;border-radius:50%;flex:none;display:grid;place-items:center;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container)}
.pw-ic svg{width:20px;height:20px}
.pw-seq b{display:block;font-size:13px;color:var(--md-sys-color-on-surface)}
.pw-seq span{font-size:11.5px;color:var(--md-sys-color-on-surface-variant)}
.ill{max-width:100%;height:auto}
.i-b{fill:var(--md-sys-color-surface-container-high);stroke:var(--md-sys-color-outline);stroke-width:2}
.i-p{fill:var(--md-sys-color-primary-container);stroke:var(--md-sys-color-primary);stroke-width:1.5}
.i-d{fill:var(--md-sys-color-primary)}
.i-f{fill:var(--md-sys-color-surface-container-lowest);stroke:var(--md-sys-color-outline);stroke-width:2}
.i-fl{stroke:var(--md-sys-color-outline);stroke-width:2.5;stroke-linecap:round;fill:none}
.i-fan{transform-box:fill-box;transform-origin:center;animation:spin 3s linear infinite}
.i-led{animation:blink 1.6s ease-in-out infinite}
.i-m{fill:color-mix(in srgb,var(--md-sys-color-surface-container-lowest) 70%,transparent);stroke:var(--md-sys-color-primary);stroke-width:5}
@keyframes spin{to{transform:rotate(360deg)}}@keyframes blink{50%{opacity:.25}}
.fc-l{fill:none;stroke:var(--md-sys-color-outline);stroke-width:2}
.fc-lr{stroke:var(--md-sys-color-error)}
.fc-ar{fill:var(--md-sys-color-outline)}.fc-arr{fill:var(--md-sys-color-error)}
.fc-g .fc-n{fill:var(--md-sys-color-surface-container-high);stroke:var(--md-sys-color-outline-variant);stroke-width:1.5}
.fc-g text{fill:var(--md-sys-color-on-surface-variant);font-weight:700}
.fc-g.done .fc-n{fill:var(--md-sys-color-primary-container);stroke:var(--md-sys-color-primary)}
.fc-g.done text{fill:var(--md-sys-color-on-primary-container)}
.fc-g.on .fc-n{fill:var(--md-sys-color-primary);stroke:var(--md-sys-color-on-surface);stroke-width:3;filter:drop-shadow(0 3px 6px rgba(0,0,0,.35))}
.fc-g.on text{fill:var(--md-sys-color-on-primary)}
.fc-dm .fc-n{fill:var(--tert-c)!important;stroke:var(--tert)!important}.fc-dm text{fill:var(--on-tert-c)!important}
.fc-ok .fc-n{fill:var(--md-sys-color-success-container)!important;stroke:var(--md-sys-color-success)!important}.fc-ok text{fill:var(--md-sys-color-on-success-container)!important}
.fc-er .fc-n{fill:var(--md-sys-color-error-container)!important;stroke:var(--md-sys-color-error)!important}.fc-er text{fill:var(--md-sys-color-on-error-container)!important}
.fc-p{fill:var(--md-sys-color-success);font-size:10.5px;font-weight:800}.fc-f{fill:var(--md-sys-color-error);font-size:10.5px;font-weight:800}
.brand-chips{display:flex;gap:8px;margin-right:6px}
.brand-chip{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px 0 8px;border-radius:999px;background:rgba(118,185,0,.14);border:1px solid #76b900;color:#c8f26b;font-weight:800;font-size:12.5px;letter-spacing:.04em}
.brand-chip svg{width:18px;height:18px}
.brand-chip.b300{background:#76b900;color:#000}
.nvidia-badge-wrapper{width:56px!important;height:56px!important;filter:drop-shadow(0 0 10px rgba(118,185,0,.55))}
.app-brand-title{font-size:22px!important}
.app-brand-subtitle{color:#9fe03a!important;font-size:12px!important}
.card-ic{width:36px;height:36px;border-radius:12px;flex:none;display:grid;place-items:center;margin-right:10px;background:linear-gradient(135deg,#76b900,#2d6b00);color:#fff;box-shadow:0 2px 8px rgba(118,185,0,.4)}
.card-ic svg{width:20px;height:20px}
.m3-card-header>:first-child{display:flex;align-items:center}
@media(max-width:760px){.brand-chips{display:none}}
@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
@media print{.m3-ripple{display:none}}`;
    const st = document.createElement("style");
    st.id = "m3-upgrade"; st.textContent = css; document.head.appendChild(st);
    /* ---------- 2. RIPPLE ---------- */
    document.addEventListener("pointerdown", e => {
      const b = e.target.closest(".m3-btn,.filter-chip-btn,.m3-seg-btn,.theme-switch-btn");
      if (!b || b.disabled) return;
      const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
      const s = document.createElement("span");
      s.className = "m3-ripple";
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      b.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    });
    /* ---------- 3. ICONOS EN BOTONES ---------- */
    const ic = p => `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${p}"/></svg>`;
    const icons = {
      "start-btn": ["M8 5v14l11-7z"],
      "clear-btn": ["M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"],
      "new-btn": ["M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"],
      "yes-btn": ["M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z", "Sí · Pasa verificación"],
      "no-btn": ["M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z", "No · Presenta anomalía"]
    };
    Object.entries(icons).forEach(([id, [p, label]]) => {
      const b = $(id); if (!b) return;
      const txt = label || b.textContent.trim();
      b.innerHTML = ic(p) + `<span>${txt}</span>`;
    });
    /* ---------- 4. ILUSTRACIONES ---------- */
    const trayIll = `<svg class="ill" viewBox="0 0 240 134" width="250" aria-hidden="true">
<ellipse cx="120" cy="120" rx="100" ry="6" fill="var(--md-sys-color-outline-variant)" opacity=".6"/>
<rect x="20" y="30" width="200" height="76" rx="12" class="i-b"/>
<rect x="30" y="40" width="62" height="56" rx="7" class="i-p"/><rect x="100" y="40" width="62" height="56" rx="7" class="i-p"/>
<g class="i-d"><rect x="38" y="48" width="14" height="14" rx="2"/><rect x="58" y="48" width="26" height="4" rx="2"/><rect x="58" y="58" width="18" height="4" rx="2"/><rect x="108" y="48" width="14" height="14" rx="2"/><rect x="128" y="48" width="26" height="4" rx="2"/><rect x="128" y="58" width="18" height="4" rx="2"/></g>
<rect x="38" y="72" width="46" height="16" rx="3" fill="none" stroke="var(--md-sys-color-primary)" stroke-width="1.5" stroke-dasharray="4 3"/>
<rect x="108" y="72" width="46" height="16" rx="3" fill="none" stroke="var(--md-sys-color-primary)" stroke-width="1.5" stroke-dasharray="4 3"/>
<g><circle cx="192" cy="54" r="13" class="i-f"/><g class="i-fan"><path class="i-fl" d="M192 44v20M182 54h20"/></g>
<circle cx="192" cy="86" r="13" class="i-f" style="display:none"/></g>
<circle cx="184" cy="92" r="3" fill="var(--nvidia-green)" class="i-led"/><circle cx="194" cy="92" r="3" fill="var(--md-sys-color-error)" class="i-led" style="animation-delay:.5s"/>
<circle cx="188" cy="82" r="20" class="i-m" transform="translate(30 8)"/>
<path d="M232 104l14 14" stroke="var(--md-sys-color-primary)" stroke-width="6" stroke-linecap="round" transform="translate(-6 -6)"/></svg>`;
    const clipIll = `<svg class="ill" viewBox="0 0 120 80" width="120" aria-hidden="true"><rect x="34" y="6" width="52" height="68" rx="8" class="i-b"/><rect x="48" y="2" width="24" height="12" rx="5" class="i-p"/>
<path d="M44 28l4 4 8-8M44 44l4 4 8-8" fill="none" stroke="var(--md-sys-color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="62" y="28" width="16" height="4" rx="2" class="i-d" opacity=".5"/><rect x="62" y="44" width="16" height="4" rx="2" class="i-d" opacity=".5"/><rect x="44" y="58" width="34" height="4" rx="2" class="i-d" opacity=".25"/></svg>`;
    const me = $("mtf-empty");
    if (me) me.innerHTML = trayIll + `<p style="margin:10px 0 0;font-weight:700;font-size:14px">Select a failure from the catalog above to view the technical procedure and diagnostic commands.</p>`;
    const he = $("history-empty");
    if (he) he.innerHTML = `<div style="text-align:center;padding:6px 0">${clipIll}<div>Inicia el diagnóstico para generar la trazabilidad de mediciones del nodo.</div></div>`;
    /* Secuencia de potencia como línea de tiempo */
    const seqCard = document.querySelectorAll("#bat-layout aside .m3-card")[1];
    const seqP = seqCard && seqCard.querySelector("p");
    if (seqP) {
      const items = [
        ["M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51C12.96 17.55 11 21 11 21z", "PDB 12V Main", "Riel principal de entrada"],
        ["M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.99 6.99 0 0119 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17A9 9 0 003 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z", "Rieles Standby", "3.3V_STBY / 12V_STBY"],
        ["M3 13h4l2-6 4 12 2-6h6v-2h-4.5l-1 3-4-12-2 6H3z", "BMC / HMC", "Heartbeat LED activo"],
        ["M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z", "CPLD", "Habilita PWR_GOOD"],
        ["M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z", "VCORE", "CPU Grace y GPUs"]
      ];
      const ol = document.createElement("ol");
      ol.className = "pw-seq";
      ol.innerHTML = items.map(([p, t, s]) => `<li><div class="pw-ic">${ic(p)}</div><div><b>${t}</b><span>${s}</span></div></li>`).join("");
      seqP.replaceWith(ol);
    }
    /* ---------- 5. DIAGRAMA DE FLUJO M3 (con paso activo) ---------- */
    const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const clean = t => (t || "").split("\n")[0].replace(/^(paso\s*)?\d+[.:]?\s*/i, "").trim();
    const tr = (s, n) => s.length > n ? s.slice(0, n - 1) + "…" : s;
    // No reactivar: su plantilla histórica agrega decisiones no respaldadas por el PDF.
    function drawFlowLegacy() {
      const f = FFDG.state.mtfSelected, box = $("mtf-flowchart-diagram");
      if (!f || !box) return;
      const steps = FFDG.ui.getActiveSteps(f);
      if (!steps.length) {
        const message = f.procedureSheet
          ? `The ${f.procedureSheet} sheet exists, but it contains no recognizable steps. No action sequence was generated.`
          : "The Excel file has no procedure sheet associated by Tab No. No action sequence was generated.";
        box.innerHTML = `<div class="mtf-no-procedure">${esc(message)}</div>`;
        return;
      }
      const cur = FFDG.state.mtfFinished ? 99 : FFDG.state.mtfIndex;
      const cl = i => i < cur ? "done" : i === cur ? "on" : "";
      const acts = steps.slice(1);
      const n = acts.length, yl = n ? 125 + (n - 1) * 56 : 100, H = Math.max(310, yl + 100);
      const stn = esc((f.station || "FLA").split("/")[0].trim());
      const pill = (x, y, w, t, c) => `<g class="fc-g ${c}"><rect class="fc-n" x="${x}" y="${y}" width="${w}" height="32" rx="16"/><text x="${x + w / 2}" y="${y + 20}" font-size="11" text-anchor="middle">${esc(t)}</text></g>`;
      let s = `<svg viewBox="0 0 760 ${H}" preserveAspectRatio="xMidYMin meet" width="100%" role="img" aria-label="Diagnostic flowchart" style="display:block">
<defs><marker id="m3a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path class="fc-ar" d="M0 1.5L8 5 0 8.5z"/></marker>
<marker id="m3r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path class="fc-arr" d="M0 1.5L8 5 0 8.5z"/></marker></defs>
${pill(305, 16, 170, `${String(steps[0].sourceNumber || "1").replace(/[.:]$/, "")}. ` + tr(clean(steps[0].title) || "", 20), cl(0))}
<path class="fc-l" d="M390 48V70" marker-end="url(#m3a)"/>
<g class="fc-g fc-dm"><polygon class="fc-n" points="390,74 445,100 390,126 335,100"/><text x="390" y="104" font-size="12" text-anchor="middle">Re-Test</text></g>
<path class="fc-l" d="M445 100H590V141" marker-end="url(#m3a)"/><text class="fc-p" x="505" y="93">Pass</text>
<g class="fc-g fc-dm"><polygon class="fc-n" points="590,145 650,175 590,205 530,175"/><text x="590" y="172" font-size="9" text-anchor="middle">Re-run diags</text><text x="590" y="184" font-size="8.5" text-anchor="middle">up to ${stn}</text></g>
<path class="fc-l" d="M650 175H695V32H479" marker-end="url(#m3a)"/><text class="fc-f" x="658" y="168">Fail</text>
<path class="fc-l" d="M590 205V241" marker-end="url(#m3a)"/><text class="fc-p" x="598" y="226">Pass</text>
<g class="fc-ok">${pill(515, 245, 150, "Next station", "")}</g>
<path class="fc-l" d="M390 126V144H289" marker-end="url(#m3a)"/><text class="fc-f" x="345" y="137">Fail</text>
<path class="fc-l" d="M40 ${yl + 19}V100H331" marker-end="url(#m3a)"/>`;
      acts.forEach((a, i) => {
        const y = 125 + i * 56;
        s += `<g class="fc-g ${cl(i + 1)}"><rect class="fc-n" x="75" y="${y}" width="210" height="38" rx="12"/>
<text x="180" y="${y + 16}" font-size="9.5" text-anchor="middle">${esc(tr(`${a.sourceNumber || i + 2}. ${clean(a.title)}`, 29))}</text>
<text x="180" y="${y + 29}" font-size="8" font-weight="500" text-anchor="middle" style="opacity:.8">Run action and retest</text></g>
<path class="fc-l" d="M75 ${y + 19}H40"/>`;
        if (i < n - 1) s += `<path class="fc-l" d="M180 ${y + 38}V${y + 52}" stroke-dasharray="3 3" marker-end="url(#m3a)"/><text class="fc-f" x="192" y="${y + 48}" style="font-size:7.5px">Fail</text>`;
        else s += `<path class="fc-l fc-lr" d="M180 ${y + 38}V${y + 46}" stroke-dasharray="3 3" marker-end="url(#m3r)"/><g class="fc-er">${pill(100, y + 50, 160, "Escalate to Level 2 FA", "")}</g>`;
      });
      box.innerHTML = s + "</svg>";
      const b = $("mtf-badge-station");
      if (b) b.dataset.st = stn;
    }
    function drawFlow() {
      const f = FFDG.state.mtfSelected, box = $("mtf-flowchart-diagram");
      if (!f || !box) return;
      if (f.flowchartImage && Number(f.flowchartImageWidth) > 0 && Number(f.flowchartImageHeight) > 0) {
        const width = Number(f.flowchartImageWidth), height = Number(f.flowchartImageHeight);
        const zoomSource = window.FFDG_MTF_PDF_FLOWCHART_ZOOM_IMAGES?.[String(f.flowchartImage).split("/").pop()];
        box.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMin meet" role="img" aria-label="Original FFDG diagram for ${esc(f.station || "MTF")}" ${zoomSource ? `data-flowchart-hi-res-src="${esc(zoomSource)}" data-flowchart-dpi="400"` : ""} style="display:block;width:100%;height:auto;max-height:min(68vh,600px)"><image href="${esc(f.flowchartImage)}" width="${width}" height="${height}" preserveAspectRatio="xMidYMin meet"></image></svg>`;
        return;
      }
      const graph = f.flowchartGraph || (window.FFDG_MTF_PDF_FLOWCHART_GRAPHS || {})[f.id];
      if (graph
        && window.FFDG.renderMtfPdfVectorFlowchart?.(box, graph, Math.max(0, FFDG.state.mtfIndex || 0))) return;
      const steps = FFDG.ui.getActiveSteps(f);
      if (!steps.length) {
        const message = f.procedureSheet
          ? `The ${f.procedureSheet} sheet exists, but it contains no recognizable steps. No action sequence was generated.`
          : "No procedure steps are available for this failure.";
        box.innerHTML = `<div class="mtf-no-procedure">${esc(message)}</div>`;
        return;
      }
      const sequenceRenderer = window.FFDG.renderMtfProcedureStepFlowchart;
      if (typeof sequenceRenderer === "function"
        && sequenceRenderer(box, steps, FFDG.state.mtfIndex || 0, `${f.station || "MTF"} · ${f.id || f.code || ""}`)) return;
      box.innerHTML = '<div class="mtf-no-procedure">No verified source diagram is available for this failure. The procedure steps are preserved; no decisions or outcomes are inferred.</div>';
    }
    /* ---------- 6. OBSERVADORES ---------- */
    const watch = (id, fn) => { const el = $(id); if (el) new MutationObserver(fn).observe(el, { childList: true }); };
    watch("mtf-step", drawFlow);
    watch("mtf-path", () => {
      const p = [...$("mtf-path").children], a = p.findIndex(x => x.classList.contains("active"));
      p.forEach((x, i) => x.classList.toggle("done", FFDG.state.mtfFinished ? true : i < a));
    });
    watch("mtf-fault-list", () => {
      $("mtf-fault-list").querySelectorAll(".mtf-item-card:not([data-st])").forEach(c => {
        const t = c.querySelector(".mtf-tag");
        if (t) c.dataset.st = t.textContent.split("/")[0].trim();
      });
    });
    /* ---------- 7. MARCA: NOMBRE, LOGO NVIDIA E ICONOS ---------- */
    const NEW_SUB = "GUÍA DE ANÁLISIS DE FALLA GB200 Y GB300";
    const eye = `<svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="NVIDIA"><rect width="64" height="64" rx="12" fill="#000"/>
<path d="M7 34c6-11 15-17 25-17s19 6 25 17c-6 11-15 17-25 17S13 45 7 34z" fill="none" stroke="#76B900" stroke-width="5" stroke-linejoin="round"/>
<circle cx="32" cy="34" r="10" fill="#76B900"/><circle cx="32" cy="34" r="4.2" fill="#000"/>
<path d="M30 9c8-1 16 2 22 8" stroke="#76B900" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M8 58h48" stroke="#76B900" stroke-width="2.5" stroke-linecap="round" opacity=".7"/></svg>`;
    document.title = "Nvidia Racks FFDG · " + NEW_SUB;
    const sub = document.querySelector(".app-brand-subtitle");
    if (sub) sub.textContent = "GUÍA DE ANÁLISIS DE FALLA";
    const w = document.querySelector(".nvidia-badge-wrapper");
    const eyeG = `<g fill="none" stroke="#76B900" stroke-linejoin="round" stroke-linecap="round"><path d="M6 40c8-15 21-24 36-24s28 9 36 24c-8 15-21 24-36 24S14 55 6 40z" stroke-width="7"/><path d="M38 6c11-2 24 3 33 12" stroke-width="6"/></g><circle cx="42" cy="40" r="14" fill="#76B900"/><circle cx="42" cy="40" r="6" fill="#000"/>`;
    const bigLogo = `<svg viewBox="0 0 270 80" style="height:68px;width:auto;display:block" role="img" aria-label="NVIDIA">${eyeG}<text x="92" y="57" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="#fff" letter-spacing="1">NVIDIA</text></svg>`;
    const faultLogo = `<svg class="fault-emblem" viewBox="0 0 120 120" style="height:132px;width:auto;display:block" role="img" aria-label="Análisis de falla"><defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8f04a"/><stop offset="1" stop-color="#2d6b00"/></linearGradient><radialGradient id="fr"><stop offset="0" stop-color="#ff6e6e"/><stop offset="1" stop-color="#b71c1c"/></radialGradient></defs>
<polygon points="60,4 108,32 108,88 60,116 12,88 12,32" fill="#0b1207" stroke="url(#fg)" stroke-width="5"/>
<path d="M46 28v12M60 28v12M74 28v12M46 80v12M60 80v12M74 80v12M28 46h12M28 60h12M28 74h12M80 46h12M80 60h12M80 74h12" stroke="#76B900" stroke-width="3.5" stroke-linecap="round"/>
<rect x="40" y="40" width="40" height="40" rx="6" fill="#76B900"/><text x="56" y="64" font-size="19" font-weight="900" text-anchor="middle" fill="#000" font-family="Arial,sans-serif">GB</text>
<path d="M68 40l-9 13 10 5-8 22" stroke="#0b1207" stroke-width="3" fill="none" stroke-linejoin="round"/>
<circle cx="85" cy="85" r="14" fill="rgba(0,0,0,.7)" stroke="#fff" stroke-width="4.5"/><path d="M95 95l7 7" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
<path d="M85 75l9 16H76z" fill="url(#fr)" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/><path d="M85 80v5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="85" cy="88.2" r="1.3" fill="#fff"/></svg>`;
    if (w) w.innerHTML = bigLogo;
    const bs = document.createElement("style");
    bs.textContent = `.m3-top-app-bar{padding:18px 32px!important;gap:20px;background:radial-gradient(600px 160px at 12% 0,rgba(118,185,0,.28),transparent),linear-gradient(90deg,#000 50%,#10200a)!important;border-bottom-width:4px!important}
.app-brand{gap:22px!important}
.nvidia-badge-wrapper{width:auto!important;height:auto!important;filter:drop-shadow(0 0 14px rgba(118,185,0,.6))}
.app-brand-title{font-size:30px!important;font-weight:900!important;letter-spacing:.04em!important;line-height:1.1}
.app-brand-subtitle{font-size:20px!important;font-weight:800!important;letter-spacing:.1em!important;margin:4px 0 8px!important;color:#9fe03a!important;text-shadow:0 0 18px rgba(118,185,0,.5)}
.app-brand .brand-chips{margin:0}
.fault-emblem{filter:drop-shadow(0 0 10px rgba(118,185,0,.55));animation:pulseR 2.8s ease-in-out infinite}
@keyframes pulseR{50%{filter:drop-shadow(0 0 16px rgba(255,82,82,.75))}}
.header-actions{gap:18px!important}
@media(max-width:900px){.m3-top-app-bar{padding:14px 16px!important}.app-brand{flex-wrap:wrap;gap:12px!important}.app-brand-title{font-size:22px!important}.app-brand-subtitle{font-size:14px!important}.nvidia-badge-wrapper svg{height:48px!important}.fault-emblem{height:84px!important}.brand-chips{display:flex!important}}`;
    document.head.appendChild(bs);
    const ico = document.createElement("link");
    ico.rel = "icon"; ico.href = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 80"><rect width="84" height="80" rx="14" fill="#000"/>${eyeG}</svg>`);
    document.head.appendChild(ico);
    document.querySelectorAll("#bat-print-report .print-head svg").forEach(v => { const h = v.parentElement; h.innerHTML = eye; });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      if (n.parentElement && n.parentElement.closest("script,style")) return;
      if (/ANÁLISIS DE FALLA GB200 Y GB300/.test(n.nodeValue) && !/GUÍA DE ANÁLISIS/.test(n.nodeValue))
        n.nodeValue = n.nodeValue.replace("ANÁLISIS DE FALLA GB200 Y GB300", NEW_SUB);
    });
    /* Chips GB200 / GB300 en la barra superior */
    const chipIc = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z"/></svg>';
    const ha = document.querySelector(".header-actions");
    if (ha) {
      const c = document.createElement("div");
      c.className = "brand-chips";
      c.innerHTML = `<span class="brand-chip">${chipIc}GB200</span><span class="brand-chip b300">${chipIc}GB300</span>`;
      if (sub && sub.parentElement) sub.parentElement.appendChild(c);
      const fe = document.createElement("div"); fe.innerHTML = faultLogo; ha.prepend(fe);
    }
    /* Icono llamativo en cada tarjeta */
    const cardIcons = [
      [/Identificaci/i, "M4 6h16v5H4V6zm0 7h16v5H4v-5zm2-5v1h2V8H6zm0 7v1h2v-1H6z"],
      [/Historial/i, "M13 3a9 9 0 00-9 9H1l4 4 4-4H6a7 7 0 117 7v2a9 9 0 000-18zm-1 5v5l4 2 .8-1.5-3.3-1.9V8H12z"],
      [/Disposici/i, "M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm-1 15l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z"],
      [/Evidencia/i, "M12 15.2A3.2 3.2 0 1012 8.8a3.2 3.2 0 000 6.4zM9 2L7.2 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-3.2L15 2H9z"],
      [/Secuencia/i, "M7 2v11h3v9l7-12h-4l4-8H7z"],
      [/Cat[aá]logo/i, "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"]
    ];
    document.querySelectorAll(".m3-card-title").forEach(t => {
      if (t.querySelector(".card-ic")) return;
      const m = cardIcons.find(([re]) => re.test(t.textContent));
      if (!m) return;
      const d = document.createElement("span");
      d.className = "card-ic"; d.innerHTML = ic(m[1]);
      t.prepend(d); t.style.display = "flex"; t.style.alignItems = "center";
    });
    const cat = document.querySelector(".mtf-row-2-header span");
    if (cat && !cat.querySelector(".card-ic")) { const d = document.createElement("span"); d.className = "card-ic"; d.innerHTML = ic(cardIcons[5][1]); cat.parentElement.prepend(d); }
    /* ---------- 8. VISTA: ANCHO COMPLETO, PESTAÑAS-TILE Y CATÁLOGO EN LISTA TÉCNICA ---------- */
    const vs = document.createElement("style");
    vs.textContent = `
main{max-width:none!important;width:100%;min-width:0;padding:10px clamp(12px,2vw,24px) 40px!important}
.m3-top-app-bar{position:static!important}
.m3-segmented-nav-wrap{display:block!important;padding:16px clamp(12px,2vw,24px) 4px!important}
.m3-segmented-nav{display:grid!important;grid-template-columns:1fr 1fr;gap:14px;width:100%;background:none!important;border:none!important;box-shadow:none!important;padding:0!important;border-radius:0!important}
.m3-seg-btn{position:relative;height:auto!important;padding:14px 20px!important;border-radius:20px!important;border:1px solid var(--md-sys-color-outline-variant)!important;background:var(--md-sys-color-surface-container-low)!important;color:var(--md-sys-color-on-surface)!important;display:block!important;justify-content:center!important;text-align:center!important;gap:0!important}
.m3-seg-btn.active{background:linear-gradient(115deg,#1b3600,#2d6b00 55%,#5a9a00)!important;color:#fff!important;border-color:#76b900!important;box-shadow:0 6px 18px rgba(45,107,0,.35)!important}
.m3-seg-btn.active svg{display:block!important}.m3-seg-btn.active::after{content:none!important}
.tile-ic{position:absolute;left:20px;top:50%;transform:translateY(-50%);width:52px;height:52px;border-radius:16px;display:grid;place-items:center;background:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container)}
.m3-seg-btn.active .tile-ic{background:rgba(255,255,255,.16);color:#fff}
.tile-ic svg{width:28px!important;height:28px!important}
.tile-tx{display:block;width:100%;padding:0 58px;text-align:center}.tile-tx b{display:block;font-size:18px;font-weight:800;letter-spacing:.01em}.tile-tx small{font-size:12.5px;opacity:.8;font-weight:500}
.view-tg{display:inline-flex;border:1px solid var(--md-sys-color-outline);border-radius:999px;overflow:hidden}
.view-tg button{border:0;background:transparent;color:var(--md-sys-color-on-surface-variant);font:700 12px inherit;font-family:inherit;padding:6px 14px;cursor:pointer}
.view-tg button.on{background:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container)}
#mtf-layout.mtf-split:not(.hidden){display:grid;grid-template-columns:minmax(280px,26%) minmax(0,1fr);gap:14px;align-items:start}
.mtf-split .mtf-row-2-header{grid-column:1/-1}
.mtf-split .mtf-row-1,.mtf-split #upload-status{grid-column:1/-1;min-width:0;width:100%;box-sizing:border-box}.mtf-split .mtf-row-1-search{min-width:0}.mtf-split .mtf-row-1-search input{min-width:0}.mtf-split .mtf-filter-chips{min-width:0;max-width:100%;overflow-x:auto;scrollbar-width:thin}.mtf-split .mtf-row-1>label{flex:0 1 auto;max-width:100%}
.mtf-split .mtf-row-2-header>span{display:none}.view-tg button{white-space:nowrap}.mtf-row-2-header{gap:10px;flex-wrap:wrap}
.mtf-row-2-header{background:#111!important;border-color:#111!important;color:#fff}
.mtf-row-2-header .mtf-catalog-title,.mtf-row-2-header .mtf-design-label,.mtf-row-2-header .mtf-scroll-hint{color:#fff!important}
.mtf-row-2-header #mtf-count{background:#343a32;color:#fff}
.mtf-row-2-header .view-tg{border-color:#858585}
.mtf-row-2-header .view-tg button{color:#fff}
.mtf-row-2-header .view-tg button.on{background:#343a32;color:#fff}
.mtf-row-2-header .mtf-notifications-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:8px 12px;border:1px solid #76b900;border-radius:999px;background:linear-gradient(115deg,#1b3600,#2d6b00 55%,#5a9a00);color:#fff!important;font-family:inherit;font-size:11px;font-weight:800;line-height:1.2;cursor:pointer;white-space:nowrap;box-shadow:0 6px 18px rgba(45,107,0,.35)}
.mtf-row-2-header .mtf-notifications-button:hover{background:linear-gradient(115deg,#244700,#397d00 55%,#68aa00);border-color:#76b900}
.mtf-row-2-header .mtf-notifications-button:focus-visible,.mtf-notification-close:focus-visible{outline:3px solid #a8e34b;outline-offset:3px}
.mtf-notification-count{display:inline-grid;min-width:19px;height:19px;place-items:center;padding:0 4px;border-radius:999px;background:#111;color:#fff;font-size:10px;line-height:1}
#mtf-layout .mtf-filter-chips .filter-chip-btn{background:#76b900!important;border-color:#76b900!important;color:#111!important}
#mtf-layout .mtf-filter-chips .filter-chip-btn:hover{background:#8fd100!important;border-color:#8fd100!important}
#mtf-layout .mtf-filter-chips .filter-chip-btn.active,#mtf-layout .mtf-filter-chips .filter-chip-btn.active:hover{background:#4b7800!important;border-color:#4b7800!important;color:#fff!important}
.mtf-split .mtf-cards-scroll-grid{flex-direction:column;flex-wrap:nowrap;justify-content:flex-start;gap:8px;max-height:calc(100vh - 330px);min-height:440px;padding:2px 6px 2px 2px}
.mtf-split .mtf-item-card{flex:none;max-width:none;width:100%;min-height:0;display:grid;grid-template-columns:64px 1fr auto;grid-template-areas:"tag title id" "tag meta meta";column-gap:12px;padding:0;border-radius:14px;border-left:0;overflow:hidden;align-items:center;background:var(--md-sys-color-surface-container-lowest)}
.mtf-split .mtf-item-top{display:contents}
.mtf-split .mtf-item-top .mtf-tag{grid-area:tag;align-self:stretch;display:grid;place-items:center;border-radius:0;font:800 13px ui-monospace,Consolas,monospace;letter-spacing:.05em;background:var(--st,var(--md-sys-color-primary))!important;color:#fff!important;padding:0}
.mtf-split .mtf-item-top>span:last-child{grid-area:id;padding:8px 12px 0 0;font:800 12px ui-monospace,Consolas,monospace;align-self:start}
.mtf-split .mtf-item-title{grid-area:title;margin:8px 0 0;font-size:12.5px}
.mtf-split .mtf-item-meta{grid-area:meta;padding:2px 12px 9px 0;font:11px ui-monospace,Consolas,monospace}
.mtf-split .mtf-item-card.selected{border:2px solid var(--md-sys-color-primary);background:var(--md-sys-color-primary-container)}
.mtf-split .mtf-row-2{padding:12px 10px 12px 12px}
.mtf-split .mtf-row-3{position:sticky;top:12px;align-self:start;min-width:0;width:100%;max-height:calc(100vh - 24px);overflow:auto}
.mtf-split .mtf-detail-horizontal-grid{grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch}
.mtf-split .bento-block-1,.mtf-split .bento-block-2,.mtf-split .bento-block-3{min-width:0}
.mtf-quality-heading{position:relative;display:flex;justify-content:center;align-items:center;min-height:28px;text-align:center}
.mtf-quality-heading #mtf-flowchart-tag{position:absolute;right:0}
#mtf-action-text{text-align:center}
#mtf-detail .btn-row{width:100%;min-width:0;max-width:100%;box-sizing:border-box;flex-wrap:wrap;gap:6px}
#mtf-detail .btn-row>.m3-btn,#mtf-detail .btn-row>.flowchart-open-btn{flex:0 0 auto;min-width:0;max-width:100%;min-height:36px;padding:6px 8px;font-size:10px;white-space:nowrap}
#mtf-flowchart-diagram svg{display:block;width:100%;height:100%;max-width:100%;max-height:100%}
#mtf-layout .mtf-filter-chips{flex-wrap:wrap;overflow:visible}
#mtf-detail .bento-block-3 .btn-row{justify-content:center}
@media(max-width:1240px){.mtf-split .mtf-detail-horizontal-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.mtf-split .bento-block-3{grid-column:1/-1}}
@media(max-width:1080px){#bat-layout:not(.hidden){grid-template-columns:minmax(0,1fr)}#mtf-layout.mtf-split:not(.hidden){grid-template-columns:minmax(0,1fr)}.mtf-split .mtf-row-3{position:static;max-height:none}.mtf-split .mtf-cards-scroll-grid{max-height:360px;min-height:0}.mtf-split .mtf-detail-horizontal-grid{grid-template-columns:minmax(0,1fr)}.mtf-split .bento-block-3{grid-column:auto}.m3-segmented-nav{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:900px){.mtf-row-2-header{grid-template-columns:minmax(0,1fr);justify-items:center}.mtf-catalog-heading{grid-column:1;justify-self:start}.mtf-design-controls{grid-column:1;grid-row:2;flex-wrap:wrap}.mtf-scroll-hint{grid-column:1;grid-row:3;justify-self:center;text-align:center}}
#bat-layout.m3-layout{row-gap:8px}
#bat-layout>#bat-failure-board{margin-bottom:0}
#bat-layout>section,#bat-layout>aside,#bat-failure-board,#bat-board{min-width:0}
#mtf-detail-title{text-align:center}
#bat-failure-detail{height:calc(100vh - 24px);min-height:420px;overflow:hidden;box-sizing:border-box}
#bat-failure-detail .bat-detail-grid{height:100%;min-height:0;grid-template-rows:minmax(0,1fr);align-items:stretch}
#bat-failure-detail .bat-detail-grid>.bento-block-1,#bat-failure-detail .bat-detail-grid>.bento-block-2,#bat-failure-detail .bat-detail-grid>.bento-block-3{height:100%;min-height:0;box-sizing:border-box;overflow:auto}
#bat-failure-detail .bat-detail-grid>.bento-block-2{display:flex;flex-direction:column;overflow:hidden}
#bat-failure-detail #bat-detail-steps{flex:1;min-height:0;overflow:auto;align-content:start}
#bat-failure-detail .bat-detail-grid>.bento-block-3{display:flex;flex-direction:column;justify-content:flex-start;overflow:hidden}
#bat-failure-detail .bat-detail-grid .bento-block-heading,#bat-failure-detail .mtf-quality-heading,#bat-failure-detail .flowchart-modal-actions{flex:none}
#bat-failure-detail #bat-disposition-flow{display:flex;align-items:center;justify-content:center;flex:1 1 0;min-height:110px;max-height:none;overflow:hidden}
#bat-failure-detail #bat-disposition-flow svg{display:block;width:100%;height:100%;max-width:100%;max-height:100%;flex:1 1 auto}
#bat-failure-detail .bat-detail-controls{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;width:100%;min-width:0;max-width:100%;box-sizing:border-box;margin-top:auto;padding-top:8px}
#bat-failure-detail .bat-detail-controls>.m3-btn,#bat-failure-detail .bat-detail-controls>.flowchart-open-btn{flex:0 0 auto;min-width:0;max-width:100%;min-height:36px;padding:6px 8px;font-size:10px;white-space:nowrap}
@media(max-width:1080px){#bat-failure-detail{height:auto;min-height:0;overflow:visible}#bat-failure-detail .bat-detail-grid{height:auto}#bat-failure-detail .bat-detail-grid>.bento-block-1,#bat-failure-detail .bat-detail-grid>.bento-block-2,#bat-failure-detail .bat-detail-grid>.bento-block-3{height:auto;min-height:0;overflow:visible}#bat-failure-detail #bat-detail-steps,#bat-failure-detail #bat-disposition-flow{overflow:visible;max-height:none}#bat-failure-detail #bat-disposition-flow{display:block}#bat-failure-detail #bat-disposition-flow svg{height:auto;max-height:none}#bat-failure-detail .bat-detail-controls{flex-wrap:wrap;margin-top:8px}}
#bat-board{grid-auto-flow:row;grid-auto-columns:auto;overflow-x:visible;touch-action:pan-y;gap:10px}
#bat-board .bd-col{min-width:0;max-width:100%;min-height:0;max-height:none}
#bat-board .bd-h{padding:6px 8px;font-size:15px}
#bat-board .bd-h small{right:8px;padding:2px 8px;font-size:10px}
#bat-board .bd-l{box-sizing:border-box;max-height:226px;overflow-y:auto;overscroll-behavior:contain;padding:8px 10px;gap:7px}
#bat-board .bd-item{padding:6px 8px;gap:4px}
.bat-board-toolbar{min-width:0;flex-wrap:wrap}
.bat-board-search{min-width:0}
button,.m3-btn,.m3-seg-btn{touch-action:manipulation}
html{-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:100%}
@media(max-width:700px){main{padding:8px 12px 24px!important}.m3-segmented-nav-wrap{padding:12px 12px 4px!important}.m3-card{padding:16px 14px!important}.m3-segmented-nav{grid-template-columns:minmax(0,1fr)!important}.bat-board-toolbar{align-items:stretch;flex-direction:column;gap:8px}.bat-board-search{width:100%;max-width:none;flex-basis:100%}.bat-board-hint{text-align:left}.m3-layout#bat-layout{grid-template-columns:minmax(0,1fr)}.mtf-split .mtf-detail-horizontal-grid{grid-template-columns:minmax(0,1fr)}.mtf-split .bento-block-3{grid-column:auto}.m3-input,.m3-select,.m3-textarea,input,textarea,select{font-size:16px!important}.btn-row{flex-wrap:wrap}.btn-row .m3-btn{min-height:44px}}
@media(prefers-reduced-motion:reduce){#bat-board{scroll-behavior:auto;scroll-snap-type:none}}`;

    document.head.appendChild(vs);
    const tileIc = {
      "nav-bat": "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
      "nav-mtf": "M3 5h18v3H3V5zm0 5.5h18v3H3v-3zM3 16h18v3H3v-3z"
    };
    const tileTx = {
      "nav-bat": ["BAT Basic Assurance Test", () => `Step-by-step diagnostics · ${FFDG.data.failureCatalog.length} NDBG codes`],
      "nav-mtf": ["MTF L10 Failure", () => `${FFDG.data.mtfFaults.length} failures with procedures and commands`]
    };
    Object.keys(tileIc).forEach(id => {
      const b = $(id); if (!b) return;
      b.innerHTML = `<span class="tile-ic">${ic(tileIc[id])}</span><span class="tile-tx"><b>${tileTx[id][0]}</b><small>${tileTx[id][1]()}</small></span>`;
    });
    const ml = $("mtf-layout");
    if (ml) {
      ml.classList.add("mtf-split");
      const hd = document.querySelector(".mtf-row-2-header");
      if (hd) {
        const tg = document.createElement("div");
        tg.className = "view-tg"; tg.setAttribute("role", "group"); tg.setAttribute("aria-label", "Catalog view");
        tg.innerHTML = '<button type="button" class="on" data-v="split">Technical List</button><button type="button" data-v="grid">Mosaic</button>';
        tg.addEventListener("click", e => {
          const v = e.target.closest("button"); if (!v) return;
          tg.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === v));
          ml.classList.toggle("mtf-split", v.dataset.v === "split");
        });
        hd.querySelector(".mtf-design-controls").appendChild(tg);
      }
    }
  })();
