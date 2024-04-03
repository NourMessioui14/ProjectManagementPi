import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export default function WrapperS({ children }) {

    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});

    const [sprints, setSprints] = useState([]);
    const [sprint, setSprint] = useState({}); // pour la fonction update 

    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    
    



  

  const FetchTickets = async () => {
    try {
      const res = await axios.get('/api/ticket');
      console.log('Tickets API Response:', res.data);
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };
  

//   const FetchTickets = async () => {
//     try {
//         const res = await axios.get('/api/ticket');
//         setTickets(res.data); // Correction de l'utilisation de setTickets
//     } catch (err) {
//         console.log(err.response.data);
//     }
// };

    
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

    const FindOneSprint = async (id) => {
      try {
          const res = await axios.get(`sprint/${id}`);
          setSprint(res.data);
      } catch (err) {
          console.log(err.response.data);
      }
  };

  const UpdateSprint = (form, setForm, id) => {
      axios
        .put(`sprint/${id}`, form)
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
            ticket,
            setTicket,
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
