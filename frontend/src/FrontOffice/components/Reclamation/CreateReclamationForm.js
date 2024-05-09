import React, { useContext, useState, useEffect } from 'react';
import { useToast, FormControl, FormLabel, Input, Textarea, Button, Select } from '@chakra-ui/react';
import axios from 'axios'; 
import { GlobalContext } from '../../../context/GlobalWrapper';
import NavbarFront from '../../NavbarFront';
import { IoAdd } from 'react-icons/io5';
import { Navigate } from 'react-router-dom';

const forbiddenWords = ['stupid', 'bad'];

function AddReclamation() {
    const { onOpen, isOpen, onClose, Add, Update, errors, setErrors, Reclamation  } = useContext(GlobalContext);
    const [form, setForm] = useState({});
    const [categories, setCategories] = useState([]); // Ajout du state pour les catégories
    const toast = useToast();

    useEffect(() => {
        fetchCategories(); // Appel à la fonction pour récupérer les catégories lorsque le composant est monté
    }, []);

    const fetchCategories = () => {
        axios.get('https://nestjspi.onrender.com/reclamations/categories')
            .then(response => {
                setCategories(response.data.categories); // Stockage des catégories dans le state
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };

    const containsForbiddenWords = () => {
        const { Category, Subject, Description } = form;
        const content = `${Category} ${Subject} ${Description}`.toLowerCase();
        return forbiddenWords.some(word => content.includes(word));
    };
   
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (containsForbiddenWords()) {
            toast({
                title: 'Forbidden words found!',
                description: 'Please remove any inappropriate language from your description.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        onAdd();
    };

    const onAdd = () => {
        const token = localStorage.getItem('token');
        axios.post(`https://nestjspi.onrender.com/reclamations/addReclamation`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            setErrors({}); 
            setForm({}); 
            onClose(); 
            toast({
                title: 'Claim Added',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            console.log(res.data);
        }).catch((err) => {
            console.log(err); 
            if (err.response) {
                if (err.response.status === 400) {
                    setErrors(err.response.data.message);
                } else {
                    setErrors("An error occurred. Please try again later.");
                }
            } else {
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
                            <Select name="Category" value={form.Category || ''} onChange={onChangeHandler} placeholder="Select Category">
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Select>
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