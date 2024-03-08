// DrawerForm.js
import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
import InputForm from './InputForm';

export default function DrawerFormVideocalls() {
  const { isOpen, onOpen, onClose, addVideoCall, updateVideoCall, errors, setErrors, videoCall } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Check if video call has a _id and it's not an empty object
    if (videoCall && videoCall._id !== undefined && Object.keys(videoCall).length > 0) {
      setForm(videoCall);
    } else {
      setForm({});
    }
  }, [isOpen, videoCall]);

  const onSave = () => {
    if (form._id) {
      updateVideoCall(form, setForm);
    } else {
      addVideoCall(form, setForm);
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
          <DrawerHeader>{form._id ? 'Update Video Call' : 'Create Video Call'}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <InputForm
                name="videocallId"
                onChangeHandler={onChangeHandler}
                value={form?.videocallId || ''}
                errors={errors?.videocallId}
                label="Video Call ID"
              />
              <InputForm
                name="projectId"
                onChangeHandler={onChangeHandler}
                value={form?.projectId || ''}
                errors={errors?.projectId}
                label="Project ID"
              />
              <InputForm
                name="videocallCreatorId"
                onChangeHandler={onChangeHandler}
                value={form?.videocallCreatorId || ''}
                errors={errors?.videocallCreatorId}
                label="Video Call Creator ID"
              />
              <InputForm
                name="subject"
                onChangeHandler={onChangeHandler}
                value={form?.subject || ''}
                errors={errors?.subject}
                label="Subject"
              />
              <InputForm
                name="estimatedDurationMinutes"
                onChangeHandler={onChangeHandler}
                value={form?.estimatedDurationMinutes || ''}
                errors={errors?.estimatedDurationMinutes}
                label="Estimated Duration (minutes)"
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
