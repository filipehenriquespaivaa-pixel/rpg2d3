/* js/engine/render-props.js
 * Desenho dos props do cenario no canvas (rg...Pg), incluindo a fogueira (hg).
 * Trecho de legacy/app.original.js (linhas 18363-20124); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  function rg(e, t, l) {
    ((e.fillStyle = "#3d2215"),
      e.beginPath(),
      e.moveTo(-6 * t, 4 * t),
      e.quadraticCurveTo(-4 * t, -4 * t, -3.5 * t, -14 * t),
      e.lineTo(3.5 * t, -14 * t),
      e.quadraticCurveTo(4 * t, -4 * t, 6 * t, 4 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#5c3826"),
      e.beginPath(),
      e.moveTo(-4 * t, 2 * t),
      e.lineTo(-2.5 * t, -14 * t),
      e.lineTo(2.5 * t, -14 * t),
      e.lineTo(4 * t, 2 * t),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#29140a"),
      (e.lineWidth = 1 * t),
      e.beginPath(),
      e.moveTo(-1 * t, 2 * t),
      e.lineTo(-1.2 * t, -12 * t),
      e.moveTo(1.2 * t, 2 * t),
      e.lineTo(1 * t, -10 * t),
      e.stroke());
    const o = Math.sin(l * 1.4 + t * 8) * 1.5 * t,
      u = Math.cos(l * 1.8 + t * 6) * 1.2 * t;
    ((e.fillStyle = "#113318"),
      e.beginPath(),
      e.arc(0 + o * 0.4, -22 * t, 22 * t, 0, Math.PI * 2),
      e.arc(-8 * t + o * 0.3, -24 * t, 16 * t, 0, Math.PI * 2),
      e.arc(8 * t + o * 0.3, -23 * t, 16 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#1b5228"),
      e.beginPath(),
      e.arc(-7 * t + o, -28 * t, 15 * t, 0, Math.PI * 2),
      e.arc(7 * t + u, -27 * t, 14 * t, 0, Math.PI * 2),
      e.arc(0 + o * 0.7, -33 * t, 16 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#266b34"),
      e.beginPath(),
      e.arc(-9 * t + o, -30 * t, 10 * t, 0, Math.PI * 2),
      e.arc(-2 * t + o * 0.8, -36 * t, 11 * t, 0, Math.PI * 2),
      e.arc(4 * t + u, -32 * t, 8 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#307a3e"),
      e.beginPath(),
      e.arc(-7 * t + o, -32 * t, 5 * t, 0, Math.PI * 2),
      e.arc(-3 * t + o * 0.8, -38 * t, 6 * t, 0, Math.PI * 2),
      e.arc(3 * t + u, -34 * t, 4 * t, 0, Math.PI * 2),
      e.fill());
  }
  function lg(e, t, l, o) {
    ((e.fillStyle = "#2e1c14"),
      e.fillRect(-3.5 * t, -12 * t, 7 * t, 16 * t),
      (e.fillStyle = "#452b1f"),
      e.fillRect(-2 * t, -12 * t, 4 * t, 16 * t));
    const u = [
      { y: -8 * t, w: 28 * t, h: 16 * t },
      { y: -19 * t, w: 22 * t, h: 15 * t },
      { y: -29 * t, w: 16 * t, h: 14 * t },
      { y: -38 * t, w: 10 * t, h: 12 * t },
    ];
    for (let m = 0; m < u.length; m++) {
      const c = u[m],
        f = Math.sin(o * 1.6 + m) * (0.8 + m * 0.4) * t;
      ((e.fillStyle = "#0b2d1c"),
        e.beginPath(),
        e.moveTo(-c.w / 2 + f * 0.5, c.y),
        e.lineTo(c.w / 2 + f * 0.5, c.y),
        e.lineTo(f, c.y - c.h),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#13462f"),
        e.beginPath(),
        e.moveTo(-c.w / 2 + f * 0.5, c.y - 2 * t));
      const g = 4;
      for (let y = 0; y <= g; y++) {
        const w = -c.w / 2 + (c.w / g) * y + f * 0.5,
          v = y % 2 === 0 ? c.y : c.y - 3 * t;
        e.lineTo(w, v);
      }
      (e.lineTo(f, c.y - c.h),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#1d5c3f"),
        e.beginPath(),
        e.moveTo(-c.w / 2 + f * 0.5, c.y - 2 * t),
        e.lineTo(f, c.y),
        e.lineTo(f, c.y - c.h),
        e.closePath(),
        e.fill(),
        l &&
          ((e.fillStyle = "#cbd5e1"),
          e.beginPath(),
          e.moveTo(-c.w * 0.38 + f * 0.5, c.y - c.h * 0.28),
          e.lineTo(c.w * 0.38 + f * 0.5, c.y - c.h * 0.28),
          e.lineTo(f, c.y - c.h),
          e.closePath(),
          e.fill(),
          (e.fillStyle = "#ffffff"),
          e.beginPath(),
          e.moveTo(-c.w * 0.32 + f * 0.5, c.y - c.h * 0.32),
          e.quadraticCurveTo(
            f,
            c.y - c.h * 0.25,
            c.w * 0.32 + f * 0.5,
            c.y - c.h * 0.32,
          ),
          e.lineTo(f, c.y - c.h),
          e.closePath(),
          e.fill()));
    }
  }
  function ig(e, t, l) {
    const o = Math.sin(l * 1.5) * 2.5 * t,
      u = 6 * t + o,
      m = -36 * t;
    ((e.strokeStyle = "#451a03"),
      (e.lineWidth = 6.5 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(0, 2 * t),
      e.quadraticCurveTo(8 * t, -18 * t, u, m),
      e.stroke(),
      (e.strokeStyle = "#78350f"),
      (e.lineWidth = 4.8 * t),
      e.stroke(),
      (e.fillStyle = "#9a3412"));
    for (let f = 0.2; f <= 0.85; f += 0.15) {
      const g = (1 - f) * (1 - f) * 0 + 2 * (1 - f) * f * (8 * t) + f * f * u,
        y =
          (1 - f) * (1 - f) * (2 * t) + 2 * (1 - f) * f * (-18 * t) + f * f * m;
      (e.beginPath(), e.arc(g, y, 3.2 * t, 0, Math.PI * 2), e.fill());
    }
    ((e.fillStyle = "#451a03"),
      e.beginPath(),
      e.arc(u - 2.5 * t, m + 3 * t, 2.5 * t, 0, Math.PI * 2),
      e.arc(u + 2.5 * t, m + 3.5 * t, 2.6 * t, 0, Math.PI * 2),
      e.arc(u, m + 5 * t, 2.8 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#78350f"),
      e.beginPath(),
      e.arc(u - 3 * t, m + 2.5 * t, 1.2 * t, 0, Math.PI * 2),
      e.arc(u + 2 * t, m + 3 * t, 1.2 * t, 0, Math.PI * 2),
      e.fill());
    const c = [
      { dx: -26 * t, dy: 10 * t, archY: -16 * t },
      { dx: 26 * t + o, dy: 12 * t, archY: -14 * t },
      { dx: -22 * t, dy: -12 * t, archY: -22 * t },
      { dx: 22 * t + o, dy: -10 * t, archY: -20 * t },
      { dx: -10 * t, dy: -24 * t, archY: -28 * t },
      { dx: 12 * t + o, dy: -24 * t, archY: -28 * t },
    ];
    for (const f of c) {
      const g = u + f.dx,
        y = m + f.dy,
        w = u + f.dx * 0.5,
        v = m + f.archY;
      ((e.strokeStyle = "#143d1f"),
        (e.lineWidth = 3.5 * t),
        e.beginPath(),
        e.moveTo(u, m),
        e.quadraticCurveTo(w, v, g, y),
        e.stroke(),
        (e.strokeStyle = "#1f592d"),
        (e.lineWidth = 2 * t),
        e.stroke(),
        (e.strokeStyle = "#164823"),
        (e.lineWidth = 1.4 * t));
      for (let T = 0.2; T <= 0.9; T += 0.15) {
        const S = (1 - T) * (1 - T) * u + 2 * (1 - T) * T * w + T * T * g,
          p = (1 - T) * (1 - T) * m + 2 * (1 - T) * T * v + T * T * y;
        (e.beginPath(),
          e.moveTo(S, p),
          e.lineTo(S + (f.dx > 0 ? 3 : -3) * t, p + 6 * t),
          e.stroke());
      }
    }
  }
  function ng(e, t, l) {
    ((e.fillStyle = "#2d1810"),
      e.beginPath(),
      e.moveTo(-6 * t, 4 * t),
      e.quadraticCurveTo(-3 * t, -4 * t, -4 * t, -16 * t),
      e.lineTo(4 * t, -16 * t),
      e.quadraticCurveTo(3 * t, -4 * t, 6 * t, 4 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#422416"),
      e.fillRect(-3 * t, -14 * t, 6 * t, 16 * t));
    const o = Math.sin(l * 1.3) * 1.5 * t;
    ((e.fillStyle = "#183018"),
      e.beginPath(),
      e.arc(0 + o * 0.5, -24 * t, 22 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#244824"),
      e.beginPath(),
      e.arc(-4 * t + o, -26 * t, 16 * t, 0, Math.PI * 2),
      e.arc(5 * t + o, -25 * t, 15 * t, 0, Math.PI * 2),
      e.fill());
    for (let u = -16; u <= 16; u += 4) {
      const m = Math.sin(l * 1.8 + u * 0.4) * 3 * t,
        c = (18 + Math.sin(u * 3) * 6) * t,
        f = e.createLinearGradient(u * t, -20 * t, u * t + m, -20 * t + c);
      (f.addColorStop(0, "rgba(48, 76, 22, 0.85)"),
        f.addColorStop(0.7, "rgba(68, 106, 32, 0.65)"),
        f.addColorStop(1, "rgba(84, 126, 40, 0.35)"),
        (e.strokeStyle = f),
        (e.lineWidth = 1.6 * t),
        e.beginPath(),
        e.moveTo(u * t, -20 * t),
        e.quadraticCurveTo(
          u * t + m * 0.5,
          -20 * t + c * 0.5,
          u * t + m,
          -20 * t + c,
        ),
        e.stroke());
    }
  }
  function sg(e, t, l) {
    ((e.strokeStyle = "#0c0a09"),
      (e.lineWidth = 4.5 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(0, 2 * t),
      e.lineTo(-2 * t, -22 * t),
      e.lineTo(-12 * t, -32 * t),
      e.moveTo(-2 * t, -16 * t),
      e.lineTo(10 * t, -28 * t),
      e.stroke());
    const o = (Math.sin(l * 4) + 1) * 0.5;
    ((e.fillStyle = `rgba(249, 115, 22, ${0.4 + o * 0.5})`),
      e.beginPath(),
      e.arc(-1.5 * t, -16 * t, 1.8 * t, 0, Math.PI * 2),
      e.fill());
  }
  function cg(e, t) {
    ((e.fillStyle = "#143d22"),
      e.beginPath(),
      e.roundRect(-4.5 * t, -28 * t, 9 * t, 32 * t, 4.5 * t),
      e.fill(),
      (e.fillStyle = "#1c552f"),
      e.beginPath(),
      e.roundRect(-4 * t, -28 * t, 6 * t, 31 * t, 4 * t),
      e.fill(),
      (e.fillStyle = "#26703f"),
      e.beginPath(),
      e.roundRect(-3.5 * t, -27 * t, 2.5 * t, 29 * t, 2 * t),
      e.fill(),
      (e.lineWidth = 3.5 * t),
      (e.strokeStyle = "#1c552f"),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(-4 * t, -16 * t),
      e.lineTo(-12 * t, -16 * t),
      e.lineTo(-12 * t, -24 * t),
      e.stroke(),
      e.beginPath(),
      e.moveTo(4 * t, -12 * t),
      e.lineTo(12 * t, -12 * t),
      e.lineTo(12 * t, -22 * t),
      e.stroke(),
      (e.fillStyle = "#d4b26f"));
    for (let l = -24; l <= -2; l += 6)
      (e.fillRect(-5.5 * t, l * t, 1.2 * t, 1 * t),
        e.fillRect(4.5 * t, l * t, 1.2 * t, 1 * t));
  }
  function dg(e, t, l, o) {
    let u = "#1e293b",
      m = "#475569",
      c = "#94a3b8",
      f = "#cbd5e1";
    (o === BiomeId.VOLCANIC
      ? ((u = "#0c0a09"), (m = "#262626"), (c = "#44403c"), (f = "#78716c"))
      : o === BiomeId.CANYON
        ? ((u = "#451a03"), (m = "#7c2d12"), (c = "#c2410c"), (f = "#fdba74"))
        : o === BiomeId.GLACIER
          ? ((u = "#0369a1"), (m = "#0284c7"), (c = "#7dd3fc"), (f = "#ffffff"))
          : (o === BiomeId.DESERT || o === BiomeId.BEACH) &&
            ((u = "#78350f"),
            (m = "#b45309"),
            (c = "#d97706"),
            (f = "#fde68a")),
      (e.fillStyle = u),
      e.beginPath(),
      e.moveTo(-11 * t, 2 * t),
      e.lineTo(11 * t, 2 * t),
      e.lineTo(12 * t, -4 * t),
      e.lineTo(4 * t, -12 * t),
      e.lineTo(-8 * t, -11 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = m),
      e.beginPath(),
      e.moveTo(-11 * t, 2 * t),
      e.lineTo(0, -5 * t),
      e.lineTo(4 * t, -12 * t),
      e.lineTo(-8 * t, -11 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = c),
      e.beginPath(),
      e.moveTo(-10 * t, 0),
      e.lineTo(-2 * t, -7 * t),
      e.lineTo(-4 * t, -12 * t),
      e.lineTo(-8 * t, -11 * t),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = f),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.moveTo(-8 * t, -11 * t),
      e.lineTo(-2 * t, -7 * t),
      e.lineTo(4 * t, -12 * t),
      e.stroke(),
      o !== BiomeId.VOLCANIC &&
      o !== BiomeId.DESERT &&
      o !== BiomeId.CANYON &&
      o !== BiomeId.GLACIER
        ? ((e.fillStyle = "#65a30d"),
          e.beginPath(),
          e.arc(-2 * t, -3 * t, 2.5 * t, 0, Math.PI * 2),
          e.arc(3 * t, -1 * t, 2 * t, 0, Math.PI * 2),
          e.fill())
        : o === BiomeId.VOLCANIC &&
          ((e.strokeStyle = "#ef4444"),
          (e.lineWidth = 1 * t),
          e.beginPath(),
          e.moveTo(-2 * t, 0),
          e.lineTo(2 * t, -4 * t),
          e.stroke()));
  }
  function ug(e, t, l, o) {
    const u = Math.sin(o * 3 + l * 10) * 0.8 * l;
    ((e.strokeStyle = "#15803d"),
      (e.lineWidth = 1.6 * l),
      e.beginPath(),
      e.moveTo(0, 3 * l),
      e.quadraticCurveTo(-1 * l, -2 * l, u, -8 * l),
      e.stroke(),
      (e.fillStyle = "#22c55e"),
      e.beginPath(),
      e.ellipse(-2 * l, -3 * l, 2.5 * l, 1.2 * l, -0.4, 0, Math.PI * 2),
      e.fill());
    let m = "#ef4444",
      c = "#fef08a";
    t === "flower_blue"
      ? ((m = "#38bdf8"), (c = "#ffffff"))
      : t === "flower_yellow" && ((m = "#eab308"), (c = "#78350f"));
    const f = u,
      g = -8 * l;
    e.fillStyle = m;
    for (let y = 0; y < Math.PI * 2; y += Math.PI / 2.5) {
      const w = f + Math.cos(y) * 3.2 * l,
        v = g + Math.sin(y) * 3.2 * l;
      (e.beginPath(), e.arc(w, v, 2.2 * l, 0, Math.PI * 2), e.fill());
    }
    ((e.fillStyle = c),
      e.beginPath(),
      e.arc(f, g, 1.8 * l, 0, Math.PI * 2),
      e.fill());
  }
  function fg(e, t) {
    ((e.fillStyle = "#e7e5e4"),
      e.beginPath(),
      e.roundRect(-2.5 * t, -7 * t, 5 * t, 9 * t, 2 * t),
      e.fill(),
      (e.fillStyle = "#b91c1c"),
      e.beginPath(),
      e.arc(0, -7 * t, 7 * t, Math.PI, 0),
      e.fill(),
      (e.fillStyle = "#ef4444"),
      e.beginPath(),
      e.arc(-1.5 * t, -8 * t, 5 * t, Math.PI, 0),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(-3 * t, -10 * t, 1.2 * t, 0, Math.PI * 2),
      e.arc(2 * t, -11 * t, 1.4 * t, 0, Math.PI * 2),
      e.arc(0, -13 * t, 1 * t, 0, Math.PI * 2),
      e.fill());
  }
  function mg(e, t, l, o) {
    ((e.fillStyle = "#334155"),
      e.fillRect(-14 * t, -4 * t, 28 * t, 8 * t),
      (e.fillStyle = "#475569"),
      e.fillRect(-10 * t, -12 * t, 20 * t, 8 * t));
    const u = Math.sin(o * 2.5) * 3,
      m = -26 * t + u;
    (e.save(),
      (e.shadowColor = "#38bdf8"),
      (e.shadowBlur = 14),
      (e.fillStyle = "#38bdf8"),
      e.beginPath(),
      e.moveTo(0, m - 14 * t),
      e.lineTo(8 * t, m),
      e.lineTo(0, m + 14 * t),
      e.lineTo(-8 * t, m),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#e0f2fe"),
      e.beginPath(),
      e.moveTo(0, m - 14 * t),
      e.lineTo(0, m + 14 * t),
      e.lineTo(-8 * t, m),
      e.closePath(),
      e.fill(),
      e.restore(),
      (e.strokeStyle = "rgba(56, 189, 248, 0.6)"),
      (e.lineWidth = 1.5),
      e.beginPath(),
      e.ellipse(0, 0, 18 * t, 6 * t, 0, 0, Math.PI * 2),
      e.stroke());
  }
  function hg(e, t, l, o = !0, u, isSaveFire = false) {
    for (let w = 0; w < Math.PI * 2; w += Math.PI / 4) {
      const v = Math.cos(w) * 8.5 * t,
        T = Math.sin(w) * 4.5 * t;
      ((e.fillStyle = "#27272a"),
        e.beginPath(),
        e.arc(v, T + 0.5 * t, 3.2 * t, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#71717a"),
        e.beginPath(),
        e.arc(v - 0.8 * t, T - 0.8 * t, 2.2 * t, 0, Math.PI * 2),
        e.fill());
    }
    if (!o) {
      ((e.fillStyle = "#18181b"),
        e.beginPath(),
        e.ellipse(0, 1 * t, 5.8 * t, 2.8 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#27272a"),
        e.beginPath(),
        e.ellipse(0, 0.8 * t, 3.8 * t, 1.8 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = "#271206"),
        (e.lineWidth = 3.2 * t),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(-6 * t, 2.5 * t),
        e.lineTo(5.5 * t, -2.2 * t),
        e.moveTo(-5.5 * t, -2.2 * t),
        e.lineTo(6 * t, 2.5 * t),
        e.moveTo(-6.5 * t, 0),
        e.lineTo(6.5 * t, 0),
        e.stroke(),
        (e.strokeStyle = "#78350f"),
        (e.lineWidth = 2 * t),
        e.beginPath(),
        e.moveTo(-4.5 * t, 2.8 * t),
        e.lineTo(0, -5.5 * t),
        e.moveTo(4.5 * t, 2.8 * t),
        e.lineTo(0, -5.5 * t),
        e.moveTo(-2.2 * t, 3.2 * t),
        e.lineTo(-0.5 * t, -6 * t),
        e.moveTo(2.2 * t, 3.2 * t),
        e.lineTo(0.5 * t, -6 * t),
        e.moveTo(0, 3.5 * t),
        e.lineTo(0, -6 * t),
        e.stroke(),
        (e.strokeStyle = "#a16207"),
        (e.lineWidth = 1.2 * t),
        e.beginPath(),
        e.moveTo(-3.5 * t, 2.5 * t),
        e.lineTo(-0.2 * t, -5 * t),
        e.moveTo(3.5 * t, 2.5 * t),
        e.lineTo(0.2 * t, -5 * t),
        e.moveTo(-1.2 * t, 3 * t),
        e.lineTo(-0.2 * t, -5.8 * t),
        e.stroke(),
        (e.fillStyle = "#b45309"),
        e.fillRect(-1.5 * t, 0, 3 * t, 1.2 * t));
      return;
    }
    const m = Math.sin(l * 5) * 0.2 + 0.8;
    ((e.fillStyle = `rgba(234, 88, 12, ${0.7 * m})`),
      e.beginPath(),
      e.ellipse(0, 1 * t, 6 * t, 3 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = `rgba(254, 240, 138, ${0.85 * m})`),
      e.beginPath(),
      e.ellipse(0, 1 * t, 3.5 * t, 1.8 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = "#271206"),
      (e.lineWidth = 3.8 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(-6.5 * t, 3 * t),
      e.lineTo(6.5 * t, -2.5 * t),
      e.moveTo(-6.5 * t, -2.5 * t),
      e.lineTo(6.5 * t, 3 * t),
      e.stroke(),
      (e.strokeStyle = "#78350f"),
      (e.lineWidth = 2.4 * t),
      e.stroke());
    const c = Math.sin(l * 14) * 2.5 * t,
      f = (17 + Math.cos(l * 18) * 3.5) * t;
    if (isSaveFire) {
      // Fogo AZUL: marca visual do ponto de Salve atual (sem texto no mapa)
      (e.save(),
        (e.shadowColor = "#38bdf8"),
        (e.shadowBlur = 16),
        (e.fillStyle = "#0ea5e9"),
        e.beginPath(),
        e.moveTo(-5.5 * t, 1 * t),
        e.quadraticCurveTo(-4 * t, -f * 0.5, c, -f),
        e.quadraticCurveTo(4 * t, -f * 0.5, 5.5 * t, 1 * t),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#38bdf8"),
        e.beginPath(),
        e.moveTo(-3.5 * t, 1 * t),
        e.quadraticCurveTo(-2.5 * t, -f * 0.45, c * 0.6, -f * 0.78),
        e.quadraticCurveTo(2.5 * t, -f * 0.45, 3.5 * t, 1 * t),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#e0f2fe"),
        e.beginPath(),
        e.moveTo(-2 * t, 1 * t),
        e.quadraticCurveTo(-1 * t, -f * 0.3, c * 0.3, -f * 0.45),
        e.quadraticCurveTo(1 * t, -f * 0.3, 2 * t, 1 * t),
        e.closePath(),
        e.fill(),
        e.restore());
      // Faíscas azuis REMOVIDAS a pedido do jogador: fogueira de save deve ficar limpa (apenas o fogo azul).
    } else {
    (e.save(),
      (e.shadowColor = "#ea580c"),
      (e.shadowBlur = 14),
      (e.fillStyle = "#ea580c"),
      e.beginPath(),
      e.moveTo(-5.5 * t, 1 * t),
      e.quadraticCurveTo(-4 * t, -f * 0.5, c, -f),
      e.quadraticCurveTo(4 * t, -f * 0.5, 5.5 * t, 1 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#f59e0b"),
      e.beginPath(),
      e.moveTo(-3.5 * t, 1 * t),
      e.quadraticCurveTo(-2.5 * t, -f * 0.45, c * 0.6, -f * 0.78),
      e.quadraticCurveTo(2.5 * t, -f * 0.45, 3.5 * t, 1 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#fef08a"),
      e.beginPath(),
      e.moveTo(-2 * t, 1 * t),
      e.quadraticCurveTo(-1 * t, -f * 0.3, c * 0.3, -f * 0.45),
      e.quadraticCurveTo(1 * t, -f * 0.3, 2 * t, 1 * t),
      e.closePath(),
      e.fill(),
      e.restore());
    const g = Math.min(12, Math.round(4 + (t - 1) * 2.2));
    for (let w = 0; w < g; w++) {
      const v = (l * 3 + w * 1.3) % 3,
        T = Math.sin(l * 5 + w * 2) * (4 + w * 1.5) * t,
        S = -8 * t - v * 10 * t,
        p = Math.max(0, 1 - v / 3);
      ((e.fillStyle = `rgba(254, 215, 170, ${p})`),
        e.fillRect(T, S, 1.4 * t, 1.4 * t));
    }
    // REMOVIDO a pedido do jogador: fumaca em circulos girando sobre a fogueira (arcos cinza orbitando).
    if (u && u.roasting) {
      const rt = u.roasting,
        w = Date.now() - rt.startTime,
        v = w >= rt.durationMs,
        T = Math.min(1, Math.max(0, w / rt.durationMs)),
        S = Math.max(0, Math.ceil((rt.durationMs - w) / 1e3));
      e.save();
      const p = -13 * t,
        j = 13 * t,
        P = 2 * t,
        A = -12 * t;
      ((e.strokeStyle = "#2e1205"),
        (e.lineWidth = 2.4 * t),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(p, P),
        e.lineTo(p, A),
        e.lineTo(p - 3 * t, A - 3 * t),
        e.moveTo(p, A),
        e.lineTo(p + 2.5 * t, A - 3 * t),
        e.stroke(),
        e.beginPath(),
        e.moveTo(j, P),
        e.lineTo(j, A),
        e.lineTo(j - 2.5 * t, A - 3 * t),
        e.moveTo(j, A),
        e.lineTo(j + 3 * t, A - 3 * t),
        e.stroke(),
        (e.strokeStyle = "#854d0e"),
        (e.lineWidth = 1.3 * t),
        e.beginPath(),
        e.moveTo(p, P),
        e.lineTo(p, A),
        e.moveTo(j, P),
        e.lineTo(j, A),
        e.stroke(),
        (e.strokeStyle = "#3e1c05"),
        (e.lineWidth = 2.2 * t),
        e.beginPath(),
        e.moveTo(-16 * t, A),
        e.lineTo(16 * t, A),
        e.stroke(),
        (e.strokeStyle = "#a16207"),
        (e.lineWidth = 1.2 * t),
        e.beginPath(),
        e.moveTo(-16 * t, A),
        e.lineTo(16 * t, A),
        e.stroke());
      const x = t * 0.95,
        M = rt.fishItem.color || "#38bdf8",
        $ = v ? "#d97706" : T > 0.6 ? "#ca8a04" : M;
      if (
        (e.save(),
        e.translate(0, A),
        (e.fillStyle = $),
        e.beginPath(),
        e.ellipse(0, 0, 7.5 * x, 3.8 * x, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = v ? "#78350f" : "#0f172a"),
        (e.lineWidth = 1 * x),
        e.stroke(),
        (e.fillStyle = v ? "#92400e" : $),
        e.beginPath(),
        e.moveTo(-7.5 * x, 0),
        e.lineTo(-11.5 * x, -3.2 * x),
        e.lineTo(-9.5 * x, 0),
        e.lineTo(-11.5 * x, 3.2 * x),
        e.closePath(),
        e.fill(),
        e.stroke(),
        (e.fillStyle = "#1e293b"),
        e.beginPath(),
        e.arc(5 * x, -1 * x, 0.8 * x, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = v ? "#78350f" : "#64748b"),
        e.beginPath(),
        e.moveTo(-1 * x, -3.8 * x),
        e.lineTo(2 * x, -6 * x),
        e.lineTo(3 * x, -3.6 * x),
        e.closePath(),
        e.fill(),
        (e.strokeStyle = v ? "#451a03" : "rgba(0,0,0,0.3)"),
        (e.lineWidth = 1.2 * x),
        e.beginPath(),
        e.moveTo(-3 * x, -2.5 * x),
        e.lineTo(-1.5 * x, 2.5 * x),
        e.moveTo(0, -2.5 * x),
        e.lineTo(1.5 * x, 2.5 * x),
        e.moveTo(3 * x, -2.5 * x),
        e.lineTo(4.5 * x, 2.5 * x),
        e.stroke(),
        v)
      ) {
        const K = (l * 2) % 1;
        ((e.fillStyle = "rgba(254, 240, 138, 0.6)"),
          e.beginPath(),
          e.arc(
            Math.sin(l * 3) * 2 * t,
            -5 * t - K * 6 * t,
            (1.5 + K * 2) * t,
            0,
            Math.PI * 2,
          ),
          e.fill());
      } else {
        const V = ((l * 4.5) % 1) * 9 * t;
        ((e.fillStyle = "#fef08a"), e.fillRect(-0.6 * t, V, 1.2 * t, 2 * t));
      }
      e.restore();
      const z = A - 11 * t;
      if (
        ((e.font = "bold 8px system-ui, sans-serif"),
        (e.textAlign = "center"),
        (e.textBaseline = "middle"),
        v)
      ) {
        const K = "🍢 PRONTO!",
          V = Math.sin(l * 6) * 0.15 + 0.85,
          O = 50 * t * V,
          _ = 14 * t;
        ((e.fillStyle = "rgba(22, 101, 52, 0.95)"),
          e.beginPath(),
          e.roundRect(-O / 2, z - _ / 2, O, _, 4 * t),
          e.fill(),
          (e.strokeStyle = "#4ade80"),
          (e.lineWidth = 1.2),
          e.stroke(),
          (e.fillStyle = "#ffffff"),
          e.fillText(K, 0, z));
      } else {
        const K = `⏳ ${S}s`,
          V = 40 * t,
          O = 13 * t;
        ((e.fillStyle = "rgba(15, 23, 42, 0.88)"),
          e.beginPath(),
          e.roundRect(-V / 2, z - O / 2, V, O, 4 * t),
          e.fill(),
          (e.strokeStyle = "#f59e0b"),
          (e.lineWidth = 1),
          e.stroke());
        const _ = (V - 4 * t) * T;
        ((e.fillStyle = "#f59e0b"),
          e.fillRect(-V / 2 + 2 * t, z + O / 2 - 2.5 * t, _, 1.8 * t),
          (e.fillStyle = "#fef08a"),
          e.fillText(K, 0, z - 1 * t));
      }
      e.restore();
    }
    }
    u && u.cookingPot && gG(e, t, l, o, u.cookingPot);
  }
  function gG(e, t, l, o = !0, u) {
    if (!u) return;
    const m = o ? 1 : 0.85,
      c = -2 * t * m,
      f = 6.2 * t * m,
      g = 4.2 * t * m,
      y = (u.potItem || {}).name || "",
      w = y.toLowerCase().includes("caldeirão") || y.toLowerCase().includes("caldeirao");
    e.save();
    e.translate(0, c);
    ((e.fillStyle = "rgba(0, 0, 0, 0.35)"),
      e.beginPath(),
      e.ellipse(0, g + 1.2 * t, f * 0.95, g * 0.42, 0, 0, Math.PI * 2),
      e.fill());
    if (w) {
      ((e.strokeStyle = "#1c1917"),
        (e.lineWidth = 1.6 * t),
        e.beginPath(),
        e.arc(0, -g * 0.2, f * 1.02, Math.PI * 1.12, Math.PI * 1.88),
        e.stroke());
    }
    ((e.fillStyle = w ? "#44403c" : "#57534e"),
      e.beginPath(),
      e.moveTo(-f, -g * 0.55),
      e.quadraticCurveTo(-f * 1.06, g * 0.9, -f * 0.62, g),
      e.lineTo(f * 0.62, g),
      e.quadraticCurveTo(f * 1.06, g * 0.9, f, -g * 0.55),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "rgba(255,255,255,0.12)"),
      e.beginPath(),
      e.ellipse(-f * 0.45, g * 0.15, f * 0.22, g * 0.55, 0.25, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = w ? "#292524" : "#44403c"),
      (e.lineWidth = 1.4 * t),
      e.beginPath(),
      e.moveTo(-f * 0.62, g),
      e.lineTo(f * 0.62, g),
      e.stroke(),
      (e.fillStyle = w ? "#292524" : "#3f3f46"),
      e.beginPath(),
      e.ellipse(0, -g * 0.55, f, g * 0.42, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = w ? "#1c1917" : "#27272a"),
      (e.lineWidth = 1.2 * t),
      e.stroke());
    const v = u.hasWater ? "#38bdf8" : "#d97706";
    ((e.fillStyle = u.hasWater ? "rgba(56, 189, 248, 0.85)" : "rgba(217, 119, 6, 0.9)"),
      e.beginPath(),
      e.ellipse(0, -g * 0.5, f * 0.78, g * 0.3, 0, 0, Math.PI * 2),
      e.fill());
    for (let T = 0; T < (u.ingredients || []).length; T++) {
      const S = u.ingredients[T],
        p = (S.name || "").toLowerCase(),
        j = p.includes("carne") || p.includes("meat") ? "#b91c1c" : p.includes("gosma") || p.includes("gelatina") ? "#4ade80" : v,
        P = Math.sin(T * 2.4) * f * 0.4,
        A = Math.cos(T * 1.7) * g * 0.12;
      ((e.fillStyle = j),
        e.beginPath(),
        e.ellipse(P, -g * 0.5 + A, 2.4 * t, 1.5 * t, 0, 0, Math.PI * 2),
        e.fill());
    }
    if (o) {
      const K = Date.now() - u.startTime,
        V = K >= 45e3,
        O = Math.min(1, Math.max(0, K / 45e3)),
        _ = Math.max(0, Math.ceil((45e3 - K) / 1e3));
      for (let ue = 0; ue < 4; ue++) {
        const se = ((l * (V ? 0.55 : 0.9) + ue * 0.25) % 1) * 26 * t,
          Ce = Math.sin(l * 2 + ue * 1.6) * 3.5 * t,
          na = (1.6 + se / 9) * t,
          ia = Math.max(0, 0.3 - (se / (26 * t)) * 0.3);
        ((e.fillStyle = `rgba(226, 232, 240, ${ia})`),
          e.beginPath(),
          e.arc(Ce, -g * 0.7 - se, na, 0, Math.PI * 2),
          e.fill());
      }
      e.font = `bold ${Math.max(7, 8 * t)}px system-ui, sans-serif`;
      ((e.textAlign = "center"), (e.textBaseline = "middle"));
      const Je = -g * 0.55 - 34 * t;
      if (V) {
        const he = "🍲 PRONTO! [R]",
          $e = Math.sin(l * 6) * 0.15 + 0.85,
          da = 78 * t * $e,
          ka = 14 * t;
        ((e.fillStyle = "rgba(22, 101, 52, 0.95)"),
          e.beginPath(),
          e.roundRect(-da / 2, Je - ka / 2, da, ka, 4 * t),
          e.fill(),
          (e.strokeStyle = "#4ade80"),
          (e.lineWidth = 1.2),
          e.stroke(),
          (e.fillStyle = "#ffffff"),
          e.fillText(he, 0, Je));
      } else {
        const he = `⏳ ${_}s`,
          $e = 44 * t,
          da = 13 * t;
        ((e.fillStyle = "rgba(15, 23, 42, 0.88)"),
          e.beginPath(),
          e.roundRect(-$e / 2, Je - da / 2, $e, da, 4 * t),
          e.fill(),
          (e.strokeStyle = "#f59e0b"),
          (e.lineWidth = 1),
          e.stroke());
        const ka = ($e - 4 * t) * O;
        ((e.fillStyle = "#f59e0b"),
          e.fillRect(-$e / 2 + 2 * t, Je + da / 2 - 2.5 * t, ka, 1.8 * t),
          (e.fillStyle = "#fef08a"),
          e.fillText(he, 0, Je - 1 * t));
      }
    }
    e.restore();
  }
  function pg(e, t, l = !1, o = 0) {
    if (
      ((e.fillStyle = "#451a03"),
      e.beginPath(),
      e.roundRect(-9.5 * t, -8.5 * t, 19 * t, 13 * t, 2 * t),
      e.fill(),
      (e.fillStyle = "#78350f"),
      e.fillRect(-9 * t, -8 * t, 18 * t, 12 * t),
      (e.strokeStyle = "#2e1205"),
      (e.lineWidth = 1 * t),
      e.beginPath(),
      e.moveTo(-9 * t, -4 * t),
      e.lineTo(9 * t, -4 * t),
      e.stroke(),
      (e.fillStyle = "#1e293b"),
      e.fillRect(-8 * t, -8 * t, 3 * t, 12 * t),
      e.fillRect(5 * t, -8 * t, 3 * t, 12 * t),
      (e.fillStyle = "#94a3b8"),
      e.fillRect(-7 * t, -7 * t, 1.2 * t, 1.2 * t),
      e.fillRect(-7 * t, -1 * t, 1.2 * t, 1.2 * t),
      e.fillRect(6 * t, -7 * t, 1.2 * t, 1.2 * t),
      e.fillRect(6 * t, -1 * t, 1.2 * t, 1.2 * t),
      l)
    ) {
      ((e.fillStyle = "#451a03"),
        e.beginPath(),
        e.moveTo(-10 * t, -8 * t),
        e.lineTo(-8 * t, -19 * t),
        e.lineTo(8 * t, -19 * t),
        e.lineTo(10 * t, -8 * t),
        e.closePath(),
        e.fill());
      const u = Math.sin(o * 4) * 0.15 + 0.85;
      ((e.fillStyle = `rgba(251, 191, 36, ${0.8 * u})`),
        e.beginPath(),
        e.ellipse(0, -6 * t, 6 * t, 3 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#ffffff"),
        e.beginPath(),
        e.arc(-2 * t, -7 * t, 1.2 * t, 0, Math.PI * 2),
        e.arc(3 * t, -6 * t, 1.4 * t, 0, Math.PI * 2),
        e.fill());
    } else
      ((e.fillStyle = "#451a03"),
        e.beginPath(),
        e.roundRect(-10 * t, -15 * t, 20 * t, 8 * t, [4 * t, 4 * t, 0, 0]),
        e.fill(),
        (e.fillStyle = "#92400e"),
        e.beginPath(),
        e.roundRect(-9.5 * t, -14.5 * t, 19 * t, 7 * t, [3 * t, 3 * t, 0, 0]),
        e.fill(),
        (e.fillStyle = "#1e293b"),
        e.fillRect(-8 * t, -14.5 * t, 3 * t, 7 * t),
        e.fillRect(5 * t, -14.5 * t, 3 * t, 7 * t),
        (e.fillStyle = "#f59e0b"),
        e.beginPath(),
        e.roundRect(-2.5 * t, -9.5 * t, 5 * t, 5.5 * t, 1.5 * t),
        e.fill(),
        (e.fillStyle = "#1c1917"),
        e.beginPath(),
        e.arc(0, -7.5 * t, 1 * t, 0, Math.PI * 2),
        e.rect(-0.6 * t, -7.5 * t, 1.2 * t, 2 * t),
        e.fill());
  }
  function gg(e, t, l) {
    // Coluna Dórica Grega de Mármore Branco com caneluras verticais, capitel e hera
    e.save();
    // Base / Estilóbata de mármore em 2 degraus
    e.fillStyle = "#94a3b8";
    e.fillRect(-10.5 * t, -1.5 * t, 21 * t, 4.5 * t);
    e.fillStyle = "#e2e8f0";
    e.fillRect(-9.5 * t, -4 * t, 19 * t, 3 * t);
    e.strokeStyle = "#64748b";
    e.lineWidth = 0.9 * t;
    e.strokeRect(-9.5 * t, -4 * t, 19 * t, 3 * t);

    // Fuste da coluna (inteira quando l !== 1, ou semi-quebrada em ruína quando l === 1)
    const colH = l === 1 ? 18 * t : 26 * t;
    const topY = -4 * t - colH;
    const fusteGrad = e.createLinearGradient(-7.5 * t, 0, 7.5 * t, 0);
    fusteGrad.addColorStop(0, "#cbd5e1");
    fusteGrad.addColorStop(0.35, "#f8fafc");
    fusteGrad.addColorStop(0.75, "#e2e8f0");
    fusteGrad.addColorStop(1, "#94a3b8");
    e.fillStyle = fusteGrad;
    e.fillRect(-7.2 * t, topY, 14.4 * t, colH);

    // Caneluras clássicas gregas (sulcos verticais)
    e.strokeStyle = "rgba(100, 116, 139, 0.55)";
    e.lineWidth = 1.1 * t;
    for (const fx of [-4.5, -1.5, 1.5, 4.5]) {
      e.beginPath();
      e.moveTo(fx * t, topY + 2 * t);
      e.lineTo(fx * t, -4 * t);
      e.stroke();
    }

    if (l !== 1) {
      // Capitel Dórico (Equino + Ábaco com friso dourado helênico)
      e.fillStyle = "#e2e8f0";
      e.beginPath();
      e.moveTo(-7.5 * t, topY);
      e.lineTo(-10 * t, topY - 3 * t);
      e.lineTo(10 * t, topY - 3 * t);
      e.lineTo(7.5 * t, topY);
      e.closePath();
      e.fill();

      e.fillStyle = "#f8fafc";
      e.fillRect(-10.5 * t, topY - 6.5 * t, 21 * t, 3.8 * t);
      e.strokeStyle = "#d97706";
      e.lineWidth = 1.1 * t;
      e.strokeRect(-9.5 * t, topY - 5.5 * t, 19 * t, 1.8 * t);
    } else {
      // Topo fraturado em diagonal de coluna grega arruinada
      e.fillStyle = "#cbd5e1";
      e.beginPath();
      e.moveTo(-7.2 * t, topY);
      e.lineTo(-3 * t, topY - 3.5 * t);
      e.lineTo(2 * t, topY - 1 * t);
      e.lineTo(7.2 * t, topY - 4 * t);
      e.lineTo(7.2 * t, topY);
      e.closePath();
      e.fill();
    }

    // Hera mediterrânea subindo pela coluna
    e.fillStyle = "#15803d";
    e.beginPath();
    e.arc(-5.5 * t, -10 * t, 2.6 * t, 0, Math.PI * 2);
    e.arc(-4 * t, -14 * t, 2.2 * t, 0, Math.PI * 2);
    e.arc(-2.5 * t, -17.5 * t, 1.8 * t, 0, Math.PI * 2);
    e.fill();
    e.restore();
  }
  function drawGreekRuinWall25D(e, t, subType = 0, neighbors = null) {
    e.save();
    const nL = !!(neighbors && neighbors.left),
      nR = !!(neighbors && neighbors.right),
      nT = !!(neighbors && neighbors.top),
      nB = !!(neighbors && neighbors.bottom),
      half = 18 * t,
      leftX = nL ? -half - 1 * t : -half + 1 * t,
      rightX = nR ? half + 1 * t : half - 1 * t,
      w = rightX - leftX,
      wallH = 26 * t,
      baseY = 18 * t,
      topFrontY = baseY - wallH,
      topBackY = -half - wallH;

    // Sombra projetada no piso se não houver parede ao sul
    if (!nB) {
      e.fillStyle = "rgba(15, 23, 42, 0.32)";
      e.fillRect(leftX, baseY - 2 * t, w, 7 * t);
    }

    // Face Frontal 2.5D de blocos de mármore helênico
    const frontGrad = e.createLinearGradient(0, topFrontY, 0, baseY);
    frontGrad.addColorStop(0, "#f1f5f9");
    frontGrad.addColorStop(0.45, "#e2e8f0");
    frontGrad.addColorStop(1, "#cbd5e1");
    e.fillStyle = frontGrad;
    e.fillRect(leftX, topFrontY, w, wallH);

    // Juntas dos blocos de cantaria de mármore
    e.strokeStyle = "rgba(100, 116, 139, 0.45)";
    e.lineWidth = 1 * t;
    e.beginPath();
    e.moveTo(leftX, topFrontY + 8.5 * t);
    e.lineTo(rightX, topFrontY + 8.5 * t);
    e.moveTo(leftX, topFrontY + 17 * t);
    e.lineTo(rightX, topFrontY + 17 * t);
    e.moveTo(0, topFrontY + 8.5 * t);
    e.lineTo(0, topFrontY + 17 * t);
    e.moveTo(-7 * t, topFrontY + 17 * t);
    e.lineTo(-7 * t, baseY);
    e.moveTo(7 * t, topFrontY);
    e.lineTo(7 * t, topFrontY + 8.5 * t);
    e.stroke();

    // Friso Grego Dourado/Azul-Olímpico (Meandro Helênico) na faixa superior da parede
    e.fillStyle = "#0284c7";
    e.fillRect(leftX, topFrontY + 2 * t, w, 4.2 * t);
    e.strokeStyle = "#fbbf24";
    e.lineWidth = 1 * t;
    e.beginPath();
    e.moveTo(leftX, topFrontY + 2 * t);
    e.lineTo(rightX, topFrontY + 2 * t);
    e.moveTo(leftX, topFrontY + 6.2 * t);
    e.lineTo(rightX, topFrontY + 6.2 * t);
    e.stroke();

    // Topo da Parede 2.5D (Cornija de Mármore Claro)
    e.fillStyle = "#f8fafc";
    e.fillRect(leftX, topBackY, w, topFrontY - topBackY + 1.5 * t);
    e.strokeStyle = "#cbd5e1";
    e.lineWidth = 1 * t;
    e.strokeRect(leftX + 0.5 * t, topBackY + 0.5 * t, w - 1 * t, topFrontY - topBackY);

    // Detalhe de ruína (rachadura ou musgo/hera grega conforme subType)
    if (subType === 1) {
      e.fillStyle = "#15803d";
      e.beginPath();
      e.arc(-6 * t, topFrontY + 4 * t, 3.2 * t, 0, Math.PI * 2);
      e.arc(-3 * t, topFrontY + 8 * t, 2.5 * t, 0, Math.PI * 2);
      e.fill();
    } else if (subType === 2) {
      e.strokeStyle = "rgba(71, 85, 105, 0.75)";
      e.lineWidth = 1.2 * t;
      e.beginPath();
      e.moveTo(-4 * t, topFrontY + 7 * t);
      e.lineTo(-1 * t, topFrontY + 13 * t);
      e.lineTo(-3 * t, topFrontY + 19 * t);
      e.stroke();
    }

    // Bordas laterais quando a parede termina em uma porta/abertura
    if (!nL) {
      e.fillStyle = "#94a3b8";
      e.fillRect(leftX, topBackY, 2.2 * t, baseY - topBackY);
    }
    if (!nR) {
      e.fillStyle = "#94a3b8";
      e.fillRect(rightX - 2.2 * t, topBackY, 2.2 * t, baseY - topBackY);
    }
    if (!nT) {
      e.fillStyle = "#e2e8f0";
      e.fillRect(leftX, topBackY, w, 2 * t);
    }
    e.restore();
  }
  function bg(e, t, l) {
    ((e.fillStyle = "#1e293b"),
      e.beginPath(),
      e.arc(-16 * t, -12 * t, 14 * t, 0, Math.PI * 2),
      e.arc(16 * t, -12 * t, 14 * t, 0, Math.PI * 2),
      e.arc(0, -22 * t, 16 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#334155"),
      e.beginPath(),
      e.arc(-14 * t, -15 * t, 10 * t, 0, Math.PI * 2),
      e.arc(14 * t, -15 * t, 10 * t, 0, Math.PI * 2),
      e.arc(0, -25 * t, 11 * t, 0, Math.PI * 2),
      e.fill());
    const o = e.createRadialGradient(0, 0, 2 * t, 0, -4 * t, 16 * t);
    (o.addColorStop(0, "#000000"),
      o.addColorStop(0.7, "#09090b"),
      o.addColorStop(1, "#18181b"),
      (e.fillStyle = o),
      e.beginPath(),
      e.ellipse(0, -4 * t, 14 * t, 16 * t, 0, Math.PI, 0),
      e.lineTo(14 * t, 4 * t),
      e.lineTo(-14 * t, 4 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#27272a"),
      e.fillRect(-10 * t, 0 * t, 20 * t, 2.5 * t),
      (e.fillStyle = "#18181b"),
      e.fillRect(-8 * t, 2.5 * t, 16 * t, 2.5 * t),
      (e.fillStyle = "#451a03"),
      e.fillRect(-13 * t, -16 * t, 3.5 * t, 18 * t),
      e.fillRect(9.5 * t, -16 * t, 3.5 * t, 18 * t),
      (e.fillStyle = "#78350f"),
      e.fillRect(-14 * t, -18 * t, 28 * t, 4 * t),
      (e.strokeStyle = "#0f172a"),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.moveTo(6 * t, -14 * t),
      e.lineTo(6 * t, -9 * t),
      e.stroke(),
      (e.fillStyle = "#1e293b"),
      e.fillRect(4 * t, -9 * t, 4 * t, 5.5 * t));
    const u = Math.sin(l * 6) * 0.15;
    ((e.fillStyle = `rgba(251, 191, 36, ${0.85 + u})`),
      e.fillRect(4.8 * t, -8.2 * t, 2.4 * t, 3.8 * t),
      (e.fillStyle = "#15803d"),
      e.beginPath(),
      e.arc(-8 * t, -17 * t, 3 * t, 0, Math.PI * 2),
      e.arc(-4 * t, -16 * t, 2.5 * t, 0, Math.PI * 2),
      e.arc(2 * t, -17 * t, 3 * t, 0, Math.PI * 2),
      e.fill());
  }
  function yg(e, t, l = 0) {
    ((e.fillStyle = "#1c1917"),
      e.beginPath(),
      e.arc(-16 * t, -12 * t, 14 * t, 0, Math.PI * 2),
      e.arc(16 * t, -12 * t, 14 * t, 0, Math.PI * 2),
      e.arc(0, -22 * t, 16 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#292524"),
      e.beginPath(),
      e.arc(-14 * t, -15 * t, 10 * t, 0, Math.PI * 2),
      e.arc(14 * t, -15 * t, 10 * t, 0, Math.PI * 2),
      e.arc(0, -25 * t, 11 * t, 0, Math.PI * 2),
      e.fill());
    const o = e.createLinearGradient(0, -20 * t, 0, 4 * t);
    (o.addColorStop(0, "#0284c7"),
      o.addColorStop(0.35, "#38bdf8"),
      o.addColorStop(0.7, "#7dd3fc"),
      o.addColorStop(1, "#fde047"),
      (e.fillStyle = o),
      e.beginPath(),
      e.ellipse(0, -4 * t, 14 * t, 16 * t, 0, Math.PI, 0),
      e.lineTo(14 * t, 4 * t),
      e.lineTo(-14 * t, 4 * t),
      e.closePath(),
      e.fill());
    const r = e.createLinearGradient(0, -2 * t, 0, 16 * t);
    (r.addColorStop(0, "rgba(254, 240, 138, 0.18)"),
      r.addColorStop(0.5, "rgba(254, 240, 138, 0.06)"),
      r.addColorStop(1, "rgba(254, 240, 138, 0)"),
      (e.fillStyle = r),
      e.beginPath(),
      e.moveTo(-11 * t, -2 * t),
      e.lineTo(11 * t, -2 * t),
      e.lineTo(20 * t, 14 * t),
      e.lineTo(-20 * t, 14 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#334155"),
      e.fillRect(-10 * t, 0 * t, 20 * t, 2.5 * t),
      (e.fillStyle = "#1e293b"),
      e.fillRect(-8 * t, 2.5 * t, 16 * t, 2.5 * t),
      (e.fillStyle = "#451a03"),
      e.fillRect(-13 * t, -16 * t, 3.5 * t, 18 * t),
      e.fillRect(9.5 * t, -16 * t, 3.5 * t, 18 * t),
      (e.fillStyle = "#78350f"),
      e.fillRect(-14 * t, -18 * t, 28 * t, 4 * t),
      (e.fillStyle = "#451a03"),
      e.fillRect(-10 * t, -23 * t, 20 * t, 5 * t),
      (e.fillStyle = "#92400e"),
      e.fillRect(-9 * t, -22 * t, 18 * t, 4 * t),
      (e.fillStyle = "#fef08a"),
      (e.font = `bold ${Math.round(3.5 * t)}px sans-serif`),
      (e.textAlign = "center"),
      e.fillText("▲ SAÍDA", 0, -19 * t),
      (e.strokeStyle = "#0f172a"),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.moveTo(6 * t, -14 * t),
      e.lineTo(6 * t, -9 * t),
      e.stroke(),
      (e.fillStyle = "#1e293b"),
      e.fillRect(4 * t, -9 * t, 4 * t, 5.5 * t));
    const u = Math.sin((l || 0) * 6) * 0.15;
    ((e.fillStyle = `rgba(251, 191, 36, ${0.85 + u})`),
      e.fillRect(4.8 * t, -8.2 * t, 2.4 * t, 3.8 * t),
      (e.fillStyle = "#16a34a"),
      e.beginPath(),
      e.arc(-8 * t, -17 * t, 3 * t, 0, Math.PI * 2),
      e.arc(-4 * t, -16 * t, 2.5 * t, 0, Math.PI * 2),
      e.arc(2 * t, -17 * t, 3 * t, 0, Math.PI * 2),
      e.fill());
  }
  function vg(e, t, l, o = !1) {
    if (
      ((e.fillStyle = "#1c1917"),
      e.beginPath(),
      e.ellipse(0, 3 * t, 13 * t, 6 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#292524"),
      e.beginPath(),
      e.ellipse(0, 2 * t, 10 * t, 4.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      o)
    ) {
      ((e.fillStyle = "#a855f7"),
        e.beginPath(),
        e.moveTo(-3 * t, 2 * t),
        e.lineTo(-2 * t, -2 * t),
        e.lineTo(0, 2 * t),
        e.fill(),
        (e.fillStyle = "#cbd5e1"),
        e.fillRect(1 * t, 1 * t, 3 * t, 2 * t));
      return;
    }
    const u = [
        ["#581c87", "#9333ea", "#c084fc", "#f3e8ff"],
        ["#0369a1", "#0284c7", "#38bdf8", "#e0f2fe"],
        ["#9f1239", "#e11d48", "#fb7185", "#ffe4e6"],
        ["#065f46", "#059669", "#34d399", "#d1fae5"],
      ],
      m = u[l % u.length];
    e.save();
    const c = [
      { x: -5 * t, y: 3 * t, w: 4 * t, h: 14 * t, angle: -0.22 },
      { x: 0, y: 3 * t, w: 5 * t, h: 22 * t, angle: 0.05 },
      { x: 5 * t, y: 3 * t, w: 4.5 * t, h: 16 * t, angle: 0.26 },
      { x: -2 * t, y: 4 * t, w: 3 * t, h: 10 * t, angle: -0.1 },
    ];
    for (const f of c)
      (e.save(),
        e.translate(f.x, f.y),
        e.rotate(f.angle),
        (e.fillStyle = m[0]),
        e.beginPath(),
        e.moveTo(-f.w / 2, 0),
        e.lineTo(0, -f.h),
        e.lineTo(f.w / 2, 0),
        e.closePath(),
        e.fill(),
        (e.fillStyle = m[1]),
        e.beginPath(),
        e.moveTo(-f.w / 2, 0),
        e.lineTo(0, -f.h),
        e.lineTo(0, 0),
        e.closePath(),
        e.fill(),
        (e.fillStyle = m[2]),
        e.beginPath(),
        e.moveTo(0, 0),
        e.lineTo(0, -f.h),
        e.lineTo(f.w / 4, -f.h * 0.4),
        e.closePath(),
        e.fill(),
        (e.fillStyle = m[3]),
        e.fillRect(-0.6 * t, -f.h, 1.2 * t, 2 * t),
        e.restore());
    e.restore();
  }
  function wg(e, t, l, o = !1) {
    if (
      ((e.fillStyle = "#292524"),
      e.beginPath(),
      e.moveTo(-11 * t, 4 * t),
      e.lineTo(-13 * t, -4 * t),
      e.lineTo(-7 * t, -14 * t),
      e.lineTo(5 * t, -15 * t),
      e.lineTo(12 * t, -6 * t),
      e.lineTo(11 * t, 4 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#44403c"),
      e.beginPath(),
      e.moveTo(-7 * t, -14 * t),
      e.lineTo(5 * t, -15 * t),
      e.lineTo(0 * t, -4 * t),
      e.lineTo(-11 * t, -4 * t),
      e.closePath(),
      e.fill(),
      o)
    ) {
      ((e.fillStyle = "#0c0a09"),
        e.beginPath(),
        e.ellipse(0, -5 * t, 5 * t, 3.5 * t, 0, 0, Math.PI * 2),
        e.fill());
      return;
    }
    const u = [
        ["#d97706", "#fbbf24", "#fef08a"],
        ["#0284c7", "#38bdf8", "#e0f2fe"],
        ["#64748b", "#cbd5e1", "#f8fafc"],
      ],
      m = u[l % u.length],
      c = [
        { x: -4 * t, y: -8 * t, r: 2.8 * t },
        { x: 1 * t, y: -10 * t, r: 3.2 * t },
        { x: -1 * t, y: -4 * t, r: 2.5 * t },
        { x: 5 * t, y: -7 * t, r: 2.4 * t },
      ];
    for (const f of c)
      ((e.fillStyle = m[0]),
        e.beginPath(),
        e.arc(f.x, f.y, f.r, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = m[1]),
        e.beginPath(),
        e.arc(f.x - f.r * 0.25, f.y - f.r * 0.25, f.r * 0.7, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = m[2]),
        e.beginPath(),
        e.arc(f.x - f.r * 0.4, f.y - f.r * 0.4, f.r * 0.35, 0, Math.PI * 2),
        e.fill());
  }
  function Tg(e, t, l) {
    const o = (l === 0 ? 18 : l === 1 ? 24 : 14) * t,
      u = 8 * t;
    ((e.fillStyle = "#292524"),
      e.beginPath(),
      e.ellipse(0, 3 * t, 7 * t, 3.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#44403c"),
      e.beginPath(),
      e.moveTo(-u / 2, 2 * t),
      e.lineTo(0, -o),
      e.lineTo(u / 2, 2 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#78716c"),
      e.beginPath(),
      e.moveTo(-u / 2, 2 * t),
      e.lineTo(0, -o),
      e.lineTo(0, 2 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#e7e5e4"),
      e.beginPath(),
      e.arc(0, -o + 1.5 * t, 1.2 * t, 0, Math.PI * 2),
      e.fill());
  }
  function Sg(e, t) {
    ((e.fillStyle = "#451a03"),
      e.fillRect(-12 * t, 2 * t, 24 * t, 3 * t),
      (e.fillStyle = "#94a3b8"),
      e.fillRect(-14 * t, 0, 28 * t, 1.5 * t),
      e.fillRect(-14 * t, 4 * t, 28 * t, 1.5 * t),
      (e.fillStyle = "#334155"),
      e.beginPath(),
      e.arc(-7 * t, 1 * t, 3.2 * t, 0, Math.PI * 2),
      e.arc(7 * t, 1 * t, 3.2 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#78350f"),
      e.beginPath(),
      e.moveTo(-10 * t, 0),
      e.lineTo(-12 * t, -9 * t),
      e.lineTo(12 * t, -9 * t),
      e.lineTo(10 * t, 0),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#475569"),
      (e.lineWidth = 1.5 * t),
      e.stroke(),
      (e.fillStyle = "#fbbf24"),
      e.beginPath(),
      e.arc(-4 * t, -10 * t, 3 * t, 0, Math.PI * 2),
      e.arc(2 * t, -11 * t, 3.5 * t, 0, Math.PI * 2),
      e.arc(6 * t, -10 * t, 2.5 * t, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#c084fc"),
      e.beginPath(),
      e.arc(0, -12 * t, 2 * t, 0, Math.PI * 2),
      e.fill());
  }
  function kP(e, t, l) {
    const o = l === 0,
      u = o ? "#0d9488" : "#a855f7",
      m = o ? "rgba(45, 212, 191, 0.08)" : "rgba(168, 85, 247, 0.08)",
      c = o ? "#ccfbf1" : "#f3e8ff";
    ((e.fillStyle = m),
      e.beginPath(),
      e.ellipse(0, 3 * t, 6 * t, 3 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = c),
      e.beginPath(),
      e.moveTo(-1.5 * t, 2 * t),
      e.quadraticCurveTo(-0.5 * t, -5 * t, -1 * t, -8 * t),
      e.lineTo(1 * t, -8 * t),
      e.quadraticCurveTo(1.2 * t, -5 * t, 1.5 * t, 2 * t),
      e.closePath(),
      e.fill(),
      (e.fillStyle = u),
      e.beginPath(),
      e.arc(0, -8 * t, 6 * t, Math.PI, 0),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#e2e8f0"),
      e.beginPath(),
      e.arc(-2.5 * t, -11 * t, 0.9 * t, 0, Math.PI * 2),
      e.arc(2 * t, -12 * t, 1 * t, 0, Math.PI * 2),
      e.arc(0, -9.5 * t, 0.8 * t, 0, Math.PI * 2),
      e.fill());
  }
  function Mg(e, t, l = 0, o = !1) {
    e.save();
    const u = Math.sin(l * 2.2) * 0.12 + 0.88;
    if (
      ((e.fillStyle = "rgba(124, 45, 18, 0.28)"),
      e.beginPath(),
      e.ellipse(0, 4 * t, 14 * t, 7 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = "rgba(254, 215, 170, 0.4)"),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.ellipse(0, 4 * t, 16 * t * u, 8 * t * u, 0, 0, Math.PI * 2),
      e.stroke(),
      (e.fillStyle = "#431407"),
      e.beginPath(),
      e.ellipse(0, 2 * t, 12 * t, 6.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#7c2d12"),
      e.beginPath(),
      e.ellipse(-1 * t, 0, 10.5 * t, 5.5 * t, -0.05, 0, Math.PI * 2),
      e.fill(),
      o)
    )
      ((e.fillStyle = "#451a03"),
        e.beginPath(),
        e.ellipse(0, -1 * t, 8 * t, 4 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "rgba(14, 165, 233, 0.45)"),
        e.beginPath(),
        e.ellipse(0, -0.5 * t, 6 * t, 2.8 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = "#9a3412"),
        (e.lineWidth = 1.2 * t),
        e.beginPath(),
        e.arc(0, -1 * t, 6.5 * t, 0.3, Math.PI - 0.3),
        e.stroke());
    else {
      ((e.fillStyle = "#9a3412"),
        e.beginPath(),
        e.ellipse(0, -2 * t, 9 * t, 5 * t, 0.04, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#c2410c"),
        e.beginPath(),
        e.ellipse(-1.2 * t, -4.5 * t, 7 * t, 4.2 * t, -0.08, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#ea580c"),
        e.beginPath(),
        e.ellipse(0.5 * t, -6 * t, 5 * t, 2.8 * t, 0.05, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#9a3412"),
        e.beginPath(),
        e.ellipse(5.5 * t, -0.5 * t, 4.2 * t, 3 * t, 0.3, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#c2410c"),
        e.beginPath(),
        e.ellipse(5 * t, -1.2 * t, 3.2 * t, 2.2 * t, 0.25, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = "#7c2d12"),
        (e.lineWidth = 1.3 * t),
        e.beginPath(),
        e.arc(-1 * t, -3.5 * t, 4.5 * t, 0.4, 2.2),
        e.stroke(),
        e.beginPath(),
        e.arc(1.5 * t, -2.5 * t, 3.8 * t, 0.2, 1.8),
        e.stroke(),
        (e.fillStyle = "rgba(255, 247, 237, 0.75)"),
        e.beginPath(),
        e.ellipse(-2.2 * t, -6.8 * t, 2.4 * t, 1.1 * t, -0.2, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "rgba(254, 215, 170, 0.6)"),
        e.beginPath(),
        e.ellipse(3.8 * t, -2.5 * t, 1.6 * t, 0.8 * t, 0.3, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#15803d"),
        e.beginPath(),
        e.moveTo(-6 * t, 2 * t),
        e.quadraticCurveTo(-7.5 * t, -5 * t, -9 * t, -11 * t),
        e.quadraticCurveTo(-6.8 * t, -5 * t, -5.2 * t, 2 * t),
        e.fill(),
        (e.fillStyle = "#22c55e"),
        e.beginPath(),
        e.moveTo(-4.5 * t, 2 * t),
        e.quadraticCurveTo(-5 * t, -4 * t, -5.5 * t, -9 * t),
        e.quadraticCurveTo(-4.2 * t, -4 * t, -3.8 * t, 2 * t),
        e.fill());
      const m = -8 * t - ((l * 8) % (12 * t)),
        c = Math.sin((((l * 8) % (12 * t)) / (12 * t)) * Math.PI);
      ((e.fillStyle = `rgba(254, 215, 170, ${c * 0.75})`),
        e.beginPath(),
        e.arc(2.5 * t, m, 1.2 * t, 0, Math.PI * 2),
        e.fill());
      const f = Math.sin(l * 3.5);
      if (f > 0.6) {
        const g = (f - 0.6) / 0.4;
        ((e.fillStyle = `rgba(255, 255, 255, ${g * 0.9})`),
          e.beginPath(),
          e.arc(-1.5 * t, -7 * t, 1.5 * t, 0, Math.PI * 2),
          e.fill());
      }
    }
    e.restore();
  }
  function Cg(e, t, l = 0, o = "pote", u = 0, m = 12e4) {
    e.save();
    const c = Math.max(0, Date.now() - u),
      f = Math.min(1, Math.max(0, c / m)),
      g = f >= 1;
    ((e.fillStyle = "rgba(28, 25, 23, 0.45)"),
      e.beginPath(),
      e.ellipse(0, 3 * t, 11 * t, 5.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#78716c"),
      e.beginPath(),
      e.ellipse(0, 2.5 * t, 10 * t, 5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = "#a8a29e"),
      (e.lineWidth = 0.8 * t),
      e.stroke());
    const y = Math.round(110 + f * 84),
      w = Math.round(40 + f * 48),
      v = Math.round(15 + f * 15),
      T = `rgb(${y}, ${w}, ${v})`,
      S = `rgb(${Math.round(y * 0.65)}, ${Math.round(w * 0.65)}, ${Math.round(v * 0.65)})`,
      p = `rgb(${Math.min(255, y + 45)}, ${Math.min(255, w + 35)}, ${Math.min(255, v + 25)})`;
    o === "frasco"
      ? ((e.fillStyle = S),
        e.beginPath(),
        e.ellipse(0, 1 * t, 6.5 * t, 4 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = T),
        e.beginPath(),
        e.ellipse(0, -2 * t, 6 * t, 5.5 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = T),
        e.fillRect(-2.2 * t, -11 * t, 4.4 * t, 6 * t),
        (e.fillStyle = p),
        e.beginPath(),
        e.ellipse(0, -11 * t, 3.2 * t, 1.4 * t, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = S),
        (e.lineWidth = 1.6 * t),
        e.beginPath(),
        e.arc(4.2 * t, -4.5 * t, 2.8 * t, -Math.PI / 2, Math.PI / 2),
        e.stroke(),
        g ||
          ((e.fillStyle = "rgba(255, 255, 255, 0.4)"),
          e.beginPath(),
          e.ellipse(-1.8 * t, -3.5 * t, 1.2 * t, 2.2 * t, -0.3, 0, Math.PI * 2),
          e.fill()))
      : o === "jarra"
        ? ((e.fillStyle = S),
          e.beginPath(),
          e.ellipse(0, 1 * t, 7 * t, 4.2 * t, 0, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = T),
          e.beginPath(),
          e.ellipse(0, -3 * t, 6.8 * t, 6.5 * t, 0, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = p),
          e.beginPath(),
          e.moveTo(-3 * t, -6 * t),
          e.lineTo(-2 * t, -12 * t),
          e.lineTo(3.5 * t, -12.5 * t),
          e.lineTo(2.5 * t, -6 * t),
          e.closePath(),
          e.fill(),
          (e.fillStyle = S),
          e.beginPath(),
          e.ellipse(0.5 * t, -12 * t, 2.8 * t, 1.2 * t, 0, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = p),
          (e.lineWidth = 1.8 * t),
          e.beginPath(),
          e.moveTo(-2 * t, -11 * t),
          e.quadraticCurveTo(-6 * t, -7 * t, -3 * t, -2 * t),
          e.stroke(),
          g ||
            ((e.fillStyle = "rgba(255, 255, 255, 0.35)"),
            e.beginPath(),
            e.ellipse(1 * t, -4 * t, 1.4 * t, 3 * t, 0.2, 0, Math.PI * 2),
            e.fill()))
        : o === "panela"
          ? ((e.fillStyle = S),
            e.beginPath(),
            e.ellipse(0, 1 * t, 8.5 * t, 4.8 * t, 0, 0, Math.PI * 2),
            e.fill(),
            (e.fillStyle = T),
            e.beginPath(),
            e.ellipse(0, -2 * t, 8.2 * t, 5 * t, 0, 0, Math.PI * 2),
            e.fill(),
            (e.fillStyle = p),
            e.beginPath(),
            e.ellipse(0, -5.5 * t, 7.8 * t, 2.6 * t, 0, 0, Math.PI * 2),
            e.fill(),
            (e.fillStyle = S),
            e.beginPath(),
            e.ellipse(0, -5.5 * t, 6.2 * t, 1.9 * t, 0, 0, Math.PI * 2),
            e.fill(),
            (e.strokeStyle = p),
            (e.lineWidth = 1.8 * t),
            e.beginPath(),
            e.arc(-7.2 * t, -3 * t, 2 * t, Math.PI / 2, -Math.PI / 2, !1),
            e.stroke(),
            e.beginPath(),
            e.arc(7.2 * t, -3 * t, 2 * t, -Math.PI / 2, Math.PI / 2, !1),
            e.stroke(),
            g ||
              ((e.fillStyle = "rgba(255, 255, 255, 0.35)"),
              e.beginPath(),
              e.ellipse(-2 * t, -2 * t, 2.5 * t, 1.2 * t, 0, 0, Math.PI * 2),
              e.fill()))
          : o === "caldeirao"
            ? ((e.fillStyle = S),
              e.fillRect(-5.5 * t, 1.5 * t, 2 * t, 2.5 * t),
              e.fillRect(3.5 * t, 1.5 * t, 2 * t, 2.5 * t),
              e.fillRect(-1 * t, 2 * t, 2 * t, 2.5 * t),
              (e.fillStyle = S),
              e.beginPath(),
              e.ellipse(0, -0.5 * t, 8.5 * t, 5.5 * t, 0, 0, Math.PI * 2),
              e.fill(),
              (e.fillStyle = T),
              e.beginPath(),
              e.ellipse(0, -2.5 * t, 8 * t, 5.2 * t, 0, 0, Math.PI * 2),
              e.fill(),
              (e.fillStyle = p),
              e.beginPath(),
              e.ellipse(0, -7 * t, 7 * t, 2.5 * t, 0, 0, Math.PI * 2),
              e.fill(),
              (e.fillStyle = S),
              e.beginPath(),
              e.ellipse(0, -7 * t, 5.5 * t, 1.8 * t, 0, 0, Math.PI * 2),
              e.fill(),
              (e.strokeStyle = p),
              (e.lineWidth = 2 * t),
              e.beginPath(),
              e.arc(-7 * t, -4 * t, 2.2 * t, Math.PI / 2, -Math.PI / 2, !1),
              e.stroke(),
              e.beginPath(),
              e.arc(7 * t, -4 * t, 2.2 * t, -Math.PI / 2, Math.PI / 2, !1),
              e.stroke(),
              g ||
                ((e.fillStyle = "rgba(255, 255, 255, 0.35)"),
                e.beginPath(),
                e.ellipse(
                  -3 * t,
                  -2.5 * t,
                  2.5 * t,
                  1.2 * t,
                  -0.2,
                  0,
                  Math.PI * 2,
                ),
                e.fill()))
            : o === "tijolo"
              ? ((e.fillStyle = S),
                e.beginPath(),
                e.moveTo(-6 * t, 2 * t),
                e.lineTo(4 * t, 3.5 * t),
                e.lineTo(7 * t, 1 * t),
                e.lineTo(-3 * t, -0.5 * t),
                e.closePath(),
                e.fill(),
                (e.fillStyle = p),
                e.beginPath(),
                e.moveTo(-6 * t, -4 * t),
                e.lineTo(4 * t, -2.5 * t),
                e.lineTo(7 * t, -5 * t),
                e.lineTo(-3 * t, -6.5 * t),
                e.closePath(),
                e.fill(),
                (e.fillStyle = T),
                e.beginPath(),
                e.moveTo(-6 * t, -4 * t),
                e.lineTo(4 * t, -2.5 * t),
                e.lineTo(4 * t, 3.5 * t),
                e.lineTo(-6 * t, 2 * t),
                e.closePath(),
                e.fill())
              : ((e.fillStyle = S),
                e.beginPath(),
                e.ellipse(0, 1 * t, 7 * t, 4.2 * t, 0, 0, Math.PI * 2),
                e.fill(),
                (e.fillStyle = T),
                e.beginPath(),
                e.ellipse(0, -2.5 * t, 7 * t, 6 * t, 0, 0, Math.PI * 2),
                e.fill(),
                (e.fillStyle = p),
                e.beginPath(),
                e.ellipse(0, -8 * t, 5 * t, 2 * t, 0, 0, Math.PI * 2),
                e.fill(),
                (e.fillStyle = S),
                e.beginPath(),
                e.ellipse(0, -8 * t, 3.8 * t, 1.4 * t, 0, 0, Math.PI * 2),
                e.fill(),
                (e.strokeStyle = S),
                (e.lineWidth = 0.9 * t),
                e.beginPath(),
                e.ellipse(0, -2 * t, 6.4 * t, 2.4 * t, 0, 0.2, Math.PI - 0.2),
                e.stroke(),
                g ||
                  ((e.fillStyle = "rgba(255, 255, 255, 0.4)"),
                  e.beginPath(),
                  e.ellipse(
                    -2.2 * t,
                    -3.5 * t,
                    1.5 * t,
                    2.5 * t,
                    -0.25,
                    0,
                    Math.PI * 2,
                  ),
                  e.fill()));
    const j = -18 * t + Math.sin(l * 2.5) * 1.5;
    if (g) {
      const P = 44 * t,
        A = 13 * t,
        x = Math.sin(l * 4) * 0.15 + 0.85;
      ((e.fillStyle = "rgba(6, 78, 59, 0.9)"),
        e.beginPath(),
        e.roundRect(-P / 2, j - A / 2, P, A, 5 * t),
        e.fill(),
        (e.strokeStyle = `rgba(52, 211, 153, ${x})`),
        (e.lineWidth = 1.2 * t),
        e.stroke(),
        (e.fillStyle = "#6ee7b7"),
        (e.font = `bold ${Math.max(9, Math.round(7.5 * t))}px sans-serif`),
        (e.textAlign = "center"),
        (e.textBaseline = "middle"),
        e.fillText("✨ Pronto [F]", 0, j));
      for (let M = 0; M < 3; M++) {
        const $ = l * 2.5 + (M * Math.PI * 2) / 3,
          z = Math.cos($) * (9 * t),
          K = Math.sin($) * (5 * t) - 3 * t;
        ((e.fillStyle = "#fde047"),
          e.beginPath(),
          e.arc(z, K, 1.2 * t, 0, Math.PI * 2),
          e.fill());
      }
    }
    e.restore();
  }
  function Pg(e, t, l, o = !0, u) {
    (e.save(),
      (e.fillStyle = "rgba(15, 23, 42, 0.45)"),
      e.beginPath(),
      e.ellipse(0, 4 * t, 15 * t, 7 * t, 0, 0, Math.PI * 2),
      e.fill());
    const m = 2 * t;
    for (let f = 0; f < Math.PI * 2; f += Math.PI / 5) {
      const g = Math.cos(f) * 11.5 * t,
        y = Math.sin(f) * 5.2 * t + m;
      ((e.fillStyle = "#292524"),
        e.beginPath(),
        e.arc(g, y + 0.8 * t, 3.8 * t, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#57534e"),
        e.beginPath(),
        e.arc(g, y, 3.2 * t, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#78716c"),
        e.beginPath(),
        e.arc(g - 0.7 * t, y - 0.7 * t, 2 * t, 0, Math.PI * 2),
        e.fill());
    }
    const c = e.createRadialGradient(-3 * t, -6 * t, 2 * t, 0, -3 * t, 14 * t);
    if (
      (c.addColorStop(0, "#ea580c"),
      c.addColorStop(0.4, "#c2410c"),
      c.addColorStop(0.85, "#9a3412"),
      c.addColorStop(1, "#431407"),
      (e.fillStyle = c),
      e.beginPath(),
      e.moveTo(-11 * t, 3 * t),
      e.quadraticCurveTo(-12 * t, -10 * t, 0, -13 * t),
      e.quadraticCurveTo(12 * t, -10 * t, 11 * t, 3 * t),
      e.quadraticCurveTo(0, 5 * t, -11 * t, 3 * t),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "rgba(67, 20, 7, 0.4)"),
      (e.lineWidth = 1.2 * t),
      e.beginPath(),
      e.ellipse(0, -4 * t, 9 * t, 3.5 * t, 0, 0, Math.PI),
      e.stroke(),
      (e.fillStyle = "#7c2d12"),
      e.beginPath(),
      e.rect(-2.8 * t, -17.5 * t, 5.6 * t, 6 * t),
      e.fill(),
      (e.strokeStyle = "#431407"),
      (e.lineWidth = 1 * t),
      e.stroke(),
      (e.fillStyle = "#9a3412"),
      e.beginPath(),
      e.ellipse(0, -17.5 * t, 3.6 * t, 1.4 * t, 0, 0, Math.PI * 2),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#1c1917"),
      e.beginPath(),
      e.ellipse(0, -17.5 * t, 2.4 * t, 0.9 * t, 0, 0, Math.PI * 2),
      e.fill(),
      o)
    )
      for (let f = 0; f < 3; f++) {
        const g = (l * 1.8 + f * 1.2) % 3,
          y = -18 * t - g * 6 * t,
          w = Math.sin(l * 2 + f) * 2 * t + g * 1.5 * t,
          v = (1.8 + g * 1.5) * t,
          T = Math.max(0, 0.35 - (g / 3) * 0.35);
        ((e.fillStyle = `rgba(214, 211, 209, ${T})`),
          e.beginPath(),
          e.arc(w, y, v, 0, Math.PI * 2),
          e.fill());
      }
    if (
      ((e.strokeStyle = "#7c2d12"),
      (e.lineWidth = 2 * t),
      e.beginPath(),
      e.moveTo(-5.5 * t, 3 * t),
      e.quadraticCurveTo(-5.5 * t, -5 * t, 0, -5.5 * t),
      e.quadraticCurveTo(5.5 * t, -5 * t, 5.5 * t, 3 * t),
      e.stroke(),
      (e.fillStyle = "#1c1917"),
      e.beginPath(),
      e.moveTo(-4.5 * t, 3 * t),
      e.quadraticCurveTo(-4.5 * t, -4.5 * t, 0, -4.8 * t),
      e.quadraticCurveTo(4.5 * t, -4.5 * t, 4.5 * t, 3 * t),
      e.closePath(),
      e.fill(),
      o)
    ) {
      const f = Math.sin(l * 8) * 0.15,
        g = e.createRadialGradient(0, 1 * t, 1 * t, 0, 0, 6 * t);
      (g.addColorStop(0, `rgba(254, 240, 138, ${0.9 + f})`),
        g.addColorStop(0.3, `rgba(249, 115, 22, ${0.85 + f})`),
        g.addColorStop(0.7, "rgba(220, 38, 38, 0.7)"),
        g.addColorStop(1, "rgba(0, 0, 0, 0)"),
        (e.fillStyle = g),
        e.beginPath(),
        e.ellipse(0, 1 * t, 4.2 * t, 3.2 * t, 0, 0, Math.PI * 2),
        e.fill());
      const y = (3.5 + Math.sin(l * 12) * 1.2) * t,
        w = (2.2 + Math.cos(l * 10) * 0.6) * t;
      ((e.fillStyle = "#fef08a"),
        e.beginPath(),
        e.moveTo(-w * 0.6, 2 * t),
        e.quadraticCurveTo(-w * 0.3, -y * 0.4, 0, -y),
        e.quadraticCurveTo(w * 0.3, -y * 0.4, w * 0.6, 2 * t),
        e.closePath(),
        e.fill());
      const v = e.createRadialGradient(0, 3.5 * t, 1 * t, 0, 4.5 * t, 9 * t);
      (v.addColorStop(0, "rgba(251, 146, 60, 0.35)"),
        v.addColorStop(1, "rgba(251, 146, 60, 0)"),
        (e.fillStyle = v),
        e.beginPath(),
        e.ellipse(0, 4.5 * t, 9 * t, 3.5 * t, 0, 0, Math.PI * 2),
        e.fill());
    }
    if (u && u.fishItem) {
      const f = Date.now() - u.startTime,
        g = Math.min(1, f / u.durationMs);
      ((e.strokeStyle = "#18181b"),
        (e.lineWidth = 1.4 * t),
        e.beginPath(),
        e.moveTo(-4 * t, 1.8 * t),
        e.lineTo(4 * t, 1.8 * t),
        e.stroke(),
        e.save(),
        e.translate(0, 1 * t));
      const y = g >= 1 ? "#78350f" : "#ea580c";
      if (
        ((e.fillStyle = y),
        e.beginPath(),
        e.ellipse(0, 0, 3.5 * t, 1.3 * t, 0, 0, Math.PI * 2),
        e.fill(),
        o)
      ) {
        const S = (l * 3) % 2;
        ((e.fillStyle = "rgba(255, 255, 255, 0.5)"),
          e.beginPath(),
          e.arc(
            Math.sin(l * 4) * 1.5 * t,
            -2 * t - S * 3 * t,
            1 * t,
            0,
            Math.PI * 2,
          ),
          e.fill());
      }
      e.restore();
      const w = 28 * t,
        v = 4 * t,
        T = -24 * t;
      if (
        ((e.fillStyle = "rgba(0, 0, 0, 0.85)"),
        e.beginPath(),
        e.roundRect(-w / 2 - 2 * t, T - 2 * t, w + 4 * t, v + 4 * t, 3 * t),
        e.fill(),
        (e.strokeStyle = g >= 1 ? "#22c55e" : "#f59e0b"),
        (e.lineWidth = 1 * t),
        e.stroke(),
        (e.fillStyle = g >= 1 ? "#22c55e" : "#f59e0b"),
        e.beginPath(),
        e.roundRect(-w / 2, T, w * g, v, 2 * t),
        e.fill(),
        (e.font = `bold ${Math.max(8, Math.round(7.5 * t))}px monospace`),
        (e.textAlign = "center"),
        (e.textBaseline = "bottom"),
        g >= 1)
      )
        ((e.fillStyle = "#4ade80"),
          e.fillText("🐟 [F] Coletar Assado!", 0, T - 3 * t));
      else {
        const S = Math.max(0, Math.ceil((u.durationMs - f) / 1e3));
        ((e.fillStyle = "#fef08a"),
          e.fillText(`🔥 Assando (${S}s)`, 0, T - 3 * t));
      }
    }
    e.restore();
  }
  function drawCliffWall25D(e, t, l = 1, o = 0.5, u = 0, neighbors = null) {
    e.save();
    // nL, nR, nT, nB = true quando o tile vizinho faz parte do platô elevado (seja outro paredão ou o chão interno de MOUNTAIN_25D)
    // Assim, o lado interno NUNCA tem queda/parede nem sombra: o topo do paredão se funde 100% no mesmo nível do interior!
    const nL = !!(neighbors && neighbors.left),
      nR = !!(neighbors && neighbors.right),
      nT = !!(neighbors && neighbors.top),
      nB = !!(neighbors && neighbors.bottom),
      nTL = !!(neighbors && neighbors.topLeft),
      nTR = !!(neighbors && neighbors.topRight),
      nBL = !!(neighbors && neighbors.bottomLeft),
      nBR = !!(neighbors && neighbors.bottomRight);

    const halfTile = 18 * t,
      // Sangria de 1.5px para dentro de qualquer lado conectado ao platô/paredão para zero frestas
      leftX = nL ? -halfTile - 1.5 * t : -halfTile + 0.5 * t,
      rightX = nR ? halfTile + 1.5 * t : halfTile - 0.5 * t,
      fullW = rightX - leftX,
      // Paredão 4x maior na face externa (112px de altura monumental 2.5D)!
      hWall = 112 * t,
      baseY = 18 * t + (nB ? 0 : 94 * t),
      topY = 18 * t - 18 * t,
      platBackY = -halfTile - 1.5 * t,
      platFrontY = halfTile + 1.5 * t;

    // Chanfros apenas nas quinas externas livres (que dão para fora do bioma)
    const bevelL = nL || nT ? 0 : 6 * t,
      bevelR = nR || nT ? 0 : 6 * t;

    // 1. Sombra de Base externa gigante (APENAS quando o sul é fora do bioma: !nB)
    if (!nB) {
      e.fillStyle = "rgba(2, 6, 23, 0.52)";
      e.beginPath();
      if (nL && nR) {
        e.fillRect(leftX, baseY - 4 * t, fullW, 22 * t);
      } else {
        e.roundRect(
          leftX,
          baseY - 4 * t,
          fullW,
          24 * t,
          [0, 0, nR ? 0 : 10 * t, nL ? 0 : 10 * t],
        );
        e.fill();
      }
    }

    // 2. Face Vertical Rochosa Exposta 4x MAIOR (APENAS onde há queda para fora do bioma!)
    // O topo do paredão fica em platFrontY (18*t), conectado com o interior do bioma,
    // e a parede colossal desce 4x (até baseY = 112*t) para fora do bioma!
    if (!nB) {
      const faceTopY = platFrontY - 2 * t;
      const faceBottomY = baseY;
      const wallGrad = e.createLinearGradient(0, faceTopY, 0, faceBottomY);
      wallGrad.addColorStop(0, "#475569");
      wallGrad.addColorStop(0.3, "#334155");
      wallGrad.addColorStop(0.7, "#1e293b");
      wallGrad.addColorStop(1, "#0f172a");

      e.fillStyle = wallGrad;
      e.beginPath();
      e.moveTo(leftX, faceBottomY);
      e.lineTo(leftX, faceTopY + bevelL);
      e.lineTo(leftX + bevelL, faceTopY);
      e.lineTo(rightX - bevelR, faceTopY);
      e.lineTo(rightX, faceTopY + bevelR);
      e.lineTo(rightX, faceBottomY);
      e.closePath();
      e.fill();

      // Pontes diagonais externas (4x maiores para acompanhar a parede colossal)
      if (!nL && nTL) {
        e.fillStyle = wallGrad;
        e.fillRect(-halfTile - 18 * t, faceTopY - 18 * t, 22 * t, 64 * t);
      }
      if (!nR && nTR) {
        e.fillStyle = wallGrad;
        e.fillRect(halfTile - 4 * t, faceTopY - 18 * t, 22 * t, 64 * t);
      }
      if (!nL && nBL) {
        e.fillStyle = wallGrad;
        e.fillRect(-halfTile - 18 * t, faceTopY + 12 * t, 22 * t, 80 * t);
      }
      if (!nR && nBR) {
        e.fillStyle = wallGrad;
        e.fillRect(halfTile - 4 * t, faceTopY + 12 * t, 22 * t, 80 * t);
      }

      // 5 faixas de estratos geológicos e fendas ao longo da altura 4x da parede
      const faceH = faceBottomY - faceTopY;
      e.strokeStyle = "rgba(15, 23, 42, 0.58)";
      e.lineWidth = 1.8 * t;
      e.beginPath();
      for (let i = 1; i <= 4; i++) {
        const sy = faceTopY + faceH * (i * 0.2);
        e.moveTo(leftX + (nL ? 0 : 1.5 * t), sy);
        e.lineTo(-5 * t, sy + (i % 2 === 0 ? -2.2 : 2.2) * t);
        e.lineTo(6 * t, sy + (i % 2 === 0 ? 1.8 : -1.8) * t);
        e.lineTo(rightX - (nR ? 0 : 1.5 * t), sy);
      }

      const vx = (o - 0.5) * 12 * t;
      e.moveTo(vx, faceTopY + 3 * t);
      e.lineTo(vx - 3.5 * t, faceTopY + faceH * 0.33);
      e.lineTo(vx + 2.5 * t, faceTopY + faceH * 0.66);
      e.lineTo(vx - 1.5 * t, faceBottomY - 4 * t);
      e.stroke();

      e.fillStyle = "rgba(148, 163, 184, 0.24)";
      e.fillRect(leftX + 2 * t, faceTopY + faceH * 0.2 - 3 * t, fullW * 0.45, 2.8 * t);
      e.fillRect(1 * t, faceTopY + faceH * 0.6 - 3 * t, fullW * 0.4, 2.5 * t);

      // Rodapé escuro na base externa sul
      e.fillStyle = "rgba(9, 13, 22, 0.65)";
      e.fillRect(leftX, faceBottomY - 6 * t, fullW, 6 * t);
    }

    // 3. Platô Superior 2.5D Contínuo — EXATAMENTE na mesma cor (#64748b) e nível do chão interno de MOUNTAIN_25D!
    // Assim, o topo do paredão é a continuação direta e nivelada do terreno interno do bioma!
    e.fillStyle = "#64748b";
    e.fillRect(leftX, platBackY, fullW, platFrontY - platBackY);

    // Textura idêntica à do chão interno do platô para fusão visual perfeita
    e.fillStyle = "rgba(30, 41, 59, 0.26)";
    const platMidY = (platBackY + platFrontY) * 0.5;
    e.fillRect(leftX + 4 * t, platMidY - 1.5 * t, fullW - 8 * t, 2 * t);
    e.fillStyle = "rgba(241, 245, 249, 0.22)";
    e.fillRect(leftX + 5 * t, platMidY - 2.7 * t, fullW - 10 * t, 1.2 * t);

    // 4. Bordas / Escarpas 4x maiores nas laterais que dão para FORA do bioma (Norte, Oeste, Leste, Sul)
    if (!nT) {
      const northCliffH = 24 * t;
      const nGrad = e.createLinearGradient(0, platBackY - northCliffH, 0, platBackY + 3 * t);
      nGrad.addColorStop(0, "#0f172a");
      nGrad.addColorStop(0.7, "#334155");
      nGrad.addColorStop(1, "#475569");
      e.fillStyle = nGrad;
      e.fillRect(leftX, platBackY - northCliffH, fullW, northCliffH + 2 * t);
      e.strokeStyle = "#e2e8f0";
      e.lineWidth = 2.4 * t;
      e.beginPath();
      e.moveTo(leftX, platBackY + 1 * t);
      e.lineTo(rightX, platBackY + 1 * t);
      e.stroke();
    }

    if (!nL) {
      const westCliffW = 24 * t;
      const wGrad = e.createLinearGradient(leftX - westCliffW, 0, leftX + 3 * t, 0);
      wGrad.addColorStop(0, "#0f172a");
      wGrad.addColorStop(0.65, "#334155");
      wGrad.addColorStop(1, "#475569");
      e.fillStyle = wGrad;
      e.fillRect(leftX - westCliffW, platBackY, westCliffW + 2 * t, (nB ? platFrontY : baseY) - platBackY);
      e.strokeStyle = "#e2e8f0";
      e.lineWidth = 2.4 * t;
      e.beginPath();
      e.moveTo(leftX + 1 * t, platBackY);
      e.lineTo(leftX + 1 * t, platFrontY);
      e.stroke();
    }

    if (!nR) {
      const eastCliffW = 24 * t;
      const eGrad = e.createLinearGradient(rightX - 3 * t, 0, rightX + eastCliffW, 0);
      eGrad.addColorStop(0, "#475569");
      eGrad.addColorStop(0.35, "#1e293b");
      eGrad.addColorStop(1, "#0f172a");
      e.fillStyle = eGrad;
      e.fillRect(rightX - 2 * t, platBackY, eastCliffW + 2 * t, (nB ? platFrontY : baseY) - platBackY);
      e.strokeStyle = "#cbd5e1";
      e.lineWidth = 2.4 * t;
      e.beginPath();
      e.moveTo(rightX - 1 * t, platBackY);
      e.lineTo(rightX - 1 * t, platFrontY);
      e.stroke();
    }

    // Se o Sul é fora do bioma (!nB), desenha a crista iluminada frontal onde o platô encontra o topo da parede vertical sul
    if (!nB) {
      e.strokeStyle = "#e2e8f0";
      e.lineWidth = 2.8 * t;
      e.beginPath();
      e.moveTo(leftX, platFrontY - 1 * t);
      e.lineTo(rightX, platFrontY - 1 * t);
      e.stroke();
    }

    e.restore();
  }

  function drawCliffRamp25D(e, t, upperTier = 1, lowerTier = 0, rampDir = "up", neighbors = null) {
    e.save();
    const halfTile = 18 * t,
      floor = Math.max(1, Math.min(5, upperTier || 1)),
      hWall = (25 + floor * 3.5) * t,
      baseY = 18 * t,
      topY = baseY - hWall,
      nL = !!(neighbors && neighbors.leftWall),
      nR = !!(neighbors && neighbors.rightWall),
      nT = !!(neighbors && neighbors.topRamp),
      nB = !!(neighbors && neighbors.bottomRamp);

    // Cores do andar inferior (base da rampa) e do andar superior (topo da rampa)
    const getTierColor = (tr) =>
      tr >= 5
        ? "#e2e8f0"
        : tr === 4
          ? "#cbd5e1"
          : tr === 3
            ? "#94a3b8"
            : tr === 2
              ? "#64748b"
              : tr === 1
                ? "#475569"
                : "#57534e";
    const upperCol = getTierColor(floor);
    const lowerCol = getTierColor(lowerTier);

    // A rampa 2.5D começa no nível do chão do andar inferior (baseY) e sobe inclinada na altura 2.5D
    // até encontrar a altura exata do platô do andar superior (topY), conectando visualmente os dois andares!
    const rampTopY = nT ? -halfTile - 2 * t : topY + 2 * t;
    const rampBotY = baseY;
    const rampLeftX = -halfTile;
    const rampRightX = halfTile;
    const rampW = rampRightX - rampLeftX;
    const rampH = rampBotY - rampTopY;

    // 1. Paredes laterais de sustentação da rampa (conectando com o paredão ao lado)
    e.fillStyle = "#1e293b";
    e.beginPath();
    e.moveTo(rampLeftX, rampBotY);
    e.lineTo(rampLeftX, rampTopY);
    e.lineTo(rampRightX, rampTopY);
    e.lineTo(rampRightX, rampBotY);
    e.closePath();
    e.fill();

    // 2. Superfície inclinada da rampa (gradiente contínuo do andar inferior até a cor do andar superior no topo)
    const slopeGrad = e.createLinearGradient(0, rampTopY, 0, rampBotY);
    if (rampDir === "down") {
      slopeGrad.addColorStop(0, lowerCol);
      slopeGrad.addColorStop(0.5, "#64748b");
      slopeGrad.addColorStop(1, upperCol);
    } else {
      slopeGrad.addColorStop(0, upperCol);
      slopeGrad.addColorStop(0.55, "#64748b");
      slopeGrad.addColorStop(1, lowerCol);
    }
    e.fillStyle = slopeGrad;
    e.fillRect(rampLeftX + 2.5 * t, rampTopY, rampW - 5 * t, rampH);

    // 3. Degraus 3D esculpidos em perspectiva subindo do andar inferior até o topo do paredão
    const stepCount = 6;
    const stepH = rampH / stepCount;
    for (let i = 0; i < stepCount; i++) {
      const sy = rampBotY - (i + 1) * stepH;
      const stepProgress = (i + 1) / stepCount;
      // Face vertical do degrau (espelho do degrau)
      e.fillStyle = "rgba(15, 23, 42, 0.62)";
      e.fillRect(rampLeftX + 3 * t, sy + stepH * 0.52, rampW - 6 * t, stepH * 0.48);

      // Piso do degrau (mais claro conforme sobe para o andar superior)
      e.fillStyle =
        stepProgress > 0.65
          ? upperCol
          : stepProgress > 0.35
            ? "#94a3b8"
            : lowerCol;
      e.fillRect(rampLeftX + 3 * t, sy, rampW - 6 * t, stepH * 0.56);

      // Quina iluminada de cada degrau
      e.fillStyle = floor >= 4 ? "rgba(255, 255, 255, 0.7)" : "rgba(241, 245, 249, 0.5)";
      e.fillRect(rampLeftX + 3 * t, sy, rampW - 6 * t, 1.3 * t);
    }

    // 4. Parapeitos / Muretas laterais em rampa que acompanham a inclinação do andar inferior ao superior
    // Mureta esquerda
    const curbGradL = e.createLinearGradient(0, rampTopY, 0, rampBotY);
    curbGradL.addColorStop(0, upperCol);
    curbGradL.addColorStop(1, "#334155");
    e.fillStyle = curbGradL;
    e.fillRect(rampLeftX, rampTopY, 3.8 * t, rampH);
    e.strokeStyle = "#e2e8f0";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    e.moveTo(rampLeftX + 3.6 * t, rampTopY);
    e.lineTo(rampLeftX + 3.6 * t, rampBotY);
    e.stroke();

    // Mureta direita
    e.fillStyle = curbGradL;
    e.fillRect(rampRightX - 3.8 * t, rampTopY, 3.8 * t, rampH);
    e.strokeStyle = "#0f172a";
    e.lineWidth = 1.2 * t;
    e.beginPath();
    e.moveTo(rampRightX - 3.6 * t, rampTopY);
    e.lineTo(rampRightX - 3.6 * t, rampBotY);
    e.stroke();

    // 5. Patamar de chegada no topo (encaixe perfeito com o piso do andar superior)
    if (!nT) {
      e.fillStyle = upperCol;
      e.fillRect(rampLeftX + 2 * t, rampTopY - 3 * t, rampW - 4 * t, 5 * t);
      e.strokeStyle = floor >= 4 ? "#ffffff" : "#e2e8f0";
      e.lineWidth = 1.8 * t;
      e.beginPath();
      e.moveTo(rampLeftX + 2 * t, rampTopY + 1 * t);
      e.lineTo(rampRightX - 2 * t, rampTopY + 1 * t);
      e.stroke();
    }

    // 6. Soleira de entrada na base (encaixe com o andar inferior)
    if (!nB) {
      e.fillStyle = "rgba(15, 23, 42, 0.38)";
      e.fillRect(rampLeftX + 2 * t, rampBotY - 2 * t, rampW - 4 * t, 3.5 * t);
    }

    e.restore();
  }
