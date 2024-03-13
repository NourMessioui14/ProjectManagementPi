import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from "./components/Backoffice/Footer";
import Sidebar from "./components/Backoffice/Sidebar";
import Navbar from "./components/Backoffice/Navbar";
import ProjectList from './components/ProjectList';
import NavbarFront from './components/Frontoffice/NavbarFront';
import TicketList from './components/TicketList';
import FooterFront from './components/Frontoffice/FooterFront';
import HomePage from './components/HomePage';
import SprintList from './components/SprintList';
import SprintFront from './components/SprintFront';
import ScrumList from './components/ScrumList';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <MainContent />
      </div>
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();

  const showBackOffice = !location.pathname.startsWith("/navbarfront") && !location.pathname.startsWith("/footerfront")&& !location.pathname.startsWith("/home")&& !location.pathname.startsWith("/sprintfront")&& !location.pathname.startsWith("/scrum");

  const showFooter = true;

  const  showFrontComponents = !location.pathname.startsWith("/projects") && !location.pathname.startsWith("/ticket") && !location.pathname.startsWith("/sprints") ;

  return (
    <div className="wrapper">
      {/* Afficher le Sidebar uniquement pour les pages de back-office */}
      {showBackOffice && <Sidebar />}
      <div className="main">
        {/* Afficher la Navbar uniquement pour les pages de back-office */}
        {showBackOffice && <Navbar />}
        {showFrontComponents && <NavbarFront />}

        <Routes>
          {/* Defining routes */}
          <Route path="/" element={<NavbarFront />} />
          <Route path="/navbarfront" element={<NavbarFront />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/ticket" element={<TicketList />} />
          <Route path="/sprints" element={<SprintList />} />
          <Route path="/scrum" element={<ScrumList />} />
          <Route path="/footerfront" element={<FooterFront />} />
          <Route path="/sprintfront" element={<SprintFront />} />
          
          {/* Ajoutez d'autres routes de back-office si nécessaire */}
        </Routes>
      </div>
      {/* Afficher le       {showFooter && <Footer />}
Footer pour toutes les pages */}
    </div>
  );
}

export default App;
