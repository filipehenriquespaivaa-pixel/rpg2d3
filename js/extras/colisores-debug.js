/* js/extras/colisores-debug.js
 * Botao "Colisores: ON/OFF" (debug). Movido SEM alteracoes de legacy/app.original.js.
 */
(function () {
  if (window.__colliderBtnInit) return;
  window.__colliderBtnInit = !0;
  try {
    window.__showColliders = localStorage.getItem("rpg2d_colliders") === "1";
    window.__devMode = localStorage.getItem("rpg2d_dev_mode") === "1";
  } catch (e) {
    window.__showColliders = !1;
    window.__devMode = !1;
  }
  function paint(b) {
    b.textContent = "Colisores: " + (window.__showColliders ? "ON" : "OFF");
    b.style.background = window.__showColliders
      ? "rgba(22,163,74,0.92)"
      : "rgba(30,41,59,0.85)";
    b.style.display = window.__devMode ? "block" : "none";
  }
  window.updateColliderBtnVisibility = function () {
    const b = document.getElementById("btn-colisores");
    if (b) {
      b.style.display = window.__devMode ? "block" : "none";
    }
  };
  function mk() {
    if (document.getElementById("btn-colisores")) return;
    const b = document.createElement("button");
    b.id = "btn-colisores";
    b.type = "button";
    b.tabIndex = -1;
    b.style.cssText =
      "position:fixed;top:8px;right:8px;z-index:99999;padding:6px 10px;font:600 12px system-ui,sans-serif;color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:8px;opacity:.9;touch-action:manipulation;";
    paint(b);
    b.addEventListener("click", function (ev) {
      ev.stopPropagation();
      window.__showColliders = !window.__showColliders;
      try {
        localStorage.setItem(
          "rpg2d_colliders",
          window.__showColliders ? "1" : "0",
        );
      } catch (e) {}
      paint(b);
      b.blur();
    });
    ["pointerdown", "touchstart", "mousedown"].forEach(function (n) {
      b.addEventListener(n, function (ev) {
        ev.stopPropagation();
      });
    });
    document.body.appendChild(b);
  }
  if (document.body) mk();
  else document.addEventListener("DOMContentLoaded", mk);
})();
