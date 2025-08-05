<script setup>
import { Carousel, Slide, Navigation as CarouselNavigation } from 'vue3-carousel'
import {ref, computed, defineAsyncComponent, onMounted, onUnmounted, markRaw} from 'vue'
import CountrySelector from "@/components/CountrySelector.vue";
import IconArrow from "@/components/icons/IconArrow.vue";

const sportFilters = ref(
    [
      { id: 1, title: 'Футбол', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconFootball.vue'))) },
      { id: 2, title: 'Хоккей', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconHockey.vue'))) },
      { id: 3, title: 'Баскетбол', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconBasketball.vue'))) },
      { id: 4, title: 'Теннис', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconTennis.vue'))) },
      { id: 5, title: 'Регби', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconRugby.vue'))) },
      { id: 6, title: 'Волейбол', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconVolleyball.vue'))) },
    ]
)

const itemsToShow = 6;
const selectedFilter = ref(sportFilters.value[0]);
const width = ref(window.innerWidth);
const isDropdownOpen = ref(false);

const isMobile = computed(() => width.value <= 540);
const showNavigation = computed(() => sportFilters.value.length > itemsToShow);
const filteredSportFilters = computed(() =>
    sportFilters.value.filter(filter => filter.id !== selectedFilter.value.id)
)

const carouselConfig = {
  itemsToShow,
  wrapAround: false,
  snapAlign: 'center',
  gap: 20
}


const selectFilter = (filter) => selectedFilter.value = filter;

function updateSize() {
  width.value = window.innerWidth;
}

function handleMobileSelectFilter(filter) {
  selectFilter(filter)
  isDropdownOpen.value = false;
}

onMounted(() => {
  window.addEventListener('resize', updateSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSize);
});
</script>

<template>
  <div class="filters-container">
    <Carousel v-if="!isMobile" v-bind="carouselConfig">
      <Slide v-for="slide in sportFilters" :key="slide.id" @click="selectFilter(slide)">
        <div class="carousel__item" :class="selectedFilter.id === slide.id ? 'active' : ''">
          <component :is="slide.iconComponent" />
        </div>
      </Slide>
      <template #addons v-if="showNavigation">
        <CarouselNavigation />
      </template>
    </Carousel>
    <div class="mobile-filter" v-if="isMobile">
      <div class="mobile-filter__selected" @click="isDropdownOpen = !isDropdownOpen">
        <component :is="selectedFilter.iconComponent" class="icon" />
        <span class="title">{{ selectedFilter.title }}</span>
        <IconArrow class="arrow" :class="{ open: isDropdownOpen }"/>
      </div>
      <transition name="dropdown">
        <div class="mobile-filter__dropdown" v-if="isDropdownOpen">
          <div
              v-for="filter in filteredSportFilters"
              :key="filter.id"
              class="mobile-filter__item"
              @click="handleMobileSelectFilter(filter)"
          >
            <component :is="filter.iconComponent" class="dropdown-icon" />
            <span class="title">{{ filter.title }}</span>
          </div>
        </div>
      </transition>
    </div>
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
  --vc-nav-color-hover: #fff;
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

.mobile-filter {
  width: 100%;
  position: relative;
}

.mobile-filter__selected {
  display: flex;
  align-items: center;
  gap: 5px;
  background: url('../assets/filter-background-active.png'),
  linear-gradient(90deg, #413B73 100%, #8C84C7 100%);
  background-repeat: round;
  border-radius: 8px;
  padding: 7px 14px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  position: relative;
  text-transform: uppercase;
}

.icon {
  width: 30px;
  height: 30px;
}

.mobile-filter__selected .arrow {
  margin-left: auto;
  transition: transform 0.2s;
}

.mobile-filter__selected .arrow.open {
  transform: rotate(180deg);
}

.mobile-filter__dropdown {
  background: #18171b;
  margin-top: 8px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
  border: 1px solid #797B8A;
}

.mobile-filter__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  color: #e6e6ea;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}

.dropdown-icon {
  width: 20px;
  height: 20px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media screen and (max-width: 540px){
  .filters-container {
    padding: 0 27px;
    gap: 32px;
  }
}
</style>