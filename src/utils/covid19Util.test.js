import containsString, {
  mergeCountries,
  mergeCountriesReduce,
  mergeCountriesStats,
  sortCountriesBy
} from './covid19Util';

import {
  countriesInput,
  countriesOutput,
  countriesOutputReduce,
  countriesSortedByCases,
  countriesSortedByCountry,
  countriesSortedByCures,
  countriesSortedByDeaths,
  countriesSortedByDeathsPercent,
  countriesUnsorted,
} from './covid19Util.mock';

const mergedDeaths = [
  {country: "Thailand", value: 1},
  {country: "Japan", value: 40},
  {country: "Singapore", value: 2},
  {country: "Nepal", value: 0},
  {country: "Malaysia", value: 10},
  {country: "Canada", value: 21},
  {country: "Australia", value: 7},
  {country: "Cambodia", value: 0},
  {country: "Sri Lanka", value: 0},
  {country: "Germany", value: 94},
  {country: "Finland", value: 1},
  {country: "United Arab Emirates", value: 2},
  {country: "Philippines", value: 25},
  {country: "India", value: 7},
  {country: "Italy", value: 5476},
  {country: "Sweden", value: 21},
  {country: "Spain", value: 1772},
  {country: "Belgium", value: 75},
  {country: "Egypt", value: 14},
  {country: "Lebanon", value: 4},
  {country: "Iraq", value: 20},
  {country: "Oman", value: 0},
  {country: "Afghanistan", value: 1},
  {country: "Bahrain", value: 2},
  {country: "Kuwait", value: 0},
  {country: "Algeria", value: 17},
  {country: "Croatia", value: 1},
  {country: "Switzerland", value: 98},
  {country: "Austria", value: 16},
  {country: "Israel", value: 1},
  {country: "Pakistan", value: 5},
  {country: "Brazil", value: 25},
  {country: "Georgia", value: 0},
  {country: "Greece", value: 15},
  {country: "North Macedonia", value: 1},
  {country: "Norway", value: 7},
  {country: "Romania", value: 3},
  {country: "Estonia", value: 0},
  {country: "San Marino", value: 20},
  {country: "Belarus", value: 0},
  {country: "Iceland", value: 1},
  {country: "Lithuania", value: 1},
  {country: "Mexico", value: 2},
  {country: "New Zealand", value: 0},
  {country: "Nigeria", value: 0},
  {country: "Ireland", value: 4},
  {country: "Luxembourg", value: 8},
  {country: "Monaco", value: 0},
  {country: "Qatar", value: 0},
  {country: "Ecuador", value: 14},
  {country: "Azerbaijan", value: 1},
  {country: "Armenia", value: 0},
  {country: "Dominican Republic", value: 3},
  {country: "Indonesia", value: 48},
  {country: "Portugal", value: 14},
  {country: "Andorra", value: 1},
  {country: "Latvia", value: 0},
  {country: "Morocco", value: 4},
  {country: "Saudi Arabia", value: 0},
  {country: "Senegal", value: 0},
  {country: "Argentina", value: 4},
  {country: "Chile", value: 1},
  {country: "Jordan", value: 0},
  {country: "Ukraine", value: 3},
  {country: "Hungary", value: 6},
  {country: "Liechtenstein", value: 0},
  {country: "Poland", value: 7},
  {country: "Tunisia", value: 3},
  {country: "Bosnia and Herzegovina", value: 1},
  {country: "Slovenia", value: 2},
  {country: "South Africa", value: 0},
  {country: "Bhutan", value: 0},
  {country: "Cameroon", value: 0},
  {country: "Colombia", value: 2},
  {country: "Costa Rica", value: 2},
  {country: "Peru", value: 5},
  {country: "Serbia", value: 2},
  {country: "Slovakia", value: 1},
  {country: "Togo", value: 0},
  {country: "Malta", value: 0},
  {country: "Martinique", value: 1},
  {country: "Bulgaria", value: 3},
  {country: "Maldives", value: 0},
  {country: "Bangladesh", value: 2},
  {country: "Paraguay", value: 1},
  {country: "Albania", value: 2},
  {country: "Cyprus", value: 1},
  {country: "Brunei", value: 0},
  {country: "US", value: NaN},
  {country: "Burkina Faso", value: 4},
  {country: "Holy See", value: 0},
  {country: "Mongolia", value: 0},
  {country: "Panama", value: 3},
  {country: "China", value: 3274},
  {country: "Iran", value: 1685},
  {country: "Korea, South", value: 104},
  {country: "France", value: 674},
  {country: "Cruise Ship", value: 8},
  {country: "Denmark", value: 13},
  {country: "Czechia", value: 1},
];

