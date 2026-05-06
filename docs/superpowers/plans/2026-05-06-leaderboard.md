# Leaderboard Tab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 🏆 Leaderboard tab to the bottom nav that shows played games ranked by best score, with a collapsible 10-session history per game.

**Architecture:** A new `leaderboard.js` module (IIFE, exposes `window.Leaderboard`) listens to the `game:score` postMessage already fired by every game and persists sessions to `gz-history-{gameId}` in localStorage. `index.html` gets a new nav tab and a `#lb-panel` div. `script.js` gets translations and two one-line hooks (`fil()` hides the panel; `applyTranslations()` updates the nav label).

**Tech Stack:** Vanilla JS, HTML/CSS, localStorage, WebView (Android)

---

## File Map

| File | Change |
|------|--------|
| `app/src/main/assets/www/script.js` | Add `"leaderboard"` translations, expose `window.GAMES`, update `applyTranslations()` and `fil()` |
| `app/src/main/assets/www/index.html` | Add `#lb-panel` div, 🏆 nav button, leaderboard CSS, `<script src="leaderboard.js">` |
| `app/src/main/assets/www/leaderboard.js` | New file — score capture, storage, rendering, clear |

---

## Task 1: Update script.js — translations, GAMES export, fil() and applyTranslations() hooks

**Files:**
- Modify: `app/src/main/assets/www/script.js`

- [ ] **Step 1: Add leaderboard translations to TRANSLATIONS_DATA**

Find (line 246–247):
```js
    }
  };
```
Replace with:
```js
    },
    "leaderboard": {
      "uz": {
        "title": "Natijalar",
        "empty": "Hali o'yin o'ynalmagan",
        "gamesPlayed": "ta o'yin o'ynalgan",
        "best": "Rekord: ",
        "clear": "Tozalash",
        "clearConfirm": "Barcha natijalar o'chirilsinmi?",
        "nb": "Natijalar"
      },
      "ru": {
        "title": "Результаты",
        "empty": "Игр ещё не было",
        "gamesPlayed": "игр сыграно",
        "best": "Рекорд: ",
        "clear": "Очистить",
        "clearConfirm": "Удалить все результаты?",
        "nb": "Рейтинг"
      },
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

- [ ] **Step 2: Add `lt()` helper and `#nb5` update to `applyTranslations()`**

Find (line 321):
```js
  function applyTranslations() {
    const t = ui();
    if (byId("sec-t")) byId("sec-t").textContent = t.filters[filter] || t.sec;
    if (byId("nb0")) byId("nb0").textContent = t.nb0;
    if (byId("nb1")) byId("nb1").textContent = t.nb1;
    if (byId("nb2")) byId("nb2").textContent = t.nb2;
    if (byId("nb3")) byId("nb3").textContent = t.nb3;
    if (byId("nb4")) byId("nb4").textContent = t.nb4;
```
Replace with:
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

- [ ] **Step 3: Update `fil()` to hide `#lb-panel` and restore grid**

Find:
```js
  function fil(f) {
    filter = f;
    document.querySelectorAll(".ni").forEach((n) => n.classList.remove("on"));
    byId(`ni-${f}`)?.classList.add("on");
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
    if (els.grid) els.grid.style.display = "";
    applyTranslations();
    buildGrid(f, ageFilter);
  }
```

- [ ] **Step 4: Expose `window.GAMES` in `init()`**

Find:
```js
      window.TRANSLATIONS_DATA = TRANSLATIONS_DATA; // Export for FamilyMode
```
Replace with:
```js
      window.TRANSLATIONS_DATA = TRANSLATIONS_DATA; // Export for FamilyMode
      window.GAMES = GAMES; // Export for Leaderboard
```

- [ ] **Step 5: Commit**

```
git add app/src/main/assets/www/script.js
git commit -m "feat: add leaderboard translations and fil/applyTranslations hooks to script.js"
```

---

## Task 2: Update index.html — nav tab, panel div, CSS, script tag

**Files:**
- Modify: `app/src/main/assets/www/index.html`

- [ ] **Step 1: Add leaderboard CSS before `</style>` (line 209)**

