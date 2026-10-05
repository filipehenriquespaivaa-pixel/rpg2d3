/* js/data/conhecimento-receitas.js
 * Gerenciador de Descoberta e Estudo de Receitas da Forja (Mesa de Fusão).
 * - Modo normal: as receitas começam ocultas (não reveladas no livro de fórmulas).
 * - Descoberta por tentativa: quando o jogador combina os itens certos na forja, a receita é desbloqueada.
 * - Descoberta por estudo: ao ler e estudar livros/pergaminhos por pelo menos 1 minuto (60s a 120s),
 *   todas as receitas daquele livro são aprendidas e adicionadas à forja.
 * - Modo desenvolvedor: se ativo (window.__devMode), todas as receitas ficam visíveis para testes.
 */
"use strict";

window.Game = window.Game || {};

(function (G) {
  const STORAGE_KEY_RECIPES = "rpg_unlocked_recipes";
  const STORAGE_KEY_STUDY = "rpg_studied_books";

  // Carrega receitas desbloqueadas salvas
  function loadUnlockedRecipes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_RECIPES);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return new Set(arr);
      }
    } catch (e) {
      console.warn("Erro ao carregar receitas desbloqueadas:", e);
    }
    return new Set();
  }

  // Carrega progresso de estudo dos livros
  function loadStudiedBooks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STUDY);
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj && typeof obj === "object") return obj;
      }
    } catch (e) {
      console.warn("Erro ao carregar livros estudados:", e);
    }
    return {};
  }

  const unlockedSet = loadUnlockedRecipes();
  const studiedMap = loadStudiedBooks();

  function saveUnlockedRecipes() {
    try {
      localStorage.setItem(STORAGE_KEY_RECIPES, JSON.stringify([...unlockedSet]));
    } catch (e) {}
  }

  function saveStudiedBooks() {
    try {
      localStorage.setItem(STORAGE_KEY_STUDY, JSON.stringify(studiedMap));
    } catch (e) {}
  }

  // Listener para eventos de áudio e notificação
  function notifyDiscovery(name, source = "experiment") {
    try {
      if (G.Audio && typeof G.Audio.playTone === "function") {
        G.Audio.playTone(523, "triangle", 0.15, 0.2); // C5
        setTimeout(() => G.Audio.playTone && G.Audio.playTone(659, "triangle", 0.18, 0.25), 120); // E5
        setTimeout(() => G.Audio.playTone && G.Audio.playTone(784, "triangle", 0.25, 0.3), 240); // G5
        setTimeout(() => G.Audio.playTone && G.Audio.playTone(1046, "sine", 0.4, 0.4), 380); // C6
      }
    } catch (e) {}

    window.dispatchEvent(
      new CustomEvent("rpg_recipe_unlocked", {
        detail: { name, source },
      }),
    );
  }

  const RecipeKnowledge = {
    // Verifica se a receita está desbloqueada no livro de fórmulas
    isRecipeUnlocked(recipeId) {
      if (!recipeId) return false;
      // Modo Desenvolvedor: todas as receitas visíveis
      if (typeof window !== "undefined" && Boolean(window.__devMode)) {
        return true;
      }
      return unlockedSet.has(recipeId);
    },

    // Desbloqueia uma receita (por tentativa de criação na forja)
    unlockRecipe(recipeId, recipeName = "Nova Fórmula") {
      if (!recipeId) return false;
      const isNew = !unlockedSet.has(recipeId);
      if (isNew) {
        unlockedSet.add(recipeId);
        saveUnlockedRecipes();
        notifyDiscovery(recipeName, "experiment");
      }
      return isNew;
    },

    // Desbloqueia múltiplas receitas (por estudo concluído de um livro)
    unlockRecipes(recipeIdList, sourceName = "Estudo de Livro") {
      if (!Array.isArray(recipeIdList)) return 0;
      let countNew = 0;
      recipeIdList.forEach((id) => {
        if (id && !unlockedSet.has(id)) {
          unlockedSet.add(id);
          countNew++;
        }
      });
      if (countNew > 0) {
        saveUnlockedRecipes();
        notifyDiscovery(sourceName, "study");
      }
      return countNew;
    },

    // Retorna a lista de todas as receitas desbloqueadas
    getUnlockedList() {
      return [...unlockedSet];
    },

    // Retorna a quantidade de receitas desbloqueadas
    getUnlockedCount() {
      return unlockedSet.size;
    },

    // Progresso de estudo de um livro/pergaminho
    getStudyState(bookId, defaultTotalSeconds = 60) {
      if (!bookId) return { seconds: 0, totalSeconds: defaultTotalSeconds, completed: false };
      const entry = studiedMap[bookId];
      if (!entry) {
        return {
          seconds: 0,
          totalSeconds: defaultTotalSeconds,
          completed: false,
        };
      }
      return {
        seconds: entry.seconds || 0,
        totalSeconds: entry.totalSeconds || defaultTotalSeconds,
        completed: Boolean(entry.completed),
      };
    },

    // Adiciona tempo de estudo ao livro
    addStudySeconds(bookId, deltaSeconds, totalSeconds, recipeIdList, bookTitle = "Livro") {
      if (!bookId) return { seconds: 0, completed: false, newlyCompleted: false };
      totalSeconds = Math.max(60, totalSeconds || 60); // Mínimo absoluto de 60 segundos
      const cur = studiedMap[bookId] || { seconds: 0, totalSeconds, completed: false };
      
      const prevCompleted = Boolean(cur.completed);
      const nextSeconds = Math.min(totalSeconds, (cur.seconds || 0) + deltaSeconds);
      const nextCompleted = nextSeconds >= totalSeconds;

      studiedMap[bookId] = {
        seconds: nextSeconds,
        totalSeconds,
        completed: nextCompleted,
      };
      saveStudiedBooks();

      let newlyCompleted = false;
      if (!prevCompleted && nextCompleted) {
        newlyCompleted = true;
        // Desbloqueia todas as receitas vinculadas a este livro
        if (Array.isArray(recipeIdList) && recipeIdList.length > 0) {
          this.unlockRecipes(recipeIdList, bookTitle);
        }
      }

      return {
        seconds: nextSeconds,
        totalSeconds,
        completed: nextCompleted,
        newlyCompleted,
      };
    },

    // Verifica se o livro já foi completamente estudado
    isBookCompleted(bookId) {
      return Boolean(studiedMap[bookId]?.completed);
    },
  };

  G.RecipeKnowledge = RecipeKnowledge;
})(window.Game);
