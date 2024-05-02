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
//////////////////////////////////:

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

//////////// les  fonctions de frontOffice
const [reponses, setReponses] = useState([]);

// Fonction pour récupérer les réponses par leur identifiant
const getReponseById = async (id) => {
    try {
        const response = await fetch(`/reponses/${id}`);
        const data = await response.json();
        return data.text; // Retourne le texte de la réponse
    } catch (error) {
        console.error('Error fetching response by ID:', error);
        return null;
    }
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
/*
const FetchReclamationsUser = () => {
  axios
    .get('/reclamations/user-reclamations')
    .then((res) => {
      setClaims(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};*/


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
        FetchReclamationsUser();

      console.log(res.data);
  })
  .catch((err) => {
    setErrors(err.response.data.error);
  });
    

};



const FetchReclamationsUser = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Jeton récupéré:', token);

    if (!token) {
      console.error('Aucun jeton trouvé. Veuillez vous connecter.');
      setError('Aucun jeton trouvé. Veuillez vous connecter.');
      setLoading(false);
      return;
    }

    const response = await axios.get('http://localhost:5001/reclamations/user-reclamations', {
      headers: {
        Authorization: `Bearer ${token}`, // Assurez-vous que le jeton est correctement formaté
      },
      withCredentials: true,
    });

    if (response.data && response.data.length > 0) {
      console.log('Réponse de l\'API:', response.data);
      setClaims(response.data);
    } else {
      console.error('Réponse de l\'API vide ou non structurée correctement:', response.data);
      setError('Aucune réclamation disponible.');
    }
    setLoading(false);
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations:', error.response ? error.response.data : error.message);
    setError('Une erreur s\'est produite lors de la récupération des réclamations.');
    setLoading(false);
  }
};
  

  
    return (
        <GlobalContext.Provider value={{ reponses, getReponseById , FetchReclamationsUser,  Delete , Update,FindOne ,Add,UpdateRecalamation, FindOneRecalamation,AddRecalamation,DeleteRecalamation, FetchReclamations,Reclamations , setClaims ,Reclamation, SetReclamation,  isOpen, onOpen, onClose, errors, setErrors
          }}>
            {children}
        </GlobalContext.Provider>
    );

    
}


