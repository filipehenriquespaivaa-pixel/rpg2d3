/* js/core/world.js
 * Mundo procedural: classe World (tiles, cavernas, fogueiras, panela) + item de argila (Gu).
 * Trecho de legacy/app.original.js (linhas 16198-18018); unica mudanca: nomes renomeados (ver RENOMEADOS.md).
 * Escopo global compartilhado entre os <script>: a ORDEM em index.html importa.
 */
"use strict";
  const Gu = {
    id: "item_argila",
    name: "Argila Úmida",
    difficulty: "media",
    difficultyLabel: RESOURCE_DIFFICULTY.media.label,
    rarity: "comum",
    description:
      "Massa terrosa densa, plástica e maleável colhida nas margens e leitos sedimentares de lagoas. Excelente para moldar cerâmicas, vasos impermeáveis, tijolos e recipientes alquímicos.",
    whereFound: "Margens e leitos argilosos de lagoas e açudes",
    categoryType: "material",
    icon: "🧱",
    color: "#c2410c",
    value: 4,
    stackSize: 99,
    canSpawnAt: (e) =>
      !e.isClayZone || (e.tile.biome.hasWater && !e.tile.biome.passable)
        ? !1
        : e.hash < RESOURCE_DIFFICULTY.media.spawnChance * 1.6,
    render: (e, t, l, o, u = 0) => {
      (e.save(),
        e.translate(t, l),
        (e.fillStyle = "rgba(67, 20, 7, 0.32)"),
        e.beginPath(),
        e.ellipse(0, 3.5 * o, 7 * o, 3.8 * o, 0, 0, Math.PI * 2),
        e.fill());
      const m = Math.sin(u * 2.5 + t * 0.1) * 0.15 + 0.85;
      ((e.strokeStyle = "rgba(254, 215, 170, 0.35)"),
        (e.lineWidth = 1 * o),
        e.beginPath(),
        e.ellipse(0, 3.5 * o, 8.5 * o * m, 4.2 * o * m, 0, 0, Math.PI * 2),
        e.stroke(),
        (e.fillStyle = "#7c2d12"),
        e.beginPath(),
        e.ellipse(0, 0.5 * o, 6.2 * o, 4.5 * o, -0.08, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#9a3412"),
        e.beginPath(),
        e.ellipse(-1.2 * o, -0.8 * o, 5 * o, 3.6 * o, -0.15, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#c2410c"),
        e.beginPath(),
        e.ellipse(0.5 * o, -1.8 * o, 4.2 * o, 3 * o, 0.12, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#9a3412"),
        e.beginPath(),
        e.ellipse(3.8 * o, 1.2 * o, 2.6 * o, 2 * o, 0.3, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "#c2410c"),
        e.beginPath(),
        e.ellipse(3.5 * o, 0.8 * o, 2 * o, 1.5 * o, 0.25, 0, Math.PI * 2),
        e.fill(),
        (e.strokeStyle = "#431407"),
        (e.lineWidth = 1.1 * o),
        e.beginPath(),
        e.arc(-0.8 * o, -0.5 * o, 2.2 * o, 0.3, Math.PI * 0.9),
        e.stroke(),
        (e.fillStyle = "#ea580c"),
        e.beginPath(),
        e.ellipse(-1 * o, -2.6 * o, 2.8 * o, 1.6 * o, -0.2, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "rgba(255, 247, 237, 0.82)"),
        e.beginPath(),
        e.ellipse(-1.5 * o, -3 * o, 1.4 * o, 0.7 * o, -0.3, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = "rgba(254, 215, 170, 0.6)"),
        e.beginPath(),
        e.arc(1.2 * o, -2 * o, 0.8 * o, 0, Math.PI * 2),
        e.fill());
      const c = Math.sin(u * 3.5 + l * 0.2);
      if (c > 0.78) {
        const f = (c - 0.78) / 0.22;
        ((e.fillStyle = `rgba(255, 255, 255, ${f * 0.95})`),
          e.beginPath(),
          e.arc(-1.2 * o, -3.2 * o, 1.2 * o, 0, Math.PI * 2),
          e.fill());
      }
      e.restore();
    },
  };
  class World {
    constructor(t = 4289) {
      ((this.tileSize = 36),
        (this.isUnderground = !1),
        (this.activeCaveSeed = 0),
        (this.surfaceCoords = { x: 0, y: 0 }),
        (this.minedCrystals = 0),
        (this.interactedProps = new Map()),
        (this.collectedGroundItems = new Set()),
        (this.customPlacedProps = new Map()),
        (this.tileCache = new Map()),
        (this.closestCampfireCache = new Map()),
        (this.seed = t),
        (this.elevNoise = new SimplexNoise(t)),
        (this.moistNoise = new SimplexNoise(t + 101)),
        (this.tempNoise = new SimplexNoise(t + 202)),
        (this.detailNoise = new SimplexNoise(t + 303)),
        (this.caveWallNoise = new SimplexNoise(t + 404)),
        (this.caveRoomNoise = new SimplexNoise(t + 505)),
        (this.caveDetailNoise = new SimplexNoise(t + 606)),
        (this.islandNoise = new SimplexNoise(t + 707)),
        (this.featureNoise = new SimplexNoise(t + 808)),
        (this.canyonNoise = new SimplexNoise(t + 909)),
        (this.lakeNoise = new SimplexNoise(t + 1010)));
    }
    setSeed(t) {
      ((this.seed = t),
        this.elevNoise.seed(t),
        this.moistNoise.seed(t + 101),
        this.tempNoise.seed(t + 202),
        this.detailNoise.seed(t + 303),
        this.caveWallNoise.seed(t + 404),
        this.caveRoomNoise.seed(t + 505),
        this.caveDetailNoise.seed(t + 606),
        this.islandNoise.seed(t + 707),
        this.featureNoise.seed(t + 808),
        this.canyonNoise.seed(t + 909),
        this.lakeNoise.seed(t + 1010),
        this.interactedProps.clear(),
        this.collectedGroundItems.clear(),
        this.customPlacedProps.clear(),
        this.clearTileCache(),
        (this.isUnderground = !1));
    }
    _tk(t, l, c) {
      return Number.isInteger(t) &&
        Number.isInteger(l) &&
        t > -1048576 &&
        t < 1048576 &&
        l > -1048576 &&
        l < 1048576
        ? (t + 1048576) * 2097152 + (l + 1048576) + (c ? 4398046511104 : 0)
        : `${c ? "c" : "s"}_${t},${l}`;
    }
    invalidateTile(t, l) {
      (this.tileCache.delete(this._tk(t, l, !1)),
        this.tileCache.delete(this._tk(t, l, !0)),
        this.closestCampfireCache.clear());
    }
    clearTileCache() {
      (this.tileCache.clear(), this.closestCampfireCache.clear());
    }
    getCachedTileCount() {
      return this.tileCache.size;
    }
    pruneTileCache(t, l, o = 50, u = 2400) {
      if (this.tileCache.size <= u) return 0;
      const m = o * o;
      let c = 0;
      for (const [f, g] of this.tileCache.entries()) {
        const y = g.tx - t,
          w = g.ty - l;
        y * y + w * w > m && (this.tileCache.delete(f), c++);
      }
      return c;
    }
    exportSaveData() {
      return {
        interactedProps: Array.from(this.interactedProps.entries()),
        customPlacedProps: Array.from(this.customPlacedProps.entries()),
        collectedGroundItems: Array.from(this.collectedGroundItems.values()),
      };
    }
    importSaveData(t) {
      (t.interactedProps && (this.interactedProps = new Map(t.interactedProps)),
        t.customPlacedProps &&
          (this.customPlacedProps = new Map(t.customPlacedProps)),
        t.collectedGroundItems &&
          (this.collectedGroundItems = new Set(t.collectedGroundItems)),
        this.clearTileCache());
    }
    placeProp(t, l, o) {
      const u = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`;
      (this.customPlacedProps.set(u, { ...o }), this.invalidateTile(t, l));
    }
    getPlacedProp(t, l) {
      const o = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`;
      return this.customPlacedProps.get(o);
    }
    removeProp(t, l) {
      const o = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
        u = this.customPlacedProps.delete(o);
      return (this.interactedProps.delete(o), this.invalidateTile(t, l), u);
    }
    lightCampfire(t, l) {
      const o = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`;
      let u = this.customPlacedProps.get(o);
      if (!u) {
        const c = this.getTile(t, l);
        c.prop &&
          c.prop.kind === "campfire" &&
          ((u = { ...c.prop }), this.customPlacedProps.set(o, u));
      }
      if (u && u.kind === "campfire") {
        u.lit = !0;
        const c = u.fireLevel || 1,
          f = u.scale || 1;
        ((u.namePt =
          c >= 5
            ? "Pira Ancestral das Chamas Eternas"
            : c >= 3
              ? "Fogueira Majestosa"
              : c >= 2
                ? "Grande Fogueira Crepitante"
                : "Fogueira Crepitante"),
          (u.descriptionPt = `Fogueira crepitante (Nível ${c}, Tamanho ${f.toFixed(1)}x). Pressione [F] para descansar ou alimente-a com galhos para expandir o fogo.`));
      }
      const m = this.interactedProps.get(o) || {};
      return (
        this.interactedProps.set(o, { ...m, lit: !0 }),
        this.invalidateTile(t, l),
        !0
      );
    }
    getNearbyCampfire(t, l, o = 85) {
      const u = Math.round(t / this.tileSize),
        m = Math.round(l / this.tileSize),
        c = Math.ceil(o / this.tileSize) + 2;
      let f = null;
      for (let g = -c; g <= c; g++)
        for (let y = -c; y <= c; y++) {
          const w = u + y,
            v = m + g,
            T = `${this.isUnderground ? "cave_" : "surf_"}${w},${v}`;
          let S = this.customPlacedProps.get(T);
          if (!S) {
            const p = this.getTile(w, v);
            p.prop &&
              (p.prop.kind === "campfire" || p.prop.kind === "clay_oven") &&
              (S = p.prop);
          }
          if (S && (S.kind === "campfire" || S.kind === "clay_oven")) {
            const p = w * this.tileSize + this.tileSize / 2 + (S.offsetX || 0),
              j = v * this.tileSize + this.tileSize / 2 + (S.offsetY || 0),
              P = Math.hypot(t - p, l - j),
              A = o + ((S.scale || 1) - 1) * 35;
            P <= A &&
              (!f || P < f.dist) &&
              (f = { tx: w, ty: v, prop: S, dist: P });
          }
        }
      return f;
    }
    feedCampfire(t, l, o = 10) {
      const u = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`;
      let m = this.customPlacedProps.get(u);
      if (!m) {
        const p = this.getTile(t, l);
        p.prop &&
          (p.prop.kind === "campfire" || p.prop.kind === "clay_oven") &&
          ((m = { ...p.prop }), this.customPlacedProps.set(u, m));
      }
      if (!m || (m.kind !== "campfire" && m.kind !== "clay_oven"))
        return {
          success: !1,
          level: 1,
          scale: 1,
          sticksFed: 10,
          percentageGrowth: "",
          propName: "",
          description: "Nenhuma fogueira encontrada neste local.",
        };
      const f = (m.sticksFed || 10) + o,
        g = m.scale || 1,
        y = Math.max(1, Math.round((f / 10) * 10) / 10),
        w = Math.round(y);
      let v = "";
      w === 2
        ? (v = "Dobrou de tamanho (+100%)! Agora 2x maior!")
        : w === 3
          ? (v = "Cresceu +50%! Agora 3x maior que a base!")
          : w === 4
            ? (v = "Cresceu proporcionalmente (+33%)! Agora 4x maior!")
            : w === 5
              ? (v = "Atingiu o 5º nível (+25%)! Pira colossal 5x maior!")
              : (v = `Cresceu +${Math.round(((y - g) / g) * 100)}%! Agora ${y.toFixed(1)}x maior!`);
      let T = "Fogueira de Acampamento";
      (w === 2
        ? (T = "Grande Fogueira Crepitante (Nível 2)")
        : w === 3
          ? (T = "Fogueira Majestosa de Chamas Altas (Nível 3)")
          : w === 4
            ? (T = "Fogueira Monumental Flamejante (Nível 4)")
            : w >= 5 && (T = "Pira Ancestral das Chamas Eternas (Nível 5)"),
        (m.scale = y),
        (m.fireLevel = w),
        (m.sticksFed = f),
        (m.namePt = T),
        (m.descriptionPt = `Fogueira alimentada com ${f} galhos. Tamanho ${y.toFixed(1)}x. ${v}`));
      const S = this.interactedProps.get(u) || {};
      return (
        this.interactedProps.set(u, {
          ...S,
          lit: m.lit !== !1,
          fireLevel: w,
          sticksFed: f,
        }),
        this.invalidateTile(t, l),
        {
          success: !0,
          level: w,
          scale: y,
          sticksFed: f,
          percentageGrowth: v,
          propName: T,
          description: m.descriptionPt,
        }
      );
    }
    startRoastingFish(t, l, o) {
      const u = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
        m = `${t},${l}`,
        c = {
          fishItem: {
            id: o.id,
            name: o.name,
            color: o.color,
            rarity: o.rarity,
            value: o.value,
            description: o.description,
            hpHeal: o.hpHeal,
            staminaHeal: o.staminaHeal,
          },
          startTime: Date.now(),
          durationMs: 6e4,
        };
      this.customPlacedProps.has(u) &&
        (this.customPlacedProps.get(u).roastingFish = c);
      const g = {
        ...(this.interactedProps.get(u) || this.interactedProps.get(m) || {}),
        roastingFish: c,
      };
      return (
        this.interactedProps.set(u, g),
        this.interactedProps.set(m, g),
        this.invalidateTile(t, l),
        !0
      );
    }
    collectRoastedFish(t, l) {
      var w;
      const o = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
        u = `${t},${l}`,
        m = this.interactedProps.get(o) || this.interactedProps.get(u);
      let c = m == null ? void 0 : m.roastingFish;
      if (
        (!c &&
          this.customPlacedProps.has(o) &&
          (c =
            (w = this.customPlacedProps.get(o)) == null
              ? void 0
              : w.roastingFish),
        !c)
      )
        return null;
      (this.customPlacedProps.has(o) &&
        delete this.customPlacedProps.get(o).roastingFish,
        m &&
          (delete m.roastingFish,
          this.interactedProps.set(o, { ...m }),
          this.interactedProps.set(u, { ...m })),
        this.invalidateTile(t, l));
      const f = c.fishItem.name
          .replace(" (Cru)", "")
          .replace(" Cru", "")
          .replace(" Fresco", ""),
        g = `${f} Assado no Espeto`;
      return {
        id: `fish_roasted_${c.fishItem.id}_${Date.now()}`,
        name: g,
        icon: "🍢",
        categoryType: "consumable",
        rarity: "raro",
        value: (c.fishItem.value || 40) + 60,
        hpHeal: 70,
        staminaHeal: 90,
        color: "#f59e0b",
        description: `Suculento ${f} assado no espeto de galho sobre as brasas da fogueira durante 1 minuto. Deliciosamente tostado com aroma defumado irresistível. Restaura 70 de Vida e 90 de Stamina.`,
        stackCount: 1,
        maxStack: 10,
      };
    }
    setCookingPot(t, l, o) {
      const u = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
        m = `${t},${l}`;
      let c = this.customPlacedProps.get(u);
      if (!c) {
        const S = this.getTile(t, l);
        S.prop &&
          (S.prop.kind === "campfire" || S.prop.kind === "clay_oven") &&
          ((c = { ...S.prop }), this.customPlacedProps.set(u, c));
      }
      if (!c || (c.kind !== "campfire" && c.kind !== "clay_oven"))
        return { success: !1, message: "Nenhuma fogueira neste local." };
      const f = {
        potItem: { id: o.id, name: o.name, icon: o.icon, color: o.color },
        hasWater: !!o.hasWater,
        ingredients: [],
        startTime: Date.now(),
      };
      c.cookingPot = f;
      const g = this.interactedProps.get(u) || this.interactedProps.get(m) || {};
      g.cookingPot = f;
      return (
        this.interactedProps.set(u, g),
        this.interactedProps.set(m, { ...g }),
        this.invalidateTile(t, l),
        { success: !0 }
      );
    }
    removeCookingPot(t, l) {
      const u = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
        m = `${t},${l}`;
      let c = null;
      this.customPlacedProps.has(u) &&
        ((c = this.customPlacedProps.get(u).cookingPot || null),
        delete this.customPlacedProps.get(u).cookingPot);
      const f =
        this.interactedProps.get(u) || this.interactedProps.get(m) || null;
      return (
        f &&
          f.cookingPot &&
          ((c = c || f.cookingPot),
          delete f.cookingPot,
          this.interactedProps.set(u, { ...f }),
          this.interactedProps.set(m, { ...f })),
        this.invalidateTile(t, l),
        c
      );
    }
    addIngredientToPot(t, l, o, count = 1) {
      const u = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
        m = `${t},${l}`,
        c = this.interactedProps.get(u) || this.interactedProps.get(m);
      let f = c == null ? void 0 : c.cookingPot;
      if (!f && this.customPlacedProps.has(u))
        f = this.customPlacedProps.get(u).cookingPot;
      if (!f) return 0;
      f.ingredients || (f.ingredients = []);
      const added = Math.max(1, Math.min(count | 0, 6 - f.ingredients.length));
      for (let ii = 0; ii < added; ii++)
        f.ingredients.push({ ...o, stackCount: 1, name: o.name, icon: o.icon });
      if (c) {
        this.interactedProps.set(u, { ...c });
        this.interactedProps.set(m, { ...c });
      }
      return (this.invalidateTile(t, l), added);
    }
    // Remove ingredientes do fogo de volta para a mochila (modal da panela)
    takeIngredientsFromPot(t, l, names) {
      const u = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
        m = `${t},${l}`,
        c = this.interactedProps.get(u) || this.interactedProps.get(m);
      let f = c == null ? void 0 : c.cookingPot;
      if (!f && this.customPlacedProps.has(u))
        f = this.customPlacedProps.get(u).cookingPot;
      if (!f || !f.ingredients) return [];
      const taken = [];
      for (const nm of names) {
        const ix = f.ingredients.findIndex(
          (x) => (x.name || "").toLowerCase() === String(nm).toLowerCase(),
        );
        if (ix !== -1) taken.push(f.ingredients.splice(ix, 1)[0]);
      }
      if (c) {
        this.interactedProps.set(u, { ...c });
        this.interactedProps.set(m, { ...c });
      }
      return (this.invalidateTile(t, l), taken);
    }
    finishCooking(t, l) {
      const o = this.removeCookingPot(t, l);
      if (!o) return null;
      const u = (o.ingredients || [])
          .map((m) => (m.name || "").toLowerCase())
          .join(" + "),
        f = [];
      let g = null,
        y = 0,
        burntWater = !1,
        v = "";
      // 🍲 RECEITAS POR COMBINAÇÃO (prioridade sobre a regra genérica de carne)
      const hasCarne = u.includes("carne") || u.includes("meat"),
        hasGosma = u.includes("gosma") || u.includes("slime"),
        hasGelatinaProc = u.includes("gelatina processada"),
        hasCordaP = u.includes("corda de fibra pequena"),
        hasCordaM = u.includes("corda de fibra média"),
        hasCordaG = u.includes("corda de fibra grande"),
        hasGalho = u.includes("galho"),
        hasGordura = u.includes("gordura animal");
      if (hasCarne && hasGosma && o.hasWater) {
        ((g = {
          id: `sopa_nutritiva_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: "Sopa Nutritiva de Gosma",
          categoryType: "consumable",
          isEquippable: !1,
          rarity: "raro",
          value: 90,
          stackCount: 1,
          maxStack: 20,
          icon: "🍲",
          color: "#86efac",
          hpHeal: 75,
          staminaHeal: 100,
          description:
            "Caldo denso de carne com gelatina derretida. Banho de nutrientes que restaura 75 de Vida e 100 de Stamina.",
        }),
          (v = "🍲 Carne e gosma se fundiram em um caldo nutritivo! Sopa Nutritiva pronta."));
      } else if (hasCordaP && (hasGordura || hasGosma || hasGelatinaProc)) {
        ((g = {
          id: `item_corda_elastica_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: "Corda Elástica",
          categoryType: "material",
          isEquippable: !1,
          rarity: "incomum",
          stackCount: 1,
          maxStack: 20,
          icon: "➰",
          color: "#f59e0b",
          description:
            "Corda pequena impregnada de gordura/gosma quente, elástica como borracha. Base para o Estilingue.",
        }),
          (v = "➰ A corda absorveu a gordura quente e virou Corda Elástica!"));
      } else if (hasCordaG && (hasGosma || hasGelatinaProc)) {
        ((g = {
          id: `item_corda_elastica_grande_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: "Corda Elástica Grande",
          categoryType: "equipment",
          slot: "cinto",
          isEquippable: !0,
          rarity: "raro",
          description:
            "Cabo grosso saturado de gosma purificada no fogo. Muito elástico — potencial ainda misterioso (+8 Defesa, +35 Vigor).",
          stats: { defense: 8, staminaBonus: 35, speedBonusPercent: 8 },
          icon: "SlidersHorizontal",
          color: "#22c55e",
          value: 160,
        }),
          (v = "➰ A corda grande encharcou-se de gosma elástica! Corda Elástica Grande pronta."));
      } else if (hasCarne && hasGalho && !o.hasWater) {
        ((g = {
          id: `espetinho_carne_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: "Espetinho de Carne no Galho",
          categoryType: "consumable",
          isEquippable: !1,
          rarity: "comum",
          value: 40,
          stackCount: 1,
          maxStack: 20,
          icon: "🍢",
          color: "#d97706",
          hpHeal: 40,
          staminaHeal: 45,
          description:
            "Carne grelhada na ponta de um galho dentro da panela quente. Rústico, mas saboroso (+40 Vida, +45 Stamina).",
        }),
          (y = 1),
          (v = "🍢 A carne assou no galho! Espetinho pronto + 1x Gordura Animal."));
      } else if (hasCarne && hasGelatinaProc && o.hasWater) {
        ((g = {
          id: `caldo_gelatina_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          name: "Caldo Gelatinoso Fortificante",
          categoryType: "consumable",
          isEquippable: !1,
          rarity: "raro",
          value: 85,
          stackCount: 1,
          maxStack: 20,
          icon: "🥣",
          color: "#4ade80",
          hpHeal: 70,
          staminaHeal: 90,
          description:
            "Caldo espesso e trêmulo feito de carne e gelatina processada. Sustenta muito (+70 Vida, +90 Stamina).",
        }),
          (v = "🥣 O caldo apurou até ficar gelatinoso! Caldo Fortificante pronto."));
      } else if (hasCarne || u.includes("meat"))
        if (o.hasWater)
          ((g = {
            id: `carne_cozida_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            name: "Carne Cozida",
            categoryType: "consumable",
            isEquippable: !1,
            rarity: "incomum",
            value: 55,
            stackCount: 1,
            maxStack: 20,
            icon: "🍖",
            color: "#d6a47a",
            hpHeal: 45,
            staminaHeal: 60,
            description:
              "Carne macia cozida lentamente na panela com água fervente. Restaura 45 de Vida e 60 de Stamina ao consumir.",
          }),
            (v = "🍲 A carne cozinhou lentamente na água! Obtiveste Carne Cozida."));
        else
          ((g = {
            id: `carne_frita_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            name: "Carne Frita",
            categoryType: "consumable",
            isEquippable: !1,
            rarity: "incomum",
            value: 60,
            stackCount: 1,
            maxStack: 20,
            icon: "🥩",
            color: "#b45309",
            hpHeal: 55,
            staminaHeal: 50,
            description:
              "Carne selada e dourada na gordura quente da panela. Crocante por fora e suculenta por dentro. Restaura 55 de Vida e 50 de Stamina.",
          }),
            (y = 1 + Math.floor(Math.random() * 2)),
            (v = `🍳 A carne fritou na própria gordura! Carne Frita + ${y}x Gordura Animal.`));
      else
        u.includes("gosma") || u.includes("gelatina")
          ? ((g = {
              id: `gelatina_processada_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              name: "Gelatina Processada",
              categoryType: "material",
              isEquippable: !1,
              rarity: "incomum",
              value: 40,
              stackCount: 1,
              maxStack: 20,
              icon: "🫧",
              color: "#86efac",
              description:
                "Corpo de gosma derretido e purificado em banho-maria. Base elástica e pegajosa para fusões avançadas de equipamentos.",
            }),
            (v = "⚗️ A gosma derreteu e se purificou em Gelatina Processada!"))
          : o.hasWater
            ? ((v = "♨️ Apenas água fervida... o vapor se dissipou. A panela voltou vazia."),
              (burntWater = !0))
            : (v = "🔥 O conteúdo queimou nas brasas e virou cinzas.");
      if (
        (g && f.push(g),
        y > 0 &&
          f.push({
            id: `gordura_animal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            name: "Gordura Animal",
            categoryType: "material",
            isEquippable: !1,
            rarity: "comum",
            value: 15,
            stackCount: y,
            maxStack: 20,
            icon: "🧈",
            color: "#fde68a",
            description:
              "Gordura nobre extraída da carne durante a fritura. Escorregadia, valiosa para receitas, conservas e futuras ligas elásticas.",
          }),
        (o.ingredients || []).length === 0 || burntWater)
      ) {
        const pm = o.potItem || {},
          isCaldeirao =
            pm.name && pm.name.toLowerCase().includes("caldeirão"),
          emptyPot = {
            id: `item_${isCaldeirao ? "caldeirao" : "panela"}_barro_${Date.now()}`,
            name: isCaldeirao
              ? "Caldeirão de Barro Vazio"
              : "Panela de Barro Vazia",
            categoryType: "consumable",
            isEquippable: !1,
            rarity: "incomum",
            value: 45,
            stackCount: 1,
            icon: pm.icon || (isCaldeirao ? "🍲" : "🍳"),
            color: "#b45309",
            description: isCaldeirao
              ? "Caldeirão robusto moldado com paredes espessas de argila e curado ao sol. Pode coletar água fresca (+90 Stamina) ou ser usado em receitas no fogo."
              : "Panela robusta de barro com paredes grossas. Pode coletar água fresca na lagoa (+90 Stamina ao beber) ou preparar receitas.",
          };
        f.push(emptyPot);
      }
      return {
        items: f,
        message: v,
        potName: (o.potItem || {}).name || "panela",
      };
    }
    isNearLitCampfire(t, l, o = 190) {
      const u = Math.round(t / this.tileSize),
        m = Math.round(l / this.tileSize),
        c = 14;
      for (let f = -c; f <= c; f++)
        for (let g = -c; g <= c; g++) {
          const y = u + g,
            w = m + f,
            v = `${this.isUnderground ? "cave_" : "surf_"}${y},${w}`,
            T = this.customPlacedProps.get(v);
          if (
            T &&
            (T.kind === "campfire" || T.kind === "clay_oven") &&
            T.lit !== !1
          ) {
            const p = T.scale || 1,
              j = o + (p - 1) * 85,
              P = y * this.tileSize + this.tileSize / 2 + (T.offsetX || 0),
              A = w * this.tileSize + this.tileSize / 2 + (T.offsetY || 0);
            if (Math.hypot(t - P, l - A) <= j) return !0;
          }
          const S = this.getTile(y, w);
          if (
            S.prop &&
            (S.prop.kind === "campfire" || S.prop.kind === "clay_oven") &&
            S.prop.lit !== !1
          ) {
            const p = S.prop.scale || 1,
              j = o + (p - 1) * 85,
              P = y * this.tileSize + this.tileSize / 2 + (S.prop.offsetX || 0),
              A = w * this.tileSize + this.tileSize / 2 + (S.prop.offsetY || 0);
            if (Math.hypot(t - P, l - A) <= j) return !0;
          }
        }
      return !1;
    }
    getClosestLitCampfire(t, l, o = 420) {
      const u = Math.round(t / this.tileSize),
        m = Math.round(l / this.tileSize),
        c = Math.ceil(o / this.tileSize) + 2,
        Tt = `${this.isUnderground ? "c" : "s"}_${u},${m},${o}`,
        St = this.closestCampfireCache.get(Tt);
      if (St && performance.now() - St.time < 250) return St.value;
      let f = null;
      for (let g = -c; g <= c; g++)
        for (let y = -c; y <= c; y++) {
          const w = u + y,
            v = m + g,
            T = `${this.isUnderground ? "cave_" : "surf_"}${w},${v}`;
          let S = this.customPlacedProps.get(T);
          if (!S) {
            const p = this.getTile(w, v);
            p.prop &&
              (p.prop.kind === "campfire" || p.prop.kind === "clay_oven") &&
              (S = p.prop);
          }
          if (
            S &&
            (S.kind === "campfire" || S.kind === "clay_oven") &&
            S.lit !== !1
          ) {
            const p = S.scale || 1,
              P = (this.isUnderground ? 225 : 190) + (p - 1) * 85,
              A = w * this.tileSize + this.tileSize / 2 + (S.offsetX || 0),
              x = v * this.tileSize + this.tileSize / 2 + (S.offsetY || 0),
              M = Math.hypot(t - A, l - x);
            M <= o + P &&
              (!f || M < f.dist) &&
              (f = { fireX: A, fireY: x, dist: M, lightRadius: P, scale: p });
          }
        }
      (this.closestCampfireCache.size > 256 &&
        this.closestCampfireCache.clear(),
        this.closestCampfireCache.set(Tt, {
          time: performance.now(),
          value: f,
        }));
      return f;
    }
    isGroundItemCollected(t, l) {
      const o = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`;
      return this.collectedGroundItems.has(o);
    }
    collectGroundItem(t, l) {
      const o = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`;
      (this.collectedGroundItems.add(o), this.invalidateTile(t, l));
    }
    enterCave(t, l, o, u) {
      this.surfaceCoords = { x: o, y: u };
      this.isUnderground = !0;
      this.activeCaveSeed = (this.seed + 88888) >>> 0;
      this.caveWallNoise.seed(this.activeCaveSeed + 404);
      this.caveRoomNoise.seed(this.activeCaveSeed + 505);
      this.caveDetailNoise.seed(this.activeCaveSeed + 606);
      this.clearTileCache();
    }
    exitCave(t, l) {
      this.isUnderground = !1;
      this.clearTileCache();
      if (t !== undefined && l !== undefined) {
        return {
          x: t * this.tileSize + 14,
          y: l * this.tileSize + 14,
        };
      }
      return this.surfaceCoords;
    }
    getCaveEntranceAt(t, l) {
      if (!this.knownCaveEntrances) this.knownCaveEntrances = new Map();
      const key = (t + 1048576) * 2097152 + (l + 1048576);
      if (this.knownCaveEntrances.has(key))
        return this.knownCaveEntrances.get(key);
      let res = null;
      if (t === 10 && l === 8) {
        res = {
          kind: "cave_entrance",
          namePt: "Entrada da Caverna dos Cristais",
          subType: 0,
          tx: 10,
          ty: 8,
        };
      } else {
        const g = this.hash2D(t, l, 99);
        if ((g > 0.0075 && g < 0.0125) || (g > 0.009 && g < 0.0105)) {
          const surf = this.getSurfaceTile(t, l);
          if (surf && surf.prop && surf.prop.kind === "cave_entrance") {
            res = {
              kind: "cave_entrance",
              namePt: surf.prop.namePt || "Entrada da Caverna",
              subType: surf.prop.subType || 0,
              tx: t,
              ty: l,
            };
          }
        }
      }
      this.knownCaveEntrances.set(key, res);
      return res;
    }
    getNearbyCaveExit(t, l, maxR = 3.6) {
      const rInt = Math.ceil(maxR);
      for (let dy = -rInt; dy <= rInt; dy++) {
        for (let dx = -rInt; dx <= rInt; dx++) {
          const d = Math.hypot(dx, dy);
          if (d <= maxR) {
            const cave = this.getCaveEntranceAt(t + dx, l + dy);
            if (cave) return { cave, dist: d, dx, dy };
          }
        }
      }
      return null;
    }
    hash2D(t, l, o = 0) {
      let u =
        (t * 374761393) ^ (l * 668265263) ^ (this.seed * 31) ^ (o * 1013904223);
      return (
        (u = (u ^ (u >>> 13)) * 1274126177),
        ((u ^ (u >>> 16)) >>> 0) / 4294967296
      );
    }
    getTile(t, l) {
      const o = this._tk(t, l, this.isUnderground),
        u = this.tileCache.get(o);
      if (u) return u;
      if (this.isUnderground) {
        const ue = this.getUndergroundTile(t, l);
        return (this.tileCache.set(o, ue), ue);
      }
      return this.getSurfaceTile(t, l);
    }
    _computeSurfaceBaseBiome(t, l) {
      const m = this.detailNoise.noise2D(t * 0.005, l * 0.005) * 12,
        c = this.detailNoise.noise2D(t * 0.005 + 77, l * 0.005 + 77) * 12,
        f = t + m,
        g = l + c,
        y = this.elevNoise.fbm2D(f * 0.0011, g * 0.0011, 2, 2, 0.4),
        w = Math.hypot(t, l),
        v = w < 36 ? (1 - w / 36) * 0.28 : 0;
      let T = Math.max(0, Math.min(1, y + v)),
        S = !1,
        p = !1,
        j = !1;
      if (y < 0.24) {
        const ue = this.islandNoise.fbm2D(
          t * 0.0022 + 400,
          l * 0.0022 + 400,
          2,
          2,
          0.45,
        );
        if (ue > 0.56) {
          S = !0;
          const N = (ue - 0.56) / 0.44;
          T = 0.32 + N * 0.56;
          const Ee = this.featureNoise.fbm2D(
            t * 0.0025 + 200,
            l * 0.0025 + 200,
            2,
            2,
            0.5,
          );
          Ee > 0.45 &&
            ((p = !0), (N > 0.4 || (Ee > 0.58 && T > 0.55)) && (j = !0));
        }
      }
      const P = this.tempNoise.fbm2D(f * 9e-4 + 150, g * 9e-4 + 150, 2, 2, 0.4),
        A = this.moistNoise.fbm2D(
          f * 0.0012 + 280,
          g * 0.0012 + 280,
          2,
          2,
          0.4,
        ),
        x = this.featureNoise.fbm2D(
          t * 0.003 + 320,
          l * 0.003 + 320,
          2,
          2,
          0.5,
        ),
        M = this.featureNoise.fbm2D(
          t * 0.0028 + 560,
          l * 0.0028 + 560,
          2,
          2,
          0.5,
        ),
        $ = this.canyonNoise.fbm2D(
          t * 0.0028 + 780,
          l * 0.0028 + 780,
          2,
          2,
          0.5,
        ),
        z =
          w < 24
            ? 0
            : this.lakeNoise.fbm2D(
                f * 0.0078 + 920,
                g * 0.0078 + 920,
                2,
                2,
                0.45,
              );
      return Jp(T, A, P, {
        isIsland: S,
        isVolcano: p,
        volcanoCore: j,
        swampVal: x,
        oasisVal: M,
        canyonVal: $,
        lakeVal: z,
      });
    }
    _isMountain25DBiomeAt(t, l) {
      const o = this._tk(t, l, !1),
        u = this.tileCache.get(o);
      if (u) return u.biome.id === BiomeId.MOUNTAIN_25D;
      return this._computeSurfaceBaseBiome(t, l).id === BiomeId.MOUNTAIN_25D;
    }
    _getMountain25DInfo(t, l) {
      if (!this._isMountain25DBiomeAt(t, l)) {
        return { isMountain: !1, tier: 0, tierRaw: -1 };
      }
      // Todo o bioma fica exatamente no mesmo nível de platô elevado (sem partes em níveis diferentes)
      return { isMountain: !0, tier: 1, tierRaw: 1 };
    }
    getSurfaceTile(t, l) {
      const o = this._tk(t, l, !1),
        cached = this.tileCache.get(o);
      if (cached) return cached;
      const m = this.detailNoise.noise2D(t * 0.005, l * 0.005) * 12,
        c = this.detailNoise.noise2D(t * 0.005 + 77, l * 0.005 + 77) * 12,
        f = t + m,
        g = l + c,
        y = this.elevNoise.fbm2D(f * 0.0011, g * 0.0011, 2, 2, 0.4),
        w = Math.hypot(t, l),
        v = w < 36 ? (1 - w / 36) * 0.28 : 0;
      let T = Math.max(0, Math.min(1, y + v)),
        S = !1,
        p = !1,
        j = !1;
      if (y < 0.24) {
        const ue = this.islandNoise.fbm2D(
          t * 0.0022 + 400,
          l * 0.0022 + 400,
          2,
          2,
          0.45,
        );
        if (ue > 0.56) {
          S = !0;
          const N = (ue - 0.56) / 0.44;
          T = 0.32 + N * 0.56;
          const Ee = this.featureNoise.fbm2D(
            t * 0.0025 + 200,
            l * 0.0025 + 200,
            2,
            2,
            0.5,
          );
          Ee > 0.45 &&
            ((p = !0), (N > 0.4 || (Ee > 0.58 && T > 0.55)) && (j = !0));
        }
      }
      const P = this.tempNoise.fbm2D(f * 9e-4 + 150, g * 9e-4 + 150, 2, 2, 0.4),
        A = this.moistNoise.fbm2D(
          f * 0.0012 + 280,
          g * 0.0012 + 280,
          2,
          2,
          0.4,
        ),
        x = this.featureNoise.fbm2D(
          t * 0.003 + 320,
          l * 0.003 + 320,
          2,
          2,
          0.5,
        ),
        M = this.featureNoise.fbm2D(
          t * 0.0028 + 560,
          l * 0.0028 + 560,
          2,
          2,
          0.5,
        ),
        $ = this.canyonNoise.fbm2D(
          t * 0.0028 + 780,
          l * 0.0028 + 780,
          2,
          2,
          0.5,
        ),
        z =
          w < 24
            ? 0
            : this.lakeNoise.fbm2D(
                f * 0.0078 + 920,
                g * 0.0078 + 920,
                2,
                2,
                0.45,
              );
      let K = Jp(T, A, P, {
        isIsland: S,
        isVolcano: p,
        volcanoCore: j,
        swampVal: x,
        oasisVal: M,
        canyonVal: $,
        lakeVal: z,
      });
      const V = this.hash2D(t, l, 7),
        O = `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`;
      let _ = null;
      if (this.customPlacedProps.has(O)) {
        _ = { ...this.customPlacedProps.get(O) };
        const ue =
          this.interactedProps.get(O) || this.interactedProps.get(`${t},${l}`);
        ((ue == null ? void 0 : ue.lit) !== void 0 &&
          ((_.lit = ue.lit),
          _.lit
            ? ((_.namePt = "Fogueira Crepitante"),
              (_.descriptionPt =
                "Uma fogueira aquecida e crepitante. Pressione [F] para descansar e restaurar vigor."))
            : ((_.namePt = "Fogueira de Acampamento (Apagada)"),
              (_.descriptionPt =
                "Uma fogueira montada com 10 galhos secos. Pressione [F] tendo 2 Pederneiras para acendê-la com faíscas!"))),
          ue != null && ue.roastingFish && (_.roastingFish = ue.roastingFish),
          ue != null && ue.cookingPot && (_.cookingPot = ue.cookingPot));
      } else if (
        ((_ = this.generateProp(t, l, K, V, T)), _ && _.kind === "campfire")
      ) {
        const ue =
          this.interactedProps.get(O) || this.interactedProps.get(`${t},${l}`);
        (ue != null && ue.roastingFish && (_.roastingFish = ue.roastingFish),
          ue != null && ue.cookingPot && (_.cookingPot = ue.cookingPot));
      }
      const se = {
        tx: t,
        ty: l,
        elevation: T,
        moisture: A,
        temperature: P,
        biome: K,
        prop: _,
        detailHash: V,
      };
      if (K.id === BiomeId.MOUNTAIN_25D) {
        // Todo o bioma fica em um único nível uniforme (sem sub-níveis nem degraus internos),
        // cercado por um paredão 4 vezes maior (4 tiles de largura) onde o jogador consegue andar por cima do topo do paredão!
        let isPerimeterBorder = !1;
        let isOuterFace = !1;
        for (let dy = -4; dy <= 4; dy++) {
          for (let dx = -4; dx <= 4; dx++) {
            if (dx === 0 && dy === 0) continue;
            const dist = Math.max(Math.abs(dx), Math.abs(dy));
            if (dist <= 4 && !this._isMountain25DBiomeAt(t + dx, l + dy)) {
              isPerimeterBorder = !0;
              if (dist === 1) {
                isOuterFace = !0;
              }
            }
          }
        }
        const isWall = isPerimeterBorder;

        se.mountainTier = 1;
        se.lowerTier = isOuterFace ? 0 : 1;
        se.isElevatedBiome = !0;
        se.isPerimeterCliff = isPerimeterBorder;
        se.isOuterCliffEdge = isOuterFace;
        se.isCliffWall = isWall;
        se.isCliffRamp = !1;
        if (se.isCliffWall) {
          const canKeepSpecial =
            _ &&
            (_.kind === "cave_entrance" ||
              _.kind === "shrine" ||
              _.kind === "campfire" ||
              _.kind === "clay_oven" ||
              _.kind === "drying_clay");
          if (canKeepSpecial) {
            se.isCliffWall = !1;
          } else {
            se.prop = {
              kind: "cliff_wall",
              subType: 1,
              offsetX: 0,
              offsetY: 0,
              scale: 1,
              namePt: "Muralha Gigante do Platô (4x)",
              descriptionPt:
                "Paredão monumental 4x maior que cerca e eleva todo o bioma de Montanhas 2.5D. O topo do paredão é plano e caminhável.",
            };
          }
        }
      }
      return (this.tileCache.set(o, se), se);
    }
    getUndergroundTile(t, l) {
      const u = this.hash2D(t, l, 97);
      const thisCave = this.getCaveEntranceAt(t, l);
      if (thisCave) {
        const cleanName = thisCave.namePt
          .replace("Entrada da ", "")
          .replace("Boca da ", "")
          .replace("Fenda da ", "");
        return {
          tx: t,
          ty: l,
          elevation: 0.1,
          moisture: 0.6,
          temperature: 0.45,
          biome: BIOMES[BiomeId.CAVE_FLOOR],
          prop: {
            kind: "cave_exit",
            subType: thisCave.subType || 0,
            targetTx: t,
            targetTy: l,
            offsetX: 0,
            offsetY: -4,
            scale: 1.35,
            interactive: !0,
            namePt: `Saída da Caverna [${cleanName}]`,
            descriptionPt: `Portal rochoso em arco conectado com a superfície em [${t}, ${l}] (${thisCave.namePt}). Pressione [F] para emergir no mundo superior!`,
          },
          detailHash: u,
        };
      }
      const nearExit = this.getNearbyCaveExit(t, l, 3.5);
      const nearConnector = this.getNearbyCaveExit(t, l, 6.5);
      const isConnectorHall =
        nearConnector &&
        (Math.abs(nearConnector.dx) <= 1.4 ||
          Math.abs(nearConnector.dy) <= 1.4);
      const m = Math.abs(this.caveWallNoise.noise2D(t * 0.07, l * 0.07)),
        c = this.caveRoomNoise.noise2D(t * 0.04, l * 0.04),
        f = this.caveDetailNoise.noise2D(t * 0.07 + 77, l * 0.07 + 77),
        fDetail = this.caveDetailNoise.noise2D(t * 0.08, l * 0.08);
      const isOpen =
        !!nearExit ||
        isConnectorHall ||
        m < 0.15 ||
        Math.abs(f) < 0.14 ||
        c > 0.46;
      if (!isOpen)
        return {
          tx: t,
          ty: l,
          elevation: 0.9,
          moisture: 0.2,
          temperature: 0.4,
          biome: BIOMES[BiomeId.CAVE_WALL],
          prop: null,
          detailHash: u,
        };
      let y = BIOMES[BiomeId.CAVE_FLOOR];
      fDetail < -0.45 && c > 0.35
        ? (y = BIOMES[BiomeId.CAVE_LAKE])
        : fDetail > 0.45 && c > 0.35
          ? (y = BIOMES[BiomeId.CAVE_CRYSTAL])
          : c > 0.42 && fDetail < -0.15 && (y = BIOMES[BiomeId.CAVE_MUSHROOM]);
      let w = null;
      if (nearExit && nearExit.dist > 1.8 && u < 0.08) {
        w = {
          kind: "stalagmite",
          subType: 0,
          offsetX: u * 8 - 4,
          offsetY: ((u * 13) % 8) - 4,
          scale: 0.85,
        };
      }
      const v = this.hash2D(t, l, 77),
        T = `underground_${t},${l}`,
        S = this.interactedProps.get(T);
      if (!nearExit && y.id !== BiomeId.CAVE_LAKE) {
        if (y.id === BiomeId.CAVE_CRYSTAL && v < 0.09) {
          const j = Math.floor(this.hash2D(t, l, 88) * 4),
            P = (S == null ? void 0 : S.opened) ?? !1,
            A = ["Ametista", "Safira", "Rubi", "Esmeralda"];
          w = {
            kind: "crystal_cluster",
            subType: j,
            offsetX: (this.hash2D(t, l, 91) - 0.5) * 8,
            offsetY: (this.hash2D(t, l, 93) - 0.5) * 8,
            scale: 0.95 + this.hash2D(t, l, 95) * 0.25,
            interactive: !P,
            opened: P,
            namePt: P ? "Formação Mineral (Minerada)" : `Drusa de ${A[j]}`,
            descriptionPt: P
              ? "Esta formação rochosa já foi minerada."
              : "Pressione [F] ou Interagir para extrair minerais!",
          };
        } else if (y.id === BiomeId.CAVE_MUSHROOM && v < 0.07)
          w = {
            kind: "glowing_mushroom",
            subType: Math.floor(this.hash2D(t, l, 82) * 2),
            offsetX: (this.hash2D(t, l, 84) - 0.5) * 8,
            offsetY: (this.hash2D(t, l, 86) - 0.5) * 8,
            scale: 0.85 + this.hash2D(t, l, 87) * 0.25,
            interactive: !0,
            namePt: "Fungo das Profundezas",
            descriptionPt:
              "Esporos fosforescentes muito tênues crescendo na rocha úmida.",
          };
        else if (y.id === BiomeId.CAVE_FLOOR)
          if (v < 0.008) {
            const j = (S == null ? void 0 : S.opened) ?? !1;
            w = {
              kind: "chest",
              subType: 1,
              offsetX: 0,
              offsetY: 0,
              scale: 1,
              interactive: !j,
              opened: j,
              namePt: j
                ? "Baú do Mineiro Perdido (Aberto)"
                : "Baú do Mineiro Perdido",
              descriptionPt: j
                ? "Você já pegou os tesouros deste baú subterrâneo!"
                : "Pressione [F] para destrancar este tesouro oculto nas profundezas!",
            };
          } else if (v >= 0.008 && v < 0.035) {
            const j = Math.floor(this.hash2D(t, l, 11) * 3),
              P = [
                "Filão de Ouro Maciço",
                "Filão de Mitril Ancestral",
                "Veio de Ferro Cristalino",
              ],
              A = (S == null ? void 0 : S.opened) ?? !1;
            w = {
              kind: "ore_vein",
              subType: j,
              offsetX: (this.hash2D(t, l, 15) - 0.5) * 6,
              offsetY: (this.hash2D(t, l, 17) - 0.5) * 6,
              scale: 0.95,
              interactive: !A,
              opened: A,
              namePt: A ? `${P[j]} (Extraído)` : P[j],
              descriptionPt: A
                ? "Este veio mineral já foi completamente explorado."
                : "Pressione [F] para extrair minérios nobres das profundezas!",
            };
          } else
            v >= 0.035 && v < 0.045
              ? (w = {
                  kind: "miner_cart",
                  subType: 0,
                  offsetX: 0,
                  offsetY: 0,
                  scale: 1,
                  interactive: !0,
                  namePt: "Vagão de Mineração Abandonado",
                  descriptionPt:
                    "Um antigo carrinho de mina esquecido nos túneis.",
                })
              : v >= 0.045 &&
                v < 0.16 &&
                (w = {
                  kind: "stalagmite",
                  subType: Math.floor(this.hash2D(t, l, 21) * 3),
                  offsetX: (this.hash2D(t, l, 23) - 0.5) * 8,
                  offsetY: (this.hash2D(t, l, 25) - 0.5) * 8,
                  scale: 0.85 + this.hash2D(t, l, 27) * 0.4,
                });
      }
      const p = `cave_${t},${l}`;
      if (this.customPlacedProps.has(p)) {
        w = { ...this.customPlacedProps.get(p) };
        const j = this.interactedProps.get(p);
        ((j == null ? void 0 : j.lit) !== void 0 &&
          ((w.lit = j.lit),
          w.lit
            ? ((w.namePt = "Fogueira Crepitante"),
              (w.descriptionPt =
                "Uma fogueira aquecida e crepitante. Pressione [F] para descansar e restaurar vigor."))
            : ((w.namePt = "Fogueira de Acampamento (Apagada)"),
              (w.descriptionPt =
                "Uma fogueira montada com 10 galhos secos. Pressione [F] tendo 2 Pederneiras para acendê-la com faíscas!"))),
          j != null && j.roastingFish && (w.roastingFish = j.roastingFish),
          j != null && j.cookingPot && (w.cookingPot = j.cookingPot));
      }
      return {
        tx: t,
        ty: l,
        elevation: 0.15,
        moisture: 0.65,
        temperature: 0.45,
        biome: y,
        prop: w,
        detailHash: u,
      };
    }
    generateProp(t, l, o, u, m) {
      const c = `${t},${l}`,
        f = this.interactedProps.get(c);
      if (o.hasWater) {
        if (Fs(t, l, this, { biome: o }) && o.passable && u < 0.14) {
          const p = (f == null ? void 0 : f.harvestCount) ?? 0;
          return {
            kind: "clay_deposit",
            subType: 0,
            offsetX: u * 8 - 4,
            offsetY: u * 8 - 4,
            scale: 1.15,
            interactive: !0,
            opened: p >= 3,
            harvestCount: p,
            namePt: "Ponto de Coleta de Argila",
            descriptionPt:
              "Banco rico em argila plástica úmida no leito da lagoa. Pressione [F] para extrair porções de argila pura!",
          };
        }
        return (o.id === BiomeId.COAST_WATER ||
          o.id === BiomeId.MEADOW_LAKE ||
          o.id === BiomeId.FOREST_LAKE ||
          o.id === BiomeId.TAIGA_LAKE) &&
          u < 0.016
          ? {
              kind: "rock",
              subType: 0,
              offsetX: u * 10 - 5,
              offsetY: u * 12 - 6,
              scale: 0.7,
            }
          : null;
      }
      if (t === 10 && l === 8)
        return {
          kind: "cave_entrance",
          subType: 0,
          offsetX: 0,
          offsetY: -4,
          scale: 1.35,
          interactive: !0,
          namePt: "Entrada da Caverna dos Cristais",
          descriptionPt:
            "Uma entrada rochosa imponente que desce para galerias subterrâneas inexploradas. Pressione [F] ou Interagir para entrar e explorar!",
        };
      const g = this.hash2D(t, l, 99);
      if (g < 0.0018 && m > 0.42 && m < 0.8)
        return {
          kind: "shrine",
          subType: 0,
          offsetX: 0,
          offsetY: -4,
          scale: 1.2,
          interactive: !0,
          namePt: "Santuário de Cristal Ancestral",
          descriptionPt:
            f != null && f.activated
              ? "O santuário pulsa com bênçãos radiantes ativadas!"
              : "Pressione [F] ou Interagir para despertar a bênção mágica do santuário.",
        };
      if (g > 0.0018 && g < 0.0035 && o.category === "land")
        return {
          kind: "campfire",
          subType: 0,
          offsetX: 0,
          offsetY: 2,
          scale: 1,
          interactive: !0,
          namePt: "Acampamento de Viajante",
          descriptionPt:
            "Uma fogueira crepitante aconchegante. Pressione [F] para descansar.",
        };
      if (g > 0.0035 && g < 0.0055 && o.category === "land") {
        const S = (f == null ? void 0 : f.opened) ?? !1;
        return {
          kind: "chest",
          subType: 0,
          offsetX: 0,
          offsetY: 0,
          scale: 1,
          interactive: !S,
          opened: S,
          namePt: S ? "Baú de Relíquias (Aberto)" : "Baú de Relíquias Antigo",
          descriptionPt: S
            ? "Você já recolheu o tesouro deste baú!"
            : "Pressione [F] ou Interagir para abrir o baú e obter tesouros!",
        };
      }
      if (
        g > 0.0055 &&
        g < 0.0075 &&
        (o.id === BiomeId.MEADOW || o.id === BiomeId.SNOW_PEAK || o.id === BiomeId.FOREST)
      )
        return {
          kind: "ruin_pillar",
          subType: Math.floor(this.hash2D(t, l, 13) * 2),
          offsetX: 0,
          offsetY: -6,
          scale: 1.1,
          interactive: !0,
          namePt: "Pilar em Ruínas de Pedra Mágica",
          descriptionPt:
            "Inscrições rúnicas esquecidas esculpidas em granito ancestral.",
        };
      if (
        (o.id === BiomeId.SNOW_PEAK || o.id === BiomeId.VOLCANIC || o.id === BiomeId.MOUNTAIN_25D || m > 0.65) &&
        g > 0.0075 &&
        g < 0.0125
      )
        return {
          kind: "cave_entrance",
          subType: 0,
          offsetX: 0,
          offsetY: -4,
          scale: 1.3,
          interactive: !0,
          namePt: "Boca da Caverna das Montanhas",
          descriptionPt:
            "Uma caverna escura esculpida na rocha com brisa gelada emanando do interior. Pressione [F] para entrar e explorar!",
        };
      if (g > 0.009 && g < 0.0105 && o.category === "land")
        return {
          kind: "cave_entrance",
          subType: 1,
          offsetX: 0,
          offsetY: -4,
          scale: 1.25,
          interactive: !0,
          namePt: "Fenda da Caverna Oculta",
          descriptionPt:
            "Uma fenda profunda entre os rochedos conduzindo ao mundo subterrâneo. Pressione [F] para explorar.",
        };
      const y = this.hash2D(t, l, 23),
        w = this.hash2D(t, l, 41),
        v = (this.hash2D(t, l, 53) - 0.5) * 12,
        T = (this.hash2D(t, l, 67) - 0.5) * 12;
      if (y < o.treeDensity) {
        let S = "tree_oak";
        return (
          o.propType === "pine"
            ? (S = "tree_pine")
            : o.propType === "palm"
              ? (S = "tree_palm")
              : o.propType === "cactus"
                ? (S = "cactus")
                : o.propType === "willow"
                  ? (S = "tree_willow")
                  : o.propType === "burnt" && (S = "tree_burnt"),
          {
            kind: S,
            subType: Math.floor(w * 3),
            offsetX: v,
            offsetY: T - 8,
            scale: 0.9 + w * 0.3,
          }
        );
      }
      return y < o.treeDensity + o.rockDensity
        ? {
            kind: "rock",
            subType: Math.floor(w * 3),
            offsetX: v,
            offsetY: T,
            scale: 0.8 + w * 0.4,
          }
        : y < o.treeDensity + o.rockDensity + o.floraDensity
          ? (o.id === BiomeId.SWAMP || o.id === BiomeId.DEEP_FOREST) && w < 0.45
            ? {
                kind: "mushroom",
                subType: Math.floor(w * 4),
                offsetX: v,
                offsetY: T,
                scale: 0.85,
              }
            : {
                kind:
                  w < 0.33
                    ? "flower_red"
                    : w < 0.66
                      ? "flower_blue"
                      : "flower_yellow",
                subType: Math.floor(w * 2),
                offsetX: v,
                offsetY: T,
                scale: 0.8 + w * 0.3,
              }
          : null;
    }
    interactWithTile(t, l) {
      var c;
      const o = this.getTile(t, l);
      if (!o.prop || !o.prop.interactive) return null;
      const u = this.isUnderground ? `underground_${t},${l}` : `${t},${l}`,
        m = this.interactedProps.get(u) || {};
      if (o.prop.kind === "cave_entrance")
        return {
          success: !0,
          action: "enter_cave",
          entranceTx: t,
          entranceTy: l,
          message: "Descendo para o labirinto de cavernas subterrâneas...",
          reward: "Caverna Descoberta (+100 XP)",
        };
      if (o.prop.kind === "cave_exit")
        return {
          success: !0,
          action: "exit_cave",
          targetTx: o.prop.targetTx !== undefined ? o.prop.targetTx : t,
          targetTy: o.prop.targetTy !== undefined ? o.prop.targetTy : l,
          message:
            "Atravessando o portal de pedra de volta à luz da superfície!",
          reward: "Retorno à Superfície",
        };
      if (o.prop.kind === "crystal_cluster") {
        if (m.opened)
          return {
            success: !1,
            message: "Esta formação de cristais já foi minerada.",
          };
        (this.interactedProps.set(u, { ...m, opened: !0 }),
          this.invalidateTile(t, l),
          this.minedCrystals++);
        const f = [
            "Ametista Radiante",
            "Safira Estelar",
            "Rubi Ígneo",
            "Esmeralda das Profundezas",
          ],
          g = f[o.prop.subType % f.length];
        return {
          success: !0,
          action: "mine_crystal",
          message: `Você minerou ${g}! Os cristais resplandecem no seu inventário.`,
          reward: `${g} (+80 XP)`,
        };
      }
      if (o.prop.kind === "ore_vein") {
        if (m.opened)
          return { success: !1, message: "Este veio mineral já foi extraído." };
        (this.interactedProps.set(u, { ...m, opened: !0 }),
          this.invalidateTile(t, l));
        const f = [
            "Pepita de Ouro Puro",
            "Minério de Mitril Raro",
            "Cristal de Ferro Puro",
          ],
          g = f[o.prop.subType % f.length];
        return {
          success: !0,
          action: "mine_ore",
          message: `Você extraiu ${g} da rocha maciça!`,
          reward: `${g} (+60 XP)`,
        };
      }
      if (o.prop.kind === "glowing_mushroom")
        return {
          success: !0,
          action: "harvest_mushroom",
          message:
            "O cogumelo bioluminescente expeliu uma nuvem de esporos restauradores!",
          reward: "Esporos Místicos (+50 Stamina)",
        };
      if (o.prop.kind === "clay_deposit") {
        const f = m.harvestCount ?? 0;
        if (f >= 3)
          return {
            success: !1,
            message:
              "Este ponto de argila foi temporariamente esgotado. A água e a lama da lagoa precisam de tempo para assentar novos sedimentos minerais.",
          };
        const g = f + 1;
        return (
          this.interactedProps.set(u, {
            ...m,
            harvestCount: g,
            opened: g >= 3,
          }),
          this.invalidateTile(t, l),
          {
            success: !0,
            action: "harvest_clay",
            message:
              "Você extraiu porções de Argila Úmida pura do leito da lagoa!",
            reward: "Argila Úmida (+35 XP)",
          }
        );
      }
      if (o.prop.kind === "drying_clay") {
        const f = o.prop.dryingItemType || "pote",
          g = o.prop.dryingStartTime || Date.now(),
          y = o.prop.dryingDurationMs || 12e4,
          w = Date.now() - g,
          v = y - w;
        if (v > 0) {
          const S = Math.ceil(v / 1e3),
            p = Math.floor(S / 60),
            j = S % 60;
          return {
            success: !1,
            action: "clay_still_drying",
            message: `⏳ ${o.prop.namePt || "Peça de Barro"} ainda está secando ao sol! Faltam ${p}m ${j < 10 ? "0" : ""}${j}s para curar e se tornar coletável.`,
          };
        }
        this.removeProp(t, l);
        const T =
          ((c = o.prop.namePt) == null
            ? void 0
            : c.replace(" (Secando ao Sol)", "")) ||
          (f === "frasco"
            ? "Frasco de Barro"
            : f === "caldeirao"
              ? "Caldeirão de Barro Vazio"
              : "Pote de Barro Vazio");
        return {
          success: !0,
          action: "collect_dried_clay",
          dryingItemType: f,
          message: `✨ Você recolheu [${T}] perfeitamente seco e pronto para uso!`,
          reward: `${T} Seco e Coletado`,
        };
      }
      if (o.prop.kind === "miner_cart")
        return {
          success: !0,
          message:
            "Você examinou o antigo vagão de mineração e encontrou ferramentas antigas e pedras brilhantes!",
          reward: "Relíquia de Minerador (+40 XP)",
        };
      if (o.prop.kind === "chest") {
        if (m.opened)
          return { success: !1, message: "Este baú já foi saqueado!" };
        (this.interactedProps.set(u, { ...m, opened: !0 }),
          this.invalidateTile(t, l));
        const f = [
          "Rubi Ancestral (+250 XP)",
          "Poção de Vigor Máximo (+100 Stamina)",
          "Moedas de Ouro Douradas (+150 Gold)",
          "Amuleto dos Ventos (+Velocidade)",
          "Pedaço de Mapa Antigo (+Exploração)",
        ];
        return {
          success: !0,
          message: "Baú de Relíquias aberto!",
          reward: f[Math.floor(Math.random() * f.length)],
        };
      }
      if (o.prop.kind === "shrine")
        return (
          this.interactedProps.set(u, { ...m, activated: !0 }),
          this.invalidateTile(t, l),
          {
            success: !0,
            message:
              "Bênção dos Cristais ativada! Sua velocidade e visão aumentaram!",
            reward: "Bênção Radiante (+Speed & Luz)",
          }
        );
      if (o.prop.kind === "campfire") {
        if (o.prop.lit === !1)
          return {
            success: !0,
            action: "unlit_campfire",
            message:
              "Esta fogueira está apagada. Use 2 Pederneiras para acendê-la com faíscas!",
            reward: "Fogueira Apagada",
          };
        if (o.prop.roastingFish) {
          const f = o.prop.roastingFish,
            g = Date.now() - f.startTime;
          if (g >= f.durationMs)
            return {
              success: !0,
              action: "collect_roasted_fish",
              roastedFish: this.collectRoastedFish(t, l),
              message: `🍢 Seu ${f.fishItem.name} assou perfeitamente no espeto sobre as brasas! Está dourado, suculento e pronto.`,
              reward: `${f.fishItem.name} Assado no Espeto`,
            };
          {
            const y = Math.ceil((f.durationMs - g) / 1e3);
            return {
              success: !1,
              action: "fish_still_roasting",
              message: `⏳ ${f.fishItem.name} está assando na brasa no espeto! Faltam ${y}s para ficar no ponto suculento.`,
            };
          }
        }
        if (o.prop.cookingPot) {
          const f = o.prop.cookingPot,
            g = Date.now() - f.startTime;
          if (g >= 45e3)
            return {
              success: !0,
              action: "collect_cooked_meal",
              cookedMeal: this.finishCooking(t, l),
              message: "🍲 A refeição ficou pronta na panela sobre o fogo!",
              reward: "Prato Cozinhado",
            };
          {
            const y = Math.ceil((45e3 - g) / 1e3);
            return {
              success: !1,
              action: "meal_cooking",
              message: `⏳ A ${(f.potItem || {}).name || "panela"} está cozinhando no fogo! Faltam ${y}s. Use [Q] para adicionar ingredientes.`,
            };
          }
        }
        if (o.prop.roastingFishPending) {
          const f = o.prop.roastingFishPending;
          return (
            delete o.prop.roastingFishPending,
            this.customPlacedProps.has(
              `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
            ) &&
              delete this.customPlacedProps.get(
                `${this.isUnderground ? "cave_" : "surf_"}${t},${l}`,
              ).roastingFishPending,
            this.invalidateTile(t, l),
            {
              success: !0,
              action: "start_roast_now",
              fishName: f.fishItem.name,
              message: "",
            }
          );
        }
        return {
          success: !0,
          action: "rest_campfire",
          message:
            "Você descansou junto à fogueira. Saúde e vigor completamente restaurados!",
          reward: "Descanso Revigorante",
        };
      }
      return o.prop.kind === "ruin_pillar"
        ? {
            success: !0,
            message:
              'Você decifrou a inscrição do pilar: "O mundo é infinito para aqueles de coração aventureiro."',
            reward: "Sabedoria Ancestral (+50 XP)",
          }
        : null;
    }
    isTilePassable(t, l) {
      const o = this.getTile(t, l);
      if (this.isUnderground && o.biome.id === BiomeId.CAVE_WALL) return !1;
      // Permite subir e andar livremente em cima de todo o paredão (isCliffWall)!
      const southTile = this.getTile(t, l + 1);
      if (
        southTile &&
        southTile.prop &&
        (southTile.prop.kind === "cave_entrance" ||
          southTile.prop.kind === "cave_exit")
      )
        return !1;
      return !0;
    }
    isCliffFaceBlockedAt(fromX, fromY, toX, toY) {
      // Livre para subir e caminhar por cima de todo o paredão
      return !1;
    }
    isCaveRockAt(x, y) {
      const tx = Math.floor(x / this.tileSize),
        ty = Math.floor(y / this.tileSize);
      for (let dy = -1; dy <= 2; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const t = this.getTile(tx + dx, ty + dy);
          if (
            t &&
            t.prop &&
            (t.prop.kind === "cave_entrance" || t.prop.kind === "cave_exit")
          ) {
            const cx = t.tx * this.tileSize + this.tileSize / 2;
            const cy =
              t.ty * this.tileSize + this.tileSize / 2 + (t.prop.offsetY || -4);
            const rx = x - cx;
            const ry = y - cy;
            if (ry >= -38 && ry <= -2 && Math.abs(rx) <= 24) return !0;
            if (
              ry > -2 &&
              ry <= 6 &&
              ((rx <= -8.5 && rx >= -24) || (rx >= 8.5 && rx <= 24))
            )
              return !0;
          }
        }
      }
      return !1;
    }
    getNearbyCaveDoorwayAt(x, y) {
      const tx = Math.floor(x / this.tileSize),
        ty = Math.floor(y / this.tileSize);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const t = this.getTile(tx + dx, ty + dy);
          if (
            t &&
            t.prop &&
            (t.prop.kind === "cave_entrance" || t.prop.kind === "cave_exit")
          ) {
            const cx = t.tx * this.tileSize + this.tileSize / 2;
            const cy =
              t.ty * this.tileSize + this.tileSize / 2 + (t.prop.offsetY || -4);
            const rx = x - cx;
            const ry = y - cy;
            if (Math.abs(rx) <= 8.5 && ry >= -4 && ry <= 8) {
              return {
                action:
                  t.prop.kind === "cave_entrance" ? "enter_cave" : "exit_cave",
                tx: t.tx,
                ty: t.ty,
                prop: t.prop,
              };
            }
          }
        }
      }
      return null;
    }
    canPlayerMoveTo(x, y) {
      const tx = Math.floor(x / this.tileSize),
        ty = Math.floor(y / this.tileSize);
      if (!this.isTilePassable(tx, ty)) return !1;
      if (this.isCaveRockAt(x, y)) return !1;
      return !0;
    }
    get footHX() {
      return 5;
    }
    get footHY() {
      return 3;
    }
    getTrunkRect(t) {
      const p = t && t.prop;
      if (!p) return null;
      if (p._trunk !== void 0) return p._trunk;
      const k = p.kind;
      const hw =
        k === "tree_oak" || k === "tree_willow"
          ? 5
          : k === "tree_pine" || k === "tree_palm"
            ? 3.5
            : k === "tree_burnt"
              ? 3
              : k === "cactus"
                ? 4.5
                : 0;
      let r = null;
      if (hw) {
        const sc = p.scale || 1;
        const cx = t.tx * this.tileSize + this.tileSize / 2 + (p.offsetX || 0);
        const cy = t.ty * this.tileSize + this.tileSize / 2 + (p.offsetY || 0);
        r = {
          kind: k,
          cx: cx,
          cy: cy,
          x0: cx - hw * sc,
          x1: cx + hw * sc,
          y0: cy - 3 * sc,
          y1: cy + 4 * sc,
        };
      }
      Object.defineProperty(p, "_trunk", {
        value: r,
        writable: !0,
        configurable: !0,
        enumerable: !1,
      });
      return r;
    }
    findTrunkAt(x, y, hx = this.footHX, hy = this.footHY) {
      if (this.isUnderground) return null;
      const tx = Math.floor(x / this.tileSize),
        ty = Math.floor(y / this.tileSize);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const r = this.getTrunkRect(this.getTile(tx + dx, ty + dy));
          if (
            r &&
            x + hx > r.x0 &&
            x - hx < r.x1 &&
            y + hy > r.y0 &&
            y - hy < r.y1
          )
            return r;
        }
      }
      return null;
    }
    isTrunkAt(x, y, hx = this.footHX, hy = this.footHY) {
      return !!this.findTrunkAt(x, y, hx, hy);
    }
    moveWithSlide(
      x,
      y,
      dx,
      dy,
      isPlayer = !1,
      hx = this.footHX,
      hy = this.footHY,
    ) {
      const escape = !!this.findTrunkAt(x, y, hx, hy);
      const tileOk = (px, py) =>
        (isPlayer
          ? this.canPlayerMoveTo(px, py)
          : this.isTilePassable(
              Math.floor(px / this.tileSize),
              Math.floor(py / this.tileSize),
            )) && !this.isCliffFaceBlockedAt(x, y, px, py);
      const free = (px, py) =>
        tileOk(px, py) && (escape || !this.findTrunkAt(px, py, hx, hy));
      if (free(x + dx, y + dy))
        return { x: x + dx, y: y + dy, blocked: !1, detour: null };
      const fx = dx !== 0 && free(x + dx, y),
        fy = dy !== 0 && free(x, y + dy);
      if (fx && fy)
        return Math.abs(dx) >= Math.abs(dy)
          ? { x: x + dx, y: y, blocked: !0, detour: null }
          : { x: x, y: y + dy, blocked: !0, detour: null };
      if (fx) return { x: x + dx, y: y, blocked: !0, detour: null };
      if (fy) return { x: x, y: y + dy, blocked: !0, detour: null };
      const len = Math.hypot(dx, dy);
      if (len < 1e-6) return { x: x, y: y, blocked: !0, detour: null };
      const tr =
        this.findTrunkAt(x + dx, y + dy, hx, hy) ||
        this.findTrunkAt(x + dx, y, hx, hy) ||
        this.findTrunkAt(x, y + dy, hx, hy);
      if (!tr) return { x: x, y: y, blocked: !0, detour: null };
      const ux = dx / len,
        uy = dy / len;
      const side = (x - tr.cx) * -uy + (y - tr.cy) * ux;
      const sA =
        Math.abs(side) > 0.5
          ? side > 0
            ? 1
            : -1
          : (Math.floor(tr.cx) + Math.floor(tr.cy)) & 1
            ? 1
            : -1;
      for (const sg of [sA, -sA]) {
        const px = -uy * sg,
          py = ux * sg;
        for (const fw of [0.5, 0]) {
          const mx = (px + ux * fw) * len,
            my = (py + uy * fw) * len;
          if (free(x + mx, y + my))
            return {
              x: x + mx,
              y: y + my,
              blocked: !0,
              detour: { ux: px, uy: py },
            };
        }
      }
      return { x: x, y: y, blocked: !0, detour: null };
    }
  }
