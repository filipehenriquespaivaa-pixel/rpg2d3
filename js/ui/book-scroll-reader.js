/* js/ui/book-scroll-reader.js
 * Visualizador Imersivo de Livros (com páginas folheáveis) e Pergaminhos (abertos com tema de papiro).
 * Padrão global: window.Game.BookScrollReaderModal
 * Cores aprimoradas com alto contraste, fundo escurecido/sépia antigo para eliminar ofuscamento e fadiga visual.
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
      className: "mx-auto my-3 filter drop-shadow-[0_0_16px_rgba(216,180,254,0.7)] animate-pulse",
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
                h.jsx("stop", { offset: "0%", stopColor: "#f0abfc" }),
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
          fill: "rgba(59, 7, 100, 0.4)",
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
          strokeWidth: "1.5",
        }),

        // 3. Primeiro Triângulo Sagrado (Apontando para cima: Fogo / Ascensão)
        h.jsx("polygon", {
          points: "100,20 170,140 30,140",
          fill: "rgba(234, 179, 8, 0.08)",
          stroke: "url(#goldRuneGrad)",
          strokeWidth: "2",
        }),

        // 4. Segundo Triângulo Sagrado (Apontando para baixo: Água / Abismo)
        h.jsx("polygon", {
          points: "100,180 170,60 30,60",
          fill: "rgba(168, 85, 247, 0.08)",
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
          fill: "rgba(147, 51, 234, 0.5)",
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
        h.jsx("text", { x: "100", y: "15", textAnchor: "middle", fill: "#fef08a", fontSize: "13", fontWeight: "bold", children: "🜂" }),
        h.jsx("text", { x: "100", y: "194", textAnchor: "middle", fill: "#f0abfc", fontSize: "13", fontWeight: "bold", children: "🜄" }),
        h.jsx("text", { x: "182", y: "64", textAnchor: "middle", fill: "#fef08a", fontSize: "13", fontWeight: "bold", children: "🜁" }),
        h.jsx("text", { x: "18", y: "64", textAnchor: "middle", fill: "#f0abfc", fontSize: "13", fontWeight: "bold", children: "🜃" }),
        h.jsx("text", { x: "182", y: "146", textAnchor: "middle", fill: "#fef08a", fontSize: "13", fontWeight: "bold", children: "✦" }),
        h.jsx("text", { x: "18", y: "146", textAnchor: "middle", fill: "#f0abfc", fontSize: "13", fontWeight: "bold", children: "✦" }),

        // Pequenas marcas nos anéis (geometria astral)
        h.jsx("line", { x1: "100", y1: "8", x2: "100", y2: "192", stroke: "rgba(234, 179, 8, 0.6)", strokeWidth: "1" }),
        h.jsx("line", { x1: "8", y1: "100", x2: "192", y2: "100", stroke: "rgba(192, 132, 252, 0.6)", strokeWidth: "1" }),
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

    // Preferência de tema: "dark" (padrão escuro de alto contraste) ou "sepia" (sépia envelhecido escurecido)
    const [theme, setTheme] = J.useState(() => {
      try {
        return localStorage.getItem("rpg_reader_theme") || "dark";
      } catch (e) {
        return "dark";
      }
    });

    // Preferência de tamanho de fonte: "normal" ou "large"
    const [fontSize, setFontSize] = J.useState(() => {
      try {
        return localStorage.getItem("rpg_reader_font") || "normal";
      } catch (e) {
        return "normal";
      }
    });

    const toggleTheme = () => {
      const next = theme === "dark" ? "sepia" : "dark";
      setTheme(next);
      try {
        localStorage.setItem("rpg_reader_theme", next);
      } catch (e) {}
    };

    const toggleFontSize = () => {
      const next = fontSize === "normal" ? "large" : "normal";
      setFontSize(next);
      try {
        localStorage.setItem("rpg_reader_font", next);
      } catch (e) {}
    };

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

    const isDark = theme === "dark";
    const isLarge = fontSize === "large";

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
        className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn",
        onClick: (e) => {
          if (e.target === e.currentTarget) onClose();
        },
        children: h.jsxs("div", {
          className: "relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border-4 shadow-2xl overflow-hidden",
          style: {
            backgroundColor: data.coverColor || "#381704",
            borderColor: data.accentColor || "#d97706",
            boxShadow: `0 0 45px rgba(0,0,0,0.9), 0 0 25px ${data.accentColor || "#d97706"}60, inset 0 0 20px rgba(0,0,0,0.85)`,
          },
          children: [
            // Fita Marcadora de Página decorativa vermelha suspensa
            h.jsx("div", {
              className: "absolute top-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-red-700 shadow-md z-30 pointer-events-none rounded-b-md flex justify-center items-end pb-1 border-x border-b border-red-950",
              children: h.jsx("div", { className: "w-2 h-2 bg-amber-400 rotate-45" }),
            }),

            // Cabeçalho da Encadernação (Couro com Friso Dourado)
            h.jsxs("div", {
              className: "flex items-center justify-between px-4 sm:px-6 py-3 border-b border-amber-500/30 bg-black/60 text-amber-200 z-20",
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

                // Botões de Controles (Alternar Fundo Escuro/Sépia, Tamanho de Fonte, Fechar)
                h.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    h.jsx("button", {
                      onClick: toggleTheme,
                      className: "px-2.5 py-1.5 rounded-xl bg-amber-950/90 hover:bg-amber-900 border border-amber-500/50 text-amber-200 hover:text-white font-bold text-xs transition cursor-pointer active:scale-95 shadow flex items-center gap-1.5",
                      title: "Alternar tom de fundo (Escuro Noturno / Sépia Antigo)",
                      children: [
                        h.jsx("span", { children: isDark ? "🌙 Modo Noturno" : "📜 Modo Sépia" }),
                      ],
                    }),
                    h.jsx("button", {
                      onClick: toggleFontSize,
                      className: "px-2.5 py-1.5 rounded-xl bg-amber-950/90 hover:bg-amber-900 border border-amber-500/50 text-amber-200 hover:text-white font-bold text-xs transition cursor-pointer active:scale-95 shadow",
                      title: "Alternar tamanho da letra",
                      children: isLarge ? "A-" : "A+",
                    }),
                    h.jsx("button", {
                      onClick: onClose,
                      className: "px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 hover:text-white font-bold text-xs transition cursor-pointer active:scale-95 shadow",
                      title: "Fechar livro (Esc)",
                      children: "✕ Fechar",
                    }),
                  ],
                }),
              ],
            }),

            // Corpo do Livro (Páginas Abertas com Fundo Escurecido Confortável para Leitura)
            h.jsxs("div", {
              className: "p-3 sm:p-5 flex-1 overflow-y-auto flex flex-col md:flex-row gap-4 items-stretch justify-center relative",
              style: {
                background: isDark
                  ? "linear-gradient(135deg, #19120c 0%, #120d08 50%, #0a0604 100%)"
                  : "linear-gradient(135deg, #947345 0%, #806135 50%, #70532c 100%)",
              },
              children: [
                // Lombada / Costura central decorativa (apenas em telas médias/grandes)
                h.jsx("div", {
                  className: "hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none shadow-inner z-10",
                  style: {
                    background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.7) 100%)",
                  },
                }),

                // ================= PÁGINA ESQUERDA =================
                h.jsxs("div", {
                  className: `flex-1 flex flex-col justify-between p-4 sm:p-6 rounded-2xl shadow-xl min-h-[360px] relative transition-colors ${
                    isDark
                      ? "bg-gradient-to-b from-[#221a13] to-[#18120c] border border-amber-600/30 text-stone-200"
                      : "bg-gradient-to-b from-[#bfa068] to-[#aa8b54] border-2 border-[#452808] text-[#0a0401]"
                  }`,
                  style: {
                    boxShadow: isDark
                      ? "inset 0 0 30px rgba(0,0,0,0.75), 0 4px 15px rgba(0,0,0,0.6)"
                      : "inset 0 0 25px rgba(45,20,5,0.35), 0 4px 15px rgba(0,0,0,0.5)",
                  },
                  children: [
                    leftPage
                      ? h.jsxs("div", {
                          className: "flex flex-col gap-2.5",
                          children: [
                            // Título da Seção / Capítulo
                            h.jsxs("div", {
                              className: `pb-2 text-center border-b ${
                                isDark ? "border-amber-500/25" : "border-[#452808]/40"
                              }`,
                              children: [
                                h.jsx("span", {
                                  className: `text-[11px] font-bold uppercase tracking-widest font-mono ${
                                    isDark ? "text-amber-400" : "text-[#2e1402]"
                                  }`,
                                  children: leftPage.chapter,
                                }),
                                h.jsx("h3", {
                                  className: `font-serif font-bold leading-tight mt-0.5 ${
                                    isLarge ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                                  } ${isDark ? "text-amber-200" : "text-[#120601] font-black"}`,
                                  children: leftPage.title,
                                }),
                                leftPage.subtitle &&
                                  h.jsx("p", {
                                    className: `text-xs italic font-serif ${
                                      isDark ? "text-amber-300/80" : "text-[#2b1202] font-semibold"
                                    }`,
                                    children: leftPage.subtitle,
                                  }),
                              ],
                            }),

                            // Conteúdo formatado com alto contraste e legibilidade
                            h.jsx("div", {
                              className: `font-serif leading-relaxed whitespace-pre-line my-2 text-justify ${
                                isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                              } ${
                                isDark ? "text-stone-200 font-normal" : "text-[#0a0401] font-medium"
                              }`,
                              children: leftPage.content,
                            }),

                            // Citação / Dica do autor
                            leftPage.flavor &&
                              h.jsx("div", {
                                className: `mt-2 p-3 rounded-lg border-l-4 italic font-serif text-xs leading-relaxed ${
                                  isDark
                                    ? "bg-amber-950/70 border-amber-500 text-amber-200"
                                    : "bg-[#8a6a38]/60 border-[#331602] text-[#0f0601] font-bold"
                                }`,
                                children: leftPage.flavor,
                              }),
                          ],
                        })
                      : h.jsx("div", {
                          className: `flex items-center justify-center h-full italic font-serif ${
                            isDark ? "text-stone-500" : "text-[#3b210a]"
                          }`,
                          children: "Página em branco.",
                        }),

                    // Rodapé da Página Esquerda
                    h.jsxs("div", {
                      className: `flex items-center justify-between pt-3 border-t text-[11px] font-mono ${
                        isDark ? "border-amber-500/20 text-amber-400/80" : "border-[#452808]/40 text-[#2e1402] font-bold"
                      }`,
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
                  className: `flex-1 flex flex-col justify-between p-4 sm:p-6 rounded-2xl shadow-xl min-h-[360px] relative transition-colors ${
                    isDark
                      ? "bg-gradient-to-b from-[#221a13] to-[#18120c] border border-amber-600/30 text-stone-200"
                      : "bg-gradient-to-b from-[#bfa068] to-[#aa8b54] border-2 border-[#452808] text-[#0a0401]"
                  }`,
                  style: {
                    boxShadow: isDark
                      ? "inset 0 0 30px rgba(0,0,0,0.75), 0 4px 15px rgba(0,0,0,0.6)"
                      : "inset 0 0 25px rgba(45,20,5,0.35), 0 4px 15px rgba(0,0,0,0.5)",
                  },
                  children: [
                    rightPage
                      ? h.jsxs("div", {
                          className: "flex flex-col gap-2.5",
                          children: [
                            h.jsxs("div", {
                              className: `pb-2 text-center border-b ${
                                isDark ? "border-amber-500/25" : "border-[#452808]/40"
                              }`,
                              children: [
                                h.jsx("span", {
                                  className: `text-[11px] font-bold uppercase tracking-widest font-mono ${
                                    isDark ? "text-amber-400" : "text-[#2e1402]"
                                  }`,
                                  children: rightPage.chapter,
                                }),
                                h.jsx("h3", {
                                  className: `font-serif font-bold leading-tight mt-0.5 ${
                                    isLarge ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                                  } ${isDark ? "text-amber-200" : "text-[#120601] font-black"}`,
                                  children: rightPage.title,
                                }),
                                rightPage.subtitle &&
                                  h.jsx("p", {
                                    className: `text-xs italic font-serif ${
                                      isDark ? "text-amber-300/80" : "text-[#2b1202] font-semibold"
                                    }`,
                                    children: rightPage.subtitle,
                                  }),
                              ],
                            }),
                            h.jsx("div", {
                              className: `font-serif leading-relaxed whitespace-pre-line my-2 text-justify ${
                                isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                              } ${
                                isDark ? "text-stone-200 font-normal" : "text-[#0a0401] font-medium"
                              }`,
                              children: rightPage.content,
                            }),
                            rightPage.flavor &&
                              h.jsx("div", {
                                className: `mt-2 p-3 rounded-lg border-l-4 italic font-serif text-xs leading-relaxed ${
                                  isDark
                                    ? "bg-amber-950/70 border-amber-500 text-amber-200"
                                    : "bg-[#8a6a38]/60 border-[#331602] text-[#0f0601] font-bold"
                                }`,
                                children: rightPage.flavor,
                              }),
                          ],
                        })
                      : h.jsxs("div", {
                          className: "flex flex-col items-center justify-center h-full text-center p-4",
                          children: [
                            h.jsx("div", {
                              className: `text-3xl mb-2 ${isDark ? "text-amber-500/40" : "text-[#452808]/50"}`,
                              children: "❦ ❦ ❦",
                            }),
                            h.jsx("p", {
                              className: `font-serif italic text-xs ${isDark ? "text-stone-400" : "text-[#2e1402] font-semibold"}`,
                              children: "Fim das páginas deste volume encadernado.",
                            }),
                            h.jsx("span", {
                              className: `text-[11px] font-mono mt-2 ${isDark ? "text-amber-400/70" : "text-[#3b2007]"}`,
                              children: "Consulte outros livros e estantes da biblioteca para mais saberes!",
                            }),
                          ],
                        }),

                    // Rodapé da Página Direita
                    h.jsxs("div", {
                      className: `flex items-center justify-between pt-3 border-t text-[11px] font-mono ${
                        isDark ? "border-amber-500/20 text-amber-400/80" : "border-[#452808]/40 text-[#2e1402] font-bold"
                      }`,
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
              className: "flex items-center justify-between px-5 py-3 border-t border-amber-500/30 bg-black/75 backdrop-blur",
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
              background: "linear-gradient(to bottom, #78350f 0%, #451a03 50%, #291002 100%)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.8)",
            },
            children: [
              h.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 shadow border border-amber-700" }),
              h.jsxs("div", {
                className: "flex items-center gap-2 text-xs font-serif font-bold text-amber-200 tracking-wider uppercase",
                children: [
                  h.jsx("span", { children: isRunic ? "✦ ᚛ PERGAMINHO ARCANO RÚNICO ᚜ ✦" : "📜 ROLO DE PAPIRO ANTIGO" }),
                ],
              }),
              h.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 shadow border border-amber-700" }),
            ],
          }),

          // Folha de Papiro Aberta com Fundo Escurecido Confortável para Leitura
          h.jsxs("div", {
            className: `w-full -mt-2 -mb-2 py-6 px-6 sm:px-10 flex-1 overflow-y-auto rounded-xl shadow-2xl relative border-x-4 ${
              isRunic
                ? "border-purple-500/60 shadow-purple-950/90 text-purple-100"
                : isDark
                ? "border-amber-800/60 shadow-black text-stone-200"
                : "border-[#452608] shadow-black text-[#0a0401]"
            }`,
            style: {
              background: isRunic
                ? "radial-gradient(ellipse at center, #26113b 0%, #170726 55%, #0b0213 100%)"
                : isDark
                ? "linear-gradient(180deg, #241910 0%, #19110a 20%, #130d07 80%, #1f150d 100%)"
                : "linear-gradient(180deg, #aa8854 0%, #987541 20%, #8e6c38 80%, #9e7b45 100%)",
              boxShadow: isRunic
                ? "0 0 45px rgba(168, 85, 247, 0.55), inset 0 0 40px rgba(0,0,0,0.85)"
                : isDark
                ? "0 15px 45px rgba(0,0,0,0.85), inset 0 0 40px rgba(0,0,0,0.75)"
                : "0 15px 40px rgba(0,0,0,0.75), inset 0 0 35px rgba(50,25,5,0.45)",
            },
            children: [
              // Barra Superior de Controles dentro do Pergaminho
              h.jsxs("div", {
                className: "flex items-center justify-between pb-3 mb-3 border-b border-amber-900/40",
                children: [
                  // Botão de Alternar Fundo e Tamanho da Fonte (para pergaminhos comuns)
                  !isRunic
                    ? h.jsxs("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                          h.jsx("button", {
                            onClick: toggleTheme,
                            className: "px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/90 border border-amber-500/40 text-amber-200 text-xs font-bold transition cursor-pointer active:scale-95 shadow",
                            title: "Alternar tom do papiro",
                            children: isDark ? "🌙 Noturno" : "📜 Sépia",
                          }),
                          h.jsx("button", {
                            onClick: toggleFontSize,
                            className: "px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/90 border border-amber-500/40 text-amber-200 text-xs font-bold transition cursor-pointer active:scale-95 shadow",
                            title: "Tamanho da letra",
                            children: isLarge ? "A-" : "A+",
                          }),
                        ],
                      })
                    : h.jsx("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                          h.jsx("button", {
                            onClick: toggleFontSize,
                            className: "px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 text-purple-200 text-xs font-bold transition cursor-pointer active:scale-95 shadow",
                            title: "Tamanho da letra",
                            children: isLarge ? "A-" : "A+",
                          }),
                        ],
                      }),

                  // Botão Fechar no Canto Superior
                  h.jsx("button", {
                    onClick: onClose,
                    className: "px-3 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 font-bold text-xs transition cursor-pointer active:scale-95 shadow border border-red-500/40",
                    title: "Enrolar pergaminho (Esc)",
                    children: "✕ Fechar",
                  }),
                ],
              }),

              // Cabeçalho do Pergaminho
              h.jsxs("div", {
                className: `text-center pb-4 mb-4 border-b-2 border-dashed ${
                  isRunic ? "border-purple-500/40" : isDark ? "border-amber-600/30" : "border-[#452608]/40"
                }`,
                children: [
                  h.jsx("span", {
                    className: `text-xs font-mono font-bold uppercase tracking-widest ${
                      isRunic ? "text-purple-300" : isDark ? "text-amber-400" : "text-[#2d1403] font-black"
                    }`,
                    children: isRunic ? "᚛ ESCRITURA DOS ANTIGOS DEUSES ᚜" : "MANUSCRITO PRESERVADO",
                  }),
                  h.jsx("h2", {
                    className: `text-xl sm:text-2xl font-bold font-serif leading-tight mt-1 ${
                      isRunic
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-amber-300 drop-shadow"
                        : isDark
                        ? "text-amber-200"
                        : "text-[#120601] font-black"
                    }`,
                    children: data.name,
                  }),
                  h.jsxs("p", {
                    className: `text-xs font-serif italic mt-1 ${
                      isRunic ? "text-purple-300/80" : isDark ? "text-stone-300" : "text-[#2e1302] font-bold"
                    }`,
                    children: ["Origem: ", data.author],
                  }),
                ],
              }),

              // Se for o Pergaminho Rúnico Especial: Exibir Geometria Sagrada (Círculos, Triângulos e Runas)!
              isRunic && h.jsx(SacredGeometrySVG, { size: 210 }),

              // Seções de Texto do Pergaminho
              h.jsx("div", {
                className: "flex flex-col gap-4",
                children: sections.map((sec, idx) =>
                  h.jsxs(
                    "div",
                    {
                      className: `p-3.5 sm:p-4 rounded-xl border shadow-md transition-colors ${
                        isRunic
                          ? "bg-purple-950/75 border-purple-400/40 text-purple-100"
                          : isDark
                          ? "bg-[#1b120a]/90 border-amber-600/40 text-stone-200"
                          : "bg-[#836334]/50 border-2 border-[#452406]/60 text-[#080301]"
                      }`,
                      children: [
                        h.jsxs("div", {
                          className: `flex items-center gap-2 mb-2 pb-1.5 border-b ${
                            isRunic
                              ? "border-purple-400/30"
                              : isDark
                              ? "border-amber-600/25"
                              : "border-[#452406]/40"
                          }`,
                          children: [
                            h.jsx("span", { className: "text-lg", children: sec.glyph || "📜" }),
                            h.jsx("h3", {
                              className: `font-serif font-bold ${
                                isLarge ? "text-base sm:text-lg" : "text-sm sm:text-base"
                              } ${
                                isRunic
                                  ? "text-amber-300"
                                  : isDark
                                  ? "text-amber-300"
                                  : "text-[#140601] font-extrabold"
                              }`,
                              children: sec.title,
                            }),
                          ],
                        }),
                        h.jsx("p", {
                          className: `font-serif leading-relaxed whitespace-pre-line text-justify ${
                            isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                          } ${
                            isRunic
                              ? "text-purple-100 font-normal"
                              : isDark
                              ? "text-stone-200 font-normal"
                              : "text-[#080301] font-medium"
                          }`,
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
                className: `mt-6 pt-4 border-t-2 border-dashed flex items-center justify-between text-[11px] font-serif ${
                  isRunic
                    ? "border-purple-500/40 text-purple-300"
                    : isDark
                    ? "border-amber-600/30 text-amber-400/80"
                    : "border-[#452608]/40 text-[#2e1402] font-bold"
                }`,
                children: [
                  h.jsx("span", { children: isRunic ? "Hieróglifo Rúnico de Delfos" : "Selo de Papiro Helênico" }),
                  h.jsx("div", {
                    className: `w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-xs font-bold border ${
                      isRunic
                        ? "bg-purple-900 border-purple-400 text-amber-300 shadow-purple-900/80"
                        : "bg-red-800 border-red-950 text-amber-200 shadow-red-950"
                    }`,
                    title: "Selo de cera lacrado",
                    children: isRunic ? "✦" : "⚜",
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
              background: "linear-gradient(to top, #78350f 0%, #451a03 50%, #291002 100%)",
              boxShadow: "0 -4px 14px rgba(0,0,0,0.7)",
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
