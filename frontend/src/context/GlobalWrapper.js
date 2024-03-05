import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react'

export const GlobalContext = createContext();

export default function Wrapper({ children }) {
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);

 

  const toast = useToast();



  

    const [ Reclamations , setClaims] = useState([]);
    //update 
    const [Reclamation, SetReclamation] = useState({});
    
    //teb3a el add 
    const [errors, setErrors] = useState({});

    const { isOpen, onOpen, onClose } = useDisclosure();
    

    // Define FetchProjects function
    const FetchProjects = async () => {
        try {
            const res = await axios.get('/api/project');
            setProjects(res.data);
        } catch (err) {
            console.log(err.response.data);
        }
    };


    const Deleteproject = (id) => {
        axios
          .delete(`/api/project/${id}`)
          .then((res) => {
            setProjects(projects.filter((u) => u._id != id));
            toast({
              title: 'User Deleted',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err.reponse.data);
          });
      };

      const Add = (form, setForm) => {
        axios
          .post('/api/project', form)  // Correction: '/api/project' au lieu de '/api/users'
          .then((res) => {
            setProjects([...projects,res.data])
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

      const FetchTickets = async () => {
        try {
          const res = await axios.get('/api/ticket');
          setTickets(res.data);
        } catch (err) {
          console.log(err.response.data);
        }
      };
    
      const AddTicket = (formT, setFormT) => {
        axios .post('/api/ticket', formT) 
          .then((res) => {
            setTickets([...tickets,res.data])
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
    
      const Deleteticket = (id) => {
        axios
          .delete(`/api/ticket/${id}`)
          .then((res) => {
            setTickets(tickets.filter((u) => u._id != id));
            toast({
              title: 'Ticket is Deleted',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err.reponse.data);
          });
      };




//////////////////////////////////



// fonction bech tjybli les donnees 
const FetchReclamations = () => {
  axios
.get('/api/reclamations')
.then((res) => {
  setClaims(res.data)
  console.log(res.data);
  })
.catch((err) => {
  console.log(err.response.data);
  });
  };





  const DeleteRecalamation = (id) => {
      axios.
      delete( `/api/reclamations/${id}`)
      .then((res) =>{
          setClaims(Reclamations.filter((r) => r._id != id));
          
      toast({
          title: 'Claim Deleted',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
  
      })
     
      .catch((err) => {
       console.log(err.response.data);
       });
  };


const AddRecalamation = (form , setForm) => {  
   axios .post(`/api/reclamations`, form)

  .then(( res ) => {
      setClaims([ ...Reclamations , res.data]);
      toast({
          title: 'Claim Added',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();

      console.log(res.data);
  })
  .catch((err) => {
    setErrors(err.response.data.error);
  });
  
};


const FindOneRecalamation = async (id) => {
  await axios 
  .get(`/api/reclamations/${id}`)
  .then((res) => {
      SetReclamation(res.data);

  })
  .catch((err) => {
      setErrors(err.response.data.error);
  });
};


const UpdateRecalamation = (form, setForm, id) =>{
  axios.
  put(`/api/reclamations/${id}` , form )
  .then(( res ) => {
     
      toast({
          title: 'Claim updated',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
        FetchReclamations();

      console.log(res.data);
  })
  .catch((err) => {
    setErrors(err.response.data.error);
  });
  

};













  
    return (
        <GlobalContext.Provider value={{ FetchProjects, projects, Deleteproject, Add, isOpen, onOpen, onClose, errors, setErrors,FetchTickets,tickets,AddTicket
          ,Deleteticket}}>
            {children}
        </GlobalContext.Provider>
    );

    
}


