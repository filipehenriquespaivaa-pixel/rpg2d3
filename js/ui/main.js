/* js/ui/main.js
 * Componente raiz (App) e montagem do React. DEVE ser o ultimo script.
 * Trecho de legacy/app.original.js (linhas 48808-48817); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  function App() {
    return h.jsx("main", {
      className:
        "w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none text-slate-100",
      children: h.jsx(GameMain, {}),
    });
  }
  pp.createRoot(document.getElementById("root")).render(
    h.jsx(J.StrictMode, { children: h.jsx(App, {}) }),
  );
