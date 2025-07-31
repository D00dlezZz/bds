<script setup>
import {ref} from 'vue'
import IconDone from "@/components/icons/IconDone.vue"
import IconArrow from "@/components/icons/IconArrow.vue";

const columns = [
  'Матч-центр', 'Тайм<br>лайн', 'Составы', 'Стат. игр',
  'Арбитры', 'Коэф.', 'Прогнозы', 'СР. знач.',
  'Обог. контент', 'Тренды и серии'
]

const countries = ref([
  {
    name: 'Албания',
    code: 'al',
    open: true,
    leagues: [
      {name: '1st Division', features: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0]},
      {name: '2nd Division - Group A', features: [1, 1, 0, 0, 0, 1, 0, 1, 1, 0]},
      {name: '3nd Division - Group A', features: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1]},
    ]
  },
  {
    name: 'Россия',
    code: 'ru',
    open: true,
    leagues: [
      {name: '1st Division', features: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0]},
      {name: '2nd Division - Group A', features: [1, 1, 0, 0, 0, 1, 0, 1, 1, 0]},
      {name: '3nd Division - Group A', features: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1]},
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
        <th class="league-col"></th>
        <th v-for="(col, idx) in columns" :key="idx">
          <span v-html="col"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="country in countries" :key="country.name">
        <tr @click="toggle(country)">
          <td class="country-header-td" :colspan="columns.length + 1">
            <IconArrow :class="{ open: country.open }"/>
            <i class="flag" :class="[`flag-${country.code}`]"></i>
            <span class="country-title">{{ country.name }}</span>
          </td>
        </tr>
        <tr
            v-for="league in country.leagues"
            :key="league.name"
            v-show="country.open"
            class="league-row"
        >
          <td class="league-col">{{ league.name }}</td>
          <td
              v-for="(val, fIdx) in league.features"
              :key="fIdx"
              class="feature-cell"
          >
            <IconDone v-if="val"/>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
.country-table {
  background: transparent;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
}

table {
  width: 100%;
  border-spacing: 0;
  color: #fff;
  font-size: 16px;
  background: transparent;
}

thead {
  background: #181624;
  font-size: 13px;
}

th {
  padding: 16px 8px;
  text-align: center;
  vertical-align: middle;
  color: #D3FFE9;
  font-weight: 700;
  border-bottom: 1px solid #232030;
  letter-spacing: 0.02em;
}

.country-header-td {
  align-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  position: relative;
  background: #232030;
  padding-left: 18px;
  padding-right: 18px;
  border-bottom: 1px solid #232030;
  border-top: 1px solid #232030;
  cursor: pointer;
  transition: background 0.2s;
}

.country-header-td:hover {
  background: #29263a;
}

.country-title {
  flex: 0 0 auto;
  font-weight: 700;
  font-size: 20px;
}

.league-row {
  background: #181624;
  transition: background 0.2s;
}

.league-row:nth-child(even) {
  background: #232030;
}

.league-col {
  border-right: 1px solid #232030;
  color: #fff;
  font-weight: 400;
  padding: 14px 12px;
  min-width: 160px;
  background: transparent;
}

.feature-cell {
  text-align: center;
  vertical-align: middle;
  padding: 0 8px;
  min-width: 48px;
}

.feature-cell svg {
  width: 22px;
  height: 22px;
  color: #B6FFE0;
  display: inline-block;
}

.flag {
  width: 28px;
  height: 20px;
  display: inline-block;
  background-size: cover;
  border-radius: 3px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.12);
  margin-right: 8px;
}

.open {
  transform: rotate(90deg);
  transition: transform 0.2s;
}

</style>
