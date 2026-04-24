(() => {
  "use strict";

  const GAMES = [
    { id: "bubble-pop", em: "🫧", cat: ["arcade"], tc: "#3B82F6", bg: "135deg,#090930,#18186a", bdg: "hot", file: "bubble-pop.html" },
    { id: "color-rush", em: "🎨", cat: ["arcade"], tc: "#8B5CF6", bg: "135deg,#1a003e,#400070", bdg: null, file: "color-rush.html" },
    { id: "memory-game", em: "🧠", cat: ["arcade", "kids"], tc: "#10B981", bg: "135deg,#001c38,#0d2c70", bdg: "new", file: "memory-game.html" },
    { id: "animals", em: "🐾", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#182800,#285018", bdg: "new", file: "animals.html" },
    { id: "math-kids", em: "🔢", cat: ["kids"], tc: "#EC4899", bg: "135deg,#2a0036,#5a0060", bdg: "new", file: "math-kids.html" },
    { id: "colors-shapes", em: "🌈", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#1a0000,#700000", bdg: "new", file: "colors-shapes.html" },
    { id: "stack-tower", em: "🗼", cat: ["arcade"], tc: "#06B6D4", bg: "135deg,#001828,#003450", bdg: null, file: "stack-tower.html" },
    { id: "helix-jump", em: "🌀", cat: ["arcade"], tc: "#A78BFA", bg: "135deg,#090032,#250058", bdg: null, file: "helix-jump.html" },
    { id: "zen-garden", em: "🌸", cat: ["relax"], tc: "#10B981", bg: "135deg,#001808,#003018", bdg: null, file: "zen-garden.html" },
    { id: "rain-tap", em: "🌧️", cat: ["relax"], tc: "#60A5FA", bg: "135deg,#001428,#002050", bdg: null, file: "rain-tap.html" },
    { id: "quick-tap", em: "⚡", cat: ["arcade"], tc: "#F97316", bg: "135deg,#2a1200,#552100", bdg: "new", file: "quick-tap.html" },
    { id: "shape-match", em: "🔷", cat: ["kids"], tc: "#22D3EE", bg: "135deg,#001b2e,#003b5a", bdg: null, file: "shape-match.html" },
    { id: "word-sprint", em: "🔤", cat: ["kids"], tc: "#FB7185", bg: "135deg,#2b0012,#5a0020", bdg: null, file: "word-sprint.html" },
    { id: "pattern-trace", em: "🧩", cat: ["kids", "arcade"], tc: "#A3E635", bg: "135deg,#152400,#2f5400", bdg: null, file: "pattern-trace.html" },
    { id: "melody-memory", em: "🎵", cat: ["relax", "kids"], tc: "#C084FC", bg: "135deg,#1f1238,#3d1f66", bdg: null, file: "melody-memory.html" },
    { id: "star-catcher", em: "⭐", cat: ["arcade"], tc: "#FACC15", bg: "135deg,#2a2400,#5a4d00", bdg: "hot", file: "star-catcher.html" },
    { id: "gentle-breath", em: "🫁", cat: ["relax"], tc: "#34D399", bg: "135deg,#00241b,#004635", bdg: null, file: "gentle-breath.html" },
    { id: "focus-flow", em: "🎯", cat: ["arcade"], tc: "#60A5FA", bg: "135deg,#00172b,#003a66", bdg: null, file: "focus-flow.html" },
    { id: "number-path", em: "🔢", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#2c1200,#5e2a00", bdg: null, file: "number-path.html" },
    { id: "puzzle-slide", em: "🧱", cat: ["arcade", "kids"], tc: "#818CF8", bg: "135deg,#0f1433,#222d64", bdg: null, file: "puzzle-slide.html" }
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
        audio: { langChanged: "O'zbek tili yoqildi" }
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
        audio: { langChanged: "Русский язык включен" }
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
        audio: { langChanged: "English language enabled" }
      }
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
    byId("lr1").textContent = t.lr;
    byId("lr2").textContent = t.lr;
    byId("lr3").textContent = t.lr;
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
      lang,
      hg: String(healthGroup),
      ts: String(Date.now())
    });

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
    updateViewportCssVars();
    if (viewportTimer) clearTimeout(viewportTimer);
    viewportTimer = setTimeout(() => {
      viewportTimer = null;
      updateViewportCssVars();
    }, 150);
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => buildGrid(filter), 120);
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
      }
    }
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

  window.addEventListener("DOMContentLoaded", init, { once: true });
})();
