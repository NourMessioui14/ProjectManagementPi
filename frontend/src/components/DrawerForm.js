import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
import InputForm from './InputForm';


export default function DrawerForm() {
  const { isOpen, onOpen, onClose, Add, Update, errors, setErrors, project } = useContext(GlobalContext);
  const [form, setForm] = useState({});


  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = () => {
    Add(form,setForm);
  };

  useEffect(() => {
    if (project) {
      setForm(project);
    }
  }, [isOpen, project]);

  

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
          <DrawerHeader>{form._id ? 'Update Project' : 'Create Project'}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <InputForm
                name="projectname"
                onChangeHandler={onChangeHandler}
                value={form?.projectname || ''}
                errors={errors?.projectname}
              />
              <InputForm
                name="chefdeprojet"
                onChangeHandler={onChangeHandler}
                value={form?.chefdeprojet || ''}
                errors={errors?.chefdeprojet}
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
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type="date" name="enddate" onChange={onChangeHandler} value={form?.enddate || ''} />
                {errors?.enddate && <FormErrorMessage>{errors.enddate}</FormErrorMessage>}
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
            <Button colorScheme="blue" onClick={onSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
