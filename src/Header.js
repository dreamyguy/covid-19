import React from 'react';
import './App.css';

const Header = () => (
  <div className="header display-flex align-center">
    <div className="display-flex flex-direction-column">
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
    <div className="grid">
      <div className="settings">
        {/* <button className="button button--settings"/> */}
      </div>
    </div>
  </div>
);

export default Header;