const mergedCases = [
  {country: "Thailand", value: 599},
  {country: "Japan", value: 1086},
  {country: "Singapore", value: 455},
  {country: "Nepal", value: 2},
  {country: "Malaysia", value: 1306},
  {country: "Canada", value: 1470},
  {country: "Australia", value: 1314},
  {country: "Cambodia", value: 84},
  {country: "Sri Lanka", value: 82},
  {country: "Germany", value: 24873},
  {country: "Finland", value: 626},
  {country: "United Arab Emirates", value: 153},
  {country: "Philippines", value: 380},
  {country: "India", value: 396},
  {country: "Italy", value: 59138},
  {country: "Sweden", value: 1934},
  {country: "Spain", value: 28768},
  {country: "Belgium", value: 3401},
  {country: "Egypt", value: 327},
  {country: "Lebanon", value: 248},
  {country: "Iraq", value: 233},
  {country: "Oman", value: 55},
  {country: "Afghanistan", value: 40},
  {country: "Bahrain", value: 332},
  {country: "Kuwait", value: 188},
  {country: "Algeria", value: 201},
  {country: "Croatia", value: 254},
  {country: "Switzerland", value: 7245},
  {country: "Austria", value: 3244},
  {country: "Israel", value: 1071},
  {country: "Pakistan", value: 776},
  {country: "Brazil", value: 1593},
  {country: "Georgia", value: 54},
  {country: "Greece", value: 624},
  {country: "North Macedonia", value: 114},
  {country: "Norway", value: 2383},
  {country: "Romania", value: 433},
  {country: "Estonia", value: 326},
  {country: "San Marino", value: 160},
  {country: "Belarus", value: 76},
  {country: "Iceland", value: 568},
  {country: "Lithuania", value: 131},
  {country: "Mexico", value: 251},
  {country: "New Zealand", value: 66},
  {country: "Nigeria", value: 30},
  {country: "Ireland", value: 906},
  {country: "Luxembourg", value: 798},
  {country: "Monaco", value: 23},
  {country: "Qatar", value: 494},
  {country: "Ecuador", value: 789},
  {country: "Azerbaijan", value: 65},
  {country: "Armenia", value: 194},
  {country: "Dominican Republic", value: 202},
  {country: "Indonesia", value: 514},
  {country: "Portugal", value: 1600},
  {country: "Andorra", value: 113},
  {country: "Latvia", value: 139},
  {country: "Morocco", value: 115},
  {country: "Saudi Arabia", value: 511},
  {country: "Senegal", value: 67},
  {country: "Argentina", value: 225},
  {country: "Chile", value: 632},
  {country: "Jordan", value: 112},
  {country: "Ukraine", value: 73},
  {country: "Hungary", value: 131},
  {country: "Liechtenstein", value: 37},
  {country: "Poland", value: 634},
  {country: "Tunisia", value: 75},
  {country: "Bosnia and Herzegovina", value: 126},
  {country: "Slovenia", value: 414},
  {country: "South Africa", value: 274},
  {country: "Bhutan", value: 2},
  {country: "Cameroon", value: 40},
  {country: "Colombia", value: 231},
  {country: "Costa Rica", value: 134},
  {country: "Peru", value: 363},
  {country: "Serbia", value: 222},
  {country: "Slovakia", value: 185},
  {country: "Togo", value: 16},
  {country: "Malta", value: 90},
  {country: "Martinique", value: 37},
  {country: "Bulgaria", value: 187},
  {country: "Maldives", value: 13},
  {country: "Bangladesh", value: 27},
  {country: "Paraguay", value: 22},
  {country: "Albania", value: 89},
  {country: "Cyprus", value: 95},
  {country: "Brunei", value: 88},
  {country: "US", value: NaN},
  {country: "Burkina Faso", value: 75},
  {country: "Holy See", value: 1},
  {country: "Mongolia", value: 10},
  {country: "Panama", value: 245},
  {country: "China", value: 81439},
  {country: "Iran", value: 21638},
  {country: "Korea, South", value: 8897},
  {country: "France", value: 16044},
  {country: "Cruise Ship", value: 712},
  {country: "Denmark", value: 1514},
  {country: "Czechia", value: 1120},
];

