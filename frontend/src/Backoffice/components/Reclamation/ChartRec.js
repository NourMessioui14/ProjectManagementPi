import React, { useEffect, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Chart from 'chart.js/auto'; // Importez Chart.js

function ChartRecComponent({ reclamations }) {
    const chartRef = useRef(null); // Référence au graphique pour pouvoir le détruire

    useEffect(() => {
        // Créer le graphique lors du montage initial du composant
        console.log("Creating chart...");
        const ctx = document.getElementById('reclamationsChart');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Bug', 'Enhancement', 'Missing Documentation', 'Other'],
                datasets: [{
                    label: 'Number of Claims',
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)', // Bug
                        'rgba(54, 162, 235, 0.5)', // Enhancement
                        'rgba(255, 206, 86, 0.5)', // Missing Documentation
                        'rgba(75, 192, 192, 0.5)', // Other
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)', // Bug
                        'rgba(54, 162, 235, 1)', // Enhancement
                        'rgba(255, 206, 86, 1)', // Missing Documentation
                        'rgba(75, 192, 192, 1)', // Other
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Claims',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Category',
                        },
                    },
                },
            },
        });

        // Nettoyer le graphique lors de la destruction du composant
        return () => {
            console.log("Destroying chart...");
            if (chartRef.current !== null) {
                chartRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        // Mettre à jour les données du graphique lorsque les réclamations changent
        console.log("Reclamations updated:", reclamations);
        if (chartRef.current !== null && reclamations) {
            const categories = {
                Bug: 0,
                Enhancement: 0,
                'Missing Documentation': 0,
                Other: 0,
            };

            reclamations.forEach(reclamation => {
                categories[reclamation.Category]++;
            });

            console.log("Categories:", categories);

            // Mettre à jour les données du graphique
            chartRef.current.data.datasets[0].data = Object.values(categories);
            chartRef.current.update();
        }
    }, [reclamations]);

    return (
        <Box p="4" style={{ width: "600px", height: "400px", margin: "0 auto" }}> {/* Définir la taille du conteneur */}
            <Text fontSize="xl" fontWeight="bold" mb="4">
                Claims by Category
            </Text>
            <canvas id="reclamationsChart" style={{ width: "100%", height: "100%" }}></canvas> {/* Définir la taille du canvas */}
        </Box>
    );
}

export default ChartRecComponent;
