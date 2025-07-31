<script setup>


import {ref} from "vue";

const designations = ref([
  [
    { title: 'Матч-центр', text: 'таблицы, расписание и тп', color: '#FFD6A0' },
    { title: 'Стат. игр', text: 'статистика игроков по матчам и турнирам', color: '#FFD6A0' },
    { title: 'Ср. знач.', text: 'средние значения команды в турнире', color: '#FFD6A0' },
  ],
  [
    { title: 'Составы', text: 'таблицы, расписание и тп', color: '#F1FCD9' },
    { title: 'Арбитры', text: 'статистика игроков по матчам и турнирам', color: '#F1FCD9' },
    { title: 'Коэфф.', text: 'средние значения команды в турнире', color: '#F1FCD9' },
  ]
]);
</script>

<template>
  <div class="covering-info">
    <h4>ОБОЗНАЧЕНИЯ</h4>
    <div class="designation-list">
      <div v-for="(column, colIdx) in designations" :key="colIdx" class="designation-col">
        <div v-for="(designation, idx) in column" :key="idx" class="designation">
          <span class="dot" :style="{ background: designation.color }"></span>
          <span class="designation-title">{{ designation.title }}</span>
          <span class="designation-text"> - {{ designation.text }}</span>
        </div>
      </div>
    </div>
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
  font-size: 28px;
  font-weight: 700;
  color: #F1FCD9;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.designation-list {
  display: flex;
  flex-direction: row;
  gap: 64px;
  width: 100%;
}

.designation-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.designation {
  display: flex;
  align-items: flex-start;
  font-size: 18px;
  color: #fff;
  font-weight: 400;
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
}

.designation-text {
  color: #fff;
  font-weight: 400;
}
</style>