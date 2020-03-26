import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4'
import { mergeCountriesStats, getData } from './utils/covid19Util';
import { isNotEmptyArray } from './utils/isEmptyUtil';
import './App.css';

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

const renderStats = stats => {
  const output = [];
  stats.forEach(st => {
    const {
      country,
      cases,
      cures,
      deaths,
    } = st;
    output.push(
      <li key={uuid()}>
        <p>Country: {country}</p>
        <p>Cases: {cases}</p>
        <p>Cures: {cures}</p>
        <p>Deaths: {deaths}</p>
      </li>
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
            const array0 = await getData(res[0].data);
            const array1 = await getData(res[1].data);
            const array2 = await getData(res[2].data);
            if (
              isNotEmptyArray(array0) &&
              isNotEmptyArray(array1) &&
              isNotEmptyArray(array2)
            ) {
              setState({
                stats: mergeCountriesStats({
                  cases: array0,
                  cures: array1,
                  deaths: array2,
                }),
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
    <div className="App">
      <p>COVID-19</p>
      {loading &&
        <p>Loading...</p>
      }
      {!loading && stats && isNotEmptyArray(stats) &&
        <ul>
          {renderStats(stats)}
        </ul>
      }
    </div>
  );
}

export default App;
