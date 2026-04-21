# 🎮 GameZone UZ — Android Studio Qo'llanma

## ⏱️ 15 daqiqada tayyor!

---

## 📋 QADAM 1 — Ochish

```
1. ZIP ni istalgan joyga chiqaring
   Masalan: C:\Projects\GameZoneApp\

2. Android Studio → File → Open
   → GameZoneApp papkasini tanlang → OK

3. Gradle sync tugashini kuting (~2 daqiqa)
```

---

## 📱 QADAM 2 — Qurilma Ulash

```
Telefon: Sozlamalar → Qurilma haqida
→ "Qurilma raqami" ga 7 marta bosing
→ Developer options → USB Debugging → ON
→ USB kabel bilan ulang
```

---

## ▶️ QADAM 3 — Ishga Tushirish

```
Android Studio → ▶ Run  (yoki Shift+F10)
```

**Ko'rinadigan narsa:**
- 🎮 Dark splash screen
- 🌍 3 tilli asosiy ekran (UZ/RU/EN)
- 10 ta o'yin kartochkasi
- 📢 Pastda test banner reklama

---

## 💰 QADAM 4 — AdMob ID Qo'shish

### 4a. admob.google.com → 4 ta ID oling:
```
App ID         → ca-app-pub-XXXX~XXXX
Banner         → ca-app-pub-XXXX/XXXX
Interstitial   → ca-app-pub-XXXX/XXXX
Rewarded       → ca-app-pub-XXXX/XXXX
```

### 4b. MainActivity.java da almashtiring:
```java
// Fayl: app/src/main/java/uz/gamezone/app/MainActivity.java

private static final String BANNER_ID       = "ca-app-pub-SIZNING/ID";
private static final String INTERSTITIAL_ID = "ca-app-pub-SIZNING/ID";
private static final String REWARDED_ID     = "ca-app-pub-SIZNING/ID";
```

### 4c. AndroidManifest.xml da almashtiring:
```xml
<!-- Fayl: app/src/main/AndroidManifest.xml -->
android:value="ca-app-pub-SIZNING~APPID"
```

---

## 📦 QADAM 5 — APK Yaratish

```
Build → Generate Signed Bundle / APK
→ APK → Next
→ Create new keystore (birinchi marta)
→ Release → Finish

APK joyi: app/release/app-release.apk
```

---

## 🏪 QADAM 6 — Play Store

```
play.google.com/console → $25 (bir marta)
→ Create app → Upload APK
→ 3 tilda tavsif (UZ, RU, EN)
→ Skrinshotlar
→ Publish
```

---

## 📁 LOYIHA TUZILMASI

```
GameZoneApp/
├── app/src/main/
│   ├── assets/www/
│   │   ├── index.html          ← Asosiy 3-tilli app
│   │   ├── bubble-pop.html     ← 🫧 O'yin 1
│   │   ├── color-rush.html     ← 🎨 O'yin 2
│   │   ├── memory-game.html    ← 🧠 O'yin 3
│   │   ├── animals.html        ← 🐾 O'yin 4
│   │   ├── math-kids.html      ← 🔢 O'yin 5
│   │   └── colors-shapes.html  ← 🌈 O'yin 6
│   ├── java/uz/gamezone/app/
│   │   └── MainActivity.java   ← AdMob + WebView
│   ├── res/layout/activity_main.xml
│   ├── res/values/themes.xml
│   ├── res/drawable/splash_icon.xml
│   └── AndroidManifest.xml
└── app/build.gradle
```

---

## 🐛 XATOLIKLAR

| Xato | Yechim |
|------|--------|
| Gradle sync failed | File → Invalidate Caches → Restart |
| SDK not found | Tools → SDK Manager → API 34 install |
| Build tools error | SDK Manager → SDK Tools → install latest |
| Reklama chiqmaydi | Logcat → "GameZone" qidiring |
