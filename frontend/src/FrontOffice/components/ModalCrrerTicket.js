import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalWrapper';
import { FcHighPriority } from 'react-icons/fc';

function ModalCreateTicket(props) {
  const { AddTicket, projects, FetchProjects } = useContext(GlobalContext);
  const [formT, setFormT] = useState({
    project: '',
    sprint: '',
    typeOfticket: '',
    etat: '',
    description: '',
    responsable: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  const emailService = new EmailService(); // Créez une instance d

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  const validateForm = () => {
    const errors = {};

    if (!formT.project) {
      errors.project = 'Project is required';
    }
    if (!formT.sprint) {
      errors.sprint = 'Sprint is required';
    }
    if (!formT.typeOfticket) {
      errors.typeOfticket = 'Type of Ticket is required';
    }
    if (!formT.etat) {
      errors.etat = 'State is required';
    }
    if (!formT.description) {
      errors.description = 'Description is required';
    }
    if (!formT.responsable) {
      errors.responsable = 'Responsible is required';
    }

    return errors;
  };

  const onChangeHandler = (e) => {
    if (e.target.name === 'project') {
      const selectedProject = projects.find(project => project._id === e.target.value);
      setFormT({
        ...formT,
        project: selectedProject || null,
      });
    } else {
      setFormT({
        ...formT,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Fonction pour enregistrer le ticket
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  const onSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      AddTicket(formT, setFormT);
<<<<<<< HEAD
=======
=======
  const onSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Ajoutez le ticket
      await AddTicket(formT, setFormT);
  
      // Récupérez les détails pertinents pour personnaliser l'e-mail
      const projectName = formT.project.projectname;
      const ticketType = formT.typeOfticket;
      const description = formT.description;
      const responsableEmail = formT.responsable; // Assurez-vous que cette valeur est correcte
      const responsableName = 'John Doe'; // Remplacez 'John Doe' par le nom réel du responsable
  
      // Envoyez un e-mail personnalisé au responsable
      await emailService.sendCustomizedEmail(
        responsableEmail,
        'New Ticket Assigned',
        projectName,
        ticketType,
        description,
        responsableName
      );
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    } else {
      setValidationErrors(validationErrors);
    }
  };
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  
  
  

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSave}>
          <Form.Group controlId="project">
            <Form.Label>Project</Form.Label>
            <Form.Control
              as="select"
              name="project"
              value={formT.project}
              onChange={onChangeHandler}
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project._id} value={project._id}>{project.projectname}</option>
              ))}
            </Form.Control>
            {validationErrors.project && <Form.Text className="text-danger">{validationErrors.project}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="sprint">
            <Form.Label>Sprint</Form.Label>
            <Form.Control
              type="text"
              name="sprint"
              value={formT.sprint}
              onChange={onChangeHandler}
            />
            {validationErrors.sprint && <Form.Text className="text-danger">{validationErrors.sprint}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="typeOfticket">
            <Form.Label>Type of Ticket</Form.Label>
            <Form.Control
              as="select"
              name="typeOfticket"
              value={formT.typeOfticket}
              onChange={onChangeHandler}
            >
              <option value="">Select a type</option>
              <option value="Story">Story</option>
              <option value="Task">Task</option>
              <option value="Bug"><FcHighPriority /> Bug</option>
              <option value="Epic">Epic</option>
            </Form.Control>
            {validationErrors.typeOfticket && <Form.Text className="text-danger">{validationErrors.typeOfticket}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="etat">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="etat"
              value={formT.etat}
              onChange={onChangeHandler}
            >
              <option value="">Select a state</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
            </Form.Control>
            {validationErrors.etat && <Form.Text className="text-danger">{validationErrors.etat}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formT.description}
              onChange={onChangeHandler}
            />
            {validationErrors.description && <Form.Text className="text-danger">{validationErrors.description}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="responsable">
            <Form.Label>Responsible</Form.Label>
            <Form.Control
              type="text"
              name="responsable"
              value={formT.responsable}
              onChange={onChangeHandler}
            />
            {validationErrors.responsable && <Form.Text className="text-danger">{validationErrors.responsable}</Form.Text>}
          </Form.Group>
         
          <Modal.Footer className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={props.onHide} className="mr-2">Cancel</Button>
          <Button variant="primary" type="submit">Submit</Button>
        </Modal.Footer>        </Form>
      </Modal.Body>
    
    </Modal>
  );
}

export default ModalCreateTicket;
