(() => {
  "use strict";

  const UNLOCKED_KEY = "gz-unlocked";

  const ACHIEVEMENTS = [
    // --- Explorer ---
    {
      id: "first-game", em: "🎮", section: "explorer",
      title: { uz: "Birinchi qadam",  ru: "Первый шаг",           en: "First Step" },
      desc:  { uz: "Birinchi o'yiningizni o'ynading", ru: "Сыграл первую игру", en: "Played your first game" },
      check: s => s.uniqueGames >= 1
    },
    {
      id: "explorer-5", em: "🗺️", section: "explorer",
      title: { uz: "Kashfiyotchi",    ru: "Исследователь",         en: "Explorer" },
      desc:  { uz: "5 xil o'yin o'ynading", ru: "Сыграл в 5 разных игр", en: "Played 5 different games" },
      check: s => s.uniqueGames >= 5
    },
    {
      id: "explorer-15", em: "🌟", section: "explorer",
      title: { uz: "O'yin severi",    ru: "Любитель игр",          en: "Game Lover" },
      desc:  { uz: "15 xil o'yin o'ynading", ru: "Сыграл в 15 разных игр", en: "Played 15 different games" },
      check: s => s.uniqueGames >= 15
    },
    {
      id: "explorer-all", em: "🏆", section: "explorer",
      title: { uz: "To'liq to'plam", ru: "Полная коллекция",       en: "Full Collection" },
      desc:  { uz: "Barcha 23 ta o'yinni o'ynading", ru: "Сыграл во все 23 игры", en: "Played all 23 games" },
      check: s => s.uniqueGames >= 23
    },
    // --- Sessions ---
    {
      id: "sessions-10", em: "🔥", section: "sessions",
      title: { uz: "Issiq boshlanish", ru: "Разогрев",             en: "Warm Up" },
      desc:  { uz: "10 ta sessiya o'ynading", ru: "Сыграл 10 сессий", en: "Played 10 sessions" },
      check: s => s.totalSessions >= 10
    },
    {
      id: "sessions-50", em: "💪", section: "sessions",
      title: { uz: "Qat'iyatli",      ru: "Преданный",             en: "Dedicated" },
      desc:  { uz: "50 ta sessiya o'ynading", ru: "Сыграл 50 сессий", en: "Played 50 sessions" },
      check: s => s.totalSessions >= 50
    },
    {
      id: "sessions-100", em: "👑", section: "sessions",
      title: { uz: "Veteran",         ru: "Ветеран",               en: "Veteran" },
      desc:  { uz: "100 ta sessiya o'ynading", ru: "Сыграл 100 сессий", en: "Played 100 sessions" },
      check: s => s.totalSessions >= 100
    },
    // --- Category ---
    {
      id: "arcade-master", em: "🕹️", section: "category",
      title: { uz: "Arkada ustasi",   ru: "Мастер аркады",         en: "Arcade Master" },
      desc:  { uz: "20 ta arkada sessiya o'ynading", ru: "Сыграл 20 аркадных сессий", en: "Played 20 arcade sessions" },
      check: s => s.arcadeSessions >= 20
    },
    {
      id: "zen-master", em: "😌", section: "category",
      title: { uz: "Zen usta",        ru: "Мастер дзен",           en: "Zen Master" },
      desc:  { uz: "10 ta relax sessiya o'ynading", ru: "Сыграл 10 расслабляющих сессий", en: "Played 10 relax sessions" },
      check: s => s.relaxSessions >= 10
    },
    {
      id: "kids-friend", em: "🐣", section: "category",
      title: { uz: "Bolalar do'sti",  ru: "Друг детей",            en: "Kids Friend" },
      desc:  { uz: "15 ta bolalar sessiya o'ynading", ru: "Сыграл 15 детских сессий", en: "Played 15 kids sessions" },
      check: s => s.kidsSessions >= 15
    },
    // --- Dedication ---
    {
      id: "bubble-pop-5", em: "🫧", section: "dedication",
      title: { uz: "Ko'piklar shohi", ru: "Король пузырей",        en: "Bubble King" },
      desc:  { uz: "Bubble Pop'ni 5 marta o'ynading", ru: "Сыграл в Bubble Pop 5 раз", en: "Played Bubble Pop 5 times" },
      check: s => (s.sessionsByGame["bubble-pop"] || 0) >= 5
    },
    {
      id: "star-catcher-5", em: "⭐", section: "dedication",
      title: { uz: "Yulduz ovchi",    ru: "Охотник за звёздами",   en: "Star Hunter" },
      desc:  { uz: "Star Catcher'ni 5 marta o'ynading", ru: "Сыграл в Star Catcher 5 раз", en: "Played Star Catcher 5 times" },
      check: s => (s.sessionsByGame["star-catcher"] || 0) >= 5
    },
    {
      id: "fruit-merge-5", em: "🍉", section: "dedication",
      title: { uz: "Meva ustasi",     ru: "Мастер фруктов",        en: "Fruit Master" },
      desc:  { uz: "Fruit Merge'ni 5 marta o'ynading", ru: "Сыграл в Fruit Merge 5 раз", en: "Played Fruit Merge 5 times" },
      check: s => (s.sessionsByGame["fruit-merge"] || 0) >= 5
    },
    {
      id: "quick-tap-5", em: "⚡", section: "dedication",
      title: { uz: "Tezkor barmoq",   ru: "Быстрый палец",         en: "Quick Fingers" },
      desc:  { uz: "Quick Tap'ni 5 marta o'ynading", ru: "Сыграл в Quick Tap 5 раз", en: "Played Quick Tap 5 times" },
      check: s => (s.sessionsByGame["quick-tap"] || 0) >= 5
    },
    {
      id: "zen-garden-5", em: "🌸", section: "dedication",
      title: { uz: "Zen bog'i",       ru: "Дзен-сад",              en: "Zen Garden" },
      desc:  { uz: "Zen Garden'ni 5 marta o'ynading", ru: "Сыграл в Zen Garden 5 раз", en: "Played Zen Garden 5 times" },
      check: s => (s.sessionsByGame["zen-garden"] || 0) >= 5
    },
    // --- Score ---
    {
      id: "bubble-pop-500", em: "🫧", section: "score",
      title: { uz: "Ko'pik portlashi", ru: "Взрыв пузырей",        en: "Bubble Burst" },
      desc:  { uz: "Bubble Pop'da 500 ball to'pladingiz", ru: "Набрал 500 очков в Bubble Pop", en: "Score 500 in Bubble Pop" },
      check: s => (s.bestByGame["bubble-pop"] || 0) >= 500
    },
    {
      id: "star-catcher-300", em: "⭐", section: "score",
      title: { uz: "Yulduz yig'uvchi", ru: "Собиратель звёзд",     en: "Star Collector" },
      desc:  { uz: "Star Catcher'da 300 ball to'pladingiz", ru: "Набрал 300 очков в Star Catcher", en: "Score 300 in Star Catcher" },
      check: s => (s.bestByGame["star-catcher"] || 0) >= 300
    },
    {
      id: "quick-tap-50", em: "⚡", section: "score",
      title: { uz: "Chaqmoq tezligi", ru: "Скорость молнии",       en: "Lightning Speed" },
      desc:  { uz: "Quick Tap'da 50 ball to'pladingiz", ru: "Набрал 50 очков в Quick Tap", en: "Score 50 in Quick Tap" },
      check: s => (s.bestByGame["quick-tap"] || 0) >= 50
    },
    {
      id: "color-rush-200", em: "🎨", section: "score",
      title: { uz: "Rang dahosi",     ru: "Гений цвета",           en: "Color Genius" },
      desc:  { uz: "Color Rush'da 200 ball to'pladingiz", ru: "Набрал 200 очков в Color Rush", en: "Score 200 in Color Rush" },
      check: s => (s.bestByGame["color-rush"] || 0) >= 200
    },
    {
      id: "helix-jump-200", em: "🌀", section: "score",
      title: { uz: "Spiral ustaligi", ru: "Мастер спирали",        en: "Helix Master" },
      desc:  { uz: "Helix Jump'da 200 ball to'pladingiz", ru: "Набрал 200 очков в Helix Jump", en: "Score 200 in Helix Jump" },
      check: s => (s.bestByGame["helix-jump"] || 0) >= 200
    },
    {
      id: "stack-tower-30", em: "🗼", section: "score",
      title: { uz: "Minora quruvchi", ru: "Строитель башни",       en: "Tower Builder" },
      desc:  { uz: "Stack Tower'da 30 ball to'pladingiz", ru: "Набрал 30 очков в Stack Tower", en: "Score 30 in Stack Tower" },
      check: s => (s.bestByGame["stack-tower"] || 0) >= 30
    },
    {
      id: "fruit-merge-1000", em: "🍉", section: "score",
      title: { uz: "Tarvuz olami",    ru: "Мир арбузов",           en: "Watermelon World" },
      desc:  { uz: "Fruit Merge'da 1000 ball to'pladingiz", ru: "Набрал 1000 очков в Fruit Merge", en: "Score 1000 in Fruit Merge" },
      check: s => (s.bestByGame["fruit-merge"] || 0) >= 1000
    },
    {
      id: "infinite-dash-1000", em: "🏃", section: "score",
      title: { uz: "Cheksiz yuguruvchi", ru: "Бесконечный бегун",  en: "Endless Runner" },
      desc:  { uz: "Infinite Dash'da 1000 ball to'pladingiz", ru: "Набрал 1000 очков в Infinite Dash", en: "Score 1000 in Infinite Dash" },
      check: s => (s.bestByGame["infinite-dash"] || 0) >= 1000
    },
    {
      id: "memory-game-15", em: "🧠", section: "score",
      title: { uz: "Xotira dahosi",   ru: "Гений памяти",          en: "Memory Genius" },
      desc:  { uz: "Memory Game'da 15 ball to'pladingiz", ru: "Набрал 15 очков в Memory Game", en: "Score 15 in Memory Game" },
      check: s => (s.bestByGame["memory-game"] || 0) >= 15
    },
    {
      id: "focus-flow-200", em: "🎯", section: "score",
      title: { uz: "Nishon ustasi",   ru: "Меткий стрелок",        en: "Sharp Focus" },
      desc:  { uz: "Focus Flow'da 200 ball to'pladingiz", ru: "Набрал 200 очков в Focus Flow", en: "Score 200 in Focus Flow" },
      check: s => (s.bestByGame["focus-flow"] || 0) >= 200
    }
  ];

  const SECTION_ORDER = ["explorer", "sessions", "category", "dedication", "score"];

  // ---------- storage ----------

  function getUnlocked() {
    try { return JSON.parse(localStorage.getItem(UNLOCKED_KEY) || "[]"); } catch (_) { return []; }
  }

  function saveUnlocked(arr) {
    localStorage.setItem(UNLOCKED_KEY, JSON.stringify(arr));
  }

  // ---------- stats ----------

  function computeStats() {
    const games = window.GAMES || [];
    const stats = {
      uniqueGames: 0,
      totalSessions: 0,
      arcadeSessions: 0,
      relaxSessions: 0,
      kidsSessions: 0,
      sessionsByGame: {},
      bestByGame: {}
    };
    games.forEach(g => {
      let hist = [];
      try { hist = JSON.parse(localStorage.getItem("gz-history-" + g.id) || "[]"); } catch (_) {}
      const count = hist.length;
      stats.sessionsByGame[g.id] = count;
      stats.bestByGame[g.id] = parseInt(localStorage.getItem("gz-best-" + g.id) || "0", 10);
      if (count > 0) stats.uniqueGames++;
      stats.totalSessions += count;
      if (g.cat.includes("arcade")) stats.arcadeSessions += count;
      if (g.cat.includes("relax"))  stats.relaxSessions  += count;
      if (g.cat.includes("kids"))   stats.kidsSessions   += count;
    });
    return stats;
  }

  // ---------- toast queue ----------

  let toastQueue = [];
  let toastRunning = false;

  function enqueueToast(ach) {
    toastQueue.push(ach);
    if (!toastRunning) runToastQueue();
  }

  function runToastQueue() {
    if (toastQueue.length === 0) { toastRunning = false; return; }
    toastRunning = true;
    showToast(toastQueue.shift());
  }

  function showToast(ach) {
    const t = at();
    const lang = localStorage.getItem("gz-lang") || "uz";
    const el = document.createElement("div");
    el.className = "ach-toast";
    el.innerHTML =
      `<div class="ach-toast-label">${t.unlocked || "Achievement unlocked!"}</div>` +
      `<div class="ach-toast-title">${ach.em} ${ach.title[lang] || ach.title.uz}</div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("ach-toast-show")));
    setTimeout(() => {
      el.classList.remove("ach-toast-show");
      setTimeout(() => { el.remove(); setTimeout(runToastQueue, 500); }, 400);
    }, 3000);
  }

  // ---------- check & unlock ----------

  function checkAll() {
    if (!window.GAMES) return;
    const stats = computeStats();
    const unlocked = getUnlocked();
    const unlockedSet = new Set(unlocked);
    const newlyUnlocked = [];
    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedSet.has(ach.id) && ach.check(stats)) {
        newlyUnlocked.push(ach);
        unlockedSet.add(ach.id);
      }
    });
    if (newlyUnlocked.length > 0) {
      saveUnlocked([...unlockedSet]);
      newlyUnlocked.forEach(ach => enqueueToast(ach));
    }
  }

  // ---------- translations ----------

  function at() {
    const lang = localStorage.getItem("gz-lang") || "uz";
    const base = window.TRANSLATIONS_DATA?.achievements;
    return (base?.[lang] || base?.uz || {});
  }

  // ---------- render ----------

  function render() {
    const panel = document.getElementById("ach-panel");
    if (!panel) return;

    const lang = localStorage.getItem("gz-lang") || "uz";
    const t = at();
    const unlocked = new Set(getUnlocked());
    const unlockedCount = ACHIEVEMENTS.filter(a => unlocked.has(a.id)).length;

    let html = `<div class="ach-header">
      <div class="ach-title">🏅 ${t.title || "Achievements"}</div>
      <div class="ach-count">${unlockedCount} / ${ACHIEVEMENTS.length}</div>
    </div>`;

    SECTION_ORDER.forEach(section => {
      const items = ACHIEVEMENTS.filter(a => a.section === section);
      if (items.length === 0) return;
      const sectionLabel = t.sections?.[section] || section;
      const sorted = [
        ...items.filter(a =>  unlocked.has(a.id)),
        ...items.filter(a => !unlocked.has(a.id))
      ];
      html += `<div class="ach-section-title">${sectionLabel}</div>`;
      sorted.forEach(ach => {
        const isUnlocked = unlocked.has(ach.id);
        html +=
          `<div class="ach-item${isUnlocked ? " ach-unlocked" : " ach-locked"}">` +
            `<span class="ach-em">${isUnlocked ? ach.em : "🔒"}</span>` +
            `<div class="ach-info">` +
              `<div class="ach-item-title">${ach.title[lang] || ach.title.uz}</div>` +
              `<div class="ach-item-desc">${ach.desc[lang] || ach.desc.uz}</div>` +
            `</div>` +
            (isUnlocked ? `<span class="ach-check">✅</span>` : "") +
          `</div>`;
      });
    });

    panel.innerHTML = html;
    panel.style.display = "block";
  }

  function hide() {
    const panel = document.getElementById("ach-panel");
    if (panel) panel.style.display = "none";
  }

  // ---------- message listener ----------

  let _checkAllTimer = null;
  window.addEventListener("message", function(ev) {
    if (ev.data?.type === "game:score" && ev.data.id && typeof ev.data.score === "number") {
      clearTimeout(_checkAllTimer);
      _checkAllTimer = setTimeout(checkAll, 200);
    }
  });

  // ---------- nav tab ----------

  window.showAchievements = function() {
    document.querySelectorAll(".ni").forEach(n => n.classList.remove("on"));
    document.getElementById("ni-ach")?.classList.add("on");
    const grid = document.getElementById("grid");
    if (grid) grid.style.display = "none";
    const lbPanel = document.getElementById("lb-panel");
    if (lbPanel) lbPanel.style.display = "none";
    render();
  };

  window.Achievements = { render, hide, checkAll };
})();
