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
import { Box } from '@chakra-ui/react';


function NavbarFront() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // État pour afficher ou masquer le dropdown de profil

  //const [notification, setNotification] = useState('');

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://nestjspi.onrender.com");
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

  const displayNotification = ({ senderName, description }) => {
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
  const toggleTaskDropdown = () => {
    setShowTaskDropdown(!showTaskDropdown);
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
                  <li className="dropdown" onClick={toggleTaskDropdown}>
                    <button className="active" style={{ fontSize: '11px' }}>Tasks <i className="fa fa-caret-down"></i></button>
                    {showTaskDropdown && (
                      <div className="">
                        {/* Ajoutez ici les liens ou le contenu pour les tâches */}
                         <a onClick={handleTaskClick} style={{ fontSize: '10px' }}>Create Task</a>
                         <Link to="/listTicket" style={{ fontSize: '9px' }}> listTicket</Link>

                        {/* Ajoutez d'autres liens ou contenu ici si nécessaire */}
                      </div>
                    )}
                  </li>






                  {/* Dropdown Tâches */}
                  {/* <li className="nav-item dropdown">
                    <button className="dropbtn" style={{ fontSize: '11px' }}>Tasks <i className="fa fa-caret-down"></i></button>
                    <div className="dropdown-content">
                      <a onClick={handleTaskClick} style={{ fontSize: '11px' }}>Create Task</a>
                    </div>
                  </li>  */}



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



                  <li style={{ paddingTop: 0 }}>
                    <IoNotificationsOutline size={20} onClick={() => setOpen(!open)} />
                    {unreadNotifications > 0 && (
                      <div style={{
                        width: "15px",
                        color: "white",
                        backgroundColor: "#FF0000",
                        borderRadius: "50%",
                        marginTop: "35px",
                        fontSize: "10px",
                        display: "flex",
                        justifyContent: "center",
                        position: "absolute",
                        top: "-40px",
                        right: "-5px"
                      }}>{unreadNotifications}</div>
                    )}

                    {console.log("Nombre de notifications non lues:", unreadNotifications)}

                    {open && (
                      <div style={{
                        position: "absolute",
                        top: "50px",
                        width: "300px",
                        right: "0",
                        height: "200px", // Set a fixed height for the container
                        overflow: "auto", // Add scrollbar when content overflows
                        borderRadius: "5%",
                        backgroundColor: "#EEEEEE",
                        color: "black",
                        fontWeight: 300,
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                        marginTop: "0px",
                        marginLeft: "300"
                      }}>
                        {notifications.length > 0 && notifications.map((n) => displayNotification(n))}
                        <button
                          className="btn btn-sm"
                          style={{
                            width: "50%",
                            backgroundColor: "#ff66cc",
                            padding: "5px",
                            marginLeft: "65px",
                            textAlign: "center",
                            transition: "background-color 0.3s ease",
                          }}
                          onClick={handleRead}
                          onMouseOver={(e) => { e.target.style.backgroundColor = "#cc99ff"; }}
                          onMouseOut={(e) => { e.target.style.backgroundColor = "#ff66cc"; }}
                        >
                          Mark as read
                        </button>
                      </div>
                    )}
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