const mergedCures = [
  {country: "Thailand", value: 44},
  {country: "Japan", value: 235},
  {country: "Singapore", value: 144},
  {country: "Nepal", value: 1},
  {country: "Malaysia", value: 139},
  {country: "Canada", value: 10},
  {country: "Australia", value: 88},
  {country: "Cambodia", value: 1},
  {country: "Sri Lanka", value: 3},
  {country: "Germany", value: 266},
  {country: "Finland", value: 10},
  {country: "United Arab Emirates", value: 38},
  {country: "Philippines", value: 17},
  {country: "India", value: 27},
  {country: "Italy", value: 7024},
  {country: "Sweden", value: 16},
  {country: "Spain", value: 2575},
  {country: "Belgium", value: 263},
  {country: "Egypt", value: 56},
  {country: "Lebanon", value: 8},
  {country: "Iraq", value: 57},
  {country: "Oman", value: 17},
  {country: "Afghanistan", value: 1},
  {country: "Bahrain", value: 149},
  {country: "Kuwait", value: 27},
  {country: "Algeria", value: 65},
  {country: "Croatia", value: 5},
  {country: "Switzerland", value: 131},
  {country: "Austria", value: 9},
  {country: "Israel", value: 37},
  {country: "Pakistan", value: 5},
  {country: "Brazil", value: 2},
  {country: "Georgia", value: 3},
  {country: "Greece", value: 19},
  {country: "North Macedonia", value: 1},
  {country: "Norway", value: 1},
  {country: "Romania", value: 64},
  {country: "Estonia", value: 2},
  {country: "San Marino", value: 4},
  {country: "Belarus", value: 15},
  {country: "Iceland", value: 36},
  {country: "Lithuania", value: 1},
  {country: "Mexico", value: 4},
  {country: "New Zealand", value: 0},
  {country: "Nigeria", value: 2},
  {country: "Ireland", value: 5},
  {country: "Luxembourg", value: 6},
  {country: "Monaco", value: 1},
  {country: "Qatar", value: 33},
  {country: "Ecuador", value: 3},
  {country: "Azerbaijan", value: 10},
  {country: "Armenia", value: 2},
  {country: "Dominican Republic", value: 0},
  {country: "Indonesia", value: 29},
  {country: "Portugal", value: 5},
  {country: "Andorra", value: 1},
  {country: "Latvia", value: 1},
  {country: "Morocco", value: 3},
  {country: "Saudi Arabia", value: 16},
  {country: "Senegal", value: 5},
  {country: "Argentina", value: 3},
  {country: "Chile", value: 8},
  {country: "Jordan", value: 1},
  {country: "Ukraine", value: 1},
  {country: "Hungary", value: 16},
  {country: "Liechtenstein", value: 0},
  {country: "Poland", value: 1},
  {country: "Tunisia", value: 1},
  {country: "Bosnia and Herzegovina", value: 2},
  {country: "Slovenia", value: 0},
  {country: "South Africa", value: 0},
  {country: "Bhutan", value: 0},
  {country: "Cameroon", value: 0},
  {country: "Colombia", value: 3},
  {country: "Costa Rica", value: 2},
  {country: "Peru", value: 1},
  {country: "Serbia", value: 1},
  {country: "Slovakia", value: 7},
  {country: "Togo", value: 1},
  {country: "Malta", value: 2},
  {country: "Martinique", value: 0},
  {country: "Bulgaria", value: 3},
  {country: "Maldives", value: 0},
  {country: "Bangladesh", value: 3},
  {country: "Paraguay", value: 0},
  {country: "Albania", value: 2},
  {country: "Cyprus", value: 3},
  {country: "Brunei", value: 2},
  {country: "US", value: NaN},
  {country: "Burkina Faso", value: 5},
  {country: "Holy See", value: 0},
  {country: "Mongolia", value: 0},
  {country: "Panama", value: 0},
  {country: "China", value: 72814},
  {country: "Iran", value: 7931},
  {country: "Korea, South", value: 2909},
  {country: "France", value: 2200},
  {country: "Cruise Ship", value: 325},
  {country: "Denmark", value: 1},
  {country: "Czechia", value: 6},
];

