<template>
  <div style="display: none"></div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // Определяем базовый путь в зависимости от окружения
  const basePath =
    window.location.hostname === "localhost" ? "" : "/bryak-quest";

  // Создаем аудио с правильным путем
  const audio = new Audio(`${basePath}/sounds/background.mp3`);
  audio.loop = true;
  audio.volume = 0.3;

  // Пробуем играть
  audio
    .play()
    .then(() => console.log("✅ Музыка играет!"))
    .catch((err) => {
      console.log("❌ Ошибка:", err);
      console.log("Путь:", audio.src);
    });
});
</script>
