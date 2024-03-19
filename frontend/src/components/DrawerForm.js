import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormErrorMessage, FormLabel, Avatar } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
// Importez la bibliothèque "avatar-initials" avec le nom approprié


export default function DrawerForm() {
  const { isOpen, onClose, AddProject, Update, errors, setErrors, project } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  // Fonction de sélection aléatoire du logo
 

  // Fonction de validation du formulaire
  const validateForm = () => {
    const validationErrors = {};
    // Logique de validation du formulaire
    return validationErrors;
  };

  // Gérer les changements de champ
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour enregistrer le projet
  const onSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
     
      AddProject(form, setForm);
    } else {
      setErrors(validationErrors);
    }
  };

  // Fonction pour mettre à jour le projet
  const onUpdate = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      Update(form, setForm, form._id);
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (project) {
      setForm(project);
    }
  }, [isOpen, project]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={() => {
          onClose();
          setErrors({});
          setForm({});
        }} />
        <DrawerHeader>{form._id ? 'Update Project' : 'Create Project'}</DrawerHeader>

        <DrawerBody>
          <Stack spacing={'24px'}>
            <FormControl isInvalid={!!errors.projectname}>
              <FormLabel>Project Name</FormLabel>
              <Input name="projectname" onChange={onChangeHandler} value={form?.projectname || ''} />
              <FormErrorMessage>{errors.projectname}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.chefdeprojet}>
              <FormLabel>Project Manager</FormLabel>
              <Input name="chefdeprojet" onChange={onChangeHandler} value={form?.chefdeprojet || ''} />
              <FormErrorMessage>{errors.chefdeprojet}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Input name="description" onChange={onChangeHandler} value={form?.description || ''} />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.startdate}>
              <FormLabel>Start Date</FormLabel>
              <Input type="date" name="startdate" onChange={onChangeHandler} value={form?.startdate || ''} />
              <FormErrorMessage>{errors.startdate}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.enddate}>
              <FormLabel>End Date</FormLabel>
              <Input type="date" name="enddate" onChange={onChangeHandler} value={form?.enddate || ''} />
              <FormErrorMessage>{errors.enddate}</FormErrorMessage>
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => {
            onClose();
            setErrors({});
            setForm({});
          }}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={() => (form._id ? onUpdate() : onSave())}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
