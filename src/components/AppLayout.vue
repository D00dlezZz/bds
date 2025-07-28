<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
<div class="base-layout">
  <Header/>
    <slot/>
  <Footer/>
</div>
</template>

<style scoped>
.base-layout {
  width: 100%;
  height: 100%;
  background: #0000001A;
}
</style>