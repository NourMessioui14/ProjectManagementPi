import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskModal from '../Backoffice/components/Ticket/TaskModal';

function NavbarFront() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleTaskClick = () => {
    setShowCreateTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateTaskModal(false);
  };

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
                  <li><Link to="/messenger">Chatroom</Link></li>
                  {/* Dropdown Réclamations */}
                  <li className="dropdown" onClick={toggleDropdown}>
                    <button className="dropbtn">Claims <i className="fa fa-caret-down"></i></button>
                    {showDropdown && (
                      <div className="dropdown-content">
                        <Link to="/reclamationsFront">View My Claims</Link>
                        <Link to="/addReclamation">Add a Claim</Link>
                      </div>
                    )}
                  </li>
                  {/* Dropdown Tâches */}
                  <li className="dropdown">
                    <button className="dropbtn">Tasks <i className="fa fa-caret-down"></i></button>
                    <div className="dropdown-content">
                      <a onClick={handleTaskClick}>Create Task</a>
                    </div>
                  </li>
                  <li><a href="#contact-us">Sign Up</a></li>
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
      <TaskModal isOpen={showCreateTaskModal} onClose={handleCloseModal} />
    </header>
  );
}

export default NavbarFront;
