<template>
  <div class="status-bar">
    <div class="score">
      <span class="score-icon">⚡</span>
      <span class="score-value">{{ store.score }}</span>
    </div>

    <div class="crystals-container">
      <div
        v-for="i in 5"
        :key="i"
        class="crystal"
        :class="{ active: i <= crystalCount }"
      >
        <span v-if="i <= crystalCount">💎</span>
        <span v-else>⚪</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();

// Каждые 4 уровня - новый кристалл
const crystalCount = computed(() => {
  return Math.floor(store.currentLevel / 4) + (store.gameFinished ? 1 : 0);
});
</script>

<style scoped>
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2a1e4a;
  padding: 12px 25px;
  border-radius: 60px;
  border: 3px solid #b87cff;
  box-shadow: 0 5px 0 #4a2e7a;
  margin-bottom: 20px;
}

.score {
  background: #ffd966;
  color: #3a0ca3;
  padding: 8px 25px;
  border-radius: 40px;
  font-size: 28px;
  font-weight: bold;
  border: 3px solid white;
  box-shadow: 0 4px 0 #b86b00;
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-icon {
  font-size: 32px;
}

.crystals-container {
  display: flex;
  gap: 8px;
}

.crystal {
  width: 45px;
  height: 45px;
  background-color: #5a5a8a;
  border-radius: 12px 4px 12px 4px;
  border: 3px solid white;
  box-shadow: 0 4px 0 #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transition: all 0.3s ease;
}

.crystal.active {
  background: linear-gradient(145deg, #ff44aa, #ffaa00);
  box-shadow:
    0 0 15px #ffaa00,
    0 4px 0 #aa5500;
  border-color: #ffffaa;
  transform: scale(1.05);
}
</style>
