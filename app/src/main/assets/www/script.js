(() => {
  "use strict";

  const GAMES = [
    { id: "bubble-pop", em: "🫧", cat: ["arcade"], tc: "#3B82F6", bg: "135deg,#E0F2FE,#BAE6FD", bdg: "hot", file: "bubble-pop.html" },
    { id: "color-rush", em: "🎨", cat: ["arcade"], tc: "#8B5CF6", bg: "135deg,#F5F3FF,#DDD6FE", bdg: null, file: "color-rush.html" },
    { id: "memory-game", em: "🧠", cat: ["arcade", "kids"], tc: "#10B981", bg: "135deg,#ECFDF5,#D1FAE5", bdg: "new", file: "memory-game.html" },
    { id: "animals", em: "🐾", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: "new", file: "animals.html" },
    { id: "math-kids", em: "🔢", cat: ["kids"], tc: "#EC4899", bg: "135deg,#FDF2F8,#FBCFE8", bdg: "new", file: "math-kids.html" },
    { id: "colors-shapes", em: "🌈", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#FFF7ED,#FFEDD5", bdg: "new", file: "colors-shapes.html" },
    { id: "stack-tower", em: "🗼", cat: ["arcade"], tc: "#06B6D4", bg: "135deg,#ECFEFF,#CFFAFE", bdg: null, file: "stack-tower.html" },
    { id: "helix-jump", em: "🌀", cat: ["arcade"], tc: "#A78BFA", bg: "135deg,#F5F3FF,#EDE9FE", bdg: null, file: "helix-jump.html" },
    { id: "zen-garden", em: "🌸", cat: ["relax"], tc: "#10B981", bg: "135deg,#F0FDF4,#DCFCE7", bdg: null, file: "zen-garden.html" },
    { id: "rain-tap", em: "🌧️", cat: ["relax"], tc: "#60A5FA", bg: "135deg,#EFF6FF,#DBEAFE", bdg: null, file: "rain-tap.html" },
    { id: "quick-tap", em: "⚡", cat: ["arcade"], tc: "#F97316", bg: "135deg,#FFF7ED,#FFEDD5", bdg: "new", file: "quick-tap.html" },
    { id: "shape-match", em: "🔷", cat: ["kids"], tc: "#22D3EE", bg: "135deg,#ECFEFF,#CFFAFE", bdg: null, file: "shape-match.html" },
    { id: "word-sprint", em: "🔤", cat: ["kids"], tc: "#FB7185", bg: "135deg,#FFF1F2,#FFE4E6", bdg: null, file: "word-sprint.html" },
    { id: "pattern-trace", em: "🧩", cat: ["kids", "arcade"], tc: "#A3E635", bg: "135deg,#F7FEE7,#ECFCCB", bdg: null, file: "pattern-trace.html" },
    { id: "melody-memory", em: "🎵", cat: ["relax", "kids"], tc: "#C084FC", bg: "135deg,#FAF5FF,#F3E8FF", bdg: null, file: "melody-memory.html" },
    { id: "star-catcher", em: "⭐", cat: ["arcade"], tc: "#FACC15", bg: "135deg,#FEFCE8,#FEF9C3", bdg: "hot", file: "star-catcher.html" },
    { id: "gentle-breath", em: "🫁", cat: ["relax"], tc: "#34D399", bg: "135deg,#F0FDFA,#CCFBF1", bdg: null, file: "gentle-breath.html" },
    { id: "focus-flow", em: "🎯", cat: ["arcade"], tc: "#60A5FA", bg: "135deg,#EFF6FF,#DBEAFE", bdg: null, file: "focus-flow.html" },
    { id: "fruit-merge", em: "🍉", cat: ["arcade"], tc: "#10B981", bg: "135deg,#ECFDF5,#D1FAE5", bdg: "hot", file: "fruit-merge.html" },
    { id: "infinite-dash", em: "🏃", cat: ["arcade"], tc: "#EF4444", bg: "135deg,#FEF2F2,#FEE2E2", bdg: "new", file: "infinite-dash.html" },
    { id: "number-path", em: "🔢", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: null, file: "number-path.html" },
    { id: "puzzle-slide", em: "🧱", cat: ["arcade", "kids"], tc: "#818CF8", bg: "135deg,#EEF2FF,#E0E7FF", bdg: null, file: "puzzle-slide.html" },
    { id: "clock-match", em: "⏰", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: "new", file: "clock-match.html" }
  ];

  const TRANSLATIONS_DATA = {
    "ui": {
      "uz": {
        "sec": "🎮 O'yinlar",
        "nb0": "Bosh", "nb1": "Bolalar", "nb2": "Arkada", "nb3": "Relax", "nb4": "Til",
        "ls1": "O'ZBEK", "ls2": "RUSCHA", "ls3": "INGLIZ", "lr": "FAOL",
        "back": "← Orqaga", "soon": "⏳ Tez orada!", "loading": "Yuklanmoqda...",
        "countSuffix": " ta", "badgeNew": "🆕 YANGI", "badgeHot": "🔥 TOP", "tl": "🇺🇿 O'zbek tili tanlandi",
        "guideTitle": "Ota-onalar uchun", "bestScore": "Eng yaxshi: ",
        "filters": { "all": "🎮 Barcha O'yinlar", "kids": "👶 Bolalar", "arcade": "🕹️ Arkada", "relax": "😌 Relax" },
        "exitGameMessage": "Haqiqatan ham o'yindan chiqmoqchimisiz? To'plangan ballaringiz saqlanmasligi mumkin.",
        "yes": "Ha",
        "no": "Yo'q"
      },
      "ru": {
        "sec": "🎮 Игры",
        "nb0": "Главная", "nb1": "Дети", "nb2": "Аркады", "nb3": "Релакс", "nb4": "Язык",
        "ls1": "УЗБЕКСКИЙ", "ls2": "РУССКИЙ", "ls3": "АНГЛИЙСКИЙ", "lr": "АКТИВНО",
        "back": "← Назад", "soon": "⏳ Скоро будет!", "loading": "Загрузка...",
        "countSuffix": " игр", "badgeNew": "🆕 НОВОЕ", "badgeHot": "🔥 ТОП",
        "tl": "🇷🇺 Выбран русский язык", "guideTitle": "Для родителей", "bestScore": "Рекорд: ",
        "filters": { "all": "🎮 Все Игры", "kids": "👶 Детские", "arcade": "🕹️ Аркады", "relax": "😌 Релакс" },
        "exitGameMessage": "Вы действительно хотите выйти из игры? Набранные очки могут быть не сохранены.",
        "yes": "Да",
        "no": "Нет"
      },
      "en": {
        "sec": "🎮 Games",
        "nb0": "Home", "nb1": "Kids", "nb2": "Arcade", "nb3": "Relax", "nb4": "Lang",
        "ls1": "UZBEK", "ls2": "RUSSIAN", "ls3": "ENGLISH", "lr": "ACTIVE",
        "back": "← Back", "soon": "⏳ Coming soon!", "loading": "Loading...",
        "countSuffix": " games", "badgeNew": "🆕 NEW", "badgeHot": "🔥 TOP",
        "tl": "🇬🇧 English language selected", "guideTitle": "For Parents", "bestScore": "Best: ",
        "filters": { "all": "🎮 All Games", "kids": "👶 Kids Games", "arcade": "🕹️ Arcade", "relax": "😌 Relax" },
        "exitGameMessage": "Are you sure you want to exit the game? Your progress may not be saved.",
        "yes": "Yes",
        "no": "No"
      }
    },
    "games": {
      "bubble-pop": {
        "title": {"uz": "Bubble Pop Mania", "ru": "Бабл Поп Мания", "en": "Bubble Pop Mania"},
        "desc": {"uz": "Pufaklarni portlat!", "ru": "Лопни их всех!", "en": "Pop them all!"},
        "tag": {"uz": "Motorika", "ru": "Моторика", "en": "Motor Skills"},
        "guide": {
          "uz": "Bolaga pufaklarni bosishni o'rgating. Bu barmoqlar harakatini yaxshilaydi.",
          "ru": "Помогите ребенку лопать пузыри. Это развивает координацию.",
          "en": "Help your child pop bubbles. Great for hand-eye coordination."
        }
      },
      "animals": {
        "title": {"uz": "Zoo Friends Safari", "ru": "Зоо Сафари", "en": "Zoo Friends Safari"},
        "desc": {"uz": "Hayvonlar dunyosi", "ru": "Мир животных", "en": "Animal Friends"},
        "tag": {"uz": "Dunyoqarash", "ru": "Кругозор", "en": "Explorer"},
        "guide": {
          "uz": "Hayvon ovozini qaytarishni so'rang. Bu nutq rivojiga juda foydali.",
          "ru": "Повторяйте звуки вместе. Это стимулирует речь ребенка.",
          "en": "Imitate sounds together. Excellent for speech development."
        }
      },
      "math-kids": {
        "title": {"uz": "Math Quest Academy", "ru": "Академия Математики", "en": "Math Quest Academy"},
        "desc": {"uz": "Raqamli sarguzasht", "ru": "Приключения чисел", "en": "Number Quest"},
        "tag": {"uz": "Mantiq", "ru": "Логика", "en": "Logic"},
        "guide": {
          "uz": "Mevalarni birga sanang. Har bir raqamni baland ovozda ayting.",
          "ru": "Считайте фрукты вслух. Это лучший способ учить числа.",
          "en": "Count the fruits out loud. Best way to learn basic numbers."
        }
      },
      "memory-game": {
        "title": {"uz": "Brain Match Master", "ru": "Мастер Памяти", "en": "Brain Match Master"},
        "desc": {"uz": "Xotira mashqi", "ru": "Тренировка памяти", "en": "Memory Match"},
        "tag": {"uz": "Diqqat", "ru": "Внимание", "en": "Focus"},
        "guide": {
          "uz": "Kartalarni birga toping. Bu diqqatni jamlashni o'rgatadi.",
          "ru": "Ищите пары вместе. Это развивает концентрацию внимания.",
          "en": "Find pairs together. Great for improving focus and memory."
        }
      },
      "infinite-dash": {
        "title": {"uz": "Infinite Dash Neo", "ru": "Бесконечный Даш", "en": "Infinite Dash Neo"},
        "desc": {"uz": "Tezkor yugurish", "ru": "Быстрый бег", "en": "Fast Dash"},
        "tag": {"uz": "Reaksiya", "ru": "Реакция", "en": "Reaction"}
      },
      "star-catcher": {
        "title": {"uz": "Star Catcher Pro", "ru": "Ловец Звезд Про", "en": "Star Catcher Pro"},
        "desc": {"uz": "Yulduzlarni tuting", "ru": "Лови звезды", "en": "Catch Stars"},
        "tag": {"uz": "Epchillik", "ru": "Ловкость", "en": "Agility"}
      },
      "clock-match": {
        "title": {"uz": "Vaqtni Aniqlash", "ru": "Определи Время", "en": "Clock Match"},
        "desc": {"uz": "Soatni to'g'ri toping", "ru": "Найди время", "en": "Find the Time"},
        "tag": {"uz": "Mantiq", "ru": "Логика", "en": "Logic"}
      }
    }
  };

  const HEALTH_PROFILES = {
    1: { id: 1, speed: 1.15, timerScale: 0.85, motion: 1.1, audio: 1, penalties: true },
    2: { id: 2, speed: 1.0, timerScale: 1.0, motion: 1.0, audio: 0.85, penalties: true },
    3: { id: 3, speed: 0.75, timerScale: 1.4, motion: 0.7, audio: 0.6, penalties: false }
  };

  const els = {};
  let translations = TRANSLATIONS_DATA;
  let lang = "uz";
  let filter = "all";
  let toastTimer = null;
  let resizeTimer = null;
  let viewportTimer = null;
  let points = parseInt(localStorage.getItem("gz-pts") || "0", 10);
  let healthGroup = parseInt(localStorage.getItem("gz-health-group") || "2", 10);
  let currentGameId = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function bindDom() {
    els.grid = byId("grid");
    els.toast = byId("toast");
    els.lp = byId("lp");
    els.ld = byId("ld");
    els.points = byId("pts-v");
    els.gs = byId("gs");
    els.gsTitle = byId("gs-title");
    els.gsFrame = byId("gs-frame");
    els.gameExitModal = byId("game-exit-modal");
    els.exitModalMessage = byId("exit-modal-msg");
    els.exitModalYes = byId("exit-modal-yes");
    els.exitModalNo = byId("exit-modal-no");
  }

  function ui() {
    return translations.ui[lang] || translations.ui.en;
  }

  function gameText(id) {
    const item = translations.games[id] || {};
    return {
      title: item.title?.[lang] || item.title?.uz || id,
      desc: item.desc?.[lang] || item.desc?.uz || "O'ynashga tayyor",
      tag: item.tag?.[lang] || item.tag?.uz || "Mini-game"
    };
  }

  function getBadgeLabel(type) {
    const t = ui();
    if (type === "new") return t.badgeNew;
    if (type === "hot") return t.badgeHot;
    return "";
  }

  function updateLanguageButtons() {
    ["uz", "ru", "en"].forEach((code) => {
      byId(`ls-${code}`)?.classList.toggle("on", code === lang);
    });
  }

  function setDocumentLang() {
    document.documentElement.lang = lang;
  }

  function applyTranslations() {
    const t = ui();
    if (byId("sec-t")) byId("sec-t").textContent = t.filters[filter] || t.sec;
    if (byId("nb0")) byId("nb0").textContent = t.nb0;
    if (byId("nb1")) byId("nb1").textContent = t.nb1;
    if (byId("nb2")) byId("nb2").textContent = t.nb2;
    if (byId("nb3")) byId("nb3").textContent = t.nb3;
    if (byId("nb4")) byId("nb4").textContent = t.nb4;
    if (byId("ls1")) byId("ls1").textContent = t.ls1;
    if (byId("ls2")) byId("ls2").textContent = t.ls2;
    if (byId("ls3")) byId("ls3").textContent = t.ls3;

    ["lr1", "lr2", "lr3"].forEach((id, i) => {
      const el = byId(id);
      if (el) {
        el.textContent = t.lr;
        el.style.opacity = (["uz", "ru", "en"][i] === lang) ? "1" : "0.2";
      }
    });

    if (byId("ld-txt")) byId("ld-txt").textContent = t.loading;
    if (byId("gs-back")) byId("gs-back").textContent = t.back;
    if (byId("sec-c")) byId("sec-c").textContent = `${visibleGames(filter).length}${t.countSuffix}`;
  }

  function visibleGames(f) {
    return f === "all" ? GAMES : GAMES.filter((g) => g.cat.includes(f));
  }

  function buildGrid(f) {
    if (!els.grid) return;
    els.grid.innerHTML = "";
    const list = visibleGames(f);
    list.forEach((game) => {
      const { title, desc, tag } = gameText(game.id);
      const card = document.createElement("div");
      card.className = "gc";
      card.onclick = () => openGame(game.id, title);

      const best = parseInt(localStorage.getItem(`gz-best-${game.id}`) || "0", 10);
      const badge = game.bdg ? `<div class="bdg b${game.bdg}">${getBadgeLabel(game.bdg)}</div>` : "";

      card.innerHTML = `
        ${badge}
        <div class="gc-art" style="background:linear-gradient(${game.bg})">
          <div class="gc-em">${game.em}</div>
        </div>
        <div class="gc-info">
          <div class="gc-nm">${title}</div>
          <div class="gc-meta">
            <span class="gc-tg" style="background:${game.tc}15; color:${game.tc}">${tag}</span>
            <span class="gc-ds">${desc}</span>
          </div>
          ${best > 0 ? `<div class="gc-best">🏆 ${ui().bestScore}${best}</div>` : ""}
        </div>
      `;
      els.grid.appendChild(card);
    });
  }

  function openGame(id, title) {
    const game = GAMES.find((g) => g.id === id);
    if (!game) return;

    currentGameId = id;
    const params = new URLSearchParams({ lang, hg: String(healthGroup), tc: game.tc, ts: String(Date.now()) });
    els.gsFrame.src = `${game.file}?${params.toString()}`;
    els.gsTitle.textContent = title;
    els.gs.classList.remove("h");

    // Notify Native Bridge to hide banner while gaming
    if (window.AndroidAdMob && window.AndroidAdMob.hideBanner) {
        window.AndroidAdMob.hideBanner();
    } else {
        // Fallback for browser testing
        window.setBannerVisibility?.(false);
    }
  }

  function closeGame() {
    els.gs.classList.add("h");
    els.gsFrame.src = "about:blank";
    currentGameId = null;

    // Notify Native Bridge to show banner in dashboard
    if (window.AndroidAdMob && window.AndroidAdMob.showBanner) {
        window.AndroidAdMob.showBanner();
    } else {
        // Fallback for browser testing
        window.setBannerVisibility?.(true);
    }
    buildGrid(filter);
  }

  /**
   * Native Bridge callback for banner visibility.
   */
  window.setBannerVisibility = function(isVisible) {
    const root = document.documentElement;
    // Get --bh height (56px or 90px)
    const bannerHeight = getComputedStyle(root).getPropertyValue('--bh').trim() || "60px";
    root.style.setProperty('--ad-h', isVisible ? bannerHeight : '0px');
    document.body.classList.toggle('has-ad', isVisible);
    onResize();
  };

  function setLang(l, silent) {
    if (!translations.ui[l]) return;
    lang = l;
    localStorage.setItem("gz-lang", lang);
    els.lp?.classList.add("h");
    updateLanguageButtons();
    setDocumentLang();
    applyTranslations();
    buildGrid(filter);

    // Refresh game if open to sync language
    if (currentGameId && !els.gs.classList.contains("h")) {
      openGame(currentGameId, els.gsTitle.textContent);
    }

    if (!silent) showToast(ui().tl);
  }

  function fil(f) {
    filter = f;
    document.querySelectorAll(".ni").forEach((n) => n.classList.remove("on"));
    byId(`ni-${f}`)?.classList.add("on");
    applyTranslations();
    buildGrid(f);
  }

  function showToast(m) {
    if (!els.toast) return;
    clearTimeout(toastTimer);
    els.toast.textContent = m;
    els.toast.classList.add("s");
    toastTimer = setTimeout(() => els.toast.classList.remove("s"), 3000);
  }

  function updateViewportCssVars() {
    const h = window.innerHeight;
    document.documentElement.style.setProperty("--app-vh", `${h * 0.01}px`);
    document.documentElement.style.setProperty("--app-height", `${h}px`);
  }

  function onResize() {
    updateViewportCssVars();
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => buildGrid(filter), 200);
  }

  function detectStartupLang() {
    const s = localStorage.getItem("gz-lang");
    if (s && translations.ui[s]) return s;
    const n = navigator.language.toLowerCase();
    if (n.startsWith("ru")) return "ru";
    if (n.startsWith("uz")) return "uz";
    return "en";
  }

  function bindExitModal() {
    if (els.exitModalYes) els.exitModalYes.onclick = () => { hideGameExitConfirmation(); closeGame(); };
    if (els.exitModalNo) els.exitModalNo.onclick = hideGameExitConfirmation;
  }

  function hideGameExitConfirmation() {
    els.gameExitModal?.classList.remove("show");
  }

  window.showGameExitConfirmationFromParent = () => {
    const t = ui();
    if (els.exitModalMessage) els.exitModalMessage.textContent = t.exitGameMessage;
    if (els.exitModalYes) els.exitModalYes.textContent = t.yes;
    if (els.exitModalNo) els.exitModalNo.textContent = t.no;
    els.gameExitModal?.classList.add("show");
  };

  async function init() {
    try {
      bindDom();
      updateViewportCssVars();
      const startupLang = detectStartupLang();
      setLang(startupLang, true);
      if (localStorage.getItem("gz-lang")) els.lp?.classList.add("h");

      window.setLang = setLang;
      window.fil = fil;
      window.closeGame = closeGame;
      window.showRev = () => els.lp?.classList.remove("h");

      bindExitModal();
      buildGrid(filter);
    } catch (e) {
      console.error("Init Error", e);
    } finally {
      setTimeout(() => els.ld?.classList.add("h"), 500);
      window.addEventListener("resize", onResize);
    }
  }

  window.addEventListener("DOMContentLoaded", init);
})();
