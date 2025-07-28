<script setup>

import Logo from "@/assets/icons/Logo.vue";
</script>

<template>
<div class="header">
  <Logo/>
  <ul class="navbar">
    <li>Покрытие</li>
    <li>Букмекерам</li>
    <li>Медиа</li>
    <li>Бродкастерам</li>
    <li>Продукты</li>
    <li>Связаться</li>
    <li>EN/RU</li>
  </ul>
</div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25.5px 40px;
  background: #000000B2;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  text-transform: uppercase;
  color: #ffff;
  font-size: 16px;
  font-weight: 500;
  list-style-type: none;
}
</style>