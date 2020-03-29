import React, { Component } from 'react';
import ForkMeOnGithub from 'fork-me-on-github';
import Dropdown from './Dropdown';
import Icon from './Icon';
import Search from './Search';
import './App.css';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearch: false,
      showSettings: false,
      height: ''
    };
    this.headerRef = React.createRef();
  }
  getHeaderRefHeight() {
    const {
      handleHeaderHeight,
      handleHeaderIsExpanded,
      headerIsExpanded,
    } = this.props;
    const finalHeight = Math.max(
      this.headerRef.current.clientHeight,
      this.headerRef.current.offsetHeight,
      this.headerRef.current.scrollHeight,
    )
    this.setState({ height: finalHeight + 70 });
    handleHeaderHeight(finalHeight + 70);
    handleHeaderIsExpanded(!headerIsExpanded);
  }
  handleShowSearch() {
    const { handleIsSearching } = this.props;
    const { showSearch } = this.state;
    if (showSearch) {
      handleIsSearching(false);
    }
    this.setState({
      showSearch: !showSearch
    });
    this.getHeaderRefHeight();
  };
  handleShowSettings() {
    const { showSettings } = this.state;
    this.setState({
      showSettings: !showSettings
    });
    this.getHeaderRefHeight();
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
      headerHeight,
      headerIsExpanded,
      searchValue,
      sortBy
    } = this.props;
    const { showSearch, showSettings } = this.state;
    const currentHeight = headerIsExpanded ? `${headerHeight}px` : '78px';
    const options = [
      {
        value: 'country',
        title: 'Country',
      },
      {
        value: 'cases',
        title: 'Cases',
      },
      {
        value: 'cures',
        title: 'Cures',
      },
      {
        value: 'deaths',
        title: 'Deaths',
      },
      {
        value: 'casesPercent',
        title: 'Cases Percent',
      },
      {
        value: 'curesPercent',
        title: 'Cures Percent',
      },
      {
        value: 'deathsPercent',
        title: 'Deaths Percent',
      },
      {
        value: 'total',
        title: 'Total',
      },
    ];
    const placeholder = 'Sort by';
    return (
      <div
        ref={this.headerRef}
        className={`header${headerIsExpanded ? ' is-expanded' : ''}`}
        style={{ height: currentHeight }}
      >
        <ForkMeOnGithub
          repo="https://github.com/dreamyguy/covid-19"
          side="left"
        />
        <div className="header__items display-flex align-center">
          <div className="logo display-flex flex-direction-column">
            <h1 className="heading--site">COVID-19</h1>
            <div className="legends display-flex">
              <div className="legend legend--cases">
                <span className="legend__color" />
                <span className="legend__label">Cases</span>
              </div>
              <div className="legend legend--cures">
                <span className="legend__color" />
                <span className="legend__label">Cures</span>
              </div>
              <div className="legend legend--deaths">
                <span className="legend__color" />
                <span className="legend__label">Deaths</span>
              </div>
            </div>
          </div>
          <div className="options display-flex">
            <div className={`option option--search${showSearch ? ' is-active' : ''}`} onClick={this.handleShowSearch.bind(this)}>
              {showSearch
                ?
                  <Icon icon="search" color="white" size="24"/>
                :
                  <Icon icon="search" size="24"/>
              }
            </div>
            <div className={`option option--settings${showSettings ? ' is-active' : ''}`} onClick={this.handleShowSettings.bind(this)}>
              {showSettings
                ?
                  <Icon icon="filter" color="white" size="24"/>
                :
                  <Icon icon="filter" size="24"/>
              }
            </div>
          </div>
        </div>
        {showSettings &&
          <Dropdown
            name="dropdown--sortby"
            classes="dropdown--sortby"
            label="Sort by:"
            selectedvalue={sortBy}
            disabled={loading}
            options={options}
            placeholder={placeholder}
            onChange={(e) => {
              handleSortBy(e.target.value)
            }}
          />
        }
        {showSearch &&
          <Search
            classes="search--country"
            title="Filter by country name"
            value={searchValue}
            placeholder="Filter by country name"
            onChangeHandler={(value) => {
              this.handleSearch(value)
            }}
          />
        }
      </div>
    );
  }
};

export default Header;