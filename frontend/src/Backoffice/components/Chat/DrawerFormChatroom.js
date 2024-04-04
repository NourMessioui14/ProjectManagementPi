import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Select } from '@chakra-ui/react';
import InputForm from '../InputForm';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

export default function DrawerFormChatroom() {
  const { isOpen, onOpen, onClose, AddChatroom, UpdateChatroom, errors, setErrors, chatroom, FetchProjects, projects } = useContext(GlobalContext);
  const [form, setForm] = useState({
    chatroomId: '',
    projectId: '',
    chatroomName: '',
  });

  const [projectNames, setProjectNames] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      await FetchProjects();
      if (projects) {
        const names = projects.map(project => project.projectname);
        setProjectNames(names);
      }
    };

    fetchProjectData();
  }, [FetchProjects, projects]);

  useEffect(() => {
    if (chatroom && chatroom._id !== undefined && Object.keys(chatroom).length > 0) {
      setForm(chatroom);
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

    if (form._id) {
      UpdateChatroom(updatedForm, setForm);
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
          <DrawerHeader>{form._id ? 'Update Chatroom' : 'Create Chatroom'}</DrawerHeader>

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
                {projectNames.map(projectName => (
                  <option key={projectName} value={projectName}>{projectName}</option>
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