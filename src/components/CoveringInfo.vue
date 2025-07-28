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
  }
])
</script>

<template>
<div class="covering-info">
  <h4>Обозначения</h4>
  <div>
    <div v-for="(designation, index) in designations" :key="index">
      <span> <p>{{designation.title}}</p></span> -
      <p>{{designation.text}}</p>
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

h4 {
  font-size: 24px;
  font-weight: 700;
  color: #F1FCD9;
  text-transform: uppercase;
}
</style>