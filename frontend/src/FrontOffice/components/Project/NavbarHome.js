import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function NavbarHome() {







  return (
    <header>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* Logo */}
                <Link to="/home" className="logo" style={{ width: '250px', marginTop: '9px', marginLeft: '30px' }}>
                  <img src="templateFront/images/logo.png" alt="Softy Pinko" />
                </Link>
                {/* Liens de navigation */}
                <ul className="nav">
                  <li><Link to="/home" className="active">Home</Link></li>
                  <li><a href="#features">Your Job</a></li>
                  <li><a href="#work-process">Agile Board</a></li>
                  <li><a href="#testimonials">Scrum Board</a></li>
                  {/* Dropdown Réclamations */}
                
                  <li><Link to="/login">Sign Up</Link></li>
                </ul>
                {/* Bouton de menu pour appareils mobiles */}
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* Modal pour créer une tâche */}
    </header>
  );
}

export default NavbarHome;