const mergeCountriesStatsOutput = [ { country: 'Thailand', cases: 599, cures: 44, deaths: 1 }, 
  { country: 'Japan', deaths: 40, cures: 235, cases: 1086 },
  { country: 'Singapore', deaths: 2, cures: 144, cases: 455 },
  { country: 'Nepal', deaths: 0, cures: 1, cases: 2 },
  { country: 'Malaysia', deaths: 10, cures: 139, cases: 1306 },
  { country: 'Canada', deaths: 21, cures: 10, cases: 1470 },
  { country: 'Australia', deaths: 7, cures: 88, cases: 1314 },
  { country: 'Cambodia', deaths: 0, cures: 1, cases: 84 },
  { country: 'Sri Lanka', deaths: 0, cures: 3, cases: 82 },
  { country: 'Germany', deaths: 94, cures: 266, cases: 24873 },
  { country: 'Finland', deaths: 1, cures: 10, cases: 626 },
  { country: 'United Arab Emirates',
    deaths: 2,
    cures: 38,
    cases: 153 },
  { country: 'Philippines', deaths: 25, cures: 17, cases: 380 },
  { country: 'India', deaths: 7, cures: 27, cases: 396 },
  { country: 'Italy', deaths: 5476, cures: 7024, cases: 59138 },
  { country: 'Sweden', deaths: 21, cures: 16, cases: 1934 },
  { country: 'Spain', deaths: 1772, cures: 2575, cases: 28768 },
  { country: 'Belgium', deaths: 75, cures: 263, cases: 3401 },
  { country: 'Egypt', deaths: 14, cures: 56, cases: 327 },
  { country: 'Lebanon', deaths: 4, cures: 8, cases: 248 },
  { country: 'Iraq', deaths: 20, cures: 57, cases: 233 },
  { country: 'Oman', deaths: 0, cures: 17, cases: 55 },
  { country: 'Afghanistan', deaths: 1, cures: 1, cases: 40 },
  { country: 'Bahrain', deaths: 2, cures: 149, cases: 332 },
  { country: 'Kuwait', deaths: 0, cures: 27, cases: 188 },
  { country: 'Algeria', deaths: 17, cures: 65, cases: 201 },
  { country: 'Croatia', deaths: 1, cures: 5, cases: 254 },
  { country: 'Switzerland', deaths: 98, cures: 131, cases: 7245 },
  { country: 'Austria', deaths: 16, cures: 9, cases: 3244 },
  { country: 'Israel', deaths: 1, cures: 37, cases: 1071 },
  { country: 'Pakistan', deaths: 5, cures: 5, cases: 776 },
  { country: 'Brazil', deaths: 25, cures: 2, cases: 1593 },
  { country: 'Georgia', deaths: 0, cures: 3, cases: 54 },
  { country: 'Greece', deaths: 15, cures: 19, cases: 624 },
  { country: 'North Macedonia', deaths: 1, cures: 1, cases: 114 },
  { country: 'Norway', deaths: 7, cures: 1, cases: 2383 },
  { country: 'Romania', deaths: 3, cures: 64, cases: 433 },
  { country: 'Estonia', deaths: 0, cures: 2, cases: 326 },
  { country: 'San Marino', deaths: 20, cures: 4, cases: 160 },
  { country: 'Belarus', deaths: 0, cures: 15, cases: 76 },
  { country: 'Iceland', deaths: 1, cures: 36, cases: 568 },
  { country: 'Lithuania', deaths: 1, cures: 1, cases: 131 },
  { country: 'Mexico', deaths: 2, cures: 4, cases: 251 },
  { country: 'New Zealand', deaths: 0, cures: 0, cases: 66 },
  { country: 'Nigeria', deaths: 0, cures: 2, cases: 30 },
  { country: 'Ireland', deaths: 4, cures: 5, cases: 906 },
  { country: 'Luxembourg', deaths: 8, cures: 6, cases: 798 },
  { country: 'Monaco', deaths: 0, cures: 1, cases: 23 },
  { country: 'Qatar', deaths: 0, cures: 33, cases: 494 },
  { country: 'Ecuador', deaths: 14, cures: 3, cases: 789 },
  { country: 'Azerbaijan', deaths: 1, cures: 10, cases: 65 },
  { country: 'Armenia', deaths: 0, cures: 2, cases: 194 },
  { country: 'Dominican Republic', deaths: 3, cures: 0, cases: 202 },
  { country: 'Indonesia', deaths: 48, cures: 29, cases: 514 },
  { country: 'Portugal', deaths: 14, cures: 5, cases: 1600 },
  { country: 'Andorra', deaths: 1, cures: 1, cases: 113 },
  { country: 'Latvia', deaths: 0, cures: 1, cases: 139 },
  { country: 'Morocco', deaths: 4, cures: 3, cases: 115 },
  { country: 'Saudi Arabia', deaths: 0, cures: 16, cases: 511 },
  { country: 'Senegal', deaths: 0, cures: 5, cases: 67 },
  { country: 'Argentina', deaths: 4, cures: 3, cases: 225 },
  { country: 'Chile', deaths: 1, cures: 8, cases: 632 },
  { country: 'Jordan', deaths: 0, cures: 1, cases: 112 },
  { country: 'Ukraine', deaths: 3, cures: 1, cases: 73 },
  { country: 'Hungary', deaths: 6, cures: 16, cases: 131 },
  { country: 'Liechtenstein', deaths: 0, cures: 0, cases: 37 },
  { country: 'Poland', deaths: 7, cures: 1, cases: 634 },
  { country: 'Tunisia', deaths: 3, cures: 1, cases: 75 },
  { country: 'Bosnia and Herzegovina',
    deaths: 1,
    cures: 2,
    cases: 126 },
  { country: 'Slovenia', deaths: 2, cures: 0, cases: 414 },
  { country: 'South Africa', deaths: 0, cures: 0, cases: 274 },
  { country: 'Bhutan', deaths: 0, cures: 0, cases: 2 },
  { country: 'Cameroon', deaths: 0, cures: 0, cases: 40 },
  { country: 'Colombia', deaths: 2, cures: 3, cases: 231 },
  { country: 'Costa Rica', deaths: 2, cures: 2, cases: 134 },
  { country: 'Peru', deaths: 5, cures: 1, cases: 363 },
  { country: 'Serbia', deaths: 2, cures: 1, cases: 222 },
  { country: 'Slovakia', deaths: 1, cures: 7, cases: 185 },
  { country: 'Togo', deaths: 0, cures: 1, cases: 16 },
  { country: 'Malta', deaths: 0, cures: 2, cases: 90 },
  { country: 'Martinique', deaths: 1, cures: 0, cases: 37 },
  { country: 'Bulgaria', deaths: 3, cures: 3, cases: 187 },
  { country: 'Maldives', deaths: 0, cures: 0, cases: 13 },
  { country: 'Bangladesh', deaths: 2, cures: 3, cases: 27 },
  { country: 'Paraguay', deaths: 1, cures: 0, cases: 22 },
  { country: 'Albania', deaths: 2, cures: 2, cases: 89 },
  { country: 'Cyprus', deaths: 1, cures: 3, cases: 95 },
  { country: 'Brunei', deaths: 0, cures: 2, cases: 88 },
  { country: 'US', deaths: NaN, cures: NaN, cases: NaN },
  { country: 'Burkina Faso', deaths: 4, cures: 5, cases: 75 },
  { country: 'Holy See', deaths: 0, cures: 0, cases: 1 },
  { country: 'Mongolia', deaths: 0, cures: 0, cases: 10 },
  { country: 'Panama', deaths: 3, cures: 0, cases: 245 },
  { country: 'China', deaths: 3274, cures: 72814, cases: 81439 },
  { country: 'Iran', deaths: 1685, cures: 7931, cases: 21638 },
  { country: 'Korea, South', deaths: 104, cures: 2909, cases: 8897 },
  { country: 'France', deaths: 674, cures: 2200, cases: 16044 },
  { country: 'Cruise Ship', deaths: 8, cures: 325, cases: 712 },
  { country: 'Denmark', deaths: 13, cures: 1, cases: 1514 },
  { country: 'Czechia', deaths: 1, cures: 6, cases: 1120 }
];

describe('mergeCountriesUtil', () => {
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
