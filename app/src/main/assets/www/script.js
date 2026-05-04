(() => {
  "use strict";

  const GAMES = [
    { id: "bubble-pop", em: "🫧", cat: ["arcade"], tc: "#3B82F6", bg: "135deg,#E0F2FE,#BAE6FD", bdg: "hot", file: "bubble-pop.html" },
    { id: "color-rush", em: "🎨", cat: ["arcade"], tc: "#8B5CF6", bg: "135deg,#F5F3FF,#DDD6FE", bdg: null, file: "color-rush.html" },
    { id: "memory-game", em: "🧠", cat: ["arcade", "kids"], tc: "#10B981", bg: "135deg,#ECFDF5,#D1FAE5", bdg: "new", file: "memory-game.html" },
    { id: "animals", em: "🐾", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: "new", file: "animals.html" },
    { id: "math-kids", em: "🔢", cat: ["kids"], tc: "#EC4899", bg: "135deg,#FDF2F8,#FBCFE8", bdg: "new", file: "math-kids.html" },
    { id: "colors-shapes", em: "🌈", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#FFF7ED,#FFEDD5", bdg: "new", file: "colors-shapes.html" },
    { id: "stack-tower", em: "🗼", cat: ["arcade"], tc: "#06B6D4", bg: "135deg,#ECFEFF,#CFFAFE", bdg: null, file: "stack-tower.html" },
    { id: "helix-jump", em: "🌀", cat: ["arcade"], tc: "#A78BFA", bg: "135deg,#F5F3FF,#EDE9FE", bdg: null, file: "helix-jump.html" },
    { id: "zen-garden", em: "🌸", cat: ["relax"], tc: "#10B981", bg: "135deg,#F0FDF4,#DCFCE7", bdg: null, file: "zen-garden.html" },
    { id: "rain-tap", em: "🌧️", cat: ["relax"], tc: "#60A5FA", bg: "135deg,#EFF6FF,#DBEAFE", bdg: null, file: "rain-tap.html" },
    { id: "quick-tap", em: "⚡", cat: ["arcade"], tc: "#F97316", bg: "135deg,#FFF7ED,#FFEDD5", bdg: "new", file: "quick-tap.html" },
    { id: "shape-match", em: "🔷", cat: ["kids"], tc: "#22D3EE", bg: "135deg,#ECFEFF,#CFFAFE", bdg: null, file: "shape-match.html" },
    { id: "word-sprint", em: "🔤", cat: ["kids"], tc: "#FB7185", bg: "135deg,#FFF1F2,#FFE4E6", bdg: null, file: "word-sprint.html" },
    { id: "pattern-trace", em: "🧩", cat: ["kids", "arcade"], tc: "#A3E635", bg: "135deg,#F7FEE7,#ECFCCB", bdg: null, file: "pattern-trace.html" },
    { id: "melody-memory", em: "🎵", cat: ["relax", "kids"], tc: "#C084FC", bg: "135deg,#FAF5FF,#F3E8FF", bdg: null, file: "melody-memory.html" },
    { id: "star-catcher", em: "⭐", cat: ["arcade"], tc: "#FACC15", bg: "135deg,#FEFCE8,#FEF9C3", bdg: "hot", file: "star-catcher.html" },
    { id: "gentle-breath", em: "🫁", cat: ["relax"], tc: "#34D399", bg: "135deg,#F0FDFA,#CCFBF1", bdg: null, file: "gentle-breath.html" },
    { id: "focus-flow", em: "🎯", cat: ["arcade"], tc: "#60A5FA", bg: "135deg,#EFF6FF,#DBEAFE", bdg: null, file: "focus-flow.html" },
    { id: "fruit-merge", em: "🍉", cat: ["arcade"], tc: "#10B981", bg: "135deg,#ECFDF5,#D1FAE5", bdg: "hot", file: "fruit-merge.html" },
    { id: "infinite-dash", em: "🏃", cat: ["arcade"], tc: "#EF4444", bg: "135deg,#FEF2F2,#FEE2E2", bdg: "new", file: "infinite-dash.html" },
    { id: "number-path", em: "🔢", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: null, file: "number-path.html" },
    { id: "puzzle-slide", em: "🧱", cat: ["arcade", "kids"], tc: "#818CF8", bg: "135deg,#EEF2FF,#E0E7FF", bdg: null, file: "puzzle-slide.html" },
    { id: "clock-match", em: "⏰", cat: ["kids"], tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: "new", file: "clock-match.html" }
  ];

  const TRANSLATIONS_DATA = {
    "ui": {
      "uz": {
        "sec": "✨ Top O'yinlar",
        "nb0": "Asosiy", "nb1": "Kichkintoylar", "nb2": "Klassika", "nb3": "Antistress", "nb4": "Sozlamalar",
        "back": "← Orqaga", "soon": "⏳ Yaqinda!", "loading": "Yuklanmoqda...",
        "countSuffix": " o'yin", "badgeNew": "YANGI", "badgeHot": "TREND", "tl": "O'zbek tili tanlandi",
        "guideTitle": "Ota-onalar uchun", "bestScore": "Rekord: ",
        "filters": { "all": "✨ Barcha O'yinlar", "kids": "👶 Bolalar uchun", "arcade": "🕹️ Arkada", "relax": "😌 Dam olish" },
        "exitGameMessage": "O'yinni tark etmoqchimisiz? Natijangiz saqlanmasligi mumkin.",
        "yes": "Ha",
        "no": "Yo'q"
      },
      "ru": {
        "sec": "✨ Топ Игры",
        "nb0": "Главная", "nb1": "Малышам", "nb2": "Классика", "nb3": "Антистресс", "nb4": "Настройки",
        "back": "← Назад", "soon": "⏳ Скоро!", "loading": "Загрузка...",
        "countSuffix": " игр", "badgeNew": "НОВОЕ", "badgeHot": "ТРЕНД",
        "tl": "Выбран русский язык", "guideTitle": "Для родителей", "bestScore": "Рекорд: ",
        "filters": { "all": "✨ Все Игры", "kids": "👶 Детский мир", "arcade": "🕹️ Аркады", "relax": "😌 Релакс" },
        "exitGameMessage": "Выйти из игры? Ваш прогресс может быть утерян.",
        "yes": "Да",
        "no": "Нет"
      },
      "en": {
        "sec": "✨ Top Games",
        "nb0": "Home", "nb1": "Kids", "nb2": "Arcade", "nb3": "Relax", "nb4": "Settings",
        "back": "← Back", "soon": "⏳ Soon!", "loading": "Loading...",
        "countSuffix": " games", "badgeNew": "NEW", "badgeHot": "TREND",
        "tl": "English selected", "guideTitle": "For Parents", "bestScore": "Best: ",
        "filters": { "all": "✨ All Games", "kids": "👶 Kids Zone", "arcade": "🕹️ Arcade", "relax": "😌 Zen Mode" },
        "exitGameMessage": "Exit the game? Your progress might be lost.",
        "yes": "Yes",
        "no": "No"
      }
    },
    "games": {
      "bubble-pop": {
        "title": {"uz": "Pufakchalar Shousi", "ru": "Пузырьковый Бум", "en": "Bubble Blast Pro"},
        "desc": {"uz": "Rang-barang pufaklarni portlatish!", "ru": "Взрывай яркие пузырьки!", "en": "Pop vibrant bubbles!"},
        "tag": {"uz": "Arkada", "ru": "Аркада", "en": "Arcade"}
      },
      "color-rush": {
        "title": {"uz": "Ranglar Jilosi", "ru": "Цветовой Раш", "en": "Color Rush Elite"},
        "desc": {"uz": "Ranglar olamiga sho'ng'ing", "ru": "Погрузись в мир красок", "en": "Dive into the world of colors"},
        "tag": {"uz": "Ijodkorlik", "ru": "Творчество", "en": "Creativity"}
      },
      "memory-game": {
        "title": {"uz": "Miya Mashg'uloti", "ru": "Мастер Памяти", "en": "Brain Match Master"},
        "desc": {"uz": "Zehningizni sinovdan o'tkazing", "ru": "Проверь свою память", "en": "Test your memory skills"},
        "tag": {"uz": "Diqqat", "ru": "Внимание", "en": "Attention"}
      },
      "animals": {
        "title": {"uz": "Hayvonot Olami", "ru": "Планета Животных", "en": "Animal Kingdom"},
        "desc": {"uz": "Tabiat bilan tanishing", "ru": "Узнай мир природы", "en": "Explore the wild world"},
        "tag": {"uz": "Ta'lim", "ru": "Обучение", "en": "Education"}
      },
      "math-kids": {
        "title": {"uz": "Raqamlar Sehrgari", "ru": "Магия Чисел", "en": "Math Wizard"},
        "desc": {"uz": "Matematika endi juda oson!", "ru": "Математика — это просто!", "en": "Math made fun and easy!"},
        "tag": {"uz": "Mantiq", "ru": "Логика", "en": "Logic"}
      },
      "colors-shapes": {
        "title": {"uz": "Ranglar Akademiyasi", "ru": "Академия Цветов", "en": "Color Academy Pro"},
        "desc": {"uz": "Geometriya va ranglar olami", "ru": "Мир фигур и красок", "en": "World of geometry & colors"},
        "tag": {"uz": "Bilim", "ru": "Знания", "en": "Knowledge"}
      },
      "stack-tower": {
        "title": {"uz": "Osmon-o'par Minora", "ru": "Небоскреб Стак", "en": "Sky High Tower"},
        "desc": {"uz": "Eng baland minorani quring", "ru": "Построй самую высокую башню", "en": "Build the tallest tower"},
        "tag": {"uz": "Epchillik", "ru": "Ловкость", "en": "Agility"}
      },
      "helix-jump": {
        "title": {"uz": "Spiral Sakrash", "ru": "Спиральный Прыжок", "en": "Helix Jump Neo"},
        "desc": {"uz": "To'siqlardan ehtiyot bo'ling", "ru": "Берегись препятствий", "en": "Watch out for obstacles"},
        "tag": {"uz": "Reaksiya", "ru": "Реакция", "en": "Reaction"}
      },
      "zen-garden": {
        "title": {"uz": "Zen Bog'i", "ru": "Дзен Сад", "en": "Zen Garden Relax"},
        "desc": {"uz": "Tinchlik va osoyishtalik", "ru": "Покой и умиротворение", "en": "Peace and tranquility"},
        "tag": {"uz": "Relaks", "ru": "Релакс", "en": "Relax"}
      },
      "rain-tap": {
        "title": {"uz": "Yomg'ir Raqsi", "ru": "Танец Дождя", "en": "Rain Tap Zen"},
        "desc": {"uz": "Yomg'ir tovushlari ostida", "ru": "Под звуки дождя", "en": "With the sounds of rain"},
        "tag": {"uz": "Antistress", "ru": "Антистресс", "en": "Antistress"}
      },
      "quick-tap": {
        "title": {"uz": "Tezkor Reaksiya", "ru": "Быстрая Реакция", "en": "Quick Tap Reflex"},
        "desc": {"uz": "Soniya ichida qaror qabul qiling", "ru": "Решай за доли секунды", "en": "Decide in a split second"},
        "tag": {"uz": "Tezlik", "ru": "Скорость", "en": "Speed"}
      },
      "shape-match": {
        "title": {"uz": "Shakllar Dueli", "ru": "Дуэль Фигур", "en": "Shape Duel Pro"},
        "desc": {"uz": "Geometrik moslikni toping", "ru": "Найди соответствие", "en": "Find geometric matches"},
        "tag": {"uz": "Mantiq", "ru": "Логика", "en": "Logic"}
      },
      "word-sprint": {
        "title": {"uz": "So'z Ustasi", "ru": "Мастер Слов", "en": "Word Master Elite"},
        "desc": {"uz": "Lug'atingizni boyiting", "ru": "Расширяй словарный запас", "en": "Expand your lexicon"},
        "tag": {"uz": "Lug'at", "ru": "Словарь", "en": "Vocabulary"}
      },
      "pattern-trace": {
        "title": {"uz": "Sehrli Chiziqlar", "ru": "Волшебные Линии", "en": "Magic Lines Art"},
        "desc": {"uz": "Chiroyli shakllar chizing", "ru": "Рисуй красивые узоры", "en": "Draw beautiful patterns"},
        "tag": {"uz": "San'at", "ru": "Искусство", "en": "Art"}
      },
      "melody-memory": {
        "title": {"uz": "Musiqiy Xotira", "ru": "Музыкальная Память", "en": "Melody Memory Pro"},
        "desc": {"uz": "Ritm va ohangni eslang", "ru": "Запоминай ритм и мелодию", "en": "Remember the rhythm"},
        "tag": {"uz": "Musiqa", "ru": "Музыка", "en": "Music"}
      },
      "star-catcher": {
        "title": {"uz": "Yulduzli Parvoz", "ru": "Звездный Полет", "en": "Star Flight Elite"},
        "desc": {"uz": "Koinot yulduzlarini tuting", "ru": "Лови космические звезды", "en": "Catch cosmic stars"},
        "tag": {"uz": "Epchillik", "ru": "Ловкость", "en": "Agility"}
      },
      "gentle-breath": {
        "title": {"uz": "Nafas Mashqi", "ru": "Дыхательная Практика", "en": "Zen Breathing Yoga"},
        "desc": {"uz": "Sokinlikni his eting", "ru": "Почувствуй спокойствие", "en": "Take a deep breath"},
        "tag": {"uz": "Yoga", "ru": "Йога", "en": "Yoga"}
      },
      "focus-flow": {
        "title": {"uz": "Diqqat Oqimi", "ru": "Поток Внимания", "en": "Focus Flow Zen"},
        "desc": {"uz": "Zehningizni jamlang", "ru": "Сконцентрируй внимание", "en": "Concentrate your focus"},
        "tag": {"uz": "Fokus", "ru": "Фокус", "en": "Focus"}
      },
      "fruit-merge": {
        "title": {"uz": "Meva Mix", "ru": "Фруктовый Микс", "en": "Fruit Mix Mania"},
        "desc": {"uz": "Sarxil mevalarni yig'ing", "ru": "Собирай сочные фрукты", "en": "Combine the fruits"},
        "tag": {"uz": "Mantiq", "ru": "Логика", "en": "Logic"}
      },
      "infinite-dash": {
        "title": {"uz": "Koinot Poygasi", "ru": "Космический Забег", "en": "Cosmic Dash Nitro"},
        "desc": {"uz": "To'siqlardan chaqqon o'ting", "ru": "Обходи преграды", "en": "Avoid obstacles"},
        "tag": {"uz": "Tezkorlik", "ru": "Скорость", "en": "Speed"}
      },
      "number-path": {
        "title": {"uz": "Raqamlar Labirinti", "ru": "Лабиринт Чисел", "en": "Number Maze Quest"},
        "desc": {"uz": "To'g'ri yo'lni toping", "ru": "Найди верный путь", "en": "Find the correct path"},
        "tag": {"uz": "Matematika", "ru": "Математика", "en": "Math"}
      },
      "puzzle-slide": {
        "title": {"uz": "Slayd Master", "ru": "Слайд Мастер", "en": "Slide Master Pro"},
        "desc": {"uz": "Bloklarni tartiblang", "ru": "Упорядочи блоки", "en": "Put blocks in place"},
        "tag": {"uz": "Jumboq", "ru": "Пазл", "en": "Puzzle"}
      },
      "clock-match": {
        "title": {"uz": "Vaqt Akademiyasi", "ru": "Академия Времени", "en": "Time Academy Pro"},
        "desc": {"uz": "Vaqtni boshqarishni o'rganing", "ru": "Управляй временем", "en": "Learn to tell the time"},
        "tag": {"uz": "Bilim", "ru": "Знания", "en": "Knowledge"}
      }
    }
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
  };

  const HEALTH_PROFILES = {
    1: { id: 1, speed: 1.15, timerScale: 0.85, motion: 1.1, audio: 1, penalties: true },
    2: { id: 2, speed: 1.0, timerScale: 1.0, motion: 1.0, audio: 0.85, penalties: true },
    3: { id: 3, speed: 0.75, timerScale: 1.4, motion: 0.7, audio: 0.6, penalties: false }
  };

  const els = {};
  let translations = TRANSLATIONS_DATA;
  let lang = "uz";
  let filter = "all";
  let toastTimer = null;
  let resizeTimer = null;
  let viewportTimer = null;
  let points = parseInt(localStorage.getItem("gz-pts") || "0", 10);
  let healthGroup = parseInt(localStorage.getItem("gz-health-group") || "2", 10);
  let currentGameId = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function bindDom() {
    els.grid = byId("grid");
    els.toast = byId("toast");
    els.lp = byId("lp");
    els.ld = byId("ld");
    els.points = byId("pts-v");
    els.gs = byId("gs");
    els.gsTitle = byId("gs-title");
    els.gsFrame = byId("gs-frame");
    els.gameExitModal = byId("game-exit-modal");
    els.exitModalMessage = byId("exit-modal-msg");
    els.exitModalYes = byId("exit-modal-yes");
    els.exitModalNo = byId("exit-modal-no");
    els.gameLoadingOverlay = byId("game-loading-overlay"); // NEW: Game loading overlay
    els.loadingText = byId("loading-text"); // NEW: Loading text inside overlay
  }

  function ui() {
    return translations.ui[lang] || translations.ui.en;
  }

  function gameText(id) {
    const item = translations.games[id] || {};
    return {
      title: item.title?.[lang] || item.title?.uz || id,
      desc: item.desc?.[lang] || item.desc?.uz || "O'ynashga tayyor",
      tag: item.tag?.[lang] || item.tag?.uz || "Mini-game"
    };
  }

  function getBadgeLabel(type) {
    const t = ui();
    if (type === "new") return t.badgeNew;
    if (type === "hot") return t.badgeHot;
    return "";
  }

  function updateLanguageButtons() {
    ["uz", "ru", "en"].forEach((code) => {
      byId(`ls-${code}`)?.classList.toggle("on", code === lang);
    });
  }

  function setDocumentLang() {
    document.documentElement.lang = lang;
  }

  function applyTranslations() {
    const t = ui();
    if (byId("sec-t")) byId("sec-t").textContent = t.filters[filter] || t.sec;
    if (byId("nb0")) byId("nb0").textContent = t.nb0;
    if (byId("nb1")) byId("nb1").textContent = t.nb1;
    if (byId("nb2")) byId("nb2").textContent = t.nb2;
    if (byId("nb3")) byId("nb3").textContent = t.nb3;
    if (byId("nb4")) byId("nb4").textContent = t.nb4;

    if (byId("ld-txt")) byId("ld-txt").textContent = t.loading;
    if (els.loadingText) els.loadingText.textContent = t.loading; // NEW: For game loading overlay
    if (byId("gs-back")) byId("gs-back").textContent = t.back;
    if (byId("sec-c")) byId("sec-c").textContent = `${visibleGames(filter).length}${t.countSuffix}`;
  }

  function visibleGames(f) {
    return f === "all" ? GAMES : GAMES.filter((g) => g.cat.includes(f));
  }

  function buildGrid(f) {
    if (!els.grid) return;
    els.grid.innerHTML = "";
    const list = visibleGames(f);
    list.forEach((game) => {
      const { title, desc, tag } = gameText(game.id);
      const card = document.createElement("div");
      card.className = "gc";
      card.onclick = () => openGame(game.id, title);

      const best = parseInt(localStorage.getItem(`gz-best-${game.id}`) || "0", 10);
      const badge = game.bdg ? `<div class="bdg b${game.bdg}">${getBadgeLabel(game.bdg)}</div>` : "";

      card.innerHTML = `
        ${badge}
        <div class="gc-art" style="background:linear-gradient(${game.bg})">
          <div class="gc-em">${game.em}</div>
        </div>
        <div class="gc-info">
          <div class="gc-nm">${title}</div>
          <div class="gc-meta">
            <span class="gc-tg" style="background:${game.tc}15; color:${game.tc}">${tag}</span>
            <span class="gc-ds">${desc}</span>
          </div>
          ${best > 0 ? `<div class="gc-best">🏆 ${ui().bestScore}${best}</div>` : ""}
        </div>
      `;
      els.grid.appendChild(card);
    });
  }

  function openGame(id, title) {
    const game = GAMES.find((g) => g.id === id);
    if (!game) return;

    currentGameId = id;
    // Oflyayn tezlikni oshirish: ts (timestamp) olib tashlandi, bu keshdan foydalanishga imkon beradi
    const params = new URLSearchParams({ lang, hg: String(healthGroup), tc: game.tc });
    
    // NEW: Show loading overlay before loading the game
    if (els.gameLoadingOverlay) {
      // Customize splash icon with game's emoji
      const iconEl = els.gameLoadingOverlay.querySelector('.game-icon-anim');
      if (iconEl) iconEl.textContent = game.em;
      els.gameLoadingOverlay.classList.remove("hidden");
      if (els.loadingText) els.loadingText.textContent = ui().loading;
    }
    els.gsFrame.src = `${game.file}?${params.toString()}`;
    els.gsTitle.textContent = title;
    els.gs.classList.remove("h");

    // Notify Native Bridge to hide banner while gaming
    if (window.AndroidAdMob && window.AndroidAdMob.hideBanner) {
        window.AndroidAdMob.hideBanner();
    } else {
        // Fallback for browser testing
        window.setBannerVisibility?.(false);
    }
  }

  function closeGame() {
    els.gs.classList.add("h");
    els.gsFrame.src = "about:blank";
    currentGameId = null;
    
    // NEW: Ensure loading overlay is hidden when closing game
    if (els.gameLoadingOverlay) {
      els.gameLoadingOverlay.classList.add("hidden");
    }

    // Notify Native Bridge to show banner in dashboard
    if (window.AndroidAdMob && window.AndroidAdMob.showBanner) {
        window.AndroidAdMob.showBanner();
    } else {
        // Fallback for browser testing
        window.setBannerVisibility?.(true);
    }
    buildGrid(filter);
  }

  /**
   * Native Bridge callback for banner visibility.
   */
  window.setBannerVisibility = function(isVisible) {
    const root = document.documentElement;
    // Get --bh height (56px or 90px)
    const isTablet = window.AndroidAdMob && window.AndroidAdMob.isTablet ? window.AndroidAdMob.isTablet() : false;
    const bannerHeight = isTablet ? "90px" : "60px";
    root.style.setProperty('--ad-h', isVisible ? bannerHeight : '0px');
    document.body.classList.toggle('has-ad', isVisible);
    onResize();
  };

  function setLang(l, silent) {
    if (!translations.ui[l]) return;
    lang = l;
    localStorage.setItem("gz-lang", lang);
    els.lp?.classList.add("h");
    updateLanguageButtons();
    setDocumentLang();
    applyTranslations();
    buildGrid(filter);

    // Refresh game if open to sync language
    if (currentGameId && !els.gs.classList.contains("h")) {
      openGame(currentGameId, els.gsTitle.textContent);
    }

    if (!silent) showToast(ui().tl);
  }

  function fil(f) {
    filter = f;
    document.querySelectorAll(".ni").forEach((n) => n.classList.remove("on"));
    byId(`ni-${f}`)?.classList.add("on");
    applyTranslations();
    buildGrid(f);
  }
  window.fil = fil;

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
    const playBtn = byId('info-play-btn');
    if (playBtn) playBtn.textContent = '▶ ' + (ui()['start'] || (lang === 'ru' ? 'Играть' : lang === 'en' ? 'Play' : 'O\'ynash'));
    modal.classList.add('show');
  }

  function closeInfoModal() {
    byId('info-modal')?.classList.remove('show');
  }

  window.showInfoModal  = showInfoModal;
  window.closeInfoModal = closeInfoModal;

  function showToast(m) {
    if (!els.toast) return;
    clearTimeout(toastTimer);
    els.toast.textContent = m;
    els.toast.classList.add("s");
    toastTimer = setTimeout(() => els.toast.classList.remove("s"), 3000);
  }

  function updateViewportCssVars() {
    const h = window.innerHeight;
    document.documentElement.style.setProperty("--app-vh", `${h * 0.01}px`);
    document.documentElement.style.setProperty("--app-height", `${h}px`);
  }

  function onResize() {
    updateViewportCssVars();
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => buildGrid(filter), 200);
  }

  function detectStartupLang() {
    const s = localStorage.getItem("gz-lang");
    if (s && translations.ui[s]) return s;
    const n = navigator.language.toLowerCase();
    if (n.startsWith("ru")) return "ru";
    if (n.startsWith("uz")) return "uz";
    return "en";
  }

  function bindExitModal() {
    if (els.exitModalYes) els.exitModalYes.onclick = () => { hideGameExitConfirmation(); closeGame(); };
    if (els.exitModalNo) els.exitModalNo.onclick = hideGameExitConfirmation;
  }

  function hideGameExitConfirmation() {
    els.gameExitModal?.classList.remove("show");
  }

  window.showGameExitConfirmationFromParent = () => {
    const t = ui();
    if (els.exitModalMessage) els.exitModalMessage.textContent = t.exitGameMessage;
    if (els.exitModalYes) els.exitModalYes.textContent = t.yes;
    if (els.exitModalNo) els.exitModalNo.textContent = t.no;
    els.gameExitModal?.classList.add("show");
  };

  async function init() {
    try {
      bindDom();
      updateViewportCssVars();
      const startupLang = detectStartupLang();
      setLang(startupLang, true);
      if (localStorage.getItem("gz-lang")) els.lp?.classList.add("h");

      window.setLang = setLang;
      window.fil = fil;
      window.closeGame = closeGame;
      window.showRev = () => els.lp?.classList.remove("h");
      
      // NEW: Add onload listener for the game iframe to hide loading overlay
      if (els.gsFrame) {
        els.gsFrame.onload = () => {
          // O'yin yuklangach, 500ms kutib keyin zoom-out qilish (effekt sezilishi uchun)
          setTimeout(() => {
            if (els.gameLoadingOverlay) {
              els.gameLoadingOverlay.classList.add("hidden");
            }
          }, 500);
        };
      }

      bindExitModal();
      buildGrid(filter);
    } catch (e) {
      console.error("Init Error", e);
    } finally {
      setTimeout(() => els.ld?.classList.add("h"), 500);
      window.addEventListener("resize", onResize);
    }
  }

  window.addEventListener("DOMContentLoaded", init);
})();
