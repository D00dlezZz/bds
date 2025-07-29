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
  background: #0B0A0F;
  width: 100%;
}

table {
  width: 100%;
  border-spacing: 0;
  color: #D3FFE9;
}

thead {
  background: #0B0A0F;
  font-size: 10px;
}

th{
  padding: 7px 6px;
  text-align: center;
  vertical-align: middle;
}

.country-header-td {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  color: #fff;
  font-weight: bold;
  font-size: 19px;
  position: relative;
  background: #1A1824;
  padding: 20px 18px;
}

.country-title {
  flex: 0 0 auto;
}

.league-col {
  border-right: 1px solid #232030;
}
</style>
