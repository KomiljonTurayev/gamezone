# Family Mode + Game Instructions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Family Mode (PIN-protected, turn-based co-play with time limits) and "How to Play" instructions for all 23 games.

**Architecture:** All Family Mode logic lives in a new `family-mode.js` injected into `index.html`. Game instructions are stored as data in `script.js` and shown via a modal in `index.html`. Score integration uses the existing `game:score` postMessage already fired by `game-api.js`.

**Tech Stack:** Vanilla JS, HTML/CSS, localStorage, WebView (Android)

---

## File Map

| File | Change |
|------|---------|
| `app/src/main/assets/www/family-mode.js` | **Create** — all Family Mode UI + logic |
| `app/src/main/assets/www/index.html` | Modify — add FM button, info modal HTML, CSS fixes, script tags |
| `app/src/main/assets/www/script.js` | Modify — add `family` translations + `howToPlay` data for 23 games |

---

## Task 1: Add Family Mode + HowToPlay data to script.js

**Files:**
- Modify: `app/src/main/assets/www/script.js` (inside `TRANSLATIONS_DATA`, after `"games"` block)

- [ ] **Step 1: Add `family` key inside TRANSLATIONS_DATA**

Find the closing `};` of `TRANSLATIONS_DATA` (line ~183) and add before it:

