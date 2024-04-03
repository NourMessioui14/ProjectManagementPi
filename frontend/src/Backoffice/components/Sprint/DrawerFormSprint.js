import React, { useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormErrorMessage, FormLabel,Textarea,Select } from '@chakra-ui/react';
import InputForm from '../InputForm';

import { GlobalContext } from '../../../context/GlobalWrapperSprint';

export default function DrawerFormSprint() {
  const { isOpen, onClose, AddSprint, errors, setErrors,UpdateSprint, sprints, sprint,projects, FetchProjects } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  const onChangeHandler = (e) => {
    if (e.target.name === 'project') {
      const selectedProject = projects.find(project => project._id === e.target.value);
      setForm({
        ...form,
        project: selectedProject || null,
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSave = () => {
    const formErrors = {};
  
    // Vérifier si la date de fin est antérieure à la date de début
    if (form.startdate && form.enddate && new Date(form.startdate) > new Date(form.enddate)) {
      formErrors.enddate = 'End date cannot be before start date';
    }
  
    // Vérifier les autres champs obligatoires
    if (!form.sprintname) formErrors.sprintname = 'Sprint name is required';
    if (!form.project) formErrors.project = 'Project is required';
    if (!form.description) formErrors.description = 'Description is required';
    if (!form.startdate) formErrors.startdate = 'Start date is required';
    if (!form.enddate) formErrors.enddate = 'End date is required';
  
    if (Object.keys(formErrors).length === 0) {
      AddSprint(form, setForm);
    } else {
      setErrors(formErrors);
    }
  };
  
  const onUpdate = () => {
    const formErrors = {};
  
    // Vérifier si la date de fin est antérieure à la date de début
    if (form.startdate && form.enddate && new Date(form.startdate) > new Date(form.enddate)) {
      formErrors.enddate = 'End date cannot be before start date';
    }
  
    // Vérifier les autres champs obligatoires
    if (!form.sprintname) formErrors.sprintname = 'Sprint name is required';
    if (!form.project) formErrors.project = 'Project is required';
    if (!form.description) formErrors.description = 'Description is required';
    if (!form.startdate) formErrors.startdate = 'Start date is required';
    if (!form.enddate) formErrors.enddate = 'End date is required';
  
    if (Object.keys(formErrors).length === 0) {
      UpdateSprint(form, setForm, form._id);
    } else {
      setErrors(formErrors);
    }
  };
  

  useEffect(() => {
    if (sprint) {
      setForm(sprint);
    } else {
      setForm({}); 
    }
    FetchProjects();
  }, [isOpen, sprint]); 
=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import InputForm from '../InputForm';

import Select from 'react-select';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';




export default function DrawerFormSprint() {
  const { isOpen, onClose, AddSprint, UpdateSprint, errors, setErrors, sprint, tickets, FetchTickets } = useContext(GlobalContext);
  const [form, setForm] = useState({});
  const [selectedTickets, setSelectedTickets] = useState([]);
  // const { isOpen, onOpen, onClose, AddSprint, UpdateSprint, errors, setErrors, sprint } = useContext(GlobalContext);
  // const [form, setForm] = useState({});


  // const onChangeHandler = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onSave = () => {
  //   AddSprint(form,setForm);
  // };
  // const onUpdate = () => {
  //   UpdateSprint(form, setForm, form._id);
  // };
  
  // useEffect(() => {
  //   if (sprint) {
  //     setForm(sprint);
  //   }
  // }, 
  // [isOpen, sprint]);




  //const [form, setForm] = useState({});

  
  

  //const ticketContext = useContext(GlobalContext);


  


  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = async () => {
    try {
      // Incluez le code pour sauvegarder le sprint avec les tickets sélectionnés
      await AddSprint({ ...form, tickets: selectedTickets }, setForm);
      // Fetch tickets again after saving the sprint to update the list
      await FetchTickets();
    } catch (error) {
      console.error('Error saving sprint:', error);
    }
  };
  

  const onUpdate = () => {
    // Incluez le code pour mettre à jour le sprint avec les tickets sélectionnés
    UpdateSprint({ ...form, tickets: selectedTickets }, setForm, form._id);
  };

  useEffect(() => {
    console.log('tickets after FetchTickets:', tickets);
  }, [tickets]);
  
  useEffect(() => {
    if (sprint) {
      setForm(sprint);
      // Pré-sélectionnez les tickets existants pour le sprint en cours de mise à jour
      setSelectedTickets(sprint.tickets || []);
    }
    if (isOpen) {
      FetchTickets();
    }
  }, [isOpen, sprint]);

  /*const [selectedTickets, setSelectedTickets] = useState([]);

  const onChangeHandler = (e) => {
    const selectedTicketIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTickets(selectedTicketIds);
    setForm({
      ...form,
      associatedTickets: selectedTicketIds,
    });
  };*/

  // const onChangeHandler = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onSave = () => {
  //   AddSprint(form, setForm);
  // };
  
  // const onUpdate = () => {
  //   UpdateSprint(form, setForm, form._id);
  // };
  

  /*const onSave = () => {
    AddSprint({ ...form, associatedTickets: form.associatedTickets || [] }, setForm);
  };
  
  const onUpdate = () => {
    UpdateSprint({ ...form, associatedTickets: form.associatedTickets || [] }, setForm, form._id);
  };*/

  // useEffect(() => {
  //   if (sprint) {
  //     setForm(sprint);
  //   }
  //   // Assurez-vous que la liste des tickets est récupérée lors de l'ouverture du formulaire
  //   FetchTickets();
  // }, [isOpen, sprint]);


  // useEffect(() => {
  //   FetchTickets();
  // }, []);
  




  
<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
<<<<<<< HEAD
=======
<<<<<<< HEAD
          <DrawerCloseButton onClick={() => {
            onClose();
            setErrors({});
            setForm({});
          }} />
          <DrawerHeader>{form._id ? 'Update sprint' : 'Create sprint'}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <FormControl isInvalid={errors?.sprintname}>
                <InputForm
                  name="sprintname"
                  onChangeHandler={onChangeHandler}
                  value={form?.sprintname || ''}
                  errors={errors?.sprintname}
                />
                <FormErrorMessage>{errors?.sprintname}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.project}>
                <FormLabel>Project</FormLabel>
                <Select name="project" onChange={onChangeHandler} value={form?.project?._id || ''}>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.projectname}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors?.project}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.description}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" onChange={onChangeHandler} value={form?.description || ''} />
                <FormErrorMessage>{errors?.description}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.startdate || errors?.enddate}>
                <FormLabel>Start Date</FormLabel>
                <Input type="date" name="startdate" onChange={onChangeHandler} value={form?.startdate || ''} />
                <FormErrorMessage>{errors?.startdate}</FormErrorMessage>

                <FormLabel>End Date</FormLabel>
                <Input type="date" name="enddate" onChange={onChangeHandler} value={form?.enddate || ''} />
                <FormErrorMessage>{errors?.enddate}</FormErrorMessage>
              </FormControl>
=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
        <DrawerCloseButton
        onClick={() => {
          onClose();
          setErrors({});
          setForm({});
        }}
      />
      <DrawerHeader>Create / Update Sprint</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <InputForm
                name="sprintname"
                onChangeHandler={onChangeHandler}
                
                value={form?.sprintname || ''}
                errors={errors?.sprintname}
              />
              <InputForm
                name="description"
                onChangeHandler={onChangeHandler}
                value={form?.description || ''}
                errors={errors?.description}
              />
              <FormControl>
              <FormLabel>Start Date</FormLabel>
                <Input type="date" name="startdate" onChange={onChangeHandler} value={form?.startdate || ''} />
                {errors?.startdate && <FormErrorMessage>{errors.startdate}</FormErrorMessage>}
              
                <FormLabel>End Date</FormLabel>
                <Input type="date" name="enddate" onChange={onChangeHandler} value={form?.enddate || ''} />
                {errors?.enddate && <FormErrorMessage>{errors.enddate}</FormErrorMessage>}
              
                <FormLabel>Tickets</FormLabel>
                <Select
  options={tickets.map((ticket) => ({ value: ticket._id, label: ticket.description, key: ticket._id }))}
  isMulti
  value={selectedTickets}
  onChange={(selectedOptions) => {
    console.log('Selected Tickets:', selectedOptions);
    setSelectedTickets(selectedOptions);
  }}
  />



                </FormControl>









              {/* <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input type="date" name="startdate" onChange={onChangeHandler} value={form?.startdate || ''} />
                {errors?.startdate && <FormErrorMessage>{errors.startdate}</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type="date" name="enddate" onChange={onChangeHandler} value={form?.enddate || ''} />
                {errors?.enddate && <FormErrorMessage>{errors.enddate}</FormErrorMessage>}
              </FormControl> */}
<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
            </Stack>
          </DrawerBody>

          <DrawerFooter>
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <Button variant="outline" mr={3} onClick={() => {
              onClose();
              setErrors({});
              setForm({});
            }}>
              Cancel
            </Button>
=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
          <Button
          variant="outline"
          mr={3}
          onClick={() => {
            onClose();
            setErrors({});
            setForm({});
          }}
        >
          Cancel
        </Button>
<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
            <Button colorScheme="blue" onClick={()=> form._id? onUpdate(): onSave()}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
