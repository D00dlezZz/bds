<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {mainStore} from "@/store/main.js";
import { storeToRefs } from 'pinia';
import CustomCheckbox from "@/components/ui/CustomCheckbox.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { mergeCountriesInList } from '@/utils/countryMerger.js';

const {countries, selectedFilters} = storeToRefs(mainStore())

const search = ref('');
const showDropdown = ref(false);

const tempSelectedCountries = ref([]);

const countrySelectRef = ref(null);

const filteredCountries = computed(() => {
  let result = countries.value;
  if (search.value) {
    result = result.filter(c =>
        c.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  const unique = [];
  const seen = new Set();
  for (const c of result) {
    if (!seen.has(c.title)) {
      unique.push(c);
      seen.add(c.title);
    }
  }
  return mergeCountriesInList(unique);
});

function toggleCountry(country) {
  const exists = tempSelectedCountries.value.find(c => c.id === country.id);
  if (exists) {
    tempSelectedCountries.value = tempSelectedCountries.value.filter(c => c.id !== country.id);
  } else {
    tempSelectedCountries.value.push(country);
  }
}

async function removeCountry(id) {
  selectedFilters.value.countries = selectedFilters.value.countries.filter(c => c.id !== id);
  tempSelectedCountries.value = tempSelectedCountries.value.filter(c => c.id !== id);
  await mainStore().fetchCoverage()
}

function clearAll() {
  tempSelectedCountries.value = [];
  selectedFilters.value.countries = [];
}

async function clearAndFetch() {
  tempSelectedCountries.value = [];
  selectedFilters.value.countries = [];
  await mainStore().fetchCoverage()
}
function openDropdown() {
  tempSelectedCountries.value = [...selectedFilters.value.countries];
  showDropdown.value = true;
}

async function applySelection() {
  selectedFilters.value.countries = [...tempSelectedCountries.value];
  showDropdown.value = false;
 await mainStore().fetchCoverage()
}

function handleClickOutside(event) {
  if (countrySelectRef.value && !countrySelectRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="country-select" ref="countrySelectRef">
    <div
        class="dropdown-header"
        :class="{ 'dropdown-header-open': showDropdown }"
        @click="!showDropdown ? openDropdown() : showDropdown = false"
        tabindex="0"
    >
      ВЫБРАТЬ СТРАНУ
      <IconArrow class="arrow" :class="{ open: showDropdown }" />
    </div>

    <div class="tags-wrapper" v-if="selectedFilters.countries.length">
      <span class="tag" v-for="c in selectedFilters.countries" :key="c.title">
        {{ c.title }}
        <IconClose class="remove-tag" @click.stop="removeCountry(c.id)" />
      </span>
      <span class="clear-all" @click="clearAndFetch">СБРОСИТЬ ВСЕ</span>
    </div>

    <transition name="dropdown">
      <div class="dropdown" v-if="showDropdown">
        <div class="search-wrap">
          <input
              class="search"
              type="text"
              v-model="search"
              placeholder="ПОИСК"
          />
          <IconSearch />
        </div>

        <div class="country-list">
          <div
              class="country-row"
              v-for="c in filteredCountries"
              :key="c.title"
              @click.stop="toggleCountry(c)"
          >
            <CustomCheckbox
                :modelValue="!!tempSelectedCountries.find(sel => sel.id === c.id)"
                @update:modelValue="() => toggleCountry(c)"
            >
              <div class="country-cell">
                <img class="flag" :src="c.logo" :alt="c.title">
                {{ c.title }}
              </div>
            </CustomCheckbox>
          </div>
        </div>
        <div class="dropdown-footer">
          <button class="apply-btn" @click="applySelection">ПРИМЕНИТЬ</button>
          <div class="dropdown-bottom-row">
            <span class="dropdown-selected">ВЫБРАНО: {{ tempSelectedCountries.length }}</span>
            <span
                v-if="tempSelectedCountries.length"
                class="dropdown-clear"
                @click="clearAll"
            >
              СБРОСИТЬ ВСЕ
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.country-select {
  position: relative;
  font-family: inherit;
}
.dropdown-header {
  width: 284px;
  padding: 8px 14px;
  background: #0B0A0F;
  color: #D3FFE9;
  border: 1px solid #797B8A;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
}

.dropdown-header:hover {
  border-color: #C8CCE4;
}

.dropdown-header-open {
  border-color: #8059B9;
}

.arrow {
  transition: all 0.2s;
}
.open {
  transform: rotate(180deg);
  transition: all 0.3s;
}
.tags-wrapper {
  width: 100%;
  margin-top: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
}
.tag {
  background: #2C213C;
  color: #fff;
  border-radius: 7px;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
}
.remove-tag {
  margin-left: 7px;
  cursor: pointer;
}

.clear-all {
  color: #FFFFFF;
  margin-left: 8px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
}

.dropdown {
  max-width: 284px;
  background: #0B0A0F;
  position: absolute;
  top: 48px;
  z-index: 5;
  width: 100%;
  margin-top: 8px;
  border: 1px solid #4A4C56;
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

.search-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid #4A4C56;
  color: #FFFFFF;
  background: #0B0A0F;
}
.search {
  width: 100%;
  border: none;
  color: #FFFFFF;
  background: #0B0A0F;
  font-size: 10px;
  font-weight: normal;
  outline: none;
}
.country-list {
  max-height: 180px;
  overflow-y: auto;
  padding: 14px 0;
}
.country-row {
  cursor: pointer;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  color: #fff;
  transition: background 0.2s;
  font-size: 14px;
}

.country-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}
.country-row:hover {
  background: #4A4C56;
}

.dropdown-footer {
  padding: 14px;
  background: #0B0A0F;
  user-select: none;
}

.apply-btn {
  width: 100%;
  background: #865DDB;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 7px 0;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.2s;
}

.apply-btn:active {
  background: #6a3ab9;
}

.dropdown-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 0 2px 5px;
  color: #8886A0;
}

.dropdown-clear {
  color: #FFF;
  text-decoration: underline;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}

@media screen and (max-width: 540px) {
  .country-select {
    width: 100%;
  }

  .dropdown-header {
    width: 100%;
  }

  .dropdown {
    max-width: 100%;
  }
}
</style>
