<script setup>
import Logo from "@/assets/icons/Logo.vue";
import IconMail from "@/components/icons/IconMail.vue";
</script>

<template>
<div class="footer">
  <div class="footer-wrap">
    <div class="footer-main">
      <Logo/>
      <div class="social">
        <IconMail/>
      </div>
    </div>
    <div class="info">
      <p class="ref">© 2025   bigdata.sports</p>
      <button>запросить демо</button>
    </div>
  </div>
</div>
</template>

<style scoped>
.footer {
  background: #302A50;
  z-index: 5;
  padding: 32px;
}

.footer-wrap {
  max-width: 1100px;
  margin: 0 auto;
}
.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 80px;
  border-bottom: 1px solid #B5B5B7;
}

.social {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
}

.ref {
  color: #B5B5B7;
  font-size: 14px;
}

button {
  background: linear-gradient(90deg,#69A1A2, #D8B782);
  font-size: 12px;
  color: black;
  padding: 10px 16px;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
}
</style>