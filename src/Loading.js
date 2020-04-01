import React from 'react';
import Icon from './Icon';
import './Loading.css';

const Loading = () => (
  <div className="loading__text">
    <h3>Fetching live data and preparing it.</h3>
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
);

export default Loading;