```js
    ,
    "family": {
      "uz": {
        "title": "Oilaviy Rejim", "enterPin": "PIN kiriting", "setPin": "Yangi PIN o'rnating",
        "pinHint": "4 ta raqam", "wrongPin": "Noto'g'ri PIN!", "lockout": "Kuting...",
        "timeLimitLabel": "O'yin vaqti", "modeLabel": "O'yin rejimi", "kidsOnly": "Faqat bolalar o'yinlari",
        "min10": "10 daqiqa", "min20": "20 daqiqa", "min30": "30 daqiqa", "unlimited": "Cheksiz",
        "modeChild": "👶 Faqat bola", "modeParent": "🏆 Faqat ota-ona", "modeTurns": "🔄 Navbat bilan",
        "start": "Boshlash", "parentTurn": "Ota-ona navbati!", "childTurn": "Bola navbati!",
        "parentScore": "Ota-ona", "childScore": "Bola", "nextPlayer": "Keyingi:",
        "continue": "Davom etish", "stop": "To'xtatish",
        "sessionEnd": "Bugunlik shu!", "playAgain": "Yana o'ynash", "exit": "Chiqish",
        "timeLeft": "Qoldi:"
      },
      "ru": {
        "title": "Семейный Режим", "enterPin": "Введите PIN", "setPin": "Создайте PIN",
        "pinHint": "4 цифры", "wrongPin": "Неверный PIN!", "lockout": "Подождите...",
        "timeLimitLabel": "Время игры", "modeLabel": "Режим игры", "kidsOnly": "Только детские игры",
        "min10": "10 минут", "min20": "20 минут", "min30": "30 минут", "unlimited": "Без ограничений",
        "modeChild": "👶 Только ребёнок", "modeParent": "🏆 Только родитель", "modeTurns": "🔄 По очереди",
        "start": "Начать", "parentTurn": "Ход родителя!", "childTurn": "Ход ребёнка!",
        "parentScore": "Родитель", "childScore": "Ребёнок", "nextPlayer": "Следующий:",
        "continue": "Продолжить", "stop": "Остановить",
        "sessionEnd": "На сегодня всё!", "playAgain": "Снова играть", "exit": "Выход",
        "timeLeft": "Осталось:"
      },
      "en": {
        "title": "Family Mode", "enterPin": "Enter PIN", "setPin": "Create New PIN",
        "pinHint": "4 digits", "wrongPin": "Wrong PIN!", "lockout": "Please wait...",
        "timeLimitLabel": "Play time", "modeLabel": "Play mode", "kidsOnly": "Kids games only",
        "min10": "10 minutes", "min20": "20 minutes", "min30": "30 minutes", "unlimited": "Unlimited",
        "modeChild": "👶 Child only", "modeParent": "🏆 Parent only", "modeTurns": "🔄 Take turns",
        "start": "Start", "parentTurn": "Parent's turn!", "childTurn": "Child's turn!",
        "parentScore": "Parent", "childScore": "Child", "nextPlayer": "Next:",
        "continue": "Continue", "stop": "Stop",
        "sessionEnd": "That's all for today!", "playAgain": "Play Again", "exit": "Exit",
        "timeLeft": "Left:"
      }
    },
    "howToPlay": {
      "bubble-pop":     { "uz": "Pufakchalarni barmoq bilan bosib portlating!", "ru": "Нажимай на пузырьки пальцем!", "en": "Tap bubbles to pop them!" },
      "color-rush":     { "uz": "Ko'rsatilgan rangga mos kartani tez bosing!", "ru": "Нажимай на карту нужного цвета!", "en": "Tap the card matching the shown color!" },
      "memory-game":    { "uz": "Kartochkalarni ochib bir xil juftini toping!", "ru": "Открывай карточки и ищи пары!", "en": "Flip cards and find matching pairs!" },
      "animals":        { "uz": "Hayvon ovozini eshiting va to'g'ri ismini tanlang!", "ru": "Слушай звук животного и выбери правильное имя!", "en": "Hear the animal sound and tap its correct name!" },
      "math-kids":      { "uz": "Masalani yechib to'g'ri javobni bosing!", "ru": "Реши задачу и выбери правильный ответ!", "en": "Solve the math problem and tap the correct answer!" },
      "colors-shapes":  { "uz": "Ko'rsatilgan rang yoki shaklni tanlang!", "ru": "Выбери указанный цвет или фигуру!", "en": "Choose the shown color or shape!" },
      "stack-tower":    { "uz": "Harakat qilayotgan blokni o'z vaqtida bosib uyib boring!", "ru": "Нажимай на движущийся блок вовремя, чтобы сложить башню!", "en": "Tap the moving block at the right time to stack it!" },
      "helix-jump":     { "uz": "Shar pastga tushsin — qora to'siqlardan saqla!", "ru": "Шар падает вниз — избегай чёрных препятствий!", "en": "Ball falls down — avoid the dark obstacles!" },
      "zen-garden":     { "uz": "Barmog'ingiz bilan qumda chiroyli naqshlar chizing!", "ru": "Рисуй красивые узоры на песке пальцем!", "en": "Draw beautiful patterns in the sand with your finger!" },
      "rain-tap":       { "uz": "Tushayotgan tomchilarni erga yetmasdan bosing!", "ru": "Нажимай на капли до того, как они коснутся земли!", "en": "Tap falling drops before they hit the ground!" },
      "quick-tap":      { "uz": "Ko'k doira chiqganda imkon qadar tez bosing!", "ru": "Нажимай на синий круг как можно быстрее!", "en": "Tap the blue circle as fast as possible!" },
      "shape-match":    { "uz": "Shaklni to'g'ri rangdagi katakka sudrab tashlang!", "ru": "Перетащи фигуру в ячейку правильного цвета!", "en": "Drag the shape to the slot with the matching color!" },
      "word-sprint":    { "uz": "Harflarni bosib ko'rsatilgan so'zni hosil qiling!", "ru": "Нажимай на буквы, чтобы составить показанное слово!", "en": "Tap letters in order to spell the shown word!" },
      "pattern-trace":  { "uz": "Ko'rsatilgan shaklni barmog'ingiz bilan chizing!", "ru": "Обведи показанную фигуру пальцем!", "en": "Trace the shown shape with your finger!" },
      "melody-memory":  { "uz": "Ohangni tinglang, so'ng xuddi shunday tugmalarni bosing!", "ru": "Послушай мелодию, затем нажми те же кнопки!", "en": "Listen to the melody, then tap the same buttons!" },
      "star-catcher":   { "uz": "Tushib kelayotgan yulduzlarni ekranda ushlang!", "ru": "Лови падающие звёзды на экране!", "en": "Catch the falling stars on screen!" },
      "gentle-breath":  { "uz": "Doira kattalashganda nafas oling, kichrayganda chiqaring!", "ru": "Вдыхай когда круг растёт, выдыхай когда сжимается!", "en": "Breathe in as the circle grows, breathe out as it shrinks!" },
      "focus-flow":     { "uz": "Ko'rsatilgan rangga mos nishonga tegishli rangda bosing!", "ru": "Нажимай на цель, чей цвет совпадает с показанным!", "en": "Tap the target whose color matches the displayed one!" },
      "fruit-merge":    { "uz": "Bir xil mevalarni bir-biriga tegizib kattalashtiring!", "ru": "Совмести одинаковые фрукты, чтобы они выросли!", "en": "Merge identical fruits together to make them bigger!" },
      "infinite-dash":  { "uz": "Chapga yoki o'ngga siljib to'siqlardan o'ting!", "ru": "Двигайся влево или вправо, чтобы избежать препятствий!", "en": "Swipe left or right to dodge obstacles!" },
      "number-path":    { "uz": "1 dan boshlab raqamlarni tartibda ulang!", "ru": "Соединяй числа по порядку начиная с 1!", "en": "Connect numbers in order starting from 1!" },
      "puzzle-slide":   { "uz": "Qismlarni suring va rasmni to'g'rilang!", "ru": "Двигай части картинки, чтобы собрать её!", "en": "Slide the pieces to complete the picture!" },
      "clock-match":    { "uz": "Soat millarini ko'rib to'g'ri vaqtni tanlang!", "ru": "Посмотри на стрелки и выбери правильное время!", "en": "Read the clock hands and choose the correct time!" }
    }
```

