import React, { useContext, useEffect, useState } from 'react';
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
import ModalCrrerTicket from './components/ModalCrrerTicket';
import CreateProjectForm from './components/createprojectfront';

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

  const showBackOffice = !location.pathname.startsWith("/navbarfront") 
    && !location.pathname.startsWith("/footerfront") 
    && !location.pathname.startsWith("/home") 
    && !location.pathname.startsWith("/cardproject")
    && !location.pathname.startsWith("/ProjectListFront")
    && !location.pathname.startsWith("/CreateProjectForm"); // Ensure sidebar does not show for CreateProjectForm

  const showFrontComponents = !location.pathname.startsWith("/projects") 
    && !location.pathname.startsWith("/ticket")

  return (
    <div className="wrapper">
      {showBackOffice && <Sidebar />}
      <div className="main">
        {showBackOffice && <Navbar />}
        {showFrontComponents && <NavbarFront />}
        {location.pathname.startsWith("/cardproject") && <NavbarFront />}
       
        <Routes>
          <Route path="/navbarfront" element={<NavbarFront />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/ticket" element={<TicketList />} />
          <Route path="/footerfront" element={<FooterFront />} />
          <Route path="/cardproject" element={<CardProject />} />
          <Route path="/ProjectListFront" element={<ProjectListFront />} />
          <Route path="/modalcrertiecket" element={<ModalCrrerTicket />} />
          <Route path="/CreateProjectForm" element={<CreateProjectForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
