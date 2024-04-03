import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormLabel, Select, Textarea, FormErrorMessage } from '@chakra-ui/react';
import { FcHighPriority } from "react-icons/fc";
import { GlobalContext } from '../../../context/GlobalWrapper';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

export default function DrawerFormTicket() {
  const { isOpen, onClose, AddTicket, errors, setErrors, UpdateTicket, tickets, ticket, projects, responsables, FetchProjects, fetchUsers } = useContext(GlobalContext); // Ajoutez FetchResponsables
  const [formT, setFormT] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
<<<<<<< HEAD
=======
=======
import UserList from '../../pages/UserList';
import axios from 'axios';

export default function DrawerFormTicket() {
  const { isOpen, onClose, AddTicket, UpdateTicket, ticket, projects, FetchProjects } = useContext(GlobalContext);
  const [formT, setFormT] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [responsables, setResponsables] = useState([]);
  const [sprints, setSprints] = useState([]);


  useEffect(() => {
    FetchProjects();
    fetchResponsables();
    FetchSprints();
  }, [isOpen, ticket]);

  const fetchResponsables = async () => {
    try {
      const response = await fetch('http://localhost:5001/auth/users');
      if (!response.ok) {
        throw new Error('Error fetching responsables');
      }
      const data = await response.json();
      setResponsables(data);
    } catch (error) {
      console.error('Error fetching responsables:', error.message);
    }
  };

  const FetchSprints = async () => {
    try {
        const res = await axios.get('/sprint');
        setSprints(res.data);
    } catch (err) {
        console.log(err.response.data);
    }
};

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

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
<<<<<<< HEAD
    if (e.target.name === 'project') {
      const selectedProject = projects.find(project => project._id === e.target.value);
  
=======
<<<<<<< HEAD
    if (e.target.name === 'project') {
      const selectedProject = projects.find(project => project._id === e.target.value);
  
=======
    const { name, value } = e.target;

    if (name === 'sprint') {
      const selectedSprint = sprints.find(sprint => sprint._id === value);

      setFormT({
        ...formT,
        sprint: selectedSprint || null,
      });
    } else if (name === 'project') {
      const selectedProject = projects.find(project => project._id === value);

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
      setFormT({
        ...formT,
        project: selectedProject || null,
      });
<<<<<<< HEAD
    } else if (e.target.name === 'responsable') {
      const selectedResponsable = responsables.find(responsable => responsable._id === e.target.value); // Utiliser responsables au lieu de projects pour trouver le responsable
  
=======
<<<<<<< HEAD
    } else if (e.target.name === 'responsable') {
      const selectedResponsable = responsables.find(responsable => responsable._id === e.target.value); // Utiliser responsables au lieu de projects pour trouver le responsable
  
=======
    } else if (name === 'responsable') {
      const selectedResponsable = responsables.find(responsable => responsable._id === value);

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
      setFormT({
        ...formT,
        responsable: selectedResponsable || null,
      });
    } else {
      setFormT({
        ...formT,
<<<<<<< HEAD
        [e.target.name]: e.target.value,
=======
<<<<<<< HEAD
        [e.target.name]: e.target.value,
=======
        [name]: value,
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
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
<<<<<<< HEAD
    fetchUsers(); // Appeler FetchResponsables ici pour charger la liste des responsables
=======
<<<<<<< HEAD
    fetchUsers(); // Appeler FetchResponsables ici pour charger la liste des responsables
=======
    fetchResponsables(); // Appeler FetchResponsables ici pour charger la liste des responsables
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  }, [isOpen, ticket]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
          <DrawerCloseButton onClick={() => {
            onClose();
            setErrors({});
            setFormT({});
          }} />
<<<<<<< HEAD
=======
=======
        <DrawerCloseButton onClick={() => {
          onClose();
          setValidationErrors({}); // Correction ici
          setFormT({});
        }} />
        
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
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

<<<<<<< HEAD
=======
=======
              <FormLabel>Sprint</FormLabel>
              <Select name="sprint" onChange={onChangeHandler} value={formT?.sprint?._id || ''}>
                {sprints.map(sprint => (
                  <option key={sprint._id} value={sprint._id}>{sprint.sprintname}</option>
                ))}
              </Select>
              <FormErrorMessage>{validationErrors.project}</FormErrorMessage>
            </FormControl>
    
                  <FormControl isInvalid={!!validationErrors.typeOfticket}>
                    <FormLabel>Type of Ticket</FormLabel>
                    <Select name="typeOfticket" onChange={onChangeHandler} value={formT?.typeOfticket || ''}>
                      <option value="Story">Story</option>
                      <option value="Tache">Tache</option>
                      <option value="Bug"><FcHighPriority /> Bug</option>
                      <option value="Epic">Epic</option>
                    </Select>
                    <FormErrorMessage>{validationErrors.typeOfticket}</FormErrorMessage>
                  </FormControl>
    
                  <FormControl isInvalid={!!validationErrors.description}>
                    <FormLabel>Description</FormLabel>
                    <Textarea name="description" onChange={onChangeHandler} value={formT?.description || ''} />
                    <FormErrorMessage>{validationErrors.description}</FormErrorMessage>
                  </FormControl>
    
                  <FormControl isInvalid={!!validationErrors.etat}>
                    <FormLabel>Etat</FormLabel>
                    <Select name="etat" onChange={onChangeHandler} value={formT?.etat || ''}>
                      <option value="To Do">To do</option>
                      <option value="In progress">In progress</option>
                    </Select>
                    <FormErrorMessage>{validationErrors.etat}</FormErrorMessage>
                  </FormControl>
    
                  <FormControl isInvalid={!!validationErrors.responsable}>
                    <FormLabel>Responsable</FormLabel>
                    <Select name="responsable" onChange={onChangeHandler} value={formT?.responsable?._id || ''}>
                      {responsables.map(responsable => (
                        <option key={responsable._id} value={responsable._id}>{responsable.name}</option>
                      ))}
                    </Select>
                    <FormErrorMessage>{validationErrors.responsable}</FormErrorMessage>
                  </FormControl>
    
                </Stack>
              </DrawerBody>
    
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={() => {
                  onClose();
                  setValidationErrors({});
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
    
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
