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
    state.lockoutUntil = parseInt(localStorage.getItem('gz-family-lockout') || '0', 10);
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
    if (checkPin(pin)) {
      state.wrongAttempts = 0;
      state.lockoutUntil = 0;
      localStorage.removeItem('gz-family-lockout');
      showSettingsScreen();
    }
    else {
      state.wrongAttempts++;
      if (state.wrongAttempts >= 3) {
        state.lockoutUntil = Date.now() + 30000;
        localStorage.setItem('gz-family-lockout', state.lockoutUntil);
        state.wrongAttempts = 0;
      }
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
    if (!state.active) return;
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
    if (state.settings.kidsOnly && window.fil) window.fil('kids');
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
  let scorePending = false;
  window.addEventListener('message', (e) => {
    if (!state.active || scorePending) return;
    if (e.data?.type === 'game:score') {
      const score = parseInt(e.data.score, 10) || 0;
      scorePending = true;
      setTimeout(() => { scorePending = false; showTurnScreen(score); }, 600);
    }
  });

  loadSettings();

  window.FamilyMode = { open, cancel, pt, setTL, setMode, toggleKids, begin, go, stop, again, exitSession };
})();
