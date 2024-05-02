import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';
import addNotification from 'react-push-notification';
import logo from './logo.png';

export const GlobalContext = createContext();

export default function WrapperS({ children }) {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({}); // pour la fonction update 

    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});

    const [sprints, setSprints] = useState([]);
    const [sprint, setSprint] = useState({}); // pour la fonction update
    
    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    

    const FetchTicketsbyProject = async (projectName) => {
      try {
          const res = await axios.get(`/ticket/project/${projectName}`);
          console.log('Tickets API Response:', res.data);
          setTickets(res.data);
      } catch (err) {
          console.error('Error fetching tickets:', err);
      }
  };
  


    const FetchProjects = async () => {
      try {
          const res = await axios.get('/project');
          setProjects(res.data);
      } catch (err) {
          console.log(err.response.data);
      }
  };

    const DeleteProject = (id) => {
        axios
          .delete(`/project/${id}`)
          .then((res) => {
            setProjects(projects.filter((u) => u._id !== id));
            toast({
              title: 'User Deleted',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err.response.data);
          });
    };

    const AddProject = (form, setForm) => {
        axios
          .post('/project', form)
          .then((res) => {
            setProjects([...projects, res.data])
            toast({
              title: 'Project Added',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            setErrors({});
            setForm({});
            onClose();
          })
          .catch((err) => {
            setErrors(err.response.data.error);
          });
    };

    const FindOneProject = async (id) => {
      try {
          const res = await axios.get(`/project/${id}`);
          setProject(res.data);
      } catch (err) {
          console.log(err.response.data);
      }
  };
  

  const FetchTickets = async () => {
    try {
      const response = await axios.get('/ticket');
      if (response.data) {
        setTickets(response.data);
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };
  const fetchTicketsBySprintId = async (sprintId) => {
    try {
      const response = await axios.get(`/ticket/bysprint/${sprintId}`);
      // console.log("Tickets retrieved by sprintId:", response.data); // Ajouter ce log pour vérifier les tickets récupérés
  
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };
  
    
    const AddTicket = (formT, setFormT) => {
        axios
          .post('/ticket', formT) 
          .then((res) => {
            setTickets([...tickets, res.data])
            toast({
              title: 'Ticket Added',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            setErrors({});
            setFormT({});
            onClose();
          })
          .catch((err) => {
            setErrors(err.response.data.error);
          });
    };
    
    const DeleteTicket = (id) => {
        axios
          .delete(`/ticket/${id}`)
          .then((res) => {
            setTickets(tickets.filter((u) => u._id !== id));
            toast({
              title: 'Ticket is Deleted',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err.response.data);
          });
    };

    const FindOneTicket = async (id) => {
        try {
            const res = await axios.get(`/ticket/${id}`);
            setTickets(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };
    
    const UpdateTicket = (formT, setFormT, id) => {
        axios
          .put(`/ticket/${id}`, formT)
          .then((res) => {
            toast({
              title: 'Ticket Updated',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            setErrors({});
            setFormT({});
            onClose();
            FetchTickets();
          })
          .catch((err) => {
            setErrors(err.response.data.error);
          });
    };

    const Update = (form, setForm, id) => {
      axios
        .put(`/project/${id}`, form)
        .then((res) => {
          toast({
            title: 'User Updated',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          setErrors({});
          setForm({});
          onClose();
          FetchProjects();
        })
        .catch((err) => {
          setErrors(err.response.data.error);
        });
    };
    
    const FetchSprints = async () => {
        try {
            const res = await axios.get('/sprint');
            setSprints(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const fetchSprintsByProjectId = async (projectId) => {
      try {
          const response = await axios.get(`/sprint/byproject/${projectId}`);
          // console.log("sprints retrieved by projectId:", response.data); // Ajouter ce log pour vérifier les tickets récupérés

          setSprints(response.data);
      } catch (error) {
          console.error('Error fetching sprints:', error);
      }
  };


    // const DeleteSprint = (id) => {
    //     axios
    //       .delete(`/sprint/${id}`)
    //       .then((res) => {
    //         setSprints(sprints.filter((u) => u._id !== id));
    //         toast({
    //           title: 'Sprint Deleted',
    //           status: 'success',
    //           duration: 3000,
    //           isClosable: true,
    //         });
    //       })
    //       .catch((err) => {
    //         console.log(err.response.data);
    //       });
    // };

    const DeleteSprint = async (id) => {
      try {
        // Récupérer les tickets associés au sprint à supprimer
        const response = await axios.get(`/ticket/bysprint/${id}`);
        const sprintTickets = response.data;
    
        // Récupérer les propriétaires des tickets
        const ticketOwners = sprintTickets.map(ticket => ticket.responsable.name);
        console.log('Ticket Owners:', ticketOwners);
        // Récupérer le nom du sprint
        const sprint = await axios.get(`/sprint/${id}`);
        const sprintName = sprint.data.sprintname;
        // Envoyer des notifications aux propriétaires des tickets
        ticketOwners.forEach(owner => {
          console.log(`Sending notification to ${owner}`);
          addNotification({
            title: 'Sprint Deleted',
            message: `The sprint '${sprintName}' associated with your ticket has been deleted.`,
            duration: 4000,
            icon: logo,
            native: true,
            onClick: () => window.location="http://localhost:3000/home",

          });
        });
    
        // Supprimer le sprint une fois les notifications envoyées
        await axios.delete(`/sprint/${id}`);
        console.log('Sprint deleted successfully');
    
        // Mettre à jour l'état local et afficher une notification de succès
        setSprints(sprints.filter((u) => u._id !== id));
        toast({
          title: 'Sprint Deleted',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deleting sprint:', error.response.data);
      }
    };
    
  
  

    const AddSprint = (form, setForm) => {
      axios
        .post('/sprint', form)
        .then((res) => {
          setSprints([...sprints, res.data])
          toast({
            title: 'Sprint Added',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setErrors({});
          setForm({});
          onClose();
        })
        .catch((err) => {
          setErrors(err.response.data.error);
        });
  };

    
    const findTicketsByProjectId = async (projectId) => {
      try {
        const response = await axios.get(`/sprint/${projectId}/tickets`);
        return response.data;
      } catch (error) {
        console.error('Error fetching tickets by project ID:', error);
        return []; 
      }
    };

    const FindOneSprint = async (id) => {
      try {
          const res = await axios.get(`/sprint/${id}`);
          setSprint(res.data);
      } catch (err) {
          console.log(err.response.data);
      }
  };

  const UpdateSprint = (form, setForm, id) => {
      axios
        .put(`/sprint/${id}`, form)
        .then((res) => {
          toast({
            title: 'Sprint Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setErrors({});
          setForm({});
          onClose();
          FetchSprints();
        })
        .catch((err) => {
          setErrors(err.response.data.error);
        });
    };


  const AssignTicketsToSprint = async (sprintId, ticketIds) => {
    try {
        await axios.post(`/sprint/${sprintId}/tickets/assign`, { ticketIds });
        // Rafraîchir les données de sprint ou effectuer toute autre action nécessaire
        console.log('Tickets assigned to sprint successfully');
    } catch (error) {
        console.error('Error assigning tickets to sprint:', error);
    }
};
  

    return (
        <GlobalContext.Provider value={{ 
            FetchProjects, 
            projects, 
            DeleteProject, 
            AddProject, 
            FetchTickets,
            tickets,
            AddTicket,
            DeleteTicket,
            FindOneTicket,
            UpdateTicket,
            isOpen,
            onOpen,
            onClose,
            errors,
            setErrors,
            FindOneProject,
            project,
            ticket,
            setProject,
            setTicket,
            setTickets,
            Update,
            FetchSprints, 
            sprints, 
            DeleteSprint, 
            AddSprint,
            FindOneSprint,
            sprint,
            setSprint,
            UpdateSprint,
            findTicketsByProjectId,
            AssignTicketsToSprint,
            FetchTicketsbyProject,
            fetchSprintsByProjectId,
            fetchTicketsBySprintId

  
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
