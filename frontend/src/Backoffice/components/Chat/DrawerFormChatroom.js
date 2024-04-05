import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Select } from '@chakra-ui/react';
import InputForm from '../InputForm';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

export default function DrawerFormChatroom() {
  const { setSelectChatroomHandler,selectedChatroom, chatroom, isOpen, onOpen, onClose, AddChatroom, UpdateChatroom, errors, setErrors, FetchProjects, projects, users, findUsers } = useContext(GlobalContext);
  const [form, setForm] = useState({
    chatroomId: '',
    projectId: '',
    chatroomName: '',
  });

  const [projectNames, setProjectNames] = useState([]);
  const [projectsList, setProjectsList] = useState([]);


  const [selectedUser, setSelectedUser] = useState([])
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
    if (selectedChatroom) {
      setForm(selectedChatroom);
      setSelectedUser(selectedChatroom.members)
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
      members:  selectedUser,
    };

    if (selectedChatroom) {
      UpdateChatroom(updatedForm, setForm, selectedChatroom.id);
    } else {
      AddChatroom(updatedForm, setForm);
    }
  };

  useEffect(() => {
    findUsers()
  }, [])

  useEffect(() => {
    if (isOpen == false) {
      setSelectedUser([])
      setSelectChatroomHandler(null)
    }
  }, [isOpen])

  const selectUsersHandler = (userId) => {

    if (!selectedUser.includes(userId)) {
      setSelectedUser(prev => [...prev, userId])
    }


  }
  const removeUserHandler = (userId) => {

    setSelectedUser(prev => prev.filter((user) => user !== userId))
  }

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

              {selectedUser.map((selected) => { return <span>{users.filter((user) => user?.['_id'] == selected)[0].name} <span onClick={() => removeUserHandler(selected)}>X</span></span> })}
              <Select
                name="user"
                onChange={(e) => { selectUsersHandler(e.target.value) }}
                placeholder="Select a user"
              >
                {users.map((user) => (
                  <option key={user?.['_id']} value={user?.['_id']}>{user?.name}  </option>
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