Find:
```css
</style>
```
Replace with:
```css
/* LEADERBOARD PANEL */
#lb-panel { display:none; padding:16px; }
.lb-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
.lb-title { font-size:20px; font-weight:900; color:var(--txt); }
.lb-count { font-size:12px; color:var(--txt2); margin-top:2px; }
.lb-clear-btn { background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); border-radius:10px; color:#F87171; font-size:12px; font-weight:700; padding:6px 14px; cursor:pointer; }
.lb-game-row { background:var(--surf); border:1px solid var(--brd); border-radius:16px; margin-bottom:10px; overflow:hidden; }
.lb-game-header { display:flex; justify-content:space-between; align-items:center; padding:14px 16px; cursor:pointer; }
.lb-game-left { display:flex; align-items:center; gap:10px; }
.lb-game-em { font-size:24px; }
.lb-game-name { font-size:14px; font-weight:700; color:var(--txt); }
.lb-game-right { display:flex; align-items:center; gap:10px; }
.lb-best { font-size:12px; color:#FACC15; font-weight:700; }
.lb-chevron { font-size:18px; color:var(--txt2); transition:transform 0.2s; }
.lb-hist { padding:0 16px 12px; }
.lb-hist-row { font-size:12px; color:var(--txt2); padding:6px 0; border-top:1px solid var(--brd); }
.lb-empty { text-align:center; padding:60px 20px; }
.lb-empty-icon { font-size:48px; margin-bottom:12px; }
.lb-empty-txt { color:var(--txt2); font-size:15px; }
</style>
```

- [ ] **Step 2: Add `#lb-panel` div after `<div id="grid"></div>` (line 243)**

Find:
```html
    <div id="grid"></div>
  </main>
```
Replace with:
```html
    <div id="grid"></div>
    <div id="lb-panel"></div>
  </main>
```

- [ ] **Step 3: Add 🏆 nav tab button after the settings button (line 251)**

Find:
```html
    <button class="ni" onclick="showRev()" id="ni-rev"><span class="ni-i">⚙️</span><span class="ni-l" id="nb4">Til</span></button>
  </nav>
```
Replace with:
```html
    <button class="ni" onclick="showRev()" id="ni-rev"><span class="ni-i">⚙️</span><span class="ni-l" id="nb4">Til</span></button>
    <button class="ni" onclick="showLeaderboard()" id="ni-lb"><span class="ni-i">🏆</span><span class="ni-l" id="nb5">Natijalar</span></button>
  </nav>
```

- [ ] **Step 4: Add `<script src="leaderboard.js">` after `family-mode.js` (line 320)**

Find:
```html
<script src="family-mode.js"></script>
</body>
```
Replace with:
```html
<script src="family-mode.js"></script>
<script src="leaderboard.js"></script>
</body>
```

- [ ] **Step 5: Commit**

```
git add app/src/main/assets/www/index.html
git commit -m "feat: add leaderboard panel, nav tab, CSS, and script tag to index.html"
```

---

## Task 3: Create leaderboard.js

**Files:**
- Create: `app/src/main/assets/www/leaderboard.js`

- [ ] **Step 1: Create the file with the full module**

Create `app/src/main/assets/www/leaderboard.js` with this exact content:

