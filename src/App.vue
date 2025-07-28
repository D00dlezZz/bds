<script setup>
import AppLayout from "@/components/AppLayout.vue";
import CoveringView from "@/views/CoveringView.vue";
</script>

<template>
  <AppLayout>
    <div class="main-container">
      <CoveringView/>
    </div>
  </AppLayout>
</template>

<style scoped>
.main-container {
  height: 100vh;
}
</style>
