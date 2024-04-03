import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({}); // pour la fonction update 

    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});

    const [sprints, setSprints] = useState([]);
    const [sprint, setSprint] = useState({}); // pour la fonction update
    
    const [scrums, setScrums] = useState([]);
    const [scrum, setScrum] = useState({}); // pour la fonction update

    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    

    const GetTicketsByProjectId = async (projectId) => {
      try {
          const res = await axios.get(`/ticket/project/${projectId}`);
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
      const res = await axios.get('/ticket');
      console.log('Tickets API Response:', res.data);
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
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

    const DeleteSprint = (id) => {
        axios
          .delete(`/sprint/${id}`)
          .then((res) => {
            setSprints(sprints.filter((u) => u._id !== id));
            toast({
              title: 'Sprint Deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err.response.data);
          });
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

    const FetchScrums = async () => {
      try {
          const res = await axios.get('/scrum');
          setScrums(res.data);
      } catch (err) {
          console.log(err.response.data);
      }
  };

    const AddScrum = (form) => {
      // Extraire les données pertinentes de l'interface utilisateur
      const title = form.title;
      const description = form.description;
      const cards = form.cards;
    
      // Créer l'objet scrum à envoyer au backend
      const newScrum = {
        title: title,
        description: description,
        cards: cards
      };
    
      // Envoyer l'objet scrum au backend
      axios
        .post('/scrum', newScrum)
        .then((res) => {
          // Mettre à jour l'état local avec le nouveau scrum
          setScrums((prevScrums) => [...prevScrums, res.data]);
          toast({
            title: 'Scrum Added',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.error('Error adding scrum:', err);
          toast({
            title: 'Error',
            description: 'Failed to add scrum',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    };
    
    
    
    


    const UpdateScrum = (form, resetForm,id) => {
      axios
          .put(`/scrum/${id}`, form)
          .then((res) => {
              setScrums((prevScrums) => {
                  const updatedScrums = prevScrums.map((scrum) => {
                      if (scrum._id === res.data._id) {
                          return res.data;
                      }
                      return scrum;
                  });
                  return updatedScrums;
              });
              toast({
                  title: 'Scrum Updated',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
              });
              setErrors({});
              resetForm(); // Réinitialise le formulaire
              onClose();
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
            FetchScrums,
            AddScrum,
            UpdateScrum,
            setScrums,
            scrum,
            setScrum,
            scrums,
            AssignTicketsToSprint,
            GetTicketsByProjectId

  
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
