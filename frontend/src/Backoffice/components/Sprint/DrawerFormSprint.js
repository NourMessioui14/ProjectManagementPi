import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import InputForm from '../InputForm';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';

export default function DrawerFormSprint() {
  const { isOpen, onClose, AddSprint, UpdateSprint, errors, setErrors, sprint, projects, FetchProjects, tickets, FetchTickets } = useContext(GlobalContext);
  const [form, setForm] = useState({});
  const [selectedTickets, setSelectedTickets] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSave = async () => {
    try {
      const formErrors = validateForm(form);
      if (Object.keys(formErrors).length === 0) {
        await AddSprint({ ...form, tickets: selectedTickets }, setForm);
        await FetchTickets();
      } else {
        setErrors(formErrors);
      }
    } catch (error) {
      console.error('Error saving sprint:', error);
    }
  };

  const onUpdate = () => {
    const formErrors = validateForm(form);
    if (Object.keys(formErrors).length === 0) {
      UpdateSprint({ ...form, tickets: selectedTickets }, setForm, form._id);
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = (formData) => {
    const formErrors = {};
    if (formData.startdate && formData.enddate && new Date(formData.startdate) > new Date(formData.enddate)) {
      formErrors.enddate = 'End date cannot be before start date';
    }
    ['sprintname', 'project', 'description', 'startdate', 'enddate'].forEach(field => {
      if (!formData[field]) {
        formErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    return formErrors;
  };

  useEffect(() => {
    if (sprint) {
      setForm(sprint);
      setSelectedTickets(sprint.tickets || []);
    } else {
      setForm({});
    }
    FetchProjects();
  }, [isOpen, sprint]);

  useEffect(() => {
    console.log('tickets after FetchTickets:', tickets);
  }, [tickets]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => {
            onClose();
            setErrors({});
            setForm({});
          }} />
          <DrawerHeader>{form._id ? 'Update sprint' : 'Create sprint'}</DrawerHeader>
          <DrawerBody>
            <Stack spacing={'24px'}>
              <FormControl isInvalid={errors?.sprintname}>
                <InputForm name="sprintname" onChangeHandler={onChangeHandler} value={form?.sprintname || ''} errors={errors?.sprintname} />
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
              <FormControl>
                <FormLabel>Tickets</FormLabel>
                <Select
                  options={tickets.map(ticket => ({ value: ticket._id, label: ticket.description, key: ticket._id }))}
                  isMulti
                  value={selectedTickets}
                  onChange={(selectedOptions) => setSelectedTickets(selectedOptions)}
                />
              </FormControl>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={() => {
              onClose();
              setErrors({});
              setForm({});
            }}>Cancel</Button>
            <Button colorScheme="blue" onClick={() => form._id ? onUpdate() : onSave()}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
