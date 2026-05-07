# Achievements / Badges System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 🏅 Achievements tab with 25 fixed one-time achievements unlocked by score and play-count milestones, with a queued toast notification on unlock.

**Architecture:** A new `achievements.js` module (IIFE, exposes `window.Achievements`) listens to the `game:score` postMessage already fired by every game, computes stats from existing localStorage keys (`gz-best-{id}`, `gz-history-{id}`), checks all 25 conditions, saves newly unlocked IDs to `gz-unlocked`, and shows a queued toast. `index.html` gets a new `#ach-panel` div, 🏅 nav tab, CSS, and script tag. `script.js` gets translations, an `at()` helper, and hooks in `fil()` and `applyTranslations()`. `leaderboard.js` gets one line to hide `#ach-panel` when the leaderboard tab opens.

**Tech Stack:** Vanilla JS, HTML/CSS, localStorage, WebView (Android)

---

## File Map

| File | Change |
|------|--------|
| `app/src/main/assets/www/script.js` | Add `"achievements"` translations, `at()` helper, update `applyTranslations()` and `fil()` |
| `app/src/main/assets/www/index.html` | Add `#ach-panel` div, 🏅 nav button, achievement CSS, `<script src="achievements.js">` |
| `app/src/main/assets/www/leaderboard.js` | One-line addition to `showLeaderboard()` to hide `#ach-panel` |
| `app/src/main/assets/www/achievements.js` | New module — 25 achievements, computeStats, checkAll, toast queue, render |

---

## Task 1: Update script.js — translations, at() helper, fil() and applyTranslations() hooks

**Files:**
- Modify: `app/src/main/assets/www/script.js`

- [ ] **Step 1: Add achievements translations to TRANSLATIONS_DATA**

Find (lines 266–276 — end of the leaderboard block):
```js
      "en": {
        "title": "Leaderboard",
        "empty": "No games played yet",
        "gamesPlayed": "games played",
        "best": "Best: ",
        "clear": "Clear",
        "clearConfirm": "Clear all scores?",
        "nb": "Top Scores"
      }
    }
  };
```
Replace with:
```js
      "en": {
        "title": "Leaderboard",
        "empty": "No games played yet",
        "gamesPlayed": "games played",
        "best": "Best: ",
        "clear": "Clear",
        "clearConfirm": "Clear all scores?",
        "nb": "Top Scores"
      }
    },
    "achievements": {
      "uz": {
        "title": "Yutuqlar",
        "nb": "Yutuqlar",
        "unlocked": "Yutuq ochildi!",
        "sections": {
          "explorer": "Kashfiyotchi",
          "sessions": "Sessiyalar",
          "category": "Kategoriya",
          "dedication": "Sadoqat",
          "score": "Rekord"
        }
      },
      "ru": {
        "title": "Достижения",
        "nb": "Достижения",
        "unlocked": "Достижение открыто!",
        "sections": {
          "explorer": "Исследователь",
          "sessions": "Сессии",
          "category": "Категория",
          "dedication": "Преданность",
          "score": "Рекорд"
        }
      },
      "en": {
        "title": "Achievements",
        "nb": "Achievements",
        "unlocked": "Achievement unlocked!",
        "sections": {
          "explorer": "Explorer",
          "sessions": "Sessions",
          "category": "Category",
          "dedication": "Dedication",
          "score": "High Score"
        }
      }
    }
  };
```

- [ ] **Step 2: Add at() helper and update applyTranslations()**

Find (lines 350–363):
```js
  function lt() {
    return translations.leaderboard?.[lang] || translations.leaderboard?.uz || {};
  }

  function applyTranslations() {
    const t = ui();
    if (byId("sec-t")) byId("sec-t").textContent = t.filters[filter] || t.sec;
    if (byId("nb0")) byId("nb0").textContent = t.nb0;
    if (byId("nb1")) byId("nb1").textContent = t.nb1;
    if (byId("nb2")) byId("nb2").textContent = t.nb2;
    if (byId("nb3")) byId("nb3").textContent = t.nb3;
    if (byId("nb4")) byId("nb4").textContent = t.nb4;
    if (byId("nb5")) byId("nb5").textContent = lt().nb;
    if (byId("lb-panel") && byId("lb-panel").style.display !== "none") window.Leaderboard?.render();
```
Replace with:
```js
  function lt() {
    return translations.leaderboard?.[lang] || translations.leaderboard?.uz || {};
  }

  function at() {
    return translations.achievements?.[lang] || translations.achievements?.uz || {};
  }

  function applyTranslations() {
    const t = ui();
    if (byId("sec-t")) byId("sec-t").textContent = t.filters[filter] || t.sec;
    if (byId("nb0")) byId("nb0").textContent = t.nb0;
    if (byId("nb1")) byId("nb1").textContent = t.nb1;
    if (byId("nb2")) byId("nb2").textContent = t.nb2;
    if (byId("nb3")) byId("nb3").textContent = t.nb3;
    if (byId("nb4")) byId("nb4").textContent = t.nb4;
    if (byId("nb5")) byId("nb5").textContent = lt().nb;
    if (byId("nb6")) byId("nb6").textContent = at().nb;
    if (byId("lb-panel") && byId("lb-panel").style.display !== "none") window.Leaderboard?.render();
    if (byId("ach-panel") && byId("ach-panel").style.display !== "none") window.Achievements?.render();
```

