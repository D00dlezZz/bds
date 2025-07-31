<script setup>
import AppLayout from "@/components/AppLayout.vue";
import CoveringView from "@/views/CoveringView.vue";
</script>

<template>
  <AppLayout>
    <div class="main-card">
      <CoveringView/>
    </div>
  </AppLayout>
</template>

<style scoped>
.main-card {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
