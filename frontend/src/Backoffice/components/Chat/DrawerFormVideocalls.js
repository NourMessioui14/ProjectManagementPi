import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Input, FormControl, FormLabel, InputGroup, InputRightElement, Icon } from '@chakra-ui/react';
import { BiCalendar, BiTime } from 'react-icons/bi'; // Import des icônes de calendrier et d'heure
import InputForm from '../InputForm';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

export default function DrawerFormVideocalls() {
  const { isOpen, onClose, addVideoCall, updateVideoCall, errors, setErrors, videoCall } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  useEffect(() => {
    // Vérifier si l'appel vidéo a un _id et qu'il n'est pas un objet vide
    if (videoCall && videoCall._id !== undefined && Object.keys(videoCall).length > 0) {
      setForm(videoCall);
    } else {
      setForm({});
    }
  }, [isOpen, videoCall]);

  const onChangeHandler = (e) => {
    const value = e.target.name === 'estimatedDurationMinutes' ? parseInt(e.target.value) : e.target.value;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const onSave = () => {
    if (form._id) {
      updateVideoCall(form, setForm);
    } else {
      // Formater la date et l'heure avant de les envoyer
      const formattedForm = {
        ...form,
        date: formatDate(form.date),
        time: formatTime(form.time),
        videocallCreator: 'admin',
        invitedUsers: ['admin', 'user1', 'user2'],
      };
      console.log("Valeurs envoyées :", formattedForm); // Ajout du console.log ici
      addVideoCall(formattedForm, setForm);
    }
  };

  // Fonction pour formater la date
  const formatDate = (date) => {
    if (!date) return ''; // Retourner une chaîne vide si la date est vide
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  // Fonction pour formater l'heure
  const formatTime = (time) => {
    if (!time) return ''; // Retourner une chaîne vide si l'heure est vide
    return time;
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
                onChangeHandler={(e) => onChangeHandler(e)}
                value={form?.videocallId || ''}
                errors={errors?.videocallId}
                label="Video Call ID"
              />
              <InputForm
                name="projectId"
                onChangeHandler={(e) => onChangeHandler(e)}
                value={form?.projectId || ''}
                errors={errors?.projectId}
                label="Project ID"
              />
              <InputForm
                name="subject"
                onChangeHandler={(e) => onChangeHandler(e)}
                value={form?.subject || ''}
                errors={errors?.subject}
                label="Subject"
              />
              <InputForm
                name="estimatedDurationMinutes"
                onChangeHandler={(e) => onChangeHandler(e)}
                value={form?.estimatedDurationMinutes || ''}
                errors={errors?.estimatedDurationMinutes}
                label="Estimated Duration (minutes)"
              />

              {/* Champ de sélection de date */}
              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={form?.date || ''}
                  onChange={(e) => onChangeHandler(e)}
                />
              </FormControl>

              {/* Champ de sélection de l'heure */}
              <FormControl id="time">
                <FormLabel>Heure</FormLabel>
                <InputGroup>
                  <Input
                    type="time"
                    name="time"
                    value={form?.time || ''}
                    onChange={(e) => onChangeHandler(e)}
                  />
                  <InputRightElement pointerEvents="none" children={<Icon as={BiTime} color="gray.300" />} />
                </InputGroup>
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
