import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <Router>
      <div className='w-screen max-w-screen h-screen max-h-screen bg-white overflow-hidden	'>
        
 
              <Routes>
                
                <Route path="/" element={<ChatPage />} />
              </Routes>
 
      </div>
    </Router>
  );
}

export default App;
