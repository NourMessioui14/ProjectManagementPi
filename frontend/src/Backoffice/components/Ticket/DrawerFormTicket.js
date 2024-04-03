import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormLabel, Select, Textarea, FormErrorMessage } from '@chakra-ui/react';
import { FcHighPriority } from "react-icons/fc";
import { GlobalContext } from '../../../context/GlobalWrapper';

export default function DrawerFormTicket() {
  const { isOpen, onClose, AddTicket, errors, setErrors, UpdateTicket, tickets, ticket, projects, responsables, FetchProjects, fetchUsers } = useContext(GlobalContext); // Ajoutez FetchResponsables
  const [formT, setFormT] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // Fonction de validation du formulaire
  const validateForm = () => {
    const errors = {};
  
    if (!formT.project) {
      errors.project = 'Project is required';
    }
    if (!formT.sprint) {
      errors.sprint = 'Sprint is required';
    }
    if (!formT.typeOfticket) {
      errors.typeOfticket = 'Type of Ticket is required';
    }
    if (!formT.etat) {
      errors.etat = 'etat is required';
    }
    if (!formT.description) {
      errors.description = 'Description is required';
    }
    if (!formT.responsable) {
      errors.responsable = 'Responsible is required';
    }
  
    return errors;
  };

  // Gérer le changement de champ et la validation
  const onChangeHandler = (e) => {
    if (e.target.name === 'project') {
      const selectedProject = projects.find(project => project._id === e.target.value);
  
      setFormT({
        ...formT,
        project: selectedProject || null,
      });
    } else if (e.target.name === 'responsable') {
      const selectedResponsable = responsables.find(responsable => responsable._id === e.target.value); // Utiliser responsables au lieu de projects pour trouver le responsable
  
      setFormT({
        ...formT,
        responsable: selectedResponsable || null,
      });
    } else {
      setFormT({
        ...formT,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Fonction pour enregistrer le ticket
  const onSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      AddTicket(formT, setFormT);
    } else {
      setValidationErrors(validationErrors);
    }
  };

  // Fonction pour mettre à jour le ticket
  const onUpdate = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      UpdateTicket(formT, setFormT, formT._id);
    } else {
      setValidationErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (ticket) {
      setFormT(ticket);
    } else {
      setFormT({});
    }
    FetchProjects();
    fetchUsers(); // Appeler FetchResponsables ici pour charger la liste des responsables
  }, [isOpen, ticket]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => {
            onClose();
            setErrors({});
            setFormT({});
          }} />
          <DrawerHeader>{formT._id ? 'Update Ticket' : 'Create Ticket'}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <FormControl isInvalid={!!validationErrors.project}>
                <FormLabel>Project</FormLabel>
                <Select name="project" onChange={onChangeHandler} value={formT?.project?._id || ''}>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.projectname}</option>
                  ))}
                </Select>
                <FormErrorMessage>{validationErrors.project}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!validationErrors.sprint}>
                <FormLabel>Sprint</FormLabel>
                <Input type="text" name="sprint" onChange={onChangeHandler} value={formT?.sprint || ''} />
                <FormErrorMessage>{validationErrors.sprint}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!validationErrors.typeOfticket}>
                <FormLabel>Type of Ticket</FormLabel>
                <Select name="typeOfticket" onChange={onChangeHandler} value={formT?.typeOfticket || ''}>
                  <option value="Story">Story</option>
                  <option value="Tache">Tache</option>
                  <option value="Bug">   <FcHighPriority />Bug </option>
                  <option value="Epic">Epic</option>
                </Select>
                <FormErrorMessage>{validationErrors.typeOfticket}</FormErrorMessage>
              </FormControl>
              {/* Ajoutez d'autres champs avec validation ici */}


              <FormControl isInvalid={!!validationErrors.description}>
                <Select name="etat" onChange={onChangeHandler} value={formT?.etat || ''}>
                  <option value="To Do">To do</option>
                  <option value="In progress">In progress</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={!!validationErrors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" onChange={onChangeHandler} value={formT?.description || ''} />
              <FormErrorMessage>{validationErrors.description}</FormErrorMessage>
            </FormControl>
            
            <FormControl isInvalid={!!validationErrors.typeOfticket}>
              <FormLabel>Type of Ticket</FormLabel>
              <Select name="typeOfticket" onChange={onChangeHandler} value={formT?.typeOfticket || ''}>
                <option value="Story">Story</option>
                <option value="Tache">Tache</option>
                <option value="Bug">   <FcHighPriority />Bug </option>
                <option value="Epic">Epic   </option>             </Select>
                <FormErrorMessage>{validationErrors.typeOfticket}</FormErrorMessage>
            </FormControl>
            
            <FormControl isInvalid={!!validationErrors.responsable}>
                <FormLabel>Responsable</FormLabel>
                <Select name="responsable" onChange={onChangeHandler} value={formT?.responsable?._id || ''}>
                  {responsables && responsables.map(responsable => (
                    <option key={responsable._id} value={responsable._id}>{typeof responsable.name === 'string' ? responsable.name : ''}</option>
                  ))}
                </Select>
                <FormErrorMessage>{validationErrors.project}</FormErrorMessage>
            </FormControl>
            
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={() => {
              onClose();
              setErrors({});
              setFormT({});
            }}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => formT._id ? onUpdate() : onSave()}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

