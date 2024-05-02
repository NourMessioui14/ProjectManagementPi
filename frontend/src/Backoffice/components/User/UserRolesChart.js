import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Box, Text } from "@chakra-ui/react";

const UserRolesChart = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/auth/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      renderChart();
    }
  }, [userData]);

  const renderChart = () => {
    const rolesCount = userData.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    const ctx = document.getElementById('userRolesChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(rolesCount),
        datasets: [{
          label: 'User Roles',
          data: Object.values(rolesCount),
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  };

  return (
<Box p="4" style={{ width: "600px", height: "400px", margin: "0 auto" }}> {/* Définir la taille du conteneur */}
            <Text fontSize="xl" fontWeight="bold" mb="4">
                User Roles 
            </Text>
            <canvas id="userRolesChart" width="400" height="200" style={{ marginLeft: '-50px' }}></canvas>        </Box>
  );
};

export default UserRolesChart;
