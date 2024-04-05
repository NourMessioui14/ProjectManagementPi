import React, { useContext, useState } from 'react';
import { useToast, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios'; // Ajout de l'importation d'axios
import { GlobalContext } from '../../../context/GlobalWrapper';
import NavbarFront from '../../NavbarFront';



function AddReclamation() {
    const { onOpen, isOpen, onClose, Add, Update, errors, setErrors, Reclamation  } = useContext(GlobalContext);
    const [form, setForm] = useState({});
    const toast = useToast();
   
  
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd();
    };

    const onAdd = () => {
        const token = localStorage.getItem('token');
        axios.post(`/reclamations/addReclamation`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            setErrors({}); // Clear errors
            setForm({}); // Clear form
            onClose(); // Close drawer
            toast({
                title: 'Claim Added',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
           
            console.log(res.data);
        }).catch((err) => {
            console.log(err); // Log error for debugging

            // Handle errors
            if (err.response) {
                if (err.response.status === 400) {
                    // Handle 400 Bad Request error
                    setErrors(err.response.data.message);
                } else {
                    // Handle other HTTP errors
                    setErrors("An error occurred. Please try again later.");
                }
            } else {
                // Handle network errors or other cases where response is undefined
                setErrors("An error occurred. Please try again later.");
            }
        });
    };

    return (
        <div className="col-12 grid-margin stretch-card" style={{ marginTop: '125px' }}>
            <NavbarFront />
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Add New Reclamation</h4>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                        <FormControl id="category" isRequired>
                            <FormLabel>Category</FormLabel>
                            <Input name="Category" value={form.Category || ''} onChange={onChangeHandler} placeholder="Category" />
                        </FormControl>
                        <FormControl id="subject" mt={4} isRequired>
                            <FormLabel>Subject</FormLabel>
                            <Input name="Subject" value={form.Subject || ''} onChange={onChangeHandler} placeholder="Subject" />
                        </FormControl>
                        <FormControl id="description" mt={4} isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea name="Description" value={form.Description || ''} onChange={onChangeHandler} placeholder="Description" />
                        </FormControl>
                        <Button mt={4} colorScheme="blue" type="submit">Submit</Button>
               
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddReclamation;
