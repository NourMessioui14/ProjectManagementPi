import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { GlobalContext } from '../../../context/GlobalWrapperChat'; // Import du contexte global
import NavbarFront from '../../NavbarFront'; // Import du composant NavbarFront
//import { navigate } from '@reach/router';


const MyVideocalls = () => {
  const { getUserIdFromToken } = useContext(GlobalContext); // Utilisation du contexte global
  const [userId, setUserId] = useState(""); // State to store the user ID

  useEffect(() => {
    // Function to fetch user ID from token
    const fetchUserId = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        console.log("Token from localStorage:", storedToken);
        const userIdFromToken = await getUserIdFromToken(storedToken);
        const userIdString = userIdFromToken.userId.toString();
        console.log("User ID from token:", userIdFromToken);
        setUserId(userIdString); // Set the user ID state
      } catch (error) {
        console.error('Error getting user ID from token:', error);
      }
    };

    fetchUserId(); // Call the function to fetch user ID
  }, [getUserIdFromToken]);

  const { getvideocallsByUserId } = useContext(GlobalContext); // Utilisation du contexte global

  const [videocalls, setVideocalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getvideocallsByUserId(userId); // Appel de la fonction pour obtenir les videocalls
      setVideocalls(data.map(formatDateAndTime)); // Convertir les dates et heures au format nécessaire
    };

    fetchData();
  }, [getvideocallsByUserId, userId]);

  const formatDateAndTime = (call) => {
    // Convertir la date et l'heure dans le format requis pour les calculs
    const [day, month, year] = call.date.split('/');
    const [hours, minutes] = call.time.split(':');
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:00`;
    return {
      ...call,
      formattedDate,
      formattedTime
    };
  };

  const handleJoinMeeting = (videocallId) => {
    // Logic to join the meeting
    console.log(`Joining meeting ${videocallId}`);
    //navigate('/zoomjdid');
    
  };

  const isCloseToSystemDate = (meetingTime) => {
    const systemTime = new Date();
    const meetingTimeObj = new Date(meetingTime);
    const differenceInMinutes = Math.abs(meetingTimeObj - systemTime) / (1000 * 60);
    return differenceInMinutes <= 15;
  };

  // Styles
  const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const grayButtonStyle = {
    backgroundColor: '#ccc',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'not-allowed',
  };

  const blueButtonStyle = {
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <NavbarFront /> {/* Add the NavbarFront component here */}
      <h2 style={{ textAlign: 'center' }}>My Videocalls</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Call ID</th>
            <th style={tableHeaderStyle}>Project ID</th>
            <th style={tableHeaderStyle}>Creator</th>
            <th style={tableHeaderStyle}>Subject</th>
            <th style={tableHeaderStyle}>Duration (minutes)</th>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Time</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videocalls.map((call, index) => {
            const meetingTime = new Date(call.formattedDate + ' ' + call.formattedTime);
            const buttonStyle = isCloseToSystemDate(meetingTime) ? blueButtonStyle : grayButtonStyle;
            const disabled = !isCloseToSystemDate(meetingTime);
            return (
              <tr key={index}>
                <td style={tableCellStyle}>{call.videocallId}</td>
                <td style={tableCellStyle}>{call.projectId}</td>
                <td style={tableCellStyle}>{call.videocallCreator}</td>
                <td style={tableCellStyle}>{call.subject}</td>
                <td style={tableCellStyle}>{call.estimatedDurationMinutes}</td>
                <td style={tableCellStyle}>{call.date}</td>
                <td style={tableCellStyle}>{call.time}</td>
                <td style={tableCellStyle}>
                  <Link to="/zoomjdid"
                    style={buttonStyle}
                    onClick={() => handleJoinMeeting(call.videocallId)}
                    disabled={disabled}
                  >
                    Join Meeting
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyVideocalls;
