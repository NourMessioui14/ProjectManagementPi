import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/dashboard">
            <img src="adminkit/img/photos/ss.png" style={{ width: '1000px', height: '100%' }} alt="Logo" />
        </Link>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          <li className="sidebar-item active">
            <Link className="sidebar-link" to="/projects">
              <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Project Management</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-profile.html">
              <i className="align-middle" data-feather="user"></i> <span className="align-middle">Sprint Managment</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-sign-in.html">
              <i className="align-middle" data-feather="log-in"></i> <span className="align-middle">Claim Managment</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="pages-sign-up.html">
              <i className="align-middle" data-feather="user-plus"></i> <span className="align-middle">User Managment</span>
            </a>
          </li>

<<<<<<< HEAD
          <li className="sidebar-header">Plugins & Addons</li>
=======
<<<<<<< HEAD
            <li className="sidebar-item">
            <Link to="/userconnected">
      <i className="align-middle" data-feather="user-plus"></i> 
      <span className="align-middle">User Connected</span>
      </Link>
            </li>
=======
          <li className="sidebar-header">Plugins & Addons</li>
>>>>>>> b9962e1cb35e7f72a740a4d752f5b67c5d2d2484
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

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
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
