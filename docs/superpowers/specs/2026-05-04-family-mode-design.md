# Family Mode — Design Spec
**Date:** 2026-05-04  
**Status:** Approved  
**Scope:** GameZoneApp — Oilaviy Rejim (Family Mode)

---

## Summary

Add a Family Mode to GameZoneApp that enables parent-child co-play on a single device with turn-based scoring, parental PIN protection, session time limits, and game filtering. All logic lives in a new `family-mode.js` file. Existing games are not modified.

---

## Architecture

### Flow
```
Home Screen → [🏠 Oilaviy Rejim] button
    → PIN Screen (parent enters/sets 4-digit PIN)
    → Settings Screen (time limit + mode + kids-only filter)
    → Game Grid (filtered) → Game opens
    → After game ends → Turn Screen (scores + next player)
    → Time expired → "Bugunlik shu!" (Session End Screen)
```

### Storage (localStorage)
| Key | Value |
|-----|-------|
| `gamezone_family_pin` | SHA-256 hashed 4-digit PIN |
| `gamezone_family_settings` | `{timeLimit: 20, mode: "turns", kidsOnly: true}` |
| `gamezone_family_session` | `{startTime, parentScore, childScore, currentTurn}` |

No data is sent to any server. All state is local.

---

## Screens

### 1. PIN Screen
- First launch: parent sets a new 4-digit PIN
- Subsequent launches: parent enters existing PIN to unlock
- 3 wrong attempts → 30-second lockout
- PIN can be reset from Settings Screen (requires current PIN)

### 2. Settings Screen
- **Time limit:** 10 / 20 / 30 / Unlimited minutes
- **Mode:** Child only | Parent only | Turn-based (alternating)
- **Kids filter:** Toggle — show only `cat: ["kids"]` games when ON
- Changes saved to `gamezone_family_settings` immediately

### 3. Turn Screen (shown after each game)
```
🏆 Ota-ona: 340 ball
👶 Bola:    280 ball
─────────────────────
Keyingi: BOLA navbati!
[Davom etish]  [To'xtatish]
```
- `family-mode.js` listens to `window.addEventListener('message', ...)` for `{type: 'game:score', score}` from game iframes (already fired by `game-api.js`)
- Alternates `currentTurn` between `parent` and `child`

### 4. Session End Screen (shown when time expires)
```
⏰ Bugunlik shu!
👶 Bola:    1240 ball  🥇
🏆 Ota-ona:  980 ball
[Yana o'ynash]  [Chiqish]
```
- Winner determined by total accumulated score
- "Yana o'ynash" resets session (keeps settings)

---

## Multilingual Support

All Family Mode strings added to `TRANSLATIONS_DATA` in `script.js` under `"family"` key for `uz`, `ru`, `en`.

Strings needed:
- `familyMode`, `enterPin`, `setPin`, `timeLimitLabel`, `modeLabel`
- `parentTurn`, `childTurn`, `sessionEnd`, `todaysDone`
- `parentScore`, `childScore`, `playAgain`, `exit`
- `wrongPin`, `lockout`, `kidsOnly`

---

## File Changes

| File | Change |
|------|--------|
| `family-mode.js` | **New** — all Family Mode UI, state, and logic; listens to existing `game:score` postMessage |
| `index.html` | Add Family Mode button + `<script src="family-mode.js">` |
| `script.js` | Add `family` key to `TRANSLATIONS_DATA` for uz/ru/en |

Total: 3 files. No game files touched (`game-api.js` already fires `game:score` — no changes needed).

---

## Out of Scope (future versions)
- Per-child profiles
- Cloud sync
- Push notifications
- Weekly statistics / charts
- Achievements system
