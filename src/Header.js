import React, { Component } from 'react';
import ForkMeOnGithub from 'fork-me-on-github';
import Dropdown from './Dropdown';
import Icon from './Icon';
import Search from './Search';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearch: false,
      showSettings: false,
    };
    this.headerContentRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      headerHeight,
    } = this.props;
    const {
      showSearch,
      showSettings,
    } = this.state;
    if (
      headerHeight !== prevProps.headerHeight ||
      showSearch !== prevState.showSearch ||
      showSettings !== prevState.showSettings
    ) {
      this.getHeaderRefHeight()
    }
  }

  setHeaderIsExpanded(value, mode) {
    const {
      handleHeaderIsExpanded,
    } = this.props;
    const {
      showSearch,
      showSettings,
    } = this.state;
    if (value) {
      handleHeaderIsExpanded(true);
    } else if (!value && mode === 'search' && showSettings) {
      handleHeaderIsExpanded(true);
    } else if (!value && mode === 'settings' && showSearch) {
      handleHeaderIsExpanded(true);
    } else if (!value && mode === 'search' && !showSettings) {
      // Syntax sugar
      handleHeaderIsExpanded(false);
    } else if (!value && mode === 'settings' && !showSearch) {
      // Syntax sugar
      handleHeaderIsExpanded(false);
    } else {
      handleHeaderIsExpanded(false);
    }
  }

  getHeaderRefHeight() {
    const {
      handleHeaderHeight,
    } = this.props;
    const finalHeaderHeight = Math.max(
      this.headerContentRef.current.clientHeight,
      this.headerContentRef.current.offsetHeight,
      this.headerContentRef.current.scrollHeight,
    )
    handleHeaderHeight(finalHeaderHeight);
  }

  handleShowSearch() {
    const {
      showSearch,
    } = this.state;
    this.setState({
      showSearch: !showSearch
    });
    this.setHeaderIsExpanded(!showSearch, 'search');
    this.getHeaderRefHeight('search');
  };

  handleShowSettings() {
    const {
      showSettings,
    } = this.state;
    this.setState({
      showSettings: !showSettings
    });
    this.setHeaderIsExpanded(!showSettings, 'settings');
    this.getHeaderRefHeight('settings');
  };

  handleSearch(value) {
    const { handleIsSearching, handleSearchValue } = this.props;
    handleIsSearching(true);
    handleSearchValue(value);
  };

  render() {
    const {
      loading,
      handleSortBy,
      headerIsExpanded,
      searchValue,
      sortBy
    } = this.props;
    const { showSearch, showSettings } = this.state;
    const options = [
      {
        value: 'cases',
        title: 'Cases',
      },
      {
        value: 'country',
        title: 'Country',
      },
      {
        value: 'cures',
        title: 'Cures',
      },
      {
        value: 'curesPercent',
        title: 'Cures Percent',
      },
      {
        value: 'deaths',
        title: 'Deaths',
      },
      {
        value: 'deathsPercent',
        title: 'Deaths Percent',
      },
      {
        value: 'sick',
        title: 'Sick',
      },
    ];
    const placeholder = 'Sort by';
    return (
      <div
        className={`header${headerIsExpanded ? ' is-expanded' : ''}`}
      >
        <ForkMeOnGithub
          repo="https://github.com/dreamyguy/covid-19"
          side="left"
        />
        <div className="header__content" ref={this.headerContentRef}>
          <div className="header__items display-flex align-center">
            <div className="logo display-flex flex-direction-column">
              <h1 className="heading--site">COVID-19</h1>
              <div className="legends display-flex">
                <div className="legend legend--cures">
                  <span className="legend__color" />
                  <span className="legend__label">Cures</span>
                </div>
                <div className="legend legend--sick">
                  <span className="legend__color" />
                  <span className="legend__label">Sick</span>
                </div>
                <div className="legend legend--deaths">
                  <span className="legend__color" />
                  <span className="legend__label">Deaths</span>
                </div>
              </div>
            </div>
            <div className="message display-flex flex-direction-column">
              <h2 className="heading--message">There's a human story behind every number.</h2>
            </div>
            <div className="options display-flex">
              <button className={`option option--search${showSearch ? ' is-active' : ''}`} onClick={this.handleShowSearch.bind(this)}>
                {showSearch
                  ?
                    <Icon icon="search" color="white" size="24" />
                  :
                    <Icon icon="search" size="24" />
                }
              </button>
              <button className={`option option--settings${showSettings ? ' is-active' : ''}`} onClick={this.handleShowSettings.bind(this)}>
                {showSettings
                  ?
                    <Icon icon="filter" color="white" size="24" />
                  :
                    <Icon icon="filter" size="24" />
                }
              </button>
            </div>
          </div>
          {showSettings && (
            <Dropdown
              name="dropdown--sortby"
              classes="dropdown--sortby"
              label="Sort by:"
              // eslint-disable-next-line react/jsx-boolean-value
              labelPlacement="left"
              selectedvalue={sortBy}
              disabled={loading}
              options={options}
              placeholder={placeholder}
              onChange={(e) => {
                handleSortBy(e.target.value)
              }}
            />
          )}
          {showSearch && (
            <Search
              classes="search--country"
              value={searchValue}
              placeholder="Filter by country name"
              onChangeHandler={(value) => {
                this.handleSearch(value)
              }}
            />
          )}
        </div>
      </div>
    );
  }
};

export default Header;