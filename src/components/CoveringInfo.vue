<script setup>


import {ref} from "vue";

const designations = ref([
  {
    title:'Матч-центр',
    text: 'таблицы, расписание и тп',
  },
  {
    title:'Матч-центр',
    text: 'таблицы, расписание и тп',
  },
  {
    title:'Матч-центр',
    text: 'таблицы, расписание и тп',
  },
  {
    title:'Матч-центр',
    text: 'таблицы, расписание и тп',
  },
  {
    title:'Матч-центр',
    text: 'таблицы, расписание и тп',
  },
  {
    title:'Матч-центр',
    text: 'таблицы, расписание и тп',
  }
])
</script>

<template>
<div class="covering-info">
  <h4>Обозначения</h4>
  <div class="asf">
    <div v-for="(designation, index) in designations" :key="index" class="designation">
      <div class="designation-title">
        <span class="dot"></span>
        <p>{{designation.title}}</p>
      </div>
      <p> - {{designation.text}}</p>
    </div>
  </div>
</div>
</template>

<style scoped>
.covering-info {
  width: 100%;
  border-left: 2px solid #D3FFE9;
  padding-left: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
}

.asf {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 10px;
  color: white;
}

h4 {
  font-size: 24px;
  font-weight: 700;
  color: #F1FCD9;
  text-transform: uppercase;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FCC8B2;
}

.designation {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 16px;
}

.designation-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #FCC8B2;
}
</style>