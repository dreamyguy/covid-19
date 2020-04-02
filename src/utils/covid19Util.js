/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import csvtojsonV2 from 'csvtojson';
import { isNotEmptyArray } from "./isEmptyUtil";

export const thousandify = number => Number(number).toLocaleString();

export const valueDividedBy = ({
  value,
  dividedBy,
}) => value / dividedBy;

// Check if string contains a substring
export const containsString = (string, substring) => {
  if (string.toLowerCase().replace('-', ' ').indexOf(substring.toLowerCase().replace('-', ' ')) !== -1) {
    return true;
  }
  return false;
}

export const sortCountriesBy = ({ countries, sortBy, mode }) => {
  if (
    countries &&
    isNotEmptyArray(countries)
  ) {
    if (sortBy === 'country') {
      // 'country' is a string, so it needs special treatment
      countries.sort((a, b) => {
        const countryA = a.country.toLowerCase();
        const countryB = b.country.toLowerCase();
        if (countryA < countryB) {
          return -1;
        }
        if (countryA > countryB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    } else {
      // Only dealing with numbers from now on
      // eslint-disable-next-line no-lonely-if
      if (mode === 'desc') {
        countries.sort((a, b) => b[sortBy] - a[sortBy]);
      } else {
        countries.sort((a, b) => a[sortBy] - b[sortBy]);
      }
    }
    return countries;
  }
  return console.log(`[sortCountriesBy]: 'countries' (${countries}) is not an array or is empty`);
}

export const mergeCountries = countries => {
  const output = [];
  countries.forEach(c => {
    const existing = output.filter(f => f.country === c.country);
    if (existing.length) {
      const existingIndex = output.indexOf(existing[0]);
      output[existingIndex].value = parseInt(output[existingIndex].value, 10) + parseInt(c.value, 10);
    } else {
      c.value = parseInt(c.value, 10);
      output.push(c);
    }
  });
  return output;
};

export const getCountries = countries => {
  const allCountries = [];
  countries.forEach(c => {
    allCountries.push({
      country: c["Country/Region"],
      value: c[Object.keys(c)[Object.keys(c).length - 1]],
    });
  });
  return mergeCountries(allCountries);
};

export const parseCSV = data => csvtojsonV2({
  output: "json"
})
.fromString(data)
.then(
  result => getCountries(result)
);

export const getData = (data, type) => parseCSV(data, type);

export const mergeCountriesReduce = countries => {
  return countries.reduce((o, cur) => {
    const occurs = o.reduce((n, item, i) => item.country === cur.country ? i : n, -1);
    if (occurs >= 0) {
      o[occurs].value = parseInt(o[occurs].value, 10) + parseInt(cur.value, 10);
    } else {
      const obj = {
        country: cur.country,
        value: parseInt(cur.value, 10)
      };
      o = o.concat([obj]);
    }
    return o;
  }, []);
};

export const mergeCountriesStats = ({ cases, cures, deaths }) => {
  const output = [];
  cases && isNotEmptyArray(cases) && cases.forEach(ca => {
    const existingCase = output.filter(f => f.country === ca.country);
    if (existingCase.length) {
      const existingCaseIndex = output.indexOf(existingCase[0]);
      output[existingCaseIndex] = {
        ...output[existingCaseIndex],
        cases: ca.value,
      }
    } else {
      output.push({
        country: ca.country,
        cases: ca.value,
      });
    }
    cures && isNotEmptyArray(cures) && cures.forEach(cu => {
      const existingCure = output.filter(f => f.country === cu.country);
      if (existingCure.length) {
        const existingCureIndex = output.indexOf(existingCure[0]);
        output[existingCureIndex] = {
          ...output[existingCureIndex],
          cures: cu.value,
        }
      } else {
        output.push({
          country: cu.country,
          cures: cu.value,
        });
      }
      deaths && isNotEmptyArray(deaths) && deaths.forEach(de => {
        const existingDeath = output.filter(f => f.country === de.country);
        if (existingDeath.length) {
          const existingDeathIndex = output.indexOf(existingDeath[0]);
          output[existingDeathIndex] = {
            ...output[existingDeathIndex],
            deaths: de.value,
          }
        } else {
          output.push({
            country: de.country,
            deaths: de.value,
          });
        }
      });
    });
  });
  return output;
};

export const enrichCountriesStats = countries => {
  const output = [];
  countries && isNotEmptyArray(countries) && countries.forEach(co => {
    const { country, cases, cures, deaths/* , population */ } = co;
    const sick = cases - (cures + deaths);
    output.push({
      country,
      cases,
      sick,
      cures,
      deaths,
      // population,
      sickPercent: sick * 100 / cases,
      curesPercent: cures * 100 / cases,
      deathsPercent: deaths * 100 / cases,
      // casesPerCapita: cases * 100 / population,
      // curesPerCapita: cures * 100 / population,
      // deathsPerCapita: deaths * 100 / population,
    });
  });
  return output;
};

export const globalStats = countries => {
  let output = [];
  if (countries && isNotEmptyArray(countries)) {
    output = countries.reduce((a, b) => ({
      country: 'WORLD',
      cases: (a.cases + b.cases),
      cures: (a.cures + b.cures),
      deaths: (a.deaths + b.deaths),
      sick: ((a.cases - (a.cures + a.deaths)) + (b.cases - (b.cures + b.deaths))),
      sickPercent: (((a.cases - (a.cures + a.deaths)) + (b.cases - (b.cures + b.deaths))) * 100) / (a.cases + b.cases),
      curesPercent: ((a.cures + b.cures) * 100) / (a.cases + b.cases),
      deathsPercent: ((a.deaths + b.deaths) * 100) / (a.cases + b.cases),
    }));
  };
  return output;
};
