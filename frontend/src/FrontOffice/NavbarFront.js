import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskModal from '../Backoffice/components/Ticket/TaskModal';
import { FaCog } from 'react-icons/fa'; // Import de l'icône de paramètre
import LogoutButton from '../Backoffice/components/LogoutButton';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FcApproval } from 'react-icons/fc';
import axios from 'axios';
import { IoMdLogOut } from "react-icons/io";
import { io } from 'socket.io-client';


function NavbarFront() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // État pour afficher ou masquer le dropdown de profil
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState('');


  useEffect(() => {
    const socket = io('http://localhost:5001'); // Assurez-vous de remplacer l'URL par celle de votre serveur

    socket.on('notification', (data) => {
      setNotification(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
  




  // const fetchData = async () => {
  //   try {
  //     const notifsResponse = await axios.get('http://localhost:9090/api/order/notifs');
  //     setNotifications(notifsResponse.data);

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Se connecter au serveur WebSocket
  //   const socket = io('http://localhost:5001');

  //   // Écouter l'événement de notification du serveur
  //   socket.on('notification', (notificationData) => {
  //     // Ajouter la nouvelle notification à la liste des notifications
  //     setNotifications((prevNotifications) => [...prevNotifications, notificationData]);

  //     // Afficher la notification dans la console

  //   });

  //   // Nettoyer l'écouteur lors du démontage du composant
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // const handleRead = () => {

  //   const response = { read: "true" };
  //   if (response.data) {
  //     return response.data;
  //   }
  //   setNotifications([]);
  //   setOpen(false);
  // };

  // ******************notification*****************//
  /*useEffect(() => {
    try {
      const newSocket = io("http://localhost:5001");
      setSocket(newSocket);
      console.log('Socket connecté avec succès');

      // Log pour vérifier la réception des notifications côté client
      newSocket.on('getNotification', (notificationData) => {
        console.log('Notification received:', notificationData);
      });
    } catch (error) {
      console.log('Erreur lors de la connexion au socket:', error);
    }
  }, []);

  const unreadNotifications = notifications.filter(notification => !notification.read);

  useEffect(() => {
    if (!socket) return;
    console.log("socket");
    console.log(socket);
    const handleNotification = (data) => {
      // Ajouter la nouvelle notification à la liste des notifications
      setNotifications(prevNotifications => [...prevNotifications, data]);
    };

    socket.on("getNotification ", handleNotification);
    

  }, [socket]);

  console.log("notification");
  console.log(notifications);

  const displayNotification = ({ senderName }) => {
    return (
      <>
        <span className="notification"><FcApproval size={30} />{`  ${senderName} répond à votre réclamation`}</span>
        <hr style={{
          width: "100%", // Ajustez la largeur si nécessaire
          height: "1px", // Ajustez la hauteur si nécessaire
          backgroundColor: "black", // Ajustez la couleur si nécessaire
          border: "none",
          borderColor: "black", // Ajustez la couleur de la bordure si nécessaire
          margin: "5px 0", // Ajustez les marges si nécessaire
        }} />
      </>
    );
  };
*/

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
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
                  <li ><Link to="/home" style={{ fontSize: '11px' }}>Home</Link></li>
                  <li><Link to="/cardproject" style={{ fontSize: '11px' }}>Your Job </Link></li>
                  <li><Link to="/ProjectListFront" style={{ fontSize: '11px' }} >Project  </Link></li>
                  <li><Link to="/messenger" style={{ fontSize: '11px' }}>Chatroom</Link></li>
                  <li><Link to="/myvideocalls" style={{ fontSize: '11px' }}>videoCalls</Link></li>



                  {/* ****************************************** */}



                  {/* ************************************ */}
                 


                  {/* Dropdown Réclamations */}
                  <li className="dropdown" onClick={toggleDropdown}>
                    <button className="active" style={{ fontSize: '11px' }}>Claims <i className="fa fa-caret-down"></i></button>
                    {showDropdown && (
                      <div className="">
                        <Link to="/reclamationsFront" style={{ fontSize: '9px' }}> My Claims</Link>
                        <Link to="/addReclamation" style={{ fontSize: '9px' }}>Add a Claim</Link>
                      </div>
                    )}
                  </li>
                  {/* Dropdown Tâches */}
                  <li className="nav-item dropdown">
                    <button className="dropbtn" style={{ fontSize: '11px' }}>Tasks <i className="fa fa-caret-down"></i></button>
                    <div className="dropdown-content">
                      <a onClick={handleTaskClick} style={{ fontSize: '11px' }}>Create Task</a>
                    </div>
                  </li>



                  {/* ******************************************* */}



                  {/* Icône de profil avec dropdown */}
                  <li>
                    <Link to="/userconnected" className="dropdown-item">
                      <i className="fas fa-user"></i> Profile
                    </Link>
                  </li>

                  {/* ***************notification*********************** */}


                  <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <IoMdLogOut size={16} />
                  </li>


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