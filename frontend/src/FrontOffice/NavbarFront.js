import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavbarFront() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleTaskClick = () => {
    setShowCreateTaskModal(true); // Afficher le modal lorsque le bouton est cliqué
  };


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Inverser l'état de la liste déroulante lorsqu'elle est cliquée
  };

  return (
    <header>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="#" className="logo" style={{ width: '250px', marginTop: '9px', marginLeft: '30px' }}>
                  <img src="templateFront/images/logo.png" alt="Softy Pinko" />
                </a>
                <ul className="nav">
                  <li><Link to="/home" className="active">Home</Link></li>
                  <li><a href="#features">Your Job</a></li>
                  <li><a href="#work-process">Table board </a></li>
                  <li><a href="#testimonials">  Team</a></li>



                 
                  {/* Bouton déroulant "Claim" */}
                  <li className="dropdown" onClick={toggleDropdown}>
                    <button className="dropbtn">Claim
                      <i className="fa fa-caret-down"></i>
                    </button>
                    {showDropdown && (
                      <div className="dropdown-content">
                        
                        <Link to="/reclamationsFront">Consulter mes réclamations</Link>
                        <Link to="/addReclamation">Ajouter une réclamation</Link>
                        
                      </div>
                    )}
                  </li>


                  <li className="dropdown">
                    <button className="dropbtn">Task
                      <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                      <a onClick={handleTaskClick}>Create Task</a>
                    </div>
                  </li>
                  <li><a href="#contact-us">Sign up </a></li>
                </ul>
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* Ajoutez le composant ModalCrrerTicket ici */}

      
    </header>
  );
}

export default NavbarFront;
