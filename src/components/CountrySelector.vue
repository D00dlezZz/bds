<script setup>
import { ref, computed } from 'vue'
import CustomCheckbox from "@/components/ui/CustomCheckbox.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconClose from "@/components/icons/IconClose.vue";

const countries = ref([
  { label: 'Россия', code: 'ru' },
  { label: 'Германия', code: 'de' },
  { label: 'Англия', code: 'gb' },
  { label: 'Албания', code: 'al' }
]);

const search = ref('');
const selectedCountries = ref([]);
const preSelectedCountries = ref([]);

const showDropdown = ref(false);

const filteredCountries = computed(() => {
  if (!search.value) return countries.value
  return countries.value.filter(c =>
      c.label.toLowerCase().includes(search.value.toLowerCase())
  )
});

function toggleCountry(country) {
  const exists = selectedCountries.value.find(c => c.code === country.code)
  if (exists) {
    selectedCountries.value = selectedCountries.value.filter(c => c.code !== country.code)
  } else {
    selectedCountries.value.push(country)
  }
}

function removeCountry(code) {
  selectedCountries.value = selectedCountries.value.filter(c => c.code !== code)
}

function clearAll() {
  selectedCountries.value = []
}
</script>

<template>
  <div class="country-select">
    <div
        class="dropdown-header"
        :class="{ 'dropdown-header-open': showDropdown }"
        @click="showDropdown = !showDropdown"
        tabindex="0"
    >
      ВЫБРАТЬ СТРАНУ
      <IconArrow class="arrow" :class="{ open: showDropdown }"/>
    </div>
    <div class="tags-wrapper" v-if="selectedCountries.length">
      <span class="tag" v-for="c in selectedCountries" :key="c.code">
        {{ c.label }}
        <IconClose class="remove-tag" @click="removeCountry(c.code)" />
      </span>
      <span class="clear-all" @click="clearAll">СБРОСИТЬ ВСЕ</span>
    </div>
    <div class="dropdown" v-if="showDropdown">
      <div class="search-wrap">
        <input
            class="search"
            type="text"
            v-model="search"
            placeholder="ПОИСК"
        />
        <IconSearch/>
      </div>
      <div class="country-list">
        <div
            class="country-row"
            v-for="c in filteredCountries"
            :key="c.code"
            @click.stop="toggleCountry(c)"
        >
          <CustomCheckbox
              :modelValue="!!selectedCountries.find(sel => sel.code === c.code)"
              @update:modelValue="() => toggleCountry(c)"
          >
              <div class="country-cell">
                <i class="flag" :class="[`flag-${c.code}`]"></i>
                {{ c.label }}
              </div>
          </CustomCheckbox>
        </div>
      </div>
    </div>
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
  border-radius: 2px;
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
  border-radius: 8px;
  box-shadow: 0 11px 48px #210d2c66;
  margin-top: 8px;
  transition: all 0.5s;
}

.search-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  border: 1px solid #4A4C56;
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
  border: 1px solid #4A4C56;
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


@media screen and (max-width: 540px){
  .country-select {
    width: 100% ;
  }

  .dropdown-header {
    width: 100%;
  }

  .dropdown {
    max-width: 100%;
  }
}

</style>
