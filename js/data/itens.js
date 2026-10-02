/* js/data/itens.js
 * Slots de equipamento (EQUIPMENT_SLOTS), raridades (RARITIES), fabrica de item (pi) e utilitarios de mochila (Ks, createEmptyEquipment, Zs, ot, t0).
 * Trecho de legacy/app.original.js (linhas 35778-36329); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  const EQUIPMENT_SLOTS = {
    mao_esquerda: {
      id: "mao_esquerda",
      label: "Mão Esquerda",
      category: "hands",
      categoryLabel: "Mãos & Armamento",
      icon: "Shield",
      placeholderText: "Escudo / Tocha",
      description:
        "Equipe escudos protetores, tochas auxiliares de iluminação ou tomos arcanos.",
    },
    mao_direita: {
      id: "mao_direita",
      label: "Mão Direita",
      category: "hands",
      categoryLabel: "Mãos & Armamento",
      icon: "Sword",
      placeholderText: "Arma Principal",
      description:
        "Espadas de combate, picaretas de mineração rápida ou cajados elementais.",
    },
    chapeu: {
      id: "chapeu",
      label: "Chapéu",
      category: "armor",
      categoryLabel: "Vestimentas & Armadura",
      icon: "Crown",
      placeholderText: "Chapéu / Elmo",
      description:
        "Chapéus de explorador de abas largas, capuzes sombrios ou elmos de aço temperado.",
    },
    camisa: {
      id: "camisa",
      label: "Camisa",
      category: "armor",
      categoryLabel: "Vestimentas & Armadura",
      icon: "Shirt",
      placeholderText: "Camisa / Túnica",
      description:
        "Túnicas nobres de linho, camisas de viagem ou cotas de malha reforçadas.",
    },
    calca: {
      id: "calca",
      label: "Calça",
      category: "armor",
      categoryLabel: "Vestimentas & Armadura",
      icon: "Layers",
      placeholderText: "Calça / Perneiras",
      description:
        "Calças de couro flexíveis para escalada ou perneiras de proteção rígida.",
    },
    botas: {
      id: "botas",
      label: "Botas",
      category: "armor",
      categoryLabel: "Vestimentas & Armadura",
      icon: "Footprints",
      placeholderText: "Botas de Viagem",
      description:
        "Botas de couro velozes que aumentam a velocidade de caminhada no mapa.",
    },
    capa: {
      id: "capa",
      label: "Capa",
      category: "armor",
      categoryLabel: "Vestimentas & Armadura",
      icon: "Wind",
      placeholderText: "Capa / Manto",
      description:
        "Mantos térmicos, capas rubras esvoaçantes e proteções contra intempéries.",
    },
    pingente: {
      id: "pingente",
      label: "Pingente",
      category: "accessories",
      categoryLabel: "Acessórios & Utilidades",
      icon: "Gem",
      placeholderText: "Pingente / Amuleto",
      description:
        "Medalhões antigos, pingentes do luar de cristais e amuletos de proteção.",
    },
    bracelete_esquerdo: {
      id: "bracelete_esquerdo",
      label: "Bracelete Esquerdo",
      category: "accessories",
      categoryLabel: "Acessórios & Utilidades",
      icon: "CircleDot",
      placeholderText: "Bracelete Esq.",
      description:
        "Braceletes de couro reforçado, mitril ou braceletes de combate rúnicos.",
    },
    bracelete_direito: {
      id: "bracelete_direito",
      label: "Bracelete Direito",
      category: "accessories",
      categoryLabel: "Acessórios & Utilidades",
      icon: "CircleDot",
      placeholderText: "Bracelete Dir.",
      description:
        "Braceletes de ouro trabalhado, pulseiras de força ou adornos nobres.",
    },
    cinto: {
      id: "cinto",
      label: "Cinto",
      category: "accessories",
      categoryLabel: "Acessórios & Utilidades",
      icon: "SlidersHorizontal",
      placeholderText: "Cinto / Faixa",
      description:
        "Cintos de aventureiro. Ao equipar, libera 2 bolsos utilitários para frascos, ferramentas e criaturas pequenas.",
    },
    cinto_slot1: {
      id: "cinto_slot1",
      label: "Bolso de Cinto I",
      category: "accessories",
      categoryLabel: "Bolsos de Cinto",
      icon: "Briefcase",
      placeholderText: "Frascos / Ferramenta",
      description:
        "Espaço utilitário do cinto. Suporta frascos (até 3x), ferramentas/armas (1x), aranhas/escorpiões (até 3x) ou gosma/coelho (1x).",
    },
    cinto_slot2: {
      id: "cinto_slot2",
      label: "Bolso de Cinto II",
      category: "accessories",
      categoryLabel: "Bolsos de Cinto",
      icon: "Briefcase",
      placeholderText: "Frascos / Ferramenta",
      description:
        "Espaço utilitário do cinto. Suporta frascos (até 3x), ferramentas/armas (1x), aranhas/escorpiões (até 3x) ou gosma/coelho (1x).",
    },
    mochila: {
      id: "mochila",
      label: "Mochila ou Bolsa",
      category: "accessories",
      categoryLabel: "Acessórios & Utilidades",
      icon: "Briefcase",
      placeholderText: "Mochila / Bolsa",
      description:
        "Bolsas de couro curtido e mochilas de lona que aumentam o armazenamento de carga.",
    },
  };
  function Ks(e) {
    const t = {
      attack: 5,
      defense: 2,
      speedBonusPercent: 0,
      lightRadiusBonus: 0,
      staminaBonus: 100,
      miningPower: 1,
    };
    for (const [l, o] of Object.entries(e))
      !o ||
        !o.stats ||
        l === "cinto_slot1" ||
        l === "cinto_slot2" ||
        (o.stats.attack && (t.attack += o.stats.attack),
        o.stats.defense && (t.defense += o.stats.defense),
        o.stats.speedBonusPercent &&
          (t.speedBonusPercent += o.stats.speedBonusPercent),
        o.stats.lightRadiusBonus &&
          (t.lightRadiusBonus += o.stats.lightRadiusBonus),
        o.stats.staminaBonus && (t.staminaBonus += o.stats.staminaBonus),
        o.stats.miningPower && (t.miningPower += o.stats.miningPower));
    return t;
  }
  const RARITIES = {
    comum: {
      label: "Comum",
      text: "text-slate-300",
      bg: "bg-slate-800/70",
      border: "border-slate-600/60",
      glow: "shadow-slate-700/20",
    },
    incomum: {
      label: "Incomum",
      text: "text-emerald-400",
      bg: "bg-emerald-950/40",
      border: "border-emerald-500/50",
      glow: "shadow-emerald-500/20",
    },
    raro: {
      label: "Raro",
      text: "text-sky-400",
      bg: "bg-sky-950/40",
      border: "border-sky-500/60",
      glow: "shadow-sky-500/25",
    },
    epico: {
      label: "Épico",
      text: "text-purple-400",
      bg: "bg-purple-950/40",
      border: "border-purple-500/60",
      glow: "shadow-purple-500/30",
    },
    lendario: {
      label: "Lendário",
      text: "text-amber-400",
      bg: "bg-amber-950/40",
      border: "border-amber-400/70",
      glow: "shadow-amber-500/35",
    },
  };
  function createEmptyEquipment() {
    return {
      mao_esquerda: null,
      mao_direita: null,
      chapeu: null,
      camisa: null,
      calca: null,
      botas: null,
      capa: null,
      pingente: null,
      bracelete_esquerdo: null,
      bracelete_direito: null,
      cinto: null,
      mochila: null,
      cinto_slot1: null,
      cinto_slot2: null,
    };
  }
  function $b() {
    return [];
  }
  function pi(e, t = 0) {
    const l =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    if (e === "crystal") {
      const u = [
          {
            name: "Drusa de Ametista Radiante",
            rarity: "raro",
            color: "#c084fc",
            val: 80,
          },
          {
            name: "Drusa de Safira Estelar",
            rarity: "raro",
            color: "#38bdf8",
            val: 95,
          },
          {
            name: "Drusa de Rubi Ígneo",
            rarity: "epico",
            color: "#f43f5e",
            val: 140,
          },
          {
            name: "Drusa de Esmeralda das Profundezas",
            rarity: "epico",
            color: "#34d399",
            val: 150,
          },
        ],
        m = u[t % u.length];
      return {
        id: `drop_crystal_${l}`,
        name: m.name,
        isEquippable: !1,
        categoryType: "material",
        rarity: m.rarity,
        description:
          "Cristal mineral extraído de galerias subterrâneas com pureza cristalina incomparável.",
        icon: "Gem",
        color: m.color,
        stackCount: 1,
        value: m.val,
      };
    }
    if (e === "ore") {
      const u = [
          {
            name: "Pepita de Ouro Maciço",
            rarity: "raro",
            color: "#fbbf24",
            val: 90,
          },
          {
            name: "Minério de Mitril Nobre",
            rarity: "epico",
            color: "#67e8f9",
            val: 180,
          },
          {
            name: "Cristal de Ferro Puro",
            rarity: "incomum",
            color: "#94a3b8",
            val: 45,
          },
        ],
        m = u[t % u.length];
      return {
        id: `drop_ore_${l}`,
        name: m.name,
        isEquippable: !1,
        categoryType: "material",
        rarity: m.rarity,
        description:
          "Minério bruto de alta densidade mineral extraído das paredes da caverna.",
        icon: "Hammer",
        color: m.color,
        stackCount: 1,
        value: m.val,
      };
    }
    if (e === "mushroom")
      return {
        id: `drop_shroom_${l}`,
        name: "Esporos de Cogumelo Fosforescente",
        isEquippable: !1,
        categoryType: "consumable",
        rarity: "incomum",
        description:
          "Fungos com propriedades regenerativas que restauram instantaneamente o vigor.",
        icon: "Sparkles",
        color: "#2dd4bf",
        stackCount: 1,
        value: 30,
      };
    const o = [
      {
        id: `drop_sword_${l}`,
        name: "Espada de Ferro Forjado",
        slot: "mao_direita",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "comum",
        description:
          "Lâmina afiada para repelir predadores e explorar caminhos perigosos.",
        stats: { attack: 8, defense: 1 },
        icon: "Sword",
        color: "#38bdf8",
        value: 50,
      },
      {
        id: `drop_torch_${l}`,
        name: "Tocha de Pinho Flamejante",
        slot: "mao_esquerda",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "comum",
        description:
          "Tocha robusta que projeta luz nas cavernas escuras e noites profundas.",
        stats: { attack: 2, lightRadiusBonus: 45 },
        icon: "Flame",
        color: "#f59e0b",
        value: 30,
      },
      {
        id: `drop_shield_${l}`,
        name: "Escudo de Madeira Reforçado",
        slot: "mao_esquerda",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "comum",
        description:
          "Escudo circular com aro de metal para absorver impactos frontais.",
        stats: { defense: 10, attack: 1 },
        icon: "Shield",
        color: "#a3e635",
        value: 45,
      },
      {
        id: `drop_hat_${l}`,
        name: "Chapéu de Explorador de Abas Largas",
        slot: "chapeu",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "incomum",
        description:
          "Protege os olhos contra ventos fortes e goteiras nas profundezas.",
        stats: { defense: 4, lightRadiusBonus: 10 },
        icon: "Crown",
        color: "#d97706",
        value: 40,
      },
      {
        id: `drop_shirt_${l}`,
        name: "Túnica de Couro Curvado",
        slot: "camisa",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "incomum",
        description:
          "Vestimenta forrada e acolchoada que reduz ferimentos em combate.",
        stats: { defense: 12, staminaBonus: 20 },
        icon: "Shirt",
        color: "#38bdf8",
        value: 70,
      },
      {
        id: `drop_pants_${l}`,
        name: "Calça de Couro de Viagem",
        slot: "calca",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "comum",
        description:
          "Calça leve que permite escaladas e corridas sem restrição.",
        stats: { defense: 6 },
        icon: "Layers",
        color: "#b45309",
        value: 35,
      },
      {
        id: `drop_boots_${l}`,
        name: "Botas de Couro Ágeis",
        slot: "botas",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "incomum",
        description:
          "Calçado reforçado que reduz o atrito e aumenta a velocidade em +15%.",
        stats: { defense: 5, speedBonusPercent: 15 },
        icon: "Footprints",
        color: "#10b981",
        value: 65,
      },
      {
        id: `drop_cloak_${l}`,
        name: "Capa Rubra do Aventureiro",
        slot: "capa",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "incomum",
        description:
          "Manto carmesim com capuz que abriga contra tempestades e intempéries.",
        stats: { defense: 5, staminaBonus: 15 },
        icon: "Wind",
        color: "#ef4444",
        value: 55,
      },
      {
        id: `drop_pendant_${l}`,
        name: "Pingente do Luar Arcano",
        slot: "pingente",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "raro",
        description:
          "Amuleto encrustado com uma pedra que emite luminescência azulada.",
        stats: { defense: 4, lightRadiusBonus: 20, attack: 3 },
        icon: "Gem",
        color: "#c084fc",
        value: 120,
      },
      {
        id: `drop_vambrace_l_${l}`,
        name: "Bracelete Guardião de Bronze",
        slot: "bracelete_esquerdo",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "comum",
        description:
          "Protetor de antebraço esquerdo feito de couro e bronze trabalhado.",
        stats: { defense: 4, attack: 1 },
        icon: "CircleDot",
        color: "#f59e0b",
        value: 40,
      },
      {
        id: `drop_bracelet_r_${l}`,
        name: "Bracelete de Força Entalhado",
        slot: "bracelete_direito",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "incomum",
        description:
          "Adorno rúnico que confere firmeza e precisão ao empunhar armas.",
        stats: { attack: 4, defense: 2 },
        icon: "CircleDot",
        color: "#fbbf24",
        value: 60,
      },
      {
        id: `drop_belt_${l}`,
        name: "Cinto com Fivela de Bronze",
        slot: "cinto",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "comum",
        description:
          "Cinto de aventureiro com alças para fixar ferramentas e bolsinhas.",
        stats: { defense: 3, staminaBonus: 10 },
        icon: "SlidersHorizontal",
        color: "#d97706",
        value: 30,
      },
      {
        id: `drop_pouch_${l}`,
        name: "Bolsa de Viagem de Fibra",
        slot: "mochila",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "comum",
        description:
          "Bolsa compacta tecida com fibras resistentes. Concede +6 slots de itens (+6 slots verdes de Bolsa)!",
        stats: { defense: 1, staminaBonus: 15 },
        icon: "Briefcase",
        color: "#10b981",
        value: 50,
      },
      {
        id: `drop_backpack_${l}`,
        name: "Mochila de Couro Reforçada",
        slot: "mochila",
        isEquippable: !0,
        categoryType: "equipment",
        rarity: "incomum",
        description:
          "Mochila reforçada com correias resistentes. Concede +15 slots de itens (+15 slots anil de Mochila)!",
        stats: { defense: 3, staminaBonus: 35 },
        icon: "Briefcase",
        color: "#6366f1",
        value: 90,
      },
      {
        id: `drop_potion_${l}`,
        name: "Frasco de Poção de Vigor",
        isEquippable: !1,
        categoryType: "consumable",
        rarity: "incomum",
        description:
          "Tônico restaurador destilado que recupera instantaneamente todo o vigor do aventureiro.",
        icon: "Sparkles",
        color: "#34d399",
        stackCount: 2,
        value: 35,
      },
    ];
    return o[Math.floor(Math.random() * o.length)];
  }
  function Zs(e) {
    if (!e) return "none";
    const t = (e.name || "").toLowerCase(),
      l = (e.id || "").toLowerCase();
    return t.includes("mochila") || l.includes("mochila")
      ? "mochila"
      : (t.includes("bolsa") ||
          l.includes("bolsa") ||
          t.includes("algibeira") ||
          t.includes("pouch") ||
          t.includes("sacola"),
        "bolsa");
  }
  function ot(e) {
    const t = Zs(e);
    return t === "mochila" ? 21 : t === "bolsa" ? 12 : 6;
  }
  function t0(e, t) {
    return e < 6 ? "primary" : t === "bolsa" ? "bolsa" : "mochila";
  }
