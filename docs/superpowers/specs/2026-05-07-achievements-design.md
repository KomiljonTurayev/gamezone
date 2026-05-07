# Achievements / Badges System — Design Spec
**Date:** 2026-05-07
**Status:** Approved
**Scope:** GameZoneApp — Fixed list of 25 one-time achievements unlocked by score milestones and play-count milestones, with a dedicated tab and toast notifications

---

## Summary

Add a dedicated 🏅 Achievements tab to the bottom nav bar. A fixed list of 25 achievements unlock silently in the background as the player hits score and play-count milestones. When an achievement unlocks, a toast notification slides up from the bottom for 3 seconds. The achievements panel shows all 25 entries grouped by category — unlocked ones in full color, locked ones greyed out with a 🔒. All state stored locally in `localStorage`; no backend required.

---

## Architecture

### New file: `achievements.js`

An IIFE exposing `window.Achievements`, mirroring the `leaderboard.js` pattern exactly.

Responsibilities:
- Hold the fixed `ACHIEVEMENTS` list with inline condition functions
- Listen to `game:score` postMessages from game iframes
- On each score event: compute stats from existing localStorage keys, check all 25 conditions, save newly unlocked IDs, show a queued toast for each
- Render the achievements panel on demand
- Expose `window.showAchievements()` for the nav button onclick

### Modified files

| File | Change |
|------|--------|
| `achievements.js` | New module — achievement list, condition checking, toast, rendering |
| `index.html` | Add `#ach-panel` div, 🏅 nav tab button, achievement CSS, `<script src="achievements.js">` |
| `script.js` | Add `"achievements"` translation key, update `fil()` to hide `#ach-panel`, update `applyTranslations()` for `#nb6` nav label |

No changes to any game HTML files. No changes to `leaderboard.js`.

---

## Data Flow

```
Game iframe
  → GameAPI.reportScore(id, score)
    → postMessage({ type: 'game:score', id, score })
      → achievements.js message listener (on window)
        → computeStats() reads gz-best-{id} and gz-history-{id} for all games
        → checks all 25 achievement conditions
        → finds newly unlocked (not yet in gz-unlocked)
        → saves updated gz-unlocked array to localStorage
        → queues a toast for each newly unlocked achievement
```

`game:score` is already posted by every game via the existing `GameAPI`. No game files need modification. The leaderboard listener and the achievements listener both receive the same event independently — this is harmless.

### Storage keys

| Key | Type | Description |
|-----|------|-------------|
| `gz-unlocked` | JSON string | Array of unlocked achievement IDs, e.g. `["first-game","sessions-10"]` — the only new key |
| `gz-best-{gameId}` | string (int) | All-time best score — already written by games, read-only here |
| `gz-history-{gameId}` | JSON string | Session history array — already written by leaderboard.js, read-only here |

### `computeStats()` — derived from existing keys

```js
stats = {
  uniqueGames:    number,   // count of games with history.length > 0
  totalSessions:  number,   // sum of all gz-history-{id} array lengths
  arcadeSessions: number,   // totalSessions for games with cat includes "arcade"
  relaxSessions:  number,   // totalSessions for games with cat includes "relax"
  kidsSessions:   number,   // totalSessions for games with cat includes "kids"
  sessionsByGame: { [gameId]: number },  // per-game session count
  bestByGame:     { [gameId]: number },  // gz-best-{id} values
}
```

No new per-game writes. Everything derives from keys leaderboard.js already maintains.

---

## Achievement List

25 fixed achievements across five sections. Each carries its own `title` and `desc` in uz/ru/en inline in `achievements.js` — no separate translation object needed for per-achievement text.

### Explorer — unique games played

| ID | Em | Title (en) | Condition |
|----|----|------------|-----------|
| `first-game` | 🎮 | First Step | `uniqueGames >= 1` |
| `explorer-5` | 🗺️ | Explorer | `uniqueGames >= 5` |
| `explorer-15` | 🌟 | Game Lover | `uniqueGames >= 15` |
| `explorer-all` | 🏆 | Full Collection | `uniqueGames >= 23` |

### Sessions — total play count

| ID | Em | Title (en) | Condition |
|----|----|------------|-----------|
| `sessions-10` | 🔥 | Warm Up | `totalSessions >= 10` |
| `sessions-50` | 💪 | Dedicated | `totalSessions >= 50` |
| `sessions-100` | 👑 | Veteran | `totalSessions >= 100` |

### Category — sessions within a category

| ID | Em | Title (en) | Condition |
|----|----|------------|-----------|
| `arcade-master` | 🕹️ | Arcade Master | `arcadeSessions >= 20` |
| `zen-master` | 😌 | Zen Master | `relaxSessions >= 10` |
| `kids-friend` | 🐣 | Kids Friend | `kidsSessions >= 15` |

### Dedication — play one game repeatedly

| ID | Em | Title (en) | Condition |
|----|----|------------|-----------|
| `bubble-pop-5` | 🫧 | Bubble King | `sessionsByGame["bubble-pop"] >= 5` |
| `star-catcher-5` | ⭐ | Star Hunter | `sessionsByGame["star-catcher"] >= 5` |
| `fruit-merge-5` | 🍉 | Fruit Master | `sessionsByGame["fruit-merge"] >= 5` |
| `quick-tap-5` | ⚡ | Quick Fingers | `sessionsByGame["quick-tap"] >= 5` |
| `zen-garden-5` | 🌸 | Zen Garden | `sessionsByGame["zen-garden"] >= 5` |

