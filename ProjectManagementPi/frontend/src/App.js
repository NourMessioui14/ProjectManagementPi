import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chatrooms from './components/Chatrooms';
import VideoCalls from './components/videocalls';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <Router>
      <div className='wrapper'>
        
        <div className="main">
          
          <main className="content">
            <div className="container-fluid p-0">
              <Routes>
                
                <Route path="/" element={<ChatPage />} />
              </Routes>
            </div>
          </main>
           
        </div>
      </div>
    </Router>
  );
}

export default App;
