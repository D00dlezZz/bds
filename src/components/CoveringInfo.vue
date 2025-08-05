<script setup>
import { ref } from 'vue'
import { Carousel, Slide, Navigation as CarouselNavigation } from 'vue3-carousel'

const designations = ref([
  [
    [
      {title: 'Составы', text: 'таблицы, расписание и тп', color: '#F1FCD9'},
      {title: 'Арбитры', text: 'статистика игроков по матчам и турнирам', color: '#F1FCD9'},
      {title: 'Коэфф.', text: 'средние значения команды в турнире', color: '#F1FCD9'},
    ],
    [
      {title: 'Составы', text: 'таблицы, расписание и тп', color: '#F1FCD9'},
      {title: 'Арбитры', text: 'статистика игроков по матчам и турнирам', color: '#F1FCD9'},
      {title: 'Коэфф.', text: 'средние значения команды в турнире', color: '#F1FCD9'},
    ]
  ],
  [
    [
      {title: 'Составы', text: 'таблицы, расписание и тп', color: '#F1FCD9'},
      {title: 'Арбитры', text: 'статистика игроков по матчам и турнирам', color: '#F1FCD9'},
      {title: 'Коэфф.', text: 'средние значения команды в турнире', color: '#F1FCD9'},
    ],
    [
      {title: 'Составы', text: 'таблицы, расписание и тп', color: '#F1FCD9'},
      {title: 'Арбитры', text: 'статистика игроков по матчам и турнирам', color: '#F1FCD9'},
      {title: 'Коэфф.', text: 'средние значения команды в турнире', color: '#F1FCD9'},
    ]
  ]
])

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: false,
  snapAlign: 'center',
  gap: 20
}
</script>

<template>
  <div class="covering-info">
    <h4>ОБОЗНАЧЕНИЯ</h4>
    <Carousel v-bind="carouselConfig">
      <Slide v-for="(column, colIdx) in designations" :key="colIdx">
        <div class="designation-col">
          <div v-for="(test, idx) in column" :key="idx">
            <div v-for="(designation, idx) in test" :key="idx" class="designation">
              <span class="dot" :style="{ background: designation.color }"></span>
              <span class="designation-title">{{ designation.title }}</span>
              <span class="designation-text"> - {{ designation.text }}</span>
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <CarouselNavigation/>
      </template>
    </Carousel>
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

h4 {
  font-size: 24px;
  font-weight: 700;
  color: #F1FCD9;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.designation-col {
  display: flex;
  flex-direction: row;
  gap: 18px;
  min-width: 240px;
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
  margin-top: 8px;
  margin-right: 10px;
  flex-shrink: 0;
}

.designation-title {
  font-weight: 700;
  color: #FFD6A0;
  margin-right: 4px;
  font-size: 16px;
  width: fit-content;
}

.designation-text {
  color: #fff;
  font-weight: 400;
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
</style>
