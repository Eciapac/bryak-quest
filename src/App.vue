<template>
  <div class="app">
    <!-- КНОПКИ УПРАВЛЕНИЯ -->
    <div class="controls">
      <button
        class="control-btn"
        @click="store.toggleSound()"
        :title="store.soundEnabled ? 'Выключить звук' : 'Включить звук'"
      >
        {{ store.soundEnabled ? "🔊" : "🔇" }}
      </button>
      <button
        class="control-btn"
        @click="store.toggleMusic()"
        :title="store.musicEnabled ? 'Выключить музыку' : 'Включить музыку'"
      >
        {{ store.musicEnabled ? "🎵" : "🔈" }}
      </button>
      <button
        v-if="hasSave && !store.gameStarted"
        class="control-btn"
        @click="continueGame"
        title="Продолжить игру"
      >
        ⏯️
      </button>
      <button
        v-if="hasSave"
        class="control-btn"
        @click="resetSave"
        title="Новая игра"
      >
        🔄
      </button>
    </div>

    <!-- Фоновая музыка -->
    <BackgroundMusic />

    <!-- СТАРТОВЫЙ ЭКРАН -->
    <div v-if="!store.gameStarted && !store.gameFinished" class="start-screen">
      <BryakCharacter />
      <h1>🚀 Миссия: Спасти Бряка</h1>

      <div class="start-buttons">
        <button class="start-btn" @click="startNewGame">🆕 Новая игра</button>
        <button v-if="hasSave" class="continue-btn" @click="continueGame">
          ⏯️ Продолжить (ур. {{ savedLevel + 1 }})
        </button>
      </div>
    </div>

    <!-- ОСНОВНАЯ ИГРА -->
    <div v-else-if="!store.gameFinished" class="game-container">
      <StatusBar />

      <!-- ПОЛОСКА ПРОГРЕССА -->
      <div class="progress-section">
        <div class="progress-label">
          <span>Починка Бряка</span>
          <span>{{ Math.floor(store.progressPercent) }}%</span>
        </div>
        <div class="progress-bar-bg">
          <div
            class="progress-fill"
            :style="{ width: store.progressPercent + '%' }"
          ></div>
        </div>
      </div>

      <BryakCharacter />

      <div class="task">
        <h2>{{ store.levels[store.currentLevel]?.question }}</h2>
        <div class="options">
          <button
            v-for="opt in store.levels[store.currentLevel]?.options"
            :key="opt"
            @click="store.checkAnswer(opt)"
            :disabled="store.feedback !== ''"
          >
            {{ opt }}
          </button>
        </div>
      </div>
    </div>

    <!-- ЭКРАН ПОБЕДЫ -->
    <div v-else class="victory-screen">
      <div class="victory-animation">
        <span class="victory-icon">🏆</span>
        <span class="victory-icon">✨</span>
        <span class="victory-icon">🚀</span>
      </div>
      <h1>🎉 БРЯК СПАСЁН! 🎉</h1>

      <div class="victory-score">⚡ {{ store.score }} энеронов</div>

      <p class="thanks">Спасибо, друг! Планета Механика благодарит тебя!</p>

      <button class="restart-btn" @click="startNewGame">🎮 Сыграть ещё</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useGameStore } from "./stores/gameStore";
import BryakCharacter from "./components/BryakCharacter.vue";
import StatusBar from "./components/StatusBar.vue";
import BackgroundMusic from "./components/BackgroundMusic.vue";

const store = useGameStore();

// Проверяем, есть ли сохранение
const hasSave = computed(() => {
  const save = localStorage.getItem("bryakSave");
  if (save) {
    try {
      const data = JSON.parse(save);
      return data.gameStarted && !data.gameFinished;
    } catch {
      return false;
    }
  }
  return false;
});

// Какой уровень сохранен
const savedLevel = computed(() => {
  const save = localStorage.getItem("bryakSave");
  if (save) {
    try {
      const data = JSON.parse(save);
      return data.currentLevel || 0;
    } catch {
      return 0;
    }
  }
  return 0;
});

// Загружаем сохранение при старте
onMounted(() => {
  store.loadSave();
});

const continueGame = () => {
  store.continueGame();
};

const resetSave = () => {
  if (confirm("Начать новую игру? Весь прогресс будет потерян!")) {
    store.resetSave();
    store.startGame();
  }
};

