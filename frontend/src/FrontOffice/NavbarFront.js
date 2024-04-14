import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskModal from '../Backoffice/components/Ticket/TaskModal';
import { FaCog } from 'react-icons/fa'; // Import de l'icône de paramètre
import LogoutButton from '../Backoffice/components/LogoutButton';
function NavbarFront() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // État pour afficher ou masquer le dropdown de profil

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleTaskClick = () => {
    setShowCreateTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateTaskModal(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
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
                  <li><Link to="/home" >Home</Link></li>
                  <li><Link to="/cardproject" >Your Job </Link></li>
                  <li><Link to="/sprintFront" >Sprint  </Link></li>
                  <li><Link to="/messenger" >Chatroom</Link></li>
                  
                  {/* Dropdown Réclamations */}
                  <li className="dropdown"  onClick={toggleDropdown}>
                    <button className="active">Claims <i className="fa fa-caret-down"></i></button>
                    {showDropdown && (
                      <div className="">
                        <Link to="/reclamationsFront">View My Claims</Link>
                        <Link to="/addReclamation">Add a Claim</Link>
                      </div>
                    )}
                  </li>
                  {/* Dropdown Tâches */}
                  <li className="nav-item dropdown">
                    <button className="dropbtn">Tasks <i className="fa fa-caret-down"></i></button>
                    <div className="dropdown-content">
                      <a onClick={handleTaskClick}>Create Task</a>
                    </div>
                  </li>
                  {/* Icône de profil avec dropdown */}
                  <li>
  <Link to="/userconnected" className="dropdown-item">
    <i className="fas fa-user"></i> Profile
  </Link>
</li>

<LogoutButton>
  <i className="fas fa-door-open"></i>
</LogoutButton>




                </ul>
                {/* Bouton de menu pour appareils mobiles */}
              
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