- [ ] **Step 2: Verify the JS is valid** — open DevTools console in browser or check no syntax error by viewing the page. Look for `Uncaught SyntaxError`.

- [ ] **Step 3: Commit**

```
git add app/src/main/assets/www/script.js
git commit -m "feat: add family mode and how-to-play translations"
```

---

## Task 2: Create family-mode.js

**Files:**
- Create: `app/src/main/assets/www/family-mode.js`

- [ ] **Step 1: Create the file with this complete content**

```js
(() => {
  "use strict";

  const STORAGE_PIN      = 'gz-family-pin';
  const STORAGE_SETTINGS = 'gz-family-settings';
  const STORAGE_SESSION  = 'gz-family-session';

  let state = {
    active: false,
    settings: { timeLimit: 20, mode: 'turns', kidsOnly: true },
    session: { startTime: null, parentScore: 0, childScore: 0, currentTurn: 'child' },
    lockoutUntil: 0,
    wrongAttempts: 0
  };

  /* ── helpers ─────────────────────────────────────────────────────── */
  function ft(key) {
    const lang = localStorage.getItem('gz-lang') || 'uz';
    const base = window.TRANSLATIONS_DATA?.family;
    return (base?.[lang] || base?.uz || {})[key] || key;
  }

  function hashPin(pin) {
    let h = 5381;
    for (let i = 0; i < pin.length; i++) h = ((h << 5) + h) ^ pin.charCodeAt(i);
    return 'gz' + (h >>> 0).toString(36);
  }

  function getStoredPin()  { return localStorage.getItem(STORAGE_PIN); }
  function savePin(pin)    { localStorage.setItem(STORAGE_PIN, hashPin(pin)); }
  function checkPin(pin)   { return hashPin(pin) === getStoredPin(); }

  function loadSettings() {
    try { Object.assign(state.settings, JSON.parse(localStorage.getItem(STORAGE_SETTINGS))); } catch(_) {}
  }
  function saveSettings() { localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(state.settings)); }
  function saveSession()  { localStorage.setItem(STORAGE_SESSION, JSON.stringify(state.session)); }

  function timeElapsed()   { return state.session.startTime ? Math.floor((Date.now() - state.session.startTime) / 60000) : 0; }
  function timeRemaining() { return state.settings.timeLimit === 0 ? Infinity : Math.max(0, state.settings.timeLimit - timeElapsed()); }

  /* ── modal shell ─────────────────────────────────────────────────── */
  function showModal(html) {
    let ov = document.getElementById('fm-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'fm-overlay';
      ov.style.cssText = 'position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);';
      document.body.appendChild(ov);
    }
    ov.innerHTML = html;
    ov.style.display = 'flex';
  }
  function hideModal() {
    const ov = document.getElementById('fm-overlay');
    if (ov) ov.style.display = 'none';
  }

  /* ── card wrapper ────────────────────────────────────────────────── */
  function card(content) {
    return `<div style="background:linear-gradient(135deg,#1e1b4b,#0f172a);border:1px solid rgba(255,255,255,0.12);border-radius:28px;padding:28px;width:90%;max-width:330px;max-height:92vh;overflow-y:auto;">${content}</div>`;
  }

  /* ── PIN screen ──────────────────────────────────────────────────── */
  function showPinScreen(mode) {
    window._fmPinBuffer = '';
    window._fmPinMode   = mode;
    const title = mode === 'set' ? ft('setPin') : ft('enterPin');
    showModal(card(`
      <div style="text-align:center;">
        <div style="font-size:44px;margin-bottom:12px;">🔐</div>
        <h2 style="color:white;font-size:19px;margin-bottom:6px;">${title}</h2>
        <p style="color:rgba(255,255,255,0.45);font-size:13px;margin-bottom:22px;">${ft('pinHint')}</p>
        <div id="fm-dots" style="display:flex;justify-content:center;gap:14px;margin-bottom:10px;">
          ${[0,1,2,3].map(i=>`<div id="fm-d${i}" style="width:18px;height:18px;border-radius:50%;border:2px solid rgba(255,255,255,0.25);transition:.2s;"></div>`).join('')}
        </div>
        <div id="fm-err" style="color:#ef4444;font-size:13px;min-height:18px;margin-bottom:12px;"></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:210px;margin:0 auto;">
          ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(n=>`
            <button onclick="FamilyMode.pt('${n}')" style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:14px;color:white;font-size:22px;font-weight:900;padding:15px 0;cursor:pointer;${n===''?'visibility:hidden;':''}">${n}</button>
          `).join('')}
        </div>
        <button onclick="FamilyMode.cancel()" style="background:none;border:none;color:rgba(255,255,255,0.35);font-size:13px;margin-top:18px;cursor:pointer;">✕ ${ft('exit')}</button>
      </div>
    `));
  }

  function pt(val) {
    if (val === '') return;
    if (Date.now() < state.lockoutUntil) {
      const s = Math.ceil((state.lockoutUntil - Date.now()) / 1000);
      const e = document.getElementById('fm-err');
      if (e) e.textContent = ft('lockout') + ' ' + s + 's';
      return;
    }
    if (val === '⌫') { window._fmPinBuffer = window._fmPinBuffer.slice(0,-1); }
    else if (window._fmPinBuffer.length < 4) { window._fmPinBuffer += val; }
    updateDots();
    if (window._fmPinBuffer.length === 4) setTimeout(() => handlePin(window._fmPinMode), 200);
  }

  function updateDots() {
    for (let i = 0; i < 4; i++) {
      const d = document.getElementById('fm-d'+i);
      if (!d) return;
      const filled = i < window._fmPinBuffer.length;
      d.style.background    = filled ? '#6366f1' : 'transparent';
      d.style.borderColor   = filled ? '#6366f1' : 'rgba(255,255,255,0.25)';
    }
  }

  function handlePin(mode) {
    const pin = window._fmPinBuffer;
    if (mode === 'set') { savePin(pin); showSettingsScreen(); return; }
    if (checkPin(pin)) { state.wrongAttempts = 0; showSettingsScreen(); }
    else {
      state.wrongAttempts++;
      if (state.wrongAttempts >= 3) { state.lockoutUntil = Date.now() + 30000; state.wrongAttempts = 0; }
      window._fmPinBuffer = '';
      updateDots();
      const e = document.getElementById('fm-err');
      if (e) e.textContent = ft('wrongPin');
    }
  }

  /* ── Settings screen ─────────────────────────────────────────────── */
  function showSettingsScreen() {
    const s = state.settings;
    const tls  = [[10,ft('min10')],[20,ft('min20')],[30,ft('min30')],[0,ft('unlimited')]];
    const modes = [['child',ft('modeChild')],['parent',ft('modeParent')],['turns',ft('modeTurns')]];
    showModal(card(`
      <div style="text-align:center;margin-bottom:18px;">
        <div style="font-size:36px;">🏠</div>
        <h2 style="color:white;font-size:18px;margin-top:8px;">${ft('title')}</h2>
      </div>
      <p style="color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${ft('timeLimitLabel')}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:16px;">
        ${tls.map(([v,l])=>`<button onclick="FamilyMode.setTL(${v})" style="padding:11px;border-radius:13px;border:2px solid ${s.timeLimit===v?'#6366f1':'rgba(255,255,255,0.1)'};background:${s.timeLimit===v?'rgba(99,102,241,0.25)':'rgba(255,255,255,0.04)'};color:white;font-size:13px;font-weight:bold;cursor:pointer;">${l}</button>`).join('')}
      </div>
      <p style="color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${ft('modeLabel')}</p>
      <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:16px;">
        ${modes.map(([v,l])=>`<button onclick="FamilyMode.setMode('${v}')" style="padding:13px;border-radius:13px;border:2px solid ${s.mode===v?'#6366f1':'rgba(255,255,255,0.1)'};background:${s.mode===v?'rgba(99,102,241,0.25)':'rgba(255,255,255,0.04)'};color:white;font-size:14px;font-weight:bold;cursor:pointer;">${l}</button>`).join('')}
      </div>
      <button onclick="FamilyMode.toggleKids()" style="width:100%;padding:13px;border-radius:13px;border:2px solid ${s.kidsOnly?'#10b981':'rgba(255,255,255,0.1)'};background:${s.kidsOnly?'rgba(16,185,129,0.2)':'rgba(255,255,255,0.04)'};color:white;font-size:13px;font-weight:bold;cursor:pointer;margin-bottom:18px;">👶 ${ft('kidsOnly')} ${s.kidsOnly?'✓':''}</button>
      <button onclick="FamilyMode.begin()" style="width:100%;padding:17px;border-radius:18px;border:none;background:linear-gradient(135deg,#6366f1,#a855f7);color:white;font-size:17px;font-weight:900;cursor:pointer;box-shadow:0 8px 20px rgba(99,102,241,0.35);">${ft('start')} 🚀</button>
      <button onclick="FamilyMode.cancel()" style="width:100%;padding:11px;border:none;background:none;color:rgba(255,255,255,0.35);font-size:13px;margin-top:8px;cursor:pointer;">✕ ${ft('exit')}</button>
    `));
  }

  /* ── Turn screen ─────────────────────────────────────────────────── */
  function showTurnScreen(score) {
    if (state.settings.mode === 'turns') {
      if (state.session.currentTurn === 'parent') state.session.parentScore += score;
      else state.session.childScore += score;
    } else if (state.settings.mode === 'parent') {
      state.session.parentScore += score;
    } else {
      state.session.childScore += score;
    }
    saveSession();

    if (state.settings.timeLimit > 0 && timeElapsed() >= state.settings.timeLimit) {
      showEndScreen(); return;
    }
    if (state.settings.mode !== 'turns') { hideModal(); return; }

    state.session.currentTurn = state.session.currentTurn === 'parent' ? 'child' : 'parent';
    saveSession();

    const nextLabel = state.session.currentTurn === 'parent' ? ft('parentTurn') : ft('childTurn');
    const ps = state.session.parentScore, cs = state.session.childScore;
    const rem = state.settings.timeLimit > 0 ? `<div style="color:rgba(255,255,255,0.35);font-size:12px;margin-bottom:14px;">⏱ ${ft('timeLeft')} ${timeRemaining()} min</div>` : '';

    showModal(card(`
      <div style="background:rgba(255,255,255,0.05);border-radius:18px;padding:16px 20px;display:flex;justify-content:space-between;margin-bottom:18px;">
        <div style="text-align:center;">
          <div style="color:rgba(255,255,255,0.45);font-size:11px;">🏆 ${ft('parentScore')}</div>
          <div style="color:white;font-size:30px;font-weight:900;">${ps}</div>
        </div>
        <div style="width:1px;background:rgba(255,255,255,0.1);"></div>
        <div style="text-align:center;">
          <div style="color:rgba(255,255,255,0.45);font-size:11px;">👶 ${ft('childScore')}</div>
          <div style="color:white;font-size:30px;font-weight:900;">${cs}</div>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:20px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:6px;">${ft('nextPlayer')}</div>
        <div style="color:white;font-size:22px;font-weight:900;">${nextLabel}</div>
      </div>
      ${rem}
      <div style="display:flex;gap:10px;">
        <button onclick="FamilyMode.stop()" style="flex:1;padding:14px;border-radius:14px;border:none;background:rgba(255,255,255,0.08);color:white;font-size:13px;font-weight:bold;cursor:pointer;">${ft('stop')}</button>
        <button onclick="FamilyMode.go()" style="flex:2;padding:14px;border-radius:14px;border:none;background:linear-gradient(135deg,#6366f1,#a855f7);color:white;font-size:14px;font-weight:900;cursor:pointer;">${ft('continue')} →</button>
      </div>
    `));
  }

  /* ── Session End screen ──────────────────────────────────────────── */
  function showEndScreen() {
    const ps = state.session.parentScore, cs = state.session.childScore;
    const pw = ps >= cs;
    showModal(card(`
      <div style="text-align:center;">
        <div style="font-size:56px;margin-bottom:12px;">⏰</div>
        <h2 style="color:white;font-size:21px;margin-bottom:22px;">${ft('sessionEnd')}</h2>
        <div style="background:rgba(255,255,255,0.05);border-radius:18px;padding:18px 22px;display:flex;justify-content:space-between;margin-bottom:22px;">
          <div style="text-align:center;">
            <div style="color:rgba(255,255,255,0.45);font-size:11px;">🏆 ${ft('parentScore')}</div>
            <div style="color:${pw?'#fbbf24':'white'};font-size:34px;font-weight:900;">${ps}${pw?' 🥇':''}</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,0.1);"></div>
          <div style="text-align:center;">
            <div style="color:rgba(255,255,255,0.45);font-size:11px;">👶 ${ft('childScore')}</div>
            <div style="color:${!pw?'#fbbf24':'white'};font-size:34px;font-weight:900;">${cs}${!pw?' 🥇':''}</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;">
          <button onclick="FamilyMode.exitSession()" style="flex:1;padding:14px;border-radius:14px;border:none;background:rgba(255,255,255,0.08);color:white;font-size:13px;font-weight:bold;cursor:pointer;">${ft('exit')}</button>
          <button onclick="FamilyMode.again()" style="flex:2;padding:14px;border-radius:14px;border:none;background:linear-gradient(135deg,#6366f1,#a855f7);color:white;font-size:14px;font-weight:900;cursor:pointer;">${ft('playAgain')} 🎮</button>
        </div>
      </div>
    `));
    state.active = false;
    updateBtn();
  }

  /* ── Public actions ──────────────────────────────────────────────── */
  function open() {
    loadSettings();
    getStoredPin() ? showPinScreen('enter') : showPinScreen('set');
  }
  function cancel()      { hideModal(); }
  function setTL(v)      { state.settings.timeLimit = v; saveSettings(); showSettingsScreen(); }
  function setMode(v)    { state.settings.mode = v; saveSettings(); showSettingsScreen(); }
  function toggleKids()  { state.settings.kidsOnly = !state.settings.kidsOnly; saveSettings(); showSettingsScreen(); }

  function begin() {
    state.session = { startTime: Date.now(), parentScore: 0, childScore: 0, currentTurn: 'child' };
    state.active = true;
    saveSession();
    hideModal();
    updateBtn();
    if (state.settings.kidsOnly && window.fil) window.fil('kids');
  }

  function go()          { hideModal(); }
  function stop()        { showEndScreen(); }
  function again() {
    state.session = { startTime: Date.now(), parentScore: 0, childScore: 0, currentTurn: 'child' };
    state.active = true;
    saveSession();
    hideModal();
    updateBtn();
  }
  function exitSession() {
    state.active = false;
    state.session = { startTime: null, parentScore: 0, childScore: 0, currentTurn: 'child' };
    localStorage.removeItem(STORAGE_SESSION);
    hideModal();
    updateBtn();
    if (window.fil) window.fil('all');
  }

  function updateBtn() {
    const b = document.getElementById('fm-btn');
    if (!b) return;
    b.style.background = state.active ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'rgba(255,255,255,0.08)';
    b.style.borderColor = state.active ? '#6366f1' : 'rgba(255,255,255,0.15)';
    b.style.color = 'white';
  }

  /* ── Score listener ──────────────────────────────────────────────── */
  window.addEventListener('message', (e) => {
    if (!state.active) return;
    if (e.data?.type === 'game:score') {
      const score = parseInt(e.data.score, 10) || 0;
      setTimeout(() => showTurnScreen(score), 600);
    }
  });

  loadSettings();

  window.FamilyMode = { open, cancel, pt, setTL, setMode, toggleKids, begin, go, stop, again, exitSession };
})();
```

