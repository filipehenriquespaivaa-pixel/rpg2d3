/* js/ui/inventory.js
 * Detalhe do item (ItemDetailPanel), modal do inventario (InventoryModal...) e chave do save (SAVE_KEY).
 * Trecho de legacy/app.original.js (linhas 41201-44888); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  const ItemDetailPanel = ({
      selectedItem: e,
      onCloseDetail: t,
      onPlaceInFusion: l,
      backpack: o,
      equipment: u,
      nearbyCampfire: m,
      onFeedCampfire: c,
      onFuseItems: f,
      onCloseParentModal: g,
      onEquipItem: y,
      onUseConsumable: w,
      onUnequipSlot: v,
      onRoastFish: T,
      onButcherCarcass: S,
      onDropItem: p,
      onMoveToBeltSlot: j,
      onInvertBeltSlot: P,
      onCookingPot: Ga,
      onOpenCookingModal: Ra = null,
    }) => {
      var A;
      const isPebble = (item) => {
        const name = (item?.name || "").toLowerCase();
        const id = (item?.id || "").toLowerCase();
        return name.includes("seixo") || id.includes("seixo") || id.includes("pebble");
      };
      return h.jsx("div", {
        className:
          "rounded-2xl border border-amber-500/20 bg-slate-950/85 p-3.5 flex flex-col justify-between min-h-[140px] shadow-lg",
        children: e
          ? h.jsxs("div", {
              className: "flex flex-col gap-2.5",
              children: [
                h.jsxs("div", {
                  className: "flex items-start justify-between",
                  children: [
                    h.jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [
                        h.jsx("div", {
                          className:
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 bg-slate-900 shadow-md",
                          style: {
                            borderColor: e.item.color || "#38bdf8",
                            boxShadow: `0 0 12px ${e.item.color || "#38bdf8"}40`,
                          },
                          children: h.jsx(ItemIcon, { item: e.item, size: 36 }),
                        }),
                        h.jsxs("div", {
                          children: [
                            h.jsx("h4", {
                              className:
                                "text-sm font-bold text-white leading-tight font-serif",
                              children: e.item.name,
                            }),
                            h.jsxs("div", {
                              className:
                                "flex items-center gap-2 text-[10px] mt-0.5",
                              children: [
                                h.jsx("span", {
                                  className: `font-bold uppercase tracking-wider ${RARITIES[e.item.rarity].text}`,
                                  children: e.item.rarity,
                                }),
                                h.jsx("span", {
                                  className: "text-slate-600",
                                  children: "•",
                                }),
                                e.item.slot
                                  ? h.jsxs("span", {
                                      className: "text-sky-300 font-semibold",
                                      children: [
                                        "Slot: ",
                                        ((A = EQUIPMENT_SLOTS[e.item.slot]) == null
                                          ? void 0
                                          : A.label) || e.item.slot,
                                      ],
                                    })
                                  : h.jsx("span", {
                                      className: "text-slate-400 capitalize",
                                      children: e.item.categoryType,
                                    }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    h.jsxs("div", {
                      className:
                        "flex items-center gap-1 text-amber-300 text-xs font-mono font-bold bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/20",
                      children: [
                        h.jsx(Iu, { className: "h-3.5 w-3.5 text-amber-400" }),
                        e.item.value || 10,
                      ],
                    }),
                  ],
                }),
                e.item.stats &&
                  h.jsxs("div", {
                    className: "flex flex-wrap gap-1.5 text-[11px] font-mono",
                    children: [
                      e.item.stats.attack &&
                        h.jsxs("span", {
                          className:
                            "bg-rose-950/70 border border-rose-500/40 text-rose-300 px-2 py-0.5 rounded-md font-bold",
                          children: ["+", e.item.stats.attack, " ATK"],
                        }),
                      e.item.stats.defense &&
                        h.jsxs("span", {
                          className:
                            "bg-sky-950/70 border border-sky-500/40 text-sky-300 px-2 py-0.5 rounded-md font-bold",
                          children: ["+", e.item.stats.defense, " DEF"],
                        }),
                      e.item.stats.speedBonusPercent &&
                        h.jsxs("span", {
                          className:
                            "bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-md font-bold",
                          children: [
                            "+",
                            e.item.stats.speedBonusPercent,
                            "% Vel",
                          ],
                        }),
                      e.item.stats.lightRadiusBonus &&
                        h.jsxs("span", {
                          className:
                            "bg-amber-950/70 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-md font-bold",
                          children: [
                            "+",
                            e.item.stats.lightRadiusBonus,
                            "% Luz",
                          ],
                        }),
                      e.item.stats.staminaBonus &&
                        h.jsxs("span", {
                          className:
                            "bg-purple-950/70 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded-md font-bold",
                          children: ["+", e.item.stats.staminaBonus, " Vigor"],
                        }),
                    ],
                  }),
                h.jsx("p", {
                  className: "text-xs text-slate-300 italic line-clamp-2",
                  children: e.item.description,
                }),
                h.jsxs("div", {
                  className:
                    "pt-2 flex flex-wrap items-center gap-2 border-t border-white/10",
                  children: [
                    e.source === "backpack" &&
                      Jb(e.item) &&
                      (() => {
                        const x = Qb(o, u),
                          M = u0(o, u),
                          $ = f0(e.item);
                        return h.jsx("div", {
                          className: "w-full flex flex-col gap-2 pt-1 pb-1",
                          children: h.jsxs("div", {
                            className:
                              "p-2.5 rounded-xl bg-gradient-to-r from-rose-950/60 via-slate-900/80 to-amber-950/50 border border-rose-500/40 flex flex-col gap-1.5 shadow-md",
                            children: [
                              h.jsxs("div", {
                                className:
                                  "flex items-center justify-between text-xs font-bold text-rose-300",
                                children: [
                                  h.jsxs("span", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                      h.jsx("span", {
                                        className: "text-base",
                                        children: $.icon,
                                      }),
                                      h.jsxs("span", {
                                        children: [
                                          $.name,
                                          " (",
                                          $.species,
                                          ")",
                                        ],
                                      }),
                                    ],
                                  }),
                                  x && M
                                    ? h.jsxs("span", {
                                        className:
                                          "text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono",
                                        children: ["🔪 ", M.name],
                                      })
                                    : h.jsx("span", {
                                        className:
                                          "text-[10px] text-rose-400 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded-full font-mono",
                                        children: "Sem Faca",
                                      }),
                                ],
                              }),
                              h.jsx("p", {
                                className:
                                  "text-[11px] text-slate-300 leading-tight",
                                children: $.exclusiveNote,
                              }),
                              x
                                ? h.jsxs("button", {
                                    id: "btn-destrinchar-carcass",
                                    onClick: () => {
                                      (S == null || S(e.item), t(), g());
                                    },
                                    className:
                                      "w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 active:scale-98 text-white text-xs font-black tracking-wide shadow-lg shadow-rose-950/80 cursor-pointer border border-rose-400/50 transition-all hover:shadow-rose-600/30 animate-pulse hover:animate-none",
                                    children: [
                                      h.jsx(Vu, {
                                        className: "h-4 w-4 text-rose-200",
                                      }),
                                      h.jsx("span", {
                                        children:
                                          "Destrinchar Criatura com Faca",
                                      }),
                                    ],
                                  })
                                : h.jsxs("div", {
                                    className:
                                      "mt-1 text-[11px] text-amber-300/90 bg-amber-950/40 border border-amber-500/30 p-2 rounded-lg text-center font-medium",
                                    children: [
                                      "🔪 ",
                                      h.jsx("strong", {
                                        children: "Faca Necessária:",
                                      }),
                                      " Equipe ou guarde uma Faca (Faca de Pedra, Faca de Caça, Adaga de Osso) na mochila para destrinchar e extrair ossos, pele, carne, entranhas e partes lendárias.",
                                    ],
                                  }),
                            ],
                          }),
                        });
                      })(),
                    e.source === "backpack" &&
                      h.jsxs("button", {
                        id: "insert-into-fusion-btn",
                        onClick: () => {
                          l(e.item);
                        },
                        className:
                          "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-amber-700/80 hover:bg-amber-600 active:scale-98 text-amber-100 text-xs font-bold transition shadow cursor-pointer border border-amber-500/30",
                        children: [
                          h.jsx(ui, {
                            className: "h-3.5 w-3.5 text-amber-300",
                          }),
                          "Colocar na Forja",
                        ],
                      }),
                    e.source === "backpack" &&
                      (() => {
                        const pn = ((e.item.id || "") + " " + (e.item.name || "")).toLowerCase();
                        const isPot = (pn.includes("panela") || pn.includes("caldeir")) && !pn.includes("secando");
                        if (!isPot) return null;
                        const fireLit = !!(m && m.prop && m.prop.lit !== false);
                        const potOnFire = !!(fireLit && m.prop.cookingPot);
                        return h.jsxs("button", {
                          id: "modal-put-pot-on-fire-btn",
                          onClick: () => {
                            (Ga == null || Ga(e.item), t());
                          },
                          disabled: !fireLit && !potOnFire,
                          className:
                            "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-600 active:scale-98 text-white text-xs font-bold transition shadow cursor-pointer border border-orange-400/40 disabled:opacity-40 disabled:cursor-not-allowed",
                          title: fireLit ? (potOnFire ? "Recolher a panela do fogo" : "Colocar esta panela/caldeirão na fogueira") : "Acenda uma fogueira próxima primeiro",
                          children: [
                            h.jsx("span", { className: "text-base", children: "🔥" }),
                            h.jsx("span", { children: fireLit ? (potOnFire ? "Recolher Panela do Fogo" : "Colocar no Fogo") : "Fogueira Apagada Perto" }),
                          ],
                        });
                      })(),
                    e.source === "backpack" &&
                      et(e.item, "galho") &&
                      h.jsxs("div", {
                        className: "w-full flex flex-col gap-1.5 pt-1",
                        children: [
                          m &&
                            h.jsxs("button", {
                              id: "modal-feed-nearby-campfire-btn",
                              onClick: () => {
                                (c == null || c(10), t());
                              },
                              disabled:
                                o.reduce(
                                  (x, M) =>
                                    et(M, "galho")
                                      ? x + (M.stackCount || 1)
                                      : x,
                                  0,
                                ) < 10,
                              className:
                                "w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-98 text-white text-xs font-bold transition shadow-lg shadow-emerald-950/60 cursor-pointer border border-emerald-300/40 disabled:opacity-50 disabled:cursor-not-allowed",
                              title:
                                "Alimentar fogueira próxima para aumentar seu tamanho e alcance de luz",
                              children: [
                                h.jsx(Lr, {
                                  className:
                                    "h-4 w-4 text-emerald-200 animate-pulse",
                                }),
                                h.jsx("span", {
                                  children:
                                    "🪵 Alimentar Fogueira Próxima (+10 Galhos)",
                                }),
                              ],
                            }),
                          o.reduce(
                            (x, M) =>
                              et(M, "galho") ? x + (M.stackCount || 1) : x,
                            0,
                          ) >= 10
                            ? h.jsxs("button", {
                                id: "build-map-campfire-btn",
                                onClick: () => {
                                  f &&
                                    (f(
                                      e.item,
                                      e.item,
                                      null,
                                      "choice_campfire_unlit",
                                    ),
                                    t(),
                                    g());
                                },
                                className:
                                  "w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 active:scale-98 text-white text-xs font-bold transition shadow-lg shadow-amber-950/60 cursor-pointer border border-amber-300/40",
                                children: [
                                  h.jsx(Lr, {
                                    className: "h-4 w-4 text-yellow-300",
                                  }),
                                  h.jsx("span", {
                                    children:
                                      "Montar Nova Fogueira no Mapa (10 Galhos)",
                                  }),
                                ],
                              })
                            : h.jsxs("div", {
                                className:
                                  "w-full text-center text-[11px] text-amber-300/80 bg-amber-950/30 px-2 py-1.5 rounded-lg border border-amber-500/20",
                                children: [
                                  "🏕️ Junte 10 galhos para montar uma fogueira no mapa (",
                                  o.reduce(
                                    (x, M) =>
                                      et(M, "galho")
                                        ? x + (M.stackCount || 1)
                                        : x,
                                    0,
                                  ),
                                  "/10)",
                                ],
                              }),
                        ],
                      }),
                    e.source === "backpack" &&
                      et(e.item, "pederneira") &&
                      h.jsxs("div", {
                        className:
                          "w-full text-[11px] text-sky-200 bg-sky-950/40 p-2 rounded-xl border border-sky-500/30 flex flex-col gap-0.5 mt-1",
                        children: [
                          h.jsxs("div", {
                            className:
                              "font-bold flex items-center gap-1 text-sky-300",
                            children: [
                              h.jsx("span", { children: "🪨" }),
                              h.jsx("span", {
                                children: "Acendedor de Fogueiras",
                              }),
                            ],
                          }),
                          h.jsx("div", {
                            className: "text-[10px] text-slate-300",
                            children:
                              "Tendo 2 Pederneiras, aproxime-se de qualquer fogueira apagada no mapa e pressione [E] para acendê-la com faíscas incandescentes sem gastar suas pederneiras!",
                          }),
                        ],
                      }),
                    e.source === "backpack" &&
                      (e.item.id.includes("caldeirao") ||
                        e.item.name.toLowerCase().includes("caldeirão") ||
                        e.item.id.includes("pote") ||
                        e.item.name.toLowerCase().includes("pote")) &&
                      h.jsxs("div", {
                        className:
                          "w-full text-[11px] text-amber-200 bg-amber-950/40 p-2 rounded-xl border border-amber-500/30 flex flex-col gap-0.5 mt-1",
                        children: [
                          h.jsxs("div", {
                            className:
                              "font-bold flex items-center gap-1 text-amber-300",
                            children: [
                              h.jsx("span", { children: "🏺" }),
                              h.jsx("span", {
                                children: "Recipiente Cerâmico Artesanal",
                              }),
                            ],
                          }),
                          h.jsx("div", {
                            className: "text-[10px] text-slate-300",
                            children:
                              "Este recipiente de barro cozido está vazio por enquanto.",
                          }),
                        ],
                      }),
                    e.source === "backpack" &&
                      (e.item.id.includes("fish") ||
                        e.item.name.toLowerCase().includes("peixe") ||
                        e.item.name.toLowerCase().includes("lambari") ||
                        e.item.name.toLowerCase().includes("tilapia") ||
                        e.item.name.toLowerCase().includes("tilápia") ||
                        e.item.name.toLowerCase().includes("cascudo") ||
                        e.item.name.toLowerCase().includes("truta")) &&
                      !e.item.name.toLowerCase().includes("assado") &&
                      h.jsxs("div", {
                        className:
                          "w-full text-[11px] text-orange-200 bg-orange-950/40 p-2 rounded-xl border border-orange-500/30 flex flex-col gap-1 mt-1",
                        children: [
                          h.jsxs("div", {
                            className:
                              "font-bold flex items-center gap-1 text-orange-300",
                            children: [
                              h.jsx("span", { children: "🍢" }),
                              h.jsx("span", {
                                children: "Assar no Espeto de Madeira",
                              }),
                            ],
                          }),
                          h.jsx("div", {
                            className: "text-[10px] text-slate-300",
                            children:
                              "Ao se aproximar de uma fogueira acesa com 1 peixe e 1 galho, coloque-o no espeto! Aguarde 1 minuto de preparo nas brasas para saborear um peixe crocante (+70 Vida, +90 Stamina).",
                          }),
                          m &&
                            m.prop.lit !== !1 &&
                            T &&
                            h.jsxs("button", {
                              id: "btn-card-roast-fish",
                              onClick: () => {
                                (T(), t(), g());
                              },
                              className:
                                "mt-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-md cursor-pointer transition active:scale-95",
                              children: [
                                h.jsx("span", { children: "🍢" }),
                                h.jsx("span", {
                                  children:
                                    "Colocar para Assar na Fogueira Próxima",
                                }),
                              ],
                            }),
                        ],
                      }),
                    e.source === "backpack" &&
                      fn(u) &&
                      (() => {
                        const x = To(e.item);
                        if (x.allowed) {
                          const M = Qs(
                              e.item,
                              u == null ? void 0 : u.cinto_slot1,
                            ),
                            $ = Qs(e.item, u == null ? void 0 : u.cinto_slot2);
                          return h.jsxs("div", {
                            className:
                              "w-full text-[11px] text-amber-200 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30 flex flex-col gap-1.5 mt-1",
                            children: [
                              h.jsxs("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  h.jsxs("div", {
                                    className:
                                      "font-bold flex items-center gap-1.5 text-amber-300",
                                    children: [
                                      h.jsx(Gs, {
                                        className: "h-3.5 w-3.5 text-amber-400",
                                      }),
                                      h.jsxs("span", {
                                        children: [
                                          "Compatível com Cinto (",
                                          x.categoryName,
                                          ")",
                                        ],
                                      }),
                                    ],
                                  }),
                                  h.jsxs("span", {
                                    className:
                                      "text-[10px] font-mono text-amber-300/90 bg-black/40 px-1.5 py-0.5 rounded border border-amber-500/30",
                                    children: ["Máx: ", x.maxCapacity, "x"],
                                  }),
                                ],
                              }),
                              j &&
                                h.jsxs("div", {
                                  className: "flex items-center gap-1.5 mt-0.5",
                                  children: [
                                    h.jsxs("button", {
                                      id: "btn-move-to-belt-1",
                                      disabled: !M.allowed,
                                      onClick: () => {
                                        (j(e.item, "cinto_slot1"), t());
                                      },
                                      className: `flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-bold transition shadow ${M.allowed ? "bg-amber-700 hover:bg-amber-600 text-white cursor-pointer active:scale-95" : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"}`,
                                      title: M.allowed
                                        ? "Colocar no Bolso 1 do Cinto"
                                        : M.reason || "Bolso indisponível",
                                      children: [
                                        h.jsx(uo, { className: "h-3.5 w-3.5" }),
                                        h.jsxs("span", {
                                          className: "truncate",
                                          children: [
                                            "Bolso 1 ",
                                            u != null && u.cinto_slot1
                                              ? `(${u.cinto_slot1.stackCount || 1}/${x.maxCapacity})`
                                              : "(Vazio)",
                                          ],
                                        }),
                                      ],
                                    }),
                                    h.jsxs("button", {
                                      id: "btn-move-to-belt-2",
                                      disabled: !$.allowed,
                                      onClick: () => {
                                        (j(e.item, "cinto_slot2"), t());
                                      },
                                      className: `flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-bold transition shadow ${$.allowed ? "bg-amber-700 hover:bg-amber-600 text-white cursor-pointer active:scale-95" : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"}`,
                                      title: $.allowed
                                        ? "Colocar no Bolso 2 do Cinto"
                                        : $.reason || "Bolso indisponível",
                                      children: [
                                        h.jsx(uo, { className: "h-3.5 w-3.5" }),
                                        h.jsxs("span", {
                                          className: "truncate",
                                          children: [
                                            "Bolso 2 ",
                                            u != null && u.cinto_slot2
                                              ? `(${u.cinto_slot2.stackCount || 1}/${x.maxCapacity})`
                                              : "(Vazio)",
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                            ],
                          });
                        } else
                          return h.jsxs("div", {
                            className:
                              "w-full text-[10px] text-slate-400 bg-black/35 p-1.5 rounded-lg border border-slate-800/80 flex items-center gap-1.5",
                            children: [
                              h.jsx("span", {
                                className:
                                  "text-amber-400/90 font-bold shrink-0",
                                children: "🎒 Cinto:",
                              }),
                              h.jsx("span", {
                                className: "leading-tight",
                                children: x.reason,
                              }),
                            ],
                          });
                      })(),
                    e.source === "equipment" &&
                      (e.slot === "cinto_slot1" || e.slot === "cinto_slot2") &&
                      h.jsxs("div", {
                        className:
                          "w-full text-[11px] text-amber-200 bg-amber-950/40 p-2 rounded-xl border border-amber-500/30 flex items-center justify-between",
                        children: [
                          h.jsxs("div", {
                            className:
                              "flex items-center gap-1.5 text-amber-300 font-bold",
                            children: [
                              h.jsx(uo, {
                                className: "h-3.5 w-3.5 text-amber-400",
                              }),
                              h.jsxs("span", {
                                children: [
                                  "Guardado no ",
                                  e.slot === "cinto_slot1"
                                    ? "Bolso I"
                                    : "Bolso II",
                                  " do Cinto",
                                ],
                              }),
                            ],
                          }),
                          h.jsxs("span", {
                            className:
                              "text-[10px] font-mono text-amber-300 bg-black/50 px-2 py-0.5 rounded-full border border-amber-500/30",
                            children: [
                              e.item.stackCount || 1,
                              "/",
                              To(e.item).maxCapacity,
                              " unid.",
                            ],
                          }),
                        ],
                      }),
                    e.source === "backpack" &&
                      e.item.isEquippable &&
                      e.item.slot &&
                      h.jsxs("button", {
                        id: "equip-item-action-btn",
                        onClick: () => {
                          (y(e.item), t());
                        },
                        className:
                          "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-bold transition shadow-lg shadow-emerald-950/50 cursor-pointer",
                        children: [
                          h.jsx($s, { className: "h-4 w-4" }),
                          "Equipar",
                        ],
                      }),
                    e.source === "backpack" &&
                      isPebble(e.item) &&
                      h.jsxs("div", {
                        className: "w-full flex gap-2",
                        children: [
                          h.jsxs("button", {
                            id: "equip-pebble-left-btn",
                            onClick: () => { (y(e.item, "mao_esquerda"), t()); },
                            className: "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-98 text-white text-xs font-bold transition cursor-pointer",
                            children: [h.jsx($s, { className: "h-4 w-4" }), "Mão Esq."],
                          }),
                          h.jsxs("button", {
                            id: "equip-pebble-right-btn",
                            onClick: () => { (y(e.item, "mao_direita"), t()); },
                            className: "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-bold transition cursor-pointer",
                            children: [h.jsx($s, { className: "h-4 w-4" }), "Mão Dir."],
                          }),
                        ],
                      }),
                    (e.source === "backpack" ||
                      e.slot === "cinto_slot1" ||
                      e.slot === "cinto_slot2") &&
                      e.item.categoryType === "consumable" &&
                      h.jsxs("button", {
                        id: "use-item-action-btn",
                        onClick: () => {
                          (w(e.item), t());
                        },
                        className:
                          "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white text-xs font-bold transition shadow-lg cursor-pointer",
                        children: [
                          h.jsx(Or, { className: "h-4 w-4" }),
                          "Usar ",
                          e.slot ? "do Cinto" : "",
                        ],
                      }),
                    e.source === "equipment" &&
                      (e.slot === "cinto_slot1" || e.slot === "cinto_slot2") &&
                      P &&
                      h.jsxs("button", {
                        id: "invert-belt-slot-action-btn",
                        onClick: () => {
                          ((e.slot === "cinto_slot1" ||
                            e.slot === "cinto_slot2") &&
                            P(e.slot),
                            t());
                        },
                        className:
                          "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white text-xs font-bold transition shadow-lg cursor-pointer",
                        title: `Inverter este item com a ${e.slot === "cinto_slot2" ? "Mão Direita" : "Mão Esquerda"}`,
                        children: [
                          h.jsx(di, { className: "h-4 w-4" }),
                          "Inverter (",
                          e.slot === "cinto_slot2" ? "Mão Dir" : "Mão Esq",
                          ")",
                        ],
                      }),
                    e.source === "equipment" &&
                      e.slot &&
                      h.jsxs("button", {
                        id: "unequip-item-action-btn",
                        onClick: () => {
                          e.slot && (v(e.slot), t());
                        },
                        className:
                          "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 active:scale-98 text-white text-xs font-bold transition shadow-lg cursor-pointer",
                        children: [
                          h.jsx(kp, { className: "h-4 w-4" }),
                          e.slot === "cinto_slot1" || e.slot === "cinto_slot2"
                            ? "Retirar para Mochila"
                            : "Desequipar",
                        ],
                      }),
                    e.source === "backpack" &&
                      p &&
                      ((e.item.stackCount || 1) > 1
                        ? h.jsxs("div", {
                            className: "flex items-center gap-1.5 flex-1",
                            children: [
                              h.jsxs("button", {
                                id: "drop-1-item-btn",
                                onClick: () => {
                                  p(e.item, !1);
                                  const x = e.item.stackCount || 1;
                                  x > 2
                                    ? (e.item.stackCount = x - 1)
                                    : x === 2
                                      ? (e.item.stackCount = 1)
                                      : t();
                                },
                                className:
                                  "flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-600/50 hover:border-rose-400 active:scale-98 text-rose-200 hover:text-white text-xs font-bold transition shadow cursor-pointer",
                                title:
                                  "Largar 1 unidade no chão (desaparece em 60s)",
                                children: [
                                  h.jsx(pl, {
                                    className: "h-3.5 w-3.5 text-rose-400",
                                  }),
                                  h.jsx("span", { children: "Largar 1" }),
                                ],
                              }),
                              h.jsxs("button", {
                                id: "drop-all-item-btn",
                                onClick: () => {
                                  (p(e.item, !0), t());
                                },
                                className:
                                  "flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-rose-900/90 hover:bg-rose-800 border border-rose-500/70 hover:border-rose-400 active:scale-98 text-rose-100 hover:text-white text-xs font-bold transition shadow cursor-pointer",
                                title: `Largar todos (${e.item.stackCount || 1}) no chão (desaparecem em 60s)`,
                                children: [
                                  h.jsx(pl, {
                                    className: "h-3.5 w-3.5 text-rose-300",
                                  }),
                                  h.jsxs("span", {
                                    children: [
                                      "Largar Todos (",
                                      e.item.stackCount || 1,
                                      ")",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          })
                        : h.jsxs("button", {
                            id: "drop-single-item-btn",
                            onClick: () => {
                              (p(e.item, !1), t());
                            },
                            className:
                              "flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-600/50 hover:border-rose-400 active:scale-98 text-rose-200 hover:text-white text-xs font-bold transition shadow cursor-pointer",
                            title:
                              "Largar no chão do mundo (desaparece após 60s)",
                            children: [
                              h.jsx(pl, {
                                className: "h-3.5 w-3.5 text-rose-400",
                              }),
                              h.jsx("span", { children: "Jogar Fora" }),
                            ],
                          })),
                    e.source === "equipment" &&
                      e.slot &&
                      p &&
                      h.jsxs("button", {
                        id: "drop-equipped-item-btn",
                        onClick: () => {
                          (p(e.item, !1, e.slot), t());
                        },
                        className:
                          "flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-600/50 hover:border-rose-400 active:scale-98 text-rose-300 hover:text-white text-xs font-bold transition shadow cursor-pointer",
                        title: "Jogar este item equipado fora no chão",
                        children: [
                          h.jsx(pl, { className: "h-3.5 w-3.5 text-rose-400" }),
                          h.jsx("span", {
                            className: "hidden sm:inline",
                            children: "Jogar Fora",
                          }),
                        ],
                      }),
                    h.jsx("button", {
                      onClick: t,
                      className:
                        "p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition",
                      title: "Fechar Detalhes",
                      children: h.jsx(mi, { className: "h-4 w-4" }),
                    }),
                  ],
                }),
              ],
            })
          : h.jsx("div", {
              className:
                "flex-1 flex flex-col items-center justify-center text-center p-3 text-slate-500",
              children: h.jsx("p", {
                className: "text-xs text-slate-400",
                children:
                  "Selecione um dos 6 slots para inspecionar atributos, equipar ou colocar na Forja.",
              }),
            }),
      });
    },
    InventoryModal = ({
      isOpen: e,
      onClose: t,
      equipment: l,
      backpack: o,
      onEquipItem: u,
      onUnequipSlot: m,
      onUseConsumable: c,
      onFuseItems: f,
      gold: g,
      nearbyCampfire: y = null,
      onFeedCampfire: w,
      onRoastFish: v,
      onButcherCarcass: T,
      onDropItem: S,
      onMoveToBeltSlot: p,
      onInvertBeltSlot: j,
      onCookingPot: Aa,
      onOpenCookingModal: Ra = null,
    }) => {
      var Sa, oa, ga;
      const [P, A] = J.useState(null),
        [x, M] = J.useState("all"),
        [$, z] = J.useState("itens"),
        [K, V] = J.useState("itens"),
        [O, _] = J.useState(null),
        [se, ue] = J.useState(null),
        [N, Ee] = J.useState(null),
        [ne, ke] = J.useState(null),
        [G, de] = J.useState(null),
        [W, le] = J.useState(!1),
        [te, oe] = J.useState(null);
      if (
        (J.useEffect(() => {
          const we = (je) => {
            (je.key === "Escape" ||
              je.key === "i" ||
              je.key === "I" ||
              je.key === "b" ||
              je.key === "B") &&
              e &&
              (je.preventDefault(), t());
          };
          return (
            e && window.addEventListener("keydown", we),
            () => window.removeEventListener("keydown", we)
          );
        }, [e, t]),
        J.useEffect(() => {
          (O && !o.some((we) => we.id === O.id) && _(null),
            se && !o.some((we) => we.id === se.id) && ue(null),
            N && !o.some((we) => we.id === N.id) && Ee(null));
        }, [o, O, se, N]),
        !e)
      )
        return null;
      const Ne = Ks(l),
        X = o.filter((we) =>
          x === "all"
            ? !0
            : x === "equipment"
              ? we.isEquippable
              : x === "material"
                ? we.categoryType === "material" ||
                  we.categoryType === "treasure"
                : x === "consumable"
                  ? we.categoryType === "consumable"
                  : !0,
        ),
        C = Zs(l.mochila),
        I = ot(l.mochila),
        be = ["chapeu", "capa", "camisa", "calca", "botas"],
        Me = [
          "mao_direita",
          "mao_esquerda",
          "bracelete_esquerdo",
          "bracelete_direito",
          "mochila",
        ],
        Te = s0(O, se, N),
        Fe =
          (Sa = Te == null ? void 0 : Te.results) != null &&
          Sa.some((we) => we.id === G)
            ? G || void 0
            : (ga =
                  (oa = Te == null ? void 0 : Te.results) == null
                    ? void 0
                    : oa[0]) == null
              ? void 0
              : ga.id,
        _e = Te ? Te.createResult(Fe) : null,
        xe = (we) => {
          const je = (Se) => {
              let Ae = 0;
              return (
                Se !== 1 && (O == null ? void 0 : O.id) === we.id && Ae++,
                Se !== 2 && (se == null ? void 0 : se.id) === we.id && Ae++,
                Se !== 3 && (N == null ? void 0 : N.id) === we.id && Ae++,
                Ae
              );
            },
            Be = (Se) => {
              const Ae = je(Se) + 1;
              return (we.stackCount || 1) < Ae
                ? (oe(
                    `Você precisa de pelo menos ${Ae} unidades deste item para usar em múltiplos slots!`,
                  ),
                  setTimeout(() => oe(null), 3e3),
                  !1)
                : !0;
            };
          if (ne === 1) {
            if (!Be(1)) return;
            (_(we), ke(se ? (N ? null : 3) : 2));
            return;
          }
          if (ne === 2) {
            if (!Be(2)) return;
            (ue(we), ke(N ? null : 3));
            return;
          }
          if (ne === 3) {
            if (!Be(3)) return;
            (Ee(we), ke(null));
            return;
          }
          if (O)
            if (se)
              if (N) {
                if (!Be(1)) return;
                (_(we), ke(2));
              } else {
                if (!Be(3)) return;
                (Ee(we), ke(null));
              }
            else {
              if (!Be(2)) return;
              (ue(we), ke(3));
            }
          else {
            if (!Be(1)) return;
            (_(we), ke(2));
          }
        },
        Ue = () => {
          if (
            !Te ||
            !f ||
            !O ||
            (!se && Te.id !== "fuse_campfire_unlit") ||
            (Te.ingredient3Name && !N)
          )
            return;
          const we = f(O, se || O, N, Fe);
          we &&
            (_(null),
            ue(null),
            Ee(null),
            ke(null),
            we.isMapConstruction
              ? (oe("🏕️ Fogueira montada com 10 galhos no terreno do mapa!"),
                A(null))
              : (oe(`⚡ Fusão Concluída: ${we.name}!`),
                A({ item: we, source: "backpack" })),
            setTimeout(() => oe(null), 4e3));
        },
        $a = (we) => {
          if (we.id === "fuse_campfire_unlit")
            return (
              o.reduce(
                (Se, Ae) =>
                  Ae.name.toLowerCase().includes("galho") ||
                  Ae.id.includes("galho")
                    ? Se + (Ae.stackCount || 1)
                    : Se,
                0,
              ) >= 10
            );
          if (!!!we.ingredient3Name) {
            for (let Be = 0; Be < o.length; Be++) {
              const Se = o[Be];
              for (let Ae = 0; Ae < o.length; Ae++) {
                const fa = o[Ae];
                if (Be === Ae) {
                  if ((Se.stackCount || 1) >= 2 && we.match(Se, Se, null))
                    return !0;
                } else if (we.match(Se, fa, null)) return !0;
              }
            }
            return !1;
          }
          for (let Be = 0; Be < o.length; Be++) {
            const Se = o[Be];
            for (let Ae = 0; Ae < o.length; Ae++) {
              const fa = o[Ae];
              for (let Oe = 0; Oe < o.length; Oe++) {
                const Wa = o[Oe];
                let Ve = 1,
                  ra = 1,
                  ct = 1;
                if (Be === Ae && Ae === Oe) {
                  if (((Ve = 3), (Se.stackCount || 1) < Ve)) continue;
                } else if (Be === Ae) {
                  if (
                    ((Ve = 2),
                    (Se.stackCount || 1) < Ve || (Wa.stackCount || 1) < ct)
                  )
                    continue;
                } else if (Be === Oe) {
                  if (
                    ((Ve = 2),
                    (Se.stackCount || 1) < Ve || (fa.stackCount || 1) < ra)
                  )
                    continue;
                } else if (
                  Ae === Oe &&
                  ((ra = 2),
                  (fa.stackCount || 1) < ra || (Se.stackCount || 1) < Ve)
                )
                  continue;
                if (we.match(Se, fa, Wa)) return !0;
              }
            }
          }
          return !1;
        },
        Ie = (we) => {
          if (we.id === "fuse_campfire_unlit") {
            const Be = o.find(
              (Se) =>
                Se.name.toLowerCase().includes("galho") ||
                Se.id.includes("galho"),
            );
            if (Be) {
              (_(Be), ue(Be), Ee(null), de("choice_campfire_unlit"), le(!1));
              return;
            }
          }
          if (!!!we.ingredient3Name) {
            for (let Be = 0; Be < o.length; Be++) {
              const Se = o[Be];
              for (let Ae = 0; Ae < o.length; Ae++) {
                const fa = o[Ae];
                if (Be === Ae) {
                  if ((Se.stackCount || 1) >= 2 && we.match(Se, Se, null)) {
                    (_(Se), ue(Se), Ee(null), le(!1));
                    return;
                  }
                } else if (we.match(Se, fa, null)) {
                  (_(Se), ue(fa), Ee(null), le(!1));
                  return;
                }
              }
            }
            return;
          }
          for (let Be = 0; Be < o.length; Be++) {
            const Se = o[Be];
            for (let Ae = 0; Ae < o.length; Ae++) {
              const fa = o[Ae];
              for (let Oe = 0; Oe < o.length; Oe++) {
                const Wa = o[Oe];
                let Ve = 1,
                  ra = 1,
                  ct = 1;
                if (Be === Ae && Ae === Oe) {
                  if (((Ve = 3), (Se.stackCount || 1) < Ve)) continue;
                } else if (Be === Ae) {
                  if (
                    ((Ve = 2),
                    (Se.stackCount || 1) < Ve || (Wa.stackCount || 1) < ct)
                  )
                    continue;
                } else if (Be === Oe) {
                  if (
                    ((Ve = 2),
                    (Se.stackCount || 1) < Ve || (fa.stackCount || 1) < ra)
                  )
                    continue;
                } else if (
                  Ae === Oe &&
                  ((ra = 2),
                  (fa.stackCount || 1) < ra || (Se.stackCount || 1) < Ve)
                )
                  continue;
                if (we.match(Se, fa, Wa)) {
                  (_(Se), ue(fa), Ee(Wa), le(!1));
                  return;
                }
              }
            }
          }
        },
        ee = (we) => {
          const je = l[we],
            Be =
              (P == null ? void 0 : P.source) === "equipment" &&
              (P == null ? void 0 : P.slot) === we,
            Se = je ? RARITIES[je.rarity] : null;
          return h.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-1",
              children: [
                h.jsxs("button", {
                  id: `equip-slot-${we}`,
                  onClick: () => {
                    je && A({ item: je, source: "equipment", slot: we });
                  },
                  className: `relative group w-13 h-13 sm:w-15 sm:h-15 rounded-xl flex items-center justify-center transition-all cursor-pointer ${Be ? "ring-2 ring-amber-400 border-2 border-amber-300 bg-amber-950/50 shadow-lg shadow-amber-900/50 scale-105" : je ? `${Se == null ? void 0 : Se.border} border-2 bg-slate-900/90 hover:scale-105 hover:border-amber-400/80 shadow-md` : "border-2 border-slate-700/60 bg-slate-950/80 hover:border-slate-500/80 shadow-inner"}`,
                  style: {
                    boxShadow: je
                      ? `0 0 10px ${je.color || "#38bdf8"}30`
                      : void 0,
                  },
                  title: `${d0[we]}: ${je ? je.name : "Vazio"}`,
                  children: [
                    je
                      ? h.jsx("div", {
                          className: "flex items-center justify-center p-1",
                          children: h.jsx(ItemIcon, { item: je, size: 36 }),
                        })
                      : h.jsx("div", {
                          className:
                            "opacity-40 group-hover:opacity-70 transition-opacity",
                          children: Kb(we, "h-6 w-6 text-slate-500"),
                        }),
                    je &&
                      h.jsx("div", {
                        className:
                          "absolute top-1 right-1 w-2 h-2 rounded-full shadow-sm",
                        style: { backgroundColor: je.color || "#38bdf8" },
                      }),
                  ],
                }),
                h.jsx("span", {
                  className:
                    "text-[10px] font-semibold text-slate-400 tracking-wider truncate max-w-[62px]",
                  children: d0[we],
                }),
              ],
            },
            we,
          );
        },
        He = (we, je) => {
          const Be = fn(l),
            Se = l[we],
            Ae =
              (P == null ? void 0 : P.source) === "equipment" &&
              (P == null ? void 0 : P.slot) === we,
            fa = Se ? To(Se) : null,
            Oe = Se ? RARITIES[Se.rarity] : null;
          return Be
            ? h.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-0.5",
                  children: [
                    h.jsxs("button", {
                      id: `belt-pocket-slot-${je}`,
                      onClick: () => {
                        Se && A({ item: Se, source: "equipment", slot: we });
                      },
                      className: `relative group w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${Ae ? "ring-2 ring-amber-400 border-2 border-amber-300 bg-amber-950/70 shadow-lg scale-105" : Se ? `${Oe == null ? void 0 : Oe.border} border-2 bg-slate-900/90 hover:scale-105 hover:border-amber-400/80 shadow-md` : "border border-dashed border-amber-600/50 bg-amber-950/30 hover:border-amber-400/80 shadow-inner"}`,
                      title: `Bolso ${je} do Cinto: ${Se ? `${Se.name} (${Se.stackCount || 1}/${(fa == null ? void 0 : fa.maxCapacity) || 1})` : "Vazio (Frascos 3x, Ferramenta/Arma 1x, Aranhas/Escorpiões 3x, Gosma/Coelho 1x)"}`,
                      children: [
                        Se
                          ? h.jsx("div", {
                              className:
                                "flex items-center justify-center p-0.5",
                              children: h.jsx(ItemIcon, { item: Se, size: 22 }),
                            })
                          : h.jsx("div", {
                              className:
                                "flex flex-col items-center justify-center text-amber-500/70 group-hover:text-amber-300",
                              children: h.jsx(fi, { className: "h-2.5 w-2.5" }),
                            }),
                        Se &&
                          h.jsxs("span", {
                            className:
                              "absolute -bottom-1 -right-1 px-1 rounded-full bg-amber-500 text-black text-[7px] font-mono font-bold shadow",
                            children: [
                              Se.stackCount || 1,
                              "/",
                              (fa == null ? void 0 : fa.maxCapacity) || 1,
                            ],
                          }),
                        h.jsx("span", {
                          className:
                            "absolute -top-1 -left-1 px-0.5 rounded bg-black/80 text-[7px] font-mono text-amber-400 border border-amber-500/30",
                          children: je,
                        }),
                      ],
                    }),
                    h.jsxs("span", {
                      className:
                        "text-[8px] font-mono font-bold text-amber-400/80",
                      children: ["Bolso ", je],
                    }),
                  ],
                },
                we,
              )
            : h.jsxs(
                "div",
                {
                  className:
                    "relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-dashed border-slate-800 bg-slate-950/70 flex flex-col items-center justify-center text-slate-600 select-none opacity-50",
                  title: "Bolso Bloqueado: Requer Cinto Equipado",
                  children: [
                    h.jsx(qp, { className: "h-3 w-3 text-slate-600" }),
                    h.jsxs("span", {
                      className: "text-[6px] font-mono text-slate-600",
                      children: ["B", je],
                    }),
                  ],
                },
                we,
              );
        };
      return h.jsx("div", {
        id: "inventory-modal-backdrop",
        className:
          "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200",
        onClick: (we) => {
          we.target === we.currentTarget && t();
        },
        children: h.jsxs("div", {
          id: "inventory-panel",
          className:
            "relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-100 shadow-2xl overflow-hidden",
          children: [
            h.jsxs("div", {
              className:
                "flex items-center justify-between px-4 sm:px-6 py-3 border-b border-amber-500/20 bg-slate-950/90",
              children: [
                h.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    h.jsx("div", {
                      className:
                        "flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-400",
                      children: h.jsx(uo, { className: "h-4 w-4" }),
                    }),
                    h.jsx("div", {
                      children: h.jsx("h2", {
                        className:
                          "text-sm sm:text-base font-bold text-amber-100 tracking-wider uppercase font-serif",
                        children: "Inventário do Personagem & Forja",
                      }),
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    h.jsxs("div", {
                      className:
                        "flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono shadow-inner",
                      children: [
                        h.jsx(Iu, { className: "h-4 w-4 text-amber-400" }),
                        h.jsxs("span", { children: [g, " Ouro"] }),
                      ],
                    }),
                    h.jsx("button", {
                      id: "inventory-close-btn",
                      onClick: t,
                      className:
                        "p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-white/10",
                      title: "Fechar (ESC ou [I])",
                      children: h.jsx(mi, { className: "h-5 w-5" }),
                    }),
                  ],
                }),
              ],
            }),
            h.jsxs("div", {
              className:
                "grid grid-cols-5 gap-1.5 px-4 sm:px-6 py-2 bg-slate-950/60 border-b border-white/5 text-xs",
              children: [
                h.jsxs("div", {
                  className:
                    "flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-slate-900/60 border border-rose-500/20 text-rose-300 font-mono",
                  children: [
                    h.jsx(Uu, {
                      className: "h-3.5 w-3.5 text-rose-400 shrink-0",
                    }),
                    h.jsx("span", {
                      className: "font-bold",
                      children: Ne.attack,
                    }),
                    h.jsx("span", {
                      className: "text-[10px] text-slate-400 hidden sm:inline",
                      children: "ATK",
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className:
                    "flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-slate-900/60 border border-sky-500/20 text-sky-300 font-mono",
                  children: [
                    h.jsx(Ys, {
                      className: "h-3.5 w-3.5 text-sky-400 shrink-0",
                    }),
                    h.jsx("span", {
                      className: "font-bold",
                      children: Ne.defense,
                    }),
                    h.jsx("span", {
                      className: "text-[10px] text-slate-400 hidden sm:inline",
                      children: "DEF",
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className:
                    "flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-slate-900/60 border border-emerald-500/20 text-emerald-300 font-mono",
                  children: [
                    h.jsx(zu, {
                      className: "h-3.5 w-3.5 text-emerald-400 shrink-0",
                    }),
                    h.jsxs("span", {
                      className: "font-bold",
                      children: ["+", Ne.speedBonusPercent, "%"],
                    }),
                    h.jsx("span", {
                      className: "text-[10px] text-slate-400 hidden sm:inline",
                      children: "VEL",
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className:
                    "flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-slate-900/60 border border-amber-500/20 text-amber-300 font-mono",
                  children: [
                    h.jsx(Lr, {
                      className: "h-3.5 w-3.5 text-amber-400 shrink-0",
                    }),
                    h.jsxs("span", {
                      className: "font-bold",
                      children: ["+", Ne.lightRadiusBonus, "%"],
                    }),
                    h.jsx("span", {
                      className: "text-[10px] text-slate-400 hidden sm:inline",
                      children: "LUZ",
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className:
                    "flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-slate-900/60 border border-purple-500/20 text-purple-300 font-mono",
                  children: [
                    h.jsx(Yu, {
                      className: "h-3.5 w-3.5 text-purple-400 shrink-0",
                    }),
                    h.jsx("span", {
                      className: "font-bold",
                      children: Ne.staminaBonus,
                    }),
                    h.jsx("span", {
                      className: "text-[10px] text-slate-400 hidden sm:inline",
                      children: "VIGOR",
                    }),
                  ],
                }),
              ],
            }),
            h.jsxs("div", {
              className: "flex md:hidden border-b border-white/10 bg-slate-950",
              children: [
                h.jsxs("button", {
                  onClick: () => V("hero"),
                  className: `flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${K === "hero" ? "border-amber-400 text-amber-300 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"}`,
                  children: [
                    h.jsx($u, { className: "h-3.5 w-3.5" }),
                    "Equipamentos",
                  ],
                }),
                h.jsxs("button", {
                  onClick: () => {
                    (V("itens"), z("itens"));
                  },
                  className: `flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${K === "itens" ? "border-amber-400 text-amber-300 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"}`,
                  children: [
                    h.jsx(dn, { className: "h-3.5 w-3.5" }),
                    "Itens (",
                    o.length,
                    "/",
                    I,
                    ")",
                  ],
                }),
                h.jsxs("button", {
                  onClick: () => {
                    (V("forja"), z("forja"));
                  },
                  className: `flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${K === "forja" ? "border-amber-400 text-amber-300 bg-slate-900/50" : "border-transparent text-slate-400 hover:text-slate-200"}`,
                  children: [h.jsx(ui, { className: "h-3.5 w-3.5" }), "Forja"],
                }),
              ],
            }),
            h.jsxs("div", {
              className:
                "flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 p-3 sm:p-5 overflow-y-auto",
              children: [
                h.jsx("div", {
                  className: `flex flex-col gap-3 ${K === "hero" ? "flex" : "hidden md:flex"} md:col-span-5 lg:col-span-5`,
                  children: h.jsxs("div", {
                    className:
                      "rounded-2xl border border-amber-500/20 bg-slate-950/70 p-3 sm:p-4 flex flex-col justify-between flex-1 shadow-inner",
                    children: [
                      h.jsxs("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                          h.jsxs("span", {
                            className:
                              "text-xs font-bold uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5 font-serif",
                            children: [
                              h.jsx(Ys, {
                                className: "h-3.5 w-3.5 text-amber-400",
                              }),
                              "Equipamento do Herói",
                            ],
                          }),
                          h.jsx("span", {
                            className: "text-[10px] text-slate-500 font-mono",
                            children: "12 Slots",
                          }),
                        ],
                      }),
                      h.jsxs("div", {
                        className:
                          "grid grid-cols-3 gap-2 sm:gap-3 py-2 items-center justify-items-center",
                        children: [
                          h.jsx("div", {
                            className:
                              "flex flex-col gap-2.5 sm:gap-3 items-center",
                            children: be.map(ee),
                          }),
                          h.jsxs("div", {
                            className:
                              "flex flex-col items-center justify-between h-full py-1 gap-2",
                            children: [
                              ee("pingente"),
                              h.jsxs("div", {
                                className:
                                  "relative w-20 h-28 sm:w-24 sm:h-32 rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-900/90 to-slate-950/90 flex flex-col items-center justify-center shadow-inner overflow-hidden my-auto",
                                children: [
                                  h.jsx("div", {
                                    className:
                                      "absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60",
                                  }),
                                  h.jsx($u, {
                                    className:
                                      "h-14 w-14 sm:h-16 sm:w-16 text-slate-600/70 drop-shadow-md",
                                  }),
                                  h.jsx("div", {
                                    className:
                                      "mt-1 text-[9px] font-bold text-amber-400 uppercase tracking-widest font-mono",
                                    children: "Herói",
                                  }),
                                ],
                              }),
                              h.jsxs("div", {
                                className:
                                  "flex flex-col items-center gap-1 w-full",
                                children: [
                                  ee("cinto"),
                                  h.jsxs("div", {
                                    className:
                                      "flex items-center gap-1.5 justify-center mt-0.5",
                                    children: [
                                      He("cinto_slot1", 1),
                                      He("cinto_slot2", 2),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          h.jsx("div", {
                            className:
                              "flex flex-col gap-2.5 sm:gap-3 items-center",
                            children: Me.map(ee),
                          }),
                        ],
                      }),
                      h.jsx("div", {
                        className:
                          "text-center text-[10px] text-slate-500 pt-1 border-t border-white/5",
                        children:
                          "Toque em um slot para inspecionar ou desequipar",
                      }),
                    ],
                  }),
                }),
                h.jsxs("div", {
                  className: `flex flex-col gap-3 ${K !== "hero" ? "flex" : "hidden md:flex"} md:col-span-7 lg:col-span-7`,
                  children: [
                    h.jsxs("div", {
                      className:
                        "hidden md:flex items-center gap-2 p-1.5 bg-slate-950/90 rounded-2xl border border-amber-500/30 shadow-md",
                      children: [
                        h.jsxs("button", {
                          id: "tab-btn-itens",
                          onClick: () => {
                            (z("itens"), V("itens"));
                          },
                          className: `flex-1 py-2 px-4 rounded-xl text-xs font-bold font-serif flex items-center justify-center gap-2 transition cursor-pointer ${$ === "itens" ? "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow-lg shadow-amber-950/50 border border-amber-300/40 scale-[1.01]" : "text-slate-400 hover:text-amber-200 hover:bg-slate-900/80 border border-transparent"}`,
                          children: [
                            h.jsx(dn, { className: "h-4 w-4" }),
                            h.jsx("span", { children: "Itens" }),
                            h.jsxs("span", {
                              className: `text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${$ === "itens" ? "bg-amber-950/80 text-amber-200 border border-amber-400/40" : "bg-slate-800 text-slate-300"}`,
                              children: [o.length, "/", I],
                            }),
                          ],
                        }),
                        h.jsxs("button", {
                          id: "tab-btn-forja",
                          onClick: () => {
                            (z("forja"), V("forja"));
                          },
                          className: `flex-1 py-2 px-4 rounded-xl text-xs font-bold font-serif flex items-center justify-center gap-2 transition cursor-pointer ${$ === "forja" ? "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow-lg shadow-amber-950/50 border border-amber-300/40 scale-[1.01]" : "text-slate-400 hover:text-amber-200 hover:bg-slate-900/80 border border-transparent"}`,
                          children: [
                            h.jsx(ui, { className: "h-4 w-4" }),
                            h.jsx("span", { children: "Forja" }),
                            (O || se) &&
                              h.jsx("span", {
                                className:
                                  "w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse",
                              }),
                          ],
                        }),
                      ],
                    }),
                    $ === "forja" &&
                      h.jsxs(h.Fragment, {
                        children: [
                          h.jsxs("div", {
                            id: "fusion-chamber-container",
                            className:
                              "rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 p-3 sm:p-3.5 shadow-xl relative overflow-hidden",
                            children: [
                              h.jsxs("div", {
                                className:
                                  "flex items-center justify-between mb-2",
                                children: [
                                  h.jsxs("div", {
                                    className:
                                      "flex items-center gap-1.5 text-amber-300 font-serif font-bold text-xs",
                                    children: [
                                      h.jsx(ui, {
                                        className: "h-3.5 w-3.5 text-amber-400",
                                      }),
                                      h.jsx("span", {
                                        className: "tracking-wide",
                                        children:
                                          "Mesa de Fusão & Forja (Até 3 Itens)",
                                      }),
                                    ],
                                  }),
                                  h.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      h.jsxs("button", {
                                        id: "btn-toggle-codex",
                                        onClick: () => le(!W),
                                        className:
                                          "flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 text-[11px] font-semibold transition",
                                        title: "Ver livro de fórmulas de fusão",
                                        children: [
                                          h.jsx(ju, {
                                            className: "h-3 w-3 text-amber-400",
                                          }),
                                          h.jsxs("span", {
                                            children: [
                                              "Fórmulas (",
                                              bl.length,
                                              ")",
                                            ],
                                          }),
                                        ],
                                      }),
                                      (O || se || N) &&
                                        h.jsxs("button", {
                                          onClick: () => {
                                            (_(null),
                                              ue(null),
                                              Ee(null),
                                              ke(null),
                                              de(null));
                                          },
                                          className:
                                            "text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 transition",
                                          title: "Limpar mesa de fusão",
                                          children: [
                                            h.jsx($p, {
                                              className: "h-2.5 w-2.5",
                                            }),
                                            "Limpar",
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                              te &&
                                h.jsxs("div", {
                                  className:
                                    "mb-2 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold flex items-center justify-between animate-in fade-in",
                                  children: [
                                    h.jsx("span", { children: te }),
                                    h.jsx("button", {
                                      onClick: () => oe(null),
                                      className:
                                        "text-amber-300 hover:text-white",
                                      children: h.jsx(mi, {
                                        className: "h-3.5 w-3.5",
                                      }),
                                    }),
                                  ],
                                }),
                              h.jsxs("div", {
                                className:
                                  "flex items-center justify-between gap-1 sm:gap-1.5 p-2 rounded-xl bg-black/40 border border-amber-500/20 overflow-x-auto",
                                children: [
                                  h.jsxs("div", {
                                    className:
                                      "flex flex-col items-center gap-1 flex-1 min-w-[50px]",
                                    children: [
                                      h.jsx("button", {
                                        id: "fusion-socket-1",
                                        onClick: () => {
                                          O ? _(null) : ke(1);
                                        },
                                        className: `relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center transition-all cursor-pointer ${ne === 1 ? "ring-2 ring-amber-400 border-2 border-amber-300 bg-amber-950/60 shadow-lg scale-105" : O ? "border-2 border-amber-500/60 bg-slate-900/90 hover:border-amber-400 shadow-md" : "border-2 border-dashed border-slate-700/80 bg-slate-950/60 hover:border-slate-500"}`,
                                        title: O
                                          ? `${O.name} (Clique para retirar)`
                                          : "Clique para selecionar item 1",
                                        children: O
                                          ? h.jsxs(h.Fragment, {
                                              children: [
                                                h.jsx(ItemIcon, {
                                                  item: O,
                                                  size: 30,
                                                }),
                                                h.jsx("span", {
                                                  className:
                                                    "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white flex items-center justify-center text-[10px] font-bold border border-white/20",
                                                  children: "×",
                                                }),
                                              ],
                                            })
                                          : h.jsxs("div", {
                                              className:
                                                "flex flex-col items-center justify-center text-slate-500",
                                              children: [
                                                h.jsx(fi, {
                                                  className: "h-3.5 w-3.5",
                                                }),
                                                h.jsx("span", {
                                                  className:
                                                    "text-[8px] font-mono",
                                                  children: "Item 1",
                                                }),
                                              ],
                                            }),
                                      }),
                                      h.jsx("span", {
                                        className:
                                          "text-[9px] text-slate-400 font-semibold truncate max-w-[60px] text-center",
                                        children: O
                                          ? O.name.split(" ")[0]
                                          : "Material 1",
                                      }),
                                    ],
                                  }),
                                  h.jsx("span", {
                                    className:
                                      "text-amber-500/80 font-bold text-sm select-none shrink-0",
                                    children: "+",
                                  }),
                                  h.jsxs("div", {
                                    className:
                                      "flex flex-col items-center gap-1 flex-1 min-w-[50px]",
                                    children: [
                                      h.jsx("button", {
                                        id: "fusion-socket-2",
                                        onClick: () => {
                                          se ? ue(null) : ke(2);
                                        },
                                        className: `relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center transition-all cursor-pointer ${ne === 2 ? "ring-2 ring-amber-400 border-2 border-amber-300 bg-amber-950/60 shadow-lg scale-105" : se ? "border-2 border-amber-500/60 bg-slate-900/90 hover:border-amber-400 shadow-md" : "border-2 border-dashed border-slate-700/80 bg-slate-950/60 hover:border-slate-500"}`,
                                        title: se
                                          ? `${se.name} (Clique para retirar)`
                                          : "Clique para selecionar item 2",
                                        children: se
                                          ? h.jsxs(h.Fragment, {
                                              children: [
                                                h.jsx(ItemIcon, {
                                                  item: se,
                                                  size: 30,
                                                }),
                                                h.jsx("span", {
                                                  className:
                                                    "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white flex items-center justify-center text-[10px] font-bold border border-white/20",
                                                  children: "×",
                                                }),
                                              ],
                                            })
                                          : h.jsxs("div", {
                                              className:
                                                "flex flex-col items-center justify-center text-slate-500",
                                              children: [
                                                h.jsx(fi, {
                                                  className: "h-3.5 w-3.5",
                                                }),
                                                h.jsx("span", {
                                                  className:
                                                    "text-[8px] font-mono",
                                                  children: "Item 2",
                                                }),
                                              ],
                                            }),
                                      }),
                                      h.jsx("span", {
                                        className:
                                          "text-[9px] text-slate-400 font-semibold truncate max-w-[60px] text-center",
                                        children: se
                                          ? se.name.split(" ")[0]
                                          : "Material 2",
                                      }),
                                    ],
                                  }),
                                  h.jsx("span", {
                                    className:
                                      "text-amber-500/80 font-bold text-sm select-none shrink-0",
                                    children: "+",
                                  }),
                                  h.jsxs("div", {
                                    className:
                                      "flex flex-col items-center gap-1 flex-1 min-w-[50px]",
                                    children: [
                                      h.jsx("button", {
                                        id: "fusion-socket-3",
                                        onClick: () => {
                                          N ? Ee(null) : ke(3);
                                        },
                                        className: `relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center transition-all cursor-pointer ${ne === 3 ? "ring-2 ring-amber-400 border-2 border-amber-300 bg-amber-950/60 shadow-lg scale-105" : N ? "border-2 border-amber-500/60 bg-slate-900/90 hover:border-amber-400 shadow-md" : "border-2 border-dashed border-amber-700/40 bg-slate-950/40 hover:border-amber-500/60"}`,
                                        title: N
                                          ? `${N.name} (Clique para retirar)`
                                          : "Clique para selecionar 3º item",
                                        children: N
                                          ? h.jsxs(h.Fragment, {
                                              children: [
                                                h.jsx(ItemIcon, {
                                                  item: N,
                                                  size: 30,
                                                }),
                                                h.jsx("span", {
                                                  className:
                                                    "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white flex items-center justify-center text-[10px] font-bold border border-white/20",
                                                  children: "×",
                                                }),
                                              ],
                                            })
                                          : h.jsxs("div", {
                                              className:
                                                "flex flex-col items-center justify-center text-slate-500",
                                              children: [
                                                h.jsx(fi, {
                                                  className:
                                                    "h-3.5 w-3.5 text-amber-500/60",
                                                }),
                                                h.jsx("span", {
                                                  className:
                                                    "text-[8px] font-mono text-amber-400/70",
                                                  children: "Item 3",
                                                }),
                                              ],
                                            }),
                                      }),
                                      h.jsx("span", {
                                        className:
                                          "text-[9px] text-slate-400 font-semibold truncate max-w-[60px] text-center",
                                        children: N
                                          ? N.name.split(" ")[0]
                                          : "Item 3",
                                      }),
                                    ],
                                  }),
                                  h.jsx("div", {
                                    className:
                                      "flex flex-col items-center shrink-0 px-0.5",
                                    children: h.jsx(Sp, {
                                      className: `h-4 w-4 ${Te ? "text-amber-400 animate-pulse" : "text-slate-600"}`,
                                    }),
                                  }),
                                  h.jsxs("div", {
                                    className:
                                      "flex flex-col items-center gap-1 flex-1 min-w-[50px]",
                                    children: [
                                      h.jsx("div", {
                                        id: "fusion-socket-result",
                                        className: `relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center transition-all ${_e ? "border-2 border-amber-400 bg-amber-950/40 shadow-lg shadow-amber-950/80 ring-1 ring-amber-400/50" : O && se ? "border-2 border-rose-500/50 bg-rose-950/20" : "border-2 border-slate-800 bg-slate-950/60"}`,
                                        style: {
                                          boxShadow: _e
                                            ? `0 0 12px ${_e.color || "#f59e0b"}40`
                                            : void 0,
                                        },
                                        title: _e
                                          ? `Resultado: ${_e.name}`
                                          : "Resultado da Fusão",
                                        children: _e
                                          ? h.jsx(ItemIcon, { item: _e, size: 30 })
                                          : O && se
                                            ? h.jsx(Du, {
                                                className:
                                                  "h-5 w-5 text-rose-400/80",
                                              })
                                            : h.jsx(Or, {
                                                className:
                                                  "h-4 w-4 text-slate-700",
                                              }),
                                      }),
                                      h.jsx("span", {
                                        className: `text-[9px] font-semibold truncate max-w-[66px] text-center ${_e ? "text-amber-300 font-bold" : O && se ? "text-rose-400" : "text-slate-500"}`,
                                        children: _e
                                          ? _e.name.split(" ")[0]
                                          : O && se
                                            ? "Instável"
                                            : "Resultado",
                                      }),
                                    ],
                                  }),
                                  h.jsx("div", {
                                    className:
                                      "shrink-0 flex items-center pl-1",
                                    children: h.jsxs("button", {
                                      id: "btn-execute-fusion",
                                      disabled: !_e,
                                      onClick: Ue,
                                      className: `px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-lg ${_e ? "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-amber-950/70 active:scale-95 cursor-pointer ring-1 ring-amber-300/60" : "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"}`,
                                      children: [
                                        h.jsx(ui, { className: "h-3.5 w-3.5" }),
                                        h.jsx("span", {
                                          children:
                                            (_e != null &&
                                              _e.name
                                                .toLowerCase()
                                                .includes("barro")) ||
                                            (_e != null &&
                                              _e.name
                                                .toLowerCase()
                                                .includes("argila"))
                                              ? "Moldar"
                                              : _e != null &&
                                                  _e.isMapConstruction
                                                ? "Construir"
                                                : "Fundir",
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                              (Te == null ? void 0 : Te.results) &&
                                Te.results.length > 1 &&
                                h.jsxs("div", {
                                  className:
                                    "mt-2 p-2 rounded-xl bg-amber-950/40 border border-amber-500/40 flex flex-col gap-1.5 animate-in fade-in",
                                  children: [
                                    h.jsx("div", {
                                      className:
                                        "flex items-center justify-between text-[11px] font-bold text-amber-300 px-0.5",
                                      children: h.jsxs("span", {
                                        className: "flex items-center gap-1",
                                        children: [
                                          h.jsx(Or, {
                                            className:
                                              "h-3.5 w-3.5 text-amber-400",
                                          }),
                                          "Escolha o Resultado Desejado (",
                                          Te.results.length,
                                          " opções):",
                                        ],
                                      }),
                                    }),
                                    h.jsx("div", {
                                      className:
                                        "grid grid-cols-1 sm:grid-cols-2 gap-1.5",
                                      children: Te.results.map((we) => {
                                        const je =
                                            (Fe || Te.results[0].id) === we.id,
                                          Be = we.createResult();
                                        return h.jsxs(
                                          "button",
                                          {
                                            type: "button",
                                            onClick: () => de(we.id),
                                            className: `p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${je ? "border-amber-400 bg-amber-500/25 ring-1 ring-amber-400 shadow-md text-amber-100" : "border-slate-800 bg-slate-900/70 hover:border-slate-700 text-slate-300"}`,
                                            children: [
                                              h.jsx(ItemIcon, { item: Be, size: 28 }),
                                              h.jsxs("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                  h.jsx("div", {
                                                    className:
                                                      "text-xs font-bold truncate text-white",
                                                    children: we.name,
                                                  }),
                                                  h.jsx("div", {
                                                    className:
                                                      "text-[10px] text-amber-300/80 truncate",
                                                    children:
                                                      we.categoryLabel ||
                                                      we.description,
                                                  }),
                                                ],
                                              }),
                                              je &&
                                                h.jsx($s, {
                                                  className:
                                                    "h-4 w-4 text-amber-400 shrink-0",
                                                }),
                                            ],
                                          },
                                          we.id,
                                        );
                                      }),
                                    }),
                                  ],
                                }),
                              h.jsxs("div", {
                                className:
                                  "mt-1.5 text-[10px] text-slate-400 flex items-center justify-between px-1",
                                children: [
                                  _e && Te
                                    ? h.jsxs("span", {
                                        className:
                                          "text-emerald-300 font-semibold flex items-center gap-1 truncate",
                                        children: [
                                          h.jsx($s, {
                                            className:
                                              "h-3 w-3 text-emerald-400 inline shrink-0",
                                          }),
                                          h.jsxs("span", {
                                            className: "truncate",
                                            children: [
                                              "Fórmula identificada: ",
                                              Te.name,
                                            ],
                                          }),
                                        ],
                                      })
                                    : O && se
                                      ? h.jsx("span", {
                                          className: "text-rose-400 truncate",
                                          children:
                                            "Esta combinação não reage. Adicione um 3º item ou consulte o livro de fórmulas!",
                                        })
                                      : ne
                                        ? h.jsxs("span", {
                                            className:
                                              "text-amber-300 animate-pulse truncate",
                                            children: [
                                              "Selecione um item da mochila abaixo para o Slot ",
                                              ne,
                                              "...",
                                            ],
                                          })
                                        : h.jsx("span", {
                                            className:
                                              "text-slate-500 truncate",
                                            children:
                                              "Toque nos itens da mochila para colocar nos Slots 1, 2 ou 3 para forjar.",
                                          }),
                                  (_e == null ? void 0 : _e.stats) &&
                                    h.jsxs("span", {
                                      className:
                                        "text-amber-300 font-mono text-[10px] hidden sm:inline shrink-0 pl-2",
                                      children: [
                                        _e.stats.attack
                                          ? `+${_e.stats.attack} ATK `
                                          : "",
                                        _e.stats.defense
                                          ? `+${_e.stats.defense} DEF `
                                          : "",
                                        _e.stats.speedBonusPercent
                                          ? `+${_e.stats.speedBonusPercent}% VEL `
                                          : "",
                                        _e.stats.staminaBonus
                                          ? `+${_e.stats.staminaBonus} VIG `
                                          : "",
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                          h.jsx(Zb, {
                            isOpen: W,
                            onClose: () => le(!1),
                            backpack: o,
                            canPlayerCraftRecipe: $a,
                            onAutoFillRecipe: Ie,
                            onFuseItems: f,
                            onCloseParentModal: t,
                          }),
                          h.jsxs("div", {
                            className:
                              "rounded-2xl border border-amber-500/20 bg-slate-950/70 p-3 sm:p-4 flex flex-col shadow-inner",
                            children: [
                              h.jsxs("div", {
                                className:
                                  "flex items-center justify-between mb-2",
                                children: [
                                  h.jsxs("span", {
                                    className:
                                      "text-xs font-bold uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5 font-serif",
                                    children: [
                                      h.jsx(dn, {
                                        className: "h-3.5 w-3.5 text-amber-400",
                                      }),
                                      "Seus Itens (",
                                      o.length,
                                      "/",
                                      I,
                                      " Slots)",
                                    ],
                                  }),
                                  h.jsx("span", {
                                    className:
                                      "text-[11px] text-slate-400 font-mono",
                                    children:
                                      "Toque para inserir no Slot 1 ou 2",
                                  }),
                                ],
                              }),
                              h.jsx("div", {
                                className: `grid gap-2 p-1.5 bg-black/25 rounded-xl border border-white/5 max-h-52 overflow-y-auto ${I === 21 ? "grid-cols-3 sm:grid-cols-6 md:grid-cols-7" : I === 12 ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-6" : "grid-cols-3 sm:grid-cols-6"}`,
                                children: Array.from({ length: I }).map(
                                  (we, je) => {
                                    const Be = t0(je, C),
                                      Se = c0[Be],
                                      Ae = o[je];
                                    if (!Ae)
                                      return h.jsxs(
                                        "div",
                                        {
                                          className: `w-full aspect-square rounded-xl border border-dashed ${Se.emptyBorderClass} ${Se.emptyBgClass} flex flex-col items-center justify-center text-[10px] select-none p-1 transition-colors`,
                                          children: [
                                            h.jsxs("span", {
                                              className: `font-mono text-[9px] font-bold ${Se.emptyTextClass}`,
                                              children: ["#", je + 1],
                                            }),
                                            h.jsx("span", {
                                              className: `text-[7px] font-bold uppercase tracking-wider ${Se.emptyTextClass}`,
                                              children: Se.badge,
                                            }),
                                          ],
                                        },
                                        `forge-tray-empty-${je}`,
                                      );
                                    const fa =
                                        (O == null ? void 0 : O.id) === Ae.id,
                                      Oe =
                                        (se == null ? void 0 : se.id) === Ae.id;
                                    return (
                                      RARITIES[Ae.rarity],
                                      h.jsxs(
                                        "button",
                                        {
                                          id: `forge-tray-item-${Ae.id}`,
                                          onClick: () => {
                                            (xe(Ae),
                                              A({
                                                item: Ae,
                                                source: "backpack",
                                              }));
                                          },
                                          className: `relative group w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer p-1 ${fa || Oe ? "ring-2 ring-amber-400 border-2 border-amber-300 bg-amber-950/50 scale-105" : `${Se.cardBorderClass} border-2 ${Se.cardBgClass} hover:scale-105`}`,
                                          title: `Clique para colocar ${Ae.name} na forja (Slot #${je + 1} - ${Se.name})`,
                                          children: [
                                            h.jsxs("span", {
                                              className: `absolute top-0.5 left-0.5 text-[7px] font-mono font-bold px-1 rounded border ${Se.badgeClass}`,
                                              children: ["#", je + 1],
                                            }),
                                            h.jsx(ItemIcon, { item: Ae, size: 26 }),
                                            h.jsx("span", {
                                              className:
                                                "text-[9px] font-medium text-slate-200 truncate w-full text-center leading-tight mt-0.5",
                                              children: Ae.name,
                                            }),
                                            Ae.stackCount &&
                                              Ae.stackCount > 1 &&
                                              h.jsxs("span", {
                                                className:
                                                  "absolute bottom-0.5 right-0.5 bg-black/85 px-1 rounded text-[8px] font-mono font-bold text-amber-300 border border-amber-500/30",
                                                children: ["x", Ae.stackCount],
                                              }),
                                            (fa || Oe) &&
                                              h.jsx("span", {
                                                className:
                                                  "absolute top-0.5 right-0.5 px-1 rounded bg-amber-500 text-black text-[8px] font-bold font-mono",
                                                children: fa
                                                  ? "Slot 1"
                                                  : "Slot 2",
                                              }),
                                          ],
                                        },
                                        Ae.id,
                                      )
                                    );
                                  },
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                    $ === "itens" &&
                      h.jsxs("div", {
                        className:
                          "rounded-2xl border border-amber-500/20 bg-slate-950/70 p-3 sm:p-4 flex flex-col shadow-inner",
                        children: [
                          h.jsxs("div", {
                            className:
                              "flex flex-wrap items-center justify-between gap-2 mb-2",
                            children: [
                              h.jsxs("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                  h.jsxs("span", {
                                    className:
                                      "text-xs font-bold uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5 font-serif",
                                    children: [
                                      h.jsx(dn, {
                                        className: "h-3.5 w-3.5 text-amber-400",
                                      }),
                                      "Itens do Aventureiro (",
                                      I,
                                      " Slots)",
                                    ],
                                  }),
                                  C === "none" &&
                                    h.jsx("span", {
                                      className:
                                        "text-[10px] font-bold text-amber-300/90 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded-full",
                                      children: "6 Primários",
                                    }),
                                  C === "bolsa" &&
                                    h.jsxs("span", {
                                      className:
                                        "text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm shadow-emerald-950",
                                      children: [
                                        h.jsx(uo, {
                                          className: "h-3 w-3 text-emerald-400",
                                        }),
                                        "Bolsa (+6 Slots)",
                                      ],
                                    }),
                                  C === "mochila" &&
                                    h.jsxs("span", {
                                      className:
                                        "text-[10px] font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-500/50 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm shadow-indigo-950",
                                      children: [
                                        h.jsx(uo, {
                                          className: "h-3 w-3 text-indigo-400",
                                        }),
                                        "Mochila (+15 Slots)",
                                      ],
                                    }),
                                ],
                              }),
                              h.jsxs("span", {
                                className: `text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${o.length >= I ? "bg-rose-950/70 border-rose-500/50 text-rose-300" : "bg-amber-950/50 border-amber-500/30 text-amber-400"}`,
                                children: [o.length, " / ", I, " Slots"],
                              }),
                            ],
                          }),
                          h.jsxs("div", {
                            className:
                              "flex flex-wrap items-center gap-2 mb-2.5 px-2 py-1.5 bg-black/40 rounded-xl border border-white/5 text-[11px]",
                            children: [
                              h.jsxs("div", {
                                className:
                                  "flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/50 text-amber-300 font-medium",
                                children: [
                                  h.jsx("span", {
                                    className:
                                      "w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]",
                                  }),
                                  h.jsx("span", {
                                    children: "1 a 6: Primários",
                                  }),
                                ],
                              }),
                              C === "bolsa"
                                ? h.jsxs("div", {
                                    className:
                                      "flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-400/60 text-emerald-300 font-medium shadow-sm",
                                    children: [
                                      h.jsx("span", {
                                        className:
                                          "w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]",
                                      }),
                                      h.jsx("span", {
                                        children: "7 a 12: Bolsa (+6)",
                                      }),
                                    ],
                                  })
                                : C === "mochila"
                                  ? h.jsxs("div", {
                                      className:
                                        "flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-950/70 border border-indigo-400/60 text-indigo-300 font-medium shadow-sm",
                                      children: [
                                        h.jsx("span", {
                                          className:
                                            "w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_6px_#6366f1]",
                                        }),
                                        h.jsx("span", {
                                          children: "7 a 21: Mochila (+15)",
                                        }),
                                      ],
                                    })
                                  : h.jsx("span", {
                                      className:
                                        "text-[10px] text-slate-400 italic",
                                      children:
                                        "💡 Equipe uma Bolsa (+6) ou Mochila (+15) no slot de Mochila para ganhar slots extras!",
                                    }),
                            ],
                          }),
                          h.jsxs("div", {
                            className:
                              "flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 mb-3 text-[11px]",
                            children: [
                              h.jsxs("button", {
                                onClick: () => M("all"),
                                className: `flex-1 py-1 px-2 rounded-lg text-center font-semibold transition ${x === "all" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`,
                                children: ["Todos (", o.length, ")"],
                              }),
                              h.jsx("button", {
                                onClick: () => M("equipment"),
                                className: `flex-1 py-1 px-2 rounded-lg text-center font-semibold transition ${x === "equipment" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`,
                                children: "Equip",
                              }),
                              h.jsx("button", {
                                onClick: () => M("material"),
                                className: `flex-1 py-1 px-2 rounded-lg text-center font-semibold transition ${x === "material" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`,
                                children: "Recursos",
                              }),
                              h.jsx("button", {
                                onClick: () => M("consumable"),
                                className: `flex-1 py-1 px-2 rounded-lg text-center font-semibold transition ${x === "consumable" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`,
                                children: "Poções",
                              }),
                            ],
                          }),
                          h.jsxs("div", {
                            className:
                              "flex flex-col sm:flex-row items-center justify-between gap-2 p-2 bg-slate-950/80 rounded-xl border border-amber-500/25 shadow-inner",
                            children: [
                              h.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  h.jsx("div", {
                                    className:
                                      "w-7 h-7 rounded-lg bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400",
                                    children: h.jsx(Gs, {
                                      className: "h-3.5 w-3.5",
                                    }),
                                  }),
                                  h.jsxs("div", {
                                    children: [
                                      h.jsxs("div", {
                                        className:
                                          "text-[11px] font-bold text-amber-200 font-serif flex items-center gap-1.5",
                                        children: [
                                          h.jsx("span", {
                                            children: "Bolsos do Cinto",
                                          }),
                                          fn(l)
                                            ? h.jsx("span", {
                                                className:
                                                  "text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/40",
                                                children: "2 Slots Ativos",
                                              })
                                            : h.jsx("span", {
                                                className:
                                                  "text-[9px] font-mono text-slate-400 bg-slate-900/60 px-1.5 py-0.2 rounded border border-slate-700",
                                                children: "Requer Cinto",
                                              }),
                                        ],
                                      }),
                                      h.jsx("div", {
                                        className: "text-[9px] text-slate-400",
                                        children: fn(l)
                                          ? "Frascos (até 3x) • Armas/Ferramentas (1x) • Aranhas/Escorpiões (até 3x) • Gosma/Coelho (1x)"
                                          : "Equipe uma corda/cinto no herói para liberar 2 bolsos rápidos",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              h.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  He("cinto_slot1", 1),
                                  He("cinto_slot2", 2),
                                ],
                              }),
                            ],
                          }),
                          h.jsx("div", {
                            className: `p-2 bg-black/25 rounded-2xl border border-white/5 min-h-[190px] max-h-[380px] overflow-y-auto ${I === 21 ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2" : I === 12 ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5" : "grid grid-cols-2 sm:grid-cols-3 gap-2.5"}`,
                            children: Array.from({ length: I }).map(
                              (we, je) => {
                                const Be = t0(je, C),
                                  Se = c0[Be],
                                  Ae = X[je];
                                if (!Ae)
                                  return h.jsxs(
                                    "div",
                                    {
                                      className: `w-full aspect-[4/3] rounded-2xl border-2 border-dashed ${Se.emptyBorderClass} ${Se.emptyBgClass} flex flex-col items-center justify-between p-2 select-none shadow-inner transition-colors`,
                                      children: [
                                        h.jsxs("div", {
                                          className:
                                            "w-full flex items-center justify-between",
                                          children: [
                                            h.jsxs("span", {
                                              className: `text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${Se.badgeClass}`,
                                              children: ["#", je + 1],
                                            }),
                                            h.jsx("span", {
                                              className: `text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${Se.badgeClass}`,
                                              children: Se.badge,
                                            }),
                                          ],
                                        }),
                                        h.jsxs("div", {
                                          className:
                                            "flex flex-col items-center justify-center my-auto gap-0.5",
                                          children: [
                                            h.jsx(fi, {
                                              className: `h-4 w-4 ${Se.emptyTextClass}`,
                                            }),
                                            h.jsx("span", {
                                              className: `text-[10px] font-mono font-medium ${Se.emptyTextClass}`,
                                              children: "Vazio",
                                            }),
                                          ],
                                        }),
                                        h.jsx("div", {
                                          className: "w-full text-center",
                                          children: h.jsxs("span", {
                                            className: `text-[8px] font-mono uppercase tracking-wider ${Se.emptyTextClass} opacity-75`,
                                            children: ["Slot ", Se.name],
                                          }),
                                        }),
                                      ],
                                    },
                                    `empty-slot-${je}`,
                                  );
                                const fa =
                                    (P == null ? void 0 : P.source) ===
                                      "backpack" &&
                                    (P == null ? void 0 : P.item.id) === Ae.id,
                                  Oe = (O == null ? void 0 : O.id) === Ae.id,
                                  Wa = (se == null ? void 0 : se.id) === Ae.id,
                                  Ve = Oe || Wa;
                                return h.jsxs(
                                  "button",
                                  {
                                    id: `item-slot-${je}`,
                                    onClick: () => {
                                      (ne !== null && xe(Ae),
                                        A({ item: Ae, source: "backpack" }));
                                    },
                                    className: `relative group w-full aspect-[4/3] rounded-2xl p-2 flex flex-col items-center justify-between transition-all cursor-pointer ${fa ? "ring-2 ring-amber-400 border-2 border-amber-300 bg-amber-950/70 shadow-xl scale-[1.02]" : Ve ? "ring-2 ring-amber-500/70 border-2 border-amber-400/80 bg-amber-950/30" : `${Se.cardBorderClass} border-2 ${Se.cardBgClass} hover:scale-[1.02]`}`,
                                    style: {
                                      boxShadow: `0 0 12px ${Se.glowColor}25`,
                                    },
                                    title: `${Ae.name} (${Ae.rarity}) - Slot #${je + 1} [${Se.name}]`,
                                    children: [
                                      h.jsxs("div", {
                                        className:
                                          "w-full flex items-center justify-between",
                                        children: [
                                          h.jsxs("span", {
                                            className: `text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${Se.badgeClass}`,
                                            children: ["#", je + 1],
                                          }),
                                          Ve
                                            ? h.jsx("span", {
                                                className:
                                                  "px-1 py-0.2 rounded bg-amber-500 text-black text-[8px] font-bold font-mono",
                                                children: "⚗️ Na Forja",
                                              })
                                            : h.jsx("span", {
                                                className: `text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${Se.badgeClass}`,
                                                children: Se.badge,
                                              }),
                                        ],
                                      }),
                                      h.jsx("div", {
                                        className:
                                          "my-auto flex items-center justify-center p-1",
                                        children: h.jsx(ItemIcon, {
                                          item: Ae,
                                          size: 34,
                                        }),
                                      }),
                                      h.jsxs("div", {
                                        className:
                                          "w-full flex items-center justify-between gap-1 text-[10px] pt-1 border-t border-white/5",
                                        children: [
                                          h.jsx("span", {
                                            className:
                                              "font-semibold text-white truncate text-left font-serif leading-tight",
                                            children: Ae.name,
                                          }),
                                          Ae.stackCount &&
                                            Ae.stackCount > 1 &&
                                            h.jsxs("span", {
                                              className:
                                                "bg-black/90 px-1 rounded text-[9px] font-mono font-bold text-amber-300 border border-amber-500/30 shrink-0",
                                              children: ["x", Ae.stackCount],
                                            }),
                                        ],
                                      }),
                                    ],
                                  },
                                  Ae.id,
                                );
                              },
                            ),
                          }),
                        ],
                      }),
                    h.jsx(ItemDetailPanel, {
                      selectedItem: P,
                      onCloseDetail: () => A(null),
                      onPlaceInFusion: (we) => {
                        (xe(we), z("forja"), V("forja"));
                      },
                      backpack: o,
                      equipment: l,
                      nearbyCampfire: y,
                      onFeedCampfire: w,
                      onFuseItems: f,
                      onCloseParentModal: t,
                      onEquipItem: u,
                      onUseConsumable: c,
                      onUnequipSlot: m,
                      onRoastFish: v,
                      onButcherCarcass: T,
                      onDropItem: S,
                      onMoveToBeltSlot: p,
                      onInvertBeltSlot: j,
                      onCookingPot: Aa,
                      onOpenCookingModal: Ra,
                    }),
                  ],
                }),
              ],
            }),
            h.jsxs("div", {
              className:
                "flex items-center justify-between px-4 sm:px-6 py-2 bg-slate-950 border-t border-amber-500/20 text-[11px] text-slate-400",
              children: [
                h.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    h.jsx("span", {
                      className:
                        "font-mono bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-white text-[10px]",
                      children: "[I] ou [B]",
                    }),
                    h.jsx("span", { children: "Inventário" }),
                    h.jsx("span", {
                      className: "text-slate-600",
                      children: "•",
                    }),
                    h.jsx("span", {
                      className:
                        "font-mono bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-white text-[10px]",
                      children: "[ESC]",
                    }),
                    h.jsx("span", { children: "Fechar" }),
                  ],
                }),
                h.jsx("span", {
                  className:
                    "text-slate-500 text-[10px] hidden sm:inline font-mono",
                  children:
                    "Combine 2 materiais na Mesa de Fusão para forjar novas armas, armaduras e elixires",
                }),
              ],
            }),
          ],
        }),
      });
    },
    o1 = ({
      spearItem: e,
      biomeName: t,
      audio: l,
      onCatchFish: o,
      onClose: u,
    }) => {
      const m = J.useRef(null),
        [c, f] = J.useState(0),
        [g, y] = J.useState(null),
        [w, v] = J.useState("ready"),
        [T, S] = J.useState(!0),
        p = J.useRef({ x: 0, y: 0 }),
        j = J.useRef(!1),
        P = J.useRef({
          state: "ready",
          startX: 0,
          startY: 0,
          targetX: 0,
          targetY: 0,
          curX: 0,
          curY: 0,
          progress: 0,
          impaledFish: null,
        }),
        A = J.useRef([]),
        x = J.useRef([]),
        M = J.useRef([]),
        $ = J.useRef(1),
        z = J.useRef(0);
      J.useEffect(() => {
        const ue = setTimeout(() => {
          S(!1);
        }, 450);
        return () => clearTimeout(ue);
      }, []);
      const K = J.useCallback((ue, N, Ee) => {
          const ne = [
              {
                type: "lambari",
                name: "Lambari Fresco",
                weight: 45,
                size: 24,
                color: "#94a3b8",
                finColor: "#38bdf8",
                depth: 0.2,
              },
              {
                type: "tilapia",
                name: "Tilápia Prateada",
                weight: 35,
                size: 36,
                color: "#38bdf8",
                finColor: "#0284c7",
                depth: 0.5,
              },
              {
                type: "truta",
                name: "Truta Dourada",
                weight: 12,
                size: 44,
                color: "#fbbf24",
                finColor: "#d97706",
                depth: 0.4,
              },
              {
                type: "cascudo",
                name: "Cascudo do Lodo",
                weight: 8,
                size: 40,
                color: "#78716c",
                finColor: "#57534e",
                depth: 0.85,
              },
            ],
            ke = ne.reduce((Ne, X) => Ne + X.weight, 0);
          let G = Math.random() * ke,
            de = ne[0];
          for (const Ne of ne) {
            if (G < Ne.weight) {
              de = Ne;
              break;
            }
            G -= Ne.weight;
          }
          const W = Ee ?? Math.random() > 0.5,
            le = (0.7 + Math.random() * 0.9) * (W ? 1 : -1),
            te = W ? -60 : ue + 60,
            oe = 80 + Math.random() * (N - 220);
          return {
            id: $.current++,
            type: de.type,
            namePt: de.name,
            x: te,
            y: oe,
            vx: le,
            size: de.size * (0.85 + Math.random() * 0.3),
            depth: de.depth,
            color: de.color,
            finColor: de.finColor,
            wigglePhase: Math.random() * Math.PI * 2,
            wiggleSpeed: 7 + Math.random() * 4,
            isPanicking: !1,
            panicTimer: 0,
            isCaught: !1,
          };
        }, []),
        V = J.useCallback(() => {
          if (P.current.state !== "ready") return;
          const ue = m.current;
          if (!ue) return;
          const N = ue.getBoundingClientRect(),
            Ee = p.current.x,
            ne = p.current.y,
            ke = N.width / 2,
            G = N.height - 10;
          ((P.current = {
            state: "throwing",
            startX: ke,
            startY: G,
            targetX: Ee,
            targetY: ne,
            curX: ke,
            curY: G,
            progress: 0,
            impaledFish: null,
          }),
            v("throwing"),
            l.playSpearThrow());
        }, [l]);
      (J.useEffect(() => {
        const ue = (N) => {
          N.code === "Escape" ||
          N.key === "Escape" ||
          N.code === "KeyP" ||
          N.key === "p" ||
          N.key === "P"
            ? u()
            : (N.code === "Space" || N.key === " ") &&
              (N.preventDefault(), V());
        };
        return (
          window.addEventListener("keydown", ue),
          () => window.removeEventListener("keydown", ue)
        );
      }, [u, V]),
        J.useEffect(() => {
          const ue = m.current;
          if (!ue) return;
          const N = ue.getContext("2d");
          if (!N) return;
          let Ee,
            ne = performance.now();
          const ke = () => {
            const de = Math.min(window.devicePixelRatio || 1, 2),
              W = window.innerWidth,
              le = window.innerHeight;
            if (
              ((ue.width = Math.floor(W * de)),
              (ue.height = Math.floor(le * de)),
              (ue.style.width = `${W}px`),
              (ue.style.height = `${le}px`),
              N.setTransform(de, 0, 0, de, 0, 0),
              A.current.length < 7)
            )
              for (let te = 0; te < 7; te++) {
                const oe = K(W, le);
                ((oe.x = 80 + Math.random() * (W - 160)), A.current.push(oe));
              }
          };
          (window.addEventListener("resize", ke), ke());
          const G = (de) => {
            const W = Math.min(0.1, (de - ne) / 1e3);
            ((ne = de), (z.current += W));
            const le = window.innerWidth,
              te = window.innerHeight;
            A.current.length < 8 && A.current.push(K(le, te));
            const oe = N.createLinearGradient(0, 0, 0, te);
            (oe.addColorStop(0, "#0284c7"),
              oe.addColorStop(0.5, "#0369a1"),
              oe.addColorStop(0.85, "#075985"),
              oe.addColorStop(1, "#0c4a6e"),
              (N.fillStyle = oe),
              N.fillRect(0, 0, le, te),
              N.save(),
              (N.fillStyle = "rgba(254, 215, 170, 0.08)"));
            for (let Ie = 0; Ie < 40; Ie++) {
              const ee = (Ie * 137.5) % le,
                He = (Ie * 93.7 + 60) % (te - 120);
              (N.beginPath(),
                N.ellipse(ee, He, 14, 8, Ie * 0.3, 0, Math.PI * 2),
                N.fill());
            }
            (N.restore(),
              N.save(),
              (N.strokeStyle = "rgba(16, 185, 129, 0.35)"),
              (N.lineWidth = 4),
              (N.lineCap = "round"));
            for (let Ie = 0; Ie < 8; Ie++) {
              const ee = Ie < 4 ? 20 + Ie * 25 : le - 20 - (Ie - 4) * 25,
                He = Math.sin(z.current * 1.5 + Ie) * 12;
              (N.beginPath(),
                N.moveTo(ee, te - 40),
                N.quadraticCurveTo(
                  ee + He,
                  te / 2,
                  ee + He * 1.5,
                  te / 2 - 120 - (Ie % 3) * 40,
                ),
                N.stroke());
            }
            (N.restore(),
              N.save(),
              (N.strokeStyle = "rgba(224, 242, 254, 0.15)"),
              (N.lineWidth = 2.5));
            const Ne = z.current * 1.2;
            for (let Ie = 60; Ie < te - 100; Ie += 80) {
              N.beginPath();
              for (let ee = 0; ee <= le; ee += 50) {
                const He =
                  Math.sin(ee * 0.03 + Ne + Ie * 0.02) * 14 +
                  Math.cos(ee * 0.02 - Ne) * 8;
                ee === 0 ? N.moveTo(ee, Ie + He) : N.lineTo(ee, Ie + He);
              }
              N.stroke();
            }
            N.restore();
            for (let Ie = A.current.length - 1; Ie >= 0; Ie--) {
              const ee = A.current[Ie];
              if (!ee.isCaught) {
                ee.isPanicking &&
                  ((ee.panicTimer -= W),
                  ee.panicTimer <= 0 && (ee.isPanicking = !1));
                const Sa = ee.vx * (ee.isPanicking ? 3.2 : 1);
                if (
                  ((ee.x += Sa * 60 * W),
                  (ee.wigglePhase +=
                    ee.wiggleSpeed * (ee.isPanicking ? 2.5 : 1) * W),
                  (ee.vx > 0 && ee.x > le + 120) || (ee.vx < 0 && ee.x < -120))
                ) {
                  A.current.splice(Ie, 1);
                  continue;
                }
              }
              const He = 18 + ee.depth * 22;
              (N.save(),
                (N.fillStyle = "rgba(2, 44, 34, 0.28)"),
                N.beginPath(),
                N.ellipse(
                  ee.x,
                  ee.y + He,
                  ee.size * 0.55,
                  ee.size * 0.22,
                  0,
                  0,
                  Math.PI * 2,
                ),
                N.fill(),
                N.restore(),
                N.save(),
                N.translate(ee.x, ee.y),
                ee.vx < 0 && N.scale(-1, 1),
                Math.sin(ee.wigglePhase) * 0.35,
                (N.fillStyle = ee.finColor),
                N.beginPath(),
                N.moveTo(-ee.size * 0.4, 0),
                N.lineTo(
                  -ee.size * 0.75,
                  -ee.size * 0.35 + Math.sin(ee.wigglePhase) * 4,
                ),
                N.lineTo(-ee.size * 0.65, 0),
                N.lineTo(
                  -ee.size * 0.75,
                  ee.size * 0.35 + Math.sin(ee.wigglePhase) * 4,
                ),
                N.closePath(),
                N.fill(),
                (N.fillStyle = ee.color),
                N.beginPath(),
                N.ellipse(
                  0,
                  0,
                  ee.size * 0.5,
                  ee.size * 0.25,
                  0,
                  0,
                  Math.PI * 2,
                ),
                N.fill(),
                (N.fillStyle = "rgba(255, 255, 255, 0.45)"),
                N.beginPath(),
                N.ellipse(
                  ee.size * 0.05,
                  ee.size * 0.08,
                  ee.size * 0.4,
                  ee.size * 0.12,
                  0,
                  0,
                  Math.PI * 2,
                ),
                N.fill(),
                (N.fillStyle = ee.finColor),
                N.beginPath(),
                N.moveTo(-ee.size * 0.1, -ee.size * 0.25),
                N.quadraticCurveTo(
                  0,
                  -ee.size * 0.45,
                  ee.size * 0.15,
                  -ee.size * 0.25,
                ),
                N.fill(),
                (N.fillStyle = "#ffffff"),
                N.beginPath(),
                N.arc(
                  ee.size * 0.3,
                  -ee.size * 0.06,
                  Math.max(2, ee.size * 0.06),
                  0,
                  Math.PI * 2,
                ),
                N.fill(),
                (N.fillStyle = "#0f172a"),
                N.beginPath(),
                N.arc(
                  ee.size * 0.32,
                  -ee.size * 0.06,
                  Math.max(1.2, ee.size * 0.035),
                  0,
                  Math.PI * 2,
                ),
                N.fill(),
                (N.strokeStyle = "rgba(255, 255, 255, 0.6)"),
                (N.lineWidth = 1),
                N.beginPath(),
                N.arc(0, -ee.size * 0.06, ee.size * 0.15, 0.5, 1.8),
                N.stroke(),
                N.restore());
            }
            const X = P.current;
            if (X.state === "throwing")
              if (((X.progress += W * 3.8), X.progress >= 1)) {
                ((X.progress = 1),
                  (X.curX = X.targetX),
                  (X.curY = X.targetY),
                  (X.state = "retrieving"),
                  v("retrieving"),
                  l.playWaterSplash());
                for (let ee = 0; ee < 3; ee++)
                  x.current.push({
                    x: X.targetX,
                    y: X.targetY,
                    radius: 4 + ee * 6,
                    maxRadius: 45 + ee * 20,
                    alpha: 0.9 - ee * 0.2,
                  });
                for (let ee = 0; ee < 18; ee++) {
                  const He = Math.random() * Math.PI * 2,
                    Sa = 60 + Math.random() * 120;
                  M.current.push({
                    x: X.targetX,
                    y: X.targetY,
                    vx: Math.cos(He) * Sa,
                    vy: Math.sin(He) * Sa - 40,
                    life: 0,
                    maxLife: 0.4 + Math.random() * 0.3,
                    size: 2.5 + Math.random() * 3,
                    color: "#e0f2fe",
                    alpha: 0.9,
                  });
                }
                let Ie = null;
                for (const ee of A.current) {
                  if (ee.isCaught) continue;
                  if (
                    Math.hypot(ee.x - X.targetX, ee.y - X.targetY) <
                    ee.size * 0.75 + 18
                  ) {
                    Ie = ee;
                    break;
                  }
                }
                if (Ie) {
                  ((Ie.isCaught = !0), (X.impaledFish = Ie), l.playFishCatch());
                  const ee = {
                    id: `fish_${Ie.type}_${Date.now()}`,
                    name: Ie.namePt,
                    categoryType: "consumable",
                    isEquippable: !1,
                    rarity: Ie.type === "truta" ? "incomum" : "comum",
                    icon: "Fish",
                    color: Ie.color,
                    value:
                      Ie.type === "truta"
                        ? 60
                        : Ie.type === "tilapia"
                          ? 35
                          : 20,
                    description: `Peixe fresco capturado com lança nas águas de ${t}. Item usável altamente nutritivo e restaurador.`,
                    stackCount: 1,
                  };
                  (o(ee), f((He) => He + 1), y(Ie.namePt));
                  for (let He = 0; He < 12; He++)
                    M.current.push({
                      x: Ie.x,
                      y: Ie.y,
                      vx: (Math.random() - 0.5) * 40,
                      vy: -30 - Math.random() * 60,
                      life: 0,
                      maxLife: 0.8,
                      size: 3 + Math.random() * 3,
                      color: "#fef08a",
                      alpha: 1,
                    });
                } else
                  for (const ee of A.current)
                    Math.hypot(ee.x - X.targetX, ee.y - X.targetY) < 180 &&
                      ((ee.isPanicking = !0),
                      (ee.panicTimer = 1.6),
                      (ee.vx =
                        (ee.x > X.targetX ? 1 : -1) *
                        (1.8 + Math.random() * 0.8)));
              } else
                ((X.curX = X.startX + (X.targetX - X.startX) * X.progress),
                  (X.curY = X.startY + (X.targetY - X.startY) * X.progress));
            else if (X.state === "retrieving")
              if (((X.progress -= W * 1.6), X.progress <= 0)) {
                if (
                  ((X.progress = 0),
                  (X.state = "ready"),
                  v("ready"),
                  X.impaledFish)
                ) {
                  const Ie = A.current.findIndex((ee) => {
                    var He;
                    return (
                      ee.id === ((He = X.impaledFish) == null ? void 0 : He.id)
                    );
                  });
                  (Ie >= 0 && A.current.splice(Ie, 1), (X.impaledFish = null));
                }
              } else
                ((X.curX = X.startX + (X.targetX - X.startX) * X.progress),
                  (X.curY = X.startY + (X.targetY - X.startY) * X.progress),
                  X.impaledFish &&
                    ((X.impaledFish.x = X.curX), (X.impaledFish.y = X.curY)));
            for (let Ie = x.current.length - 1; Ie >= 0; Ie--) {
              const ee = x.current[Ie];
              if (
                ((ee.radius += W * 55),
                (ee.alpha -= W * 0.8),
                ee.alpha <= 0 || ee.radius >= ee.maxRadius)
              ) {
                x.current.splice(Ie, 1);
                continue;
              }
              (N.save(),
                (N.strokeStyle = `rgba(224, 242, 254, ${Math.max(0, ee.alpha)})`),
                (N.lineWidth = 2),
                N.beginPath(),
                N.ellipse(
                  ee.x,
                  ee.y,
                  ee.radius,
                  ee.radius * 0.55,
                  0,
                  0,
                  Math.PI * 2,
                ),
                N.stroke(),
                N.restore());
            }
            for (let Ie = M.current.length - 1; Ie >= 0; Ie--) {
              const ee = M.current[Ie];
              if (
                ((ee.life += W),
                (ee.x += ee.vx * W),
                (ee.y += ee.vy * W),
                (ee.vy += 120 * W),
                ee.life >= ee.maxLife)
              ) {
                M.current.splice(Ie, 1);
                continue;
              }
              const He = (1 - ee.life / ee.maxLife) * ee.alpha;
              (N.save(),
                (N.fillStyle = ee.color),
                (N.globalAlpha = Math.max(0, He)),
                N.beginPath(),
                N.arc(ee.x, ee.y, ee.size, 0, Math.PI * 2),
                N.fill(),
                N.restore());
            }
            if (X.state === "ready") {
              const Ie = p.current.x,
                ee = p.current.y,
                He = le / 2,
                Sa = te - 20;
              (N.save(),
                N.setLineDash([6, 8]),
                (N.strokeStyle = "rgba(56, 189, 248, 0.45)"),
                (N.lineWidth = 1.8),
                N.beginPath(),
                N.moveTo(He, Sa),
                N.lineTo(Ie, ee),
                N.stroke(),
                N.restore(),
                N.save(),
                (N.strokeStyle = "#38bdf8"),
                (N.lineWidth = 2),
                N.beginPath(),
                N.ellipse(Ie, ee, 22, 14, 0, 0, Math.PI * 2),
                N.stroke(),
                N.beginPath(),
                N.moveTo(Ie - 28, ee),
                N.lineTo(Ie - 12, ee),
                N.moveTo(Ie + 12, ee),
                N.lineTo(Ie + 28, ee),
                N.moveTo(Ie, ee - 18),
                N.lineTo(Ie, ee - 8),
                N.moveTo(Ie, ee + 8),
                N.lineTo(Ie, ee + 18),
                N.stroke(),
                N.restore());
            }
            const C = le / 2,
              I = te - 10;
            let be = p.current.x,
              Me = p.current.y;
            X.state === "ready"
              ? ((be = C + (p.current.x - C) * 0.35),
                (Me = I + (p.current.y - I) * 0.35))
              : ((be = X.curX), (Me = X.curY));
            const Te = Math.atan2(Me - I, be - C),
              Fe = 120,
              _e = be - Math.cos(Te) * Fe,
              xe = Me - Math.sin(Te) * Fe;
            (N.save(),
              (N.strokeStyle = "rgba(2, 44, 34, 0.4)"),
              (N.lineWidth = 6),
              N.beginPath(),
              N.moveTo(_e + 6, xe + 12),
              N.lineTo(be + 6, Me + 12),
              N.stroke(),
              (N.strokeStyle = "#78350f"),
              (N.lineWidth = 5.5),
              (N.lineCap = "round"),
              N.beginPath(),
              N.moveTo(_e, xe),
              N.lineTo(be, Me),
              N.stroke(),
              (N.strokeStyle = "#d97706"),
              (N.lineWidth = 4),
              N.beginPath(),
              N.moveTo(be - Math.cos(Te) * 25, Me - Math.sin(Te) * 25),
              N.lineTo(be - Math.cos(Te) * 12, Me - Math.sin(Te) * 12),
              N.stroke(),
              N.save(),
              N.translate(be, Me),
              N.rotate(Te),
              (N.fillStyle = "#0284c7"),
              N.beginPath(),
              N.moveTo(24, 0),
              N.lineTo(-6, -10),
              N.lineTo(-2, 0),
              N.lineTo(-6, 10),
              N.closePath(),
              N.fill(),
              (N.strokeStyle = "#e0f2fe"),
              (N.lineWidth = 1.5),
              N.beginPath(),
              N.moveTo(24, 0),
              N.lineTo(-4, -8),
              N.stroke(),
              N.restore(),
              N.restore(),
              N.save());
            const Ue = N.createLinearGradient(0, te - 50, 0, te);
            (Ue.addColorStop(0, "rgba(120, 53, 15, 0)"),
              Ue.addColorStop(0.3, "rgba(67, 20, 7, 0.65)"),
              Ue.addColorStop(1, "#291104"),
              (N.fillStyle = Ue),
              N.fillRect(0, te - 50, le, 50));
            const $a = Math.sin(z.current * 2) * 4;
            ((N.strokeStyle = "rgba(254, 215, 170, 0.4)"),
              (N.lineWidth = 2),
              N.beginPath(),
              N.moveTo(0, te - 42 + $a),
              N.bezierCurveTo(
                le * 0.3,
                te - 48 - $a,
                le * 0.7,
                te - 38 + $a,
                le,
                te - 44 - $a,
              ),
              N.stroke(),
              N.restore(),
              (Ee = requestAnimationFrame(G)));
          };
          return (
            (Ee = requestAnimationFrame(G)),
            () => {
              (cancelAnimationFrame(Ee),
                window.removeEventListener("resize", ke));
            }
          );
        }, [l, o, K, t]));
      const O = (ue) => {
          p.current = { x: ue.clientX, y: ue.clientY };
        },
        _ = (ue) => {
          ((p.current = { x: ue.clientX, y: ue.clientY }),
            (j.current = !0),
            V());
        },
        se = () => {
          j.current = !1;
        };
      return h.jsxs("div", {
        id: "spearfishing-scene-container",
        className: `fixed inset-0 z-50 flex flex-col justify-between select-none overflow-hidden transition-transform duration-500 ease-out ${T ? "scale-125 opacity-40" : "scale-100 opacity-100"}`,
        style: { backgroundColor: "#0369a1" },
        children: [
          h.jsx("canvas", {
            ref: m,
            onPointerMove: O,
            onPointerDown: _,
            onPointerUp: se,
            className:
              "absolute inset-0 w-full h-full cursor-crosshair touch-none",
          }),
          h.jsxs("header", {
            className:
              "relative z-10 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent pointer-events-auto",
            children: [
              h.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  h.jsxs("button", {
                    id: "btn-exit-spearfishing",
                    onClick: u,
                    className:
                      "flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 shadow-lg backdrop-blur-md text-xs font-bold transition active:scale-95 cursor-pointer",
                    title: "Sair da Pesca e retornar ao mapa",
                    children: [
                      h.jsx(Tp, { className: "h-4 w-4 text-cyan-400" }),
                      h.jsx("span", { children: "Retornar ao Mapa" }),
                      h.jsx("span", {
                        className:
                          "text-[10px] text-slate-400 font-mono px-1.5 py-0.5 bg-black/40 rounded border border-white/10",
                        children: "ESC",
                      }),
                    ],
                  }),
                  h.jsxs("div", {
                    className: "hidden sm:flex flex-col",
                    children: [
                      h.jsxs("span", {
                        className:
                          "text-xs font-black tracking-wider text-cyan-300 flex items-center gap-1.5 uppercase",
                        children: [
                          h.jsx(Or, { className: "h-3.5 w-3.5 text-cyan-400" }),
                          "Pesca com Lança",
                        ],
                      }),
                      h.jsxs("span", {
                        className: "text-[11px] text-slate-300 font-medium",
                        children: ["Margem de ", t, " • ", e.name],
                      }),
                    ],
                  }),
                ],
              }),
              g &&
                h.jsx("div", {
                  className:
                    "flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-emerald-200 text-xs font-bold shadow-lg backdrop-blur-md animate-bounce",
                  children: h.jsxs("span", {
                    children: ["🐟 Fisgou ", g, "!"],
                  }),
                }),
              h.jsx("div", {
                className: "flex items-center gap-2.5",
                children: h.jsxs("div", {
                  className:
                    "flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-200 text-xs font-bold shadow-lg backdrop-blur-md",
                  children: [
                    h.jsx("span", { children: "Peixes Fisgados:" }),
                    h.jsx("span", {
                      className:
                        "px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-black text-sm",
                      children: c,
                    }),
                  ],
                }),
              }),
            ],
          }),
          h.jsxs("footer", {
            className:
              "relative z-10 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none",
            children: [
              h.jsxs("div", {
                className:
                  "flex items-center gap-2 text-xs text-slate-200 font-semibold drop-shadow-md",
                children: [
                  h.jsx(Ep, {
                    className: "h-4 w-4 text-cyan-400 animate-pulse shrink-0",
                  }),
                  h.jsx("span", {
                    children:
                      "Mova o cursor para mirar nos peixes • Clique na tela ou pressione [Espaço] para arremessar a lança!",
                  }),
                ],
              }),
              h.jsxs("div", {
                className:
                  "flex items-center gap-3 mt-2 sm:mt-0 pointer-events-auto",
                children: [
                  h.jsx("div", {
                    className: `px-3 py-1 rounded-full text-[11px] font-bold border transition shadow-md backdrop-blur-sm ${w === "ready" ? "bg-cyan-950/70 border-cyan-400 text-cyan-200" : "bg-amber-950/70 border-amber-400 text-amber-200 animate-pulse"}`,
                    children:
                      w === "ready"
                        ? "⚡ Lança Pronta"
                        : "⏳ Recuperando Lança...",
                  }),
                  h.jsx("button", {
                    id: "btn-throw-spear-mobile",
                    onClick: V,
                    disabled: w !== "ready",
                    className: `sm:hidden px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${w === "ready" ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-950/60" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`,
                    children: "Arremessar",
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    },
    r1 = ({
      creatureType: e,
      carcassItem: t,
      knifeItem: l,
      backpack: o,
      maxBackpackSlots: u = 16,
      onStoreItem: m,
      onClose: c,
    }) => {
      const [f, g] = J.useState(() => e1(e)),
        [y, w] = J.useState(null),
        v = f0(e),
        T = f.filter((z) => z.status === "pending").length,
        S = f.filter((z) => z.status === "collected").length,
        p = f.filter((z) => z.status === "discarded").length,
        j = o.length,
        P = Math.max(0, u - j),
        A = (z) => {
          const K = f.find((O) => O.id === z);
          if (!K || K.status !== "pending") return;
          m(K.item)
            ? (hi.playItemPickup(),
              g((O) =>
                O.map((_) => (_.id === z ? { ..._, status: "collected" } : _)),
              ),
              w(null))
            : (hi.playUnequipItem(),
              w("Mochila cheia! Descarte itens ou abra espaço no inventário."));
        },
        x = (z) => {
          (hi.playUnequipItem(),
            g((K) =>
              K.map((V) => (V.id === z ? { ...V, status: "discarded" } : V)),
            ));
        },
        M = () => {
          let z = u - o.length,
            K = !1;
          (g((V) =>
            V.map((O) =>
              O.status !== "pending"
                ? O
                : (z > 0 || o.some((_) => _.name === O.item.name)) && m(O.item)
                  ? ((K = !0), z--, { ...O, status: "collected" })
                  : O,
            ),
          ),
            K
              ? hi.playItemPickup()
              : w(
                  "Não há espaço livre suficiente na mochila para coletar tudo!",
                ));
        },
        $ = () => {
          (hi.playInventoryClose(), c());
        };
      return h.jsx("div", {
        id: "butchering-modal-backdrop",
        className:
          "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto",
        children: h.jsxs("div", {
          id: "butchering-modal-container",
          className:
            "relative w-full max-w-4xl rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950/98 p-4 sm:p-6 shadow-2xl text-slate-100 flex flex-col gap-4 animate-in fade-in duration-200",
          children: [
            h.jsxs("div", {
              className:
                "flex items-center justify-between border-b border-amber-500/20 pb-3",
              children: [
                h.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    h.jsx("div", {
                      className:
                        "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600/30 to-rose-600/30 border border-amber-500/40 text-amber-300 text-2xl shadow-inner",
                      children: h.jsx(Vu, {
                        className: "h-6 w-6 text-amber-400 rotate-90",
                      }),
                    }),
                    h.jsxs("div", {
                      children: [
                        h.jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [
                            h.jsx("h2", {
                              className:
                                "text-lg sm:text-xl font-bold font-serif text-amber-100 tracking-wide",
                              children: "Destrinchar Carcaça",
                            }),
                            h.jsx("span", {
                              className:
                                "rounded-full bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 text-[10px] font-bold text-rose-300 uppercase tracking-wider",
                              children: "Corte & Evisceração",
                            }),
                          ],
                        }),
                        h.jsx("p", {
                          className: "text-xs text-slate-400 mt-0.5",
                          children:
                            "Escolha o que deseja colocar no seu inventário e o que deseja descartar.",
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsx("button", {
                  id: "butchering-modal-close-btn",
                  onClick: $,
                  className:
                    "rounded-xl p-2 text-slate-400 hover:bg-slate-800/80 hover:text-white transition cursor-pointer",
                  title: "Concluir e fechar",
                  children: h.jsx(mi, { className: "h-5 w-5" }),
                }),
              ],
            }),
            y &&
              h.jsxs("div", {
                className:
                  "flex items-center gap-2 rounded-xl bg-amber-950/60 border border-amber-500/40 px-3 py-2 text-xs text-amber-200",
                children: [
                  h.jsx(Pp, { className: "h-4 w-4 text-amber-400 shrink-0" }),
                  h.jsx("span", { children: y }),
                ],
              }),
            h.jsxs("div", {
              className: "grid grid-cols-1 lg:grid-cols-12 gap-4 items-start",
              children: [
                h.jsxs("div", {
                  className:
                    "lg:col-span-4 flex flex-col gap-3.5 bg-slate-950/80 border border-white/10 rounded-2xl p-4",
                  children: [
                    h.jsxs("div", {
                      className: "flex flex-col items-center text-center gap-2",
                      children: [
                        h.jsxs("div", {
                          className:
                            "relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 shadow-lg text-4xl",
                          children: [
                            h.jsx("span", { children: v.icon }),
                            h.jsx("span", {
                              className:
                                "absolute -bottom-2 -right-2 rounded-full bg-emerald-600 text-white p-1 text-xs shadow",
                              children: "✓",
                            }),
                          ],
                        }),
                        h.jsxs("div", {
                          children: [
                            h.jsx("h3", {
                              className:
                                "text-base font-bold text-white font-serif",
                              children: t.name,
                            }),
                            h.jsx("span", {
                              className: `inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${v.badgeColor}`,
                              children: v.name,
                            }),
                          ],
                        }),
                      ],
                    }),
                    h.jsx("p", {
                      className:
                        "text-xs text-slate-300 leading-relaxed text-center italic border-y border-white/5 py-2.5",
                      children: v.description,
                    }),
                    h.jsxs("div", {
                      className:
                        "flex items-center gap-2.5 rounded-xl bg-slate-900/90 border border-amber-500/20 p-2.5",
                      children: [
                        h.jsx("span", { className: "text-xl", children: "🔪" }),
                        h.jsxs("div", {
                          className: "flex-1 min-w-0",
                          children: [
                            h.jsx("div", {
                              className:
                                "text-[10px] uppercase font-bold text-amber-400",
                              children: "Instrumento Utilizado",
                            }),
                            h.jsx("div", {
                              className:
                                "text-xs font-semibold text-slate-200 truncate",
                              children: l ? l.name : "Faca de Caça Afiada",
                            }),
                          ],
                        }),
                      ],
                    }),
                    h.jsxs("div", {
                      className:
                        "rounded-xl bg-slate-900/60 border border-white/5 p-2.5 text-xs flex flex-col gap-1.5",
                      children: [
                        h.jsxs("div", {
                          className:
                            "flex justify-between items-center text-slate-400 text-[11px]",
                          children: [
                            h.jsx("span", { children: "Espaço na Mochila:" }),
                            h.jsxs("span", {
                              className: `font-mono font-bold ${P > 0 ? "text-emerald-400" : "text-rose-400"}`,
                              children: [j, " / ", u, " slots"],
                            }),
                          ],
                        }),
                        h.jsx("div", {
                          className:
                            "w-full bg-slate-800 rounded-full h-1.5 overflow-hidden",
                          children: h.jsx("div", {
                            className: `h-full transition-all duration-300 ${P > 0 ? "bg-emerald-500" : "bg-rose-500"}`,
                            style: {
                              width: `${Math.min(100, (j / u) * 100)}%`,
                            },
                          }),
                        }),
                        h.jsxs("div", {
                          className:
                            "flex justify-between items-center text-[10px] text-slate-400 pt-0.5",
                          children: [
                            h.jsxs("span", { children: ["Guardados: ", S] }),
                            h.jsxs("span", { children: ["Descartados: ", p] }),
                            h.jsxs("span", { children: ["Restantes: ", T] }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className: "lg:col-span-8 flex flex-col gap-3",
                  children: [
                    h.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        h.jsxs("div", {
                          children: [
                            h.jsx("h3", {
                              className:
                                "text-sm font-bold text-amber-200 uppercase tracking-wider font-serif",
                              children: "Itens Obtidos ao Destrinchar",
                            }),
                            h.jsx("p", {
                              className: "text-[11px] text-slate-400",
                              children:
                                "Selecione cada item para colocar no seu inventário ou descartar.",
                            }),
                          ],
                        }),
                        T > 1 &&
                          h.jsxs("button", {
                            id: "butchering-collect-all-btn",
                            onClick: M,
                            className:
                              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition cursor-pointer border border-emerald-400/30",
                            children: [
                              h.jsx(qu, { className: "h-3.5 w-3.5" }),
                              h.jsx("span", { children: "Coletar Todos" }),
                            ],
                          }),
                      ],
                    }),
                    h.jsx("div", {
                      className:
                        "flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1",
                      children: f.map((z) => {
                        const K = z.status === "pending",
                          V = z.status === "collected",
                          O = z.status === "discarded";
                        return h.jsxs(
                          "div",
                          {
                            id: `butcher-item-${z.id}`,
                            className: `flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-200 ${z.isExclusive ? "border-amber-500/50 bg-amber-950/20 shadow-md shadow-amber-950/20" : "border-white/10 bg-slate-900/60"} ${V ? "opacity-80 border-emerald-500/40 bg-emerald-950/20" : O ? "opacity-40 grayscale line-through" : "hover:border-amber-500/40"}`,
                            children: [
                              h.jsxs("div", {
                                className: "flex items-center gap-3 min-w-0",
                                children: [
                                  h.jsxs("div", {
                                    className:
                                      "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 bg-slate-950 shadow-md",
                                    style: {
                                      borderColor: z.item.color || "#38bdf8",
                                    },
                                    children: [
                                      h.jsx(ItemIcon, { item: z.item, size: 36 }),
                                      (z.item.stackCount || 1) > 1 &&
                                        h.jsxs("span", {
                                          className:
                                            "absolute -top-1.5 -right-1.5 rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] font-bold text-slate-950 shadow",
                                          children: [z.item.stackCount, "x"],
                                        }),
                                    ],
                                  }),
                                  h.jsxs("div", {
                                    className: "min-w-0",
                                    children: [
                                      h.jsxs("div", {
                                        className:
                                          "flex items-center gap-1.5 flex-wrap",
                                        children: [
                                          h.jsx("h4", {
                                            className:
                                              "text-sm font-bold text-white truncate font-serif",
                                            children: z.item.name,
                                          }),
                                          z.isExclusive &&
                                            h.jsxs("span", {
                                              className:
                                                "flex items-center gap-1 rounded-md bg-amber-500/20 border border-amber-400/40 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 uppercase tracking-wide",
                                              children: [
                                                h.jsx(Or, {
                                                  className:
                                                    "h-2.5 w-2.5 text-amber-400",
                                                }),
                                                z.exclusiveLabel ||
                                                  "⭐ Item Exclusivo",
                                              ],
                                            }),
                                          h.jsxs("span", {
                                            className:
                                              "text-[10px] font-mono text-slate-400 uppercase",
                                            children: ["(", z.item.rarity, ")"],
                                          }),
                                        ],
                                      }),
                                      h.jsx("p", {
                                        className:
                                          "text-[11px] text-slate-300 line-clamp-1 mt-0.5",
                                        children: z.item.description,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              h.jsxs("div", {
                                className:
                                  "flex items-center gap-2 shrink-0 self-end sm:self-center",
                                children: [
                                  K &&
                                    h.jsxs(h.Fragment, {
                                      children: [
                                        h.jsxs("button", {
                                          id: `store-loot-btn-${z.id}`,
                                          onClick: () => A(z.id),
                                          className:
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition cursor-pointer border border-emerald-400/30",
                                          title:
                                            "Colocar este item no seu inventário",
                                          children: [
                                            h.jsx(qu, {
                                              className: "h-3.5 w-3.5",
                                            }),
                                            h.jsx("span", {
                                              children: "Colocar no Inventário",
                                            }),
                                          ],
                                        }),
                                        h.jsxs("button", {
                                          id: `discard-loot-btn-${z.id}`,
                                          onClick: () => x(z.id),
                                          className:
                                            "flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-500/30 active:scale-95 text-slate-400 text-xs font-semibold transition cursor-pointer border border-white/5",
                                          title: "Descartar este item",
                                          children: [
                                            h.jsx(pl, {
                                              className: "h-3.5 w-3.5",
                                            }),
                                            h.jsx("span", {
                                              children: "Descartar",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  V &&
                                    h.jsxs("div", {
                                      className:
                                        "flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold",
                                      children: [
                                        h.jsx(Mp, { className: "h-3.5 w-3.5" }),
                                        h.jsx("span", {
                                          children: "Colocado no Inventário",
                                        }),
                                      ],
                                    }),
                                  O &&
                                    h.jsxs("div", {
                                      className:
                                        "flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-500 text-xs",
                                      children: [
                                        h.jsx(pl, { className: "h-3.5 w-3.5" }),
                                        h.jsx("span", {
                                          children: "Descartado",
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          z.id,
                        );
                      }),
                    }),
                    h.jsxs("div", {
                      className:
                        "flex items-center justify-between border-t border-white/10 pt-3 mt-1",
                      children: [
                        h.jsx("div", {
                          className: "text-[11px] text-slate-400",
                          children:
                            T === 0
                              ? h.jsx("span", {
                                  className: "text-emerald-300 font-semibold",
                                  children:
                                    "✓ Todos os despojos foram processados!",
                                })
                              : h.jsxs("span", {
                                  children: [
                                    T,
                                    " ",
                                    T === 1
                                      ? "item restante"
                                      : "itens restantes",
                                    " para escolher.",
                                  ],
                                }),
                        }),
                        h.jsx("button", {
                          id: "butchering-finish-btn",
                          onClick: $,
                          className:
                            "flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-700/80 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold shadow-lg transition cursor-pointer border border-amber-500/40",
                          children: h.jsx("span", {
                            children:
                              T === 0
                                ? "Concluir"
                                : "Concluir & Descartar Restantes",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      });
    },
    SAVE_KEY = "rpg_campfire_save_v1";
