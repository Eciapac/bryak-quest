<template>
  <button @click="testClick" style="font-size: 30px; padding: 20px">
    ТЕСТОВАЯ КНОПКА
  </button>
</template>

<script setup>
const testClick = () => {
  console.log("КНОПКА РАБОТАЕТ!");
  alert("Кнопка нажата!");
};
</script>
