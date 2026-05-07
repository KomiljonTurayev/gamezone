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
    const achPanel = document.getElementById("ach-panel");
    if (achPanel) achPanel.style.display = "none";
    render();
  };

  window.Leaderboard = { render, hide, toggle, clearAll, record };
})();
