# Game Audit + Family Mode 2-Player Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a pre-game "who's turn" screen to Family Mode, fix score reporting for 3 ambient games, and audit all 23 games for bugs.

**Architecture:** `family-mode.js` exposes `onGameOpen(id, game, cb)` which `script.js` calls inside `openGame()` before loading the iframe. When Family Mode is active, a full-screen overlay shows the current player's turn; tapping "Boshlash" fires `cb()` which loads the iframe. Ambient games (`rain-tap`, `zen-garden`) report tap/stroke count on `gameDispose`. `gentle-breath` gets its missing GAME_ID fixed.

**Tech Stack:** Vanilla JS, HTML/CSS, localStorage, WebView (Android), game-api.js

---

## File Map

| File | Change |
|------|--------|
| `app/src/main/assets/www/family-mode.js` | Add `onGameOpen()`, `startGame()`, expose both in `window.FamilyMode` |
| `app/src/main/assets/www/script.js` | Restructure `openGame()` to call `FamilyMode.onGameOpen()` hook |
| `app/src/main/assets/www/gentle-breath.html` | Add `id: "gentle-breath"` to `MINI_GAME_CONFIG` |
| `app/src/main/assets/www/rain-tap.html` | Add ripple counter, report score on `gameDispose` |
| `app/src/main/assets/www/zen-garden.html` | Add stroke counter, report score on `gameDispose` |

---

## Task 1: Add `onGameOpen()` to family-mode.js

**Files:**
- Modify: `app/src/main/assets/www/family-mode.js`

- [ ] **Step 1: Add `onGameOpen` and `startGame` functions**

Find the `/* ── Public actions ──` comment block (around line 239) and add these two functions immediately before it:

```js
  /* ── Pre-game turn screen ────────────────────────────────────────── */
  function onGameOpen(id, game, cb) {
    if (!state.active) return false;

    const lang = localStorage.getItem('gz-lang') || 'uz';
    const gamesData = window.TRANSLATIONS_DATA?.games;
    const gameName = gamesData?.[id]?.title?.[lang]
      || gamesData?.[id]?.title?.uz
      || id;
    const gameEmoji = game?.em || '🎮';

    let emoji, label;
    if (state.settings.mode === 'parent') {
      emoji = '🏆'; label = ft('parentTurn');
    } else if (state.settings.mode === 'child') {
      emoji = '👶'; label = ft('childTurn');
    } else {
      emoji = state.session.currentTurn === 'parent' ? '🏆' : '👶';
      label = state.session.currentTurn === 'parent' ? ft('parentTurn') : ft('childTurn');
    }

    const ps = state.session.parentScore;
    const cs = state.session.childScore;
    const rem = state.settings.timeLimit > 0
      ? `<div style="color:rgba(255,255,255,0.4);font-size:13px;margin-bottom:16px;">⏱ ${ft('timeLeft')} ${timeRemaining()} min</div>`
      : '';

    window._fmOpenCallback = cb;

    showModal(card(`
      <div style="text-align:center;">
        <div style="font-size:64px;margin-bottom:8px;">${emoji}</div>
        <h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:6px;">${label}</h2>
        <div style="color:rgba(255,255,255,0.5);font-size:15px;margin-bottom:20px;">${gameEmoji} ${gameName}</div>
        ${rem}
        <div style="background:rgba(255,255,255,0.05);border-radius:16px;padding:14px 20px;display:flex;justify-content:space-between;margin-bottom:20px;">
          <div style="text-align:center;">
            <div style="color:rgba(255,255,255,0.4);font-size:11px;">🏆 ${ft('parentScore')}</div>
            <div style="color:white;font-size:26px;font-weight:900;">${ps}</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,0.1);"></div>
          <div style="text-align:center;">
            <div style="color:rgba(255,255,255,0.4);font-size:11px;">👶 ${ft('childScore')}</div>
            <div style="color:white;font-size:26px;font-weight:900;">${cs}</div>
          </div>
        </div>
        <button onclick="FamilyMode.startGame()" style="width:100%;padding:18px;border-radius:18px;border:none;background:linear-gradient(135deg,#6366f1,#a855f7);color:white;font-size:18px;font-weight:900;cursor:pointer;box-shadow:0 8px 20px rgba(99,102,241,0.35);">${ft('start')} ▶</button>
      </div>
    `));

    return true;
  }

  function startGame() {
    const cb = window._fmOpenCallback;
    window._fmOpenCallback = null;
    hideModal();
    if (cb) cb();
  }

```

