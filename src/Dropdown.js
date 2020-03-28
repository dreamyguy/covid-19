/*
  const languages = [{value: '1', title:'Norsk'},{value: '2', title:'Norsk2'},{value: '3', title:'Norsk3'}]
  <Dropdown
    name={'name'}
    selectedvalue={options.findIndex((option) => option.title === value )}
    disabled={disabled}
    options={languages}
    placeholder={placeholder}
    onChange={(e) => console.log(e.target.value)}
  />
*/

import React, { Component } from 'react';
import './Dropdown.css'
import Icon from './Icon'
import uuidv4 from 'uuid/v4';

class Dropdown extends Component {
  renderDropDown() {
    const {
      disabled = false,
      options = [],
      placeholder = '',
      selectedvalue = '',
      name = '',
    } = this.props;
    const optionsList = options.map(option => {
      return (
        <option value={option.value} key={uuidv4()}>{option.title}</option>
      )
    })
    return (
      <select
        name={name || ''}
        disabled={disabled}
        value={selectedvalue}
        {...this.props}
      >
        {placeholder &&
          <option value="">{placeholder}</option>
        }
        {optionsList}
      </select>
    )
  }
  render() {
    const {
      classes = '', // accepts CSS classNames as string
      label = '',
      size = ''
    } = this.props;
    return (
      <div className={`${size ? `dropdown--${size}` : ''}${classes ? ' ' + classes : ''}`}>
        <label className="dropdown">
          {label &&
            <span className="dropdown__label">
              <em>{label}</em>
            </span>
          }
          {this.renderDropDown()}
          <Icon classes="dropdown__icon" icon="chevron" size="12"/>
        </label>
      </div>
    );
  }
}

export default Dropdown;
