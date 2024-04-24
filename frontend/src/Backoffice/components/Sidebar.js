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

          <li className="sidebar-item active">
            <Link className="sidebar-link" to="/projects">
              <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Project Management</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/tickets">
              <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Ticket Management</span>
            </Link>
          </li>
          <li className="sidebar-item active">
            <Link className="sidebar-link" to="/sprints">
              <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Sprint Management</span>
            </Link>
          </li>
          <li className="sidebar-item active">
            <Link className="sidebar-link" to="/chat">
              <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Chatrooms</span>
            </Link>
          </li>
          <li className="sidebar-item active">
            <Link className="sidebar-link" to="/videocall">
              <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Video Call</span>
            </Link>
          </li>
          <li className="sidebar-item active">
            <Link className="sidebar-link" to="/reclamations">
              <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Reclamation Management</span>
            </Link>
          </li>
          <li className="sidebar-item active">
            <Link className="sidebar-link" to="/backoffice">
              <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">User Management</span>
            </Link>
          </li>
          
          <li className="sidebar-header">Plugins & Addons</li>
          
          <li className="sidebar-item">
            <a className="sidebar-link" href="charts-chartjs.html">
              <i className="align-middle" data-feather="bar-chart-2"></i> <span className="align-middle">Charts</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="maps-google.html">
              <i className="align-middle" data-feather="map"></i> <span className="align-middle">Maps</span>
            </a>
          </li>

          {/* Bouton de retour */}
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/cardproject">
              <i className="align-middle" data-feather="arrow-right-circle"></i> <span className="align-middle">Retour</span>
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Sidebar;