const startNewGame = () => {
  store.resetSave();
  store.startGame();
};
</script>

<style>
body {
  background: linear-gradient(135deg, #0b0d2e, #1a1f4a);
  margin: 0;
  padding: 20px;
  font-family: "Comic Sans MS", "Arial Rounded", sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  max-width: 800px;
  width: 100%;
  position: relative;
}

.start-screen,
.game-container,
.victory-screen {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 60px;
  border: 4px solid #ffaa00;
  padding: 30px;
  text-align: center;
}

h1 {
  color: white;
  font-size: 48px;
  margin: 20px 0;
  text-shadow: 3px 3px 0 #ff5500;
}

h2 {
  color: white;
  font-size: 28px;
  margin-bottom: 30px;
}

.start-btn,
.restart-btn {
  background: #40ff9c;
  font-size: 48px;
  padding: 20px 60px;
  border-radius: 80px;
  border: 5px solid white;
  box-shadow: 0 10px 0 #00aa55;
  cursor: pointer;
  font-weight: bold;
  margin: 20px;
  transition: 0.1s;
}

.start-btn:active,
.restart-btn:active {
  transform: translateY(8px);
  box-shadow: 0 2px 0 #00aa55;
}

.task {
  background: #45277a;
  border-radius: 50px;
  padding: 30px;
  border: 4px solid #ffb224;
  margin-top: 20px;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.options button {
  background: #fedb82;
  font-size: 32px;
  padding: 15px 35px;
  border-radius: 50px;
  border: 3px solid white;
  box-shadow: 0 5px 0 #b16400;
  cursor: pointer;
  transition: 0.1s;
  font-weight: bold;
}

.options button:active:not(:disabled) {
  transform: translateY(4px);
  box-shadow: 0 1px 0 #b16400;
}

.options button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* СТИЛИ ДЛЯ ПРОГРЕССА */
.progress-section {
  margin: 20px 0;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 18px;
  margin-bottom: 5px;
  text-shadow: 2px 2px 0 #2b0f4a;
}

.progress-bar-bg {
  background-color: #44446a;
  height: 25px;
  border-radius: 30px;
  border: 3px solid white;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, #76ff76, #c0ff00);
  height: 100%;
  transition: width 0.4s ease;
  box-shadow: 0 0 15px #aaff00;
}

/* СТИЛИ ДЛЯ ПОБЕДЫ */
.victory-screen {
  text-align: center;
  padding: 40px;
}

.victory-animation {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
}

.victory-icon {
  font-size: 80px;
  animation: victoryBounce 1s infinite;
}

.victory-icon:nth-child(1) {
  animation-delay: 0s;
}
.victory-icon:nth-child(2) {
  animation-delay: 0.2s;
}
.victory-icon:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes victoryBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

.victory-score {
  background: #ffd966;
  color: #3a0ca3;
  font-size: 40px;
  padding: 15px 40px;
  border-radius: 80px;
  border: 4px solid white;
  box-shadow: 0 8px 0 #b86b00;
  display: inline-block;
  margin: 30px auto;
  font-weight: bold;
}

.thanks {
  color: #ffd966;
  font-size: 28px;
  margin: 30px 0;
  font-style: italic;
  text-shadow: 2px 2px 0 #3a0ca3;
}

/* КНОПКИ УПРАВЛЕНИЯ */
.controls {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.control-btn {
  background: #2a1e4a;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #ffaa00;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 0 #6b3f9b;
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.control-btn:active {
  transform: translateY(4px);
  box-shadow: 0 0px 0 #6b3f9b;
}

.control-btn:hover {
  background: #3a2e5a;
}

/* СТАРТОВЫЕ КНОПКИ */
.start-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.continue-btn {
  background: #ffaa00;
  font-size: 36px;
  padding: 20px 40px;
  border-radius: 80px;
  border: 5px solid white;
  box-shadow: 0 10px 0 #b16400;
  cursor: pointer;
  font-weight: bold;
  transition: 0.1s;
  color: #1f043a;
}

.continue-btn:active {
  transform: translateY(8px);
  box-shadow: 0 2px 0 #b16400;
}

.continue-btn:hover {
  background: #ffbb22;
}
</style>
