import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Select } from '@chakra-ui/react';
import InputForm from '../InputForm';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

export default function DrawerFormChatroom() {
  const {selectedChatroom, chatroom, isOpen, onOpen, onClose, AddChatroom, UpdateChatroom, errors, setErrors , FetchProjects, projects } = useContext(GlobalContext);
  const [form, setForm] = useState({
    chatroomId: '',
    projectId: '',
    chatroomName: '',
  });

  const [projectNames, setProjectNames] = useState([]);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
     const data = await FetchProjects();
     setProjectsList(data)
      //  const names = data.map(project => project.projectname);
        //setProjectNames(names);
    };

    fetchProjectData();
  }, [FetchProjects, projects]);

  useEffect(() => {
    if (selectedChatroom ) {
      setForm(selectedChatroom);
    } else {
      setForm({
        chatroomId: '',
        projectId: '',
        chatroomName: '',
      });
    }
  }, [isOpen, chatroom]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = () => {
    const updatedForm = {
      ...form,
      chatroomCreator: 'admin', 
      members: ['admin','user1'], 
    };

    if (selectedChatroom) {
      UpdateChatroom(updatedForm, setForm, selectedChatroom.id);
    } else {
      AddChatroom(updatedForm, setForm);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => {
            onClose();
            setErrors({});
            setForm({
              chatroomId: '',
              projectId: '',
              chatroomName: '',
            });
          }} />
          <DrawerHeader>{selectedChatroom ? 'Update Chatroom' : 'Create Chatroom'}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <InputForm
                name="chatroomId"
                onChangeHandler={onChangeHandler}
                value={form?.chatroomId || ''}
                errors={errors?.chatroomId}
                label="Chatroom ID"
              />
              <Select
                name="projectId"
                onChange={onChangeHandler}
                value={form?.projectId || ''}
                placeholder="Select a Project"
              >
                {projectsList.map((project) => (
                  <option key={project?.['_id']} value={project?.['_id']}>{project?.projectname}</option>
                ))}
              </Select>
              <InputForm
                name="chatroomName"
                onChangeHandler={onChangeHandler}
                value={form?.chatroomName || ''}
                errors={errors?.chatroomName}
                label="Chatroom Name"
              />
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={() => {
              onClose();
              setErrors({});
              setForm({
                chatroomId: '',
                projectId: '',
                chatroomName: '',
              });
            }}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}