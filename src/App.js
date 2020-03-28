import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4'
import { mergeCountriesStats, getData, enrichCountriesStats, sortCountriesBy } from './utils/covid19Util';
import { isNotEmptyArray } from './utils/isEmptyUtil';
import './App.css';
import Header from './Header';

const casesData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
const curesData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';
const deathsData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const initialState = {
  errorStats: '',
  headerHeight: 78,
  headerIsExpanded: false,
  loading:  false,
  sortBy: 'deathsPercent',
  stats: [],
};

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

const renderCountry = (country, rank) => {
  const {
    country: countryName,
    cases,
    cures,
    deaths,
    casesPercent,
    curesPercent,
    deathsPercent,
  } = country;
  return (
    <li key={uuid()} className="country" >
      <div>
        <h2 className="heading--country">{rank}. {countryName}</h2>
        <div className="display-flex stats">
          <span className="stat stat--cases">{cases}</span>
          <span className="stat stat--cures">{cures}</span>
          <span className="stat stat--deaths">{deaths}</span>
        </div>
      </div>
      <div className="display-flex percentages">
        <div className="percentage percentage--cases" style={{ width: `${casesPercent}%` }} />
        <div className="percentage percentage--cures" style={{ width: `${curesPercent}%` }} />
        <div className="percentage percentage--deaths" style={{ width: `${deathsPercent}%` }} />
      </div>
    </li>
  );
}

const renderStats = stats => {
  const output = [];
  stats.forEach((st, i) => {
    output.push(
      renderCountry(st, i + 1)
    )
  })
  return output;
}

const App = () => {

  const [state, setState] = useReducer(reducer, initialState);

  // 'sortBy' value is returned all the way from 'Header' > 'Dropdown'
  const handleSortBy = (sortBy) => {
    setState(({ sortBy }));
  };
  // 'headerHeight' value is returned from 'Header'
  const handleHeaderHeight = (headerHeight) => {
    setState(({ headerHeight }));
  };
  // 'handleHeaderIsExpanded' status is returned from 'Header'
  const handleHeaderIsExpanded = (headerIsExpanded) => {
    setState(({ headerIsExpanded }));
  };

  useEffect(() => {
    setState({ loading: true });
    const getCasesData = () => axios.get(casesData)
    const getCuresData = () => axios.get(curesData)
    const getDeathsData = () => axios.get(deathsData);
    axios.all([
        getCasesData(),
        getCuresData(),
        getDeathsData(),
      ])
      .then(res => {
        if (res && isNotEmptyArray(res)) {
          // We need to do this because 'csv2json' (used by 'getData()')
          // returns a promise object
          const run = async () => {
            const cases = await getData(res[0].data);
            const cures = await getData(res[1].data);
            const deaths = await getData(res[2].data);
            if (
              isNotEmptyArray(cases) &&
              isNotEmptyArray(cures) &&
              isNotEmptyArray(deaths)
            ) {
              setState({
                stats: enrichCountriesStats(mergeCountriesStats({
                  cases,
                  cures,
                  deaths,
                })),
                loading: false
              });
            }
          }
          return run();
        }
      })
      .catch(err => {
        setState({
          errorStats: err.message,
          loading: false
        });
      });
  }, []);

  const {
    headerHeight,
    headerIsExpanded,
    loading,
    sortBy,
    stats,
  } = state;

  const headerTopPadding = headerIsExpanded ? `${headerHeight + 30}px` : `${78 + 30}px`;

  return (
    <>
      <Header
        handleHeaderHeight={handleHeaderHeight}
        handleHeaderIsExpanded={handleHeaderIsExpanded}
        handleSortBy={handleSortBy}
        headerHeight={headerHeight}
        headerIsExpanded={headerIsExpanded}
        loading={loading}
        sortBy={sortBy}
      />
      <div className="app align-center" style={{ paddingTop: headerTopPadding }}>
        {loading &&
          <h3>Loading...</h3>
        }
        {!loading && stats && isNotEmptyArray(stats) &&
          <ul className="countries">
            {renderStats(sortCountriesBy({
              countries: stats,
              sortBy,
              mode: 'desc',
            }))}
          </ul>
        }
      </div>
    </>
  );
}

export default App;