- [ ] **Step 2: Expose `onGameOpen` and `startGame` in `window.FamilyMode`**

Find the existing line (around line 299):
```js
  window.FamilyMode = {
    open, cancel, pt, setTL, setMode, toggleKids, begin, go, stop, again, exitSession,
    isActive: () => state.active,
    isKidsOnly: () => state.settings.kidsOnly
  };
```

Replace it with:
```js
  window.FamilyMode = {
    open, cancel, pt, setTL, setMode, toggleKids, begin, go, stop, again, exitSession,
    onGameOpen, startGame,
    isActive: () => state.active,
    isKidsOnly: () => state.settings.kidsOnly
  };
```

- [ ] **Step 3: Commit**

```
git add app/src/main/assets/www/family-mode.js
git commit -m "feat: add onGameOpen pre-game turn screen to family-mode.js"
```

---

## Task 2: Hook family-mode.js into script.js openGame()

**Files:**
- Modify: `app/src/main/assets/www/script.js` (lines 381–408)

- [ ] **Step 1: Restructure `openGame()` to call the hook**

Find the entire `openGame` function body (lines 381–408). Replace it with:

```js
  function openGame(id, title) {
    const game = GAMES.find((g) => g.id === id);
    if (!game) return;

    currentGameId = id;
    const params = new URLSearchParams({ lang, hg: String(healthGroup), tc: game.tc });

    els.gsTitle.textContent = title;
    els.gs.classList.remove("h");

    if (window.AndroidAdMob?.hideBanner) {
      window.AndroidAdMob.hideBanner();
    } else {
      window.setBannerVisibility?.(false);
    }

    function loadFrame() {
      if (els.gameLoadingOverlay) {
        const iconEl = els.gameLoadingOverlay.querySelector('.game-icon-anim');
        if (iconEl) iconEl.textContent = game.em;
        els.gameLoadingOverlay.classList.remove("hidden");
        if (els.loadingText) els.loadingText.textContent = ui().loading;
      }
      els.gsFrame.src = `${game.file}?${params.toString()}`;
    }

    if (window.FamilyMode?.onGameOpen(id, game, loadFrame)) return;
    loadFrame();
  }
```

- [ ] **Step 2: Commit**

```
git add app/src/main/assets/www/script.js
git commit -m "feat: hook FamilyMode.onGameOpen into openGame() for pre-game turn screen"
```

---

## Task 3: Fix gentle-breath.html — missing GAME_ID

**Files:**
- Modify: `app/src/main/assets/www/gentle-breath.html`

- [ ] **Step 1: Add `id` to MINI_GAME_CONFIG**

Find:
```js
window.MINI_GAME_CONFIG = {
  icon: "🫁",
  duration: 45,
```

Replace with:
```js
window.MINI_GAME_CONFIG = {
  id: "gentle-breath",
  icon: "🫁",
  duration: 45,
```

Without this fix, `mini-game-core.js` defaults `GAME_ID` to `"generic-game"` which causes best scores to be stored under the wrong key and never shown on the home screen.

- [ ] **Step 2: Commit**

```
git add app/src/main/assets/www/gentle-breath.html
git commit -m "fix: add missing GAME_ID to gentle-breath MINI_GAME_CONFIG"
```

---

## Task 4: Fix rain-tap.html — add score reporting

**Files:**
- Modify: `app/src/main/assets/www/rain-tap.html`

`rain-tap` is an ambient experience with no game-over. Score = number of ripples (taps) created during the session. Report on `gameDispose`.

- [ ] **Step 1: Add ripple counter and report on gameDispose**

Find:
```js
        let ripples = [];
        let drops = [];
        let active = true;
```

