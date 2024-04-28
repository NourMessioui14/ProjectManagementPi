// ChartPage.js

import { useContext, useState } from "react";
import ChartRecComponent from "./ChartRec";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import Sidebar from "../Sidebar";
import { Box } from "@chakra-ui/react";
import UserRolesChart from "../User/UserRolesChart";


function ChartPage() {
    const {  Reclamations } = useContext(GlobalContext);
    const [searchTerm] = useState('');

    const filteredReclamations = Reclamations.filter((reclamation) =>
    reclamation.Subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.reponses.some(response => response.toLowerCase().includes(searchTerm.toLowerCase()))
);
    return <Box mt="5" rounded={'lg'} boxShadow="base">
    <Box display="flex">
      <Sidebar position="fixed" />
      <div style={{ marginLeft: '250px' }}> {/* Ajoutez une marge à gauche */}
        <ChartRecComponent reclamations={filteredReclamations} />
        <div style={{ marginTop: '50px' }}> {/* Ajoutez un espace entre les deux composants */}
          <UserRolesChart />
        </div>
      </div>
    </Box>
  </Box>
  
    
}

export default ChartPage;
