import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Backoffice/pages/Dashboard';
import Login from './FrontOffice/pages/Login';
import Register from './FrontOffice/pages/Register';
import Navbar from './Backoffice/components/Navbar';
import Sidebar from './Backoffice/components/Sidebar';
import Footer from './Backoffice/components/Footer';
import RegisterForm from './FrontOffice/pages/RegisterForm';
import UserList from './Backoffice/pages/UserList';
import EmailVerification from './FrontOffice/pages/EmailVerification';
import NewPassword from './FrontOffice/pages/NewPassword';
import FourDigitVerification from './FrontOffice/pages/FourDigitVerification';
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
                      {/* Ajoutez la route pour /users ici */}
                      <Route path="/users" element={<UserList />} />
                    </Routes>
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          }
        />
        <Route path="/" element={<RegisterForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<EmailVerification />} />
        <Route path='/NewPassword/:id' element={<NewPassword />} />
        <Route path='/Digitverify' element={<FourDigitVerification/>}/>
      </Routes>
    </Router>
  );
}

export default App;
