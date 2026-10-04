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
      (this.tileCache.clear(),
        this.closestCampfireCache.clear(),
        this.knownCaveEntrances && this.knownCaveEntrances.clear(),
        this.mergedCaveCache && this.mergedCaveCache.clear(),
        this.rawCaveCandidateCache && this.rawCaveCandidateCache.clear());
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
      this.activeCaveEntranceCoords = { tx: t, ty: l };
      const surfB = this._computeSurfaceBaseBiome(t, l);
      const ent = this.getCaveEntranceAt(t, l);
      this.enteredViaStaircase = !!(
        (ent && ent.isStaircase) ||
        (surfB && surfB.id === BiomeId.MEADOW)
      );
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
    _isRawCaveCandidateAt(t, l) {
      if (!this.rawCaveCandidateCache) this.rawCaveCandidateCache = new Map();
      const key = (t + 1048576) * 2097152 + (l + 1048576);
      if (this.rawCaveCandidateCache.has(key))
        return this.rawCaveCandidateCache.get(key);

      let res = null;
      const isBlockedUndergroundWallOrDoor = (tx, ty) => {
        const lx = ((tx % 32) + 32) % 32,
          ly = ((ty % 32) + 32) % 32;
        if (lx === 0 || lx === 4 || ly === 0 || ly === 4 || ly === 17) return !0;
        if (lx === 13 || lx === 15 || lx === 16 || lx === 20 || lx === 22 || lx === 24) return !0;
        if (ly === 5 || ly === 16 || ly === 18 || ly === 31) return !0;
        return !1;
      };
      if (t === 10 && l === 8) {
        const b10 = this._computeSurfaceBaseBiome(10, 8);
        const isRuins10 = !!(b10 && b10.id === BiomeId.MEADOW);
        res = {
          tx: 10,
          ty: 8,
          subType: isRuins10 ? 2 : 0,
          isStaircase: isRuins10,
          scale: 1.35,
          namePt: isRuins10
            ? "Escadaria para o Subsolo dos Cristais"
            : "Entrada da Caverna dos Cristais",
          descriptionPt: isRuins10
            ? "Uma escadaria ancestral de mármore e pedra lavrada que desce para as galerias subterrâneas dos cristais. Pressione [F] para descer!"
            : "Uma entrada rochosa imponente que desce para galerias subterrâneas inexploradas. Pressione [F] ou Interagir para entrar e explorar!",
        };
      } else {
        const b = this._computeSurfaceBaseBiome(t, l);
        if (b && !b.hasWater && b.category === "land") {
          const gCell = this._getGreekRuinCellAt(t, l);
          const isBlockedByRuinWallOrDoor =
            gCell &&
            (gCell.role === "wall" ||
              gCell.role === "rubble_wall" ||
              gCell.role === "door" ||
              gCell.role === "column");

          // 1. Garante uma Escadaria para o Subsolo na praça de entrada de cada Cidade de Ruínas Gregas!
          if (b.id === BiomeId.MEADOW) {
            const city = this._getMeadowCityDistrict(t, l);
            if (city && t === city.stairTx && l === city.stairTy && !isBlockedByRuinWallOrDoor) {
              res = {
                tx: t,
                ty: l,
                subType: 2,
                isStaircase: !0,
                scale: 1.4,
                namePt: "Escadaria Real para o Subsolo",
                descriptionPt:
                  "A grande escadaria de mármore da Pólis que desce em degraus profundos até o subsolo das ruínas. Pressione [F] para descer!",
              };
            }
          }

          // 2. Demais entradas pelo mundo (podem surgir tanto ao ar livre quanto DENTRO dos Salões na superfície,
          //    desde que não fiquem em cima de paredes ou portas nem na superfície nem no subsolo!)
          if (
            !res &&
            !isBlockedByRuinWallOrDoor &&
            !(b.id === BiomeId.MEADOW && isBlockedUndergroundWallOrDoor(t, l))
          ) {
            const g = this.hash2D(t, l, 99);
            const isPotentialRange =
              (g > 0.0075 && g < 0.0135) ||
              (g > 0.009 && g < 0.0105) ||
              (g > 0.0125 && g < 0.0165);
            if (isPotentialRange) {
              const clusterNoise = this.featureNoise.noise2D(
                t * 0.06 + 410,
                l * 0.06 + 410,
              );
              const isMountainOrHigh =
                b.id === BiomeId.SNOW_PEAK ||
                b.id === BiomeId.VOLCANIC ||
                b.id === BiomeId.MOUNTAIN_25D ||
                b.elevation > 0.65;
              const isRuinsBiome = b.id === BiomeId.MEADOW;

              if (isRuinsBiome && g > 0.0075 && g < 0.0135) {
                res = {
                  tx: t,
                  ty: l,
                  subType: 2,
                  isStaircase: !0,
                  scale: 1.35,
                  namePt: gCell
                    ? "Escadaria Interna do Salão para o Subsolo"
                    : "Escadaria para o Subsolo",
                  descriptionPt:
                    "Uma escadaria monumental de mármore helênico que desce em degraus profundos até as galerias do subsolo. Pressione [F] para descer!",
                };
              } else if (isMountainOrHigh && g > 0.0075 && g < 0.0125) {
                res = {
                  tx: t,
                  ty: l,
                  subType: 0,
                  scale: 1.3,
                  namePt: "Boca da Caverna das Montanhas",
                  descriptionPt:
                    "Uma caverna escura esculpida na rocha com brisa gelada emanando do interior. Pressione [F] para entrar e explorar!",
                };
              } else if (g > 0.009 && g < 0.0105) {
                res = {
                  tx: t,
                  ty: l,
                  subType: isRuinsBiome ? 2 : 1,
                  isStaircase: isRuinsBiome,
                  scale: 1.25,
                  namePt: isRuinsBiome ? "Escadaria para o Subsolo" : "Fenda da Caverna Oculta",
                  descriptionPt: isRuinsBiome
                    ? "Uma escadaria de pedra lavrada que desce para o subsolo das ruínas. Pressione [F] para descer."
                    : "Uma fenda profunda entre os rochedos conduzindo ao mundo subterrâneo. Pressione [F] para explorar.",
                };
              } else if (clusterNoise > 0.18 && g > 0.0125 && g < 0.0162) {
                res = {
                  tx: t,
                  ty: l,
                  subType: isRuinsBiome ? 2 : 1,
                  isStaircase: isRuinsBiome,
                  scale: 1.25,
                  namePt: isRuinsBiome ? "Escadaria Antiga para o Subsolo" : "Galeria Rochosa Subterrânea",
                  descriptionPt: isRuinsBiome
                    ? "Degraus antigos de mármore que levam às galerias subterrâneas. Pressione [F] para explorar."
                    : "Uma fenda geológica entre os rochedos conectada às galerias subterrâneas. Pressione [F] para explorar.",
                };
              }
            }
          }
        }
      }
      this.rawCaveCandidateCache.set(key, res);
      return res;
    }
    _getMergedCaveInfoAt(t, l) {
      if (!this.mergedCaveCache) this.mergedCaveCache = new Map();
      const key = (t + 1048576) * 2097152 + (l + 1048576);
      if (this.mergedCaveCache.has(key)) return this.mergedCaveCache.get(key);

      const selfRaw = this._isRawCaveCandidateAt(t, l);
      if (!selfRaw) {
        this.mergedCaveCache.set(key, null);
        return null;
      }

      // Raio de fusão: quando houver uma caverna perto da outra (até 8 blocos de distância),
      // elas se juntam em uma única Caverna Maior, Mais Alta e com Mais Pedras na Entrada!
      const mergeR = 8;
      const nearby = [];
      for (let dy = -mergeR; dy <= mergeR; dy++) {
        for (let dx = -mergeR; dx <= mergeR; dx++) {
          const nt = t + dx,
            nl = l + dy;
          const cand = this._isRawCaveCandidateAt(nt, nl);
          if (cand) {
            nearby.push(cand);
          }
        }
      }

      if (nearby.length <= 1) {
        const singleRes = {
          ...selfRaw,
          isMerged: !1,
          mergedCount: 1,
        };
        this.mergedCaveCache.set(key, singleRes);
        return singleRes;
      }

      // Define qual das cavernas próximas será a âncora principal (prioriza [10,8] ou a de menor coordenada/hash determinístico)
      nearby.sort((a, b) => {
        if (a.tx === 10 && a.ty === 8) return -1;
        if (b.tx === 10 && b.ty === 8) return 1;
        if (a.ty !== b.ty) return a.ty - b.ty;
        return a.tx - b.tx;
      });
      const leader = nearby[0];
      if (leader.tx !== t || leader.ty !== l) {
        // Esta caverna foi absorvida pela caverna vizinha (se juntaram em uma só maior!)
        this.mergedCaveCache.set(key, null);
        return null;
      }

      const mergedCount = nearby.length;
      const isStair = !!selfRaw.isStaircase;
      const mergedRes = {
        ...selfRaw,
        isMerged: !0,
        isStaircase: isStair,
        mergedCount: mergedCount,
        scale: Math.min(1.85, 1.58 + (mergedCount - 2) * 0.12),
        namePt: isStair
          ? `Grande Escadaria Unificada para o Subsolo (${mergedCount} Galerias)`
          : selfRaw.tx === 10 && selfRaw.ty === 8
            ? "Grande Caverna Unificada dos Cristais"
            : `Grande Caverna Unificada (${mergedCount} Galerias)`,
        descriptionPt: isStair
          ? `Uma escadaria monumental de mármore helênico unificando ${mergedCount} galerias subterrâneas! Pressione [F] para descer ao subsolo.`
          : `Duas ou mais cavernas próximas se fundiram nesta formação rochosa colossal, mais alta e cercada de rochedos na entrada! Pressione [F] para explorar.`,
      };
      this.mergedCaveCache.set(key, mergedRes);
      return mergedRes;
    }
    getCaveEntranceAt(t, l) {
      if (!this.knownCaveEntrances) this.knownCaveEntrances = new Map();
      const key = (t + 1048576) * 2097152 + (l + 1048576);
      if (this.knownCaveEntrances.has(key))
        return this.knownCaveEntrances.get(key);
      const merged = this._getMergedCaveInfoAt(t, l);
      let res = null;
      if (merged) {
        res = {
          kind: "cave_entrance",
          namePt: merged.namePt || "Entrada da Caverna",
          subType: merged.subType || 0,
          isStaircase: !!merged.isStaircase,
          isMerged: !!merged.isMerged,
          mergedCount: merged.mergedCount || 1,
          scale: merged.scale || 1.35,
          tx: t,
          ty: l,
        };
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
    _isMeadowCityBiomeAt(t, l) {
      const b = this._computeSurfaceBaseBiome(t, l);
      return b.id === BiomeId.MEADOW && !b.hasWater;
    }
    _getMeadowCityDistrict(t, l) {
      // Escaneia a extensão contínua do bioma Planície Florida (MEADOW) onde o tile está,
      // de modo que cada bioma tenha uma Cidade Grega completa com:
      // - Entre 1 a 3 Salões Monumentais (o padrão de 4 salões e corredores em cruz) no bioma!
      // - Várias Casas espalhadas ao redor (cada casa é uma construção própria com as 4 salas e corredores internos)
      // - Piso falhado (onde algumas lajes de mármore sumiram/quebraram deixando a grama/terra aparecer)
      if (!this._isMeadowCityBiomeAt(t, l)) return null;
      if (!this._greekBiomeCityCache) {
        this._greekBiomeCityCache = new Map();
      }
      // Quantiza em blocos de 8 tiles para cache rápido, mas mede as bordas reais do bioma
      const qx = Math.floor(t / 8),
        qy = Math.floor(l / 8),
        qKey = `${qx},${qy}`;
      if (this._greekBiomeCityCache.has(qKey)) {
        return this._greekBiomeCityCache.get(qKey);
      }

      const maxScan = 120;
      let minX = t,
        maxX = t,
        minY = l,
        maxY = l;
      while (t - minX < maxScan && this._isMeadowCityBiomeAt(minX - 1, l)) minX--;
      while (maxX - t < maxScan && this._isMeadowCityBiomeAt(maxX + 1, l)) maxX++;
      while (l - minY < maxScan && this._isMeadowCityBiomeAt(t, minY - 1)) minY--;
      while (maxY - l < maxScan && this._isMeadowCityBiomeAt(t, maxY + 1)) maxY++;

      const midX = Math.round((minX + maxX) * 0.5),
        midY = Math.round((minY + maxY) * 0.5);
      let cMinX = midX,
        cMaxX = midX,
        cMinY = midY,
        cMaxY = midY;
      while (midX - cMinX < maxScan && this._isMeadowCityBiomeAt(cMinX - 1, midY)) cMinX--;
      while (cMaxX - midX < maxScan && this._isMeadowCityBiomeAt(cMaxX + 1, midY)) cMaxX++;
      while (midY - cMinY < maxScan && this._isMeadowCityBiomeAt(midX, cMinY - 1)) cMinY--;
      while (cMaxY - midY < maxScan && this._isMeadowCityBiomeAt(midX, cMaxY + 1)) cMaxY++;

      const cx = Math.round((cMinX + cMaxX) * 0.5),
        cy = Math.round((cMinY + cMaxY) * 0.5),
        width = cMaxX - cMinX + 1,
        height = cMaxY - cMinY + 1;

      // Quantiza o centro do bioma para que todos os tiles da mesma região encontrem a mesma lista de construções
      const anchorX = Math.round(cx / 32) * 32,
        anchorY = Math.round(cy / 32) * 32,
        anchorKey = `city_${anchorX},${anchorY}`;

      if (this._greekBiomeCityCache.has(anchorKey)) {
        const cachedCity = this._greekBiomeCityCache.get(anchorKey);
        this._greekBiomeCityCache.set(qKey, cachedCity);
        return cachedCity;
      }

      if (width < 20 || height < 20 || Math.hypot(anchorX, anchorY) < 26) {
        this._greekBiomeCityCache.set(qKey, null);
        return null;
      }

      const cityHash = this.hash2D(anchorX, anchorY, 503);
      // Quantidade de Grandes Salões (padrão de 4 salões e corredores): entre 1 a 3 apenas no bioma!
      const maxHallsBySize = width >= 64 || height >= 64 ? 3 : width >= 42 || height >= 42 ? 2 : 1;
      const hallCount = Math.min(maxHallsBySize, 1 + (Math.floor(cityHash * 3) % 3)); // 1, 2 ou 3

      const buildings = [];
      const canPlaceBuilding = (bx, by, hw, hh) => {
        if (Math.hypot(bx, by) < 25) return !1;
        if (!this._isMeadowCityBiomeAt(bx, by)) return !1;
        if (
          !this._isMeadowCityBiomeAt(bx - hw, by - hh) ||
          !this._isMeadowCityBiomeAt(bx + hw, by - hh) ||
          !this._isMeadowCityBiomeAt(bx - hw, by + hh) ||
          !this._isMeadowCityBiomeAt(bx + hw, by + hh)
        ) {
          return !1;
        }
        // Evita sobreposição entre salões e casas (deixa ruas/vielas de pelo menos 4 blocos entre eles)
        for (let i = 0; i < buildings.length; i++) {
          const b = buildings[i];
          if (
            Math.abs(bx - b.cx) <= hw + b.halfW + 4 &&
            Math.abs(by - b.cy) <= hh + b.halfH + 4
          ) {
            return !1;
          }
        }
        return !0;
      };

      // 1. Posiciona de 1 a 3 Salões Principais (padrão 4 salões + corredores em cruz, halfW=9, halfH=8)
      const hallOffsets = [
        [0, 0],
        [-26, -6],
        [26, 6],
        [0, -24],
        [0, 24],
        [-24, 18],
        [24, -18],
      ];
      for (let i = 0; i < hallOffsets.length && buildings.filter((b) => b.kind === "hall").length < hallCount; i++) {
        const ox = hallOffsets[i][0],
          oy = hallOffsets[i][1],
          jx = Math.floor((this.hash2D(anchorX + i, anchorY, 521) - 0.5) * 4),
          jy = Math.floor((this.hash2D(anchorX, anchorY + i, 523) - 0.5) * 4),
          bx = anchorX + ox + jx,
          by = anchorY + oy + jy;
        if (canPlaceBuilding(bx, by, 9, 8)) {
          buildings.push({
            kind: "hall",
            index: buildings.length,
            cx: bx,
            cy: by,
            halfW: 9,
            halfH: 8,
            unfinished: i === 2 && cityHash > 0.55, // O 3º salão pode estar em construção inacabada
          });
        }
      }
      // Garante pelo menos 1 Salão Principal caso os offsets precisem de ajuste fino para o centro real (cx, cy)
      if (buildings.length === 0 && Math.hypot(cx, cy) >= 25) {
        buildings.push({
          kind: "hall",
          index: 0,
          cx: cx,
          cy: cy,
          halfW: 9,
          halfH: 8,
          unfinished: !1,
        });
      }

      // 2. Espalha várias CASAS (cada uma com o padrão de 4 salas internas e corredores em cruz!) ao redor dos salões
      //    para formar uma Cidade Grega bem completa!
      const houseCandidates = [
        [-22, -20], [0, -22], [22, -20],
        [-24, 0],             [24, 0],
        [-22, 20],  [0, 22],  [22, 20],
        [-14, -22], [14, -22], [-14, 22], [14, 22],
        [-38, -14], [38, -14], [-38, 14], [38, 14],
        [-38, 0],   [38, 0],   [0, -38],  [0, 38],
      ];
      const baseCx = buildings[0] ? buildings[0].cx : cx;
      const baseCy = buildings[0] ? buildings[0].cy : cy;
      for (let i = 0; i < houseCandidates.length; i++) {
        const hxOff = houseCandidates[i][0],
          hyOff = houseCandidates[i][1],
          jx = Math.floor((this.hash2D(baseCx + i * 7, baseCy, 541) - 0.5) * 4),
          jy = Math.floor((this.hash2D(baseCx, baseCy + i * 7, 547) - 0.5) * 4),
          bx = baseCx + hxOff + jx,
          by = baseCy + hyOff + jy,
          isUnfinishedHouse = (i % 5 === 4);
        // Cada Casa tem 4 salas divididas por corredores em cruz (halfW: 7, halfH: 6 -> 15x13 tiles)
        if (canPlaceBuilding(bx, by, 7, 6)) {
          buildings.push({
            kind: "house",
            index: buildings.length,
            houseVariant: i % 4,
            cx: bx,
            cy: by,
            halfW: 7,
            halfH: 6,
            unfinished: isUnfinishedHouse,
          });
        }
      }

      // Garante que PELO MENOS 2 construções na cidade apareçam 100% COMPLETAS e INTACTAS (sem paredes quebradas e sem piso falhado)!
      // O 1º Salão Principal (buildings[0]) e a 1ª Casa/Construção seguinte (buildings[1], além de mais casas pares) ficam totalmente completos!
      let completeCount = 0;
      for (let i = 0; i < buildings.length; i++) {
        const b = buildings[i];
        if (!b.unfinished && (i === 0 || i === 1 || i % 3 === 0)) {
          b.isComplete = !0;
          completeCount++;
        } else {
          b.isComplete = !1;
        }
      }
      // Caso por qualquer motivo ainda tenha menos de 2 completas, força as primeiras construções a serem completas
      for (let i = 0; i < buildings.length && completeCount < 2; i++) {
        if (!buildings[i].isComplete) {
          buildings[i].unfinished = !1;
          buildings[i].isComplete = !0;
          completeCount++;
        }
      }

      const city =
        buildings.length > 0
          ? {
              cx: baseCx,
              cy: baseCy,
              halfW: 9,
              halfH: 8,
              stairTx: baseCx,
              stairTy: baseCy + 14,
              buildings,
            }
          : null;
      this._greekBiomeCityCache.set(anchorKey, city);
      this._greekBiomeCityCache.set(qKey, city);
      return city;
    }
    _getGreekRuinCellAt(t, l) {
      if (this.isUnderground) return null;
      const city = this._getMeadowCityDistrict(t, l);
      if (!city || !city.buildings || city.buildings.length === 0) return null;

      // Hash determinístico por tile para irregularidades nas paredes, topos quebrados e PISO FALHADO
      const th = this.hash2D(t, l, 409),
        th2 = this.hash2D(t, l, 419),
        floorHoleHash = this.hash2D(t, l, 431);
      // Topo da parede irregular: 0 = completo com friso, 1 = topo lascado em degraus, 2 = meia altura, 3 = base baixa/inacabada
      let wallHeightState = th < 0.32 ? 0 : th < 0.66 ? 1 : th < 0.88 ? 2 : 3;
      // ~24% dos pisos possuem "piso falhado" (lajes quebradas ou faltando onde a grama/terra aparece)
      const isFloorFailed = floorHoleHash < 0.24;

      // Verifica se o tile (t, l) cai dentro de algum dos Salões (1 a 3) ou de alguma das várias Casas (4 salas cada)
      let activeBld = null;
      let minDist = 9999;
      for (let i = 0; i < city.buildings.length; i++) {
        const b = city.buildings[i],
          rx = t - b.cx,
          ry = l - b.cy;
        if (Math.abs(rx) <= b.halfW && Math.abs(ry) <= b.halfH + (b.kind === "hall" ? 1 : 0)) {
          activeBld = b;
          break;
        }
        const d = Math.max(Math.abs(rx) - b.halfW, Math.abs(ry) - b.halfH);
        if (d < minDist) minDist = d;
      }

      // Entre os salões e casas da cidade (nas ruas/arredores próximos): espalha vasos, estátuas, colunas e pedras caídas
      if (!activeBld) {
        if (t === city.stairTx && l === city.stairTy) {
          return null;
        }
        if (minDist <= 4) {
          if (th < 0.026) {
            return {
              ruin: city,
              rx: t - city.cx,
              ry: l - city.cy,
              role: th2 < 0.34 ? "statue" : th2 < 0.7 ? "vase" : "column",
              roomName: "Via da Cidade Grega em Ruínas",
              subType: Math.floor(th2 * 3),
              wallHeightState: 2,
              floorFailed: !0,
            };
          }
          if (th > 0.968) {
            return {
              ruin: city,
              rx: t - city.cx,
              ry: l - city.cy,
              role: "rubble_wall",
              roomName: "Restos de Estrutura na Cidade",
              subType: 0,
              wallHeightState: 3,
              floorFailed: !0,
            };
          }
          // Calçamento falhado de pedras antigas conectando as casas e salões da cidade
          if (minDist <= 2 && floorHoleHash > 0.58) {
            return {
              ruin: city,
              rx: t - city.cx,
              ry: l - city.cy,
              role: "road",
              roomName: "Rua Antiga da Pólis",
              subType: 0,
              wallHeightState: 0,
              floorFailed: floorHoleHash < 0.74,
            };
          }
        }
        return null;
      }

      const rx = t - activeBld.cx,
        ry = l - activeBld.cy,
        W = activeBld.halfW, // 9 para Salão Monumental, 7 para Casa de 4 Salas
        H = activeBld.halfH, // 8 para Salão Monumental, 6 para Casa de 4 Salas
        isHall = activeBld.kind === "hall",
        isComplete = !!activeBld.isComplete,
        isUnfinished = !isComplete && !!activeBld.unfinished;

      let role = isHall ? "temple_floor" : "house_floor";
      let roomName = isHall
        ? isComplete
          ? `Salão Grego Monumental Completo #${(activeBld.index % 3) + 1}`
          : `Salão Grego Monumental #${(activeBld.index % 3) + 1}`
        : isComplete
          ? `Casa Grega Completa de 4 Cômodos #${activeBld.index}`
          : `Casa Grega de 4 Cômodos #${activeBld.index}`;
      let subType = Math.floor(th * 4);
      let doorVertical = !1;

      if (isComplete) {
        // Construção 100% completa: topo da parede inteiro (0) e sem rachaduras de ruína
        wallHeightState = 0;
        subType = 0;
      } else if (isUnfinished) {
        wallHeightState = th < 0.5 ? 2 : 3;
      }

      // Escadaria e Pórtico Frontal Sul dos Salões Monumentais (ry === H + 1 e ry === H)
      if (isHall && ry === H + 1) {
        if (Math.abs(rx) <= 2) {
          role = "steps";
          roomName = "Escadaria do Propileu Grego";
        } else if (Math.abs(rx) === 4 || Math.abs(rx) === 7) {
          role = "column";
          roomName = "Colunata Dórica Frontal";
        } else {
          role = "porch";
        }
      } else if (isHall && ry === H) {
        if (Math.abs(rx) === 2) {
          role = "column";
          roomName = "Coluna do Portal Grego";
        } else {
          role = "porch";
          roomName = "Pórtico de Entrada (Propileu)";
        }
      } else {
        // =========================================================================
        // PADRÃO ARQUITETÔNICO DE 4 SALAS + CORREDORES EM CRUZ (usado nos 1 a 3 Salões
        // e também nas várias Casas de 4 cômodos espalhadas pela cidade!)
        // =========================================================================
        const southWallY = isHall ? H - 1 : H;
        const northWallY = -H;
        const isOuterWall = Math.abs(rx) === W || ry === northWallY || ry === southWallY;

        // Portas / Entradas na parede externa (Sul, Leste, Oeste)
        const isSouthMainDoor = ry === southWallY && Math.abs(rx) <= 1;
        const isSideCorridorDoor = Math.abs(rx) === W && ry === 0;

        // Paredes internas que dividem o interior nas 4 Salas (Casa/Salão) e Corredores em Cruz:
        // Corredor vertical central: rx in [-1..1]
        // Corredor horizontal central: ry in [-1..1]
        const roomDoorYNorth = isHall ? -4 : -3;
        const roomDoorYSouth = isHall ? 4 : 3;
        const roomDoorX = isHall ? 5 : 4;

        const isVerticalRoomWall =
          Math.abs(rx) === 2 &&
          ry >= northWallY + 1 &&
          ry <= southWallY - 1 &&
          Math.abs(ry) > 1 &&
          ry !== roomDoorYNorth &&
          ry !== roomDoorYSouth;

        const isHorizontalRoomWall =
          Math.abs(ry) === 2 &&
          Math.abs(rx) >= 2 &&
          Math.abs(rx) <= W - 1 &&
          Math.abs(rx) !== roomDoorX;

        const isRoomDoorTile =
          (Math.abs(rx) === 2 && (ry === roomDoorYNorth || ry === roomDoorYSouth)) ||
          (Math.abs(ry) === 2 && Math.abs(rx) === roomDoorX) ||
          (!isHall && ry === southWallY && rx === 0);

        if (isRoomDoorTile && (isComplete || th < 0.72)) {
          role = "door";
          doorVertical = Math.abs(rx) === 2;
          roomName = isHall ? "Porta do Salão Helênico" : "Porta da Casa Grega";
        } else if ((isOuterWall && !isSouthMainDoor && !isSideCorridorDoor) || isVerticalRoomWall || isHorizontalRoomWall) {
          const isCorner =
            (Math.abs(rx) === W && (ry === northWallY || ry === southWallY)) ||
            (Math.abs(rx) === 2 && Math.abs(ry) === 2);
          // Se a construção for COMPLETA (isComplete), nenhuma parede é quebrada!
          if (isComplete) {
            role = "wall";
            wallHeightState = 0;
          } else if (isUnfinished && (rx + ry) % 3 === 0) {
            role = "unfinished_foundation";
          } else if (!isCorner && th > 0.82) {
            role = "rubble_floor";
          } else {
            role = "wall";
          }
        } else {
          // Interior das 4 Salas da Casa / Salão e Corredores:
          const inNW = rx <= -3 && ry <= -3; // 1ª Sala (Noroeste: Quarto / Ânforas)
          const inNE = rx >= 3 && ry <= -3;  // 2ª Sala (Nordeste: Sala de Banquetes Andron / Tesouro)
          const inSW = rx <= -3 && ry >= 3;  // 3ª Sala (Sudoeste: Cozinha / Estudo / Filósofos)
          const inSE = rx >= 3 && ry >= 3;   // 4ª Sala (Sudeste: Oficina / Guarda / Construção)
          const midRoomX = isHall ? 6 : 5;
          const midRoomYNorth = isHall ? -5 : -4;
          const midRoomYSouth = isHall ? 4 : 4;

          if (isUnfinished && rx === 0 && ry === 0) {
            role = "unfinished_work";
            subType = 0; // Guindaste / Andaime no centro da construção inacabada
            roomName = "Construção Grega Inacabada";
          } else if (rx === 0 && ry === 0) {
            role = "mosaic_center";
            roomName = isHall ? "Átrio Central do Salão" : "Pátio Central da Casa (Oikos)";
          } else if (isHall && rx === 0 && ry === northWallY + 2) {
            role = "altar";
            roomName = "Naos do Templo / Salão Principal";
          } else if (rx === 0 && ry === northWallY + 1) {
            role = "statue";
            subType = isHall ? 0 : 1;
          } else if (inNW) {
            roomName = isHall ? "Câmara Noroeste (Ânforas e Estátuas)" : "1º Cômodo da Casa (Quarto Thalamos)";
            if (rx === -midRoomX && ry === midRoomYNorth) {
              role = isHall ? "vase" : "furniture";
              subType = 0; // Cama/Divã Kline na casa
            } else if (rx === -(midRoomX - 2) && ry === midRoomYNorth - 1) {
              role = "vase";
            } else if (isHall && rx === -4 && ry === -6) {
              role = "column";
            }
          } else if (inNE) {
            roomName = isHall ? "Câmara Nordeste (Tesouro Helênico)" : "2º Cômodo da Casa (Andron de Banquetes)";
            if (rx === midRoomX && ry === midRoomYNorth) {
              role = isHall ? "chest" : "furniture";
              subType = 1; // Mesa Trapeza posta na casa
            } else if (rx === midRoomX - 2 && ry === midRoomYNorth - 1) {
              role = isHall ? "statue" : "vase";
            } else if (isHall && rx === 4 && ry === -6) {
              role = "column";
            }
          } else if (inSW) {
            roomName = isHall ? "Câmara Sudoeste (Sala dos Filósofos)" : "3º Cômodo da Casa (Cozinha e Despensa)";
            if (rx === -midRoomX && ry === midRoomYSouth) {
              role = "furniture";
              subType = 1; // Mesa Helênica / Bancada de preparo (sem fogueira natural)
            } else if (rx === -(midRoomX - 2) && ry === midRoomYSouth) {
              role = "furniture";
              subType = 2; // Bancos / Assentos
            } else if (rx === -(midRoomX + 1) && ry === midRoomYSouth - 1) {
              role = "vase";
            }
          } else if (inSE) {
            roomName = isHall ? "Câmara Sudeste (Assembleia e Guarda)" : "4º Cômodo da Casa (Sala de Ofícios e Arca)";
            if (rx === midRoomX && ry === midRoomYSouth) {
              role = isUnfinished ? "unfinished_work" : "chest";
              subType = 1;
            } else if (rx === midRoomX - 2 && ry === midRoomYSouth) {
              role = "furniture";
              subType = 3; // Tribuna / Mesa de estudos
            } else if (rx === midRoomX + 1 && ry === midRoomYSouth - 1) {
              role = "statue";
              subType = isComplete ? 1 : 2;
            }
          } else if (isHall && Math.abs(rx) === 4 && ry === 0) {
            role = "column";
          }
        }
      }

      return {
        ruin: activeBld,
        city,
        rx,
        ry,
        role,
        roomName,
        subType,
        wallHeightState: isComplete ? 0 : wallHeightState,
        doorVertical,
        isComplete,
        floorFailed: isComplete ? !1 : (isFloorFailed || isUnfinished),
      };
    }
    _getMountain25DBounds(t, l) {
      if (!this._mountainBoundsCache) {
        this._mountainBoundsCache = new Map();
      }
      const key = `${t},${l}`;
      if (this._mountainBoundsCache.has(key)) {
        return this._mountainBoundsCache.get(key);
      }
      // Mede o tamanho horizontal e vertical do bioma a partir deste ponto (escaneia até a borda do bioma)
      const maxScan = 160;
      let minX = t,
        maxX = t,
        minY = l,
        maxY = l;
      while (t - minX < maxScan && this._isMountain25DBiomeAt(minX - 1, l)) minX--;
      while (maxX - t < maxScan && this._isMountain25DBiomeAt(maxX + 1, l)) maxX++;
      while (l - minY < maxScan && this._isMountain25DBiomeAt(t, minY - 1)) minY--;
      while (maxY - l < maxScan && this._isMountain25DBiomeAt(t, maxY + 1)) maxY++;

      // Refina o centro usando o meio da faixa horizontal e vertical para manter o 2º andar coeso
      const midX = Math.round((minX + maxX) * 0.5),
        midY = Math.round((minY + maxY) * 0.5);
      let cMinX = midX,
        cMaxX = midX,
        cMinY = midY,
        cMaxY = midY;
      while (midX - cMinX < maxScan && this._isMountain25DBiomeAt(cMinX - 1, midY)) cMinX--;
      while (cMaxX - midX < maxScan && this._isMountain25DBiomeAt(cMaxX + 1, midY)) cMaxX++;
      while (midY - cMinY < maxScan && this._isMountain25DBiomeAt(midX, cMinY - 1)) cMinY--;
      while (cMaxY - midY < maxScan && this._isMountain25DBiomeAt(midX, cMaxY + 1)) cMaxY++;

      const biomeWidth = Math.max(1, cMaxX - cMinX + 1),
        biomeHeight = Math.max(1, cMaxY - cMinY + 1),
        centerX = (cMinX + cMaxX) * 0.5,
        centerY = (cMinY + cMaxY) * 0.5;

      // Calcula os andares sucessivos dividindo o tamanho por 2 a cada andar (1º -> 2º -> 3º -> 4º...),
      // parando no topo quando o andar atingir o limite mínimo de 10 blocos!
      const floors = [];
      let curW = biomeWidth * 0.5,
        curH = biomeHeight * 0.5,
        floorNum = 2;
      while ((curW >= 10 || curH >= 10) && floorNum <= 12) {
        const w = Math.max(10, curW),
          h = Math.max(10, curH);
        floors.push({
          tier: floorNum,
          width: w,
          height: h,
          rx: w * 0.5,
          ry: h * 0.5,
        });
        if (curW <= 10 && curH <= 10) break;
        const nextW = curW * 0.5,
          nextH = curH * 0.5;
        if (nextW < 10 && nextH < 10) {
          // Se o andar atual ainda era maior que 10 blocos, cria o último andar do topo cravado no limite de 10 blocos
          if (w > 10 || h > 10) {
            floorNum++;
            floors.push({
              tier: floorNum,
              width: 10,
              height: 10,
              rx: 5,
              ry: 5,
            });
          }
          break;
        }
        curW = nextW;
        curH = nextH;
        floorNum++;
      }
      // Caso o bioma seja pequeno mas ainda comporte pelo menos um 2º andar de 10 blocos no topo:
      if (floors.length === 0 && biomeWidth >= 14 && biomeHeight >= 14) {
        floors.push({
          tier: 2,
          width: 10,
          height: 10,
          rx: 5,
          ry: 5,
        });
      }

      const info = {
        centerX,
        centerY,
        biomeWidth,
        biomeHeight,
        floors,
      };
      this._mountainBoundsCache.set(key, info);
      return info;
    }
    _getMountain25DInfo(t, l) {
      if (!this._isMountain25DBiomeAt(t, l)) {
        return { isMountain: !1, tier: 0, tierRaw: -1 };
      }
      // Cada andar divide o tamanho do andar anterior por 2 (1º -> 2º -> 3º -> 4º...) até o topo no limite de 10 blocos!
      const b = this._getMountain25DBounds(t, l);
      let distToOuterEdge = 99;
      for (let d = 1; d <= 5; d++) {
        if (
          !this._isMountain25DBiomeAt(t - d, l) ||
          !this._isMountain25DBiomeAt(t + d, l) ||
          !this._isMountain25DBiomeAt(t, l - d) ||
          !this._isMountain25DBiomeAt(t, l + d)
        ) {
          distToOuterEdge = d;
          break;
        }
      }
      let tier = 1;
      if (distToOuterEdge > 4 && b.floors && b.floors.length > 0) {
        const dx = t - b.centerX,
          dy = l - b.centerY;
        for (let i = 0; i < b.floors.length; i++) {
          const f = b.floors[i],
            nx = dx / Math.max(5, f.rx),
            ny = dy / Math.max(5, f.ry);
          if (nx * nx + ny * ny <= 1.0) {
            tier = f.tier;
          } else {
            break;
          }
        }
      }
      return { isMountain: !0, tier, tierRaw: tier };
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
        // 1º Andar (tier = 1): O bioma inteiro cercado pelo paredão externo (4 tiles de espessura).
        // 2º Andar (tier = 2): Criado em cima do bioma com metade do tamanho do bioma (tamanho / 2),
        // cercado pelo seu próprio paredão 4x maior!
        const info = this._getMountain25DInfo(t, l),
          myTier = info.tier;
        let isCliffBorder = !1;
        let isOuterFace = !1;
        let minNeighborTier = myTier;
        for (let dy = -4; dy <= 4; dy++) {
          for (let dx = -4; dx <= 4; dx++) {
            if (dx === 0 && dy === 0) continue;
            const dist = Math.max(Math.abs(dx), Math.abs(dy));
            if (dist <= 4) {
              const nTier = this._getMountain25DInfo(t + dx, l + dy).tier;
              if (nTier < myTier) {
                isCliffBorder = !0;
                if (dist === 1) {
                  isOuterFace = !0;
                  if (nTier < minNeighborTier) minNeighborTier = nTier;
                }
              }
            }
          }
        }
        const isWall = isCliffBorder;

        se.mountainTier = myTier;
        se.lowerTier = isOuterFace ? minNeighborTier : myTier;
        se.isElevatedBiome = !0;
        se.isPerimeterCliff = myTier === 1 && isCliffBorder;
        se.isSecondFloorCliff = myTier === 2 && isCliffBorder;
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
              subType: myTier,
              offsetX: 0,
              offsetY: 0,
              scale: 1,
              namePt: `Muralha do ${myTier}º Andar do Platô`,
              descriptionPt:
                myTier === 1
                  ? "Paredão monumental 4x maior que cerca e eleva o 1º andar do bioma de Montanhas 2.5D."
                  : `Paredão do ${myTier}º andar erguido com metade do tamanho do ${myTier - 1}º andar (limite de 10 blocos no topo).`,
            };
          }
        }
      }
      const greekRuin = this._getGreekRuinCellAt(t, l);
      if (greekRuin) {
        se.isGreekRuin = !0;
        se.greekRuinRole = greekRuin.role;
        se.greekRuinRx = greekRuin.rx;
        se.greekRuinRy = greekRuin.ry;
        se.greekRoomName = greekRuin.roomName;
        se.greekFloorFailed = !!greekRuin.floorFailed;
        const canKeepCustom =
          this.customPlacedProps.has(O) || (_ && _.kind === "cave_entrance");
        if (!canKeepCustom) {
          const intState =
            this.interactedProps.get(O) || this.interactedProps.get(`${t},${l}`) || {};
          if (greekRuin.role === "wall" || greekRuin.role === "rubble_wall") {
            const wHeight =
              greekRuin.isComplete
                ? 0
                : greekRuin.role === "rubble_wall"
                  ? 3
                  : (greekRuin.wallHeightState ?? (Math.abs(t + l * 3) % 4));
            // Paredes com wHeight === 3 são tocos de parede desmoronada/inacabada baixos
            se.isGreekWall = wHeight <= 2;
            se.prop = {
              kind: "greek_wall",
              subType: greekRuin.isComplete ? 0 : (Math.abs(t + l * 3) % 3),
              wallHeightState: wHeight,
              offsetX: 0,
              offsetY: 0,
              scale: 1,
              namePt:
                wHeight === 0
                  ? "Muralha de Mármore Helênico Completa"
                  : wHeight === 1
                    ? "Parede Grega com Topo Irregular Quebrado"
                    : wHeight === 2
                      ? "Parede Grega Semi-Desmoronada (Meia Altura)"
                      : "Base de Parede em Ruínas / Inacabada",
              descriptionPt:
                "Cantaria clássica de mármore com topo irregular desgastado pelos séculos, lascas de pedra e hera mediterrânea.",
            };
          } else if (greekRuin.role === "door") {
            const isOpen = intState.opened !== void 0 ? !!intState.opened : !1;
            se.isGreekDoor = !0;
            se.isGreekDoorOpen = isOpen;
            se.prop = {
              kind: "greek_door",
              subType: greekRuin.doorVertical ? 1 : 0,
              opened: isOpen,
              offsetX: 0,
              offsetY: 0,
              scale: 1,
              interactive: !0,
              namePt: isOpen
                ? `Porta Helênica Aberta (${greekRuin.roomName})`
                : `Porta de Madeira e Bronze (${greekRuin.roomName})`,
              descriptionPt: isOpen
                ? "Portal de mármore com batentes de cedro e cravos de bronze aberto. Pressione [F] para fechar."
                : "Antiga porta grega de madeira de cedro reforçada com bronze sob lintel de mármore. Pressione [F] para abrir ou fechar!",
            };
          } else if (greekRuin.role === "statue") {
            const stType = greekRuin.subType ?? (Math.abs(t + l) % 3);
            const stNames = [
              "Estátua Monumental de Atena Parthenos",
              "Estátua de Filósofo e Orador da Pólis",
              "Kouros de Mármore em Ruínas (Escultura Inacabada)",
            ];
            se.prop = {
              kind: "greek_statue",
              subType: stType,
              offsetX: 0,
              offsetY: -4,
              scale: 1.2,
              interactive: !0,
              namePt: stNames[stType % stNames.length],
              descriptionPt:
                "Escultura clássica de mármore pario sobre pedestal com inscrições em grego antigo. Pressione [F] para contemplar!",
            };
          } else if (greekRuin.role === "vase" || greekRuin.role === "amphora_cluster") {
            const vType = greekRuin.subType ?? (Math.abs(t * 3 + l) % 3);
            const vNames = [
              "Ânforas Gregas de Figuras Negras",
              "Cratera (Krater) de Cerâmica de Banquete",
              "Pithos e Jarros de Azeite de Terracota",
            ];
            se.prop = {
              kind: "greek_vase",
              subType: vType,
              offsetX: 0,
              offsetY: 0,
              scale: 1.08,
              interactive: !0,
              opened: !!intState.opened,
              namePt: vNames[vType % vNames.length],
              descriptionPt:
                "Vasos de cerâmica grega pintados com cenas mitológicas e padrão de meandro. Pressione [F] para vasculhar o interior!",
            };
          } else if (greekRuin.role === "furniture") {
            const fType = greekRuin.subType ?? (Math.abs(t + l * 7) % 4);
            const fNames = [
              "Kline (Divã Grego de Banquete com Almofadas)",
              "Trapeza (Mesa Helênica com Taças Kylix)",
              "Bancada / Cadeira Klismos de Mármore",
              "Bema (Tribuna do Orador com Pergaminhos)",
            ];
            se.prop = {
              kind: "greek_furniture",
              subType: fType,
              offsetX: 0,
              offsetY: 0,
              scale: 1.1,
              interactive: !0,
              namePt: fNames[fType % fNames.length],
              descriptionPt:
                `Mobiliário autêntico da Grécia Antiga situado em: ${greekRuin.roomName}. Pressione [F] para examinar.`,
            };
          } else if (greekRuin.role === "unfinished_work") {
            const uType = greekRuin.subType ?? (Math.abs(t + l) % 2);
            se.prop = {
              kind: "greek_unfinished",
              subType: uType,
              offsetX: 0,
              offsetY: -2,
              scale: 1.15,
              interactive: !0,
              namePt:
                uType === 0
                  ? "Guindaste Helênico (Polyspastos) e Andaime Inacabado"
                  : "Blocos de Mármore Bruto e Tambores de Coluna Inacabados",
              descriptionPt:
                "Canteiro de obras da Grécia Antiga deixado pela metade pelos canteiros e escultores. Pressione [F] para inspecionar as ferramentas e blocos.",
            };
          } else if (greekRuin.role === "column") {
            se.prop = {
              kind: "ruin_pillar",
              subType: greekRuin.isComplete ? 0 : (Math.abs(t * 5 + l) % 2),
              offsetX: 0,
              offsetY: -4,
              scale: 1.15,
              interactive: !0,
              namePt: "Coluna Dórica de Mármore",
              descriptionPt:
                "Coluna grega canelada de mármore branco com capitel dórico esculpido. Pressione [F] para examinar.",
            };
          } else if (greekRuin.role === "altar") {
            se.prop = {
              kind: "shrine",
              subType: 0,
              offsetX: 0,
              offsetY: -4,
              scale: 1.25,
              interactive: !0,
              namePt: "Altar Sagrado do Naos (Templo Grego)",
              descriptionPt:
                intState.activated
                  ? "A chama divina de Atena brilha sobre o mármore sagrado do Naos!"
                  : "Altar central na Cella do Templo Grego, diante da estátua divina. Pressione [F] para receber a bênção do Olimpo!",
            };
          } else if (greekRuin.role === "chest") {
            const opened = !!intState.opened;
            se.prop = {
              kind: "chest",
              subType: 0,
              offsetX: 0,
              offsetY: 0,
              scale: 1.05,
              interactive: !opened,
              opened: opened,
              namePt: opened
                ? "Kibotos / Arca Helênica (Saqueada)"
                : "Kibotos (Arca de Tesouro Helênico)",
              descriptionPt: opened
                ? "Os tesouros desta câmara grega já foram recolhidos."
                : `Arca ornamentada guardada em: ${greekRuin.roomName}. Pressione [F] para abrir!`,
            };
          } else {
            // Corredores, rua da Ágora, pátio da casa e pisos internos ficam limpos de árvores/pedras selvagens
            se.prop = null;
          }
        }
      }
      return (this.tileCache.set(o, se), se);
    }
    _getUndergroundGreekSanctuaryCellAt(t, l) {
      // Verifica se este ponto subterrâneo está ESTRITAMENTE abaixo do bioma que tem Ruínas Gregas (MEADOW).
      // Cavernas abaixo de quaisquer outros biomas continuam sendo cavernas naturais normais!
      const surfB = this._computeSurfaceBaseBiome(t, l);
      const isUnderMeadow = !!(
        surfB &&
        (surfB.id === BiomeId.MEADOW || surfB.id === BiomeId.MEADOW_LAKE)
      );
      if (!isUnderMeadow) return null;

      // Se a borda do bioma MEADOW estiver a 1 bloco de distância de outro bioma,
      // fecha com parede intacta de mármore para isolar a estrutura das cavernas normais (sem portas soltas em corredores)!
      const isMeadowAt = (nx, ny) => {
        const nb = this._computeSurfaceBaseBiome(nx, ny);
        return !!(nb && (nb.id === BiomeId.MEADOW || nb.id === BiomeId.MEADOW_LAKE));
      };
      const borderN = !isMeadowAt(t, l - 1),
        borderS = !isMeadowAt(t, l + 1),
        borderW = !isMeadowAt(t - 1, l),
        borderE = !isMeadowAt(t + 1, l);
      if (borderN || borderS || borderW || borderE) {
        return {
          role: "wall",
          rx: 0,
          ry: 0,
          roomName: "Muralha Externa do Palácio Subterrâneo",
          subType: 0,
        };
      }

      // Se este tile for uma Escadaria de Saída (ou imediatamente ao lado dela, dist <= 1),
      // garante piso de mosaico real aberto para nunca prender o jogador ao descer/subir!
      const nearExit = this.getNearbyCaveExit(t, l, 1.5);
      if (nearExit) {
        return {
          role: "mosaic_center",
          rx: Math.round(-nearExit.dx),
          ry: Math.round(-nearExit.dy),
          roomName: "Pátio da Escadaria Subterrânea",
          subType: 0,
        };
      }

      // =========================================================================
      // ARQUITETURA SUBTERRÂNEA HELÊNICA (100% Intacta — Sem Rochedos Naturais!):
      // 1. REDE DE CORREDORES PRINCIPAIS CONTÍNUOS (Avenidas Subterrâneas de 3 blocos
      //    de largura totalmente livres — ZERO portas no meio dos corredores!).
      // 2. ALAS DE SALÕES CONECTADOS (1, 2 ou até 3 Salões de tamanhos variados):
      //    - Portas existem EXCLUSIVAMENTE para entrar nos Salões:
      //      * Do Corredor Principal para o SALÃO 1 (Salão de Entrada).
      //      * Do SALÃO 1 para o SALÃO 2 (Porta Interna).
      //      * Do SALÃO 2 para o SALÃO 3 (Porta Interna).
      //    - O SALÃO 2 e o SALÃO 3 NÃO têm porta para o corredor!
      // =========================================================================
      const blockSize = 32;
      const bx = Math.floor(t / blockSize),
        by = Math.floor(l / blockSize),
        lx = ((t % blockSize) + blockSize) % blockSize, // 0..31
        ly = ((l % blockSize) + blockSize) % blockSize; // 0..31

      const blockHash = this.hash2D(bx, by, 701),
        wingHashA = this.hash2D(bx, by, 719),
        wingHashB = this.hash2D(bx, by, 733),
        decorHash = this.hash2D(t, l, 709);

      // -------------------------------------------------------------------------
      // A. CORREDORES PRINCIPAIS CONTÍNUOS (lx in 0..4 e ly in 0..4):
      //    - Piso do corredor contínuo: lx in 1..3 ou ly in 1..3 (100% livre, sem portas no meio!)
      //    - Paredes laterais do corredor: lx === 0, lx === 4, ly === 0, ly === 4
      //    - Nas paredes laterais do corredor ficam APENAS as portas que entram no SALÃO 1!
      // -------------------------------------------------------------------------
      const inHorizAvenue = ly >= 1 && ly <= 3;
      const inVertAvenue = lx >= 1 && lx <= 3;

      if (inHorizAvenue || inVertAvenue) {
        // Cruzamento das duas avenidas de corredores (lx in 1..3, ly in 1..3)
        if (inHorizAvenue && inVertAvenue) {
          return {
            role: lx === 2 && ly === 2 ? "mosaic_center" : "corridor",
            rx: lx - 2,
            ry: ly - 2,
            roomName: "Encruzilhada do Grande Corredor Subterrâneo",
            subType: 0,
          };
        }
        return {
          role: "corridor",
          rx: inVertAvenue ? lx - 2 : 0,
          ry: inHorizAvenue ? ly - 2 : 0,
          roomName: "Grande Corredor Subterrâneo",
          subType: 0,
        };
      }

      // Paredes que ladeiam os Corredores Principais (lx === 0, lx === 4, ly === 0, ly === 4)
      const isCorridorWall = lx === 0 || lx === 4 || ly === 0 || ly === 4;
      if (isCorridorWall) {
        // Porta ÚNICA do Corredor Norte (ly === 4) para o SALÃO 1 da Ala A (em lx === 10, ly === 4)
        if (ly === 4 && lx === 10) {
          return {
            role: "door",
            rx: 0,
            ry: 0,
            roomName: "Porta do Salão de Entrada (Conectado ao Corredor)",
            subType: 0,
            doorVertical: !1,
          };
        }
        // Porta ÚNICA do Corredor Oeste (lx === 4) para o SALÃO 1 da Ala B (em lx === 4, ly === 22)
        if (lx === 4 && ly === 22) {
          return {
            role: "door",
            rx: 0,
            ry: 0,
            roomName: "Porta do Salão de Entrada (Conectado ao Corredor)",
            subType: 1,
            doorVertical: !0,
          };
        }
        return {
          role: "wall",
          rx: lx,
          ry: ly,
          roomName: "Muralha do Grande Corredor Subterrâneo",
          subType: 0,
        };
      }

      // -------------------------------------------------------------------------
      // B. INTERIOR DO QUADRANTE (lx in 5..31, ly in 5..31 -> área 27x27):
      //    Dividido por uma parede mestra horizontal em ly === 17 em DUAS ALAS INDEPENDENTES:
      //    - ALA NORTE (ly in 5..17, lx in 5..31):
      //      Pode ter 1 Salão grandioso, 2 Salões conectados em série, ou 3 Salões conectados em série!
      //      * Apenas o SALÃO 1 tem porta para o Corredor Principal (em lx === 10, ly === 4).
      //      * O SALÃO 2 só é acessível por uma porta interna a partir do SALÃO 1!
      //      * O SALÃO 3 só é acessível por uma porta interna a partir do SALÃO 2!
      //    - ALA SUL (ly in 17..31, lx in 5..31):
      //      Pode ter 1, 2 ou 3 Salões de tamanhos diferentes conectados em série!
      //      * Apenas o SALÃO 1 da Ala Sul tem porta para o Corredor Principal (em lx === 4, ly === 22).
      //      * O SALÃO 2 e o SALÃO 3 da Ala Sul conectam-se apenas entre si (Salão 1 -> Salão 2 -> Salão 3),
      //        sem nenhuma porta para o corredor!
      // -------------------------------------------------------------------------

      // Parede mestra separando a Ala Norte da Ala Sul em ly === 17
      if (ly === 17) {
        return {
          role: "wall",
          rx: lx - 18,
          ry: 0,
          roomName: "Muralha Divisória dos Salões",
          subType: 0,
        };
      }

      const isNorthWing = ly < 17;
      const wHash = isNorthWing ? wingHashA : wingHashB;
      // Quantidade de salões conectados em cadeia nesta ala: 1, 2 ou 3 salões!
      // (Prioriza cadeias de 2 e 3 salões conectados um no outro, além de grandes salões únicos)
      const numHallsInChain = wHash < 0.18 ? 1 : wHash < 0.55 ? 2 : 3;

      // Coordenadas verticais da Ala atual:
      // Ala Norte: y de 5 a 16 (altura interna = 12 blocos)
      // Ala Sul:   y de 18 a 31 (altura interna = 14 blocos)
      const wingYMin = isNorthWing ? 5 : 18;
      const wingYMax = isNorthWing ? 16 : 31;
      const wingMidY = Math.floor((wingYMin + wingYMax) / 2);

      // Define as paredes divisórias entre os salões da cadeia (xSplit1 entre Salão 1 e Salão 2; xSplit2 entre Salão 2 e Salão 3)
      // variando os tamanhos para criar Salões Grandes, Médios e Câmaras Menores!
      let xSplit1 = 32,
        xSplit2 = 32;
      if (numHallsInChain === 2) {
        // 2 Salões conectados: Salão 1 (ligado ao corredor) -> Porta Interna -> Salão 2 (exclusivo, sem porta pro corredor!)
        xSplit1 = wHash < 0.36 ? 16 : 20; // Salão 1 médio/grande + Salão 2 grande/médio
      } else if (numHallsInChain === 3) {
        // 3 Salões conectados em série:
        // Salão 1 (ligado ao corredor) -> Porta Interna -> Salão 2 (intermediário) -> Porta Interna -> Salão 3 (profundo)
        // Nem o Salão 2 nem o Salão 3 têm conexão direta com o corredor!
        xSplit1 = wHash < 0.78 ? 13 : 15;
        xSplit2 = wHash < 0.78 ? 22 : 24;
      }

      // Verifica se este tile (lx, ly) está em uma Parede Divisória entre Salão 1 e Salão 2 (xSplit1)
      // ou entre Salão 2 e Salão 3 (xSplit2):
      if (lx === xSplit1 || lx === xSplit2) {
        const isFirstConnection = lx === xSplit1;
        // Porta interna que conecta um salão diretamente no outro!
        const doorY = isFirstConnection ? wingMidY : wingMidY + (blockHash > 0.5 ? 1 : -1);
        if (ly === doorY) {
          return {
            role: "door",
            rx: 0,
            ry: 0,
            roomName: isFirstConnection
              ? "Porta Interna: Salão 1 → Salão 2 (Sem saída para o Corredor)"
              : "Porta Interna: Salão 2 → Salão 3 (Câmara Profunda)",
            subType: 1,
            doorVertical: !0,
          };
        }
        return {
          role: "wall",
          rx: 0,
          ry: ly - wingMidY,
          roomName: "Muralha entre Salões Conectados",
          subType: 0,
        };
      }

      // Identifica em qual dos 3 salões da cadeia estamos (hallIndex: 1, 2 ou 3) e seus limites exatos [hXMin..hXMax]:
      let hallIndex = 1,
        hXMin = 5,
        hXMax = 31;
      if (numHallsInChain === 2) {
        if (lx < xSplit1) {
          hallIndex = 1;
          hXMin = 5;
          hXMax = xSplit1 - 1;
        } else {
          hallIndex = 2;
          hXMin = xSplit1 + 1;
          hXMax = 31;
        }
      } else if (numHallsInChain === 3) {
        if (lx < xSplit1) {
          hallIndex = 1;
          hXMin = 5;
          hXMax = xSplit1 - 1;
        } else if (lx < xSplit2) {
          hallIndex = 2;
          hXMin = xSplit1 + 1;
          hXMax = xSplit2 - 1;
        } else {
          hallIndex = 3;
          hXMin = xSplit2 + 1;
          hXMax = 31;
        }
      }

      // Para dar tamanhos variados também na altura (além da largura), alguns Salões 2 ou 3 são mais estreitos
      // verticalmente, com paredes duplas internas de mármore:
      let hYMin = wingYMin,
        hYMax = wingYMax;
      if (hallIndex === 3 && numHallsInChain === 3 && wHash > 0.82) {
        // Câmara 3 mais compacta verticalmente (mas mantendo a porta em doorY acessível)
        hYMin = wingYMin + 1;
        hYMax = wingYMax - 1;
        if (ly < hYMin || ly > hYMax) {
          return {
            role: "wall",
            rx: lx - Math.floor((hXMin + hXMax) / 2),
            ry: ly - wingMidY,
            roomName: "Muralha da Câmara Interna",
            subType: 0,
          };
        }
      }

      const hCenterX = Math.floor((hXMin + hXMax) / 2),
        hCenterY = Math.floor((hYMin + hYMax) / 2),
        hWidth = hXMax - hXMin + 1,
        hHeight = hYMax - hYMin + 1,
        rx = lx - hCenterX,
        ry = ly - hCenterY,
        arx = Math.abs(rx),
        ary = Math.abs(ry);

      const roomName =
        numHallsInChain === 1
          ? "Grande Salão Imperial (Ligado ao Corredor)"
          : hallIndex === 1
            ? `1º Salão de Entrada (Ligado ao Corredor — Cadeia de ${numHallsInChain} Salões)`
            : hallIndex === 2
              ? `2º Salão Interno (Ligado ao 1º Salão — Cadeia de ${numHallsInChain} Salões)`
              : "3º Salão Profundo do Santuário (Ligado apenas ao 2º Salão)";

      // Decoração e Arquitetura Interna conforme o tamanho e a posição do Salão na cadeia (1º, 2º ou 3º):
      // 1. Centro do Salão (rx === 0, ry === 0):
      if (rx === 0 && ry === 0) {
        if (hallIndex === 3 || (hallIndex === 2 && numHallsInChain === 2)) {
          // O último salão da cadeia guarda um Altar Sagrado ou uma Arca Real Kibotos!
          return {
            role: (bx + by + hallIndex) % 2 === 0 ? "altar" : "chest",
            rx,
            ry,
            roomName,
            subType: 0,
          };
        }
        return {
          role: "mosaic_center",
          rx,
          ry,
          roomName,
          subType: 0,
        };
      }

      // 2. Colunas Dóricas Intactas nos salões largos/grandes (sem bloquear as portas!)
      if (
        hWidth >= 11 &&
        hHeight >= 10 &&
        arx === Math.max(2, Math.floor(hWidth / 4)) &&
        ary === Math.max(2, Math.floor(hHeight / 4))
      ) {
        return {
          role: "column",
          rx,
          ry,
          roomName,
          subType: 0,
        };
      }

      // 3. Estátuas Helênicas Intactas nos salões internos ou grandes
      if (
        rx === 0 &&
        ly === hYMin + 1 &&
        lx !== 10 && // nunca bloqueia a porta do corredor norte!
        hHeight >= 10
      ) {
        return {
          role: "statue",
          rx,
          ry,
          roomName,
          subType: (Math.abs(bx + by) + hallIndex) % 2,
        };
      }

      // 4. Mobiliário Grego Intacto (Divãs Kline, Mesas Trapeza), Ânforas e Arcas nos cantos internos de cada salão
      const isCornerSpot =
        (lx === hXMin + 1 || lx === hXMax - 1) &&
        (ly === hYMin + 1 || ly === hYMax - 1) &&
        !(lx === 10 && ly === 6) && // deixa livre a frente da porta norte
        !(lx === 6 && ly === 22); // deixa livre a frente da porta oeste
      if (isCornerSpot && decorHash < 0.68) {
        if (hallIndex >= 2 && decorHash < 0.26) {
          return { role: "chest", rx, ry, roomName, subType: 0 };
        }
        if (decorHash < 0.48) {
          return {
            role: "furniture",
            rx,
            ry,
            roomName,
            subType: decorHash < 0.36 ? 0 : 1,
          };
        }
        return {
          role: "vase",
          rx,
          ry,
          roomName,
          subType: Math.floor(decorHash * 3) % 3,
        };
      }

      // 5. Piso 100% Intacto (alternando entre mármore de templo e terracota real para diferenciar visualmente os salões conectados!)
      return {
        role: hallIndex === 2 ? "house_floor" : "temple_floor",
        rx,
        ry,
        roomName,
        subType: 0,
      };
    }
    getUndergroundTile(t, l) {
      const u = this.hash2D(t, l, 97);
      const thisCave = this.getCaveEntranceAt(t, l);
      if (thisCave) {
        const surfBiome = this._computeSurfaceBaseBiome(t, l);
        const isStair = !!(
          thisCave.isStaircase ||
          thisCave.subType === 2 ||
          (surfBiome &&
            (surfBiome.id === BiomeId.MEADOW ||
              surfBiome.id === BiomeId.MEADOW_LAKE))
        );
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
          isGreekRuin: isStair,
          greekRuinRole: isStair ? "mosaic_center" : void 0,
          greekRuinRx: 0,
          greekRuinRy: 0,
          greekFloorFailed: !1,
          prop: {
            kind: "cave_exit",
            subType: thisCave.subType || 0,
            isStaircase: isStair,
            isMerged: !!thisCave.isMerged,
            mergedCount: thisCave.mergedCount || 1,
            surfaceBiome: surfBiome,
            targetTx: t,
            targetTy: l,
            offsetX: 0,
            offsetY: -4,
            scale: thisCave.scale || 1.35,
            interactive: !0,
            namePt: isStair
              ? `Escadaria de Saída do Subsolo [${cleanName}]`
              : `Saída da Caverna [${cleanName}]`,
            descriptionPt: isStair
              ? `Escadaria monumental de mármore que sobe do subsolo de volta para o bioma de ruínas em [${t}, ${l}]. Pressione [F] para subir!`
              : `Portal rochoso em arco conectado com a superfície em [${t}, ${l}] (${thisCave.namePt}). Pressione [F] para emergir no mundo superior!`,
          },
          detailHash: u,
        };
      }

      // =========================================================================
      // PRIORIDADE MÁXIMA NO SUBSOLO DO BIOMA DE RUÍNAS (MEADOW):
      // Avalia a grande estrutura temática de Corredores, Salões de Tamanhos
      // Diferentes e Portas ANTES do gerador de rochedos de caverna!
      // Assim NUNCA surgem rochedos (CAVE_WALL / stalagmites) neste subsolo!
      // =========================================================================
      const p = `cave_${t},${l}`;
      const sanctuary = this._getUndergroundGreekSanctuaryCellAt(t, l);
      if (sanctuary) {
        const intState =
          this.interactedProps.get(p) ||
          this.interactedProps.get(`underground_${t},${l}`) ||
          this.interactedProps.get(`${t},${l}`) ||
          {};
        let sProp = null;
        let isGreekWall = !1;
        let isGreekDoor = !1;
        let isGreekDoorOpen = !1;

        if (this.customPlacedProps.has(p)) {
          sProp = { ...this.customPlacedProps.get(p) };
        } else if (sanctuary.role === "wall") {
          isGreekWall = !0;
          sProp = {
            kind: "greek_wall",
            subType: 0,
            wallHeightState: 0, // 100% Intacto (sem quebras!)
            offsetX: 0,
            offsetY: 0,
            scale: 1,
            namePt: "Muralha Subterrânea Helênica Intacta",
            descriptionPt: `Parede de mármore perfeitamente preservada no subsolo (${sanctuary.roomName}).`,
          };
        } else if (sanctuary.role === "door") {
          const isOpen = !!intState.opened;
          isGreekDoor = !0;
          isGreekDoorOpen = isOpen;
          sProp = {
            kind: "greek_door",
            subType: sanctuary.doorVertical ? 1 : 0,
            opened: isOpen,
            offsetX: 0,
            offsetY: 0,
            scale: 1,
            interactive: !0,
            namePt: isOpen
              ? `${sanctuary.roomName} (Porta Aberta)`
              : `${sanctuary.roomName} (Porta Fechada)`,
            descriptionPt: isOpen
              ? "Os batentes de cedro e bronze desta porta subterrânea estão abertos. Pressione [F] para fechar."
              : "Uma porta intacta de cedro e bronze guardando o salão subterrâneo. Pressione [F] para abrir!",
          };
        } else if (sanctuary.role === "column") {
          sProp = {
            kind: "ruin_pillar",
            subType: 0, // Coluna 100% inteira!
            offsetX: 0,
            offsetY: -4,
            scale: 1.15,
            interactive: !0,
            namePt: "Coluna Dórica Subterrânea Intacta",
            descriptionPt: `Coluna de mármore canelado que sustenta a abóbada de: ${sanctuary.roomName}.`,
          };
        } else if (sanctuary.role === "statue") {
          sProp = {
            kind: "greek_statue",
            subType: sanctuary.subType || 0, // 0 ou 1 (estátuas completas!)
            offsetX: 0,
            offsetY: -4,
            scale: 1.15,
            interactive: !0,
            namePt:
              sanctuary.subType === 0
                ? "Estátua de Palas Atena (Santuário Subterrâneo)"
                : "Estátua Olímpica de Mármore",
            descriptionPt: `Escultura helênica preservada em estado impecável no interior de: ${sanctuary.roomName}. Pressione [F] para examinar.`,
          };
        } else if (sanctuary.role === "vase") {
          const opened = !!intState.opened;
          sProp = {
            kind: "greek_vase",
            subType: sanctuary.subType || 0,
            offsetX: 0,
            offsetY: -2,
            scale: 1.05,
            interactive: !0,
            opened: opened,
            namePt: opened
              ? "Ânforas Reais do Subsolo (Examinadas)"
              : "Ânforas e Crateras de Cerâmica Grega",
            descriptionPt: opened
              ? "Vasos de figuras negras preservados no complexo subterrâneo."
              : `Cerâmicas intactas guardadas em: ${sanctuary.roomName}. Pressione [F] para inspecionar!`,
          };
        } else if (sanctuary.role === "furniture") {
          sProp = {
            kind: "greek_furniture",
            subType: sanctuary.subType || 0,
            offsetX: 0,
            offsetY: -2,
            scale: 1.08,
            interactive: !0,
            namePt:
              sanctuary.subType === 0
                ? "Kline Real (Divã de Banquete)"
                : "Trapeza (Mesa de Mármore e Bronze)",
            descriptionPt: `Mobiliário helênico intacto no interior de: ${sanctuary.roomName}. Pressione [F] para examinar.`,
          };
        } else if (sanctuary.role === "altar") {
          sProp = {
            kind: "shrine",
            subType: 0,
            offsetX: 0,
            offsetY: -4,
            scale: 1.25,
            interactive: !0,
            activated: !!intState.activated,
            namePt: "Altar Sagrado do Santuário Subterrâneo",
            descriptionPt: intState.activated
              ? "O altar subterrâneo irradia a luz dourada do Olimpo!"
              : "Pressione [F] para despertar a bênção ancestral deste salão subterrâneo.",
          };
        } else if (sanctuary.role === "chest") {
          const opened = !!intState.opened;
          sProp = {
            kind: "chest",
            subType: 0,
            offsetX: 0,
            offsetY: 0,
            scale: 1.05,
            interactive: !opened,
            opened: opened,
            namePt: opened
              ? "Kibotos Subterrânea (Aberta)"
              : "Kibotos Real (Arca do Tesouro Subterrâneo)",
            descriptionPt: opened
              ? "Os tesouros desta arca já foram recolhidos."
              : `Arca intacta guardada em: ${sanctuary.roomName}. Pressione [F] para abrir!`,
          };
        }

        return {
          tx: t,
          ty: l,
          elevation: 0.15,
          moisture: 0.5,
          temperature: 0.5,
          biome: BIOMES[BiomeId.CAVE_FLOOR],
          isGreekRuin: !0,
          greekRuinRole: sanctuary.role,
          greekRuinRx: sanctuary.rx,
          greekRuinRy: sanctuary.ry,
          greekRoomName: sanctuary.roomName,
          greekFloorFailed: !1, // Piso 100% intacto, sem falhas!
          isGreekWall,
          isGreekDoor,
          isGreekDoorOpen,
          prop: sProp,
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
      const mergedCave = this._getMergedCaveInfoAt(t, l);
      if (mergedCave) {
        return {
          kind: "cave_entrance",
          subType: mergedCave.subType || 0,
          isStaircase: !!(mergedCave.isStaircase || o.id === BiomeId.MEADOW),
          isMerged: !!mergedCave.isMerged,
          mergedCount: mergedCave.mergedCount || 1,
          offsetX: 0,
          offsetY: -4,
          scale: mergedCave.scale || 1.35,
          interactive: !0,
          namePt: mergedCave.namePt,
          descriptionPt: mergedCave.descriptionPt,
        };
      }
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
      // Fogueiras não aparecem mais naturalmente pelo mapa — são criadas exclusivamente pelo jogador via receita!
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
      // Se este tile era candidato a caverna mas se juntou com uma caverna vizinha próxima, não gera árvore em cima
      if (this._isRawCaveCandidateAt(t, l)) return null;
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
      if (o.prop.kind === "greek_door") {
        const nextOpen = !o.prop.opened;
        this.interactedProps.set(u, { ...m, opened: nextOpen });
        this.invalidateTile(t, l);
        return {
          success: !0,
          message: nextOpen
            ? "Você empurrou os pesados batentes de cedro e bronze: a porta grega se abriu!"
            : "Você fechou a porta de madeira e bronze das ruínas.",
          reward: nextOpen ? "Porta Aberta" : "Porta Fechada",
        };
      }
      if (o.prop.kind === "greek_statue") {
        return {
          success: !0,
          message:
            'Inscrição no pedestal da estátua: "Conhece-te a ti mesmo — nada em excesso. A sabedoria da Pólis vive no mármore eterno."',
          reward: "Inspiração Helênica (+75 XP)",
        };
      }
      if (o.prop.kind === "greek_vase") {
        if (m.opened) {
          return {
            success: !0,
            message:
              "As ânforas de terracota exibem pinturas de figuras negras retratando heróis, trirremes e atletas olímpicos.",
            reward: "Cerâmica Ática Examinada",
          };
        }
        this.interactedProps.set(u, { ...m, opened: !0 });
        this.invalidateTile(t, l);
        return {
          success: !0,
          message:
            "Você vasculhou as antigas ânforas e crateras gregas de cerâmica e encontrou dracmas e essências!",
          reward: "Dracmas de Prata & Azeite (+65 XP)",
        };
      }
      if (o.prop.kind === "greek_furniture") {
        return {
          success: !0,
          message:
            "Você examinou o mobiliário helênico: divãs Kline de banquete, mesas Trapeza e assentos esculpidos onde cidadãos e filósofos debatiam.",
          reward: "Cultura da Pólis (+50 XP)",
        };
      }
      if (o.prop.kind === "greek_unfinished") {
        return {
          success: !0,
          message:
            "Você examinou o canteiro de obras inacabado: blocos de mármore com tenões de içamento, cinzéis de bronze e o guindaste Polyspastos!",
          reward: "Engenharia Helênica (+60 XP)",
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
      if (o && o.isGreekWall) return !1;
      if (o && o.isGreekDoor && !o.isGreekDoorOpen) return !1;
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
    isCliffDarkWallAt(x, y, hx = this.footHX, hy = this.footHY) {
      if (this.isUnderground) return !1;
      const ts = this.tileSize,
        tx = Math.floor(x / ts),
        ty = Math.floor(y / ts);

      for (let dy = -4; dy <= 1; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const t = this.getTile(tx + dx, ty + dy);
          if (!t || !t.isCliffWall) continue;

          const myTier = t.mountainTier || 1,
            isSameOrHigherElev = (tile) =>
              !!(
                tile &&
                tile.biome.id === BiomeId.MOUNTAIN_25D &&
                (tile.mountainTier || 1) >= myTier
              ),
            cx = t.tx * ts + ts / 2,
            cy = t.ty * ts + ts / 2,
            nL = isSameOrHigherElev(this.getTile(t.tx - 1, t.ty)),
            nR = isSameOrHigherElev(this.getTile(t.tx + 1, t.ty)),
            nT = isSameOrHigherElev(this.getTile(t.tx, t.ty - 1)),
            nB = isSameOrHigherElev(this.getTile(t.tx, t.ty + 1)),
            leftX = cx + (nL ? -19.5 : -17.5),
            rightX = cx + (nR ? 19.5 : 17.5),
            platBackY = cy - 19.5,
            platFrontY = cy + 19.5,
            baseY = cy + (nB ? 18 : 112);

          // 1. Parte escura da Face Vertical Sul (estende de platFrontY - 2 até baseY = cy + 112)
          if (!nB) {
            const x0 = leftX - (!nL ? 18 : 0),
              x1 = rightX + (!nR ? 18 : 0),
              y0 = platFrontY - 2,
              y1 = baseY;
            if (x + hx > x0 && x - hx < x1 && y + hy > y0 && y - hy < y1) {
              return !0;
            }
          }

          // 2. Parte escura da Escarpa Norte (estende de platBackY - 24 até platBackY + 1)
          if (!nT) {
            const x0 = leftX,
              x1 = rightX,
              y0 = platBackY - 24,
              y1 = platBackY + 2;
            if (x + hx > x0 && x - hx < x1 && y + hy > y0 && y - hy < y1) {
              return !0;
            }
          }

          // 3. Parte escura da Escarpa Oeste (esquerda: de leftX - 24 até leftX + 2)
          if (!nL) {
            const x0 = leftX - 24,
              x1 = leftX + 2,
              y0 = platBackY,
              y1 = nB ? platFrontY : baseY;
            if (x + hx > x0 && x - hx < x1 && y + hy > y0 && y - hy < y1) {
              return !0;
            }
          }

          // 4. Parte escura da Escarpa Leste (direita: de rightX - 2 até rightX + 24)
          if (!nR) {
            const x0 = rightX - 2,
              x1 = rightX + 24,
              y0 = platBackY,
              y1 = nB ? platFrontY : baseY;
            if (x + hx > x0 && x - hx < x1 && y + hy > y0 && y - hy < y1) {
              return !0;
            }
          }
        }
      }
      return !1;
    }
    isCliffFaceBlockedAt(fromX, fromY, toX, toY) {
      return this.isCliffDarkWallAt(toX, toY);
    }
    isCaveRockAt(x, y) {
      const tx = Math.floor(x / this.tileSize),
        ty = Math.floor(y / this.tileSize);
      for (let dy = -2; dy <= 3; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const t = this.getTile(tx + dx, ty + dy);
          if (
            t &&
            t.prop &&
            (t.prop.kind === "cave_entrance" || t.prop.kind === "cave_exit")
          ) {
            const isMerged = !!t.prop.isMerged;
            const isStair = !!t.prop.isStaircase;
            const cx = t.tx * this.tileSize + this.tileSize / 2;
            const cy =
              t.ty * this.tileSize + this.tileSize / 2 + (t.prop.offsetY || -4);
            const rx = x - cx;
            const ry = y - cy;
            const halfW = isMerged ? 38 : 24;
            const topY = isMerged ? -62 : -38;
            const doorHalfW = isStair ? (isMerged ? 16 : 13) : isMerged ? 11.5 : 8.5;
            const sideBottomY = isMerged ? 10 : 6;
            const backWallBottomY = isStair ? -12 : -2;
            if (ry >= topY && ry <= backWallBottomY && Math.abs(rx) <= halfW) return !0;
            if (
              ry > backWallBottomY &&
              ry <= sideBottomY &&
              ((rx <= -doorHalfW && rx >= -halfW) ||
                (rx >= doorHalfW && rx <= halfW))
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
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const t = this.getTile(tx + dx, ty + dy);
          if (
            t &&
            t.prop &&
            (t.prop.kind === "cave_entrance" || t.prop.kind === "cave_exit")
          ) {
            const isMerged = !!t.prop.isMerged;
            const isStair = !!t.prop.isStaircase;
            const doorHalfW = isStair ? (isMerged ? 16 : 13) : isMerged ? 11.5 : 8.5;
            const topTriggerY = isStair ? -11 : -4;
            const cx = t.tx * this.tileSize + this.tileSize / 2;
            const cy =
              t.ty * this.tileSize + this.tileSize / 2 + (t.prop.offsetY || -4);
            const rx = x - cx;
            const ry = y - cy;
            if (Math.abs(rx) <= doorHalfW && ry >= topTriggerY && ry <= 11) {
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
      if (this.isCliffDarkWallAt(x, y)) return !1;
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
                : k === "ruin_pillar" || k === "greek_statue" || k === "greek_unfinished"
                  ? 5.5
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
