import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <style>
        {`
          .footer {
            background-color: #f8f9fa;
            padding: 20px 0;
          }

          .footer p {
            margin-bottom: 0;
          }

          .footer a {
            color: #6c757d;
            text-decoration: none;
          }

          .footer a:hover {
            color: #007bff;
          }

          .footer ul.list-inline {
            padding-left: 0;
          }

          .footer ul.list-inline .list-inline-item {
            display: inline-block;
            margin-right: 10px;
          }

          @media (max-width: 768px) {
            .footer .text-start,
            .footer .text-end {
              text-align: center !important;
            }
          }
        `}
      </style>
      <div className="container-fluid">
        <div className="row text-muted">
          <div className="col-md-6 text-start">
            <p className="mb-0">
              <strong><a className="text-primary" href="https://adminkit.io/" target="_blank">DreamTim</a></strong> - <strong><a className="text-primary" href="https://adminkit.io/" target="_blank">ESPRIT 2024</a></strong> &copy;
            </p>
          </div>
          <div className="col-md-6 text-end">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a className="text-primary" href="https://adminkit.io/" target="_blank">Support</a>
              </li>
              <li className="list-inline-item">
                <a className="text-primary" href="https://adminkit.io/" target="_blank">Help Center</a>
              </li>
              <li className="list-inline-item">
                <a className="text-primary" href="https://adminkit.io/" target="_blank">Privacy</a>
              </li>
              <li className="list-inline-item">
                <a className="text-primary" href="https://adminkit.io/" target="_blank">Terms</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
