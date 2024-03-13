import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react'

export const GlobalContext = createContext();

export default function WrapperRec({ children }) {

 

  const toast = useToast();



    const [ Reclamations , setClaims] = useState([]);
    //update 
    const [Reclamation, SetReclamation] = useState({});
    
    //teb3a el add 
    const [errors, setErrors] = useState({});

    const { isOpen, onOpen, onClose } = useDisclosure();
    




//////////////////////////////////



// fonction bech tjybli les donnees 
const FetchReclamations = () => {
  axios
.get('/reclamations')
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
      delete( `/reclamations/${id}`)
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

  const AddRecalamation = (form, setForm) => {
    const requestData = {
      ...form,
      UserId: parseInt(form.UserId), // Convertir en nombre
    };
  
    axios
      .post('/reclamations', requestData)
      .then((res) => {
        setClaims([...Reclamations, res.data]);
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
  .get(`/reclamations/${id}`)
  .then((res) => {
      SetReclamation(res.data);

  })
  .catch((err) => {
      setErrors(err.response.data.error);
  });
};


const UpdateRecalamation = (form, setForm, id) =>{
  axios.
  put(`/reclamations/${id}` , form )
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





const Add = (form , setForm) => {  
    axios .post(`/reclamations`, form)

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



const FindOne = async (id) => {
    await axios 
    .get(`/reclamations/${id}`)
    .then((res) => {
        SetReclamation(res.data);

    })
    .catch((err) => {
        setErrors(err.response.data.error);
    });
};
const Update = (form, setForm, id) =>{
    axios.
    put(`/reclamations/${id}` , form )
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
  
const Delete = (id) => {
    axios.
    delete(` /reclamations/${id}`)
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





  
    return (
        <GlobalContext.Provider value={{Delete, Update,FindOne ,Add,UpdateRecalamation, FindOneRecalamation,AddRecalamation,DeleteRecalamation, FetchReclamations,Reclamations , setClaims ,Reclamation, SetReclamation,  isOpen, onOpen, onClose, errors, setErrors
          }}>
            {children}
        </GlobalContext.Provider>
    );

    
}


