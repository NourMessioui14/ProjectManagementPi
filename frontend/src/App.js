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
import CardProject from './components/CardProject';
import ProjectListFront from './components/ProjectListFront';


function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <MainContent />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();

  const showBackOffice = !location.pathname.startsWith("/navbarfront") && !location.pathname.startsWith("/footerfront") && !location.pathname.startsWith("/home") && !location.pathname.startsWith("/cardproject")&& !location.pathname.startsWith("/ProjectListFront");


  const showFrontComponents = !location.pathname.startsWith("/projects") && !location.pathname.startsWith("/ticket") ;

  return (
    <div className="wrapper">
      {/* Afficher le Sidebar uniquement pour les pages de back-office */}
      {showBackOffice && <Sidebar />}
      <div className="main">
        {/* Afficher la Navbar uniquement pour les pages de back-office */}
        {showBackOffice && <Navbar />}
        {/* Afficher NavbarFront pour les pages de la partie front-office et pour CardProject */}
        {showFrontComponents && <NavbarFront />}
        {location.pathname.startsWith("/cardproject") && <NavbarFront />}

        <Routes>
          {/* Defining routes */}
          <Route path="/navbarfront" element={<NavbarFront />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/ticket" element={<TicketList />} />
          <Route path="/footerfront" element={<FooterFront />} />
          <Route path="/cardproject" element={<CardProject />} />
          <Route path="/ProjectListFront" element={<ProjectListFront/>} />

          {/* Ajoutez d'autres routes de back-office si nécessaire */}
        </Routes>
      </div>
    </div>
  );
}

export default App;