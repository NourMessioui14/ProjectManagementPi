import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
import InputForm from './InputForm';

import Select from 'react-select';




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
  




  

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
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
            </Stack>
          </DrawerBody>

          <DrawerFooter>
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
            <Button colorScheme="blue" onClick={()=> form._id? onUpdate(): onSave()}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
