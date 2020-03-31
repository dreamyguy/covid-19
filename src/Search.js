/*
  <Search
    title=""
    icon=""
    placeholder="Søk på navn"
    value={state.value}
    onChangeHandler={(value) => console.log(value)}
  />
*/

import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import Icon from './Icon'
import './Search.css'

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      showClear: false,
      inputValue: ''
    }
  }

  render() {
    const {
      classes = '', // accepts CSS classNames as string
      title = '',
      onChangeHandler,
      icon = 'search',
      type = 'text',
      value = '',
      placeholder = 'Søk'
    } = this.props;
    const {
      inputValue,
      showClear,
    } = this.state;
    return (
      <div className={`search${classes ? ' ' + classes : ''}`}>
        <label htmlFor="search" >
          {title &&
            <span className="search__label">
              <em>{title}</em>
            </span>
          }
          <input
            id={uuidv4()}
            className="search__input"
            autoComplete="off"
            value={value ? value : inputValue}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              this.setState({
                showClear: (e.target.value !== ''),
                inputValue: e.target.value
              })
              onChangeHandler(e.target.value)
            }}
          />
          {icon &&
            <Icon classes="search__icon-search" icon={icon} size="16"/>
          }
          {showClear &&
          <div
            className="search__icon-close"
            onClick={() => {
              onChangeHandler('')
              this.setState({
                showClear: false,
                inputValue: ''
              })
            }}>
            <Icon
              icon="close"
              size="12"
            />
          </div>
          }
        </label>
      </div>
    );
  }
}

export default Search;
