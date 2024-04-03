import { Link } from "react-router-dom"
function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
    <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
  <span className="align-middle">DrimTim</span>
  <div className="col-2">
  <img src="adminkit/img/photos/logo.png" className="avatar img-fluid rounded-circle" alt="Vanessa Tucker"/>
       </div>
</a>

        <ul className="sidebar-nav">
            <li className="sidebar-header">
                Pages
            </li>

            <li className="sidebar-item active">
  <Link to="/users" className="sidebar-link">
    <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">User Management</span>
  </Link>
</li>


            <li className="sidebar-item">
            <Link to="/projects" className="sidebar-link">
    <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Project Management</span>
  </Link>            </li>

            <li className="sidebar-item">
                <a className="sidebar-link" href="pages-sign-in.html">
      <i className="align-middle" data-feather="log-in"></i> <span className="align-middle">Sprint Management</span>
    </a>
            </li>

            <li className="sidebar-item">
            <Link to="/userconnected">
      <i className="align-middle" data-feather="user-plus"></i> 
      <span className="align-middle">User Connected</span>
      </Link>
            </li>

           

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
  )
}

export default Sidebar