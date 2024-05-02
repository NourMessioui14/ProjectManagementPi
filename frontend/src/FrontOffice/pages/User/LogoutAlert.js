import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react'; // Importer les composants de Chakra UI pour la modale

function LogoutAlert() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      setShowAlert(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowAlert(true);
      }, 10000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <Modal isOpen={showAlert} onClose={handleClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Attention!</ModalHeader>
        <ModalBody>
          Vous serez déconnecté en raison d'une inactivité prolongée.
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Continuer la session
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Déconnexion
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LogoutAlert;
