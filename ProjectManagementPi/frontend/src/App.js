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
        {<Route path="/" element={<Wrapper><Chatrooms /></Wrapper>} />}
      </Routes>
      
      <div className='wrapper'>
        <Sidebar />
        <div className="main">
          <Navbar />
          <main className="content">
            <div className="container-fluid p-0">
              <Chatrooms/>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
