import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import { Text } from '@chakra-ui/react';

// Créer un contexte pour stocker la référence du graphique
const ChartContext = React.createContext(null);

function TicketListByState() {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({ etat: '' });
  const [numberOfProjects, setNumberOfProjects] = useState(0); // Ajout de l'état pour stocker le nombre de projets
  const chartRef = useRef(null); // Garder une référence au graphique avec useRef

  useEffect(() => {
    // Fonction pour récupérer tous les tickets depuis le backend
    const fetchTickets = async () => {
      try {
        const response = await axios.get('/ticket'); // Remplacez '/api/tickets' par l'URL de votre backend pour récupérer les tickets
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  // Fonction pour filtrer les tickets par état
  const filterTicketsByState = (etat) => {
    return tickets.filter(ticket => ticket.etat === etat);
  };

  // Fonction pour gérer le changement de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Si un graphique existe, le détruire avant de créer un nouveau
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    
    // Création du graphique circulaire (pie chart)
    const ctx = document.getElementById('ticketsChart');
    const newChart = new Chart(ctx, {
      type: 'pie', // Changement du type de graphique à 'pie' (circulaire)
      data: {
        labels: ['To Do', 'In progress', 'Done'],
        datasets: [{
          label: 'Number of Tickets',
          data: [
            filterTicketsByState('To Do').length,
            filterTicketsByState('In progress').length,
            filterTicketsByState('Done').length
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        // Ajoutez les options supplémentaires ici si nécessaire
      }
    });

    // Sauvegarder la référence au graphique dans le contexte
    chartRef.current = newChart;

    // Calculer et stocker le nombre total de projets
    const totalProjects = tickets.length;
    setNumberOfProjects(totalProjects);

    // Nettoyage lorsque le composant est démonté
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [tickets]);

  return (
    <div>
    <Text fontSize="xl" fontWeight="bold" mb="4">
    Ticket by State
</Text>
      {/* Afficher le nombre total de projets */}
      

      {/* Fournir la référence du graphique via le contexte */}
      <ChartContext.Provider value={chartRef}>
        <ChartComponent />
      </ChartContext.Provider>
    </div>
  );
}

// Composant séparé pour le graphique pour améliorer la lisibilité
function ChartComponent() {
  const chartRef = React.useContext(ChartContext); // Obtenir la référence du graphique depuis le contexte

  return (
    <div style={{ width: '400px', height: '400px',marginLeft:"400px" }}> {/* Définissez la taille du conteneur */}
      <canvas id="ticketsChart" width="400" height="400"></canvas>
    </div>
  );
}

export default TicketListByState;
