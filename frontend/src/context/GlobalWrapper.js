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

    const toast = useToast();
    
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
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/auth/users');
        if (!response.ok) {
          throw new Error('Error fetching users');
        }
        const data = await response.json();
       // setUsers(data);
      } catch (error) {
        console.error('Error:', error.message);
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
            fetchUsers

  
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
