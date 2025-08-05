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
  <div class="dropdown">
    <div class="dropdown__btn active" id="dropdown__btn">
      <input type="checkbox" class="input" />
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul class="dropdown__list ">
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
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transform: translate(-100%, 0px);

  transition: all 0.2s ease 0s;
  opacity: 0;
  pointer-events: none;
}

.dropdown__list.active {
  pointer-events: unset;
  opacity: 1;
  -webkit-transform: translate(0px, 0px);
  -ms-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  -webkit-transition: all 0.8s ease 0.4s;
  -o-transition: all 0.8s ease 0.4s;
  -webkit-transition: all 0.8s ease 0.1s;
  -o-transition: all 0.8s ease 0.1s;
  transition: all 0.8s ease 0.1s;
}

.dropdown__list a {
  text-decoration: none;
  font-size: 0.5em;
  font-weight: 400;
  padding-bottom: 1.6em;
  color: #cbcbcb !important;
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
  height: 7px;
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
  -webkit-transform: rotate(-45deg) translate(-2px, -3px);
  -ms-transform: rotate(-45deg) translate(-2px, -3px);
  transform: rotate(-45deg) translate(-2px, -3px);
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