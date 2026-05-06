(() => {
  "use strict";

  const GAMES = [
    { id: "bubble-pop", em: "🫧", cat: ["arcade"], age: 3, tc: "#3B82F6", bg: "135deg,#E0F2FE,#BAE6FD", bdg: "hot", file: "bubble-pop.html" },
    { id: "color-rush", em: "🎨", cat: ["arcade"], age: 5, tc: "#8B5CF6", bg: "135deg,#F5F3FF,#DDD6FE", bdg: null, file: "color-rush.html" },
    { id: "memory-game", em: "🧠", cat: ["arcade", "kids"], age: 3, tc: "#10B981", bg: "135deg,#ECFDF5,#D1FAE5", bdg: "new", file: "memory-game.html" },
    { id: "animals", em: "🐾", cat: ["kids"], age: 3, tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: "new", file: "animals.html" },
    { id: "math-kids", em: "🔢", cat: ["kids"], age: 5, tc: "#EC4899", bg: "135deg,#FDF2F8,#FBCFE8", bdg: "new", file: "math-kids.html" },
    { id: "colors-shapes", em: "🌈", cat: ["kids"], age: 3, tc: "#F59E0B", bg: "135deg,#FFF7ED,#FFEDD5", bdg: "new", file: "colors-shapes.html" },
    { id: "stack-tower", em: "🗼", cat: ["arcade"], age: 5, tc: "#06B6D4", bg: "135deg,#ECFEFF,#CFFAFE", bdg: null, file: "stack-tower.html" },
    { id: "helix-jump", em: "🌀", cat: ["arcade"], age: 7, tc: "#A78BFA", bg: "135deg,#F5F3FF,#EDE9FE", bdg: null, file: "helix-jump.html" },
    { id: "zen-garden", em: "🌸", cat: ["relax"], age: 0, tc: "#10B981", bg: "135deg,#F0FDF4,#DCFCE7", bdg: null, file: "zen-garden.html" },
    { id: "rain-tap", em: "🌧️", cat: ["relax"], age: 0, tc: "#60A5FA", bg: "135deg,#EFF6FF,#DBEAFE", bdg: null, file: "rain-tap.html" },
    { id: "quick-tap", em: "⚡", cat: ["arcade"], age: 5, tc: "#F97316", bg: "135deg,#FFF7ED,#FFEDD5", bdg: "new", file: "quick-tap.html" },
    { id: "shape-match", em: "🔷", cat: ["kids"], age: 3, tc: "#22D3EE", bg: "135deg,#ECFEFF,#CFFAFE", bdg: null, file: "shape-match.html" },
    { id: "word-sprint", em: "🔤", cat: ["kids"], age: 5, tc: "#FB7185", bg: "135deg,#FFF1F2,#FFE4E6", bdg: null, file: "word-sprint.html" },
    { id: "pattern-trace", em: "🧩", cat: ["kids", "arcade"], age: 3, tc: "#A3E635", bg: "135deg,#F7FEE7,#ECFCCB", bdg: null, file: "pattern-trace.html" },
    { id: "melody-memory", em: "🎵", cat: ["relax", "kids"], age: 3, tc: "#C084FC", bg: "135deg,#FAF5FF,#F3E8FF", bdg: null, file: "melody-memory.html" },
    { id: "star-catcher", em: "⭐", cat: ["arcade"], age: 5, tc: "#FACC15", bg: "135deg,#FEFCE8,#FEF9C3", bdg: "hot", file: "star-catcher.html" },
    { id: "gentle-breath", em: "🫁", cat: ["relax"], age: 0, tc: "#34D399", bg: "135deg,#F0FDFA,#CCFBF1", bdg: null, file: "gentle-breath.html" },
    { id: "focus-flow", em: "🎯", cat: ["arcade"], age: 5, tc: "#60A5FA", bg: "135deg,#EFF6FF,#DBEAFE", bdg: null, file: "focus-flow.html" },
    { id: "fruit-merge", em: "🍉", cat: ["arcade"], age: 5, tc: "#10B981", bg: "135deg,#ECFDF5,#D1FAE5", bdg: "hot", file: "fruit-merge.html" },
    { id: "infinite-dash", em: "🏃", cat: ["arcade"], age: 7, tc: "#EF4444", bg: "135deg,#FEF2F2,#FEE2E2", bdg: "new", file: "infinite-dash.html" },
    { id: "number-path", em: "🔢", cat: ["kids"], age: 5, tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: null, file: "number-path.html" },
    { id: "puzzle-slide", em: "🧱", cat: ["arcade", "kids"], age: 5, tc: "#818CF8", bg: "135deg,#EEF2FF,#E0E7FF", bdg: null, file: "puzzle-slide.html" },
    { id: "clock-match", em: "⏰", cat: ["kids"], age: 5, tc: "#F59E0B", bg: "135deg,#FEF3C7,#FDE68A", bdg: "new", file: "clock-match.html" }
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
      "bubble-pop":     { "uz": "Pufakchalarni barmoq bilan bosib portlating! Qanchalik tez bo'lsangiz, shuncha ko'p ball olasiz.", "ru": "Нажимай на пузырьки пальцем! Чем быстрее ты, тем больше баллов.", "en": "Tap bubbles to pop them! The faster you are, the more points you get." },
      "color-rush":     { "uz": "Ko'rsatilgan rangga mos kartani tez bosing! Adashmang, vaqt juda kam.", "ru": "Нажимай на карту нужного цвета! Не ошибись, времени мало.", "en": "Tap the card matching the shown color! Be quick, time is limited." },
      "memory-game":    { "uz": "Kartochkalarni ochib bir xil juftini toping! Xotirani charxlash uchun ajoyib o'yin.", "ru": "Открывай карточки и ищи пары! Отличная игра для тренировки памяти.", "en": "Flip cards and find matching pairs! Great for memory training." },
      "animals":        { "uz": "Hayvon ovozini eshiting va to'g'ri ismini tanlang! Hayvonlar dunyosini o'rganamiz.", "ru": "Слушай звук животного и выбери правильное имя! Изучаем мир животных.", "en": "Hear the animal sound and tap its correct name! Let's explore nature." },
      "math-kids":      { "uz": "Masalani yechib to'g'ri javobni bosing! Matematika bilan do'st bo'ling.", "ru": "Реши задачу и выбери правильный ответ! Подружись с математикой.", "en": "Solve the math problem and tap the correct answer! Have fun with math." },
      "colors-shapes":  { "uz": "Ko'rsatilgan rang yoki shaklni tanlang! Bilimingizni sinab ko'ring.", "ru": "Выбери указанный цвет или фигуру! Проверь свои знания.", "en": "Choose the shown color or shape! Test your knowledge." },
      "stack-tower":    { "uz": "Harakat qilayotgan blokni o'z vaqtida bosib uyib boring! Minorani qulashiga yo'l qo'ymang.", "ru": "Нажимай на блок вовремя, чтобы сложить башню! Не дай ей упасть.", "en": "Tap the moving block at the right time to stack it! Don't let it fall." },
      "helix-jump":     { "uz": "Shar pastga tushsin — qora to'siqlardan saqla! Aylana bo'ylab boshqaring.", "ru": "Шар падает вниз — избегай чёрных препятствий! Управляй спиралью.", "en": "Ball falls down — avoid the dark obstacles! Control the spiral." },
      "zen-garden":     { "uz": "Barmog'ingiz bilan qumda chiroyli naqshlar chizing! Tinchlaning va dam oling.", "ru": "Рисуй красивые узоры на песке пальцем! Успокойся и отдохни.", "en": "Draw beautiful patterns in the sand with your finger! Relax and enjoy." },
      "rain-tap":       { "uz": "Tushayotgan tomchilarni erga yetmasdan bosing! Yomg'irda o'ynash vaqti.", "ru": "Нажимай на капли до того, как они коснутся земли! Время играть в дождь.", "en": "Tap falling drops before they hit the ground! Time to play in the rain." },
      "quick-tap":      { "uz": "Ko'k doira chiqganda imkon qadar tez bosing! Reaksiyangizni sinang.", "ru": "Нажимай на синий круг как можно быстрее! Проверь реакцию.", "en": "Tap the blue circle as fast as possible! Test your reaction." },
      "shape-match":    { "uz": "Shaklni to'g'ri rangdagi katakka sudrab tashlang! Mantiqiy fikrlashni rivojlantiring.", "ru": "Перетащи фигуру в ячейку нужного цвета! Развивай логику.", "en": "Drag the shape to the slot with the matching color! Develop logic." },
      "word-sprint":    { "uz": "Harflarni bosib ko'rsatilgan so'zni hosil qiling! So'z boyligingizni oshiring.", "ru": "Нажимай на буквы, чтобы составить слово! Расширяй словарный запас.", "en": "Tap letters in order to spell the word! Expand your vocabulary." },
      "pattern-trace":  { "uz": "Ko'rsatilgan shaklni barmog'ingiz bilan chizing! Chiziqdan chiqib ketmang.", "ru": "Обведи показанную фигуру пальцем! Не выходи за линии.", "en": "Trace the shown shape with your finger! Stay inside the lines." },
      "melody-memory":  { "uz": "Ohangni tinglang, so'ng xuddi shunday tugmalarni bosing! Musiqiy xotirani sinang.", "ru": "Послушай мелодию, затем повтори её! Проверь музыкальный слух.", "en": "Listen to the melody, then repeat it! Test your musical ear." },
      "star-catcher":   { "uz": "Tushib kelayotgan yulduzlarni ekranda ushlang! Yulduzlar bilan birga parvoz qiling.", "ru": "Лови падающие звёзды на экране! Лети вместе со звёздами.", "en": "Catch the falling stars on screen! Fly among the stars." },
      "gentle-breath":  { "uz": "Doira kattalashganda nafas oling, kichrayganda chiqaring! To'g'ri nafas olish mashqi.", "ru": "Вдыхай когда круг растёт, выдыхай когда сжимается! Дыши правильно.", "en": "Breathe in as the circle grows, breathe out as it shrinks! Breath right." },
      "focus-flow":     { "uz": "Ko'rsatilgan rangga mos nishonga tegishli rangda bosing! Diqqatingizni yo'qotmang.", "ru": "Нажимай на цель нужного цвета! Не теряй концентрацию.", "en": "Tap the target whose color matches! Don't lose focus." },
      "fruit-merge":    { "uz": "Bir xil mevalarni bir-biriga tegizib kattalashtiring! Mevalarni birlashtirib rekord qo'ying.", "ru": "Соединяй одинаковые фрукты! Создай самый большой фрукт.", "en": "Merge identical fruits together! Create the biggest fruit." },
      "infinite-dash":  { "uz": "Ekran bo'ylab chapga yoki o'ngga surib (swipe) to'siqlardan qoching! Eng uzoq masofaga boring.", "ru": "Свайпай влево или вправо, чтобы обходить преграды! Продержись как можно дольше.", "en": "Swipe left or right to avoid obstacles! Survive as long as you can." },
      "number-path":    { "uz": "1 dan boshlab raqamlarni tartibda ulang! Matematik yo'lni yakunlang.", "ru": "Соединяй числа по порядку начиная с 1! Пройди числовой путь.", "en": "Connect numbers in order starting from 1! Complete the math path." },
      "puzzle-slide":   { "uz": "Qismlarni suring va rasmni to'g'rilang! Klassik pyatnashka o'yini.", "ru": "Двигай части картинки, чтобы собрать её! Классические пятнашки.", "en": "Slide the pieces to complete the picture! Classic slide puzzle." },
      "clock-match":    { "uz": "Soat millarini ko'rib to'g'ri vaqtni tanlang! Soatni o'rganish vaqti keldi.", "ru": "Посмотри на стрелки и выбери время! Пора учить часы.", "en": "Read the clock hands and choose the time! Time to learn the clock." }
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
  let ageFilter = "all";
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
    els.gsFrame.onload = () => {
      if (els.gameLoadingOverlay) els.gameLoadingOverlay.classList.add('hidden');
    };
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
    if (byId("sec-c")) byId("sec-c").textContent = `${visibleGames(filter, ageFilter).length}${t.countSuffix}`;
  }

  function visibleGames(f, af) {
    let list = GAMES;
    if (f && f !== "all") list = list.filter((g) => g.cat.includes(f));
    if (af && af !== "all") {
      const ageNum = parseInt(af, 10);
      list = list.filter((g) => g.age <= ageNum);
    }
    // Family Mode persistent restriction
    if (window.FamilyMode && window.FamilyMode.isActive() && window.FamilyMode.isKidsOnly()) {
      list = list.filter((g) => g.cat.includes('kids'));
    }
    return list;
  }

  function buildGrid(f, af) {
    if (!els.grid) return;
    els.grid.innerHTML = "";
    const list = visibleGames(f, af);
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

    const params = new URLSearchParams({ lang, hg: String(healthGroup), tc: game.tc });
    els.gsTitle.textContent = title;

    if (window.AndroidAdMob?.hideBanner) {
      window.AndroidAdMob.hideBanner();
    } else {
      window.setBannerVisibility?.(false);
    }

    function loadFrame() {
      currentGameId = id;
      els.gs.classList.remove("h");
      if (els.gameLoadingOverlay) {
        const iconEl = els.gameLoadingOverlay.querySelector('.game-icon-anim');
        if (iconEl) iconEl.textContent = game.em;
        els.gameLoadingOverlay.classList.remove("hidden");
        if (els.loadingText) els.loadingText.textContent = ui().loading;
      }
      els.gsFrame.src = `${game.file}?${params.toString()}`;
    }

    if (window.FamilyMode?.onGameOpen(id, game, loadFrame)) return;
    loadFrame();
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
    buildGrid(filter, ageFilter);
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
    buildGrid(filter, ageFilter);

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
    buildGrid(f, ageFilter);
  }
  window.fil = fil;

  function setAgeFilter(af) {
    ageFilter = af;
    document.querySelectorAll(".af-btn").forEach((b) => b.classList.remove("on"));
    byId(`af-${af}`)?.classList.add("on");
    applyTranslations();
    buildGrid(filter, af);
  }
  window.setAgeFilter = setAgeFilter;

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
    resizeTimer = setTimeout(() => buildGrid(filter, ageFilter), 200);
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
    if (els.exitModalYes) {
      els.exitModalYes.onclick = () => {
        if (currentGameId && !els.gs.classList.contains("h")) {
          // In game: close game
          hideGameExitConfirmation();
          closeGame();
        } else {
          // At home: close app
          if (window.AndroidAdMob && window.AndroidAdMob.closeApp) {
            window.AndroidAdMob.closeApp();
          } else {
            // Fallback for browser
            hideGameExitConfirmation();
            showToast("App Exit Simulation");
          }
        }
      };
    }
    if (els.exitModalNo) els.exitModalNo.onclick = hideGameExitConfirmation;
  }

  function hideGameExitConfirmation() {
    els.gameExitModal?.classList.remove("show");
  }

  window.showGameExitConfirmationFromParent = () => {
    const t = ui();
    const isAtHome = !currentGameId || els.gs.classList.contains("h");

    if (els.exitModalMessage) {
      els.exitModalMessage.textContent = isAtHome ? (lang === 'ru' ? 'Выйти из приложения?' : lang === 'en' ? 'Exit application?' : 'Dasturdan chiqmoqchimisiz?') : t.exitGameMessage;
    }
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
      window.setAgeFilter = setAgeFilter;
      window.closeGame = closeGame;
      window.showRev = () => els.lp?.classList.remove("h");
      window.TRANSLATIONS_DATA = TRANSLATIONS_DATA; // Export for FamilyMode

      bindExitModal();
      buildGrid(filter, ageFilter);
    } catch (e) {
      console.error("Init Error", e);
    } finally {
      setTimeout(() => els.ld?.classList.add("h"), 500);
      window.addEventListener("resize", onResize);
    }
  }

  window.addEventListener("DOMContentLoaded", init);
})();
