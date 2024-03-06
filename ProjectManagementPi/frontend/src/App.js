import React from 'react';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Chatrooms from './components/Chatrooms'; // Corrected import path
import { Wrapper } from './context/GlobalWrapper';



function App() {


  
  return (
    <BrowserRouter>
      <Routes>
        {}
      </Routes>
      
      <div className='wrapper'>
        
        <div className="main">
          
          <main className="content">
            <div className="container-fluid p-0">
              <Chatrooms/>
            </div>
          </main>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
