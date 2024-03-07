// DrawerForm.js
import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
import InputForm from './InputForm';

export default function DrawerForm() {
  const { isOpen, onOpen, onClose, AddChatroom, UpdateChatroom, errors, setErrors, chatroom } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Check if chatroom has an _id and it's not an empty object
    if (chatroom && chatroom._id !== undefined && Object.keys(chatroom).length > 0) {
      setForm(chatroom);
      
    } else {
      setForm({});
    }
  }, [isOpen, chatroom]);

  const onSave = () => {
    if (form._id) {
      UpdateChatroom(form, setForm);
    } else {
      AddChatroom(form, setForm);
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
            setForm({});
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
              <InputForm
                name="projectId"
                onChangeHandler={onChangeHandler}
                value={form?.projectId || ''}
                errors={errors?.projectId}
                label="Project ID"
              />
              <InputForm
                name="chatroomCreatorId"
                onChangeHandler={onChangeHandler}
                value={form?.chatroomCreatorId || ''}
                errors={errors?.chatroomCreatorId}
                label="Chatroom Creator ID"
              />
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
              setForm({});
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
