import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskModal from '../Backoffice/components/Ticket/TaskModal';
import { FaCog } from 'react-icons/fa'; // Import de l'icône de paramètre
import LogoutButton from '../Backoffice/components/LogoutButton';
import { io } from 'socket.io-client';
import axios from 'axios';
import { FcApproval } from 'react-icons/fc';
function NavbarFront() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // État pour afficher ou masquer le dropdown de profil
 
  //const [notification, setNotification] = useState('');

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);
}, []);

const fetchData = async () => {
  try {
    const notifsResponse = await axios.get('/notifications');
    setNotifications(notifsResponse.data);

    // Compter le nombre de notifications non lues
    const unreadCount = notifsResponse.data.filter(notification => !notification.read).length;
    setUnreadNotifications(unreadCount); // Mettre à jour le nombre de notifications non lues
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//const unreadNotifications = notifications.filter(notification => !notification.read);
  
useEffect(() => {
  if (!socket) return;
  console.log("socket");
  console.log(socket);
  fetchData();


  const handleNotification = (data) => {
    const notificationString = JSON.stringify(data);
    setNotifications(prevNotifications => [...prevNotifications, data]);
    console.log("New notification received:", notificationString);
    // Rafraîchir la liste des notifications
    fetchData();
    setUnreadNotifications(prevUnreadCount => prevUnreadCount + 1);
  };
  

  
  socket.on("getNotification", handleNotification);

}, [socket]);
//console.log("notification");
console.log(notifications);

const displayNotification = ({ senderName, description  }) => {
  const truncatedDescription = description ? description.slice(0, 35) : ''; // Vérifier si description est défini
  return (
    <>
      <span className="notification">
        <FcApproval size={12} /> {`${senderName} replied to your claim: "${truncatedDescription}..."`}
      </span>
      <hr
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "black",
          border: "none",
          borderColor: "black",
          margin: "5px 0",
        }}
      />
    </> 
  );
};




// Ajoutez ceci à votre code pour définir l'état unreadNotifications
const [unreadNotifications, setUnreadNotifications] = useState([]);

// Dans la fonction handleRead(), mettez à jour l'état unreadNotifications comme ceci :
const handleRead = async () => {
  try {
    await axios.put(`/notifications/mark-all-as-read`, { read: true });
    // Rafraîchir la liste des notifications
    fetchData();
    // Mettre à jour le compteur des notifications non lues
    setUnreadNotifications(0); 
  } catch (error) {
    console.error('Error marking notifications as read:', error);
  }
};


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




  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };




  return (
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
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/cardproject">Your Job </Link></li>
                <li><Link to="/ProjectListFront">Project  </Link></li>
                <li><Link to="/messenger">Chatroom</Link></li>
                <li><Link to="/myvideocalls">videoCalls</Link></li>

                {/* Dropdown Réclamations */}
                <li className="dropdown" onClick={toggleDropdown}>
                  <button className="active">Claims <i className="fa fa-caret-down"></i></button>
                  {showDropdown && (
                    <div className="">
                      <Link to="/reclamationsFront" style={{ fontSize: '9px' }}> My Claims</Link>
                      <Link to="/addReclamation" style={{ fontSize: '9px' }}>Add a Claim</Link>
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
      {/* Modal pour créer une tâche */}
      <TaskModal isOpen={showCreateTaskModal} onClose={handleCloseModal} />
    </header>
  );
}

export default NavbarFront;
