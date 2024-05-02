import React, { useContext, useEffect, useState } from "react";
import ChartRecComponent from "./ChartRec";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import Sidebar from "../Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import UserRolesChart from "../User/UserRolesChart";
import TicketListByState from "../Ticket/TicketStatistics";
import DashboardCards from "../Project/DashboardCards";
import Navbar from '../Navbar';

function ChartPage() {
  const { Reclamations, fetchReclamations } = useContext(GlobalContext);
  const [tickets, setTickets] = useState([]);
  const [searchTerm] = useState('');

  useEffect(() => {
    // Fetch tickets from the database
    const fetchTickets = async () => {
      try {
        const response = await fetchReclamations(); // Assuming fetchReclamations is a function to fetch the tickets
        const data = await response.json();
        setTickets(data); // Set the fetched tickets in the state
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [fetchReclamations]);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.Subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.reponses.some(response => response.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredReclamations = Reclamations.filter((reclamation) =>
    reclamation.Subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.reponses.some(response => response.toLowerCase().includes(searchTerm.toLowerCase()))
);

  return (
    <Flex>
      <Sidebar position="fixed" />

      {/* Main Content */}
      <Box flex="1" >
        {/* Section is-title-bar */}
        <section className="is-title-bar" style={{ backgroundColor: "#f0f0f0", padding: "10px 0", marginBottom: "20px" }}>
              <Navbar/>

          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 container mx-auto">
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ display: "inline-block", marginRight: "10px", fontWeight: "bold", fontSize: "18px", color: "#333" }}>Admin /</li>
              <li style={{ display: "inline-block", fontWeight: "bold", fontSize: "18px", color: "#333" }}>Dashboard</li>
            </ul>
          </div>
        </section>

        {/* Chart */}
      

        {/* Dashboard Cards */}
        <div className="card mb-6" style={{ flex: "1", marginRight: "10px" }}>
          <DashboardCards/>
        </div>

        {/* Charts in Cards */}
        <Flex justifyContent="space-between">
          <div className="card mb-6" style={{ flex: "1", marginRight: "10px" }}>
            <UserRolesChart />
          </div>
          <div className="card mb-6" style={{ flex: "1", marginLeft: "10px" }}>
            <ChartRecComponent reclamations={filteredReclamations} />
          </div>
        </Flex>

        {/* Ticket List by State */}
        <div className="card " style={{ margin: "5 auto", width: "80%", textAlign: "center" }}>
          <TicketListByState tickets={filteredTickets} />
        </div>
      </Box>
    </Flex>
  );
}

export default ChartPage;
