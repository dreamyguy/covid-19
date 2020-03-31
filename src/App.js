import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4'
import containsString, {
  mergeCountriesStats,
  getData,
  enrichCountriesStats,
  sortCountriesBy
} from './utils/covid19Util';
import { isNotEmptyArray } from './utils/isEmptyUtil';
import './App.css';
import Header from './Header';
import Icon from './Icon';
import Footer from './Footer';

const casesData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
const curesData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';
const deathsData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const initialState = {
  errorStats: '',
  headerHeight: null,
  headerIsExpanded: false,
  isSearching: false,
  searchValue: '',
  loading:  false,
  sortBy: 'cases',
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
    sick,
    sickPercent,
    curesPercent,
    deathsPercent,
  } = country;
  return (
    <li key={uuid()} className="country" >
      <div>
        <h2 className="heading--country">{rank}. {countryName}</h2>
        <div className="display-flex stats">
          {cures ? <span className="stat stat--cures">{cures}</span> : null}
          {sick ? <span className="stat stat--sick">{sick}</span> : null}
          {deaths ? <span className="stat stat--deaths">{deaths}</span> : null}
        </div>
      </div>
      <div className="display-flex percentages">
        <div className="percentage percentage--cures" style={{ width: `${curesPercent}%` }} />
        <div className="percentage percentage--sick" style={{ width: `${sickPercent}%` }} />
        <div className="percentage percentage--deaths" style={{ width: `${deathsPercent}%` }} />
      </div>
      <div className="total">{cases}</div>
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

const renderStatsSearch = ({ stats, isSearching, searchValue }) => {
  const output = [];
  stats.forEach((st, i) => {
    if (containsString(st.country, searchValue)) {
      output.push(
        renderCountry(st, i + 1)
      )
    }
  })
  return output;
}

const App = () => {

  const [state, setState] = useReducer(reducer, initialState);

  // 'sortBy' value is returned all the way from 'Header' > 'Dropdown'
  const handleSortBy = (sortBy) => {
    setState({ sortBy });
  };
  // 'headerHeight' value is returned from 'Header'
  const handleHeaderHeight = (headerHeight) => {
    setState({ headerHeight });
  };
  // 'handleHeaderIsExpanded' status is returned from 'Header'
  const handleHeaderIsExpanded = (headerIsExpanded) => {
    setState({ headerIsExpanded });
  };
  // 'handleIsSearching' status is returned from 'Header'
  const handleIsSearching = (isSearching) => {
    setState({ isSearching });
  };
  // 'handleSearchValue' value is returned from 'Header'
  const handleSearchValue = (searchValue) => {
    setState({ searchValue });
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
    isSearching,
    loading,
    searchValue,
    sortBy,
    stats,
  } = state;

  const headerTopPadding = headerIsExpanded ? `${headerHeight + 30}px` : `${78 + 30}px`;

  return (
    <>
      <Header
        handleHeaderHeight={handleHeaderHeight}
        handleHeaderIsExpanded={handleHeaderIsExpanded}
        handleIsSearching={handleIsSearching}
        handleSearchValue={handleSearchValue}
        handleSortBy={handleSortBy}
        headerHeight={headerHeight}
        headerIsExpanded={headerIsExpanded}
        loading={loading}
        sortBy={sortBy}
      />
      <div className="app align-center" style={{ paddingTop: headerTopPadding }}>
        {loading &&
          <div className="loading__text">
            <h3>Fetching live data and preparing it.</h3>
            <h4><em>Each number has a human story behind it!</em></h4>
            <p className="loading__option">
              <b>Once the loading is done</b>:
            </p>
            <p className="loading__option">
              <span className="option option--settings centered">
                <Icon icon="filter" size="24" />
              </span>
              Activate filtering options.
            </p>
            <p>
              <span className="option option--search centered">
                <Icon icon="search" size="24" />
              </span>
              Search by country name.
            </p>
            <p>Number of cases is the default view, <em><b>but the data can be filtered</b> to show other calculations</em>.</p>
          </div>
        }
        {!loading && stats && isNotEmptyArray(stats) &&
          <ul className="countries">
            {isSearching && searchValue
              ?
                <>
                  {renderStatsSearch({
                    stats: sortCountriesBy({
                      countries: stats,
                      sortBy,
                      mode: 'desc',
                    }),
                    isSearching,
                    searchValue
                  })}
                </>
              :
                <>
                  {renderStats(sortCountriesBy({
                    countries: stats,
                    sortBy,
                    mode: 'desc',
                  }))}
                </>
            }
          </ul>
        }
      </div>
      <Footer />
    </>
  );
}

export default App;
