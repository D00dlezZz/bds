<script setup>
import { Carousel, Slide, Navigation as CarouselNavigation } from 'vue3-carousel'
import {ref, computed, defineAsyncComponent, onMounted, markRaw} from 'vue'
import {mainStore} from "@/store/main.js";
import { storeToRefs } from 'pinia';
import CountrySelector from "@/components/CountrySelector.vue";
import IconArrow from "@/components/icons/IconArrow.vue";

defineProps({
  isMobile: false,
});

const { selectedFilters } = storeToRefs(mainStore())

const sportFilters = ref(
    [
      { id: 1, title: 'Футбол', value: 'football', status: 'active', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconFootball.vue'))) },
      { id: 2, title: 'Хоккей', value: 'hockey', status: 'active', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconHockey.vue'))) },
      { id: 3, title: 'Баскетбол', value: 'basket', status: 'active', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconBasketball.vue'))) },
      { id: 4, title: 'Теннис', value: 'tennis', status: 'coming_soon', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconTennis.vue'))) },
      { id: 5, title: 'MMA', value: 'mma', status: 'coming_soon', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconMMA.vue'))) },
      { id: 6, title: 'Регби', value: 'rugby', status: 'coming_soon', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconRugby.vue'))) },
      { id: 7, title: 'Волейбол', value: 'volleyball', status: 'coming_soon', iconComponent: markRaw(defineAsyncComponent(() => import('./icons/IconVolleyball.vue'))) },
    ]
)

const itemsToShow = ref(6);
const isDropdownOpen = ref(false);

const showNavigation = computed(() => sportFilters.value.length > itemsToShow.value);
const filteredSportFilters = computed(() => {
  return  sportFilters.value.filter(filter => filter.id !== selectedFilters.value.sport.id)
})

const carouselConfig = {
  itemsToShow: 6,
  itemsToScroll: 6,
  wrapAround: false,
  snapAlign: 'center',
  gap: 20,
  mouseDrag: false,
  breakpointMode: 'viewport'
}


const selectFilter = async (filter) => {
  if (selectedFilters.value.sport.value == filter.value) return;
  selectedFilters.value.sport = filter;
  if (filter.status === 'coming_soon') {
    // Clear coverage for coming soon sports
    mainStore().coverage = [];
    return;
  }
  await mainStore().fetchCoverage()
};

function handleMobileSelectFilter(filter) {
  selectFilter(filter)
  isDropdownOpen.value = false;
}

onMounted(async () => {
  await mainStore().fetchCountries();
  selectedFilters.value.sport = sportFilters.value[0];
  await mainStore().fetchCoverage()
})
</script>

<template>
  <div class="filters-container">
    <div class="filters-carousel">
      <Carousel v-if="!isMobile" v-bind="carouselConfig" >
        <Slide v-for="slide in sportFilters" :key="slide.id" @click="selectFilter(slide)">
          <div class="carousel__item" :class="selectedFilters.sport.id === slide.id ? 'active' : 'disabled'">
            <component :is="slide.iconComponent" />
          </div>
        </Slide>
        <template #addons v-if="showNavigation">
          <CarouselNavigation />
        </template>
      </Carousel>
    </div>
    <div class="mobile-filter" v-if="isMobile">
      <div class="mobile-filter__selected" @click="isDropdownOpen = !isDropdownOpen">
        <component :is="selectedFilters.sport.iconComponent" class="icon" />
        <span class="title">{{ selectedFilters.sport.title }}</span>
        <IconArrow class="arrow" :class="{ open: isDropdownOpen }"/>
      </div>
      <transition name="dropdown">
        <div class="mobile-filter__dropdown" v-if="isDropdownOpen">
          <div
              v-for="filter in filteredSportFilters"
              :key="filter.id"
              class="mobile-filter__item"
              :class="selectedFilters.sport.id === filter.id ? '' : 'disabled'"
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
.filters-carousel {
  width: 100%;
  overflow: hidden;
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


::v-deep .carousel__prev {
  margin-left: 95%;
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
  padding: 12px 0;
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


.disabled {
  opacity: 0.5;
}
@media screen and (max-width: 540px){
  .filters-container {
    gap: 32px;
    padding: 20px 0 0 0;
  }
}

</style>