- [ ] **Step 2: Commit**

```
git add app/src/main/assets/www/family-mode.js
git commit -m "feat: create family-mode.js with PIN, settings, turn, and session-end screens"
```

---

## Task 3: Update index.html — Family Mode button + Instructions modal + CSS fixes + script tags

**Files:**
- Modify: `app/src/main/assets/www/index.html`

This task makes 4 targeted edits to index.html.

- [ ] **Step 1: Add missing CSS classes** — find `.gc-tg { ... }` and add after it:

```css
.gc-meta { display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:4px; }
.gc-ds   { font-size:10px; color:var(--txt2); flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.gc-best { font-size:10px; color:#FACC15; margin-top:4px; }
```

- [ ] **Step 2: Add How-To-Play modal CSS** — find `#toast { ... }` and add before it:

```css
#info-modal { position:fixed;inset:0;z-index:250;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:.25s; }
#info-modal.show { opacity:1;pointer-events:auto; }
.info-sheet { background:linear-gradient(135deg,#1e1b4b,#0f172a);border:1px solid rgba(255,255,255,0.1);border-radius:28px 28px 0 0;padding:28px 24px 40px;width:100%;max-width:500px; }
.info-emoji { font-size:52px;text-align:center;margin-bottom:12px; }
.info-title { font-size:18px;font-weight:900;color:white;text-align:center;margin-bottom:10px; }
.info-desc  { font-size:15px;color:rgba(255,255,255,0.75);text-align:center;line-height:1.6;margin-bottom:22px; }
.info-play  { width:100%;padding:16px;border-radius:18px;border:none;background:linear-gradient(135deg,#6366f1,#a855f7);color:white;font-size:17px;font-weight:900;cursor:pointer; }
```

