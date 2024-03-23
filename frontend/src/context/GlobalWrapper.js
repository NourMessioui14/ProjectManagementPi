import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({}); // pour la fonction update 

    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});

    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [favoriteProjects, setFavoriteProjects] = useState([]); // Nouvel état pour stocker les projets favorisés

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

    const AddProject = async (form, onSuccess, onError) => {
      try {
          const response = await axios.post('/api/project', form);
          setProjects(prev => [...prev, response.data]);
          if (onSuccess) onSuccess();
        
      } catch (error) {
          console.error('Error adding project:', error.response ? error.response.data : error);
          if (onError) onError(error);
          toast({
              title: 'Error',
              description: error.response && error.response.data.message ? error.response.data.message : 'An error occurred while adding the project.',
              status: 'error',
              duration: 5000,
              isClosable: true,
          });
      }
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

  
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
