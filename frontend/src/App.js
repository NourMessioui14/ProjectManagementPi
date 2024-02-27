import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Backoffice/pages/Dashboard';
import Login from './FrontOffice/pages/Login';
import Register from './FrontOffice/pages/Register';
import Navbar from './Backoffice/components/Navbar';
import Sidebar from './Backoffice/components/Sidebar';
import Footer from './Backoffice/components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/backoffice/*"
          element={
            <div className='wrapper'>
              <Sidebar />
              <div className="main">
                <Navbar />
                <main className="content">
                  <div className="container-fluid p-0">
                    <Routes>
                      <Route index element={<Dashboard />} />
                      {/* Ajoutez d'autres routes spécifiques au back office ici */}
                    </Routes>
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Ajoutez d'autres routes spécifiques au front office ici */}
      </Routes>
    </Router>
  );
}

export default App;
