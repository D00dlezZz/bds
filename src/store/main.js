import { defineStore } from 'pinia'
import {ref} from "vue";

export const mainStore = defineStore('mainStore', () => {
    const countries = ref([]);
    const coverage = ref([]);
    const selectedFilters = ref({
        countries: [],
        sport: {}
    });

    async function fetchCountries() {
        // const cached = localStorage.getItem('countries');
        // if (cached) {
        //     countries.value = JSON.parse(cached);
        //     return;
        // }
        try {
            const url = import.meta.env.VITE_API_URL + 'coverage/countries';
            const response = await fetch(url, {
                headers: {
                    'Authorization': 'Basic cmVsZWFzZTo3YTQxWXpNR2Fo',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const sorted = data.data.sort((a, b) => a.title.localeCompare(b.title));
            countries.value = sorted;
            localStorage.setItem('countries', JSON.stringify(sorted));
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchCoverage() {
        try {
            let params = [];
            if (selectedFilters.value.countries.length) {
                selectedFilters.value.countries.forEach(country => {
                    params.push(`country_ids[]=${encodeURIComponent(country.id)}`);
                });
            }

            params.push(`sport=${selectedFilters.value.sport.value}`);
            const queryString = params.join('&');

            const url = import.meta.env.VITE_API_URL + 'coverage?' + queryString;
            const response = await fetch(url, {
                headers: {
                    'Authorization': 'Basic cmVsZWFzZTo3YTQxWXpNR2Fo',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            coverage.value = data.data.map((item, index) => ({
                ...item,
                isOpen: index < 3
            }));
        }catch (e) {
            console.error(e);
        }
    }

    return {
        selectedFilters,
        countries,
        coverage,
        fetchCountries,
        fetchCoverage
    }
});