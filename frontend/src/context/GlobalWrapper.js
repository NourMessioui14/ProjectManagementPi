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

    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    
    const FetchProjects = async () => {
        try {
            const res = await axios.get('/api/project');
            setProjects(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const DeleteProject = (id) => {
        axios
          .delete(`/api/project/${id}`)
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
          .post('/api/project', form)
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
          const res = await axios.get(`/api/project/${id}`);
          setProject(res.data);
      } catch (err) {
          console.log(err.response.data);
      }
  };
  



  const FetchTickets = async () => {
    try {
        const res = await axios.get('/api/ticket');
        setTickets(res.data); // Correction de l'utilisation de setTickets
    } catch (err) {
        console.log(err.response.data);
    }
};

    
    const AddTicket = (formT, setFormT) => {
        axios
          .post('/api/ticket', formT) 
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
          .delete(`/api/ticket/${id}`)
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
            const res = await axios.get(`/api/ticket/${id}`);
            setTickets(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };
    
    const UpdateTicket = (formT, setFormT, id) => {
        axios
          .put(`/api/ticket/${id}`, formT)
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
        .put(`/api/project/${id}`, form)
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
            const res = await axios.get('/api/sprint');
            setSprints(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const DeleteSprint = (id) => {
        axios
          .delete(`/api/sprint/${id}`)
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
          .post('/api/sprint', form)
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

    const FindOneSprint = async (id) => {
      try {
          const res = await axios.get(`/api/sprint/${id}`);
          setSprint(res.data);
      } catch (err) {
          console.log(err.response.data);
      }
  };

  const UpdateSprint = (form, setForm, id) => {
      axios
        .put(`/api/sprint/${id}`, form)
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

  
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
