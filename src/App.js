import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4'
import { mergeCountriesStats, getData, distributePercentage } from './utils/covid19Util';
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

const renderCountry = ({ country, cases, cures, deaths }) => {
  const percentages = distributePercentage({ country, cases, cures, deaths });
  const { casesPc, curesPc, deathsPc } = percentages;
  return (
    <li key={uuid()} className="country" >
      <div>
        <h2>{country}</h2>
        <div className="display-flex stats">
          <span className="stat stat--cases">{cases}</span>
          <span className="stat stat--cures">{cures}</span>
          <span className="stat stat--deaths">{deaths}</span>
        </div>
      </div>
      <div className="display-flex percentages">
        <div className="percentage percentage--cases" style={{ width: `${casesPc}%` }} />
        <div className="percentage percentage--cures" style={{ width: `${curesPc}%` }} />
        <div className="percentage percentage--deaths" style={{ width: `${deathsPc}%` }} />
      </div>
    </li>
  );
}

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
      renderCountry({ country, cases, cures, deaths })
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
                stats: mergeCountriesStats({
                  cases,
                  cures,
                  deaths,
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