- [ ] **Step 3: Add Family Mode button to header** — find `<div id="pts">` and add before it:

```html
<button id="fm-btn" onclick="FamilyMode.open()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;color:white;font-size:13px;font-weight:bold;padding:7px 11px;cursor:pointer;margin-right:8px;">🏠</button>
```

- [ ] **Step 4: Add How-To-Play button in game header** — find `<div id="gs-title">` and add after it:

```html
<button id="gs-info-btn" onclick="showInfoModal()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:white;font-size:13px;padding:5px 10px;cursor:pointer;">❓</button>
```

- [ ] **Step 5: Add info modal HTML** — find `<!-- EXIT MODAL -->` and add before it:

```html
<!-- HOW TO PLAY MODAL -->
<div id="info-modal">
  <div class="info-sheet">
    <div class="info-emoji" id="info-emoji">🎮</div>
    <div class="info-title" id="info-title"></div>
    <div class="info-desc"  id="info-desc"></div>
    <button class="info-play" onclick="closeInfoModal()">▶ O'ynash / Играть / Play</button>
  </div>
</div>
```

- [ ] **Step 6: Add script tags** — find `<script src="script.js"></script>` and add after it:

```html
<script src="family-mode.js"></script>
```

- [ ] **Step 7: Commit**

```
git add app/src/main/assets/www/index.html
git commit -m "feat: add family mode button, how-to-play modal, and fix CSS classes"
```

