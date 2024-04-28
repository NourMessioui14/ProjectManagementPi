import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormErrorMessage, FormLabel,Textarea,Select } from '@chakra-ui/react';
import InputFormSprint from './InputFormSprint';

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
                <InputFormSprint
                  name="sprintname"
                  onChangeHandler={onChangeHandler}
                  value={form?.sprintname || ''}
                  errors={errors?.sprintname}
                />
                <FormErrorMessage>{errors?.sprintname}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors?.project}>
                <FormLabel>Project</FormLabel>
                <Select name="project" onChange={onChangeHandler} value={form?.project?._id || ''}>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.projectname}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors?.project}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors?.description}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" onChange={onChangeHandler} value={form?.description || ''} />
                <FormErrorMessage>{errors?.description}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors?.startdate || errors?.enddate}>
                <FormLabel>Start Date</FormLabel>
                <Input type="date" name="startdate" onChange={onChangeHandler} value={form?.startdate || ''} />
                <FormErrorMessage>{errors?.startdate}</FormErrorMessage>

                <FormLabel>End Date</FormLabel>
                <Input type="date" name="enddate" onChange={onChangeHandler} value={form?.enddate || ''} />
                <FormErrorMessage>{errors?.enddate}</FormErrorMessage>
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
            <Button colorScheme="blue" onClick={()=> form._id? onUpdate(): onSave()}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
