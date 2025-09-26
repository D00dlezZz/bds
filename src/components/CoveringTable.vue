<script setup>
import {mainStore} from "@/store/main.js";
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import IconDone from "@/components/icons/IconDone.vue"
import IconArrow from "@/components/icons/IconArrow.vue";
import IconTab from "@/components/icons/IconTab.vue";

defineProps({
  isMobile: true
})

const {coverage, selectedFilters} = storeToRefs(mainStore());

const allColumns = [
  {
    title: "Матч-центр",
    value: 'match_center'
  },
  {
    title: 'Тайм<br>лайн',
    value: 'timeline'
  },
  {
    title: "Составы",
    value: "players"
  },
  {
   title: 'Стат. игр',
   value: 'stats'
  },
  {
    title: 'Арбитры',
    value: 'referees'
  },
  {
    title: 'Коэф',
    value: 'odds_1x2'
  },
  {
    title: 'Прогнозы',
    value: 'predictions'
  },
  {
    title: 'СР. знач.',
    value: 'avg'
  },
  {
    title: 'Extra-контент',
    value: 'extra'
  },
  {
    title: 'Тренды и серии',
    value: 'trends'
  }
]

const columns = computed(() => {
  const isHockey = selectedFilters.value.sport.value === 'hockey';
  const isBasket = selectedFilters.value.sport.value === 'basket';
  if (isHockey || isBasket) {
    return allColumns.filter(col => col.value !== 'extra' && col.value !== 'referees');
  }
  return allColumns;
})

function toggle(country) {
  country.isOpen = !country.isOpen
}
const showValue = (competition, value) => {
  return !!competition.coverage[value].flag
}
</script>


<template>
  <div class="info-text" v-if="isMobile">
    <p>Таблица прокручивается вбок</p>
    <IconTab/>
  </div>
  <div class="country-table">
    <table>
      <thead>
      <tr>
        <th class="league-col col-h"></th>
        <th v-for="(col, idx) in columns" :key="idx">
          <span v-html="col.title"></span>
        </th>
      </tr>
      </thead>
      <tbody v-if="coverage.length">
      <template v-for="country in coverage" :key="country.country_id">
        <tr @click="toggle(country)">
          <td class="country-header-td" :colspan="!isMobile ? columns.length + 1 : 0">
            <div class="td-content">
              <IconArrow :class="{ open: country.isOpen }"/>
              <img class="flag" :src="country.country_flag" :alt="country.country_title_ru"/>
              <span class="country-title">{{ country.country_title_ru ?? country.country_title }}</span>
            </div>
          </td>
          <td v-if="isMobile" v-for="i in columns.length" :key="i" class="empty-td"></td>
        </tr>
        <tr
            v-for="(competition, index) in country.competitions"
            :key="competition.competition_id"
            v-show="country.isOpen"
            :class="['league-row', { even: index % 2 === 0 }]"
        >
          <td class="league-col">{{ competition.competition_title_ru ?? competition.competition_title }}</td>
          <td v-for="(col, fIdx) in columns" :key="fIdx" class="feature-cell">
            <IconDone v-if="showValue(competition, col.value)"/>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <p v-if="selectedFilters.sport.status === 'coming_soon'" class="empty-text">Скоро покажем</p>
  </div>
</template>

<style scoped>
.country-table {
  background: transparent;
  width: 100%;
  overflow-y: auto;
  max-height: 500px;
}

table {
  width: 100%;
  border-spacing: 0;
  color: #fff;
  font-size: 16px;
  background: transparent;
}

thead {
  background: #0B0A0F;
  font-size: 10px;
  text-transform: uppercase;
}

th {
  padding: 7px 8px;
  text-align: center;
  vertical-align: middle;
  color: #D3FFE9;
  font-weight: 700;
  letter-spacing: 0.02em;
}

thead {
  position: sticky;
  top: -1px;
  z-index: 2;
  background: #0B0A0F;
}

.col-h {
 width: 240px;
}

.country-header-td {
  align-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  position: relative;
  background: #1A1824;
  padding: 20px 18px;
  border-bottom: 1px solid #232030;
  cursor: pointer;
  transition: background 0.2s;
}

.country-header-td:hover {
  background: #29263a;
}

.empty-td {
  background: #1A1824;
}

.td-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.country-title {
  flex: 0 0 auto;
  font-weight: 600;
  font-size: 16px;
}

.league-row { background: #15131D; }
.league-row.even { background: #0B0A0F; }

.league-row:hover {
  background: #3C3B3F;
  cursor: pointer;
}


.league-col {
  border-right: 2px solid #232030;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  padding: 22px 20px;
  max-width: 240px;
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
  width: 30px;
  height: 20px;
  margin-right: -6px;
}

.open {
  transform: rotate(90deg);
  transition: transform 0.2s;
}


.info-text {
  color: #B5B5B7;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 20px 27px;
}

@media screen and (max-width: 700px) {
  .country-table {
    overflow-x: auto;
  }

  th.league-col, td.league-col {
    position: sticky;
    left: 0;
    z-index: 1;
  }

  .league-col {
    background: #0B0A0F;
    font-size: 12px;
    padding: 10px 20px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  td.country-header-td {
    position: sticky;
    left: 0;
    z-index: 1;
    padding: 10px 20px;
  }

  .td-content {
    gap: 8px;
  }
  .country-title {
    font-size: 12px;
  }
  thead {
    font-size: 8px;
  }

}
.empty-text {
  color: #FFFFFF;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}
</style>
