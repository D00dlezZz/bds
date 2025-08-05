<script setup>
import {ref} from 'vue'
import IconDone from "@/components/icons/IconDone.vue"
import IconArrow from "@/components/icons/IconArrow.vue";
import IconTab from "@/components/icons/IconTab.vue";

defineProps({
  isMobile: true
})

const columns = [
  'Матч-центр', 'Тайм<br>лайн', 'Составы', 'Стат. игр',
  'Арбитры', 'Коэф.', 'Прогнозы', 'СР. знач.',
  'Обог. контент', 'Тренды и серии'
]

const countries = ref([
  {
    name: 'Албания',
    icon: '',
    open: true,
    leagues: [
      {name: '1st Division', features: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0]},
      {name: '2nd Division - Group A', features: [1, 1, 0, 1, 0, 1, 0, 1, 1, 0]},
      {name: '3nd Division - Group A', features: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1]},
    ]
  },
  {
    name: 'Алжир',
    icon: './assets/icons/albania.svg',
    open: true,
    leagues: [
      {name: '1st Division', features: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0]},
      {name: '2nd Division - Group A', features: [1, 1, 0, 0, 0, 1, 0, 1, 1, 0]},
      {name: '3nd Division - Group A', features: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1]},
    ]
  },
  {
    name: 'Андорра',
    icon: './assets/icons/albania.svg',
    open: true,
    leagues: [
      {name: '1st Division', features: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0]},
      {name: '2nd Division - Group A', features: [1, 1, 0, 0, 1, 1, 0, 1, 1, 0]},
      {name: '3nd Division - Group A', features: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1]},
    ]
  },
  {
    name: 'Ангола',
    icon: './assets/icons/albania.svg',
    open: false,
    leagues: [
      {name: '1st Division', features: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0]},
      {name: '2nd Division - Group A', features: [1, 1, 0, 0, 0, 1, 0, 1, 1, 0]},
      {name: '3nd Division - Group A', features: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1]},
    ]
  },
  {
    name: 'Аргентина',
    icon: './assets/icons/albania.svg',
    open: false,
    leagues: [
      {name: '1st Division', features: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0]},
      {name: '2nd Division - Group A', features: [1, 1, 0, 0, 1, 1, 0, 1, 1, 0]},
      {name: '3nd Division - Group A', features: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1]},
    ]
  },
])

function toggle(country) {
  country.open = !country.open
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
        <th class="league-col"></th>
        <th v-for="(col, idx) in columns" :key="idx">
          <span v-html="col"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="country in countries" :key="country.name">
        <tr @click="toggle(country)">
          <td class="country-header-td" :colspan="!isMobile ? columns.length + 1 : 0">
            <div class="td-content">
              <IconArrow :class="{ open: country.open }"/>
              <img class="flag" :src="country.icon" :alt="country.name"/>
              <span class="country-title">{{ country.name }}</span>
            </div>
          </td>
          <td v-if="isMobile" v-for="i in columns.length" :key="i" class="empty-td"></td>
        </tr>
        <tr
            v-for="(league, index) in country.leagues"
            :key="league.name"
            v-show="country.open"
            :class="['league-row', { even: index % 2 === 0 }]"
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
  padding: 7px 6px;
  text-align: center;
  vertical-align: middle;
  color: #D3FFE9;
  font-weight: 700;
  letter-spacing: 0.02em;
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
  min-width: 214px;
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
  }

  td.country-header-td {
    position: sticky;
    left: 0;
    z-index: 1;
  }

}
</style>
