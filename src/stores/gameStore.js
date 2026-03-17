import { defineStore } from "pinia";

// Функция для воспроизведения звука
const playSound = (soundName) => {
  try {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Звук не загружен:", e));
  } catch (e) {
    console.log("Ошибка воспроизведения звука");
  }
};

export const useGameStore = defineStore("game", {
  state: () => ({
    gameStarted: false,
    currentLevel: 0,
    score: 0,
    gameFinished: false,
    feedback: "",
    soundEnabled: true,
    musicEnabled: true,
    levels: [
      // Уровень 1
      {
        story: "Бряк: 'Ой! Мои датчики запылились! Найди лишнее число!'",
        question: "3, 6, 9, 12, 15, 17, 18, 21. Какое число лишнее?",
        options: ["12", "17", "21", "9"],
        correct: "17",
      },
      // Уровень 2
      {
        story: "Бряк: 'Ура! Первое задание! Сколько будет 7 × 8?'",
        question: "7 × 8 = ?",
        options: ["42", "56", "63", "48"],
        correct: "56",
      },
      // Уровень 3
      {
        story: "Бряк чихает: 'Апчхи! Сколько насекомых на цветке?'",
        question: "На цветок прилетели 3 бабочки. Сколько насекомых?",
        options: ["3", "5", "8", "0"],
        correct: "3",
      },
      // Уровень 4
      {
        story: "Бряк: 'Первая деталь найдена! Продолжи ряд чисел!'",
        question: "Какое число пропущено в ряду: 2, 4, 6, ?, 10",
        options: ["7", "8", "9", "5"],
        correct: "8",
      },
      // Уровень 5
      {
        story: "Бряк: 'Водяной говорит по-английски! Как будет синий цвет?'",
        question: "Переведи на английский: синий",
        options: ["Red", "Blue", "Green", "Yellow"],
        correct: "Blue",
      },
      // Уровень 6
      {
        story: "Бряк: 'Найди животное, которое квакает!'",
        question: "Как по-английски будет лягушка?",
        options: ["Dog", "Cat", "Frog", "Bird"],
        correct: "Frog",
      },
      // Уровень 7
      {
        story: "Бряк: 'Кто спрятался в слове SHARK?'",
        question: "Переведи слово SHARK",
        options: ["Кот", "Собака", "Акула", "Обезьяна"],
        correct: "Акула",
      },
      // Уровень 8
      {
        story: "Бряк: 'Водяной дал кристалл! Сколько будет Ten + Two?'",
        question: "Ten + Two = ?",
        options: ["7", "12", "10", "8"],
        correct: "12",
      },
      // Уровень 9
      {
        story: "Бряк: 'В пещере темно! Найди два одинаковых смайлика!'",
        question: "Какие два смайлика одинаковые?",
        options: ["😊 и 😢", "😊 и 😊", "😢 и 😡", "😊 и 😡"],
        correct: "😊 и 😊",
      },
      // Уровень 10
      {
        story: "Бряк: 'Разгадай ребус: 7Я'",
        question: "Что означает запись 7Я?",
        options: ["Семья", "Семь Яблок", "Семечки", "Яблоко"],
        correct: "Семья",
      },
      // Уровень 11
      {
        story: "Бряк: 'Найди сколько лет сестрам'",
        question:
          "Сумма возрастов двух сестер — 11 лет. Одна старше другой на 3 года. Сколько лет каждой?",
        options: ["5 и 8 лет.", "3 и 6 лет", "6 и 8 лет", "4 и 7 лет"],
        correct: "4 и 7 лет",
      },
      // Уровень 12
      {
        story: "Бряк: 'Загадка! Что можно увидеть с закрытыми глазами?'",
        question: "Отгадай загадку",
        options: ["Солнце", "Сон", "Книгу", "Телевизор"],
        correct: "Сон",
      },
      // Уровень 13
      {
        story: "Бряк: 'В мастерской много винтиков!'",
        question:
          "В одной коробке 12 винтиков, в другой на 3 больше. Сколько всего винтиков?",
        options: ["15", "27", "24", "18"],
        correct: "27",
      },
      // Уровень 14
      {
        story: "Бряк: 'Найди лишнюю фигуру'",
        question:
          "Какая фигура лишняя: квадрат, круг, треугольник, прямоугольник?",
        options: ["Квадрат", "Круг", "Треугольник", "Прямоугольник"],
        correct: "Круг",
      },
      // Уровень 15
      {
        story: "Бряк: 'Продолжи ряд чисел'",
        question: "Какое следующее число: 1, 3, 5, 7, ... ?",
        options: ["8", "9", "10", "11"],
        correct: "9",
      },
      // Уровень 16
      {
        story: "Бряк: 'Помоги посчитать сдачу!'",
        question: "Торт стоит 40 рублей. Я дал 50 рублей. Сколько сдачи?",
        options: ["20", "5", "10", "90"],
        correct: "10",
      },
      // Уровень 17
      {
        story: "Бряк: 'Пираты проверяют математику!'",
        question: "81 разделить на 9 равно?",
        options: ["7", "8", "9", "6"],
        correct: "9",
      },
      // Уровень 18
      {
        story: "Бряк: 'Расшифруй слово! 1-Д, 2-О, 3-М'",
        question: "Какое слово получится из букв: Д, О, М ?",
        options: ["ДОМ", "МОД", "ОДМ", "ДМО"],
        correct: "ДОМ",
      },
      // Уровень 19
      {
        story: "Бряк: 'Найди отличие в флагах пиратов!'",
        question: "Какой флаг отличается?",
        options: ["Флаг 1", "Флаг 2", "Флаг 3", "Флаг 4"],
        correct: "Флаг 2",
      },
      // Уровень 20
      {
        story: "Бряк: 'ФИНАЛ! Соедини провода правильно!'",
        question:
          "Красный провод соединяется с красным кристаллом. Какой цвет выберешь?",
        options: ["Красный", "Синий", "Зеленый", "Желтый"],
        correct: "Красный",
      },
    ],
  }),

  getters: {
    currentLevelData: (state) => state.levels[state.currentLevel],
    progressPercent: (state) =>
      (state.currentLevel / state.levels.length) * 100,
  },

  actions: {
    // Загружаем сохранение при старте
    loadSave() {
      const saved = localStorage.getItem("bryakSave");
      if (saved) {
        try {
          const data = JSON.parse(saved);
          this.gameStarted = data.gameStarted || false;
          this.currentLevel = data.currentLevel || 0;
          this.score = data.score || 0;
          this.gameFinished = data.gameFinished || false;
          this.soundEnabled =
            data.soundEnabled !== undefined ? data.soundEnabled : true;
          this.musicEnabled =
            data.musicEnabled !== undefined ? data.musicEnabled : true;
          console.log("✅ Загружено сохранение!", data);
        } catch (e) {
          console.log("Ошибка загрузки сохранения");
        }
      }
    },

    // Сохраняем игру
    saveGame() {
      const saveData = {
        gameStarted: this.gameStarted,
        currentLevel: this.currentLevel,
        score: this.score,
        gameFinished: this.gameFinished,
        soundEnabled: this.soundEnabled,
        musicEnabled: this.musicEnabled,
      };
      localStorage.setItem("bryakSave", JSON.stringify(saveData));
      console.log("💾 Игра сохранена!");
    },

    // Сброс сохранения
    resetSave() {
      localStorage.removeItem("bryakSave");
      console.log("🗑️ Сохранение удалено");
    },

    startGame() {
      this.gameStarted = true;
      this.currentLevel = 0;
      this.score = 0;
      this.gameFinished = false;
      this.feedback = "Поехали! 🚀";
      this.saveGame();
      setTimeout(() => (this.feedback = ""), 2000);
    },

    continueGame() {
      this.loadSave();
      this.gameStarted = true;
    },

    checkAnswer(selected) {
      const level = this.levels[this.currentLevel];

      if (selected === level.correct) {
        // Звук правильного ответа
        if (this.soundEnabled) playSound("success");

        this.score += 10;
        this.feedback = "Правильно! +10 энеронов! ✨";

        setTimeout(() => {
          this.feedback = "";
          this.currentLevel++;
          this.saveGame();

          if (this.currentLevel >= this.levels.length) {
            this.gameFinished = true;
            this.saveGame();
            // Звук победы
            if (this.soundEnabled) playSound("win");
          }
        }, 1500);
      } else {
        // Звук неправильного ответа
        if (this.soundEnabled) playSound("wrong");

        this.feedback = "Попробуй ещё! Бряк верит в тебя! 💪";
        setTimeout(() => (this.feedback = ""), 1500);
      }
    },

    // Функция для включения/выключения звука (ОДНА!)
    toggleSound() {
      this.soundEnabled = !this.soundEnabled;
      this.saveGame();
    },

    // Функция для включения/выключения музыки
    toggleMusic() {
      this.musicEnabled = !this.musicEnabled;
      this.saveGame();
    },
  },
});
