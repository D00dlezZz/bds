<script setup>
import {computed, ref} from 'vue'
import { Carousel, Slide, Navigation as CarouselNavigation } from 'vue3-carousel';

defineProps({
  isMobile: true
})

const designations = ref([
  { title: 'Матч-центр', text: 'таблицы, расписание и тп' },
  { title: 'Стат. игр', text: 'статистика игроков по матчам и турнирам' },
  { title: 'Ср. знач.', text: 'средние значения команды в турнире' },
  { title: 'Составы', text: 'таблицы, расписание и тп' },
  { title: 'Арбитры', text: 'статистика игроков по матчам и турнирам' },
  { title: 'Коэфф.', text: 'средние значения команды в турнире' },
  { title: 'Прогнозы', text: 'средние значения команды в турнире' },
  { title: 'СР. знач.', text: 'средние значения команды в турнире' },
  { title: 'Обог. контент', text: 'средние значения команды в турнире' },
  { title: 'Тренды и серии.', text: 'средние значения команды в турнире' },
]);

const normalizedDesignations = ref(chunkArray(
    designations.value,
    6
));

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: false,
  snapAlign: 'center',
  gap: 20,
  mouseDrag: false,
}


const showAll = ref(false);

const displayedDesignations = computed(() =>
    showAll.value ? designations.value : designations.value.slice(0, 3)
);

function toggleShowAll() {
  showAll.value = !showAll.value;
}

function chunkArray(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}
</script>

<template>
<div class="covering-info-wrap">
  <div class="covering-info">
    <h4>ОБОЗНАЧЕНИЯ</h4>
    <Carousel v-bind="carouselConfig" v-if="!isMobile">
      <Slide v-for="(block, blockIdx) in normalizedDesignations" :key="blockIdx">
        <div class="designation-col">
          <div v-for="(designation, idx) in block" :key="idx" class="designation">
            <span class="dot"></span>
            <p class="designation-title">
              {{ designation.title }}
              <span class="designation-text"> - {{ designation.text }}</span>
            </p>
          </div>
        </div>
      </Slide>
      <template #addons>
        <CarouselNavigation/>
      </template>
    </Carousel>
    <div v-if="isMobile">
      <ul class="designation-list">
        <li v-for="(item, idx) in displayedDesignations" :key="idx" class="designation">
          <span class="dot"></span>
          <span>
          <span class="designation-title">{{ item.title }}</span>
          <span class="designation-text"> - {{ item.text }}</span>
        </span>
        </li>
      </ul>
    </div>
  </div>
  <button
      class="show-more-btn"
      v-if="!showAll && isMobile"
      @click="toggleShowAll"
  >
    ПОКАЗАТЬ ВСЕ
  </button>
  <button
      class="show-more-btn"
      v-if="showAll && isMobile"
      @click="toggleShowAll"
  >
    СКРЫТЬ
  </button>
</div>
</template>

<style scoped>
.covering-info {
  width: 100%;
  border-left: 3px solid #D3FFE9;
  padding-left: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
  margin-bottom: 32px;
}

.carousel__slide {
  justify-content: flex-start;
}

h4 {
  font-size: 24px;
  font-weight: 700;
  color: #F1FCD9;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.designation-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  min-width: 240px;
  max-width: 794px;
}

.designation {
  display: flex;
  align-items: flex-start;
  color: #fff;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
  margin-right: 10px;
  flex-shrink: 0;
  background: #F1FCD9;
}

.designation-title {
  font-weight: 700;
  color: #FFD6A0;
  font-size: 16px;
  width: fit-content;
}

.designation-text {
  color: #fff;
  font-weight: 400;
}

.carousel {
  --vc-nav-color: #fff;
  --vc-nav-color-hover: #fff;
  --vc-nav-background: none;
  --vc-nav-border-radius: 12px;
  --vc-nav-width: 44px;
  --vc-nav-height: 44px;
  --vc-nav-box-shadow: none;
  --vc-nav-icon-size: 24px;
}

:global(.carousel__prev) {
  margin-left: 95%;
}

.designation-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
}

button {
  background: linear-gradient(90deg,#69A1A2, #D8B782);
  font-size: 16px;
  color: black;
  padding: 12px 44px;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
}

@media screen and (max-width: 540px){
  h4 {
    margin-bottom: 0;
    font-size: 24px;
  }

  .covering-info {
    gap: 24px;
    padding-left: 24px;
  }
}

</style>
