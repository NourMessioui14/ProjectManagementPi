function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
          <span className="align-middle">DrimTim</span>
          <div className="col-2">
            <img
              src="adminkit/img/photos/logo.png"
              className="avatar img-fluid rounded-circle"
              alt="Vanessa Tucker"
            />
          </div>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="/chatrooms">
              <i className="align-middle" data-feather="message-square"></i>{" "}
              <span className="align-middle">Chatrooms</span>
            </a>
          </li>

          <li className="sidebar-item">
            <a className="sidebar-link" href="/videocalls">
              <i className="align-middle" data-feather="video"></i>{" "}
              <span className="align-middle">Video Calls</span>
            </a>
          </li>
 
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
