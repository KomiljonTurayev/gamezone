/**
 * Mini Game Core Engine
 * Used for simple tap/reaction games.
 */
(() => {
  "use strict";

  // Wait for GameAPI to load
  if (!window.GameAPI) {
    console.error("GameAPI not found. Ensure game-api.js is loaded before mini-game-core.js");
    return;
  }

  const cfg = window.MINI_GAME_CONFIG;
  if (!cfg) return;

  const GAME_ID = cfg.id || "generic-game";
  const ROOT = document.getElementById("app");
  const scoreEl = document.getElementById("score");
  const timerEl = document.getElementById("timer");
  const targetEl = document.getElementById("target");
  const statusEl = document.getElementById("status");
  const startBtn = document.getElementById("startBtn");

  const pace = GameAPI.profile.speed;
  const duration = Math.round((cfg.duration || 30) * GameAPI.profile.timer);

  let score = 0;
  let left = duration;
  let run = false;
  let x = 50;
  let y = 50;
  let timerId = null;

  function txt(key) {
    return cfg[key]?.[GameAPI.lang] || cfg[key]?.en || "";
  }

  function moveTarget() {
    const jitter = (GameAPI.healthGroup === 3 ? 22 : 34) * pace;
    x = Math.max(10, Math.min(90, x + (Math.random() * jitter - jitter / 2)));
    y = Math.max(12, Math.min(88, y + (Math.random() * jitter - jitter / 2)));
    targetEl.style.left = `${x}%`;
    targetEl.style.top = `${y}%`;
    targetEl.style.transform = "translate(-50%, -50%)";
  }

  function endGame() {
    run = false;
    clearInterval(timerId);
    timerId = null;
    statusEl.textContent = `${txt('done')} ${score}`;
    startBtn.textContent = txt('playAgain');
    startBtn.disabled = false;

    GameAPI.reportScore(GAME_ID, score);
    GameAPI.saveBestScore(GAME_ID, score);
    GameAPI.endGame();
  }

  function tick() {
    if (!run) return;
    left -= 1;
    timerEl.textContent = String(left);
    if (left <= 0) {
      endGame();
    }
  }

  function startGame() {
    score = 0;
    left = duration;
    run = true;
    scoreEl.textContent = "0";
    timerEl.textContent = String(left);
    statusEl.textContent = txt('hint');
    startBtn.disabled = true;
    moveTarget();
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
  }

  function onTap() {
    if (!run) return;
    const gain = GameAPI.healthGroup === 3 ? 2 : 1;
    score += gain;
    scoreEl.textContent = String(score);
    
    // Innovation: Haptic and Visual feedback
    GameAPI.vibrate(40);
    
    targetEl.animate([
      { transform: "translate(-50%, -50%) scale(1)" },
      { transform: "translate(-50%, -50%) scale(1.3)" },
      { transform: "translate(-50%, -50%) scale(1)" }
    ], { duration: 150 });

    // Debounce target move slightly to let animation breathe
    requestAnimationFrame(() => moveTarget());
  }

  function dispose() {
    run = false;
    clearInterval(timerId);
    timerId = null;
    if (targetEl) targetEl.removeEventListener("click", onTap);
    if (startBtn) startBtn.removeEventListener("click", startGame);
    console.log(`[${GAME_ID}] Core Engine disposed`);
  }

  window.addEventListener('gameDispose', dispose);

  document.title = txt('title');
  document.getElementById("title").textContent = `${cfg.icon} ${txt('title')}`;
  document.getElementById("hint").textContent = txt('hint');

  const groupLabels = { uz: "Guruh", ru: "Группа", en: "Group" };
  document.getElementById("badge").textContent = `${groupLabels[GameAPI.lang] || "Group"} ${GameAPI.healthGroup}`;

  startBtn.textContent = txt('start');
  startBtn.addEventListener("click", startGame);
  targetEl.addEventListener("click", onTap, { passive: true });

  if (GameAPI.healthGroup === 3) {
    ROOT.classList.add("low-stress");
    targetEl.style.transitionDuration = "300ms";
  }
})();
