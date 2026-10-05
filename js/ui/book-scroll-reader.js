/* js/ui/book-scroll-reader.js
 * Visualizador Imersivo de Livros (com páginas folheáveis) e Pergaminhos (abertos com tema de papiro).
 * Padrão global: window.Game.BookScrollReaderModal
 */
"use strict";

window.Game = window.Game || {};

(function (G) {
  // SVG do Selo Rúnico de Geometria Sagrada (Círculos, Triângulos e Símbolos)
  function SacredGeometrySVG({ size = 220 }) {
    return h.jsxs("svg", {
      width: size,
      height: size,
      viewBox: "0 0 200 200",
      className: "mx-auto my-3 filter drop-shadow-[0_0_12px_rgba(216,180,254,0.6)] animate-pulse",
      style: { animationDuration: "4s" },
      children: [
        // Defs para gradientes
        h.jsxs("defs", {
          children: [
            h.jsxs("linearGradient", {
              id: "goldRuneGrad",
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%",
              children: [
                h.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
                h.jsx("stop", { offset: "50%", stopColor: "#eab308" }),
                h.jsx("stop", { offset: "100%", stopColor: "#ca8a04" }),
              ],
            }),
            h.jsxs("linearGradient", {
              id: "purpleRuneGrad",
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%",
              children: [
                h.jsx("stop", { offset: "0%", stopColor: "#e879f9" }),
                h.jsx("stop", { offset: "50%", stopColor: "#c084fc" }),
                h.jsx("stop", { offset: "100%", stopColor: "#9333ea" }),
              ],
            }),
          ],
        }),

        // 1. Círculo Exterior
        h.jsx("circle", {
          cx: "100",
          cy: "100",
          r: "92",
          fill: "rgba(88, 28, 135, 0.2)",
          stroke: "url(#goldRuneGrad)",
          strokeWidth: "2",
          strokeDasharray: "4 2",
        }),

        // 2. Anel de Runas e Glifos
        h.jsx("circle", {
          cx: "100",
          cy: "100",
          r: "84",
          fill: "none",
          stroke: "url(#purpleRuneGrad)",
          strokeWidth: "1.2",
        }),

        // 3. Primeiro Triângulo Sagrado (Apontando para cima: Fogo / Ascensão)
        h.jsx("polygon", {
          points: "100,20 170,140 30,140",
          fill: "none",
          stroke: "url(#goldRuneGrad)",
          strokeWidth: "2",
        }),

        // 4. Segundo Triângulo Sagrado (Apontando para baixo: Água / Abismo)
        h.jsx("polygon", {
          points: "100,180 170,60 30,60",
          fill: "none",
          stroke: "url(#purpleRuneGrad)",
          strokeWidth: "2",
        }),

        // 5. Círculo Intermediário entrelaçado
        h.jsx("circle", {
          cx: "100",
          cy: "100",
          r: "54",
          fill: "none",
          stroke: "url(#goldRuneGrad)",
          strokeWidth: "1.5",
          strokeDasharray: "6 3",
        }),

        // 6. Círculo Central Menor (O Olho do Éter)
        h.jsx("circle", {
          cx: "100",
          cy: "100",
          r: "24",
          fill: "rgba(147, 51, 234, 0.35)",
          stroke: "url(#goldRuneGrad)",
          strokeWidth: "2",
        }),

        // 7. Núcleo com Ponto Radiante
        h.jsx("circle", {
          cx: "100",
          cy: "100",
          r: "6",
          fill: "#fef08a",
        }),

        // 8. Símbolos dos Quatro Elementos nos Vértices
        h.jsx("text", { x: "100", y: "15", textAnchor: "middle", fill: "#fef08a", fontSize: "12", fontWeight: "bold", children: "🜂" }),
        h.jsx("text", { x: "100", y: "194", textAnchor: "middle", fill: "#c084fc", fontSize: "12", fontWeight: "bold", children: "🜄" }),
        h.jsx("text", { x: "182", y: "64", textAnchor: "middle", fill: "#fef08a", fontSize: "12", fontWeight: "bold", children: "🜁" }),
        h.jsx("text", { x: "18", y: "64", textAnchor: "middle", fill: "#c084fc", fontSize: "12", fontWeight: "bold", children: "🜃" }),
        h.jsx("text", { x: "182", y: "146", textAnchor: "middle", fill: "#fef08a", fontSize: "12", fontWeight: "bold", children: "✦" }),
        h.jsx("text", { x: "18", y: "146", textAnchor: "middle", fill: "#c084fc", fontSize: "12", fontWeight: "bold", children: "✦" }),

        // Pequenas marcas nos anéis (geometria astral)
        h.jsx("line", { x1: "100", y1: "8", x2: "100", y2: "192", stroke: "rgba(234, 179, 8, 0.4)", strokeWidth: "0.8" }),
        h.jsx("line", { x1: "8", y1: "100", x2: "192", y2: "100", stroke: "rgba(192, 132, 252, 0.4)", strokeWidth: "0.8" }),
      ],
    });
  }

  // Componente Principal de Leitura: Livro ou Pergaminho
  function BookScrollReaderModal({ item, isOpen, onClose }) {
    if (!isOpen || !item) return null;

    const data = G.BooksAndScrolls
      ? G.BooksAndScrolls.getData(item)
      : null;

    if (!data) return null;

    const isBook = data.type === "book";
    const [pageIndex, setPageIndex] = J.useState(0);

    // Reseta a página se trocar de item
    J.useEffect(() => {
      setPageIndex(0);
    }, [item?.id]);

    // Suporte para teclas de navegação: Setas e Esc
    J.useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        } else if (isBook) {
          if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === "d" || e.key === "D") {
            setPageIndex((prev) => Math.min(prev + 2, (data.pages?.length || 1) - 1));
          } else if (e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "a" || e.key === "A") {
            setPageIndex((prev) => Math.max(prev - 2, 0));
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isBook, data, onClose]);

    // ==========================================
    // RENDERIZAÇÃO DE LIVRO (Visual de Livro Encadernado com Páginas)
    // ==========================================
    if (isBook) {
      const pages = data.pages || [];
      const totalPages = pages.length;
      // Exibe duas páginas por vez em tela ampla (par e ímpar)
      const leftPage = pages[pageIndex] || null;
      const rightPage = pageIndex + 1 < totalPages ? pages[pageIndex + 1] : null;

      const canPrev = pageIndex > 0;
      const canNext = pageIndex + 2 < totalPages;

      return h.jsx("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-fadeIn",
        onClick: (e) => {
          if (e.target === e.currentTarget) onClose();
        },
        children: h.jsxs("div", {
          className: "relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border-4 shadow-2xl overflow-hidden",
          style: {
            backgroundColor: data.coverColor || "#451a03",
            borderColor: data.accentColor || "#d97706",
            boxShadow: `0 0 35px ${data.coverColor || "#451a03"}90, inset 0 0 15px rgba(0,0,0,0.8)`,
          },
          children: [
            // Fita Marcadora de Página decorativa vermelha suspensa
            h.jsx("div", {
              className: "absolute top-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-red-700 shadow-md z-30 pointer-events-none rounded-b-md flex justify-center items-end pb-1 border-x border-b border-red-900",
              children: h.jsx("div", { className: "w-2 h-2 bg-amber-400 rotate-45" }),
            }),

            // Cabeçalho da Encadernação (Couro com Friso Dourado)
            h.jsxs("div", {
              className: "flex items-center justify-between px-5 py-3 border-b border-amber-500/30 bg-black/40 text-amber-200",
              children: [
                h.jsxs("div", {
                  className: "flex items-center gap-2.5",
                  children: [
                    h.jsx("span", { className: "text-2xl filter drop-shadow", children: data.icon || "📖" }),
                    h.jsxs("div", {
                      children: [
                        h.jsx("h2", {
                          className: "text-sm sm:text-base font-bold font-serif text-amber-300 leading-tight tracking-wide drop-shadow",
                          children: data.name,
                        }),
                        h.jsxs("span", {
                          className: "text-[11px] text-amber-400/80 font-mono",
                          children: ["Por: ", data.author || "Anônimo de Delfos"],
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsx("button", {
                  onClick: onClose,
                  className: "px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 hover:text-white font-bold text-xs transition cursor-pointer active:scale-95 shadow",
                  title: "Fechar livro (Esc)",
                  children: "✕ Fechar",
                }),
              ],
            }),

            // Corpo do Livro (Páginas Abertas com Textura de Pergaminho / Papel Antigo)
            h.jsxs("div", {
              className: "p-3 sm:p-5 flex-1 overflow-y-auto flex flex-col md:flex-row gap-4 items-stretch justify-center relative",
              style: {
                background: "linear-gradient(135deg, #fef3c7 0%, #fae8b4 50%, #fef3c7 100%)",
              },
              children: [
                // Lombada / Costura central decorativa (apenas em telas médias/grandes)
                h.jsx("div", {
                  className: "hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none shadow-inner",
                  style: {
                    background: "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.18) 100%)",
                  },
                }),

                // ================= PÁGINA ESQUERDA =================
                h.jsxs("div", {
                  className: "flex-1 flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-amber-50/80 shadow-inner border border-amber-900/15 min-h-[360px]",
                  children: [
                    leftPage
                      ? h.jsxs("div", {
                          className: "flex flex-col gap-2.5",
                          children: [
                            // Título da Seção / Capítulo
                            h.jsxs("div", {
                              className: "border-b border-amber-800/20 pb-2 text-center",
                              children: [
                                h.jsx("span", {
                                  className: "text-[11px] font-bold uppercase tracking-widest text-amber-800/80 font-mono",
                                  children: leftPage.chapter,
                                }),
                                h.jsx("h3", {
                                  className: "text-base sm:text-lg font-bold font-serif text-stone-900 leading-tight mt-0.5",
                                  children: leftPage.title,
                                }),
                                leftPage.subtitle &&
                                  h.jsx("p", {
                                    className: "text-xs italic text-amber-900/70 font-serif",
                                    children: leftPage.subtitle,
                                  }),
                              ],
                            }),

                            // Conteúdo formatado
                            h.jsx("div", {
                              className: "text-stone-800 text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-line my-2 text-justify",
                              children: leftPage.content,
                            }),

                            // Citação / Dica do autor
                            leftPage.flavor &&
                              h.jsx("div", {
                                className: "mt-2 p-2.5 rounded-lg bg-amber-100/70 border-l-4 border-amber-600 text-[11px] italic font-serif text-amber-950",
                                children: leftPage.flavor,
                              }),
                          ],
                        })
                      : h.jsx("div", {
                          className: "flex items-center justify-center h-full text-stone-400 italic font-serif",
                          children: "Página em branco.",
                        }),

                    // Rodapé da Página Esquerda
                    h.jsxs("div", {
                      className: "flex items-center justify-between pt-3 border-t border-amber-800/15 text-[11px] text-amber-900/70 font-mono",
                      children: [
                        h.jsx("span", { children: "❦" }),
                        h.jsxs("span", {
                          className: "font-bold",
                          children: ["Página ", pageIndex + 1, " de ", totalPages],
                        }),
                      ],
                    }),
                  ],
                }),

                // ================= PÁGINA DIREITA =================
                h.jsxs("div", {
                  className: "flex-1 flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-amber-50/80 shadow-inner border border-amber-900/15 min-h-[360px]",
                  children: [
                    rightPage
                      ? h.jsxs("div", {
                          className: "flex flex-col gap-2.5",
                          children: [
                            h.jsxs("div", {
                              className: "border-b border-amber-800/20 pb-2 text-center",
                              children: [
                                h.jsx("span", {
                                  className: "text-[11px] font-bold uppercase tracking-widest text-amber-800/80 font-mono",
                                  children: rightPage.chapter,
                                }),
                                h.jsx("h3", {
                                  className: "text-base sm:text-lg font-bold font-serif text-stone-900 leading-tight mt-0.5",
                                  children: rightPage.title,
                                }),
                                rightPage.subtitle &&
                                  h.jsx("p", {
                                    className: "text-xs italic text-amber-900/70 font-serif",
                                    children: rightPage.subtitle,
                                  }),
                              ],
                            }),
                            h.jsx("div", {
                              className: "text-stone-800 text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-line my-2 text-justify",
                              children: rightPage.content,
                            }),
                            rightPage.flavor &&
                              h.jsx("div", {
                                className: "mt-2 p-2.5 rounded-lg bg-amber-100/70 border-l-4 border-amber-600 text-[11px] italic font-serif text-amber-950",
                                children: rightPage.flavor,
                              }),
                          ],
                        })
                      : h.jsxs("div", {
                          className: "flex flex-col items-center justify-center h-full text-center p-4",
                          children: [
                            h.jsx("div", { className: "text-3xl text-amber-800/40 mb-2", children: "❦ ❦ ❦" }),
                            h.jsx("p", {
                              className: "text-stone-500 font-serif italic text-xs",
                              children: "Fim das páginas deste volume encadernado.",
                            }),
                            h.jsx("span", {
                              className: "text-[11px] font-mono text-amber-900/60 mt-2",
                              children: "Consulte outros livros e estantes da biblioteca para mais saberes!",
                            }),
                          ],
                        }),

                    // Rodapé da Página Direita
                    h.jsxs("div", {
                      className: "flex items-center justify-between pt-3 border-t border-amber-800/15 text-[11px] text-amber-900/70 font-mono",
                      children: [
                        h.jsxs("span", {
                          className: "font-bold",
                          children: rightPage ? ["Página ", pageIndex + 2, " de ", totalPages] : "Fim do Livro",
                        }),
                        h.jsx("span", { children: "❦" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Barra Inferior de Navegação (Mudar de Páginas)
            h.jsxs("div", {
              className: "flex items-center justify-between px-5 py-3 border-t border-amber-500/30 bg-black/60 backdrop-blur",
              children: [
                h.jsxs("button", {
                  disabled: !canPrev,
                  onClick: () => setPageIndex((p) => Math.max(p - 2, 0)),
                  className: `flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-serif transition shadow-lg ${
                    canPrev
                      ? "bg-amber-600 hover:bg-amber-500 text-white cursor-pointer active:scale-95 border border-amber-400"
                      : "bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700"
                  }`,
                  children: [
                    h.jsx("span", { children: "◀" }),
                    h.jsx("span", { children: "Página Anterior" }),
                  ],
                }),

                h.jsxs("div", {
                  className: "text-center text-[11px] font-mono text-amber-300 hidden sm:block",
                  children: [
                    "Pressione [←] e [→] no teclado para folhear",
                  ],
                }),

                h.jsxs("button", {
                  disabled: !canNext,
                  onClick: () => setPageIndex((p) => Math.min(p + 2, totalPages - 1)),
                  className: `flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-serif transition shadow-lg ${
                    canNext
                      ? "bg-amber-600 hover:bg-amber-500 text-white cursor-pointer active:scale-95 border border-amber-400"
                      : "bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700"
                  }`,
                  children: [
                    h.jsx("span", { children: "Próxima Página" }),
                    h.jsx("span", { children: "▶" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      });
    }

    // ==========================================
    // RENDERIZAÇÃO DE PERGAMINHO (Visual de Rolo de Pergaminho Aberto com Tubos de Madeira)
    // ==========================================
    const sections = data.sections || [];
    const isRunic = data.scrollTheme === "runic_mystery";

    return h.jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      children: h.jsxs("div", {
        className: "relative w-full max-w-2xl max-h-[92vh] flex flex-col items-center",
        children: [
          // Rolo de Madeira Superior (Haste do Pergaminho com Pomos Dourados)
          h.jsxs("div", {
            className: "w-[104%] h-8 rounded-full shadow-2xl flex items-center justify-between px-2 relative z-20 border-2 border-amber-900",
            style: {
              background: "linear-gradient(to bottom, #92400e 0%, #78350f 50%, #451a03 100%)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.7)",
            },
            children: [
              h.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 shadow border border-amber-700" }),
              h.jsxs("div", {
                className: "flex items-center gap-2 text-xs font-serif font-bold text-amber-200 tracking-wider uppercase",
                children: [
                  h.jsx("span", { children: isRunic ? "✦ ᚛ PERGAMINHO ARCANO ᚜ ✦" : "📜 ROLO DE PAPIRO ANTIGO" }),
                ],
              }),
              h.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 shadow border border-amber-700" }),
            ],
          }),

          // Folha de Papiro Aberta
          h.jsxs("div", {
            className: `w-full -mt-2 -mb-2 py-6 px-6 sm:px-10 flex-1 overflow-y-auto rounded-xl shadow-2xl relative border-x-4 border-amber-900/40 ${
              isRunic ? "bg-amber-50 shadow-purple-950/80" : "bg-amber-100 shadow-stone-950/80"
            }`,
            style: {
              background: isRunic
                ? "radial-gradient(ellipse at center, #fdf4ff 0%, #fae8ff 45%, #f5d0fe 85%, #f3e8ff 100%)"
                : "linear-gradient(180deg, #fef3c7 0%, #fde68a 15%, #fef3c7 85%, #fde68a 100%)",
              boxShadow: isRunic ? "0 0 35px rgba(168, 85, 247, 0.45)" : "0 10px 30px rgba(0,0,0,0.6)",
            },
            children: [
              // Botão Fechar no Canto Superior
              h.jsx("button", {
                onClick: onClose,
                className: "absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-stone-900/70 hover:bg-stone-900 text-amber-200 font-bold text-xs transition cursor-pointer active:scale-95 shadow border border-amber-600/40",
                title: "Enrolar pergaminho (Esc)",
                children: "✕ Fechar",
              }),

              // Cabeçalho do Pergaminho
              h.jsxs("div", {
                className: "text-center pb-4 mb-4 border-b-2 border-dashed border-amber-900/30",
                children: [
                  h.jsx("span", {
                    className: `text-xs font-mono font-bold uppercase tracking-widest ${isRunic ? "text-purple-700" : "text-amber-800"}`,
                    children: isRunic ? "᚛ ESCRITURA DOS ANTIGOS DEUSES ᚜" : "MANUSCRITO PRESERVADO",
                  }),
                  h.jsx("h2", {
                    className: `text-xl sm:text-2xl font-bold font-serif leading-tight mt-1 ${isRunic ? "text-purple-950" : "text-amber-950"}`,
                    children: data.name,
                  }),
                  h.jsxs("p", {
                    className: "text-xs font-serif italic text-stone-700 mt-1",
                    children: ["Origem: ", data.author],
                  }),
                ],
              }),

              // Se for o Pergaminho Rúnico Especial: Exibir Geometria Sagrada (Círculos, Triângulos e Runas)!
              isRunic && h.jsx(SacredGeometrySVG, { size: 210 }),

              // Seções de Texto do Pergaminho
              h.jsx("div", {
                className: "flex flex-col gap-5",
                children: sections.map((sec, idx) =>
                  h.jsxs(
                    "div",
                    {
                      className: `p-3.5 sm:p-4 rounded-xl border ${
                        isRunic
                          ? "bg-purple-900/10 border-purple-400/40 text-purple-950"
                          : "bg-amber-900/5 border-amber-700/20 text-stone-800"
                      }`,
                      children: [
                        h.jsxs("div", {
                          className: "flex items-center gap-2 mb-2 pb-1.5 border-b border-amber-900/15",
                          children: [
                            h.jsx("span", { className: "text-lg", children: sec.glyph || "📜" }),
                            h.jsx("h3", {
                              className: `text-sm sm:text-base font-bold font-serif ${isRunic ? "text-purple-900" : "text-amber-950"}`,
                              children: sec.title,
                            }),
                          ],
                        }),
                        h.jsx("p", {
                          className: "text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-line text-justify",
                          children: sec.text,
                        }),
                      ],
                    },
                    idx,
                  ),
                ),
              }),

              // Rodapé de Selo de Cera
              h.jsxs("div", {
                className: "mt-6 pt-4 border-t-2 border-dashed border-amber-900/30 flex items-center justify-between text-[11px] font-serif text-stone-600",
                children: [
                  h.jsx("span", { children: "Selo de Papiro Helênico" }),
                  h.jsx("div", {
                    className: "w-8 h-8 rounded-full bg-red-700 shadow-md flex items-center justify-center text-amber-200 text-xs font-bold border border-red-900",
                    title: "Selo de cera lacrado",
                    children: "⚜",
                  }),
                  h.jsx("span", { children: "Arquivos da Biblioteca" }),
                ],
              }),
            ],
          }),

          // Rolo de Madeira Inferior (Haste do Pergaminho com Pomos Dourados)
          h.jsxs("div", {
            className: "w-[104%] h-8 rounded-full shadow-2xl flex items-center justify-between px-2 relative z-20 border-2 border-amber-900",
            style: {
              background: "linear-gradient(to top, #92400e 0%, #78350f 50%, #451a03 100%)",
              boxShadow: "0 -4px 14px rgba(0,0,0,0.6)",
            },
            children: [
              h.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 shadow border border-amber-700" }),
              h.jsx("div", {
                className: "text-center text-[10px] font-mono text-amber-300",
                children: "Role para cima e para baixo para ler todo o papiro",
              }),
              h.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 shadow border border-amber-700" }),
            ],
          }),
        ],
      }),
    });
  }

  G.BookScrollReaderModal = BookScrollReaderModal;
})(window.Game);