---

## Task 4: Wire info modal logic into script.js

**Files:**
- Modify: `app/src/main/assets/www/script.js`

- [ ] **Step 1: Add `showInfoModal` and `closeInfoModal` to script.js** — find `function showToast(m)` and add before it:

```js
  function showInfoModal() {
    if (!currentGameId) return;
    const game = GAMES.find(g => g.id === currentGameId);
    if (!game) return;
    const howTo = (translations.howToPlay || {})[currentGameId];
    const { title } = gameText(currentGameId);
    const modal = byId('info-modal');
    if (!modal) return;
    byId('info-emoji').textContent = game.em;
    byId('info-title').textContent = title;
    byId('info-desc').textContent  = howTo?.[lang] || howTo?.uz || '';
    modal.classList.add('show');
  }

  function closeInfoModal() {
    byId('info-modal')?.classList.remove('show');
  }

  window.showInfoModal  = showInfoModal;
  window.closeInfoModal = closeInfoModal;
```

- [ ] **Step 2: Expose `fil` to window so family-mode.js can call it** — find `function fil(f)` and add at its end (inside the function, after `buildGrid(f);`):

Actually, add this line right after the `function fil(f) { ... }` closing brace:

```js
  window.fil = fil;
```

- [ ] **Step 3: Commit**

