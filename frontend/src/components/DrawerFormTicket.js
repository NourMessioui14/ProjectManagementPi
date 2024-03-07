import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormLabel, Select, Textarea } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
import { FcHighPriority } from "react-icons/fc";

export default function DrawerFormTicket() {
  const { isOpen, onClose, AddTicket, errors, setErrors,UpdateTicket, tickets, ticket,projects, FetchProjects } = useContext(GlobalContext);
  const [formT, setFormT] = useState({});



    // ki tselectioni lista mtaa projet t7awwl ll id mn string ll projet lkol 

  const onChangeHandler = (e) => {
    if (e.target.name === 'project') {
      const selectedProject = projects.find(project => project._id === e.target.value);
      setFormT({
        ...formT,
        project: selectedProject || null,
      });
    } else {
      setFormT({
        ...formT,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSave = () => {
    AddTicket(formT, setFormT);
  };
  const onUpdate = () => {
    UpdateTicket(formT, setFormT, formT._id);
  };

  

  useEffect(() => {
    if (ticket) {
      setFormT(ticket);
    } else {
      setFormT({}); // Assurez-vous que formT est initialisé si ticket est null
    }
    // Récupérer la liste des projets lors de l'ouverture du formulaire
    FetchProjects();
  }, [isOpen, ticket]); // Assurez-vous que useEffect s'ex

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
              <FormControl>
                <FormLabel>Project</FormLabel>
                <Select name="project" onChange={onChangeHandler} value={formT?.project?._id || ''}>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.projectname}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
              <FormLabel>Sprint</FormLabel>
              <Input type="text" name="sprint" onChange={onChangeHandler} value={formT?.sprint || ''} />
            </FormControl>

              <FormControl>
                <FormLabel>Type of Ticket</FormLabel>
                <Select name="typeOfticket" onChange={onChangeHandler} value={formT?.typeOfticket || ''}>
                  <option value="Story">Story</option>
                  <option value="Tache">Tache</option>
                  <option value="Bug">   <FcHighPriority/>Bug </option>

                  <option value="Epic">Epic</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Select name="etat" onChange={onChangeHandler} value={formT?.etat || ''}>
                  <option value="To Do">To do</option>
                  <option value="In progress">In progress</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" onChange={onChangeHandler} value={formT?.description || ''} />
              </FormControl>
              <FormControl>
                <FormLabel>Responsible</FormLabel>
                <Input type="text" name="responsable" onChange={onChangeHandler} value={formT?.responsable || ''} />
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
            <Button colorScheme="blue" onClick={()=> formT._id? onUpdate(): onSave()}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
