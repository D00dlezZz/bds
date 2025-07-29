<script setup>
import { Carousel, Slide, Navigation as CarouselNavigation } from 'vue3-carousel'
import {ref, computed, defineAsyncComponent, shallowRef} from 'vue'
import CountrySelector from "@/components/CountrySelector.vue";

const sportFilters = shallowRef([
  { id: 1, title: 'Футбол', iconComponent: defineAsyncComponent(() => import('./icons/IconFootball.vue')) },
  { id: 2, title: 'Хоккей', iconComponent: defineAsyncComponent(() => import('./icons/IconHockey.vue')) },
  { id: 3, title: 'Баскетбол', iconComponent: defineAsyncComponent(() => import('./icons/IconBasketball.vue')) },
  { id: 4, title: 'Теннис', iconComponent: defineAsyncComponent(() => import('./icons/IconTennis.vue')) },
  { id: 5, title: 'Регби', iconComponent: defineAsyncComponent(() => import('./icons/IconRugby.vue')) },
  { id: 6, title: 'Волейбол', iconComponent: defineAsyncComponent(() => import('./icons/IconVolleyball.vue')) },
]);

const itemsToShow = 6;
const selectedFilter = ref(sportFilters.value[0]);

const showNavigation = computed(() => sportFilters.value.length > itemsToShow)

const carouselConfig = {
  itemsToShow,
  wrapAround: false,
  snapAlign: 'center',
  gap: 20
}

const selectFilter = (filter) => selectedFilter.value = filter;
</script>

<template>
  <div class="filters-container">
    <Carousel v-bind="carouselConfig">
      <Slide v-for="slide in sportFilters" :key="slide.id" @click="selectFilter(slide)">
        <div class="carousel__item" :class="selectedFilter.id === slide.id ? 'active' : ''">
          <component :is="slide.iconComponent" />
        </div>
      </Slide>
      <template #addons v-if="showNavigation">
        <CarouselNavigation />
      </template>
    </Carousel>
    <CountrySelector/>
  </div>
</template>

<style scoped>
.filters-container {
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
}

.carousel {
  --vc-nav-color: #fff;
  --vc-nav-color-hover: #00fff7;
  --vc-nav-background: none;
  --vc-nav-border-radius: 12px;
  --vc-nav-width: 44px;
  --vc-nav-height: 44px;
  --vc-nav-box-shadow: none;
  --vc-nav-icon-size: 24px;
}

.carousel__next, .carousel__prev {
  filter: drop-shadow(0 0 5px #242130);
  top: 50%;
  transform: translateY(-50%);
}

.carousel__prev {
  left: -55px;
}
.carousel__next {
  right: -55px;
}


.carousel__item {
  border-radius: 4px;
  min-width: 130px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #B5B5B7;
  background: url('../assets/filter-background.png') #33234A no-repeat;
  background-size: contain;
  border: 1px solid #33234A;
  cursor: pointer;
  transition: all;
}
.active {
  border: 2px solid red;
  background: url('../assets/filter-background-active.png'),
  linear-gradient(90deg, #413B73 100%, #8C84C7 100%);
  background-repeat: no-repeat;
  color: white;
}
</style>