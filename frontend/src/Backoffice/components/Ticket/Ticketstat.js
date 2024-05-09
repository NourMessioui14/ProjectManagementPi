import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function TicketStatsDashboard() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get('https://nestjspi.onrender.com/project');
        setProjectData(response.data.projects);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, []);

  useEffect(() => {
    if (projectData && projectData.length > 0) { // Ajout de la vérification projectData && projectData.length > 0
      const chartData = {
        labels: [],
        datasets: []
      };

      // Collecter les types de tickets uniques
      const uniqueTicketTypes = new Set();
      projectData.forEach(project => {
        project.tickets.forEach(ticket => {
          uniqueTicketTypes.add(ticket.typeOfTicket);
        });
      });

      // Créer les datasets pour chaque type de ticket
      uniqueTicketTypes.forEach(ticketType => {
        const dataset = {
          label: ticketType,
          data: []
        };
        projectData.forEach(project => {
          const foundTicket = project.tickets.find(ticket => ticket.typeOfTicket === ticketType);
          dataset.data.push(foundTicket ? foundTicket.count : 0);
        });
        chartData.datasets.push(dataset);
      });

      // Ajouter les labels des projets
      chartData.labels = projectData.map(project => project.name);

      const ctx = document.getElementById('ticketStatsChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [projectData]);

  return (
    <div>
      <h2>Ticket Statistics Dashboard</h2>
      <canvas id="ticketStatsChart" width="400" height="200"></canvas>
    </div>
  );
}

export default TicketStatsDashboard;
