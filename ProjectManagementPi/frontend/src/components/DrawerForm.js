// DrawerForm.js
import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
import InputForm from './InputForm'; // Assuming you have this component

export default function DrawerForm() {
  const { isOpen, onOpen, onClose, AddChatroom, UpdateChatroom, errors, setErrors, chatroom } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = () => {
    if (form._id) {
      UpdateChatroom(form, setForm);
    } else {
      AddChatroom(form, setForm);
    }
  };

  useEffect(() => {
    if (chatroom) {
      setForm(chatroom);
    }
  }, [isOpen, chatroom]);

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
      name="chatroomname"
      onChangeHandler={onChangeHandler}
      value={form?.chatroomname || ''}
      errors={errors?.chatroomname}
      label="Chatroom Name"
    />
    <InputForm
      name="creator"
      onChangeHandler={onChangeHandler}
      value={form?.creator || ''}
      errors={errors?.creator}
      label="Creator"
    />
    <InputForm
      name="description"
      onChangeHandler={onChangeHandler}
      value={form?.description || ''}
      errors={errors?.description}
      label="Description"
    />
    <InputForm
      name="createdAt"
      onChangeHandler={onChangeHandler}
      value={form?.createdAt || ''}
      errors={errors?.createdAt}
      label="Creation Date"
    />
    {/* Add more fields as needed for chatrooms */}
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
