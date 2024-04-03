import React, { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD

function NavbarFront() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
=======
<<<<<<< HEAD
=======
import TaskModal from '../Backoffice/components/Ticket/TaskModal';
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

function NavbarFront() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  const handleTaskClick = () => {
    setShowCreateTaskModal(true); // Afficher le modal lorsque le bouton est cliqué
  };

<<<<<<< HEAD

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Inverser l'état de la liste déroulante lorsqu'elle est cliquée
  };

=======
<<<<<<< HEAD
=======
  const handleCloseModal = () => {
    setShowCreateTaskModal(false);
  };

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  return (
    <header>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
                <a href="#" className="logo" style={{ width: '250px', marginTop: '9px', marginLeft: '30px' }}>
                  <img src="templateFront/images/logo.png" alt="Softy Pinko" />
                </a>
                <ul className="nav">
                  <li><Link to="/home" className="active">Home</Link></li>
<<<<<<< HEAD
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


=======
=======
                <Link to="/home" className="logo" style={{ width: '250px', marginTop: '9px', marginLeft: '30px' }}>
                  <img src="templateFront/images/logo.png" alt="Softy Pinko" />
                </Link>
                <ul className="nav">
                  <li><Link to="/home" className="active">Home</Link></li>
<<<<<<< HEAD
                  <li><Link to="#features">Your Job</Link></li>
                  <li><Link to="#work-process">Table board </Link></li>
                  <li><Link to="#testimonials">  Team</Link></li>
                  <li><Link to="#pricing-plans">Claim</Link></li>
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
                  <li><a href="#features">Your Job</a></li>
                  <li><a href="#work-process">Table board </a></li>
                  <li><a href="#testimonials">  Team</a></li>
                  <li><a href="#pricing-plans">Claim</a></li>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  <li><a href="#blog">Blog Entries</a></li>
                  <li><Link to="/" className="active">SignUp</Link></li>
=======
>>>>>>> 49266e5875dc045414d9cfd61d0c8b5d64466994
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
                  <li className="dropdown">
                    <button className="dropbtn">Task
                      <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                      <a onClick={handleTaskClick}>Create Task</a>
                    </div>
                  </li>
<<<<<<< HEAD
                  <li><a href="#contact-us">Sign up </a></li>
=======
<<<<<<< HEAD
                  <li><a href="#contact-us">Sign up </a></li>
=======
<<<<<<< HEAD
                  <li><Link to="#contact-us">Sign up </Link></li>
=======
                  <li><a href="#contact-us">Sign up </a></li>
>>>>>>> b9962e1cb35e7f72a740a4d752f5b67c5d2d2484
>>>>>>> 49266e5875dc045414d9cfd61d0c8b5d64466994
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
                </ul>
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
<<<<<<< HEAD
      {/* Ajoutez le composant ModalCrrerTicket ici */}

      
=======
<<<<<<< HEAD
      {/* Ajoutez le composant ModalCrrerTicket ici */}

      
=======
      <TaskModal isOpen={showCreateTaskModal} onClose={handleCloseModal} />
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    </header>
  );
}

export default NavbarFront;
