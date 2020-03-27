import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4'
import { mergeCountriesStats, getData, enrichCountriesStats } from './utils/covid19Util';
import { isNotEmptyArray } from './utils/isEmptyUtil';
import './App.css';
import Header from './Header';

const casesData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
const curesData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';
const deathsData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const initialState = {
  stats: [],
  errorStats: '',
  loading:  false,
};

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

const renderCountry = country => {
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
        <h2 className="heading--country">{countryName}</h2>
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
  stats.forEach(st => {
    output.push(
      renderCountry(st)
    )
  })
  return output;
}

const App = () => {

  const [state, setState] = useReducer(reducer, initialState);

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
    stats,
    loading,
  } = state;

  return (
    <>
      <Header />
      <div className="app align-center">
        {loading &&
          <h3>Loading...</h3>
        }
        {!loading && stats && isNotEmptyArray(stats) &&
          <ul className="countries">
            {renderStats(stats)}
          </ul>
        }
      </div>
    </>
  );
}

export default App;
