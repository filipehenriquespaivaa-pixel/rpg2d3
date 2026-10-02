/* js/engine/draw-personagem-e-efeitos.js
 * Desenho de personagens/criaturas animadas e efeitos (Ag, Eg, Ng...Ig).
 * Trecho de legacy/app.original.js (linhas 24031-26091); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  function Ag(e, t, l) {
    (e.save(), e.translate(t.x, t.y));
    const o = t.scale,
      u = t.lifetime < 4 ? Math.max(0.04, t.lifetime / 4) : 1;
    if (t.isSlime) {
      ((e.fillStyle = `rgba(15, 23, 42, ${0.35 * u})`),
        e.beginPath(),
        e.ellipse(0, 2.5 * o, 14 * o, 5.5 * o, 0, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = t.color),
        (e.globalAlpha = 0.85 * u),
        e.beginPath(),
        e.arc(-11 * o, 1.8 * o, 2.2 * o, 0, Math.PI * 2),
        e.arc(11 * o, 2.2 * o, 1.8 * o, 0, Math.PI * 2),
        e.arc(4.5 * o, -3.8 * o, 1.6 * o, 0, Math.PI * 2),
        e.arc(-6 * o, 4.2 * o, 1.4 * o, 0, Math.PI * 2),
        e.fill());
      const m = e.createRadialGradient(-2.5 * o, -1 * o, 1 * o, 0, 0, 13 * o);
      (m.addColorStop(0, t.accentColor || "#86efac"),
        m.addColorStop(0.65, t.color || "#22c55e"),
        m.addColorStop(1, "rgba(21, 128, 61, 0.92)"),
        (e.fillStyle = m),
        (e.globalAlpha = u),
        e.beginPath(),
        e.ellipse(0, 0.5 * o, 13.5 * o, 5.2 * o, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = `rgba(20, 83, 45, ${0.45 * u})`),
        (e.lineWidth = 1 * o),
        e.stroke(),
        (e.fillStyle = `rgba(255, 255, 255, ${0.55 * u})`),
        e.beginPath(),
        e.ellipse(-3.5 * o, -1.5 * o, 4.5 * o, 1.4 * o, -0.2, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = `rgba(2, 44, 34, ${u})`),
        (e.lineWidth = 1.6 * o),
        (e.lineCap = "round"));
      const c = -4.5 * o,
        f = -0.5 * o,
        g = 2.2 * o;
      (e.beginPath(),
        e.moveTo(c - g, f - g),
        e.lineTo(c + g, f + g),
        e.moveTo(c + g, f - g),
        e.lineTo(c - g, f + g),
        e.stroke());
      const y = 4.2 * o,
        w = -0.5 * o;
      (e.beginPath(),
        e.moveTo(y - g, w - g),
        e.lineTo(y + g, w + g),
        e.moveTo(y + g, w - g),
        e.lineTo(y - g, w + g),
        e.stroke());
      const v = Math.sin(l * 4.5) * 0.15 + 0.85;
      ((e.strokeStyle = t.accentColor || "#4ade80"),
        (e.lineWidth = 1.2),
        (e.globalAlpha = 0.45 * v * u),
        e.beginPath(),
        e.ellipse(0, 1 * o, 16 * o * v, 7.5 * o * v, 0, 0, Math.PI * 2),
        e.stroke(),
        (e.fillStyle = "#ffffff"),
        (e.globalAlpha = 0.85 * v * u),
        e.beginPath(),
        e.arc(8 * o, -6 * o - Math.sin(l * 5) * 2, 1.8, 0, Math.PI * 2),
        e.fill());
    } else {
      if (
        ((e.fillStyle = `rgba(15, 23, 42, ${0.35 * u})`),
        e.beginPath(),
        e.ellipse(0, 3 * o, 13 * o, 6 * o, 0, 0, Math.PI * 2),
        e.fill(),
        e.save(),
        (e.globalAlpha = 0.85 * u),
        creatureDraw(t.type, "carcass"))
      ) {
        creatureDraw(t.type, "carcass")(e, t, o, u);
      } else if (t.type === "spider") {
        ((e.fillStyle = t.color),
          e.beginPath(),
          e.ellipse(0, 0, 8 * o, 6.5 * o, 0, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = "#1e1b4b"),
          (e.lineWidth = 1.3 * o));
        for (const m of [-1, 1])
          for (let c = 0; c < 4; c++) {
            const f = -3 * o + c * 2 * o;
            (e.beginPath(),
              e.moveTo(m * 4 * o, f),
              e.lineTo(m * 8 * o, f - 3 * o),
              e.lineTo(m * 5 * o, f - 5 * o),
              e.stroke());
          }
        ((e.strokeStyle = `rgba(239, 68, 68, ${u})`),
          (e.lineWidth = 1.2 * o),
          e.beginPath(),
          e.moveTo(-2 * o, -1 * o),
          e.lineTo(0, 1 * o),
          e.moveTo(0, -1 * o),
          e.lineTo(-2 * o, 1 * o),
          e.moveTo(1 * o, -1 * o),
          e.lineTo(3 * o, 1 * o),
          e.moveTo(3 * o, -1 * o),
          e.lineTo(1 * o, 1 * o),
          e.stroke());
      } else if (t.type === "scorpion") {
        const m = t.color || "#d97706",
          c = "#78350f",
          f = "#451a03";
        ((e.strokeStyle = c), (e.lineWidth = 1.2 * o), (e.lineCap = "round"));
        for (const g of [-1, 1])
          for (let y = 0; y < 4; y++) {
            const w = -4 * o + y * 2.6 * o;
            (e.beginPath(),
              e.moveTo(w, g * 2.2 * o),
              e.quadraticCurveTo(
                w + g * 3.5 * o,
                g * 4.5 * o,
                w + g * 1.5 * o,
                g * 6 * o,
              ),
              e.stroke());
          }
        ((e.fillStyle = m),
          e.beginPath(),
          e.ellipse(0, 0, 7.5 * o, 4.8 * o, 0, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = c),
          (e.lineWidth = 0.9 * o));
        for (let g = -4.5; g <= 4.5; g += 2.2)
          (e.beginPath(),
            e.moveTo(g * o, -3.5 * o),
            e.lineTo(g * o, 3.5 * o),
            e.stroke());
        for (const g of [-1, 1])
          ((e.fillStyle = "#b45309"),
            e.fillRect(4 * o, g * 2.5 * o, 4 * o, 2 * o),
            e.beginPath(),
            e.ellipse(
              8.5 * o,
              g * 4 * o,
              3 * o,
              2 * o,
              g * 0.4,
              0,
              Math.PI * 2,
            ),
            e.fill(),
            (e.strokeStyle = f),
            (e.lineWidth = 1.3 * o),
            e.beginPath(),
            e.moveTo(10.5 * o, g * 3.5 * o),
            e.lineTo(13 * o, g * 2.5 * o),
            e.moveTo(10.5 * o, g * 4.5 * o),
            e.lineTo(13 * o, g * 5.5 * o),
            e.stroke());
        ((e.strokeStyle = m),
          (e.lineWidth = 2.4 * o),
          (e.lineCap = "round"),
          e.beginPath(),
          e.moveTo(-7 * o, 0),
          e.quadraticCurveTo(-11 * o, 4 * o, -9 * o, 8 * o),
          e.stroke(),
          (e.fillStyle = t.accentColor || "#ef4444"),
          e.beginPath(),
          e.arc(-9 * o, 8 * o, 1.8 * o, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = f),
          (e.lineWidth = 1.2 * o),
          e.beginPath(),
          e.moveTo(-9 * o, 8 * o),
          e.lineTo(-7.5 * o, 10 * o),
          e.stroke(),
          (e.strokeStyle = `rgba(15, 23, 42, ${u})`),
          (e.lineWidth = 1.3 * o),
          e.beginPath(),
          e.moveTo(4 * o, -1.5 * o),
          e.lineTo(6 * o, 0.5 * o),
          e.moveTo(6 * o, -1.5 * o),
          e.lineTo(4 * o, 0.5 * o),
          e.stroke());
      } else if (t.type === "dragon") {
        const m = t.color || "#dc2626";
        ((e.fillStyle = m),
          e.beginPath(),
          e.ellipse(0, 2 * o, 16 * o, 8 * o, 0, 0, Math.PI * 2),
          e.fill(),
          e.beginPath(),
          e.ellipse(13 * o, -1 * o, 8 * o, 5.5 * o, 0.1, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = "#ea580c"),
          (e.lineWidth = 2.4 * o),
          e.beginPath(),
          e.moveTo(11 * o, -3 * o),
          e.quadraticCurveTo(8 * o, -11 * o, 3 * o, -13 * o),
          e.stroke(),
          (e.fillStyle = "#991b1b"),
          e.beginPath(),
          e.moveTo(-4 * o, 0),
          e.lineTo(-12 * o, -10 * o),
          e.lineTo(-7 * o, -4 * o),
          e.lineTo(-2 * o, 3 * o),
          e.closePath(),
          e.fill(),
          (e.fillStyle = "#7f1d1d"));
        for (let c = -10; c <= 6; c += 4)
          (e.beginPath(),
            e.moveTo((c - 1.5) * o, -4 * o),
            e.lineTo(c * o, -7.5 * o),
            e.lineTo((c + 1.5) * o, -4 * o),
            e.closePath(),
            e.fill());
        ((e.strokeStyle = "#fbbf24"),
          (e.lineWidth = 1.6 * o),
          e.beginPath(),
          e.moveTo(13 * o, -3 * o),
          e.lineTo(16 * o, 0),
          e.moveTo(16 * o, -3 * o),
          e.lineTo(13 * o, 0),
          e.stroke());
      } else
        t.type === "bat"
          ? ((e.fillStyle = t.color),
            e.beginPath(),
            e.ellipse(0, 0, 4.5 * o, 7 * o, 0, 0, Math.PI * 2),
            e.fill(),
            (e.fillStyle = "#0f172a"),
            e.beginPath(),
            e.moveTo(-3 * o, -2 * o),
            e.lineTo(-9 * o, 2 * o),
            e.lineTo(-3 * o, 5 * o),
            e.closePath(),
            e.fill(),
            e.beginPath(),
            e.moveTo(3 * o, -2 * o),
            e.lineTo(9 * o, 2 * o),
            e.lineTo(3 * o, 5 * o),
            e.closePath(),
            e.fill(),
            (e.strokeStyle = `rgba(239, 68, 68, ${u})`),
            (e.lineWidth = 1.2 * o),
            e.beginPath(),
            e.moveTo(-1.5 * o, -3.5 * o),
            e.lineTo(1.5 * o, -1.5 * o),
            e.moveTo(1.5 * o, -3.5 * o),
            e.lineTo(-1.5 * o, -1.5 * o),
            e.stroke())
          : ((e.fillStyle = "#1e293b"),
            e.fillRect(-7 * o, -3 * o, 6 * o, 6 * o),
            e.fillRect(1 * o, -4 * o, 7 * o, 5 * o),
            e.fillRect(-2 * o, 1 * o, 5 * o, 4 * o),
            (e.strokeStyle = `rgba(249, 115, 22, ${0.4 * u})`),
            (e.lineWidth = 1.2 * o),
            e.strokeRect(-7 * o, -3 * o, 6 * o, 6 * o),
            e.strokeRect(1 * o, -4 * o, 7 * o, 5 * o));
      e.restore();
    }
    e.restore();
  }
  function Eg(e, t) {
    (e.save(), e.translate(t.x, t.y));
    const l = t.hitFlashTimer > 0,
      o = t.scale;
    if (
      ((window.__rpgQuality?.beings ?? 1) >= 0.75 &&
        ((e.fillStyle = "rgba(15, 23, 42, 0.4)"),
        e.beginPath(),
        e.ellipse(0, 3 * o, 10 * o, 5 * o, 0, 0, Math.PI * 2),
        e.fill()),
      l && ((e.fillStyle = "#ffffff"), (e.strokeStyle = "#ef4444")),
      t.type === "slime")
    ) {
      const u = !!t.attached,
        m = !!t.isLeaping,
        c = !!t.emerging,
        f = c ? Math.max(0.1, Math.min(1, 1 - (t.emergeTimer || 0) / 0.55)) : 1;
      if (c)
        ((e.fillStyle = "#78350f"),
          e.beginPath(),
          e.ellipse(
            0,
            3 * o,
            11 * o * (1.1 - f * 0.2),
            4.5 * o * (1.1 - f * 0.2),
            0,
            0,
            Math.PI * 2,
          ),
          e.fill());
      else if (!u && t.inWater) {
        const A = (t.animTimer * 2.6) % Math.PI;
        ((e.strokeStyle = "rgba(56, 189, 248, 0.45)"),
          (e.lineWidth = 1.3 * o),
          e.beginPath(),
          e.ellipse(
            0,
            3 * o,
            (13 + Math.sin(A) * 3) * o,
            (6 + Math.sin(A) * 1.5) * o,
            0,
            0,
            Math.PI * 2,
          ),
          e.stroke());
      }
      const g = 2.4;
      let y = 0,
        w = 1,
        v = 1;
      if (u) {
        const A = Math.sin(t.animTimer * 8) * 0.1;
        ((w = 0.78 + A), (v = 1.28 - A), (y = 0));
      } else if (m) {
        const A = Math.min(1, Math.max(0, t.leapProgress || 0));
        ((y = Math.sin(A * Math.PI) * 16 * o), (w = 1.42), (v = 0.74));
      } else if (c) ((w = f), (v = 0.5 + f * 0.5), (y = 0));
      else {
        const A = (t.animTimer * g) % Math.PI,
          x = Math.sin(A),
          M = x > 0.28;
        if (((y = M ? (x - 0.28) * 5.5 * o : 0), M)) {
          const z = (x - 0.28) / 0.72;
          ((w = 1 + z * 0.38), (v = 1 - z * 0.22));
        } else {
          const z = (0.28 - x) / 0.28;
          ((w = 1 - z * 0.35), (v = 1 + z * 0.42));
        }
        const $ = Math.sin(t.animTimer * 6.2) * 0.05;
        ((v += $), (w -= $ * 0.8));
      }
      (u ||
        ((e.fillStyle = "rgba(15, 23, 42, 0.32)"),
        e.beginPath(),
        e.ellipse(
          0,
          3 * o,
          11 * v * o * (y > 2 ? 0.82 : 1),
          5 * v * o * (y > 2 ? 0.75 : 1),
          0,
          0,
          Math.PI * 2,
        ),
        e.fill()),
        e.save(),
        e.translate(0, -y));
      const T = u
        ? 0
        : Math.max(-0.22, Math.min(0.22, (t.vx / (t.speed || 1)) * 0.16));
      e.rotate(T);
      const S = 11.5 * o * v,
        p = 13.5 * o * w,
        j = 0,
        P = -p;
      if (
        (e.beginPath(),
        e.moveTo(0, j),
        e.bezierCurveTo(S * 0.65, j + 1.2 * o, S, j - 0.6 * o, S, j - p * 0.32),
        e.bezierCurveTo(S * 0.98, j - p * 0.75, S * 0.45, P, 0, P),
        e.bezierCurveTo(
          -S * 0.45,
          P,
          -S * 0.98,
          j - p * 0.75,
          -S,
          j - p * 0.32,
        ),
        e.bezierCurveTo(-S, j - 0.6 * o, -S * 0.65, j + 1.2 * o, 0, j),
        e.closePath(),
        l)
      )
        ((e.fillStyle = "#ffffff"), e.fill());
      else {
        const A = e.createRadialGradient(
          -S * 0.25,
          P + p * 0.38,
          2 * o,
          0,
          P + p * 0.55,
          S * 1.15,
        );
        (A.addColorStop(0, t.accentColor),
          A.addColorStop(0.55, t.color),
          A.addColorStop(1, t.color),
          e.save(),
          (e.globalAlpha = 0.88),
          (e.fillStyle = A),
          e.fill(),
          e.restore(),
          e.save(),
          (e.globalAlpha = 0.32),
          (e.strokeStyle = t.accentColor),
          (e.lineWidth = 1.3 * o),
          e.stroke(),
          e.restore());
        const x = Math.sin(t.animTimer * g - 0.4) * 1.2 * o;
        (e.save(),
          (e.globalAlpha = 0.45),
          (e.fillStyle = t.color),
          e.beginPath(),
          e.ellipse(0, P + p * 0.58 + x, S * 0.48, p * 0.36, 0, 0, Math.PI * 2),
          e.fill(),
          e.restore(),
          e.save(),
          (e.fillStyle = "rgba(255, 255, 255, 0.42)"),
          e.beginPath(),
          e.arc(-S * 0.32, P + p * 0.68 + x * 0.8, 1.3 * o, 0, Math.PI * 2),
          e.fill(),
          e.beginPath(),
          e.arc(S * 0.35, P + p * 0.46 - x * 0.5, 0.9 * o, 0, Math.PI * 2),
          e.fill(),
          e.restore(),
          e.save(),
          (e.fillStyle = "rgba(255, 255, 255, 0.65)"),
          e.beginPath(),
          e.ellipse(
            -S * 0.32,
            P + p * 0.25,
            S * 0.35,
            p * 0.15,
            -0.32,
            0,
            Math.PI * 2,
          ),
          e.fill(),
          (e.fillStyle = "rgba(255, 255, 255, 0.85)"),
          e.beginPath(),
          e.arc(-S * 0.42, P + p * 0.2, 1.1 * o, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = "rgba(255, 255, 255, 0.22)"),
          e.beginPath(),
          e.ellipse(
            S * 0.28,
            j - p * 0.22,
            S * 0.28,
            p * 0.1,
            0.25,
            0,
            Math.PI * 2,
          ),
          e.fill(),
          e.restore());
        let M = 0,
          $ = 0;
        t.facing === "right"
          ? (M = 1.6 * o)
          : t.facing === "left"
            ? (M = -1.6 * o)
            : t.facing === "down"
              ? ($ = 1.2 * o)
              : t.facing === "up" && ($ = -1.5 * o);
        const z = P + p * 0.54 + $,
          K = t.facing === "up" ? 3.4 * o : 4.2 * o;
        if (
          ((e.fillStyle = "#090d16"),
          e.beginPath(),
          e.arc(-K / 2 + M, z, 1.8 * o, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = "#ffffff"),
          e.beginPath(),
          e.arc(-K / 2 + M - 0.5 * o, z - 0.5 * o, 0.65 * o, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = "#090d16"),
          e.beginPath(),
          e.arc(K / 2 + M, z, 1.8 * o, 0, Math.PI * 2),
          e.fill(),
          (e.fillStyle = "#ffffff"),
          e.beginPath(),
          e.arc(K / 2 + M - 0.5 * o, z - 0.5 * o, 0.65 * o, 0, Math.PI * 2),
          e.fill(),
          u)
        ) {
          const V = (t.animTimer * 3.2) % 1;
          ((e.fillStyle = "#4ade80"),
            e.beginPath(),
            e.arc(0, j + V * 8 * o, 1.4 * o, 0, Math.PI * 2),
            e.fill());
        }
      }
      e.restore();
    } else if (t.type === "scorpion") xg(e, t, o, l);
    else if (t.type === "bat") {
      const u = Math.sin(t.animTimer * 5) * 6;
      ((e.fillStyle = l ? "#ffffff" : t.color),
        e.beginPath(),
        e.ellipse(0, -12 * o, 5 * o, 7 * o, 0, 0, Math.PI * 2),
        e.fill(),
        e.beginPath(),
        e.moveTo(-4 * o, -12 * o),
        e.lineTo(-14 * o, -14 * o + u),
        e.lineTo(-8 * o, -6 * o + u),
        e.closePath(),
        e.fill(),
        e.beginPath(),
        e.moveTo(4 * o, -12 * o),
        e.lineTo(14 * o, -14 * o + u),
        e.lineTo(8 * o, -6 * o + u),
        e.closePath(),
        e.fill(),
        (e.fillStyle = "#ef4444"),
        e.fillRect(-2 * o, -13 * o, 1.5 * o, 1.5 * o),
        e.fillRect(1 * o, -13 * o, 1.5 * o, 1.5 * o));
    } else if (t.type === "spider") {
      e.fillStyle = l ? "#ffffff" : t.color;
      let u = 0,
        m = -5 * o,
        c = 0,
        f = -7 * o;
      (t.facing === "right"
        ? ((u = 6 * o), (m = -5 * o), (c = -2 * o), (f = -7 * o))
        : t.facing === "left"
          ? ((u = -6 * o), (m = -5 * o), (c = 2 * o), (f = -7 * o))
          : t.facing === "down"
            ? ((u = 0), (m = -2 * o), (c = 0), (f = -9 * o))
            : ((u = 0), (m = -11 * o), (c = 0), (f = -4 * o)),
        e.beginPath(),
        e.ellipse(c, f, 7 * o, 6 * o, 0, 0, Math.PI * 2),
        e.fill(),
        e.beginPath(),
        e.ellipse(u, m, 4 * o, 3.5 * o, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = l ? "#ffffff" : t.color),
        (e.lineWidth = 1.4 * o));
      for (let g = -2; g <= 2; g++) {
        if (g === 0) continue;
        const y = Math.sin(t.animTimer * 4 + g) * 3;
        (e.beginPath(),
          e.moveTo(0, -6 * o),
          e.lineTo(g * 4 * o, -10 * o + y),
          e.lineTo(g * 7 * o, 0 * o + y),
          e.stroke());
      }
      if (((e.fillStyle = t.accentColor), t.facing === "down"))
        (e.fillRect(-2 * o, m + 1 * o, 1.5 * o, 1.5 * o),
          e.fillRect(1 * o, m + 1 * o, 1.5 * o, 1.5 * o));
      else if (t.facing === "up")
        (e.fillRect(-2 * o, m - 2 * o, 1.5 * o, 1.5 * o),
          e.fillRect(1 * o, m - 2 * o, 1.5 * o, 1.5 * o));
      else {
        const g = t.facing === "right" ? 7 * o : -7 * o;
        (e.fillRect(g, -6 * o, 1.5 * o, 1.5 * o),
          e.fillRect(g, -4 * o, 1.5 * o, 1.5 * o));
      }
    } else if (t.type === "golem")
      ((e.fillStyle = l ? "#ffffff" : t.color),
        e.fillRect(-8 * o, -18 * o, 16 * o, 18 * o),
        (e.strokeStyle = t.accentColor),
        (e.lineWidth = 1.5 * o),
        e.beginPath(),
        e.moveTo(-5 * o, -14 * o),
        e.lineTo(2 * o, -10 * o),
        e.lineTo(-2 * o, -4 * o),
        e.stroke(),
        (e.fillStyle = "#fef08a"),
        e.fillRect(-5 * o, -16 * o, 3 * o, 2 * o),
        e.fillRect(2 * o, -16 * o, 3 * o, 2 * o));
    else if (creatureDraw(t.type, "body")) creatureDraw(t.type, "body")(e, t, o, l);
    else if (t.type === "dragon") jg(e, t, o, l);
    // Tipos sem desenho proprio caem no corpo do lobo (comportamento do codigo antigo)
    else CREATURES.wolf.draw.body(e, t, o, l);
    if (t.hp < t.maxHp && !t.attached) {
      const u = 24 * o,
        m = 3 * o,
        c = Math.max(0, t.hp / t.maxHp);
      ((e.fillStyle = "rgba(0, 0, 0, 0.7)"),
        e.fillRect(-u / 2 - 1, -25 * o - 1, u + 2, m + 2),
        (e.fillStyle = c > 0.4 ? "#22c55e" : "#ef4444"),
        e.fillRect(-u / 2, -25 * o, u * c, m));
    }
    e.restore();
  }
  function jg(e, t, l, o) {
    e.save();
    const u = t.facing === "left" ? -1 : 1;
    e.scale(u, 1);
    const m = o ? "#ffffff" : t.color || "#dc2626",
      c = o ? "#fca5a5" : "#ea580c",
      f = Math.sin(t.animTimer * 5) * 8 * l;
    ((e.fillStyle = "rgba(15, 23, 42, 0.45)"),
      e.beginPath(),
      e.ellipse(0, 5 * l, 16 * l, 6 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = m),
      (e.lineWidth = 4 * l),
      e.beginPath(),
      e.moveTo(-10 * l, -2 * l),
      e.quadraticCurveTo(
        -18 * l,
        -4 * l,
        -22 * l + Math.sin(t.animTimer * 3) * 3 * l,
        2 * l,
      ),
      e.stroke(),
      (e.fillStyle = "#991b1b"),
      e.fillRect(-7 * l, 0, 4 * l, 7 * l),
      e.fillRect(4 * l, 0, 4 * l, 7 * l),
      (e.fillStyle = m),
      e.beginPath(),
      e.ellipse(0, -3 * l, 13 * l, 8 * l, 0.05, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = c),
      e.beginPath(),
      e.ellipse(2 * l, -1 * l, 8 * l, 4.5 * l, 0.05, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#7f1d1d"),
      e.beginPath(),
      e.moveTo(-2 * l, -8 * l),
      e.lineTo(-14 * l, -22 * l + f),
      e.lineTo(-6 * l, -14 * l + f * 0.5),
      e.lineTo(2 * l, -20 * l + f),
      e.lineTo(1 * l, -7 * l),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#f59e0b"),
      (e.lineWidth = 1.6 * l),
      e.beginPath(),
      e.moveTo(-2 * l, -8 * l),
      e.lineTo(-14 * l, -22 * l + f),
      e.moveTo(-2 * l, -8 * l),
      e.lineTo(2 * l, -20 * l + f),
      e.stroke(),
      (e.fillStyle = "#f59e0b"));
    for (let y = -8; y <= 6; y += 3.5)
      (e.beginPath(),
        e.moveTo((y - 1.2) * l, -11 * l),
        e.lineTo(y * l, -15 * l),
        e.lineTo((y + 1.2) * l, -11 * l),
        e.closePath(),
        e.fill());
    ((e.fillStyle = m),
      e.beginPath(),
      e.moveTo(8 * l, -6 * l),
      e.lineTo(14 * l, -14 * l),
      e.lineTo(21 * l, -13 * l),
      e.lineTo(12 * l, -2 * l),
      e.closePath(),
      e.fill(),
      e.beginPath(),
      e.ellipse(17 * l, -13 * l, 7 * l, 4.5 * l, 0.1, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = "#ea580c"),
      (e.lineWidth = 2.4 * l),
      e.beginPath(),
      e.moveTo(14 * l, -15 * l),
      e.quadraticCurveTo(11 * l, -22 * l, 6 * l, -23 * l),
      e.stroke(),
      (e.fillStyle = o ? "#ffffff" : "#fbbf24"),
      e.beginPath(),
      e.arc(17.5 * l, -14.5 * l, 1.6 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.ellipse(17.8 * l, -14.5 * l, 0.6 * l, 1.4 * l, 0, 0, Math.PI * 2),
      e.fill());
    const g = (t.animTimer * 4) % Math.PI;
    ((e.fillStyle = "rgba(251, 191, 36, 0.45)"),
      e.beginPath(),
      e.arc(
        23 * l + g * 3 * l,
        -12 * l - g * 2 * l,
        (1.2 + g * 1.2) * l,
        0,
        Math.PI * 2,
      ),
      e.fill(),
      e.restore());
  }
  function xg(e, t, l, o) {
    t.facing === "down"
      ? Dg(e, t, l, o)
      : t.facing === "up"
        ? Ig(e, t, l, o)
        : t.facing === "left"
          ? Ju(e, t, l, o, -1)
          : Ju(e, t, l, o, 1);
  }
  function Ju(e, t, l, o, u) {
    (e.save(), e.scale(u, 1));
    const c = t.vx * t.vx + t.vy * t.vy > 0.04,
      f = c ? t.animTimer * 12 : t.animTimer * 2.5,
      g = c ? Math.sin(f * 2) * 0.8 * l : Math.sin(t.animTimer * 2) * 0.4 * l,
      y = o ? "#ffffff" : t.color || "#d97706",
      w = o ? "#e2e8f0" : "#78350f",
      v = o ? "#cbd5e1" : "#451a03",
      T = o ? "#ffffff" : "#fef08a",
      S = o ? "#fee2e2" : "#b45309",
      p = o ? "#ffffff" : t.accentColor || "#ef4444";
    ((e.fillStyle = "rgba(15, 23, 42, 0.42)"),
      e.beginPath(),
      e.ellipse(0, 2 * l, 12 * l, 6.5 * l, 0, 0, Math.PI * 2),
      e.fill(),
      e.beginPath(),
      e.ellipse(11 * l, 2.5 * l, 5 * l, 2.6 * l, 0.2, 0, Math.PI * 2),
      e.ellipse(8 * l, -3.2 * l, 4.2 * l, 2.2 * l, -0.25, 0, Math.PI * 2),
      e.fill());
    for (let Ne = 0; Ne < 4; Ne++) {
      const X = f + Ne * 1.5,
        C = c
          ? Math.sin(X) * 2.8 * l
          : Math.sin(t.animTimer * 2 + Ne) * 0.6 * l,
        I = c ? Math.max(0, -Math.cos(X)) * 2.2 * l : 0,
        be = -5 * l + Ne * 3.4 * l,
        Me = -5 * l + g;
      ((e.strokeStyle = w),
        (e.lineWidth = 1.3 * l),
        (e.lineCap = "round"),
        (e.lineJoin = "round"),
        e.beginPath(),
        e.moveTo(be, Me));
      const Te = be - 2 * l + C * 0.7,
        Fe = Me - 6.5 * l - I;
      e.lineTo(Te, Fe);
      const _e = Te - 3.5 * l + C,
        xe = Me - 3 * l;
      (e.lineTo(_e, xe),
        e.stroke(),
        (e.strokeStyle = v),
        (e.lineWidth = 0.9 * l),
        e.beginPath(),
        e.moveTo(_e, xe),
        e.lineTo(_e - 1.2 * l, xe + 1 * l),
        e.stroke());
    }
    const j = Math.sin(t.animTimer * 2.8) * 1.8 * l,
      P = -7 * l,
      A = -5 * l + g,
      x = P - 3.2 * l,
      M = A - 2.8 * l,
      $ = P - 5.8 * l,
      z = A - 7.5 * l,
      K = P - 4.8 * l + j * 0.3,
      V = A - 13 * l,
      O = P - 1.2 * l + j * 0.6,
      _ = A - 17 * l,
      se = P + 3.8 * l + j,
      ue = A - 18.2 * l,
      N = [
        { x1: P, y1: A, x2: x, y2: M, width: 3.8 * l },
        { x1: x, y1: M, x2: $, y2: z, width: 3.4 * l },
        { x1: $, y1: z, x2: K, y2: V, width: 3 * l },
        { x1: K, y1: V, x2: O, y2: _, width: 2.6 * l },
        { x1: O, y1: _, x2: se, y2: ue, width: 2.3 * l },
      ];
    for (let Ne = 0; Ne < N.length; Ne++) {
      const X = N[Ne];
      ((e.fillStyle = v),
        e.beginPath(),
        e.arc(X.x1, X.y1, X.width * 0.52, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = y),
        (e.lineWidth = X.width),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(X.x1, X.y1),
        e.lineTo(X.x2, X.y2),
        e.stroke(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.beginPath(),
        e.moveTo(X.x1, X.y1),
        e.lineTo(X.x2, X.y2),
        e.stroke(),
        !o &&
          Ne >= 2 &&
          ((e.strokeStyle = T),
          (e.lineWidth = 0.7 * l),
          e.beginPath(),
          e.moveTo(X.x1 + 0.3 * l, X.y1 - 0.7 * l),
          e.lineTo(X.x2 + 0.3 * l, X.y2 - 0.7 * l),
          e.stroke()));
    }
    const Ee = se + 2.8 * l,
      ne = ue + 0.5 * l;
    if (
      ((e.fillStyle = p),
      e.beginPath(),
      e.ellipse(Ee, ne, 2.8 * l, 2.2 * l, 0.3, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = y),
      e.beginPath(),
      e.ellipse(
        Ee - 0.8 * l,
        ne + 0.3 * l,
        2 * l,
        1.8 * l,
        0.3,
        0,
        Math.PI * 2,
      ),
      e.fill(),
      (e.strokeStyle = v),
      (e.lineWidth = 1.4 * l),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(Ee + 1.8 * l, ne),
      e.quadraticCurveTo(
        Ee + 4.6 * l,
        ne + 1.2 * l,
        Ee + 3.8 * l,
        ne + 4.2 * l,
      ),
      e.stroke(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.arc(Ee + 3.8 * l, ne + 4.2 * l, 0.7 * l, 0, Math.PI * 2),
      e.fill(),
      !o)
    ) {
      const Ne = Math.sin(t.animTimer * 4) * 0.3 + 0.7;
      ((e.fillStyle = p),
        (e.shadowColor = p),
        (e.shadowBlur = 6 * l * Ne),
        e.beginPath(),
        e.arc(Ee + 3.8 * l, ne + 4.4 * l, 1.2 * l * Ne, 0, Math.PI * 2),
        e.fill(),
        (e.shadowBlur = 0));
      const X = (t.animTimer * 1.6) % 1;
      X < 0.45 &&
        ((e.fillStyle = p),
        e.beginPath(),
        e.arc(
          Ee + 3.8 * l,
          ne + 4.4 * l + X * 7 * l,
          0.8 * l * (1 - X),
          0,
          Math.PI * 2,
        ),
        e.fill());
    }
    const ke = 0,
      G = -4.5 * l + g;
    ((e.fillStyle = y),
      e.beginPath(),
      e.ellipse(ke, G, 7.8 * l, 5 * l, 0, 0, Math.PI * 2),
      e.fill());
    const de = 6;
    for (let Ne = 0; Ne < de; Ne++) {
      const X = -6.2 * l + Ne * 2.3 * l,
        C = 2.4 * l,
        I = (4.8 - Math.abs(Ne - 2.5) * 0.4) * l;
      ((e.fillStyle = Ne % 2 === 0 ? y : w),
        e.beginPath(),
        e.roundRect(X - C / 2, G - I / 2, C, I, 1.2 * l),
        e.fill(),
        (e.strokeStyle = v),
        (e.lineWidth = 0.8 * l),
        e.beginPath(),
        e.moveTo(X + C / 2, G - I / 2),
        e.lineTo(X + C / 2, G + I / 2),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(X, G, 0.8 * l, 0.5 * l, 0, 0, Math.PI * 2),
          e.fill()));
    }
    ((e.strokeStyle = w),
      (e.lineWidth = 1 * l),
      e.beginPath(),
      e.ellipse(ke, G, 7.8 * l, 5 * l, 0, 0, Math.PI * 2),
      e.stroke());
    const W = 6.2 * l,
      le = -4.5 * l + g;
    ((e.fillStyle = y),
      e.beginPath(),
      e.moveTo(W - 2.5 * l, le - 4.2 * l),
      e.lineTo(W + 3.2 * l, le - 3.2 * l),
      e.lineTo(W + 4.2 * l, le - 1.2 * l),
      e.lineTo(W + 3.8 * l, le),
      e.lineTo(W + 4.2 * l, le + 1.2 * l),
      e.lineTo(W + 3.2 * l, le + 3.2 * l),
      e.lineTo(W - 2.5 * l, le + 4.2 * l),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = w),
      (e.lineWidth = 1.1 * l),
      e.stroke());
    const te = Math.sin(t.animTimer * 6) * 0.4 * l;
    ((e.fillStyle = v),
      e.beginPath(),
      e.moveTo(W + 3.8 * l, le - 1.2 * l),
      e.lineTo(W + 5.5 * l, le - 1.8 * l + te),
      e.lineTo(W + 4.8 * l, le - 0.4 * l),
      e.closePath(),
      e.fill(),
      e.beginPath(),
      e.moveTo(W + 3.8 * l, le + 1.2 * l),
      e.lineTo(W + 5.5 * l, le + 1.8 * l - te),
      e.lineTo(W + 4.8 * l, le + 0.4 * l),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#090d16"),
      e.beginPath(),
      e.arc(W + 1.2 * l, le - 0.9 * l, 1 * l, 0, Math.PI * 2),
      e.arc(W + 1.2 * l, le + 0.9 * l, 1 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(W + 1.4 * l, le - 1.1 * l, 0.4 * l, 0, Math.PI * 2),
      e.arc(W + 1.4 * l, le + 0.7 * l, 0.4 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = p));
    for (const Ne of [-2.6 * l, -2.1 * l, 2.1 * l, 2.6 * l])
      (e.beginPath(),
        e.arc(W + 2.5 * l, le + Ne, 0.5 * l, 0, Math.PI * 2),
        e.fill());
    for (let Ne = 0; Ne < 4; Ne++) {
      const X = f + Ne * 1.5 + Math.PI,
        C = c
          ? Math.sin(X) * 3 * l
          : Math.sin(t.animTimer * 2 + Ne + 2) * 0.6 * l,
        I = c ? Math.max(0, -Math.cos(X)) * 2.4 * l : 0,
        be = -5 * l + Ne * 3.4 * l,
        Me = -4 * l + g;
      ((e.strokeStyle = y),
        (e.lineWidth = 1.4 * l),
        (e.lineCap = "round"),
        (e.lineJoin = "round"),
        e.beginPath(),
        e.moveTo(be, Me));
      const Te = be - 1.5 * l + C * 0.7,
        Fe = Me + 5.5 * l - I;
      e.lineTo(Te, Fe);
      const _e = Te - 2.5 * l + C,
        xe = Me + 9.5 * l;
      (e.lineTo(_e, xe),
        e.stroke(),
        (e.fillStyle = w),
        e.beginPath(),
        e.arc(Te, Fe, 1.1 * l, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = v),
        (e.lineWidth = 1 * l),
        e.beginPath(),
        e.moveTo(_e, xe),
        e.lineTo(_e - 1.2 * l, xe + 1.2 * l),
        e.stroke());
    }
    const oe = Math.sin(t.animTimer * 4) * 0.35 + 0.35;
    (e0(e, l, W, le, 1, oe, y, w, v, T, S, o),
      e0(e, l, W, le, -1, oe, y, w, v, T, S, o),
      e.restore());
  }
  function e0(e, t, l, o, u, m, c, f, g, y, w, v) {
    const T = u === 1 ? 0.35 : -0.35,
      S = l + 1.5 * t,
      p = o + u * 2.2 * t,
      j = S + 4.5 * t,
      P = p + u * 4.5 * t;
    ((e.strokeStyle = c),
      (e.lineWidth = 2.4 * t),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(S, p),
      e.lineTo(j, P),
      e.stroke(),
      (e.fillStyle = f),
      e.beginPath(),
      e.arc(j, P, 1.8 * t, 0, Math.PI * 2),
      e.fill());
    const A = j + 5.5 * t,
      x = P + u * 1.5 * t;
    ((e.strokeStyle = c),
      (e.lineWidth = 2.8 * t),
      e.beginPath(),
      e.moveTo(j, P),
      e.lineTo(A, x),
      e.stroke(),
      e.save(),
      e.translate(A, x),
      e.rotate(T),
      (e.fillStyle = w),
      e.beginPath(),
      e.ellipse(3.2 * t, 0, 3.8 * t, 2.5 * t, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = f),
      (e.lineWidth = 1 * t),
      e.stroke(),
      v ||
        ((e.fillStyle = y),
        e.beginPath(),
        e.ellipse(2.5 * t, -0.8 * t, 2 * t, 0.7 * t, 0.15, 0, Math.PI * 2),
        e.fill()),
      (e.fillStyle = f),
      e.beginPath(),
      e.moveTo(5.8 * t, -1.2 * t),
      e.quadraticCurveTo(9.5 * t, -2.5 * t, 11.5 * t, 0.2 * t),
      e.quadraticCurveTo(8.5 * t, -0.5 * t, 5.8 * t, 0.5 * t),
      e.closePath(),
      e.fill());
    const M = u === 1 ? -m : m;
    (e.save(),
      e.translate(5.5 * t, 1 * t),
      e.rotate(M),
      (e.fillStyle = g),
      e.beginPath(),
      e.moveTo(0, 0),
      e.quadraticCurveTo(3.5 * t, 2.2 * t, 6 * t, 0.2 * t),
      e.quadraticCurveTo(3 * t, 0.6 * t, 0, -1 * t),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = y),
      (e.lineWidth = 0.8 * t));
    for (let $ = 1; $ <= 3; $++)
      (e.beginPath(),
        e.moveTo($ * 1.3 * t, 0),
        e.lineTo($ * 1.3 * t, 0.7 * t),
        e.stroke());
    (e.restore(), e.restore());
  }
  function Dg(e, t, l, o) {
    e.save();
    const m = t.vx * t.vx + t.vy * t.vy > 0.04,
      c = m ? t.animTimer * 12 : t.animTimer * 2.5,
      f = m ? Math.sin(c * 2) * 0.8 * l : Math.sin(t.animTimer * 2) * 0.4 * l,
      g = Math.max(-0.2, Math.min(0.2, (t.vx / (t.speed || 1)) * 0.18));
    e.rotate(g);
    const y = o ? "#ffffff" : t.color || "#d97706",
      w = o ? "#e2e8f0" : "#78350f",
      v = o ? "#cbd5e1" : "#451a03",
      T = o ? "#ffffff" : "#fef08a",
      S = o ? "#fee2e2" : "#b45309",
      p = o ? "#ffffff" : t.accentColor || "#ef4444";
    ((e.fillStyle = "rgba(15, 23, 42, 0.42)"),
      e.beginPath(),
      e.ellipse(0, 3 * l, 10 * l, 13 * l, 0, 0, Math.PI * 2),
      e.ellipse(-10 * l, 8 * l, 5 * l, 2.8 * l, -0.3, 0, Math.PI * 2),
      e.ellipse(10 * l, 8 * l, 5 * l, 2.8 * l, 0.3, 0, Math.PI * 2),
      e.fill());
    for (const te of [-1, 1])
      for (let oe = 0; oe < 4; oe++) {
        const Ne = c + oe * 1.5 + (te === 1 ? Math.PI : 0),
          X = m
            ? Math.sin(Ne) * 2.8 * l
            : Math.sin(t.animTimer * 2 + oe) * 0.5 * l,
          C = m ? Math.max(0, -Math.cos(Ne)) * 2.2 * l : 0,
          I = te * 4.2 * l,
          be = -5 * l + oe * 2.4 * l + f,
          Me = te * (9.5 * l + Math.abs(X) * 0.3),
          Te = be - 3.2 * l - C + (oe - 1.5) * 1.2 * l,
          Fe = te * 13.5 * l,
          _e = be + 3 * l + X;
        ((e.strokeStyle = te === -1 ? y : w),
          (e.lineWidth = 1.3 * l),
          (e.lineCap = "round"),
          (e.lineJoin = "round"),
          e.beginPath(),
          e.moveTo(I, be),
          e.lineTo(Me, Te),
          e.lineTo(Fe, _e),
          e.stroke(),
          (e.fillStyle = w),
          e.beginPath(),
          e.arc(Me, Te, 1 * l, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = v),
          (e.lineWidth = 0.9 * l),
          e.beginPath(),
          e.moveTo(Fe, _e),
          e.lineTo(Fe + te * 1.2 * l, _e + 1.2 * l),
          e.stroke());
      }
    const j = -2.5 * l + f;
    ((e.fillStyle = y),
      e.beginPath(),
      e.ellipse(0, j, 6.2 * l, 8.5 * l, 0, 0, Math.PI * 2),
      e.fill());
    const P = 6;
    for (let te = 0; te < P; te++) {
      const oe = j - 6 * l + te * 2.1 * l,
        Ne = (6 - Math.abs(te - 2.5) * 0.4) * 2 * l,
        X = 2.2 * l;
      ((e.fillStyle = te % 2 === 0 ? y : w),
        e.beginPath(),
        e.roundRect(-Ne / 2, oe - X / 2, Ne, X, 1.2 * l),
        e.fill(),
        (e.strokeStyle = v),
        (e.lineWidth = 0.8 * l),
        e.beginPath(),
        e.moveTo(-Ne / 2, oe + X / 2),
        e.lineTo(Ne / 2, oe + X / 2),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(0, oe, 0.7 * l, 0.5 * l, 0, 0, Math.PI * 2),
          e.fill()));
    }
    ((e.strokeStyle = w),
      (e.lineWidth = 1 * l),
      e.beginPath(),
      e.ellipse(0, j, 6.2 * l, 8.5 * l, 0, 0, Math.PI * 2),
      e.stroke());
    const A = 4.2 * l + f;
    ((e.fillStyle = y),
      e.beginPath(),
      e.moveTo(-4.5 * l, A - 3.5 * l),
      e.lineTo(4.5 * l, A - 3.5 * l),
      e.lineTo(3.4 * l, A + 2.5 * l),
      e.lineTo(1.8 * l, A + 3.8 * l),
      e.lineTo(-1.8 * l, A + 3.8 * l),
      e.lineTo(-3.4 * l, A + 2.5 * l),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = w),
      (e.lineWidth = 1.1 * l),
      e.stroke());
    const x = Math.sin(t.animTimer * 6) * 0.4 * l;
    ((e.fillStyle = v),
      e.beginPath(),
      e.moveTo(-1.8 * l, A + 3.2 * l),
      e.lineTo(-0.8 * l - x, A + 5.5 * l),
      e.lineTo(-0.2 * l, A + 3.8 * l),
      e.closePath(),
      e.fill(),
      e.beginPath(),
      e.moveTo(1.8 * l, A + 3.2 * l),
      e.lineTo(0.8 * l + x, A + 5.5 * l),
      e.lineTo(0.2 * l, A + 3.8 * l),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#090d16"),
      e.beginPath(),
      e.arc(-1.5 * l, A + 0.5 * l, 1.1 * l, 0, Math.PI * 2),
      e.arc(1.5 * l, A + 0.5 * l, 1.1 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(-1.3 * l, A + 0.3 * l, 0.45 * l, 0, Math.PI * 2),
      e.arc(1.7 * l, A + 0.3 * l, 0.45 * l, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = p),
      e.beginPath(),
      e.arc(-3 * l, A + 1.2 * l, 0.55 * l, 0, Math.PI * 2),
      e.arc(3 * l, A + 1.2 * l, 0.55 * l, 0, Math.PI * 2),
      e.fill());
    const M = Math.sin(t.animTimer * 4) * 0.35 + 0.35;
    for (const te of [-1, 1]) {
      const oe = te * 3.8 * l,
        Ne = A - 1.5 * l,
        X = te * 8.5 * l,
        C = A + 1.5 * l;
      ((e.strokeStyle = y),
        (e.lineWidth = 2.4 * l),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(oe, Ne),
        e.lineTo(X, C),
        e.stroke(),
        (e.fillStyle = w),
        e.beginPath(),
        e.arc(X, C, 1.7 * l, 0, Math.PI * 2),
        e.fill());
      const I = te * 9.8 * l,
        be = A + 6.5 * l;
      ((e.strokeStyle = y),
        (e.lineWidth = 2.8 * l),
        e.beginPath(),
        e.moveTo(X, C),
        e.lineTo(I, be),
        e.stroke(),
        e.save(),
        e.translate(I, be),
        e.rotate(te * 0.35),
        (e.fillStyle = S),
        e.beginPath(),
        e.ellipse(0, 3.2 * l, 2.5 * l, 3.8 * l, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(-te * 0.8 * l, 2.5 * l, 0.7 * l, 2 * l, 0, 0, Math.PI * 2),
          e.fill()),
        (e.fillStyle = w),
        e.beginPath(),
        e.moveTo(-te * 1.2 * l, 5.8 * l),
        e.quadraticCurveTo(-te * 2.2 * l, 9.5 * l, 0, 11.5 * l),
        e.quadraticCurveTo(-te * 0.5 * l, 8.5 * l, te * 0.5 * l, 5.8 * l),
        e.closePath(),
        e.fill());
      const Me = te * -M;
      (e.save(),
        e.translate(te * 1 * l, 5.5 * l),
        e.rotate(Me),
        (e.fillStyle = v),
        e.beginPath(),
        e.moveTo(0, 0),
        e.quadraticCurveTo(te * 2 * l, 3.5 * l, 0, 6 * l),
        e.quadraticCurveTo(te * 0.6 * l, 3 * l, -te * 0.8 * l, 0),
        e.closePath(),
        e.fill(),
        (e.strokeStyle = T),
        (e.lineWidth = 0.8 * l));
      for (let Te = 1; Te <= 3; Te++)
        (e.beginPath(),
          e.moveTo(0, Te * 1.3 * l),
          e.lineTo(te * 0.7 * l, Te * 1.3 * l),
          e.stroke());
      (e.restore(), e.restore());
    }
    const $ = Math.sin(t.animTimer * 2.8) * 2 * l,
      z = 0,
      K = j - 7.5 * l,
      V = z + $ * 0.2,
      O = K - 4.2 * l,
      _ = z + $ * 0.45,
      se = K - 8 * l,
      ue = z + $ * 0.7,
      N = K - 10.5 * l,
      Ee = z + $ * 0.85,
      ne = K - 7 * l,
      ke = z + $,
      G = K - 2.5 * l,
      de = [
        { x1: z, y1: K, x2: V, y2: O, w: 4 * l },
        { x1: V, y1: O, x2: _, y2: se, w: 3.6 * l },
        { x1: _, y1: se, x2: ue, y2: N, w: 3.2 * l },
        { x1: ue, y1: N, x2: Ee, y2: ne, w: 2.8 * l },
        { x1: Ee, y1: ne, x2: ke, y2: G, w: 2.4 * l },
      ];
    for (let te = 0; te < de.length; te++) {
      const oe = de[te];
      ((e.fillStyle = v),
        e.beginPath(),
        e.arc(oe.x1, oe.y1, oe.w * 0.52, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = y),
        (e.lineWidth = oe.w),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(oe.x1, oe.y1),
        e.lineTo(oe.x2, oe.y2),
        e.stroke(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.beginPath(),
        e.moveTo(oe.x1, oe.y1),
        e.lineTo(oe.x2, oe.y2),
        e.stroke(),
        !o &&
          te >= 2 &&
          ((e.strokeStyle = T),
          (e.lineWidth = 0.7 * l),
          e.beginPath(),
          e.moveTo(oe.x1 - 0.5 * l, oe.y1),
          e.lineTo(oe.x2 - 0.5 * l, oe.y2),
          e.stroke()));
    }
    const W = ke,
      le = G + 1.2 * l;
    if (
      ((e.fillStyle = p),
      e.beginPath(),
      e.ellipse(W, le, 2.5 * l, 2.8 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = y),
      e.beginPath(),
      e.ellipse(W, le - 0.8 * l, 2 * l, 1.8 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = v),
      (e.lineWidth = 1.4 * l),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(W, le + 2 * l),
      e.quadraticCurveTo(W + 1.5 * l, le + 4.5 * l, W, le + 6 * l),
      e.stroke(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.arc(W, le + 6 * l, 0.7 * l, 0, Math.PI * 2),
      e.fill(),
      !o)
    ) {
      const te = Math.sin(t.animTimer * 4) * 0.3 + 0.7;
      ((e.fillStyle = p),
        (e.shadowColor = p),
        (e.shadowBlur = 6 * l * te),
        e.beginPath(),
        e.arc(W, le + 6.2 * l, 1.2 * l * te, 0, Math.PI * 2),
        e.fill(),
        (e.shadowBlur = 0));
      const oe = (t.animTimer * 1.6) % 1;
      oe < 0.45 &&
        ((e.fillStyle = p),
        e.beginPath(),
        e.arc(W, le + 6.2 * l + oe * 7 * l, 0.8 * l * (1 - oe), 0, Math.PI * 2),
        e.fill());
    }
    e.restore();
  }
  function Ig(e, t, l, o) {
    e.save();
    const m = t.vx * t.vx + t.vy * t.vy > 0.04,
      c = m ? t.animTimer * 12 : t.animTimer * 2.5,
      f = m ? Math.sin(c * 2) * 0.8 * l : Math.sin(t.animTimer * 2) * 0.4 * l,
      g = Math.max(-0.2, Math.min(0.2, (t.vx / (t.speed || 1)) * 0.18));
    e.rotate(g);
    const y = o ? "#ffffff" : t.color || "#d97706",
      w = o ? "#e2e8f0" : "#78350f",
      v = o ? "#cbd5e1" : "#451a03",
      T = o ? "#ffffff" : "#fef08a",
      S = o ? "#fee2e2" : "#b45309",
      p = o ? "#ffffff" : t.accentColor || "#ef4444";
    ((e.fillStyle = "rgba(15, 23, 42, 0.42)"),
      e.beginPath(),
      e.ellipse(0, 1 * l, 10 * l, 13 * l, 0, 0, Math.PI * 2),
      e.ellipse(-10 * l, -8 * l, 5 * l, 2.8 * l, 0.3, 0, Math.PI * 2),
      e.ellipse(10 * l, -8 * l, 5 * l, 2.8 * l, -0.3, 0, Math.PI * 2),
      e.fill());
    for (const te of [-1, 1])
      for (let oe = 0; oe < 4; oe++) {
        const Ne = c + oe * 1.5 + (te === 1 ? Math.PI : 0),
          X = m
            ? Math.sin(Ne) * 2.8 * l
            : Math.sin(t.animTimer * 2 + oe) * 0.5 * l,
          C = m ? Math.max(0, -Math.cos(Ne)) * 2.2 * l : 0,
          I = te * 4.2 * l,
          be = 5 * l - oe * 2.4 * l + f,
          Me = te * (9.5 * l + Math.abs(X) * 0.3),
          Te = be - 3.2 * l - C - (oe - 1.5) * 1.2 * l,
          Fe = te * 13.5 * l,
          _e = be - 3 * l - X;
        ((e.strokeStyle = te === -1 ? y : w),
          (e.lineWidth = 1.3 * l),
          (e.lineCap = "round"),
          (e.lineJoin = "round"),
          e.beginPath(),
          e.moveTo(I, be),
          e.lineTo(Me, Te),
          e.lineTo(Fe, _e),
          e.stroke(),
          (e.fillStyle = w),
          e.beginPath(),
          e.arc(Me, Te, 1 * l, 0, Math.PI * 2),
          e.fill(),
          (e.strokeStyle = v),
          (e.lineWidth = 0.9 * l),
          e.beginPath(),
          e.moveTo(Fe, _e),
          e.lineTo(Fe + te * 1.2 * l, _e - 1.2 * l),
          e.stroke());
      }
    const j = 2.5 * l + f;
    ((e.fillStyle = y),
      e.beginPath(),
      e.ellipse(0, j, 6.2 * l, 8.5 * l, 0, 0, Math.PI * 2),
      e.fill());
    const P = 6;
    for (let te = 0; te < P; te++) {
      const oe = j + 6 * l - te * 2.1 * l,
        Ne = (6 - Math.abs(te - 2.5) * 0.4) * 2 * l,
        X = 2.2 * l;
      ((e.fillStyle = te % 2 === 0 ? y : w),
        e.beginPath(),
        e.roundRect(-Ne / 2, oe - X / 2, Ne, X, 1.2 * l),
        e.fill(),
        (e.strokeStyle = v),
        (e.lineWidth = 0.8 * l),
        e.beginPath(),
        e.moveTo(-Ne / 2, oe - X / 2),
        e.lineTo(Ne / 2, oe - X / 2),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(0, oe, 0.7 * l, 0.5 * l, 0, 0, Math.PI * 2),
          e.fill()));
    }
    ((e.strokeStyle = w),
      (e.lineWidth = 1 * l),
      e.beginPath(),
      e.ellipse(0, j, 6.2 * l, 8.5 * l, 0, 0, Math.PI * 2),
      e.stroke());
    const A = -4.2 * l + f;
    ((e.fillStyle = y),
      e.beginPath(),
      e.moveTo(-4.5 * l, A + 3.5 * l),
      e.lineTo(4.5 * l, A + 3.5 * l),
      e.lineTo(3.4 * l, A - 2.5 * l),
      e.lineTo(1.8 * l, A - 3.8 * l),
      e.lineTo(-1.8 * l, A - 3.8 * l),
      e.lineTo(-3.4 * l, A - 2.5 * l),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = w),
      (e.lineWidth = 1.1 * l),
      e.stroke());
    const x = Math.sin(t.animTimer * 6) * 0.4 * l;
    ((e.fillStyle = v),
      e.beginPath(),
      e.moveTo(-1.8 * l, A - 3.2 * l),
      e.lineTo(-0.8 * l - x, A - 5.5 * l),
      e.lineTo(-0.2 * l, A - 3.8 * l),
      e.closePath(),
      e.fill(),
      e.beginPath(),
      e.moveTo(1.8 * l, A - 3.2 * l),
      e.lineTo(0.8 * l + x, A - 5.5 * l),
      e.lineTo(0.2 * l, A - 3.8 * l),
      e.closePath(),
      e.fill());
    const M = Math.sin(t.animTimer * 4) * 0.35 + 0.35;
    for (const te of [-1, 1]) {
      const oe = te * 3.8 * l,
        Ne = A + 1.5 * l,
        X = te * 8.5 * l,
        C = A - 1.5 * l;
      ((e.strokeStyle = y),
        (e.lineWidth = 2.4 * l),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(oe, Ne),
        e.lineTo(X, C),
        e.stroke(),
        (e.fillStyle = w),
        e.beginPath(),
        e.arc(X, C, 1.7 * l, 0, Math.PI * 2),
        e.fill());
      const I = te * 9.8 * l,
        be = A - 6.5 * l;
      ((e.strokeStyle = y),
        (e.lineWidth = 2.8 * l),
        e.beginPath(),
        e.moveTo(X, C),
        e.lineTo(I, be),
        e.stroke(),
        e.save(),
        e.translate(I, be),
        e.rotate(-te * 0.35),
        (e.fillStyle = S),
        e.beginPath(),
        e.ellipse(0, -3.2 * l, 2.5 * l, 3.8 * l, 0, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.stroke(),
        o ||
          ((e.fillStyle = T),
          e.beginPath(),
          e.ellipse(-te * 0.8 * l, -2.5 * l, 0.7 * l, 2 * l, 0, 0, Math.PI * 2),
          e.fill()),
        (e.fillStyle = w),
        e.beginPath(),
        e.moveTo(-te * 1.2 * l, -5.8 * l),
        e.quadraticCurveTo(-te * 2.2 * l, -9.5 * l, 0, -11.5 * l),
        e.quadraticCurveTo(-te * 0.5 * l, -8.5 * l, te * 0.5 * l, -5.8 * l),
        e.closePath(),
        e.fill());
      const Me = te * M;
      (e.save(),
        e.translate(te * 1 * l, -5.5 * l),
        e.rotate(Me),
        (e.fillStyle = v),
        e.beginPath(),
        e.moveTo(0, 0),
        e.quadraticCurveTo(te * 2 * l, -3.5 * l, 0, -6 * l),
        e.quadraticCurveTo(te * 0.6 * l, -3 * l, -te * 0.8 * l, 0),
        e.closePath(),
        e.fill(),
        (e.strokeStyle = T),
        (e.lineWidth = 0.8 * l));
      for (let Te = 1; Te <= 3; Te++)
        (e.beginPath(),
          e.moveTo(0, -Te * 1.3 * l),
          e.lineTo(te * 0.7 * l, -Te * 1.3 * l),
          e.stroke());
      (e.restore(), e.restore());
    }
    const $ = Math.sin(t.animTimer * 2.8) * 2 * l,
      z = 0,
      K = j + 7.5 * l,
      V = z + $ * 0.2,
      O = K + 4.2 * l,
      _ = z + $ * 0.45,
      se = K + 8 * l,
      ue = z + $ * 0.7,
      N = K + 10.5 * l,
      Ee = z + $ * 0.85,
      ne = K + 7 * l,
      ke = z + $,
      G = K + 2.5 * l,
      de = [
        { x1: z, y1: K, x2: V, y2: O, w: 4 * l },
        { x1: V, y1: O, x2: _, y2: se, w: 3.6 * l },
        { x1: _, y1: se, x2: ue, y2: N, w: 3.2 * l },
        { x1: ue, y1: N, x2: Ee, y2: ne, w: 2.8 * l },
        { x1: Ee, y1: ne, x2: ke, y2: G, w: 2.4 * l },
      ];
    for (let te = 0; te < de.length; te++) {
      const oe = de[te];
      ((e.fillStyle = v),
        e.beginPath(),
        e.arc(oe.x1, oe.y1, oe.w * 0.52, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = y),
        (e.lineWidth = oe.w),
        (e.lineCap = "round"),
        e.beginPath(),
        e.moveTo(oe.x1, oe.y1),
        e.lineTo(oe.x2, oe.y2),
        e.stroke(),
        (e.strokeStyle = w),
        (e.lineWidth = 1 * l),
        e.beginPath(),
        e.moveTo(oe.x1, oe.y1),
        e.lineTo(oe.x2, oe.y2),
        e.stroke(),
        !o &&
          te >= 2 &&
          ((e.strokeStyle = T),
          (e.lineWidth = 0.7 * l),
          e.beginPath(),
          e.moveTo(oe.x1 - 0.5 * l, oe.y1),
          e.lineTo(oe.x2 - 0.5 * l, oe.y2),
          e.stroke()));
    }
    const W = ke,
      le = G - 1.2 * l;
    if (
      ((e.fillStyle = p),
      e.beginPath(),
      e.ellipse(W, le, 2.5 * l, 2.8 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = y),
      e.beginPath(),
      e.ellipse(W, le + 0.8 * l, 2 * l, 1.8 * l, 0, 0, Math.PI * 2),
      e.fill(),
      (e.strokeStyle = v),
      (e.lineWidth = 1.4 * l),
      (e.lineCap = "round"),
      e.beginPath(),
      e.moveTo(W, le - 2 * l),
      e.quadraticCurveTo(W + 1.5 * l, le - 4.5 * l, W, le - 6 * l),
      e.stroke(),
      (e.fillStyle = "#0f172a"),
      e.beginPath(),
      e.arc(W, le - 6 * l, 0.7 * l, 0, Math.PI * 2),
      e.fill(),
      !o)
    ) {
      const te = Math.sin(t.animTimer * 4) * 0.3 + 0.7;
      ((e.fillStyle = p),
        (e.shadowColor = p),
        (e.shadowBlur = 6 * l * te),
        e.beginPath(),
        e.arc(W, le - 6.2 * l, 1.2 * l * te, 0, Math.PI * 2),
        e.fill(),
        (e.shadowBlur = 0));
      const oe = (t.animTimer * 1.6) % 1;
      oe < 0.45 &&
        ((e.fillStyle = p),
        e.beginPath(),
        e.arc(W, le - 6.2 * l - oe * 7 * l, 0.8 * l * (1 - oe), 0, Math.PI * 2),
        e.fill());
    }
    e.restore();
  }