- [ ] **Step 3: Update fil() to hide #ach-panel**

Find (lines 496–505):
```js
  function fil(f) {
    filter = f;
    document.querySelectorAll(".ni").forEach((n) => n.classList.remove("on"));
    byId(`ni-${f}`)?.classList.add("on");
    const lbPanel = byId("lb-panel");
    if (lbPanel) lbPanel.style.display = "none";
    if (els.grid) els.grid.style.display = "";
    applyTranslations();
    buildGrid(f, ageFilter);
  }
```
Replace with:
```js
  function fil(f) {
    filter = f;
    document.querySelectorAll(".ni").forEach((n) => n.classList.remove("on"));
    byId(`ni-${f}`)?.classList.add("on");
    const lbPanel = byId("lb-panel");
    if (lbPanel) lbPanel.style.display = "none";
    const achPanel = byId("ach-panel");
    if (achPanel) achPanel.style.display = "none";
    if (els.grid) els.grid.style.display = "";
    applyTranslations();
    buildGrid(f, ageFilter);
  }
```

- [ ] **Step 4: Commit**

```
git add app/src/main/assets/www/script.js
git commit -m "feat: add achievements translations and at()/fil()/applyTranslations() hooks to script.js"
```

---

## Task 2: Update index.html — CSS, panel div, nav tab, script tag

**Files:**
- Modify: `app/src/main/assets/www/index.html`

- [ ] **Step 1: Add achievement CSS before </style> (line 229)**

Find:
```css
</style>
```
Replace with:
```css
/* ACHIEVEMENTS PANEL */
#ach-panel { display:none; padding:16px; }
.ach-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.ach-title { font-size:20px; font-weight:900; color:var(--txt); }
.ach-count { font-size:12px; color:var(--txt2); background:rgba(255,255,255,0.06); border-radius:10px; padding:4px 10px; }
.ach-section-title { font-size:11px; font-weight:700; color:var(--txt2); text-transform:uppercase; letter-spacing:1px; margin:12px 0 6px; }
.ach-item { display:flex; align-items:center; gap:12px; background:var(--surf); border:1px solid var(--brd); border-radius:14px; padding:12px 14px; margin-bottom:8px; }
.ach-locked { opacity:0.45; }
.ach-em { font-size:24px; flex-shrink:0; }
.ach-info { flex:1; min-width:0; }
.ach-item-title { font-size:13px; font-weight:700; color:var(--txt); margin-bottom:2px; }
.ach-item-desc { font-size:11px; color:var(--txt2); }
.ach-check { font-size:16px; flex-shrink:0; }
.ach-toast { position:fixed; bottom:80px; left:50%; transform:translateX(-50%) translateY(20px); background:linear-gradient(135deg,#6366F1,#A855F7); color:white; padding:12px 20px; border-radius:18px; font-size:13px; z-index:700; opacity:0; transition:opacity 0.3s,transform 0.3s; pointer-events:none; text-align:center; white-space:nowrap; box-shadow:0 8px 24px rgba(99,102,241,0.4); }
.ach-toast.ach-toast-show { opacity:1; transform:translateX(-50%) translateY(0); }
.ach-toast-label { font-size:10px; opacity:0.8; margin-bottom:2px; text-transform:uppercase; letter-spacing:1px; }
.ach-toast-title { font-weight:900; font-size:14px; }
</style>
```

- [ ] **Step 2: Add #ach-panel div after #lb-panel (line 264)**

Find:
```html
    <div id="lb-panel"></div>
  </main>
```
Replace with:
```html
    <div id="lb-panel"></div>
    <div id="ach-panel"></div>
  </main>
```

- [ ] **Step 3: Add 🏅 nav tab button after the leaderboard button (line 273)**

Find:
```html
    <button class="ni" onclick="showLeaderboard()" id="ni-lb"><span class="ni-i">🏆</span><span class="ni-l" id="nb5">Natijalar</span></button>
  </nav>
```
Replace with:
```html
    <button class="ni" onclick="showLeaderboard()" id="ni-lb"><span class="ni-i">🏆</span><span class="ni-l" id="nb5">Natijalar</span></button>
    <button class="ni" onclick="showAchievements()" id="ni-ach"><span class="ni-i">🏅</span><span class="ni-l" id="nb6">Yutuqlar</span></button>
  </nav>
```

