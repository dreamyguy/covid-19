import React, { Component } from 'react';
import Dropdown from './Dropdown';
import './App.css';
import Icon from './Icon';

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
      headerIsExpanded
    } = this.props;
    const finalHeight = Math.max(
      this.headerRef.current.clientHeight,
      this.headerRef.current.offsetHeight,
      this.headerRef.current.scrollHeight,
    )
    this.setState({ height: finalHeight + 63 })
    handleHeaderHeight(finalHeight + 63);
    handleHeaderIsExpanded(!headerIsExpanded);
  }
  handleShowFilter() {
    const { showSearch } = this.state;
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
  render() {
    const {
      loading,
      handleSortBy,
      headerHeight,
      headerIsExpanded,
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
            <div className={`option option--search${showSearch ? ' is-active' : ''}`} onClick={this.handleShowFilter.bind(this)}>
              {showSearch
                ?
                  <Icon icon="search" color="white" size="30"/>
                :
                  <Icon icon="search" size="30"/>
              }
            </div>
            <div className={`option option--settings${showSettings ? ' is-active' : ''}`} onClick={this.handleShowSettings.bind(this)}>
              {showSettings
                ?
                  <Icon icon="filter" color="white" size="30"/>
                :
                  <Icon icon="filter" size="30"/>
              }
            </div>
          </div>
        </div>
        {showSettings &&
          <Dropdown
            name={'name'}
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
      </div>
    );
  }
};

export default Header;