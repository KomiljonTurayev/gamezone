(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const hg = parseInt(params.get("hg") || "2", 10);
  const lang = (params.get("lang") || "en").toLowerCase();
  const group = [1, 2, 3].includes(hg) ? hg : 2;

  const ROOT = document.getElementById("app");
  const scoreEl = document.getElementById("score");
  const timerEl = document.getElementById("timer");
  const targetEl = document.getElementById("target");
  const statusEl = document.getElementById("status");
  const startBtn = document.getElementById("startBtn");

  const cfg = window.MINI_GAME_CONFIG;
  if (!cfg) return;

  const pace = group === 3 ? 0.72 : group === 2 ? 0.88 : 1;
  const duration = Math.round((cfg.duration || 30) / pace);

  let score = 0;
  let left = duration;
  let run = false;
  let x = 50;
  let y = 50;
  let timerId = null;

  function txt(obj) {
    return obj[lang] || obj.uz || obj.en || "";
  }

  function moveTarget() {
    const jitter = (group === 3 ? 22 : 34) * pace;
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
    statusEl.textContent = `${txt(cfg.done)} ${score}`;
    startBtn.textContent = txt(cfg.playAgain);
    startBtn.disabled = false;
    window.parent?.__gameEnd?.();
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
    statusEl.textContent = txt(cfg.hint);
    startBtn.disabled = true;
    moveTarget();
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
  }

  function onTap() {
    if (!run) return;
    const gain = group === 3 ? 2 : 1;
    score += gain;
    scoreEl.textContent = String(score);
    moveTarget();
  }

  function dispose() {
    run = false;
    clearInterval(timerId);
    timerId = null;
    targetEl.removeEventListener("click", onTap);
    startBtn.removeEventListener("click", startGame);
    window.removeEventListener("message", onMessage);
  }

  function onMessage(ev) {
    if (ev.data?.type === "game:dispose") {
      dispose();
    }
  }

  document.title = txt(cfg.title);
  document.getElementById("title").textContent = `${cfg.icon} ${txt(cfg.title)}`;
  document.getElementById("hint").textContent = txt(cfg.hint);
  document.getElementById("badge").textContent = `${txt(cfg.groupLabel)} ${group}`;
  startBtn.textContent = txt(cfg.start);
  startBtn.addEventListener("click", startGame);
  targetEl.addEventListener("click", onTap, { passive: true });
  window.addEventListener("message", onMessage);

  if (group === 3) {
    ROOT.classList.add("low-stress");
    targetEl.style.transitionDuration = "300ms";
  }
})();

