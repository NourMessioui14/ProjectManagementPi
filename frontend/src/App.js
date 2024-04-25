import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Garder cette importation unique

import Dashboard from './Backoffice/pages/Dashboard';

import Navbar from './Backoffice/components/Navbar';
import Sidebar from './Backoffice/components/Sidebar';
import Footer from './Backoffice/components/Footer';
import RegisterForm from './FrontOffice/pages/RegisterForm';
import EmailVerification from './FrontOffice/pages/EmailVerification';
import NewPassword from './FrontOffice/pages/NewPassword';
import FourDigitVerification from './FrontOffice/pages/FourDigitVerification';
import ProjectList from './Backoffice/components/Project/ProjectList';
import TicketList from './Backoffice/components/Ticket/TicketList';
import SprintList from './Backoffice/components/Sprint/SprintList';
import ScrumList from './FrontOffice/components/Sprint/ScrumList';
import ReclamationsList from './Backoffice/components/Reclamation/ReclamationsList';
import ReclamationUser from './FrontOffice/components/Reclamation/ReclamationUser';
import Chatrooms from './Backoffice/components/Chat/Chatrooms';
import VideoCalls from './Backoffice/components/Chat/videocalls';
import ChatPage from './FrontOffice/components/Chat/ChatPage';
import HomePage from './FrontOffice/components/Project/HomePage';
import NavbarFront from './FrontOffice/NavbarFront';
import CustomCard from './FrontOffice/components/Project/CardProject';
import ProjectListFront from './FrontOffice/components/Project/ProjectListFront';
import CreateProjectForm from './FrontOffice/components/Project/createprojectfront';
  import UserRolesChart from './Backoffice/components/User/UserRolesChart';
import TaskModal from './Backoffice/components/Ticket/TaskModal';
import DetailsProject from './FrontOffice/components/Project/DetailsProject';
import ChangePass from './FrontOffice/pages/User/ChangePass';
import UserConnected from './FrontOffice/pages/User/UserConnected';
import Profile from './FrontOffice/pages/User/Profile';
import SprintFront from './FrontOffice/components/Sprint/SprintFront';
import CreateReclamationForm from './FrontOffice/components/Reclamation/CreateReclamationForm';
import ListTicketFront from './FrontOffice/components/Ticket/ListTicketFront';
import TicketPredictor from './FrontOffice/ticketPrediction';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/backoffice/*"
          element={
            <div className='wrapper'>
              <Sidebar />
              <div className="main">
                <Navbar />
                <main className="content">
                  <div className="container-fluid p-0">
                    <Routes>
                      <Route index element={<Dashboard />} />

                    </Routes>
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          }
        />
        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<RegisterForm />} />
        <Route path="/forgetPassword" element={<EmailVerification />} />
        <Route path='/NewPassword/' element={<NewPassword />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/Digitverify' element={<FourDigitVerification/>}/>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/sprints" element={<SprintList />} />
        <Route path="/sprintFront/:projectId" element={<SprintFront />} />
        <Route path="/scrum" element={<ScrumList />} />
        <Route path="/reclamations" element={<ReclamationsList />} />
        <Route path="/reclamationsFront" element={<ReclamationUser />} />
        <Route path="/chat" element={<Chatrooms />} />
        <Route path="/videocall" element={<VideoCalls />} />
        <Route path="/messenger" element={<ChatPage />} />
        <Route path="/chart" element={<UserRolesChart />} />
        <Route path="/userconnected" element={<UserConnected />} />
        <Route path='/changePass' element={<ChangePass/>} />

        <Route path="/navbarfront" element={<NavbarFront />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/cardproject" element={<CustomCard />} />
        <Route path="/ProjectListFront" element={<ProjectListFront />} />
        <Route path="/CreateProjectForm" element={<CreateProjectForm />} />
        <Route path="/TaskModal" element={<TaskModal />} />
        <Route path="/detailsproject/:projectId" element={<DetailsProject />} />


        <Route path="/addReclamation" element={<CreateReclamationForm/>} />
        <Route path="/userconnected" element={<UserConnected/>} />
        <Route path="/listTicket" element={<ListTicketFront/>} />
        <Route path="/TicketPredictor" element={<TicketPredictor/>} />
        <Route path="/details/:projectId" element={<DetailsProject />} /> {/* Configurez la route pour les détails du projet avec un paramètre d'identifiant de projet */}





      </Routes>
    </Router>
  );
}





export default App;