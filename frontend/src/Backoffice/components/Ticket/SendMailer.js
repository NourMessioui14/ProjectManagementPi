import React from 'react';
import sendEmailToResponsable from './sendEmailToResponsable';

function SendMailer() {
  // Appeler la fonction sendEmailToResponsable ici
  const responsableEmail = 'responsable@example.com'; // Remplacez par l'e-mail du responsable
  const ticketData = {
    typeOfticket: 'Bug',
    description: 'Problème de connexion',
    // Ajoutez d'autres données de ticket ici
  };

  // Appeler la fonction d'envoi d'e-mail
  sendEmailToResponsable(responsableEmail, ticketData);

  return (
    <div>
      {/* Contenu de votre composant */}
    </div>
  );
}

export default SendMailer;
