import csvtojsonV2 from 'csvtojson';
import { isNotEmptyArray } from "./isEmptyUtil";

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

export const valueDividedBy = ({
  value,
  dividedBy,
}) => value / dividedBy;

export const parseCSV = (data, type) => csvtojsonV2({
    output: "json"
  })
  .fromString(data)
  .then(
    result => getCountries(result)
  );

export const getData = (data, type) => parseCSV(data, type);

export const mergeCountries = countries => {
  const output = [];
  countries.forEach(c => {
    const existing = output.filter(f => f.country === c.country);
    if (existing.length) {
      const existingIndex = output.indexOf(existing[0]);
      output[existingIndex].value = parseInt(output[existingIndex].value) + parseInt(c.value);
    } else {
      c.value = parseInt(c.value);
      output.push(c);
    }
  });
  return output;
};

export const mergeCountriesReduce = countries => {
  return countries.reduce((o, cur) => {
    const occurs = o.reduce((n, item, i) => item.country === cur.country ? i : n, -1);
    if (occurs >= 0) {
      o[occurs].value = parseInt(o[occurs].value) + parseInt(cur.value);
    } else {
      const obj = {
        country: cur.country,
        value: parseInt(cur.value)
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

export const enrichCountriesStats = ({ countries }) => {
  const output = [];
  countries && isNotEmptyArray(countries) && countries.forEach(co => {
    const { country, cases, cures, deaths/*, population*/ } = co;
    const total = cases + cures + deaths;
    output.push({
      country,
      cases,
      cures,
      deaths,
      // population,
      casesPercent: cases * 100 / total,
      curesPercent: cures * 100 / total,
      deathsPercent: deaths * 100 / total,
      // casesPerCapita: cases * 100 / population,
      // curesPerCapita: cures * 100 / population,
      // deathsPerCapita: deaths * 100 / population,
      total,
    });
  });
  return output;
};

export const distributePercentage = ({
  cases,
  cures,
  deaths,
}) => {
  const total = cases + cures + deaths;
  const casesPercent = cases * 100 / total;
  const curesPercent = cures * 100 / total;
  const deathsPercent = deaths * 100 / total;
  return {
    casesPercent,
    curesPercent,
    deathsPercent
  }
};