- [ ] **Step 4: Add <script src="achievements.js"> after leaderboard.js (line 343)**

Find:
```html
<script src="leaderboard.js"></script>
</body>
```
Replace with:
```html
<script src="leaderboard.js"></script>
<script src="achievements.js"></script>
</body>
```

- [ ] **Step 5: Commit**

```
git add app/src/main/assets/www/index.html
git commit -m "feat: add achievements panel, nav tab, CSS, and script tag to index.html"
```

---

## Task 3: Update leaderboard.js — hide #ach-panel in showLeaderboard()

**Files:**
- Modify: `app/src/main/assets/www/leaderboard.js`

- [ ] **Step 1: Add #ach-panel hide to showLeaderboard()**

Find (lines 132–138):
```js
  window.showLeaderboard = function () {
    document.querySelectorAll(".ni").forEach(n => n.classList.remove("on"));
    document.getElementById("ni-lb")?.classList.add("on");
    const grid = document.getElementById("grid");
    if (grid) grid.style.display = "none";
    render();
  };
```
Replace with:
```js
  window.showLeaderboard = function () {
    document.querySelectorAll(".ni").forEach(n => n.classList.remove("on"));
    document.getElementById("ni-lb")?.classList.add("on");
    const grid = document.getElementById("grid");
    if (grid) grid.style.display = "none";
    const achPanel = document.getElementById("ach-panel");
    if (achPanel) achPanel.style.display = "none";
    render();
  };
```

- [ ] **Step 2: Commit**

```
git add app/src/main/assets/www/leaderboard.js
git commit -m "fix: hide #ach-panel when leaderboard tab opens"
```

---

## Task 4: Create achievements.js

**Files:**
- Create: `app/src/main/assets/www/achievements.js`

- [ ] **Step 1: Create the file with the full module**

Create `app/src/main/assets/www/achievements.js` with this exact content:

```js
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
    const lang = localStorage.getItem("gz-lang") || "uz";
    const t = at();
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

  window.addEventListener("message", function(ev) {
    if (ev.data?.type === "game:score" && ev.data.id && typeof ev.data.score === "number") {
      checkAll();
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
```

- [ ] **Step 2: Commit**

```
git add app/src/main/assets/www/achievements.js
git commit -m "feat: add achievements.js module with 25 achievements, toast queue, and render"
```

---

## Task 5: Verify on device

**Files:** None — read-only verification

- [ ] **Step 1: Build** — Android Studio → Build → Clean Project → Rebuild Project

- [ ] **Step 2: Run on device** — Click ▶ Run (Shift+F10)

- [ ] **Step 3: Verify achievements tab appears**
  - Bottom nav should show 7 items: 🏠 👶 🕹️ 😌 ⚙️ 🏆 🏅
  - Tap 🏅 → panel appears with header "🏅 Yutuqlar" and count "0 / 25"
  - All 25 achievements shown greyed out with 🔒 icon, grouped by section
  - Tap any other nav tab → achievements panel hides, grid appears

- [ ] **Step 4: Verify tab isolation**
  - Tap 🏆 (Leaderboard) while on 🏅 tab → leaderboard shows, achievements panel hides
  - Tap 🏅 while on 🏆 tab → achievements shows, leaderboard hides

- [ ] **Step 5: Verify achievement unlock and toast**
  - Open browser DevTools console (or Android Logcat) — not strictly needed, but useful
  - Play Bubble Pop once and reach game over
  - After returning to main screen, tap 🏅 → "Birinchi qadam" (First Step) should show ✅ unlocked, count updates to "1 / 25"
  - A toast "🏅 Yutuq ochildi! 🎮 Birinchi qadam" should have appeared briefly after the game ended

- [ ] **Step 6: Verify toast queue**
  - Seed localStorage manually in DevTools to simulate multiple achievements unlocking at once:
    ```js
    // In browser DevTools console:
    localStorage.setItem("gz-history-bubble-pop", JSON.stringify([{score:100,ts:Date.now()},{score:90,ts:Date.now()},{score:80,ts:Date.now()},{score:70,ts:Date.now()},{score:60,ts:Date.now()}]));
    localStorage.setItem("gz-best-bubble-pop", "600");
    ```
  - Reload page, play any game to trigger `game:score`
  - Multiple toasts should appear one after another (not simultaneously)

- [ ] **Step 7: Verify language switch**
  - While on 🏅 tab, tap ⚙️ → switch language to RU
  - Tab label should update to "Достижения"
  - Panel re-renders with Russian section labels and achievement text

- [ ] **Step 8: Apply hotfixes if found**

```
git add app/src/main/assets/www/
git commit -m "fix: achievements post-device hotfixes"
```
