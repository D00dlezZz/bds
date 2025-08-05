<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="base-layout">
    <div class="background-area">
      <div class="bg-image"></div>
      <Header />
      <div class="main-content">
        <slot />
      </div>
      <Footer/>
    </div>
  </div>
</template>


<style scoped>
.base-layout {
  min-height: 100vh;
  width: 100vw;
  background: #000;
}

.background-area {
  width: 100%;
  min-height: 100vh;
  position: relative;
  max-width: 100%;
  margin: 0 auto;
}

.bg-image {
  position: absolute;
  height: 100vh;
  inset: 0;
  z-index: 0;
  background:
      linear-gradient(
          to bottom,
          rgba(0,0,0,0) 60%,
          rgba(11,10,15,0.92) 88%,
          #000 100%
      ),
      url('../assets/background.png') center/cover no-repeat;
  opacity: 0.6;
  top: 0;
  left: 0;
}


.main-content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 896px;
  padding-top: 211px;
  padding-bottom: 100px;
  min-height: 0;
}

@media screen and (max-width: 540px) {
  .main-content {
    padding-top: 64px;
  }
}
</style>