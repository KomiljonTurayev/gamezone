# Leaderboard Tab — Design Spec
**Date:** 2026-05-06  
**Status:** Approved  
**Scope:** GameZoneApp — Local per-device leaderboard with best score + 10-session history per game

---

## Summary

Add a dedicated 🏆 Leaderboard tab to the bottom nav bar. It shows only games the user has actually played, ranked by best score. Each game entry displays an all-time best badge and a collapsible history of up to 10 past sessions with scores and timestamps. All data is stored locally in `localStorage`; no backend required.

---

## Architecture

### New file: `leaderboard.js`

An IIFE exposing `window.Leaderboard`, mirroring the `family-mode.js` pattern.

Responsibilities:
- Listen to `game:score` postMessages from game iframes and persist each session
- Render the leaderboard panel on demand
- Handle expand/collapse of session history rows
- Handle clear-all action

### Modified files

| File | Change |
|------|--------|
| `leaderboard.js` | New module — storage, score capture, rendering |
| `index.html` | Add `#lb-panel` div, 🏆 nav tab button, `<script src="leaderboard.js">` |
| `script.js` | Add `"leaderboard"` translations key, update `applyTranslations()` for nav label, update `fil()` to hide `#lb-panel` when switching away |

No changes to any of the 23 game HTML files.

---

## Data Flow

```
Game iframe
  → GameAPI.reportScore(id, score)
    → postMessage({ type:'game:score', id, score })
      → leaderboard.js listener (on window)
        → reads gz-history-{id} from localStorage
        → prepends { score, ts: Date.now() }
        → trims to 10 entries
        → writes back to localStorage
```

`game:score` is already posted by every game via the existing `GameAPI`. No game files need modification.

### Storage keys

| Key | Type | Description |
|-----|------|-------------|
| `gz-best-{gameId}` | string (int) | All-time best score — already written by games |
| `gz-history-{gameId}` | JSON string | Array of `{score: number, ts: number}`, max 10, newest first |

---

## UI

### Nav tab

A 6th button added to `#bnav` in `index.html`:

```html
<button class="ni" onclick="showLeaderboard()" id="ni-lb">
  <span class="ni-i">🏆</span>
  <span class="ni-l" id="nb5">Natijalar</span>
</button>
```

`showLeaderboard()` is exposed on `window` by `leaderboard.js`. It:
1. Removes `on` from all `.ni` buttons, adds `on` to `#ni-lb`
2. Hides `#grid` (the game card grid)
3. Calls `Leaderboard.render()` which populates and shows `#lb-panel`

Switching to any other tab (via `fil()`) hides `#lb-panel` and shows `#grid`.

### Leaderboard panel (`#lb-panel`)

Hidden by default via `display:none`. Shown exclusively when the leaderboard tab is active.

**Empty state** (no games played yet):
```
🏆
Hali o'yin o'ynalmagan
```

**Populated state** (games with best > 0, sorted highest-first):
```
┌─────────────────────────────────────────┐
│  🏆 Natijalar              [Tozalash]   │
│  3 ta o'yin o'ynalgan                   │
├─────────────────────────────────────────┤
│  🫧  Bubble Blast Pro                   │
│      🥇 Rekord: 1240          [∨]       │
│      ├ 1240  —  06-may 14:32            │
│      ├  980  —  05-may 11:10            │
│      └  750  —  04-may 09:44            │
├─────────────────────────────────────────┤
│  ⭐  Star Flight Elite                  │
│      🥇 Rekord: 870           [›]       │
│      (history collapsed)                │
└─────────────────────────────────────────┘
```

**Game row structure:**
- Left: game emoji + localized game name (from `window.TRANSLATIONS_DATA.games[id].title[lang]`)
- Right: best score badge + expand/collapse chevron (`›` collapsed, `∨` expanded)
- Expanded: up to 10 session rows showing `score — dd-mmm HH:MM`, newest first

**Tozalash (Clear) button:**
- Shown in the panel header
- On tap: shows a confirmation via `window.confirm()` (native Android dialog)
- On confirm: deletes all `gz-history-{id}` keys for every game in `GAMES`, re-renders panel

---

## Translations

New `"leaderboard"` key added to `TRANSLATIONS_DATA` in `script.js`:

```js
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
```

`applyTranslations()` in `script.js` gains one line to update `#nb5` with `lt().nb` (where `lt()` returns the leaderboard translations for the current language).

---

## `leaderboard.js` Public API

```js
window.Leaderboard = {
  render()   // Populates and shows #lb-panel
  hide()     // Hides #lb-panel
  record(id, score)  // Called internally by message listener; also callable from tests
}
```

`showLeaderboard()` is additionally exposed directly on `window` for use in the `onclick` attribute of the nav button.

---

## Edge Cases

| Case | Behaviour |
|------|-----------|
| Game with `best = 0` | Not shown in leaderboard |
| History array missing for a game with `best > 0` | Shows best score row, empty history section |
| `TRANSLATIONS_DATA` not yet loaded when `leaderboard.js` runs | `render()` is called lazily on tab open, not at script load — safe |
| Language switch while leaderboard tab is open | `applyTranslations()` calls `Leaderboard.render()` if `#lb-panel` is visible, re-rendering with new language |
| Clear on empty leaderboard | Button still works, panel shows empty state after clear |

---

## Out of Scope

- Online/global leaderboard (no backend)
- Per-game score pagination beyond 10 sessions
- Score deletion for individual sessions
- Leaderboard within Family Mode turn screen
