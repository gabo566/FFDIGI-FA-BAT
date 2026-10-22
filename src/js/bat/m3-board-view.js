/* M3 board view */
  (() => {
    "use strict";
    const $ = id => document.getElementById(id);
    const css = `
.mtf-row-1{display:grid;grid-template-columns:minmax(0,1fr) minmax(560px,min(800px,42vw)) minmax(0,1fr);align-items:center;width:min(100%,1720px);max-width:1720px;box-sizing:border-box;margin-inline:auto;justify-content:center}
.mtf-row-1-search{grid-column:2;width:100%;max-width:800px;min-width:0;flex:none;margin:0 auto}
#mtf-layout .mtf-row-1-search input{text-align:center}
.mtf-row-1-actions{grid-column:3;justify-self:end;display:flex;flex-direction:row;align-items:center;gap:8px;width:auto;max-width:100%;margin:0;flex:none}
.mtf-row-1-actions .theme-switch-btn{width:auto;min-height:40px;padding:6px 12px;white-space:nowrap}
.mtf-row-1-actions>label{width:auto;max-width:100%;margin:0;white-space:nowrap}
@media(max-width:1500px){.mtf-row-1{display:flex;flex-wrap:wrap;justify-content:center}.mtf-row-1-search{order:0;flex:1 1 560px;width:min(100%,800px);max-width:800px;margin:0 auto}.mtf-row-1-actions{order:1;flex:0 1 auto;margin:0 auto}}
@media(max-width:640px){.mtf-row-1{display:flex;flex-direction:column;align-items:stretch;width:100%;max-width:100%}.mtf-row-1-search{width:100%;max-width:100%;flex:0 0 42px;margin:0}#mtf-layout .mtf-row-1-search input{text-align:left}.mtf-row-1-actions{width:100%;flex-wrap:wrap;justify-content:center}.mtf-row-1-actions .theme-switch-btn,.mtf-row-1-actions>label{width:min(100%,190px)}}
#mtf-board{display:none;min-width:0}
.mtf-cards-scroll-grid{max-height:min(64dvh,580px)}
.v-board .mtf-cards-scroll-grid{display:none!important}
.v-board #mtf-board{display:grid;grid-auto-flow:row;grid-auto-columns:auto;gap:10px;overflow-x:visible;padding:4px 2px 10px;align-items:start;touch-action:pan-y}
#mtf-layout.v-board{gap:0}
#mtf-layout.v-board .mtf-row-2{padding:6px 10px 0;border-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0}
#mtf-layout.v-board .mtf-row-3{padding:0 14px 8px;border-top:0;border-top-left-radius:0;border-top-right-radius:0}
#mtf-layout.v-board #mtf-board{padding:4px 0 0}
#mtf-board .bd-col{min-height:0;max-height:none}
#mtf-board .bd-h{padding:6px 8px;font-size:15px}
#mtf-board .bd-h small{right:8px;padding:2px 8px;font-size:10px}
 #mtf-board .bd-l{box-sizing:border-box;max-height:min(64dvh,580px);overflow-y:auto;overscroll-behavior:contain;padding:8px 10px}
#mtf-board .bd-item{padding:6px 8px;gap:4px}
.m3-segmented-nav-wrap{padding:6px 0 2px!important}
.m3-segmented-nav{gap:10px!important}
.m3-seg-btn{min-height:64px!important;padding:10px 16px!important}
.tile-ic{left:14px;width:42px;height:42px}
.tile-ic svg{width:24px!important;height:24px!important}
.tile-tx{padding:0 48px}
.tile-tx b{font-size:16px}
.tile-tx small{font-size:11.5px}
main{padding-top:4px!important}
#bat-failure-board.m3-card{padding:12px 16px!important;margin-bottom:0}
#bat-failure-board .m3-card-header{margin-bottom:7px}
#bat-failure-board .m3-card-title{font-size:15px}
#bat-failure-board .bat-board-header{display:grid;grid-template-columns:max-content minmax(0,1fr);align-items:center;gap:12px;margin-bottom:8px}
#bat-failure-board .bat-board-heading{display:flex;align-items:center;gap:8px;min-width:0}
#bat-failure-board .bat-board-controls{display:flex;align-items:center;justify-content:flex-end;gap:8px;width:100%;min-width:0;margin:0}
#bat-failure-board .bat-board-search{flex:1 1 280px;width:100%;max-width:520px;min-height:38px}
#bat-failure-board .bat-theme-toggle{flex:0 0 auto;min-height:38px;padding:6px 12px;background:#111;border-color:#444;color:#fff;white-space:nowrap}
#bat-failure-board .bat-pdf-import-btn{flex:0 0 auto;min-height:38px;padding:6px 12px;background:#76b900;border-color:#659c00;color:#101400;white-space:nowrap}
#bat-failure-board .bat-pdf-status{margin:4px 0 8px;text-align:center;font-size:12px;font-weight:700;color:var(--md-sys-color-on-surface-variant)}
@media(max-width:1080px){#bat-failure-board .bat-board-header{grid-template-columns:minmax(0,1fr);justify-items:stretch}#bat-failure-board .bat-board-heading{justify-content:space-between}#bat-failure-board .bat-board-controls{justify-content:center;flex-wrap:wrap;margin-inline:auto}}
@media(max-width:700px){#bat-failure-board .bat-board-header{gap:8px}#bat-failure-board .bat-board-heading{flex-wrap:wrap}#bat-failure-board .bat-board-controls{flex-wrap:wrap;width:100%}#bat-failure-board .bat-board-search{flex:1 1 100%;min-width:0;max-width:none;margin:0 auto}}
#mtf-layout .mtf-row-1{padding:4px 12px;gap:8px}
#mtf-layout .mtf-row-1-search{min-height:38px}
#mtf-layout .mtf-row-1-actions{gap:6px}
#mtf-layout .mtf-row-1-actions .theme-switch-btn{min-height:34px;padding:4px 10px}
#mtf-layout .mtf-row-1-actions>label{height:34px!important;min-height:34px!important;padding:4px 10px!important}
#mtf-layout .mtf-row-2-header{min-height:34px;padding:4px 10px;margin-bottom:4px;gap:8px}
#mtf-layout .mtf-row-2-header .mtf-notifications-button{padding:6px 10px;font-size:10.5px}
#mtf-layout .mtf-row-2-header .view-tg button{padding:5px 11px}
#mtf-layout.v-board .mtf-row-2{padding-top:4px}
.bd-col{scroll-snap-align:start;background:var(--md-sys-color-surface-container-low);border:1px solid var(--md-sys-color-outline-variant);border-radius:22px;overflow:hidden;display:flex;flex-direction:column;max-height:calc(100vh - 420px);min-height:300px}
.bd-h{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:linear-gradient(120deg,var(--st),color-mix(in srgb,var(--st) 60%,#000));color:#fff;font-weight:900;font-size:20px;letter-spacing:.08em}
.bd-h small{background:rgba(0,0,0,.3);border-radius:999px;padding:3px 12px;font-size:12px;letter-spacing:0}
.bd-l{overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px}
.bd-item{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:2px;padding:9px 12px;border-radius:14px;background:var(--md-sys-color-surface-container-lowest);border:1px solid var(--md-sys-color-outline-variant);border-left:5px solid var(--st)}
.bd-item:hover{background:var(--md-sys-color-surface-container-high)}
.bd-item:focus-visible{outline:3px solid var(--md-sys-color-primary)}
.bd-item.selected{background:var(--md-sys-color-primary-container);border-color:var(--md-sys-color-primary);border-left-color:var(--st);box-shadow:0 0 0 2px var(--md-sys-color-primary)}
.bd-item b{font:800 11px ui-monospace,Consolas,monospace;color:var(--st)}
#bat-board .bd-item span,#mtf-board .bd-item span{font-size:11.5px;font-weight:700;line-height:1.25;color:var(--md-sys-color-on-surface);text-align:center!important;width:100%;display:block;white-space:normal;overflow-wrap:anywhere}
#bat-board .bd-item b,#mtf-board .bd-item b{font-size:10.5px;line-height:1.1}
#bat-board .bd-h,#mtf-board .bd-h{position:relative;justify-content:center;text-align:center}
#bat-board .bd-h small,#mtf-board .bd-h small{position:absolute;right:12px}
.mtf-item-title,#mtf-detail-title{width:100%;text-align:center!important}
.bd-item small{font:10.5px ui-monospace,Consolas,monospace;color:var(--md-sys-color-on-surface-variant);white-space:normal;overflow:visible;overflow-wrap:anywhere;text-overflow:clip}
#bat-board .bd-item small,#mtf-board .bd-item small{font-size:9.5px;line-height:1.1}
@media print{#mtf-board{display:none!important}}`;
    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    const lay = $("mtf-layout"), list = $("mtf-fault-list"), tg = document.querySelector(".view-tg");
    const board = document.createElement("div"); board.id = "mtf-board"; list.after(board);
    const order = ["FLA", "PRET", "FLB", "AST", "FTS", "IOT", "FCT", "RIN", "T_VI", "OBA", "PACKING"];
    const rank = s => { const i = order.indexOf(s); return i < 0 ? 99 : i; };
    function buildBoard() {
      const g = {};
      [...list.children].forEach(c => {
        const t = c.querySelector(".mtf-tag"); if (!t) return;
        const s = t.textContent.split("/")[0].trim(); (g[s] = g[s] || []).push(c);
      });
      if (g.ALL?.length) {
        g.RIN = [...(g.RIN || []), ...g.ALL];
        delete g.ALL;
      }
      board.replaceChildren();
      board.classList.toggle("mtf-board-centered", lay.classList.contains("v-board"));
      const orderedGroups = Object.keys(g).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
      function createColumn(s) {
        const col = document.createElement("section"); col.className = "bd-col"; col.dataset.st = s;
        col.innerHTML = `<div class="bd-h"><span>${s}</span><small>${g[s].length}</small></div><div class="bd-l"></div>`;
        g[s].forEach(c => {
          const b = document.createElement("button"); b.type = "button";
          b.className = "bd-item" + (c.classList.contains("selected") ? " selected" : "");
          b.setAttribute("aria-pressed", String(c.classList.contains("selected")));
          b.innerHTML = "<b></b><span></span><small></small>";
          b.children[0].textContent = c.querySelector(".mtf-item-top span:last-child").textContent;
          b.children[1].textContent = c.querySelector(".mtf-item-title").textContent;
          b.children[2].textContent = c.querySelector(".mtf-item-meta").textContent;
          b.onclick = () => window.FFDG?.ui?.selectMtfFault(c.mtfFailure);
          col.lastChild.appendChild(b);
        });
        return col;
      }
      orderedGroups.forEach(s => {
        board.appendChild(createColumn(s));
      });
    }
    new MutationObserver(buildBoard).observe(list, { childList: true });
    if (tg) {
      const b = document.createElement("button"); b.type = "button"; b.dataset.v = "board"; b.textContent = "Tablero";
      tg.appendChild(b);
      tg.addEventListener("click", e => {
        const v = e.target.closest("button"); if (!v) return;
        lay.classList.toggle("v-board", v.dataset.v === "board");
        if (v.dataset.v === "board") buildBoard();
      });
    }
    buildBoard();
  })();