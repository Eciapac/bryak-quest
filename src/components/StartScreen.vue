<template>
  <div class="start-screen">
    <h1>🚀 Миссия: Спасти Бряка</h1>
    <button class="start-btn" @click="startGame">СТАРТ</button>
  </div>
</template>

<script setup>
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();
</script>

<style scoped>
.start-screen {
  text-align: center;
  padding: 50px;
  background: #2a1e4a;
  border-radius: 40px;
  border: 4px solid #ffaa00;
}
h1 {
  color: white;
  font-size: 48px;
  margin-bottom: 30px;
}
.start-btn {
  background: #40ff9c;
  font-size: 36px;
  padding: 20px 60px;
  border-radius: 80px;
  border: 4px solid white;
  cursor: pointer;
}
</style>
