<<<<<<< HEAD
import React, { useContext, useState, useEffect } from "react";
import InputsReclamations from "./InputsReclamations";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Toast, useToast } from "@chakra-ui/react";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import axios from "axios";

export default function AddReclamation() {
    const { onOpen, isOpen, onClose, Add, Update, errors, setErrors, Reclamation , FetchReclamationsUser } = useContext(GlobalContext);
    const [form, setForm] = useState({});
    const toast = useToast();
    const [Reclamations, setClaims] = useState([]);

=======
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack } from "@chakra-ui/react"
import React, { useContext, useState, useEffect } from "react";
import InputsReclamations from "./InputsReclamations";
import { GlobalContext } from "../../../context/GlobalWrapperRec";

export default function AddReclamation() {
    const { onOpen, isOpen, onClose, Add, errors, setErrors, Reclamation, Update } = useContext(GlobalContext);
    const [form, setForm] = useState({});
   
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


<<<<<<< HEAD
    
    const onAdd = () => {
        const token = localStorage.getItem('token');
        axios.post(`/reclamations/addReclamation`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            setClaims(res.data); // Assuming `res.data` is the new reclamation object
            toast ({
                title: 'Claim Added',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setErrors({});
            setForm({});
            onClose();
            console.log(res.data);
        }).catch((err) => {
            console.log(err); // Add this line to see the structure of the error object
        
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
    
    const onUpdate = () => {
        Update({
            
=======



    
    const onAdd = () => {
        Add({
            UserName: form.UserName,
            UserId: form.UserId,
            Category: form.Category,
            Subject: form.Subject,
            Description: form.Description
        }, setForm);
    };

    const onUpdate = () => {
        Update({
            UserName: form.UserName,
            UserId: form.UserId,
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
            Category: form.Category,
            Subject: form.Subject,
            Description: form.Description
        }, setForm, form._id);
    };

    useEffect(() => {
<<<<<<< HEAD
        setForm(Reclamation || {});
    }, [Reclamation]);

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton onClick={() => { onClose(); setErrors({}); setForm({}); }} />
                <DrawerHeader>Create / Update Claim</DrawerHeader>
                <DrawerBody>
                    <Stack spacing={"24px"}>
                        <InputsReclamations name="Category" onChangeHandler={onChangeHandler} value={form?.Category} errors={errors?.Category} />
                        <InputsReclamations name="Subject" onChangeHandler={onChangeHandler} value={form?.Subject} errors={errors?.Subject} />
                        <InputsReclamations name="Description" onChangeHandler={onChangeHandler} value={form?.Description} errors={errors?.Description} />
                    </Stack>
                </DrawerBody>
                <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={() => { onClose(); setErrors({}); setForm({}); }}>Cancel</Button>
                        <Button colorScheme='blue' onClick={() => (form._id ? onUpdate() : onAdd())}>Save</Button>
                        
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
=======
        setForm(Reclamation);
    }, [Reclamation]);

    return (
        <>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={() => { onClose(); setErrors({}); setForm({}); }} />
                    <DrawerHeader>Create / Update Claim</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={"24px"}>
                            <InputsReclamations name="UserName" onChangeHandler={onChangeHandler} value={form?.UserName} errors={errors?.UserName} />
                            <InputsReclamations name="UserId" onChangeHandler={onChangeHandler} value={form?.UserId} errors={errors?.UserId} />
                            <InputsReclamations name="Category" onChangeHandler={onChangeHandler} value={form?.Category} errors={errors?.Category} />
                            <InputsReclamations name="Subject" onChangeHandler={onChangeHandler} value={form?.Subject} errors={errors?.Subject} />
                            <InputsReclamations name="Description" onChangeHandler={onChangeHandler} value={form?.Description} errors={errors?.Description} />
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={() => { onClose(); setErrors({}); setForm({}); }}>Cancel</Button>
                        <Button colorScheme='blue' onClick={() => (form._id ? onUpdate() : onAdd())}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
