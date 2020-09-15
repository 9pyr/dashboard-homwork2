import '../../styles/index.scss';
import '../../styles/header.scss';

import React from 'react';

export default function Header() {
  return (
    <div className="container">
      <nav className="flex center">
        <div className="wd row" style={{ background: '#f9fdff' }}>
          <div className="nav-header flex row center">
            {/* <div className="box"></div> */}
            <button id="logo" className="btn bg-clean large center mx-6">
              DASHBOARD
            </button>
          </div>
          <div className="nav-body right"></div>
        </div>
      </nav>
    </div>
  );
}
