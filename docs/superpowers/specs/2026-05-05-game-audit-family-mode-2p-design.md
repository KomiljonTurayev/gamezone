# Game Audit + Family Mode 2-Player — Design Spec
**Date:** 2026-05-05  
**Status:** Approved  
**Scope:** GameZoneApp — Bug audit (23 games) + Family Mode pre-game turn screen + score reporting for all games

---

## Summary

Three goals in one pass:
1. Add a pre-game "who's turn" screen to Family Mode so each player knows when to play before the game loads.
2. Wire `GameAPI.reportScore()` into the 3 games currently missing it (`rain-tap`, `zen-garden`, `gentle-breath`).
3. Audit all 23 game files for common bugs: broken score reporting, hardcoded translations, missing `endGame()` calls, and timer leaks.

---

## Architecture

### Pre-game Turn Screen Flow
```
User taps game card
  → script.js calls FamilyMode.onGameOpen(gameId, openCallback)
  → [Family Mode active] family-mode.js shows pre-game screen
  → User taps "Boshlash" → openCallback() → iframe loads
  → Game plays → game:score postMessage sent
  → Existing turn screen shown

  [Family Mode inactive] → openCallback() fires immediately, no overlay shown
```

### Hook Interface (script.js — 1 line)
In `openGame()`, before setting `els.gsFrame.src`:
```js
if (window.FamilyMode?.onGameOpen(gameId, () => { els.gsFrame.src = url; })) return;
els.gsFrame.src = url;
```
`onGameOpen` returns `true` if Family Mode is active (screen shown), `false` otherwise.

---

## Screens

### Pre-game Turn Screen
Shown inside the existing `fm-overlay` (same modal shell as PIN/settings screens).

```
┌─────────────────────────────┐
│         🏆  (or 👶)         │
│    Ota-ona navbati!         │
│   (or: Bola navbati!)       │
│                             │
│   🎮  [Game Name]           │
│                             │
│   ⏱ Qoldi: 14 daqiqa       │
│                             │
│   [ ▶ Boshlash ]            │
│                             │
│  ┌──────────┐ ┌──────────┐  │
│  │ 🏆  340  │ │ 👶  280  │  │
│  └──────────┘ └──────────┘  │
└─────────────────────────────┘
```

**Content:**
- Large emoji (🏆 for parent turn, 👶 for child turn) + turn label
- Game name (from `TRANSLATIONS_DATA.games[lang][gameId].title` or fallback)
- Time remaining (hidden if unlimited)
- Current scores for both players
- "Boshlash" button → calls `openCallback()` and hides overlay

**Mode edge cases:**
- `turns` mode: emoji and label alternate each turn (parent → child → parent...)
- `parent` only mode: always shows 🏆 + parent label, no alternation
- `child` only mode: always shows 👶 + child label, no alternation
- All modes: "Boshlash" always fires `openCallback()` to load the game

**Translations needed (add to `family` key in script.js):**
- `readyParent`: "Ota-ona, tayyor bo'ling!" / "Родитель, готовьтесь!" / "Parent, get ready!"
- `readyChild`: "Bola, tayyor bo'ling!" / "Ребёнок, готовься!" / "Child, get ready!"
- `goPlay`: "▶ Boshlash" / "▶ Начать" / "▶ Start"

---

## Score Reporting — 3 Missing Games

### rain-tap.html
- Game ends when all drops miss (life system) or time runs out
- Find the `endGame()` / game-over block and add:
  ```js
  GameAPI.reportScore('rain-tap', score);
  GameAPI.saveBestScore('rain-tap', score);
  GameAPI.endGame();
  ```

### zen-garden.html
- No traditional score — user draws patterns in sand
- Score = number of separate strokes drawn during session
- On "End" / timeout: `GameAPI.reportScore('zen-garden', strokeCount)`
- If no end button exists, add a "Tugatish" button in the top-right corner (same style as existing UI buttons); tapping it reports score and calls `GameAPI.endGame()`

### gentle-breath.html
- No GameAPI at all — standalone HTML
- Score = number of completed breath cycles
- Add `<script src="game-api.js"></script>` at top
- At session end: `GameAPI.reportScore('gentle-breath', cycleCount)`

---

## Bug Audit — All 23 Games

Checked per game file in this order:

| # | Check | Pass criteria |
|---|-------|---------------|
| 1 | `GameAPI.reportScore()` called | Called with correct gameId and score at game-over |
| 2 | `GameAPI.endGame()` called | Called after reportScore, not before |
| 3 | `GameAPI.saveBestScore()` called | Saves best after each game-over |
| 4 | Translations via `GameAPI.t()` | No raw hardcoded strings visible to user |
| 5 | Interval/timeout cleanup | `clearInterval`/`clearTimeout` on game-over or page hide |
| 6 | No infinite loop risk | Game-over condition reachable under normal play |

Bugs found will be fixed inline per file. Each game gets its own fix commit.

---

## File Changes

| File | Change |
|------|--------|
| `family-mode.js` | Add `onGameOpen(gameId, cb)` function + pre-game screen HTML |
| `script.js` | 1-line hook in `openGame()` + 3 new translation strings in `family` key |
| `rain-tap.html` | Add `GameAPI.reportScore()` + `endGame()` at game-over |
| `zen-garden.html` | Add stroke counter + `GameAPI.reportScore()` + "Tugatish" button if missing |
| `gentle-breath.html` | Add `game-api.js` script tag + cycle counter + `GameAPI.reportScore()` |
| 23 game HTML files | Bug fixes as found during audit |

---

## Out of Scope
- Simultaneous 2-player (same screen at same time)
- Online multiplayer
- Per-game difficulty settings
- Persistent player profiles beyond existing Family Mode storage
