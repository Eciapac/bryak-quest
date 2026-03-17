<template>
  <div class="bryak-container">
    <div class="bryak-box" :class="{ speaking: isSpeaking }">
      <div class="bryak-avatar" :class="{ animate: store.feedback }">🤖</div>
      <div class="speech-bubble">
        {{ currentMessage }}
        <div v-if="store.feedback" class="feedback-effect">
          {{ store.feedback.includes("Правильно") ? "✅" : "🤔" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();

const currentMessage = computed(() => {
  if (store.feedback) return store.feedback;
  if (store.gameFinished) return "Спасибо, что спас меня! 🚀";
  if (store.gameStarted) {
    const level = store.levels[store.currentLevel];
    return level?.story || "Помоги мне!";
  }
  return "Привет! Я Бряк!";
});

const isSpeaking = computed(() => !!store.feedback);
</script>

<style scoped>
.bryak-container {
  margin: 20px 0;
}

.bryak-box {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #2f1b4b;
  border-radius: 80px 80px 30px 80px;
  border: 4px solid #ffb347;
  padding: 20px;
  box-shadow: 0 10px 0 #6b3f9b;
  transition: 0.3s;
}

.bryak-box.speaking {
  border-color: #76ff76;
  box-shadow:
    0 0 30px #76ff76,
    0 10px 0 #6b3f9b;
}

.bryak-avatar {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, #ddd, #aaccdd);
  border-radius: 50%;
  border: 5px solid #ffaa22;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  box-shadow: 0 6px 0 #777;
}

.bryak-avatar.animate {
  transform: scale(1.1);
  transition: 0.2s;
}

.speech-bubble {
  flex: 1;
  background: white;
  color: black;
  padding: 20px 30px;
  border-radius: 40px 40px 40px 5px;
  font-size: 24px;
  border: 4px solid #ffaa00;
  box-shadow: 0 5px 0 #bb7700;
  position: relative;
  min-height: 80px;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.feedback-effect {
  position: absolute;
  right: 20px;
  top: -10px;
  font-size: 40px;
}
</style>
