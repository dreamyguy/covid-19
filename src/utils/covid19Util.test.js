import containsString, {
  getCountries,
  mergeCountries,
  mergeCountriesReduce,
  mergeCountriesStats,
  sortCountriesBy,
} from './covid19Util';

import {
  countriesCSVOutput,
  countriesCSVOutputFiltered,
  countriesInput,
  countriesOutput,
  countriesOutputReduce,
  countriesSortedByCases,
  countriesSortedByCountry,
  countriesSortedByCures,
  countriesSortedByDeaths,
  countriesSortedByDeathsPercent,
  countriesUnsorted,
  mergeCountriesStatsOutput,
  mergedCases,
  mergedCures,
  mergedDeaths,
} from './covid19Util.mock';

describe('covid19Util', () => {
  describe('getCountries', () => {
    it('returns expected array', () => {
      expect(getCountries(countriesCSVOutput)).toEqual(countriesCSVOutputFiltered);
    })
  })
  describe('mergeCountries', () => {
    it('returns expected array', () => {
      expect(mergeCountries(countriesInput)).toEqual(countriesOutput);
    })
  })
  describe('mergeCountriesReduce', () => {
    it('returns expected array', () => {
      expect(mergeCountriesReduce(countriesInput)).toEqual(countriesOutputReduce);
    })
  })
  describe('mergeCountriesStats', () => {
    it('returns expected array', () => {
      expect(mergeCountriesStats({
        cases: mergedCases,
        cures: mergedCures,
        deaths: mergedDeaths,
      })).toEqual(mergeCountriesStatsOutput);
    })
  })
  describe('sortCountriesBy', () => {
    it('cases', () => {
      const sortBy = 'cases';
      const mode = 'desc';
      expect(sortCountriesBy({
        countries: countriesUnsorted,
        sortBy,
        mode
      })).toEqual(countriesSortedByCases);
    })
    it('cures', () => {
      const sortBy = 'cures';
      const mode = 'desc';
      expect(sortCountriesBy({
        countries: countriesUnsorted,
        sortBy,
        mode
      })).toEqual(countriesSortedByCures);
    })
    it('deaths', () => {
      const sortBy = 'deaths';
      const mode = 'desc';
      expect(sortCountriesBy({
        countries: countriesUnsorted,
        sortBy,
        mode
      })).toEqual(countriesSortedByDeaths);
    })
    it('deathsPercent', () => {
      const sortBy = 'deathsPercent';
      const mode = 'desc';
      expect(sortCountriesBy({
        countries: countriesUnsorted,
        sortBy,
        mode
      })).toEqual(countriesSortedByDeathsPercent);
    })
    it('country', () => {
      const sortBy = 'country';
      expect(sortCountriesBy({
        countries: countriesUnsorted,
        sortBy
      })).toEqual(countriesSortedByCountry);
    })
  })
  describe('containsString', () => {
    it('should return true when checking "oo" against "foo"', () => {
      const string = 'foo';
      const substring = 'oo';
      expect(containsString(string, substring)).toEqual(true);
    })
    it('should return true when checking "dancing" against "dancing-woman"', () => {
      const string = 'dancing-woman';
      const substring = 'dancing';
      expect(containsString(string, substring)).toEqual(true);
    })
    it('should return true when checking "wom" against "dancing woman"', () => {
      const string = 'dancing woman';
      const substring = 'wom';
      expect(containsString(string, substring)).toEqual(true);
    })
    it('should return true when checking "ing wo" against "dancing-woman"', () => {
      const string = 'dancing-woman';
      const substring = 'ing wo';
      expect(containsString(string, substring)).toEqual(true);
    })
    it('should return true when checking "ing-wo" against "dancing-woman"', () => {
      const string = 'dancing-woman';
      const substring = 'ing-wo';
      expect(containsString(string, substring)).toEqual(true);
    })
    it('should return true when checking "dancing" against "DanCinG"', () => {
      const string = 'DanCinG';
      const substring = 'dancing';
      expect(containsString(string, substring)).toEqual(true);
    })
    it('should return true when checking "DanCinG" against "dancing"', () => {
      const string = 'dancing';
      const substring = 'DanCinG';
      expect(containsString(string, substring)).toEqual(true);
    })
    it('should return false when checking "ee" against "foo"', () => {
      const string = 'foo';
      const substring = 'ee';
      expect(containsString(string, substring)).toEqual(false);
    })
    it('should return true when checking "" against ""', () => {
      const string = '';
      const substring = '';
      expect(containsString(string, substring)).toEqual(true);
    })
    it('should return false when checking "y" against ""', () => {
      const string = '';
      const substring = 'y';
      expect(containsString(string, substring)).toEqual(false);
    })
  })
});
