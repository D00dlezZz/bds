<script setup>

import CoveringInfo from "@/components/CoveringInfo.vue";
import CoveringFilters from "@/components/CoveringFilters.vue";
import CoveringTable from "@/components/CoveringTable.vue";
</script>

<template>
  <div>
    <div class="covering-info">
      <h1>Покрытие</h1>
      <CoveringInfo/>
      <CoveringFilters/>
      <CoveringTable/>
    </div>
  </div>
</template>

<style scoped>
.covering-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
}

h1 {
  color: white;
  font-size: 46px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 64px;
}
</style>