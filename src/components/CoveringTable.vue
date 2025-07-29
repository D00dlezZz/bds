<script setup>
import { ref } from 'vue'

const columns = [
  'Матч-центр', 'Таймлайн', 'Составы', 'Стат. игр',
  'Арбитры', 'Коэф.', 'Прогнозы', 'СР. знач.',
  'ОБЗОР. КОНТЕНТ', 'ТРЕНДЫ И СЕРИИ'
]

const countries = ref([
  {
    name: 'Албания',
    flag: 'albania.png',
    open: true,
    leagues: [
      {
        name: '1st Division',
        features: [1,1,1,1,0,0,1,1,0,0]
      },
      {
        name: '2nd Division - Group A',
        features: [1,0,1,0,0,1,0,1,0,1]
      }
    ]
  },
  {
    name: 'Алжир',
    flag: 'algeria.png',
    open: false,
    leagues: [
      {
        name: 'Ligue 1',
        features: [1,1,1,1,1,1,1,0,1,1]
      }
    ]
  }
])

function toggle(country) {
  country.open = !country.open
}
</script>

<template>
  <div class="country-table">
    <table>
      <thead>
      <tr>
        <th>Лига</th>
        <th v-for="(col, idx) in columns" :key="idx">{{ col }}</th>
      </tr>
      </thead>
      <tbody>

      <template v-for="country in countries" :key="country.name">
        <tr class="country-header-row" @click="toggle(country)">
          <td :colspan="columns.length + 1" class="country-header-td">
            <img :src="`/flags/${country.flag}`" class="flag" />
            <span>{{ country.name }}</span>
            <span class="arrow" :class="{ open: country.open }"></span>
          </td>
        </tr>

        <tr v-for="league in country.leagues"
            :key="league.name"
            v-show="country.open">
          <td>{{ league.name }}</td>
          <td v-for="(val, fIdx) in league.features" :key="fIdx">
            <span v-if="val">✔️</span>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.country-table {
  background: #18142d;
  border-radius: 18px;
  color: #fff;
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
.country-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 13px 28px;
  font-weight: bold;
  font-size: 19px;
  background: #221c39;
  border-top: 1px solid #28224a;
  user-select: none;
  transition: background 0.2s;
}
.country-header:hover {
  background: #31295a;
}
.country-header .flag {
  width: 25px; margin-right: 14px;
}
.arrow {
  margin-left: auto;
  border: solid #aaa;
  border-width: 0 3px 3px 0;
  padding: 6px;
  display: inline-block;
  transform: rotate(45deg);
  transition: 0.2s;
}
.arrow.open { transform: rotate(-135deg);}
.league-table table {
  width: 100%;
  border-collapse: collapse;
  background: #18142d;
}
.league-table th,
.league-table td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid #28224a;
}
.league-table th { color: #8afdd3; font-size: 15px; }
.league-table td { font-size: 17px; }
</style>