### Score — all-time best in a specific game

| ID | Em | Title (en) | Condition |
|----|----|------------|-----------|
| `bubble-pop-500` | 🫧 | Bubble Burst | `bestByGame["bubble-pop"] >= 500` |
| `star-catcher-300` | ⭐ | Star Collector | `bestByGame["star-catcher"] >= 300` |
| `quick-tap-50` | ⚡ | Lightning Speed | `bestByGame["quick-tap"] >= 50` |
| `color-rush-200` | 🎨 | Color Genius | `bestByGame["color-rush"] >= 200` |
| `helix-jump-200` | 🌀 | Helix Master | `bestByGame["helix-jump"] >= 200` |
| `stack-tower-30` | 🗼 | Tower Builder | `bestByGame["stack-tower"] >= 30` |
| `fruit-merge-1000` | 🍉 | Watermelon World | `bestByGame["fruit-merge"] >= 1000` |
| `infinite-dash-1000` | 🏃 | Endless Runner | `bestByGame["infinite-dash"] >= 1000` |
| `memory-game-15` | 🧠 | Memory Genius | `bestByGame["memory-game"] >= 15` |
| `focus-flow-200` | 🎯 | Sharp Focus | `bestByGame["focus-flow"] >= 200` |

---

## UI

### Nav tab

A 7th button added to `#bnav` in `index.html`:

```html
<button class="ni" onclick="showAchievements()" id="ni-ach">
  <span class="ni-i">🏅</span>
  <span class="ni-l" id="nb6">Yutuqlar</span>
</button>
```

`showAchievements()` is exposed on `window` by `achievements.js`. It:
1. Removes `on` from all `.ni` buttons, adds `on` to `#ni-ach`
2. Hides `#grid`
3. Calls `Achievements.render()` which populates and shows `#ach-panel`

Switching to any other tab (via `fil()`) hides `#ach-panel` and shows `#grid`. The leaderboard tab's `showLeaderboard()` also hides `#ach-panel`.

### Achievements panel (`#ach-panel`)

Hidden by default via `display:none`. Shown exclusively when the achievements tab is active.

Layout:
```
┌─────────────────────────────────────────┐
│  🏅 Yutuqlar                  8 / 25   │
├─────────────────────────────────────────┤
│  — Kashfiyotchi —                       │
│  🎮  Birinchi qadam      ✅ Unlocked    │
│  🗺️  Kashfiyotchi        ✅ Unlocked    │
│  🌟  O'yin severi        🔒             │
│  🏆  To'liq to'plam      🔒             │
├─────────────────────────────────────────┤
│  — Sessiyalar —                         │
│  🔥  Issiq boshlanish    ✅ Unlocked    │
│  💪  Qat'iyatli          🔒             │
│  👑  Veteran             🔒             │
│  ...                                    │
└─────────────────────────────────────────┘
```

Within each section, unlocked achievements render first (full color), then locked ones (greyed out, 🔒 icon). No progress bars or partial counts are shown.

### Toast notification

Injected into `document.body` as a fixed-position element, bottom-center, above the nav bar. Slides up with a CSS `transform` animation on insertion, auto-removed after 3 seconds.

```
╔══════════════════════════════╗
║  🏅 Yutuq ochildi!           ║
║  🎮  Birinchi qadam          ║
╚══════════════════════════════╝
```

If multiple achievements unlock from one `game:score` event, they queue and display sequentially: each toast auto-dismisses after 3s, the next appears 500ms later.

---

## Translations

New `"achievements"` key in `TRANSLATIONS_DATA` in `script.js` covers panel/tab chrome only. Per-achievement title and description are inline in `achievements.js`.

```js
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
```

`applyTranslations()` in `script.js` gains one line to update `#nb6` with the current language's `nb` value. When language switches while the achievements panel is visible, `applyTranslations()` calls `Achievements.render()` to re-render with the new language (same pattern as leaderboard).

---

## `achievements.js` Public API

```js
window.Achievements = {
  render()            // Populates and shows #ach-panel
  hide()              // Hides #ach-panel
  checkAll()          // Re-checks all conditions, unlocks new ones, queues toasts — called internally on game:score
}

window.showAchievements = function() { ... }  // Nav button onclick
```

---

## Edge Cases

| Case | Behaviour |
|------|-----------|
| Multiple achievements unlock at once | Toasts queue — one shown at a time, 500ms gap between each |
| `gz-unlocked` key missing | Treated as empty array — all achievements start locked |
| `GAMES` not yet loaded when message arrives | `computeStats()` uses `window.GAMES \|\| []` — returns empty stats, no false unlocks |
| Language switch while panel is open | `applyTranslations()` calls `Achievements.render()` if `#ach-panel` is visible |
| Leaderboard tab tapped while achievements open | `showLeaderboard()` calls `Achievements.hide()` and hides `#ach-panel` |
| Settings tab tapped while achievements open | `showRev()` does not call `fil()`, overlay sits on top — correct; panel remains underneath |
| Player already has sessions before feature ships | `checkAll()` runs on first `game:score` after update — existing progress counted correctly |

---

## Out of Scope

- Tiered achievements (bronze/silver/gold)
- Progress bars or partial completion indicators
- Achievement notifications in Family Mode turn screen
- Online/global achievement sync
- Deleting or resetting individual achievements
