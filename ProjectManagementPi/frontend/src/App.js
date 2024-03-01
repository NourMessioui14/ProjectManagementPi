import React from 'react';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* eli yheb yaamel route yhotha hne */}
      </Routes>
      
      <div className='wrapper'>
        <Sidebar />
        <div className="main">
          <Navbar />
          <main className="content">
            <div className="container-fluid p-0">
              <Dashboard />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
