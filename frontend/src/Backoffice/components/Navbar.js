import React from 'react';

function Navbar({ userName }) {
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </a>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li className="nav-item dropdown">
            <a className="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-bs-toggle="dropdown">
              <div className="position-relative">
                <i className="align-middle" data-feather="bell"></i>
                <span className="indicator">4</span>
              </div>
            </a>
            {/* Autres éléments de la barre de navigation */}
          </li>
          {/* Autres éléments de la barre de navigation */}
        </ul>
        <div className="navbar-text">
          {userName && <span>Bienvenue, {userName} !</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