```
git add app/src/main/assets/www/script.js
git commit -m "feat: wire how-to-play modal and expose fil() for family mode"
```

---

## Task 5: Bug fixes

**Files:**
- Modify: `app/src/main/assets/www/animals.html`
- Modify: `app/src/main/assets/www/index.html` (game loading overlay hide on load)

- [ ] **Step 1: Fix animals.html hardcoded start button** — find:

```html
  <button class="btn-main" onclick="start()">BOSHLASH</button>
```

Replace with:

```html
  <button class="btn-main" onclick="start()" id="b-start">BOSHLASH</button>
```

Then in the JS of animals.html, find the `start()` function or init section and add i18n setup (look for where score label is set). Add at the top of the script:

```js
const I18N = {
  uz: { bStart: "BOSHLASH", desc: "Hayvonlarni va ularning ovozlarini toping!" },
  ru: { bStart: "НАЧАТЬ",   desc: "Найди животных по их звукам!" },
  en: { bStart: "START",    desc: "Find animals by their sounds!" }
};
```

Then after `GameAPI._init?.()` or at document ready, add:
```js
const t = key => (I18N[GameAPI.lang] || I18N.uz)[key];
document.getElementById('b-start').textContent = t('bStart');
document.getElementById('d-start').textContent = t('desc');
```

