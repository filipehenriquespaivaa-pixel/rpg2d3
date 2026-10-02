/* js/engine/draw-itens-e-armas.js
 * Icone de item no canvas (drawItemIcon) e armas/itens desenhados na mao (zg...rb).
 * Trecho de legacy/app.original.js (linhas 26360-27669); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  function drawItemIcon(e, t, l, o, u = 0, m = !0) {
    (e.save(), m && e.clearRect(0, 0, l, o));
    const c = l / 2,
      f = o / 2,
      g = (Math.min(l, o) / 22) * 0.95,
      y = (t.name || "").toLowerCase(),
      w = (t.id || "").toLowerCase(),
      v = (t.icon || "").toLowerCase(),
      T = (t.slot || "").toLowerCase(),
      S = t.color || "#f59e0b";
    if (isWhipItemX(t)) {
      (drawWhipIcon(e, c, f, g, u, S), e.restore());
      return;
    }
    if (w.includes("galho") || y.includes("galho") || v === "🪵") {
      (Xu.render(e, c, f, g * 1.05, u), e.restore());
      return;
    }
    if (y.includes("carne") || v === "meat" || w.includes("meat")) {
      (_b(e, c, f, g, S, t, u), e.restore());
      return;
    }
    if (y.includes("osso") || v === "bone" || w.includes("bone")) {
      (Pb(e, c, f, g, S, t, u), e.restore());
      return;
    }
    if (
      y.includes("pele") ||
      y.includes("couro") ||
      v === "pelt" ||
      w.includes("pelt") ||
      w.includes("leather")
    ) {
      (Ab(e, c, f, g, S, t, u), e.restore());
      return;
    }
    if (
      y.includes("entranha") ||
      y.includes("víscera") ||
      y.includes("viscera") ||
      v === "guts" ||
      w.includes("guts")
    ) {
      (Eb(e, c, f, g, S, t, u), e.restore());
      return;
    }
    if (
      y.includes("dente") ||
      y.includes("presa") ||
      v === "tooth" ||
      w.includes("tooth")
    ) {
      (Nb(e, c, f, g, S, t, u), e.restore());
      return;
    }
    if (
      y.includes("chifre") ||
      y.includes("galhada") ||
      v === "horn" ||
      w.includes("horn")
    ) {
      (Rb(e, c, f, g, S, t, u), e.restore());
      return;
    }
    if (y.includes("escama") || v === "scale" || w.includes("scale")) {
      (jb(e, c, f, g, u, S, t), e.restore());
      return;
    }
    if (y.includes("asa") || v === "wing" || w.includes("wing")) {
      (xb(e, c, f, g, S, t, u), e.restore());
      return;
    }
    if (
      y.includes("crânio") ||
      y.includes("cranio") ||
      v === "skull" ||
      w.includes("skull")
    ) {
      (Db(e, c, f, g, S, t, u), e.restore());
      return;
    }
    if (
      y.includes("pé de coelho") ||
      y.includes("pe de coelho") ||
      v === "rabbit_foot" ||
      w.includes("rabbit_foot")
    ) {
      (Ib(e, c, f, g, S, t, u), e.restore());
      return;
    }
    // 🧈 Gordura Animal: ícone próprio (bloco de banha cremosa), não quadrado genérico
    if (
      y.includes("gordura") ||
      y.includes("banha") ||
      y.includes("sebo") ||
      w.includes("gordura") ||
      w.includes("gord_animal") ||
      w.includes("fat_") ||
      v === "🧈"
    ) {
      e.save();
      e.translate(c, f);
      const gs = g * 4.2;
      // sombra
      e.fillStyle = "rgba(0,0,0,0.25)";
      e.beginPath();
      e.ellipse(0, gs * 0.75, gs * 1.05, gs * 0.32, 0, 0, Math.PI * 2);
      e.fill();
      // bloco principal de banha (paralelepípedo)
      const ggorda = e.createLinearGradient(-gs, -gs * 0.6, gs, gs * 0.6);
      ggorda.addColorStop(0, "#fefce8");
      ggorda.addColorStop(0.45, "#fef9c3");
      ggorda.addColorStop(0.8, "#fde68a");
      ggorda.addColorStop(1, "#eab308");
      e.fillStyle = ggorda;
      qRRect(e, -gs * 0.9, -gs * 0.45, gs * 1.8, gs * 1.05, gs * 0.28);
      e.fill();
      e.strokeStyle = "#ca8a04";
      e.lineWidth = Math.max(0.8, g * 0.18);
      e.stroke();
      // face superior mais clara (cremosa)
      e.fillStyle = "#fffbeb";
      qRRect(e, -gs * 0.72, -gs * 0.62, gs * 1.44, gs * 0.42, gs * 0.2);
      e.fill();
      e.strokeStyle = "rgba(202,138,4,0.5)";
      e.stroke();
      // brilho oleoso
      e.fillStyle = "rgba(255,255,255,0.75)";
      e.beginPath();
      e.ellipse(-gs * 0.3, -gs * 0.42, gs * 0.22, gs * 0.1, -0.5, 0, Math.PI * 2);
      e.fill();
      e.restore();
      return;
    }
    const p = lb(t);
    if (p) {
      (ib(e, c, f, g, u, p, t), e.restore());
      return;
    }
    const j = bb(t);
    if (j) {
      (yb(e, c, f, g, u, j, t), e.restore());
      return;
    }
    if (
      w.includes("pedreneira") ||
      w.includes("pederneira") ||
      y.includes("pederneira") ||
      y.includes("pedreneira") ||
      v === "🪨"
    ) {
      (Fu.render(e, c, f, g * 1.15, u), e.restore());
      return;
    }
    if (w.includes("seixo") || y.includes("seixo") || v === "⚪") {
      (Hu.render(e, c, f, g * 1.3, u), e.restore());
      return;
    }
    if (y.includes("lascada") || w.includes("lascada")) {
      (qg(e, c, f, g, u), e.restore());
      return;
    }
    if (y.includes("corda") || w.includes("corda")) {
      (mb(e, c, f, g, u, y, w), e.restore());
      return;
    }
    if (w.includes("fibra") || y.includes("fibra") || v === "🌾") {
      (Wu.render(e, c, f, g * 1.15, u), e.restore());
      return;
    }
    if (w.includes("resina") || y.includes("resina") || v === "🍯") {
      (Ku.render(e, c, f, g * 1.1, u), e.restore());
      return;
    }
    if (w.includes("argila") || y.includes("argila") || v === "🧱") {
      (Gu.render(e, c, f, g * 1.3, u), e.restore());
      return;
    }
    if (
      w.includes("caldeirao") ||
      y.includes("caldeirão") ||
      y.includes("caldeirao")
    ) {
      (gb(e, c, f, g, u), e.restore());
      return;
    }
    if (
      w.includes("pote") ||
      y.includes("pote") ||
      y.includes("cerâmica") ||
      y.includes("ceramica") ||
      v === "🏺"
    ) {
      (hb(e, c, f, g, u), e.restore());
      return;
    }
    if (w.includes("tijolo") || y.includes("tijolo")) {
      (pb(e, c, f, g), e.restore());
      return;
    }
    if (y.includes("tocha") || w.includes("torch") || v === "flame") {
      (zg(e, c, f, g, u), e.restore());
      return;
    }
    if (
      y.includes("maça") ||
      y.includes("maca") ||
      w.includes("mace") ||
      v === "mace"
    ) {
      (Og(e, c, f, g, u), e.restore());
      return;
    }
    if (y.includes("martelo") || w.includes("hammer") || v === "hammer") {
      (Bg(e, c, f, g), e.restore());
      return;
    }
    if (y.includes("lança") || y.includes("lanca") || w.includes("spear")) {
      (Vg(e, c, f, g, u), e.restore());
      return;
    }
    if (y.includes("machado") || w.includes("axe")) {
      (Ug(e, c, f, g, u), e.restore());
      return;
    }
    if (
      y.includes("faca") ||
      y.includes("adaga") ||
      y.includes("knife") ||
      y.includes("dagger") ||
      w.includes("knife") ||
      w.includes("faca") ||
      w.includes("adaga")
    ) {
      (Cb(e, c, f, g, u, S), e.restore());
      return;
    }
    if (
      y.includes("cajado") ||
      y.includes("bastão") ||
      y.includes("bastao") ||
      w.includes("staff") ||
      (T === "mao_direita" && v === "gem")
    ) {
      ($g(e, c, f, g, u, S), e.restore());
      return;
    }
    if (
      y.includes("espada") ||
      y.includes("lâmina") ||
      y.includes("lamina") ||
      v === "sword" ||
      T === "mao_direita"
    ) {
      (Lg(e, c, f, g, u, S), e.restore());
      return;
    }
    if (
      y.includes("escudo") ||
      v === "shield" ||
      (T === "mao_esquerda" && !y.includes("tocha"))
    ) {
      (Yg(e, c, f, g, u, S), e.restore());
      return;
    }
    if (
      T === "chapeu" ||
      v === "crown" ||
      y.includes("chapéu") ||
      y.includes("elmo") ||
      y.includes("capuz")
    ) {
      (Gg(e, c, f, g, S), e.restore());
      return;
    }
    if (
      T === "camisa" ||
      v === "shirt" ||
      y.includes("túnica") ||
      y.includes("camisa") ||
      y.includes("cota")
    ) {
      (Xg(e, c, f, g, S), e.restore());
      return;
    }
    if (
      T === "calca" ||
      v === "layers" ||
      y.includes("calça") ||
      y.includes("perneira")
    ) {
      (Fg(e, c, f, g, S), e.restore());
      return;
    }
    if (T === "botas" || v === "footprints" || y.includes("bota")) {
      (Hg(e, c, f, g), e.restore());
      return;
    }
    if (
      T === "capa" ||
      v === "wind" ||
      y.includes("capa") ||
      y.includes("manto")
    ) {
      (Wg(e, c, f, g, u, S), e.restore());
      return;
    }
    if (
      T === "pingente" ||
      (v === "gem" && y.includes("pingente")) ||
      y.includes("colar") ||
      y.includes("amuleto")
    ) {
      (Kg(e, c, f, g, u, S), e.restore());
      return;
    }
    if (
      T.includes("bracelete") ||
      v === "circledot" ||
      y.includes("bracelete") ||
      y.includes("braçadeira")
    ) {
      (Zg(e, c, f, g, S), e.restore());
      return;
    }
    if (
      T === "cinto" ||
      v === "slidershorizontal" ||
      y.includes("cinto") ||
      y.includes("faixa")
    ) {
      (Qg(e, c, f, g), e.restore());
      return;
    }
    if (
      T === "mochila" ||
      v === "briefcase" ||
      y.includes("mochila") ||
      y.includes("bolsa")
    ) {
      (Jg(e, c, f, g), e.restore());
      return;
    }
    if (y.includes("drusa") || y.includes("cristal") || (v === "gem" && !T)) {
      (eb(e, c, f, g, u, S), e.restore());
      return;
    }
    if (y.includes("pepita") || y.includes("minério") || v === "hammer") {
      (ab(e, c, f, g, S), e.restore());
      return;
    }
    if (y.includes("cogumelo") || y.includes("esporos") || v === "sparkles") {
      (tb(e, c, f, g, u, S), e.restore());
      return;
    }
    if (
      y.includes("poção") ||
      y.includes("elixir") ||
      (t.categoryType === "consumable" && !y.includes("peixe") && !y.includes("fish"))
    ) {
      (ob(e, c, f, g, u, S), e.restore());
      return;
    }
    (rb(e, c, f, g, u, S), e.restore());
  }
  function zg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l + 2 * o),
      e.rotate(-0.35),
      (e.fillStyle = "#5c3a21"),
      e.fillRect(-2 * o, -4 * o, 4 * o, 16 * o),
      (e.fillStyle = "#854d0e"),
      e.fillRect(-1.2 * o, -4 * o, 2.4 * o, 15 * o),
      (e.fillStyle = "#b45309"),
      e.fillRect(-2.5 * o, -3 * o, 5 * o, 3.5 * o),
      (e.strokeStyle = "#fef3c7"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.moveTo(-2.5 * o, -2 * o),
      e.lineTo(2.5 * o, -1 * o),
      e.moveTo(-2.5 * o, -0.5 * o),
      e.lineTo(2.5 * o, 0.5 * o),
      e.stroke());
    const m = Math.sin(u * 9) * 1.5 * o,
      c = 9 * o + Math.cos(u * 12) * 1.5 * o;
    ((e.fillStyle = "rgba(249, 115, 22, 0.9)"),
      e.beginPath(),
      e.moveTo(-3.5 * o, -4 * o),
      e.quadraticCurveTo(-4 * o + m * 0.5, -4 * o - c * 0.6, 0 + m, -4 * o - c),
      e.quadraticCurveTo(4 * o + m * 0.5, -4 * o - c * 0.6, 3.5 * o, -4 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#fef08a"),
      e.beginPath(),
      e.moveTo(-2 * o, -4 * o),
      e.quadraticCurveTo(
        -2 * o + m * 0.4,
        -4 * o - c * 0.5,
        0 + m * 0.7,
        -4 * o - c * 0.8,
      ),
      e.quadraticCurveTo(2 * o + m * 0.4, -4 * o - c * 0.5, 2 * o, -4 * o),
      e.closePath(),
      e.fill());
    const f = -4 * o - c - ((u * 15) % (7 * o));
    ((e.fillStyle = "#fde047"),
      e.beginPath(),
      e.arc(m * 0.8, f, 1.1 * o, 0, Math.PI * 2),
      e.fill(),
      e.restore());
  }
  function Lg(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      e.rotate(-Math.PI / 4),
      (e.fillStyle = "rgba(0, 0, 0, 0.25)"),
      e.fillRect(-1.5 * o, -8 * o, 3 * o, 17 * o),
      (e.fillStyle = "#e2e8f0"),
      (e.strokeStyle = "#475569"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.moveTo(0, -10.5 * o),
      e.lineTo(2.2 * o, -8.5 * o),
      e.lineTo(2.2 * o, 1 * o),
      e.lineTo(-2.2 * o, 1 * o),
      e.lineTo(-2.2 * o, -8.5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.strokeStyle = "#94a3b8"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.moveTo(0, -9 * o),
      e.lineTo(0, 0.5 * o),
      e.stroke(),
      (e.fillStyle = "#d97706"),
      (e.strokeStyle = "#92400e"),
      (e.lineWidth = 0.9 * o),
      e.beginPath(),
      e.roundRect(-5.5 * o, 1 * o, 11 * o, 2.2 * o, 1 * o),
      e.fill(),
      e.stroke(),
      (e.fillStyle = m),
      e.beginPath(),
      e.arc(0, 2.1 * o, 1.2 * o, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#5c3a21"),
      e.fillRect(-1.4 * o, 3.2 * o, 2.8 * o, 4.5 * o),
      (e.strokeStyle = "#b45309"),
      (e.lineWidth = 0.7 * o));
    for (let f = 0; f < 3; f++)
      (e.beginPath(),
        e.moveTo(-1.4 * o, (3.8 + f * 1.3) * o),
        e.lineTo(1.4 * o, (4.3 + f * 1.3) * o),
        e.stroke());
    ((e.fillStyle = "#d97706"),
      (e.strokeStyle = "#92400e"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.arc(0, 8.5 * o, 1.8 * o, 0, Math.PI * 2),
      e.fill(),
      e.stroke(),
      Math.sin(u * 3.5) > 0.7 &&
        ((e.fillStyle = "rgba(255, 255, 255, 0.9)"),
        e.beginPath(),
        e.arc(0, -7 * o, 1.6 * o, 0, Math.PI * 2),
        e.fill()),
      e.restore());
  }
  function Og(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      e.rotate(-Math.PI / 4),
      (e.fillStyle = "rgba(0, 0, 0, 0.28)"),
      e.fillRect(-2 * o, -9 * o, 4 * o, 18 * o),
      (e.fillStyle = "#5c3a21"),
      e.fillRect(-1.4 * o, -6 * o, 2.8 * o, 14 * o),
      (e.fillStyle = "#854d0e"),
      e.fillRect(-0.7 * o, -6 * o, 1.4 * o, 13 * o),
      (e.fillStyle = "#b45309"),
      e.fillRect(-1.8 * o, 2 * o, 3.6 * o, 5 * o),
      (e.strokeStyle = "#fef3c7"),
      (e.lineWidth = 0.7 * o));
    for (let f = 0; f < 3; f++)
      (e.beginPath(),
        e.moveTo(-1.8 * o, (2.6 + f * 1.4) * o),
        e.lineTo(1.8 * o, (3.2 + f * 1.4) * o),
        e.stroke());
    ((e.fillStyle = "#475569"),
      (e.strokeStyle = "#1e293b"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.arc(0, 8 * o, 1.8 * o, 0, Math.PI * 2),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#78350f"),
      e.fillRect(-2.2 * o, -7 * o, 4.4 * o, 3 * o),
      (e.strokeStyle = "#fde68a"),
      (e.lineWidth = 0.9 * o),
      e.beginPath(),
      e.moveTo(-2.2 * o, -7 * o),
      e.lineTo(2.2 * o, -4.5 * o),
      e.moveTo(-2.2 * o, -4.5 * o),
      e.lineTo(2.2 * o, -7 * o),
      e.stroke(),
      (e.fillStyle = "#64748b"),
      (e.strokeStyle = "#334155"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.moveTo(-5.5 * o, -11 * o),
      e.lineTo(-2 * o, -13.5 * o),
      e.lineTo(0, -14 * o),
      e.lineTo(2 * o, -13.5 * o),
      e.lineTo(5.5 * o, -11 * o),
      e.lineTo(6.5 * o, -7.5 * o),
      e.lineTo(4.5 * o, -4.5 * o),
      e.lineTo(2 * o, -4 * o),
      e.lineTo(-2 * o, -4 * o),
      e.lineTo(-4.5 * o, -4.5 * o),
      e.lineTo(-6.5 * o, -7.5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#94a3b8"),
      e.beginPath(),
      e.moveTo(0, -14 * o),
      e.lineTo(-2 * o, -13.5 * o),
      e.lineTo(-5.5 * o, -11 * o),
      e.lineTo(-2.5 * o, -8.5 * o),
      e.lineTo(0, -8.5 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#cbd5e1"),
      e.beginPath(),
      e.moveTo(0, -14 * o),
      e.lineTo(0, -8.5 * o),
      e.lineTo(2 * o, -13.5 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#475569"),
      e.beginPath(),
      e.moveTo(0, -8.5 * o),
      e.lineTo(2 * o, -13.5 * o),
      e.lineTo(5.5 * o, -11 * o),
      e.lineTo(6.5 * o, -7.5 * o),
      e.lineTo(4.5 * o, -4.5 * o),
      e.lineTo(0, -5 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#1e293b"),
      e.beginPath(),
      e.moveTo(-2.5 * o, -8.5 * o),
      e.lineTo(0, -5 * o),
      e.lineTo(-4.5 * o, -4.5 * o),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#1e293b"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.moveTo(-1 * o, -12 * o),
      e.lineTo(-0.5 * o, -9.5 * o),
      e.lineTo(-1.8 * o, -7 * o),
      e.stroke());
    const c = Math.sin(u * 2.5);
    if (c > 0.6) {
      const f = (c - 0.6) / 0.4;
      ((e.fillStyle = `rgba(255, 255, 255, ${f * 0.9})`),
        e.beginPath(),
        e.arc(-2 * o, -11.5 * o, 1.2 * o, 0, Math.PI * 2),
        e.fill(),
        e.beginPath(),
        e.arc(1.5 * o, -10 * o, 0.8 * o, 0, Math.PI * 2),
        e.fill());
    }
    e.restore();
  }
  function qg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = "rgba(0, 0, 0, 0.3)"),
      e.beginPath(),
      e.ellipse(0, 4 * o, 7 * o, 3.5 * o, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#64748b"),
      (e.strokeStyle = "#334155"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.moveTo(-1 * o, -8 * o),
      e.lineTo(4 * o, -3 * o),
      e.lineTo(3.5 * o, 4 * o),
      e.lineTo(-2 * o, 5 * o),
      e.lineTo(-5 * o, 0),
      e.lineTo(-3 * o, -5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#94a3b8"),
      e.beginPath(),
      e.moveTo(-1 * o, -8 * o),
      e.lineTo(4 * o, -3 * o),
      e.lineTo(0.5 * o, -1 * o),
      e.lineTo(-2.5 * o, -3.5 * o),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#cbd5e1"),
      (e.lineWidth = 0.7 * o),
      e.beginPath(),
      e.moveTo(-1 * o, -8 * o),
      e.lineTo(0.5 * o, -1 * o),
      e.stroke(),
      (e.fillStyle = "#475569"),
      e.beginPath(),
      e.moveTo(-6 * o, 2 * o),
      e.lineTo(-2 * o, 5 * o),
      e.lineTo(-5.5 * o, 6.5 * o),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#1e293b"),
      (e.lineWidth = 0.6 * o),
      e.stroke(),
      (e.fillStyle = "#cbd5e1"),
      e.beginPath(),
      e.moveTo(3 * o, -6 * o),
      e.lineTo(6.5 * o, -2 * o),
      e.lineTo(4 * o, 0),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#64748b"),
      e.stroke());
    const m = Math.sin(u * 3 + 1);
    if (m > 0.5) {
      const c = (m - 0.5) / 0.5;
      ((e.fillStyle = `rgba(255, 255, 255, ${c})`),
        e.beginPath(),
        e.arc(-1 * o, -8 * o, 1.3 * o, 0, Math.PI * 2),
        e.fill());
    }
    e.restore();
  }
  function Bg(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      e.rotate(-Math.PI / 4),
      (e.fillStyle = "rgba(0, 0, 0, 0.28)"),
      e.fillRect(-2 * o, -8 * o, 4 * o, 18 * o),
      (e.fillStyle = "#5c3a21"),
      e.fillRect(-1.4 * o, -6 * o, 2.8 * o, 15 * o),
      (e.fillStyle = "#854d0e"),
      e.fillRect(-0.7 * o, -6 * o, 1.4 * o, 14 * o),
      (e.fillStyle = "#b45309"),
      e.fillRect(-1.8 * o, 3 * o, 3.6 * o, 5 * o),
      (e.strokeStyle = "#fef3c7"),
      (e.lineWidth = 0.6 * o));
    for (let c = 0; c < 3; c++)
      (e.beginPath(),
        e.moveTo(-1.8 * o, (3.5 + c * 1.3) * o),
        e.lineTo(1.8 * o, (4.1 + c * 1.3) * o),
        e.stroke());
    ((e.fillStyle = "#475569"),
      e.beginPath(),
      e.arc(0, 9 * o, 1.8 * o, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#a16207"),
      e.fillRect(-2.2 * o, -7 * o, 4.4 * o, 3 * o),
      (e.strokeStyle = "#fde68a"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.moveTo(-2.2 * o, -7 * o),
      e.lineTo(2.2 * o, -4.5 * o),
      e.moveTo(-2.2 * o, -4.5 * o),
      e.lineTo(2.2 * o, -7 * o),
      e.stroke(),
      (e.fillStyle = "#475569"),
      (e.strokeStyle = "#1e293b"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.moveTo(-7 * o, -11 * o),
      e.lineTo(7 * o, -11 * o),
      e.lineTo(7.5 * o, -7 * o),
      e.lineTo(7 * o, -5 * o),
      e.lineTo(-7 * o, -5 * o),
      e.lineTo(-7.5 * o, -7 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#94a3b8"),
      e.beginPath(),
      e.moveTo(-7 * o, -11 * o),
      e.lineTo(7 * o, -11 * o),
      e.lineTo(5.5 * o, -9 * o),
      e.lineTo(-5.5 * o, -9 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#cbd5e1"),
      e.beginPath(),
      e.moveTo(-7 * o, -11 * o),
      e.lineTo(-5.5 * o, -9 * o),
      e.lineTo(-5.5 * o, -6 * o),
      e.lineTo(-7 * o, -5 * o),
      e.lineTo(-7.5 * o, -7 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#334155"),
      e.beginPath(),
      e.moveTo(7 * o, -11 * o),
      e.lineTo(7.5 * o, -7 * o),
      e.lineTo(7 * o, -5 * o),
      e.lineTo(5.5 * o, -6 * o),
      e.lineTo(5.5 * o, -9 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#78350f"),
      e.beginPath(),
      e.arc(0, -8 * o, 1.6 * o, 0, Math.PI * 2),
      e.fill(),
      e.restore());
  }
  function Vg(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      e.rotate(-Math.PI / 4),
      (e.fillStyle = "rgba(0, 0, 0, 0.25)"),
      e.fillRect(-1.5 * o, -13 * o, 3 * o, 26 * o),
      (e.fillStyle = "#78350f"),
      e.fillRect(-1.2 * o, -8 * o, 2.4 * o, 19 * o),
      (e.fillStyle = "#a16207"),
      e.fillRect(-0.6 * o, -8 * o, 1.2 * o, 18 * o),
      (e.fillStyle = "#b45309"),
      e.fillRect(-1.5 * o, 2 * o, 3 * o, 4 * o),
      (e.strokeStyle = "#fef3c7"),
      (e.lineWidth = 0.6 * o),
      e.beginPath(),
      e.moveTo(-1.5 * o, 2.8 * o),
      e.lineTo(1.5 * o, 3.4 * o),
      e.moveTo(-1.5 * o, 4.4 * o),
      e.lineTo(1.5 * o, 5 * o),
      e.stroke(),
      (e.fillStyle = "#475569"),
      e.fillRect(-1.5 * o, 10 * o, 3 * o, 1.5 * o),
      (e.fillStyle = "#a16207"),
      e.fillRect(-2 * o, -9.5 * o, 4 * o, 3.5 * o),
      (e.strokeStyle = "#fde68a"),
      (e.lineWidth = 0.7 * o),
      e.beginPath(),
      e.moveTo(-2 * o, -9.5 * o),
      e.lineTo(2 * o, -6.5 * o),
      e.moveTo(-2 * o, -6.5 * o),
      e.lineTo(2 * o, -9.5 * o),
      e.stroke(),
      (e.fillStyle = "#475569"),
      (e.strokeStyle = "#1e293b"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.moveTo(0, -17 * o),
      e.lineTo(3.2 * o, -10 * o),
      e.lineTo(1.8 * o, -8 * o),
      e.lineTo(-1.8 * o, -8 * o),
      e.lineTo(-3.2 * o, -10 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#94a3b8"),
      e.beginPath(),
      e.moveTo(0, -17 * o),
      e.lineTo(-3.2 * o, -10 * o),
      e.lineTo(0, -9 * o),
      e.closePath(),
      e.fill(),
      (e.strokeStyle = "#cbd5e1"),
      (e.lineWidth = 0.7 * o),
      e.beginPath(),
      e.moveTo(0, -17 * o),
      e.lineTo(0, -8.5 * o),
      e.stroke());
    const c = Math.sin(u * 3 + 2);
    if (c > 0.5) {
      const f = (c - 0.5) / 0.5;
      ((e.fillStyle = `rgba(255, 255, 255, ${f})`),
        e.beginPath(),
        e.arc(0, -17 * o, 1.3 * o, 0, Math.PI * 2),
        e.fill());
    }
    e.restore();
  }
  function Ug(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      e.rotate(-Math.PI / 4),
      (e.fillStyle = "rgba(0, 0, 0, 0.28)"),
      e.fillRect(-2 * o, -8 * o, 4 * o, 18 * o),
      (e.fillStyle = "#5c3a21"),
      e.fillRect(-1.4 * o, -6 * o, 2.8 * o, 15 * o),
      (e.fillStyle = "#854d0e"),
      e.fillRect(-0.7 * o, -6 * o, 1.4 * o, 14 * o),
      (e.fillStyle = "#b45309"),
      e.fillRect(-1.8 * o, 3 * o, 3.6 * o, 5 * o),
      (e.strokeStyle = "#fef3c7"),
      (e.lineWidth = 0.6 * o));
    for (let f = 0; f < 3; f++)
      (e.beginPath(),
        e.moveTo(-1.8 * o, (3.5 + f * 1.3) * o),
        e.lineTo(1.8 * o, (4.1 + f * 1.3) * o),
        e.stroke());
    ((e.fillStyle = "#475569"),
      e.beginPath(),
      e.arc(0, 9 * o, 1.8 * o, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#a16207"),
      e.fillRect(-2.5 * o, -8 * o, 5 * o, 3.5 * o),
      (e.strokeStyle = "#fde68a"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.moveTo(-2.5 * o, -8 * o),
      e.lineTo(2.5 * o, -5 * o),
      e.moveTo(-2.5 * o, -5 * o),
      e.lineTo(2.5 * o, -8 * o),
      e.stroke(),
      (e.fillStyle = "#475569"),
      (e.strokeStyle = "#1e293b"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.moveTo(1 * o, -9.5 * o),
      e.lineTo(-6 * o, -11 * o),
      e.quadraticCurveTo(-9.5 * o, -6.5 * o, -6 * o, -2.5 * o),
      e.lineTo(1 * o, -4 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#cbd5e1"),
      e.beginPath(),
      e.moveTo(-4.5 * o, -9.5 * o),
      e.quadraticCurveTo(-9.5 * o, -6.5 * o, -4.5 * o, -3.5 * o),
      e.lineTo(-6 * o, -2.5 * o),
      e.quadraticCurveTo(-9.5 * o, -6.5 * o, -6 * o, -11 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#94a3b8"),
      e.beginPath(),
      e.moveTo(0, -9.5 * o),
      e.lineTo(-4.5 * o, -9.5 * o),
      e.lineTo(-3 * o, -6.5 * o),
      e.lineTo(0, -6.5 * o),
      e.closePath(),
      e.fill());
    const c = Math.sin(u * 2.8 + 1.5);
    if (c > 0.5) {
      const f = (c - 0.5) / 0.5;
      ((e.fillStyle = `rgba(255, 255, 255, ${f})`),
        e.beginPath(),
        e.arc(-8.5 * o, -6.5 * o, 1.2 * o, 0, Math.PI * 2),
        e.fill());
    }
    e.restore();
  }
  function $g(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      e.rotate(-Math.PI / 4),
      (e.fillStyle = "#78350f"),
      e.fillRect(-1.5 * o, -7 * o, 3 * o, 16 * o),
      (e.fillStyle = "#92400e"),
      e.fillRect(-0.7 * o, -7 * o, 1.4 * o, 15 * o),
      (e.fillStyle = "#f59e0b"),
      e.beginPath(),
      e.arc(0, -7 * o, 3.2 * o, 0, Math.PI * 2),
      e.fill());
    const c = Math.sin(u * 4) * 0.2 + 0.9;
    ((e.fillStyle = m || "#38bdf8"),
      e.beginPath(),
      e.arc(0, -9.5 * o, 3.5 * o * c, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(-1 * o, -10.5 * o, 1.2 * o, 0, Math.PI * 2),
      e.fill(),
      e.restore());
  }
  function Yg(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = "#78350f"),
      (e.strokeStyle = "#475569"),
      (e.lineWidth = 1.8 * o),
      e.beginPath(),
      e.moveTo(-7 * o, -7 * o),
      e.lineTo(7 * o, -7 * o),
      e.quadraticCurveTo(7.5 * o, 2 * o, 0, 8.5 * o),
      e.quadraticCurveTo(-7.5 * o, 2 * o, -7 * o, -7 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.strokeStyle = "#451a03"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.moveTo(-2.5 * o, -6.5 * o),
      e.lineTo(-2.5 * o, 4 * o),
      e.moveTo(2.5 * o, -6.5 * o),
      e.lineTo(2.5 * o, 4 * o),
      e.stroke(),
      (e.fillStyle = m),
      e.beginPath(),
      e.moveTo(0, -5 * o),
      e.lineTo(4 * o, -1 * o),
      e.lineTo(0, 3 * o),
      e.lineTo(-4 * o, -1 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#94a3b8"),
      (e.strokeStyle = "#334155"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.arc(0, -1 * o, 2.8 * o, 0, Math.PI * 2),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#f1f5f9"),
      e.beginPath(),
      e.arc(-0.8 * o, -1.8 * o, 0.9 * o, 0, Math.PI * 2),
      e.fill(),
      e.restore());
  }
  function Gg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l + 1 * o),
      (e.fillStyle = "rgba(0, 0, 0, 0.2)"),
      e.beginPath(),
      e.ellipse(0, 3 * o, 9 * o, 3.5 * o, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = "#78350f"),
      (e.strokeStyle = "#451a03"),
      (e.lineWidth = 1.2 * o),
      e.beginPath(),
      e.moveTo(-5 * o, 1 * o),
      e.quadraticCurveTo(-4.5 * o, -6.5 * o, 0, -6.5 * o),
      e.quadraticCurveTo(4.5 * o, -6.5 * o, 5 * o, 1 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#92400e"),
      e.beginPath(),
      e.ellipse(0, 1.5 * o, 8.5 * o, 3 * o, 0, 0, Math.PI * 2),
      e.fill(),
      e.stroke(),
      (e.fillStyle = u),
      e.fillRect(-5 * o, -0.8 * o, 10 * o, 2 * o),
      (e.fillStyle = "#f43f5e"),
      e.beginPath(),
      e.moveTo(3 * o, -0.5 * o),
      e.quadraticCurveTo(7 * o, -5 * o, 6 * o, -8.5 * o),
      e.quadraticCurveTo(4 * o, -5 * o, 3 * o, -0.5 * o),
      e.fill(),
      e.restore());
  }
  function Xg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = u || "#0284c7"),
      (e.strokeStyle = "#0f172a"),
      (e.lineWidth = 1.2 * o),
      e.beginPath(),
      e.moveTo(-5.5 * o, -6.5 * o),
      e.lineTo(-2 * o, -6.5 * o),
      e.lineTo(0, -3.5 * o),
      e.lineTo(2 * o, -6.5 * o),
      e.lineTo(5.5 * o, -6.5 * o),
      e.lineTo(7 * o, -2.5 * o),
      e.lineTo(5.5 * o, -1 * o),
      e.lineTo(4.8 * o, 6.5 * o),
      e.lineTo(-4.8 * o, 6.5 * o),
      e.lineTo(-5.5 * o, -1 * o),
      e.lineTo(-7 * o, -2.5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#5c3a21"),
      e.fillRect(-4.8 * o, 1 * o, 9.6 * o, 1.8 * o),
      (e.fillStyle = "#f59e0b"),
      e.fillRect(-1.4 * o, 0.7 * o, 2.8 * o, 2.4 * o),
      e.restore());
  }
  function Fg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = u || "#475569"),
      (e.strokeStyle = "#1e293b"),
      (e.lineWidth = 1.2 * o),
      e.beginPath(),
      e.moveTo(-4.5 * o, -6.5 * o),
      e.lineTo(4.5 * o, -6.5 * o),
      e.lineTo(5 * o, 6.5 * o),
      e.lineTo(1.2 * o, 6.5 * o),
      e.lineTo(0, -0.5 * o),
      e.lineTo(-1.2 * o, 6.5 * o),
      e.lineTo(-5 * o, 6.5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#334155"),
      e.beginPath(),
      e.roundRect(-4 * o, 0.5 * o, 2.5 * o, 3.5 * o, 1 * o),
      e.roundRect(1.5 * o, 0.5 * o, 2.5 * o, 3.5 * o, 1 * o),
      e.fill(),
      e.restore());
  }
  function Hg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = "#78350f"),
      (e.strokeStyle = "#451a03"),
      (e.lineWidth = 1.1 * o),
      e.beginPath(),
      e.moveTo(-5.5 * o, -6 * o),
      e.lineTo(-2.2 * o, -6 * o),
      e.lineTo(-2.2 * o, 1.5 * o),
      e.lineTo(0, 4.5 * o),
      e.lineTo(-6.5 * o, 4.5 * o),
      e.lineTo(-5.5 * o, 1.5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      e.beginPath(),
      e.moveTo(0.5 * o, -6 * o),
      e.lineTo(3.8 * o, -6 * o),
      e.lineTo(3.8 * o, 1.5 * o),
      e.lineTo(6 * o, 4.5 * o),
      e.lineTo(-0.5 * o, 4.5 * o),
      e.lineTo(0.5 * o, 1.5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#1c1917"),
      e.fillRect(-6.5 * o, 4.5 * o, 6.5 * o, 1.4 * o),
      e.fillRect(-0.5 * o, 4.5 * o, 6.5 * o, 1.4 * o),
      (e.fillStyle = "#f59e0b"),
      e.fillRect(-4.5 * o, -1 * o, 1.8 * o, 1.2 * o),
      e.fillRect(1.5 * o, -1 * o, 1.8 * o, 1.2 * o),
      e.restore());
  }
  function Wg(e, t, l, o, u, m) {
    (e.save(), e.translate(t, l));
    const c = Math.sin(u * 3) * 1 * o;
    ((e.fillStyle = m || "#7c3aed"),
      (e.strokeStyle = "#2e1065"),
      (e.lineWidth = 1.2 * o),
      e.beginPath(),
      e.moveTo(-3 * o, -6 * o),
      e.lineTo(3 * o, -6 * o),
      e.quadraticCurveTo(7 * o + c, 1 * o, 6 * o + c, 7 * o),
      e.quadraticCurveTo(0, 5.5 * o, -6 * o - c, 7 * o),
      e.quadraticCurveTo(-7 * o - c, 1 * o, -3 * o, -6 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "rgba(0, 0, 0, 0.2)"),
      e.beginPath(),
      e.moveTo(0, -6 * o),
      e.lineTo(2 * o, 6 * o),
      e.lineTo(-2 * o, 6 * o),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#f59e0b"),
      e.beginPath(),
      e.arc(0, -5 * o, 2 * o, 0, Math.PI * 2),
      e.fill(),
      e.restore());
  }
  function Kg(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      (e.strokeStyle = "#f59e0b"),
      (e.lineWidth = 1.1 * o),
      e.beginPath(),
      e.ellipse(0, -3 * o, 5 * o, 4.5 * o, 0, 0, Math.PI),
      e.stroke(),
      (e.fillStyle = "#d97706"),
      e.beginPath(),
      e.arc(0, 1.5 * o, 3.8 * o, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = m),
      e.beginPath(),
      e.moveTo(0, -1.8 * o),
      e.lineTo(3 * o, 1.5 * o),
      e.lineTo(0, 5 * o),
      e.lineTo(-3 * o, 1.5 * o),
      e.closePath(),
      e.fill());
    const c = (Math.sin(u * 4) + 1) / 2;
    ((e.fillStyle = `rgba(255, 255, 255, ${0.4 + c * 0.5})`),
      e.beginPath(),
      e.moveTo(0, -1.8 * o),
      e.lineTo(1.5 * o, 0),
      e.lineTo(0, 1.5 * o),
      e.lineTo(-1.5 * o, 0),
      e.closePath(),
      e.fill(),
      e.restore());
  }
  function Zg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = "#5c3a21"),
      (e.strokeStyle = "#29180c"),
      (e.lineWidth = 1.2 * o),
      e.beginPath(),
      e.roundRect(-6 * o, -4.5 * o, 12 * o, 9 * o, 2 * o),
      e.fill(),
      e.stroke(),
      (e.fillStyle = u || "#d97706"),
      e.fillRect(-6 * o, -1 * o, 12 * o, 2 * o),
      (e.fillStyle = "#f1f5f9"));
    for (let m = -1; m <= 1; m++)
      (e.beginPath(), e.arc(m * 3.5 * o, 0, 1 * o, 0, Math.PI * 2), e.fill());
    e.restore();
  }
  function Qg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = "#78350f"),
      (e.strokeStyle = "#451a03"),
      (e.lineWidth = 1.2 * o),
      e.beginPath(),
      e.ellipse(0, 0, 7 * o, 5 * o, 0, 0, Math.PI * 2),
      e.stroke(),
      (e.fillStyle = "#f59e0b"),
      (e.strokeStyle = "#b45309"),
      (e.lineWidth = 1.1 * o),
      e.beginPath(),
      e.roundRect(-4 * o, -3 * o, 8 * o, 6 * o, 1.5 * o),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#29180c"),
      e.fillRect(-2 * o, -1.5 * o, 4 * o, 3 * o),
      (e.fillStyle = "#fef08a"),
      e.fillRect(-0.6 * o, -2.5 * o, 1.2 * o, 5 * o),
      e.restore());
  }
  function Jg(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = "#065f46"),
      (e.strokeStyle = "#022c22"),
      (e.lineWidth = 1.1 * o),
      e.beginPath(),
      e.roundRect(-6.5 * o, -7 * o, 13 * o, 3.5 * o, 1.5 * o),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#92400e"),
      e.beginPath(),
      e.roundRect(-6 * o, -3.5 * o, 12 * o, 10.5 * o, 2 * o),
      e.fill(),
      e.stroke(),
      (e.fillStyle = "#78350f"),
      e.fillRect(-4 * o, 0.5 * o, 8 * o, 5.5 * o),
      e.strokeRect(-4 * o, 0.5 * o, 8 * o, 5.5 * o),
      (e.fillStyle = "#f59e0b"),
      e.fillRect(-3 * o, 2 * o, 1.5 * o, 2 * o),
      e.fillRect(1.5 * o, 2 * o, 1.5 * o, 2 * o),
      e.restore());
  }
  function eb(e, t, l, o, u, m) {
    (e.save(), e.translate(t, l + 1 * o));
    const c = 0.8 + Math.sin(u * 4) * 0.2;
    ((e.fillStyle = m),
      (e.globalAlpha = 0.25 * c),
      e.beginPath(),
      e.arc(0, 0, 9 * o, 0, Math.PI * 2),
      e.fill(),
      (e.globalAlpha = 1),
      (e.fillStyle = "#334155"),
      e.beginPath(),
      e.ellipse(0, 5 * o, 6.5 * o, 2.5 * o, 0, 0, Math.PI * 2),
      e.fill(),
      (e.fillStyle = m),
      (e.strokeStyle = "#ffffff"),
      (e.lineWidth = 0.8 * o),
      e.beginPath(),
      e.moveTo(0, -8 * o),
      e.lineTo(2.8 * o, -4 * o),
      e.lineTo(2.2 * o, 4 * o),
      e.lineTo(-2.2 * o, 4 * o),
      e.lineTo(-2.8 * o, -4 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      e.beginPath(),
      e.moveTo(-4.5 * o, -4.5 * o),
      e.lineTo(-2 * o, -2 * o),
      e.lineTo(-2.5 * o, 4 * o),
      e.lineTo(-5 * o, 3.5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      e.beginPath(),
      e.moveTo(4.5 * o, -3.5 * o),
      e.lineTo(2 * o, -1 * o),
      e.lineTo(2.5 * o, 4 * o),
      e.lineTo(5 * o, 3.5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.strokeStyle = "#ffffff"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.moveTo(0, -8 * o),
      e.lineTo(0, 4 * o),
      e.stroke(),
      e.restore());
  }
  function ab(e, t, l, o, u) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = "#334155"),
      (e.strokeStyle = "#1e293b"),
      (e.lineWidth = 1.4 * o),
      e.beginPath(),
      e.moveTo(-6 * o, -4 * o),
      e.lineTo(-2 * o, -7 * o),
      e.lineTo(5 * o, -5 * o),
      e.lineTo(7 * o, 2 * o),
      e.lineTo(3 * o, 6.5 * o),
      e.lineTo(-5 * o, 5 * o),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = u),
      e.beginPath(),
      e.moveTo(-3 * o, -3 * o),
      e.lineTo(1 * o, -4 * o),
      e.lineTo(3 * o, -1 * o),
      e.lineTo(0, 1 * o),
      e.closePath(),
      e.fill(),
      e.beginPath(),
      e.moveTo(-2 * o, 2 * o),
      e.lineTo(2 * o, 4 * o),
      e.lineTo(4 * o, 2 * o),
      e.closePath(),
      e.fill(),
      e.restore());
  }
  function tb(e, t, l, o, u, m) {
    (e.save(), e.translate(t, l));
    const c = 0.8 + Math.sin(u * 5) * 0.2;
    ((e.fillStyle = m),
      (e.globalAlpha = 0.3 * c),
      e.beginPath(),
      e.arc(0, -2 * o, 8 * o, 0, Math.PI * 2),
      e.fill(),
      (e.globalAlpha = 1),
      (e.fillStyle = "#e2e8f0"),
      e.beginPath(),
      e.roundRect(-2 * o, -1 * o, 4 * o, 7 * o, 1.5 * o),
      e.fill(),
      (e.fillStyle = m),
      e.beginPath(),
      e.arc(0, -2 * o, 6.5 * o, Math.PI, 0),
      e.closePath(),
      e.fill(),
      (e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(-2.5 * o, -4 * o, 1.1 * o, 0, Math.PI * 2),
      e.arc(1.8 * o, -5 * o, 1.3 * o, 0, Math.PI * 2),
      e.arc(2.5 * o, -2.5 * o, 0.9 * o, 0, Math.PI * 2),
      e.fill(),
      e.restore());
  }
  function ob(e, t, l, o, u, m) {
    (e.save(),
      e.translate(t, l),
      (e.fillStyle = "#a16207"),
      e.fillRect(-2 * o, -7.5 * o, 4 * o, 2.5 * o),
      (e.fillStyle = "rgba(255, 255, 255, 0.15)"),
      (e.strokeStyle = "#94a3b8"),
      (e.lineWidth = 1.2 * o),
      e.beginPath(),
      e.moveTo(-2.5 * o, -5 * o),
      e.lineTo(2.5 * o, -5 * o),
      e.lineTo(2.5 * o, -2 * o),
      e.arc(0, 2 * o, 5.5 * o, -0.8, Math.PI + 0.8, !1),
      e.closePath(),
      e.fill(),
      e.stroke(),
      (e.fillStyle = m),
      e.beginPath(),
      e.arc(0, 2 * o, 4.3 * o, 0.2, Math.PI - 0.2, !1),
      e.closePath(),
      e.fill());
    const c = 3.5 * o - ((u * 8) % (4 * o));
    ((e.fillStyle = "#ffffff"),
      e.beginPath(),
      e.arc(1 * o, c, 0.9 * o, 0, Math.PI * 2),
      e.fill(),
      e.restore());
  }
  function rb(e, t, l, o, u, m) {
    (e.save(), e.translate(t, l));
    const c = u * 0.8;
    (e.rotate(c),
      (e.fillStyle = m),
      (e.strokeStyle = "#ffffff"),
      (e.lineWidth = 1 * o),
      e.beginPath(),
      e.moveTo(0, -6 * o),
      e.lineTo(6 * o, 0),
      e.lineTo(0, 6 * o),
      e.lineTo(-6 * o, 0),
      e.closePath(),
      e.fill(),
      e.stroke(),
      e.restore());
  }