Replace with:
```js
        let ripples = [];
        let drops = [];
        let active = true;
        let tapCount = 0;
```

Find:
```js
        function addRipple(x, y) {
            ripples.push({ x, y, r: 0, a: 1 });
            GameAPI.vibrate(10);
        }
```

Replace with:
```js
        function addRipple(x, y) {
            ripples.push({ x, y, r: 0, a: 1 });
            tapCount++;
            GameAPI.vibrate(10);
        }
```

Find:
```js
        window.addEventListener('gameDispose', () => { active = false; });
```

Replace with:
```js
        window.addEventListener('gameDispose', () => {
            active = false;
            GameAPI.reportScore('rain-tap', tapCount);
            GameAPI.saveBestScore('rain-tap', tapCount);
            GameAPI.endGame();
        });
```

- [ ] **Step 2: Commit**

```
git add app/src/main/assets/www/rain-tap.html
git commit -m "fix: add tap-count score reporting to rain-tap on gameDispose"
```

---

## Task 5: Fix zen-garden.html — add score reporting

**Files:**
- Modify: `app/src/main/assets/www/zen-garden.html`

`zen-garden` is an ambient drawing experience. Score = number of strokes (touchstart / mousedown events). Report on `gameDispose`.

- [ ] **Step 1: Add stroke counter and report on gameDispose**

Find:
```js
        let drawing = false;
        let active = true;
```

Replace with:
```js
        let drawing = false;
        let active = true;
        let strokeCount = 0;
```

Find:
```js
        window.addEventListener('touchstart', e => {
            e.preventDefault();
            drawing = true;
            draw(e.touches[0].clientX, e.touches[0].clientY);
        });
```

Replace with:
```js
        window.addEventListener('touchstart', e => {
            e.preventDefault();
            drawing = true;
            strokeCount++;
            draw(e.touches[0].clientX, e.touches[0].clientY);
        });
```

Find:
```js
        window.addEventListener('mousedown', e => { drawing = true; draw(e.clientX, e.clientY); });
```

Replace with:
```js
        window.addEventListener('mousedown', e => { drawing = true; strokeCount++; draw(e.clientX, e.clientY); });
```

Find:
```js
        window.addEventListener('gameDispose', () => { active = false; });
```

Replace with:
```js
        window.addEventListener('gameDispose', () => {
            active = false;
            GameAPI.reportScore('zen-garden', strokeCount);
            GameAPI.saveBestScore('zen-garden', strokeCount);
            GameAPI.endGame();
        });
```

- [ ] **Step 2: Commit**

```
git add app/src/main/assets/www/zen-garden.html
git commit -m "fix: add stroke-count score reporting to zen-garden on gameDispose"
```

---

## Task 6: Verify on device

- [ ] **Step 1: Build** — Android Studio → Build → Clean Project → Build → Rebuild Project
- [ ] **Step 2: Run on device** — Click ▶ Run (Shift+F10)
- [ ] **Step 3: Test pre-game turn screen**
  - Tap 🏠 → set PIN → Settings → choose "Navbat bilan" (turns mode), 10 min → tap Start
  - Tap any game card → pre-game overlay must appear with 🏆 or 👶 + scores
  - Tap "Boshlash ▶" → game loads → play to game-over → turn screen appears
  - Verify next player's emoji is correct
- [ ] **Step 4: Test single-player modes**
  - Enter Family Mode → Settings → choose "Faqat bola" → Start → tap game → pre-game shows 👶 every time
  - Enter Family Mode → Settings → choose "Faqat ota-ona" → Start → tap game → pre-game shows 🏆 every time
- [ ] **Step 5: Test rain-tap score**
  - Open rain-tap → tap ~10 times → press back/close → open another game → turn screen shows score > 0
- [ ] **Step 6: Test zen-garden score**
  - Open zen-garden → draw a few strokes → close → turn screen shows score > 0
- [ ] **Step 7: Test gentle-breath best score**
  - Play gentle-breath to completion → go to home screen → gentle-breath card shows best score
- [ ] **Step 8: Apply hotfixes if found**

```
git add .
git commit -m "fix: post-device testing hotfixes"
```
