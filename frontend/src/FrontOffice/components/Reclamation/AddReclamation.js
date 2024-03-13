import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack } from "@chakra-ui/react"
import React, { useContext, useState, useEffect } from "react";
import InputsReclamations from "./InputsReclamations";
import { GlobalContext } from "../../../context/GlobalWrapperRec";

export default function AddReclamation() {
    const { onOpen, isOpen, onClose, Add, errors, setErrors, Reclamation, Update } = useContext(GlobalContext);
    const [form, setForm] = useState({});
   

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };





    
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
            Category: form.Category,
            Subject: form.Subject,
            Description: form.Description
        }, setForm, form._id);
    };

    useEffect(() => {
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
