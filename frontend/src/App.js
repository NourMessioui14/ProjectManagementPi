import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProjectList from './components/ProjectList';
import NavbarFront from './components/NavbarFront';
import TicketList from './components/TicketList';
import ReclamationsList from './components/ReclamationsList';

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();

  // Condition pour déterminer si le Sidebar doit être affiché
  const showSidebar = !location.pathname.startsWith("/navbarfront");

  return (
    <div className="wrapper">
      {/* Condition pour afficher le Sidebar */}
      {showSidebar && <Sidebar />}
      <div className="main">
        {showSidebar && <Navbar />} {/* Afficher le Navbar précédent si le Sidebar est affiché */}

        <Routes>
          <Route path="/projects" element={<ProjectList />} />

          <Route path="/reclamations" element={<ReclamationsList />} />

          <Route path="/ticket" element={<TicketList/>} />

          <Route path="/navbarfront" element={<NavbarFront />} />
          {/* Ajoutez d'autres routes si nécessaire */}
        </Routes>

        <Footer />
       {/* Placer le Footer en   dehors de la div "main" */}
      </div>
    </div>
  );
}

export default App;
