<script setup>
import {ref, watch} from 'vue';
import Logo from "@/assets/icons/Logo.vue";
const isDropdownOpen = ref(false);


watch(isDropdownOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
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
      <li>RU</li>
    </ul>
    <div class="dropdown">
      <div class="dropdown__btn" @click="isDropdownOpen = !isDropdownOpen">
        <input type="checkbox" class="input" v-model="isDropdownOpen" />
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="dropdown__list" :class="{ active: isDropdownOpen }">
        <li>Покрытие</li>
        <li>Букмекерам</li>
        <li>Медиа</li>
        <li>Бродкастерам</li>
        <li>Продукты</li>
        <li>Связаться</li>
        <li>EN/RU</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25.5px 40px;
  background: #000000B2;
  z-index: 3;
  width: 100%;
  position: fixed;
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

.dropdown {
  display: none;
}

.dropdown__list {
  display: flex;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 81px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  background-color: #030303;
  opacity: 0;
  z-index: 3;
  pointer-events: none;
  height: 100vh;
  list-style-type: none;
  overflow: hidden;
}

.dropdown__list.active {
  pointer-events: unset;
  opacity: 0.8;
}

.dropdown__btn {
  display: block;
  position: relative;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.dropdown__list li {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 500;
  margin: 20px 0;
  opacity: 1;
}
.dropdown__btn input {
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
  -webkit-touch-callout: none;
}

.dropdown__btn span {
  display: block;
  width: 25px;
  height: 2px;
  margin-bottom: 5px;
  position: relative;
  background: #ffffff;
  border-radius: 3px;
  z-index: 2;
  -webkit-transform-origin: 4px 0px;
  -ms-transform-origin: 4px 0px;
  transform-origin: 4px 0px;
  -webkit-transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
  opacity 0.55s ease,
  -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
  opacity 0.55s ease,
  -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  -o-transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
  background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  -webkit-transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
  opacity 0.55s ease,
  -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
  opacity 0.55s ease,
  -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  -webkit-transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease,
  -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  transition: background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease,
  -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
  background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
  background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease,
  -webkit-transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

.dropdown__btn span:first-child {
  -webkit-transform-origin: 0% 0%;
  -ms-transform-origin: 0% 0%;
  transform-origin: 0% 0%;
}

.dropdown__btn span:nth-last-child(2) {
  -webkit-transform-origin: 0% 100%;
  -ms-transform-origin: 0% 100%;
  transform-origin: 0% 100%;
}

.dropdown__btn input:checked ~ span {
  opacity: 1;
  transform: rotate(-45deg) translate(0px, -3px);
  background: #ffffff;
}

.dropdown__btn input:checked ~ span:nth-last-child(2) {
  opacity: 0;
  -webkit-transform: rotate(0deg) scale(0.2, 0.2);
  -ms-transform: rotate(0deg) scale(0.2, 0.2);
  transform: rotate(0deg) scale(0.2, 0.2);
}

.dropdown__btn input:checked ~ span:nth-last-child(3) {
  -webkit-transform: rotate(45deg) translate(0, 0);
  -ms-transform: rotate(45deg) translate(0, 0);
  transform: rotate(45deg) translate(0, 0);
}

@media screen and (max-width: 1100px) {
  .header {
    flex-direction: column;
    position: inherit;
    z-index: 4;
    gap: 50px;
  }
  .navbar {
    flex-direction: column;
  }
}

@media screen and (max-width: 540px) {
  .navbar {
    display: none;
  }
  .dropdown {
    display: block;
  }

  .header {
    flex-direction: row;
  }
}
</style>