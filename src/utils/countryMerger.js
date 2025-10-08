// Временный хардкод для объединений центральной и северной америки
// TODO: Нужно удалить как бэк будет отдавать их в одном формате

export const NORTH_AMERICA_ID = 17;
export const CENTRAL_AMERICA_ID = 16;
export const MERGED_AMERICA_ID = 'north-central-america';
export const MERGED_AMERICA_TITLE = 'Северная и Центральная Америка';

export function shouldMergeCountry(countryId) {
  return countryId === NORTH_AMERICA_ID || countryId === CENTRAL_AMERICA_ID;
}

export function createMergedAmericaItem(northItem, centralItem) {
  return {
    id: MERGED_AMERICA_ID,
    title: MERGED_AMERICA_TITLE,
    logo: northItem?.logo || centralItem?.logo || 'https://cdn.smart-tables.ru/public/countries/flag=world-placeholder.svg',
    country_ids: [CENTRAL_AMERICA_ID, NORTH_AMERICA_ID]
  };
}

export function mergeCountriesInList(countries) {
  const result = [];
  let northAmericaItem = null;
  let centralAmericaItem = null;
  let northAmericaIndex = -1;

  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    if (shouldMergeCountry(country.id)) {
      if (country.id === NORTH_AMERICA_ID) {
        northAmericaItem = country;
        northAmericaIndex = i;
      }
      if (country.id === CENTRAL_AMERICA_ID) {
        centralAmericaItem = country;
      }
      continue;
    }
    result.push(country);
  }

  if (northAmericaItem || centralAmericaItem) {
    const mergedItem = createMergedAmericaItem(northAmericaItem, centralAmericaItem);
    // Insert at the position where North America was
    const insertIndex = northAmericaIndex >= 0 ? northAmericaIndex : 0;
    result.splice(insertIndex, 0, mergedItem);
  }

  return result;
}

export function mergeCoverageData(coverageData) {
  if (!Array.isArray(coverageData) || coverageData.length === 0) {
    return coverageData;
  }

  const northAmericaIndex = coverageData.findIndex(c => c.country_id === NORTH_AMERICA_ID);
  const centralAmericaIndex = coverageData.findIndex(c => c.country_id === CENTRAL_AMERICA_ID);

  const northAmerica = northAmericaIndex >= 0 ? coverageData[northAmericaIndex] : null;
  const centralAmerica = centralAmericaIndex >= 0 ? coverageData[centralAmericaIndex] : null;

  if (!northAmerica && !centralAmerica) {
    return coverageData;
  }

  const mergedItem = {
    _id: 'merged-north-central-america',
    sport: northAmerica?.sport || centralAmerica?.sport,
    country_id: MERGED_AMERICA_ID,
    country_title: MERGED_AMERICA_TITLE,
    country_title_ru: MERGED_AMERICA_TITLE,
    country_flag: northAmerica?.country_flag || centralAmerica?.country_flag,
    competitions: [
      ...(northAmerica?.competitions || []),
      ...(centralAmerica?.competitions || [])
    ],
    updated_at: northAmerica?.updated_at || centralAmerica?.updated_at,
    created_at: northAmerica?.created_at || centralAmerica?.created_at,
    isOpen: false
  };

  const result = coverageData.filter(c => !shouldMergeCountry(c.country_id));

  // Insert merged item at the position where North America was
  const insertIndex = northAmericaIndex >= 0 ? northAmericaIndex : 0;
  result.splice(insertIndex, 0, mergedItem);

  return result;
}

export function expandMergedCountryIds(selectedCountries) {
  const result = [];

  for (const country of selectedCountries) {
    if (country.id === MERGED_AMERICA_ID) {
      result.push({ id: CENTRAL_AMERICA_ID });
      result.push({ id: NORTH_AMERICA_ID });
    } else {
      result.push(country);
    }
  }

  return result;
}
