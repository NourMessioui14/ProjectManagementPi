import React, { useState, useEffect, useContext } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Select, Textarea, FormErrorMessage } from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapper';
import axios from 'axios';
import { FcHighPriority } from 'react-icons/fc';


function TaskModal({ isOpen, onClose }) {
    const {  AddTicket, ticket, projects, FetchProjects } = useContext(GlobalContext);
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'sprint') {
      const selectedSprint = sprints.find(sprint => sprint._id === value);

      setFormT({
        ...formT,
        sprint: selectedSprint || null,
      });
    } else if (name === 'project') {
      const selectedProject = projects.find(project => project._id === value);

      setFormT({
        ...formT,
        project: selectedProject || null,
      });
    } else if (name === 'responsable') {
      const selectedResponsable = responsables.find(responsable => responsable._id === value);

      setFormT({
        ...formT,
        responsable: selectedResponsable || null,
      });
    } else {
      setFormT({
        ...formT,
        [name]: value,
      });
    }
  };

   // Gérer le changement de champ et la validation
   const handleSubmit = (e) => {
    const { name, value } = e.target;

    if (name === 'sprint') {
      const selectedSprint = sprints.find(sprint => sprint._id === value);

      setFormT({
        ...formT,
        sprint: selectedSprint || null,
      });
    } else if (name === 'project') {
      const selectedProject = projects.find(project => project._id === value);

      setFormT({
        ...formT,
        project: selectedProject || null,
      });
    } else if (name === 'responsable') {
      const selectedResponsable = responsables.find(responsable => responsable._id === value);

      setFormT({
        ...formT,
        responsable: selectedResponsable || null,
      });
    } else {
      setFormT({
        ...formT,
        [name]: value,
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
     // UpdateTicket(formT, setFormT, formT._id);
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
    fetchResponsables(); // Appeler FetchResponsables ici pour charger la liste des responsables
  }, [ ticket]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Task</ModalHeader>
        <ModalBody>
        <FormControl isInvalid={!!validationErrors.project}>
        <FormLabel>Project</FormLabel>
        <Select name="project" onChange={handleSubmit} value={formT?.project?._id || ''}>
          {projects.map(project => (
            <option key={project._id} value={project._id}>{project.projectname}</option>
          ))}
        </Select>
        <FormErrorMessage>{validationErrors.project}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!validationErrors.sprint}>
      <FormLabel>Sprint</FormLabel>
      <Select name="sprint" onChange={handleSubmit} value={formT?.sprint?._id || ''}>
        {sprints.map(sprint => (
          <option key={sprint._id} value={sprint._id}>{sprint.sprintname}</option>
        ))}
      </Select>
      <FormErrorMessage>{validationErrors.project}</FormErrorMessage>
    </FormControl>

          <FormControl isInvalid={!!validationErrors.typeOfticket}>
            <FormLabel>Type of Ticket</FormLabel>
            <Select name="typeOfticket" onChange={handleSubmit} value={formT?.typeOfticket || ''}>
            <option value="Story">Story</option>
            <option value="Tache">Tache</option>
            <option value="Bug"><FcHighPriority /> Bug</option>
            <option value="Epic">Epic</option>
          </Select>
            <FormErrorMessage>{validationErrors.typeOfticket}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!validationErrors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" onChange={handleSubmit} value={formT?.description || ''} />
            <FormErrorMessage>{validationErrors.description}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!validationErrors.etat}>
            <FormLabel>Etat</FormLabel>
            <Select name="etat" onChange={handleSubmit} value={formT?.etat || ''}>
              <option value="To Do">To do</option>
              <option value="In progress">In progress</option>
            </Select>
            <FormErrorMessage>{validationErrors.etat}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!validationErrors.responsable}>
            <FormLabel>Responsable</FormLabel>
            <Select name="responsable" onChange={handleSubmit} value={formT?.responsable?._id || ''}>
              {responsables.map(responsable => (
                <option key={responsable._id} value={responsable._id}>{responsable.name}</option>
              ))}
            </Select>
            <FormErrorMessage>{validationErrors.responsable}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={() => formT._id ? onUpdate() : onSave()}>
          Save
        </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskModal;
