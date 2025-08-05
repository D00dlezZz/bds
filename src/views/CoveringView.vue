<script setup>
import CoveringInfo from "@/components/CoveringInfo.vue";
import CoveringFilters from "@/components/CoveringFilters.vue";
import CoveringTable from "@/components/CoveringTable.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";

const width = ref(window.innerWidth);
const isMobile = computed(() => width.value <= 540);

function updateSize() {
  width.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener('resize', updateSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSize);
});
</script>

<template>
    <div class="covering-info">
      <h1>Покрытие</h1>
      <CoveringInfo :is-mobile="isMobile"/>
      <CoveringFilters :is-mobile="isMobile"/>
    </div>
  <CoveringTable :is-mobile="isMobile"/>
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

@media screen and (max-width: 540px) {
  .covering-info {
    padding: 0 27px;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 32px;
  }
}
</style>