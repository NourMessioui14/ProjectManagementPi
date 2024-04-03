import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Garder cette importation unique

import Dashboard from './Backoffice/pages/Dashboard';

import Navbar from './Backoffice/components/Navbar';
import Sidebar from './Backoffice/components/Sidebar';
import Footer from './Backoffice/components/Footer';
<<<<<<< HEAD
import RegisterForm from './FrontOffice/pages/RegisterForm';
import UserList from './Backoffice/pages/UserList';
import EmailVerification from './FrontOffice/pages/EmailVerification';
import NewPassword from './FrontOffice/pages/NewPassword';
import FourDigitVerification from './FrontOffice/pages/FourDigitVerification';
=======
import RegisterForm from './FrontOffice/pages/User/RegisterForm';
import UserList from './Backoffice/pages/UserList';
import EmailVerification from './FrontOffice/pages/User/EmailVerification';
import NewPassword from './FrontOffice/pages/User/NewPassword';
import FourDigitVerification from './FrontOffice/pages/User/FourDigitVerification';
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
import ProjectList from './Backoffice/components/Project/ProjectList';
import TicketList from './Backoffice/components/Ticket/TicketList';
import SprintList from './Backoffice/components/Sprint/SprintList';
import SprintFront from './FrontOffice/components/Sprint/SprintFront';
import ScrumList from './FrontOffice/components/Sprint/ScrumList';
import ReclamationsList from './Backoffice/components/Reclamation/ReclamationsList';
import ReclamationUser from './FrontOffice/components/Reclamation/ReclamationUser';
import Chatrooms from './Backoffice/components/Chat/Chatrooms';
import VideoCalls from './Backoffice/components/Chat/videocalls';
import ChatPage from './FrontOffice/components/Chat/ChatPage';
import HomePage from './FrontOffice/components/Project/HomePage';
<<<<<<< HEAD

=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
import Profile from './FrontOffice/pages/User/Profile';
import UserConnected from './FrontOffice/pages/User/UserConnected';
import ChangePass from './FrontOffice/pages/User/ChangePass';
import NavbarFront from './FrontOffice/NavbarFront';
import UserRolesChart from './Backoffice/components/User/UserRolesChart';
=======
<<<<<<< HEAD
>>>>>>> 49266e5875dc045414d9cfd61d0c8b5d64466994
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
import NavbarFront from './FrontOffice/NavbarFront';
import CustomCard from './FrontOffice/components/Project/CardProject';
import ProjectListFront from './FrontOffice/components/Project/ProjectListFront';
import CreateProjectForm from './FrontOffice/components/Project/createprojectfront';

  
<<<<<<< HEAD

import Profile from './FrontOffice/pages/Profile';
import UserConnected from './FrontOffice/pages/UserConnected';

=======
import Profile from './FrontOffice/pages/Profile';
import UserConnected from './FrontOffice/pages/UserConnected';
<<<<<<< HEAD
import TaskModal from './Backoffice/components/Ticket/TaskModal';
import DetailsProject from './FrontOffice/components/Project/DetailsProject';
=======
>>>>>>> b9962e1cb35e7f72a740a4d752f5b67c5d2d2484
>>>>>>> 49266e5875dc045414d9cfd61d0c8b5d64466994
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

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

                      <Route path="/projects" element={<ProjectList />} />
                    </Routes>
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          }
        />
        <Route path="/" element={<RegisterForm />} />
        <Route path="/forgetPassword" element={<EmailVerification />} />
        <Route path='/NewPassword/:id' element={<NewPassword />} />
<<<<<<< HEAD
          <Route path='/profile' element = {<Profile/>} />



=======
<<<<<<< HEAD
          <Route path='/profile' element = {<Profile/>} />
=======

        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/navbarF' element={<NavbarFront/>}/>



>>>>>>> 49266e5875dc045414d9cfd61d0c8b5d64466994
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
        <Route path='/Digitverify' element={<FourDigitVerification/>}/>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/sprints" element={<SprintList />} />
        <Route path="/sprintFront" element={<SprintFront />} />
        <Route path="/scrum" element={<ScrumList />} />
        <Route path="/reclamations" element={<ReclamationsList />} />
        <Route path="/reclamationsFront" element={<ReclamationUser />} />
        <Route path="/chat" element={<Chatrooms />} />
        <Route path="/videocall" element={<VideoCalls />} />
        <Route path="/messenger" element={<ChatPage />} />
<<<<<<< HEAD
        <Route path="/navbarfront" element={<NavbarFront />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/navbar" element={<Navbar />} />

        <Route path="/cardproject" element={<CustomCard />} />
        <Route path="/ProjectListFront" element={<ProjectListFront />} />

        <Route path="/CreateProjectForm" element={<CreateProjectForm />} />


=======
<<<<<<< HEAD
        <Route path='/changePass' element={<ChangePass/>} />
=======
        <Route path="/navbarfront" element={<NavbarFront />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/cardproject" element={<CustomCard />} />
        <Route path="/ProjectListFront" element={<ProjectListFront />} />
        <Route path="/CreateProjectForm" element={<CreateProjectForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/userconnected/:id" element={<UserConnected />} />
        <Route path="/TaskModal" element={<TaskModal />} />
        <Route path="/detailsproject/:projectId" element={<DetailsProject />} />
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

        




<<<<<<< HEAD

=======
>>>>>>> b9962e1cb35e7f72a740a4d752f5b67c5d2d2484

<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
        <Route path="/home" element={<HomePage />} />



<<<<<<< HEAD

        <Route path="/userconnected/:id" element={<UserConnected />} />
=======
     <Route path="/chart" element={<UserRolesChart />} />


        <Route path="/userconnected" element={<UserConnected />} />
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920




<<<<<<< HEAD
=======
>>>>>>> 49266e5875dc045414d9cfd61d0c8b5d64466994
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
      </Routes>
    </Router>
  );
}





export default App;
