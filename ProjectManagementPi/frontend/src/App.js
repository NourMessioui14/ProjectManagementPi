import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chatrooms from './components/Chatrooms';
import VideoCalls from './components/videocalls';

function App() {
  return (
    <Router>
      <div className='wrapper'>
        <Sidebar />
        <div className="main">
          <Navbar />
          <main className="content">
            <div className="container-fluid p-0">
              <Routes>
                <Route path="/chatrooms" element={<Chatrooms />} />
                <Route path="/videocalls" element={<VideoCalls />} />
              </Routes>
            </div>
          </main>
          <Footer />  
        </div>
      </div>
    </Router>
  );
}

export default App;
