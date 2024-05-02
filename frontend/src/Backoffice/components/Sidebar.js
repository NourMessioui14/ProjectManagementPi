import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/dashboard">
          <img src={`${process.env.PUBLIC_URL}/templateFront/images/logo.png`} style={{ width: '300px', height: 'auto' }} alt="Logo" />
        </Link>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          <Link to="/charts" className="sidebar-link">
  <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
    <img src={`${process.env.PUBLIC_URL}/templateFront/images/Dashbord.png`} style={{ width: '25px', height: '25px', marginRight: '8px' }} alt="" />
    Dashboard
  </span>
</Link>


          <li className="sidebar-item ">
            <Link className="sidebar-link" to="/projects">

            <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`${process.env.PUBLIC_URL}/templateFront/images/projectManagment.png`} style={{ width: '25px', height: '25px', marginRight: '5px' }} alt="" />
   
             Project Management
            </span>
            </Link>
          </li>



          <li className="sidebar-item">
            <Link className="sidebar-link" to="/tickets">
            <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
           <img src={`${process.env.PUBLIC_URL}/templateFront/images/TicketManagment.png`} style={{ width: '25px', height: '25px', marginRight: '5px' }} alt="" />
           Ticket Managment
         </span>
         </Link>

        
          </li>
          <li className="sidebar-item ">
            <Link className="sidebar-link" to="/sprints">
            <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
           <img src={`${process.env.PUBLIC_URL}/templateFront/images/sprint3.png`} style={{ width: '25px', height: '25px', marginRight: '5px' }} alt="" />
           Sprint Management
            </span> </Link>
          </li>




          <li className="sidebar-item ">
            <Link className="sidebar-link" to="/chat">
            <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
           <img src={`${process.env.PUBLIC_URL}/templateFront/images/chatroom2.png`} style={{ width: '30px', height: '30px', marginRight: '5px' }} alt="" />
          Chatrooms
            </span>  </Link>
          </li>


          
          <li className="sidebar-item ">
            <Link className="sidebar-link" to="/videocall">
            <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
           <img src={`${process.env.PUBLIC_URL}/templateFront/images/videocall.png`} style={{ width: '25px', height: '25px', marginRight: '5px' }} alt="" />
          video calls 
            </span>  </Link>
          </li>



          <li className="sidebar-item ">
            <Link className="sidebar-link" to="/reclamations">
            <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
           <img src={`${process.env.PUBLIC_URL}/templateFront/images/claim.png`} style={{ width: '25px', height: '25px', marginRight: '5px' }} alt="" />
           Claim Managment
            </span>  </Link>
          </li>


          <li className="sidebar-item ">
            <Link className="sidebar-link" to="/backoffice">
            <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
           <img src={`${process.env.PUBLIC_URL}/templateFront/images/user.png`} style={{ width: '30px', height: '30px', marginRight: '5px' }} alt="" />
           User Managment
            </span> 
             </Link>
          </li>

        
          
          



          
        

          {/* Bouton de retour */}
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/cardproject">
            <span className="align-middle" style={{ display: 'flex', alignItems: 'center' }}>
           <img src={`${process.env.PUBLIC_URL}/templateFront/images/retour.png`} style={{ width: '30px', height: '30px', marginRight: '5px' }} alt="" />
          Retour
            </span> 
              </Link>
          </li>
        </ul>


        <span className="align-middle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <img src={`${process.env.PUBLIC_URL}/templateFront/images/logout.png`} style={{ width: '30px', height: '30px', marginRight: '5px' }} alt="" />
  <LogoutButton />
</span>

        
      </div>
    </nav>
  );
}

export default Sidebar;