```js
(() => {
  "use strict";

  const STORAGE_PREFIX = "gz-history-";
  const MAX_HISTORY = 10;

  function lt() {
    const lang = localStorage.getItem("gz-lang") || "uz";
    const base = window.TRANSLATIONS_DATA?.leaderboard;
    return (base?.[lang] || base?.uz || {});
  }

  function getHistory(gameId) {
    try { return JSON.parse(localStorage.getItem(STORAGE_PREFIX + gameId) || "[]"); } catch (_) { return []; }
  }

  function saveHistory(gameId, history) {
    localStorage.setItem(STORAGE_PREFIX + gameId, JSON.stringify(history));
  }

  function record(gameId, score) {
    const history = getHistory(gameId);
    history.unshift({ score: parseInt(score, 10), ts: Date.now() });
    saveHistory(gameId, history.slice(0, MAX_HISTORY));
  }

  function formatDate(ts) {
    const d = new Date(ts);
    const lang = localStorage.getItem("gz-lang") || "uz";
    const months = {
      uz: ["yan","fev","mar","apr","may","iyn","iyl","avg","sen","okt","noy","dek"],
      ru: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],
      en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    };
    const m = (months[lang] || months.uz)[d.getMonth()];
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${d.getDate()}-${m} ${hh}:${mm}`;
  }

  function render() {
    const panel = document.getElementById("lb-panel");
    if (!panel) return;

    const lang = localStorage.getItem("gz-lang") || "uz";
    const t = lt();
    const games = window.GAMES || [];
    const tr = window.TRANSLATIONS_DATA;

    const played = games
      .map(g => ({
        id: g.id,
        em: g.em,
        best: parseInt(localStorage.getItem("gz-best-" + g.id) || "0", 10),
        history: getHistory(g.id),
        name: tr?.games?.[g.id]?.title?.[lang] || tr?.games?.[g.id]?.title?.uz || g.id
      }))
      .filter(g => g.best > 0)
      .sort((a, b) => b.best - a.best);

    if (played.length === 0) {
      panel.innerHTML = `
        <div class="lb-empty">
          <div class="lb-empty-icon">🏆</div>
          <div class="lb-empty-txt">${t.empty || "No games played yet"}</div>
        </div>`;
      panel.style.display = "block";
      return;
    }

    const rows = played.map(g => {
      const histRows = g.history.length > 0
        ? g.history.map(s => `<div class="lb-hist-row">${s.score} — ${formatDate(s.ts)}</div>`).join("")
        : "";
      return `
        <div class="lb-game-row">
          <div class="lb-game-header" onclick="Leaderboard.toggle('${g.id}')">
            <div class="lb-game-left">
              <span class="lb-game-em">${g.em}</span>
              <span class="lb-game-name">${g.name}</span>
            </div>
            <div class="lb-game-right">
              <span class="lb-best">🥇 ${t.best || "Best: "}${g.best}</span>
              <span class="lb-chevron" id="chv-${g.id}">›</span>
            </div>
          </div>
          <div class="lb-hist" id="hist-${g.id}" style="display:none;">${histRows}</div>
        </div>`;
    }).join("");

    panel.innerHTML = `
      <div class="lb-header">
        <div>
          <div class="lb-title">🏆 ${t.title || "Leaderboard"}</div>
          <div class="lb-count">${played.length} ${t.gamesPlayed || "games played"}</div>
        </div>
        <button class="lb-clear-btn" onclick="Leaderboard.clearAll()">${t.clear || "Clear"}</button>
      </div>
      <div class="lb-list">${rows}</div>`;

    panel.style.display = "block";
  }

  function toggle(gameId) {
    const hist = document.getElementById("hist-" + gameId);
    const chv  = document.getElementById("chv-" + gameId);
    if (!hist) return;
    const isOpen = hist.style.display !== "none";
    hist.style.display = isOpen ? "none" : "block";
    if (chv) chv.textContent = isOpen ? "›" : "∨";
  }

  function hide() {
    const panel = document.getElementById("lb-panel");
    if (panel) panel.style.display = "none";
  }

  function clearAll() {
    const t = lt();
    if (!window.confirm(t.clearConfirm || "Clear all scores?")) return;
    (window.GAMES || []).forEach(g => localStorage.removeItem(STORAGE_PREFIX + g.id));
    render();
  }

  // Capture every game:score message from iframes
  window.addEventListener("message", function (ev) {
    if (ev.data?.type === "game:score" && ev.data.id && typeof ev.data.score === "number") {
      record(ev.data.id, ev.data.score);
    }
  });

  window.showLeaderboard = function () {
    document.querySelectorAll(".ni").forEach(n => n.classList.remove("on"));
    document.getElementById("ni-lb")?.classList.add("on");
    const grid = document.getElementById("grid");
    if (grid) grid.style.display = "none";
    render();
  };

  window.Leaderboard = { render, hide, toggle, clearAll, record };
})();
```

- [ ] **Step 2: Commit**

```
git add app/src/main/assets/www/leaderboard.js
git commit -m "feat: add leaderboard.js module with score capture, storage, and rendering"
```

---

## Task 4: Verify on device

- [ ] **Step 1: Build** — Android Studio → Build → Clean Project → Rebuild Project

- [ ] **Step 2: Run on device** — Click ▶ Run (Shift+F10)

- [ ] **Step 3: Verify leaderboard tab appears**
  - Bottom nav should show 6 items: 🏠 🐣 🕹️ 😌 ⚙️ 🏆
  - Tap 🏆 → panel appears with empty state: "Hali o'yin o'ynalmagan"
  - Tap any other tab → grid shows, leaderboard hides

- [ ] **Step 4: Verify score recording**
  - Play any arcade game (e.g. bubble-pop) to game over
  - Tap 🏆 → bubble-pop row should appear with best score
  - Play bubble-pop again → history should show 2 entries, newest first

- [ ] **Step 5: Verify expand/collapse**
  - Tap a game row chevron (›) → history expands, chevron becomes ∨
  - Tap again → collapses back to ›

- [ ] **Step 6: Verify language switch**
  - On leaderboard tab, tap ⚙️ → switch language to RU
  - Tab label should update to "Рейтинг"
  - Leaderboard panel should re-render with Russian labels (Рекорд:, Результаты)

- [ ] **Step 7: Verify clear**
  - Tap "Tozalash" → confirm dialog appears → confirm
  - Panel shows empty state again
  - Tap ⚙️ switch to EN → "Clear" label, "No games played yet" empty state

- [ ] **Step 8: Apply hotfixes if found**

```
git add app/src/main/assets/www/
git commit -m "fix: leaderboard post-device hotfixes"
```
