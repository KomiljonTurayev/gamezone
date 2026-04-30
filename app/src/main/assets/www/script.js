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
    { id: "puzzle-slide", em: "🧱", cat: ["arcade", "kids"], tc: "#818CF8", bg: "135deg,#EEF2FF,#E0E7FF", bdg: null, file: "puzzle-slide.html" }
  ];

  const HEALTH_PROFILES = {
    1: { id: 1, speed: 1, timerScale: 1, motion: 1, audio: 1, penalties: true },
    2: { id: 2, speed: 0.88, timerScale: 1.2, motion: 0.8, audio: 0.85, penalties: true },
    3: { id: 3, speed: 0.7, timerScale: 1.5, motion: 0.55, audio: 0.6, penalties: false }
  };

  function titleFromId(id) {
    return id
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function createFallbackTranslations() {
    const baseUi = {
      uz: {
        sec: "🎮 O'yinlar",
        nb0: "Bosh",
        nb1: "Bolalar",
        nb2: "Arkada",
        nb3: "Relax",
        nb4: "Til",
        ls1: "O'ZBEK",
        ls2: "RUSCHA",
        ls3: "INGLIZ",
        lr: "FAOL",
        back: "← Orqaga",
        soon: "⏳ Tez orada!",
        loading: "Yuklanmoqda...",
        countSuffix: " ta",
        badgeNew: "🆕 YANGI",
        badgeHot: "🔥 TOP",
        tl: "🇺🇿 O'zbek tili tanlandi",
        filters: { all: "🎮 Barcha O'yinlar", kids: "👶 Bolalar", arcade: "🕹️ Arkada", relax: "😌 Relax" },
        audio: { langChanged: "O'zbek tili yoqildi" },
        newRecord: "YANGI REKORD! 🏆",
        exitGameMessage: "Haqiqatan ham o'yindan chiqmoqchimisiz? To'plangan ballaringiz saqlanmasligi mumkin.",
        yes: "Ha",
        no: "Yo'q"
      },
      ru: {
        sec: "🎮 Игры",
        nb0: "Главная",
        nb1: "Дети",
        nb2: "Аркада",
        nb3: "Релакс",
        nb4: "Язык",
        ls1: "УЗБЕКСКИЙ",
        ls2: "РУССКИЙ",
        ls3: "АНГЛИЙСКИЙ",
        lr: "АКТИВНО",
        back: "← Назад",
        soon: "⏳ Скоро будет!",
        loading: "Загрузка...",
        countSuffix: " игр",
        badgeNew: "🆕 НОВОЕ",
        badgeHot: "🔥 ТОП",
        tl: "🇷🇺 Выбран русский язык",
        filters: { all: "🎮 Все Игры", kids: "👶 Детские", arcade: "🕹️ Аркады", relax: "😌 Релакс" },
        audio: { langChanged: "Русский язык включен" },
        newRecord: "НОВЫЙ РЕКОРД! 🏆",
        exitGameMessage: "Вы действительно хотите выйти из игры? Набранные очки могут быть не сохранены.",
        yes: "Да",
        no: "Нет"
      },
      en: {
        sec: "🎮 Games",
        nb0: "Home",
        nb1: "Kids",
        nb2: "Arcade",
        nb3: "Relax",
        nb4: "Lang",
        ls1: "UZBEK",
        ls2: "RUSSIAN",
        ls3: "ENGLISH",
        lr: "ACTIVE",
        back: "← Back",
        soon: "⏳ Coming soon!",
        loading: "Loading...",
        countSuffix: " games",
        badgeNew: "🆕 NEW",
        badgeHot: "🔥 TOP",
        tl: "🇬🇧 English language selected",
        filters: { all: "🎮 All Games", kids: "👶 Kids Games", arcade: "🕹️ Arcade", relax: "😌 Relax" },
        audio: { langChanged: "English language enabled" },
        newRecord: "NEW RECORD! 🏆"
      },
      "exitGameMessage": "Are you sure you want to exit the game? Your progress may not be saved.",
      "yes": "Yes",
      "no": "No"
    };

    const games = {};
    GAMES.forEach((game) => {
      const name = titleFromId(game.id);
      games[game.id] = {
        title: { uz: name, ru: name, en: name },
        desc: { uz: "O'ynashga tayyor", ru: "Готово к игре", en: "Ready to play" },
        tag: { uz: "Mini-game", ru: "Мини-игра", en: "Mini-game" }
      };
    });

    return { ui: baseUi, games };
  }

  const FALLBACK_TRANSLATIONS = createFallbackTranslations();

  const els = {};
  let translations = null;
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

  function updateViewportCssVars() {
    const appHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
    document.documentElement.style.setProperty("--app-vh", `${appHeight * 0.01}px`);
    document.documentElement.style.setProperty("--app-height", `${appHeight}px`);

    // Klaviatura ochilganini aniqlash (Viewport balandligi ekran balandligining 70% idan kam bo'lsa)
    // Bu threshold odatda mobil klaviaturalarni aniqlash uchun yetarli
    const isKeyboard = window.innerHeight < (window.screen.height * 0.7);
    document.body.classList.toggle('kb-open', isKeyboard);
  }

  function enterFullscreenForMobile() {
    if (document.fullscreenElement) return;
    document.documentElement.requestFullscreen?.().catch(() => {
      // Some WebView/device combinations block fullscreen; continue without failing gameplay.
    });
  }

  function clampHealthGroup(value) {
    return [1, 2, 3].includes(value) ? value : 2;
  }

  async function loadTranslations() {
    const candidates = ["translations.json"];
    if (location.protocol === "file:") {
      candidates.push("./translations.json");
      candidates.push("file:///android_asset/www/translations.json");
    }

    let lastError = null;
    for (const url of [...new Set(candidates)]) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) continue;
        translations = await res.json();
        return;
      } catch (e) {
        lastError = e;
      }
    }

    console.warn("i18n load failed, fallback enabled", lastError);
    translations = FALLBACK_TRANSLATIONS;
  }

  function ui() {
    const source = translations || FALLBACK_TRANSLATIONS;
    return source.ui[lang] || source.ui.uz;
  }

  function gameText(id) {
    const source = translations || FALLBACK_TRANSLATIONS;
    const item = source.games[id] || {};
    return {
      title: item.title?.[lang] || item.title?.uz || id,
      desc: item.desc?.[lang] || item.desc?.uz || "",
      tag: item.tag?.[lang] || item.tag?.uz || ""
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
      byId(`ls-${code}`).classList.toggle("on", code === lang);
    });
  }

  function setDocumentLang() {
    document.documentElement.lang = lang;
  }

  function applyTranslations() {
    const t = ui();
    byId("sec-t").textContent = t.filters[filter] || t.sec;
    byId("nb0").textContent = t.nb0;
    byId("nb1").textContent = t.nb1;
    byId("nb2").textContent = t.nb2;
    byId("nb3").textContent = t.nb3;
    byId("nb4").textContent = t.nb4;
    byId("ls1").textContent = t.ls1;
    byId("ls2").textContent = t.ls2;
    byId("ls3").textContent = t.ls3;

    // Update large card status visibility
    const statuses = [byId("lr1"), byId("lr2"), byId("lr3")];
    const langs = ["uz", "ru", "en"];
    statuses.forEach((el, i) => {
      el.textContent = t.lr;
      el.style.opacity = (langs[i] === lang) ? "1" : "0.2";
    });

    byId("ld-txt").textContent = t.loading;
    byId("gs-back").textContent = t.back;
    byId("sec-c").textContent = `${visibleGames(filter).length}${t.countSuffix}`;
  }

  function visibleGames(currentFilter) {
    if (currentFilter === "all") return GAMES;
    return GAMES.filter((g) => g.cat.includes(currentFilter));
  }

  function buildGrid(currentFilter = "all") {
    filter = currentFilter;
    const t = ui();
    const list = visibleGames(currentFilter);
    const fragment = document.createDocumentFragment();

    const countEl = byId("sec-c");
    const titleEl = byId("sec-t");
    if (countEl) countEl.textContent = `${list.length}${t.countSuffix}`;
    if (titleEl) titleEl.textContent = t.filters[currentFilter] || t.sec;

    list.forEach((g) => {
      const text = gameText(g.id);
      const card = document.createElement("div");
      card.className = "gc";
      card.style.background = `linear-gradient(${g.bg})`;

      const badge = g.bdg
        ? `<div class="bdg ${g.bdg === "new" ? "bnew" : "bhot"}">${getBadgeLabel(g.bdg)}</div>`
        : "";

      card.innerHTML = `${badge}
        <div class="gc-art"><div class="gc-em">${g.em}</div></div>
        <div class="gc-info">
          <div class="gc-nm"></div>
          <div class="gc-best"></div>
          <div class="gc-meta">
            <span class="gc-tg" style="background:${g.tc}22;color:${g.tc}"></span>
            <span class="gc-ds"></span>
          </div>
        </div>`;

      const bestScore = localStorage.getItem(`gz-best-${g.id}`) || "0";
      const bestEl = card.querySelector(".gc-best");
      if (bestScore !== "0" && bestEl) {
        bestEl.textContent = `${t.bestScore}${bestScore}`;
      }

      card.querySelector(".gc-nm").textContent = text.title;
      card.querySelector(".gc-tg").textContent = text.tag;
      card.querySelector(".gc-ds").textContent = text.desc;
      card.onclick = () => openGame(g.id, `${g.em} ${text.title}`);
      fragment.appendChild(card);
    });

    if (els.grid) {
      while (els.grid.firstChild) {
        els.grid.removeChild(els.grid.firstChild);
      }
      els.grid.appendChild(fragment);
    }
  }

  function showToast(msg) {
    const t = els.toast;
    t.textContent = msg;
    t.classList.add("s");
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(() => {
      t.classList.remove("s");
      toastTimer = null;
    }, 2000);
  }

  function speakCue(text) {
    const synth = window.speechSynthesis;
    if (!synth || !text) return;
    const voiceLang = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" }[lang] || "en-US";
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voiceLang;
    utter.rate = healthProfile().id === 3 ? 0.9 : 1;
    utter.volume = healthProfile().audio;
    synth.speak(utter);
  }

  function healthProfile() {
    return HEALTH_PROFILES[healthGroup] || HEALTH_PROFILES[2];
  }

  function applyAutomaticAccessibility() {
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion && !localStorage.getItem("gz-health-group")) {
      healthGroup = 3;
    }
    healthGroup = clampHealthGroup(healthGroup);
    localStorage.setItem("gz-health-group", String(healthGroup));
    document.body.style.setProperty("--motion-scale", String(healthProfile().motion));

    // Ovoz balandligini native qism bilan sinxronlash
    if (window.AndroidAdMob && window.AndroidAdMob.setSoundVolume) {
        window.AndroidAdMob.setSoundVolume(healthProfile().audio);
    }
  }

  function setLang(nextLang, silent) {
    const source = translations || FALLBACK_TRANSLATIONS;
    if (!source.ui[nextLang]) return;
    lang = nextLang;
    localStorage.setItem("gz-lang", lang);

    els.lp.classList.add("h");
    updateLanguageButtons();
    setDocumentLang();
    applyTranslations();
    buildGrid(filter);

    if (!silent) {
      const t = ui();
      showToast(t.tl);
      speakCue(t.audio.langChanged);
    }
  }

  function fil(nextFilter) {
    filter = nextFilter;
    document.querySelectorAll(".ni").forEach((n) => n.classList.remove("on"));
    byId(`ni-${nextFilter}`)?.classList.add("on");
    buildGrid(nextFilter);
  }

  function openGame(id, title) {
    const game = GAMES.find((g) => g.id === id);
    const t = ui();

    if (!game) {
      showToast(t.soon);
      return;
    }

    currentGameId = id;
    const params = new URLSearchParams({
      lang: lang,
      hg: String(healthGroup),
      tc: game.tc, // Theme color for the game
      ts: String(Date.now()),
      _v: "2"
    });

    // Global score submission on start (optional: or on end)
    const best = parseInt(localStorage.getItem(`gz-best-${id}`) || "0", 10);
    if (best > 0 && window.GameAPI) window.GameAPI.submitGlobalScore(id, best);

    els.gsTitle.textContent = title;
    els.gsFrame.src = `${game.file}?${params.toString()}`;
    els.gs.classList.remove("h");

    // Show guide automatically for kids category if first time or for specific games
    if (game.cat.includes("kids")) {
      setTimeout(showGuide, 1000);
    }

    if (window.AndroidAdMob) window.AndroidAdMob.showInterstitial();
    enterFullscreenForMobile();

    points += healthGroup === 3 ? 8 : 10;
    localStorage.setItem("gz-pts", String(points));
    els.points.textContent = String(points);
  }

  function showGuide() {
    if (!currentGameId) return;
    const source = translations || FALLBACK_TRANSLATIONS;
    const gameInfo = source.games[currentGameId];
    const uiInfo = ui();

    if (gameInfo && gameInfo.guide) {
      byId("pg-title").textContent = uiInfo.guideTitle || "Guide";
      byId("pg-text").textContent = gameInfo.guide[lang] || gameInfo.guide.en;
      byId("pg-overlay").classList.remove("h");
    }
  }

  function hideGuide() {
    byId("pg-overlay").classList.add("h");
  }

  function closeGame() {
    els.gs.classList.add("h");
    try {
      els.gsFrame.contentWindow?.postMessage({ type: "game:dispose" }, "*");
    } catch (_e) {
      // Intentionally ignored: frame may already be detached.
    }
    els.gsFrame.src = "";
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {
        // Ignore exit failures when system UI already changed fullscreen state.
      });
    }
  }

  /**
   * Banner ko'rinishini native holatga qarab o'zgartirish.
   */
  window.setBannerVisibility = function(isVisible) {
    const root = document.documentElement;
    // --bh root-da 56px yoki 90px qilib belgilangan
    const bannerHeight = getComputedStyle(root).getPropertyValue('--bh').trim();
    root.style.setProperty('--ad-h', isVisible ? bannerHeight : '0px');
    document.body.classList.toggle('has-ad', isVisible);
    onResize(); // Layoutni qayta hisoblash
  };

  function toggleFS() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function showRev() {
    els.lp.classList.remove("h");
  }

  function preloadGames() {
    const toPreload = GAMES.slice(0, 6);
    toPreload.forEach((game) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = game.file;
      document.head.appendChild(link);
    });
  }

  function onResize() {
    // Immediate visual update using rAF to sync with browser's refresh rate
    requestAnimationFrame(updateViewportCssVars);

    if (viewportTimer) clearTimeout(viewportTimer);
    viewportTimer = setTimeout(() => {
      viewportTimer = null;
      updateViewportCssVars();
    }, 100);

    if (resizeTimer) clearTimeout(resizeTimer);
    // Rebuild the grid after the CSS animation (0.4s) is complete to avoid stuttering
    resizeTimer = setTimeout(() => buildGrid(filter), 450);
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

    // Exit modal elements (check for existence)
    els.gameExitModal = byId("game-exit-modal");
    els.exitModalMessage = byId("exit-modal-msg");
    els.exitModalYes = byId("exit-modal-yes");
    els.exitModalNo = byId("exit-modal-no");
  }

  function installGlobals() {
    window.setLang = setLang;
    window.fil = fil;
    window.openGame = openGame;
    window.closeGame = closeGame;
    window.toggleFS = toggleFS;
    window.showRev = showRev;
    window.showGuide = showGuide;
    window.hideGuide = hideGuide;
    window.__gameRegistry = GAMES.map((g) => g.id);
  }

  function detectStartupLang() {
    const stored = localStorage.getItem("gz-lang");
    if (stored && ["uz", "ru", "en"].includes(stored)) {
      return stored;
    }
    const n = navigator.language || "en";
    if (n.startsWith("ru")) return "ru";
    if (n.startsWith("uz")) return "uz";
    return "en";
  }

  function cleanup() {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
    window.visualViewport?.removeEventListener("resize", onResize);
    window.removeEventListener("beforeunload", cleanup);
    if (toastTimer) clearTimeout(toastTimer);
    if (viewportTimer) clearTimeout(viewportTimer);
    if (resizeTimer) clearTimeout(resizeTimer);
  }

  /**
   * Yangi rekord o'rnatilganda rangli parchalar (confetti) va "Yangi Rekord" popupini ko'rsatish.
   */
  function triggerConfetti() {
    const t = ui();
    const colors = ['#22C55E', '#3B82F6', '#EF4444', '#F59E0B', '#A855F7', '#EC4899'];
    
    // 1. Popup yaratish
    const popup = document.createElement('div');
    popup.className = 'record-popup';
    popup.textContent = t.newRecord || "NEW RECORD!";
    document.body.appendChild(popup);

    // 2. Confetti konteyneri
    const container = document.createElement('div');
    Object.assign(container.style, {
      position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: '10000'
    });
    document.body.appendChild(container);

    // 3. Native Vibratsiya (Agar mavjud bo'lsa)
    if (window.AndroidAdMob && window.AndroidAdMob.vibrate) {
      window.AndroidAdMob.vibrate(150);
    }

    // 4. Styles injection (Faqat bir marta)
    if (!byId('confetti-styles')) {
        const s = document.createElement('style');
        s.id = 'confetti-styles';
        s.textContent = `
            .record-popup {
                position: fixed; top: 40%; left: 50%; transform: translate(-50%, -50%) scale(0);
                background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white;
                padding: 16px 32px; border-radius: 50px; font-size: 1.8rem; font-weight: 900;
                box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3); z-index: 10001;
                animation: record-pop 2.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                text-align: center; white-space: nowrap; pointer-events: none;
            }
            @keyframes record-pop {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                15% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                25% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -80%) scale(0.8); opacity: 0; }
            }
            .gs-gold-flash {
                animation: gold-glow 2.5s ease-out forwards;
            }
            @keyframes gold-glow {
                0% { background-color: transparent; }
                20% { background-color: rgba(255, 215, 0, 0.35); }
                100% { background-color: transparent; }
            }
        `;
        document.head.appendChild(s);
    }

    // 5. Oltin fon effekti (Vaqtinchalik)
    if (els.gs) {
        els.gs.classList.add('gs-gold-flash');
        setTimeout(() => els.gs.classList.remove('gs-gold-flash'), 2600);
    }

    // 6. Parchalar animatsiyasi
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      Object.assign(p.style, {
        position: 'absolute', left: '50%', top: '50%', width: '8px', height: '8px',
        backgroundColor: color, borderRadius: Math.random() > 0.5 ? '50%' : '2px', opacity: '1'
      });
      container.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 4 + Math.random() * 12;
      let vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity;
      let x = 0, y = 0, g = 0.4, op = 1;

      const step = () => {
        x += vx; y += vy; vy += g; op -= 0.015;
        p.style.transform = `translate(${x}px, ${y}px) rotate(${x * 3}deg)`;
        p.style.opacity = op;
        if (op > 0) requestAnimationFrame(step); else p.remove();
      };
      requestAnimationFrame(step);
    }

    setTimeout(() => {
      container.remove();
      popup.remove();
    }, 3000);
  }

  /**
   * Mushakbozlik effekti (Fireworks).
   * Yangi rekord o'rnatilganda ekran bo'ylab bir nechta portlashlar yaratadi.
   */
  function triggerFireworks() {
    const colors = ['#FACC15', '#FB923C', '#F87171', '#C084FC', '#38BDF8', '#4ADE80'];
    const container = document.createElement('div');
    Object.assign(container.style, {
      position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: '10002'
    });
    document.body.appendChild(container);

    const burst = (bx, by) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 36; i++) {
        const p = document.createElement('div');
        Object.assign(p.style, {
          position: 'absolute', left: bx + 'px', top: by + 'px',
          width: '5px', height: '5px', backgroundColor: color, borderRadius: '50%',
          boxShadow: `0 0 12px ${color}`
        });
        container.appendChild(p);

        const angle = (i * 10) * (Math.PI / 180) + (Math.random() * 0.2);
        const velocity = 3 + Math.random() * 10;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let x = 0, y = 0, op = 1;

        const frame = () => {
          vx *= 0.98; vy += 0.2; // Ishqalanish + Gravitatsiya
          x += vx; y += vy; op -= 0.015;
          p.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          p.style.opacity = op;
          if (op > 0) requestAnimationFrame(frame); else p.remove();
        };
        requestAnimationFrame(frame);
      }
    };

    let count = 0;
    const launch = () => {
      // Ekranning yuqori qismida tasodifiy nuqtada portlash
      burst(Math.random() * window.innerWidth, (Math.random() * 0.4 + 0.1) * window.innerHeight);
      
      // Native audio chaqiruvi
      if (window.AndroidAdMob && window.AndroidAdMob.playFireworkSound) {
          window.AndroidAdMob.playFireworkSound();
      }

      if (++count < 6) setTimeout(launch, 400 + Math.random() * 400);
      else setTimeout(() => container.remove(), 2500);
    };
    launch();
  }

  function onMessage(ev) {
    if (ev.data?.type === "game:dispose") {
      closeGame();
    }
    if (ev.data?.type === "game:score") {
      const { id, score } = ev.data;
      const key = `gz-best-${id}`;
      const best = parseInt(localStorage.getItem(key) || "0", 10);
      if (score > best) {
        localStorage.setItem(key, String(score));
        buildGrid(filter); // Refresh high score on card
        triggerConfetti();
        triggerFireworks();
      }
    }
  }

  /**
   * Leaderboard UI komponentini yaratish va ko'rsatish
   */
  function renderLeaderboard(data) {
    let overlay = byId("lb-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "lb-overlay";
      overlay.className = "lb-overlay h";
      overlay.innerHTML = `
        <div class="lb-modal">
          <div class="lb-header">
            <span id="lb-title">🏆 Top Players</span>
            <button class="lb-close" onclick="this.closest('.lb-overlay').classList.add('h')">✕</button>
          </div>
          <div id="lb-list" class="lb-list"></div>
        </div>
        <style>
          .lb-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
            z-index: 3000; display: flex; align-items: center; justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .lb-overlay.h { opacity: 0; pointer-events: none; }
          .lb-modal {
            background: rgba(255, 255, 255, 0.95); width: 90%; max-width: 380px;
            border-radius: 28px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            overflow: hidden; transform: scale(1); transition: 0.3s;
          }
          .lb-overlay.h .lb-modal { transform: scale(0.9) translateY(20px); }
          .lb-header {
            padding: 20px 24px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;
            display: flex; justify-content: space-between; align-items: center;
          }
          #lb-title { font-weight: 800; font-size: 1.2rem; color: #1e293b; }
          .lb-close { 
            background: #f1f5f9; border: none; width: 32px; height: 32px; 
            border-radius: 50%; cursor: pointer; color: #64748b; font-weight: bold;
          }
          .lb-list { max-height: 60vh; overflow-y: auto; padding: 16px; }
          .lb-item {
            display: flex; align-items: center; padding: 12px 16px;
            margin-bottom: 10px; border-radius: 16px; background: #fff;
            border: 1px solid #f1f5f9; transition: 0.2s;
          }
          .lb-item:hover { transform: translateX(5px); border-color: #cbd5e1; }
          .lb-rank { 
            width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
            border-radius: 50%; font-weight: 800; margin-right: 12px; font-size: 0.9rem;
          }
          .rank-1 { background: #fef3c7; color: #d97706; border: 1px solid #fcd34d; }
          .rank-2 { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }
          .rank-3 { background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; }
          .lb-name { flex: 1; font-weight: 600; color: #334155; }
          .lb-score { font-weight: 800; color: #2563eb; background: #eff6ff; padding: 4px 12px; border-radius: 20px; }
          .lb-empty { text-align: center; padding: 40px; color: #94a3b8; font-style: italic; }
        </style>
      `;
      document.body.appendChild(overlay);
    }

    const listEl = byId("lb-list");
    listEl.innerHTML = "";

    if (!data || data.length === 0) {
      // Sinov uchun dummy data (agar serverdan bo'sh kelsa)
      data = [
        { name: "Player One", score: 2540 },
        { name: "Super Mario", score: 2100 },
        { name: "Elite Gamer", score: 1850 },
        { name: "Mini Pro", score: 1200 },
        { name: "Newbie", score: 450 }
      ];
    }

    // Professional Logic: Faqat Top-1 bo'lgan o'yinchiga share tugmasini ko'rsatish
    const footerEl = overlay.querySelector(".lb-footer");
    if (footerEl) {
        const gId = currentGameId || "global";
        const userBest = parseInt(localStorage.getItem(`gz-best-${gId}`) || "0", 10);
        // Agar foydalanuvchi natijasi ro'yxatdagi 1-o'rin natijasiga teng yoki undan katta bo'lsa
        const isTop1 = data && data.length > 0 && userBest >= data[0].score;
        footerEl.style.display = isTop1 ? "flex" : "none";
    }

    data.forEach((item, index) => {
      const rank = index + 1;
      const row = document.createElement("div");
      row.className = "lb-item";
      row.innerHTML = `
        <div class="lb-rank ${rank <= 3 ? 'rank-' + rank : ''}">${rank <= 3 ? '⭐' : rank}</div>
        <div class="lb-name">${item.name}</div>
        <div class="lb-score">${item.score}</div>
      `;
      listEl.appendChild(row);
    });

    overlay.classList.remove("h");
    
    // Ovozli effekt (ixtiyoriy)
    if (typeof GameAPI !== 'undefined' && GameAPI.vibrate) {
        GameAPI.vibrate(20);
    }
  }

  // Handler for data from Native
  window.onLeaderboardLoaded = function(data) {
      console.log("Leaderboard data received:", data);
      renderLeaderboard(data);
  };
  
  // Global access for testing or direct trigger
  window.showLeaderboard = () => {
      if (window.AndroidAdMob && window.AndroidAdMob.getLeaderboard) {
          window.AndroidAdMob.getLeaderboard(currentGameId || "global");
      } else {
          renderLeaderboard([]); // Stub for browser
      }
  };

  window.onRewardGranted = function(amount) {
      points += (amount * 50);
      localStorage.setItem("gz-pts", String(points));
      if (els.points) els.points.textContent = String(points);
      showToast("Reward Received! + " + (amount * 50));
  };

  /**
   * O'yindan chiqishni tasdiqlash modalini ko'rsatish.
   * Android "Back" tugmasi bosilganda chaqiriladi.
   */
  function showGameExitConfirmationFromParent() {
    const t = ui();
    els.exitModalMessage.textContent = t.exitGameMessage;
    els.exitModalYes.textContent = t.yes;
    els.exitModalNo.textContent = t.no;
    els.gameExitModal.classList.add("show");
  }

  function hideGameExitConfirmationFromParent() {
    els.gameExitModal.classList.remove("show");
  }

  async function init() {
    try {
      bindDom();
      installGlobals();
      updateViewportCssVars();
      applyAutomaticAccessibility();
      if (els.points) els.points.textContent = String(points);
      window.addEventListener("message", onMessage);

      await loadTranslations();
      const startupLang = detectStartupLang();
      setLang(startupLang, true);

      if (localStorage.getItem("gz-lang") && els.lp) {
        els.lp.classList.add("h");
      }

      applyTranslations();
      buildGrid(filter);
      preloadGames();

      // Exit confirmation modal event listeners (with existence check)
      if (els.exitModalYes) {
        els.exitModalYes.onclick = () => { hideGameExitConfirmationFromParent(); closeGame(); };
      }
      if (els.exitModalNo) {
        els.exitModalNo.onclick = () => { hideGameExitConfirmationFromParent(); };
      }

    } catch (e) {
      console.error("FATAL: init failed", e);
      // Fallback
      translations = FALLBACK_TRANSLATIONS;
      if (els.ld) els.ld.classList.add("h");
    } finally {
      if (els.ld) {
        setTimeout(() => els.ld.classList.add("h"), 150);
      }
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);
      window.visualViewport?.addEventListener("resize", onResize);
      window.addEventListener("beforeunload", cleanup);
    }
  }
  window.showGameExitConfirmationFromParent = showGameExitConfirmationFromParent; // Global qilish

  window.addEventListener("DOMContentLoaded", init, { once: true });
})();