- [ ] **Step 2: Fix game loading overlay — hide it when iframe finishes loading** — in `script.js` find `els.gsFrame.src = ...` in `openGame()`. The overlay hides via the iframe's `onload`. Find where gsFrame is referenced and add:

In `bindDom()`, add:
```js
    els.gsFrame.onload = () => {
      if (els.gameLoadingOverlay) els.gameLoadingOverlay.classList.add('hidden');
    };
```

- [ ] **Step 3: Commit**

```
git add app/src/main/assets/www/animals.html app/src/main/assets/www/script.js
git commit -m "fix: animals i18n, game loading overlay on iframe load"
```

---

## Task 6: Verify on device

- [ ] **Step 1: Build the app** — In Android Studio: `Build → Clean Project`, then `Build → Rebuild Project`
- [ ] **Step 2: Run on connected tablet** — Click ▶ Run (Shift+F10). Wait for it to deploy.
- [ ] **Step 3: Test Family Mode**
  - Tap the 🏠 button in header → PIN setup should appear
  - Set PIN (e.g. 1234) → Settings screen appears
  - Choose 10 min, Turns mode → tap Start
  - Open any game, play to end → Turn screen should appear with scores
- [ ] **Step 4: Test How To Play**
  - Open any game → tap ❓ button in top bar → instructions sheet appears
  - Tap "Play" button → sheet closes
- [ ] **Step 5: Test each kids game** (animals, math-kids, clock-match, colors-shapes, memory-game, shape-match, word-sprint, number-path, pattern-trace, melody-memory)
  - Verify it loads, plays, and score is reported correctly
- [ ] **Step 6: Final commit if any hotfixes applied**

```
git add .
git commit -m "fix: post-device testing hotfixes"
```
