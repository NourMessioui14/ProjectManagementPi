import React, { useState, useContext } from 'react';
import { 
    useToast, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Button, 
    useDisclosure,
    Text,
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea
} from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapper';
import NavbarFront from '../../NavbarFront';

function CreateProjectForm() {
    const { AddProject } = useContext(GlobalContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [form, setForm] = useState({
        projectname: '',
        chefdeprojet: '',
        description: '',
        startdate: '',
        enddate: '',
    });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        AddProject(form, () => {
            // Clear form after successful submission
            setForm({
                projectname: '',
                chefdeprojet: '',
                description: '',
                startdate: '',
                enddate: '',
            });
            onOpen(); // Open modal after successful project addition
        }, error => {
            console.error('Project creation failed:', error);
            toast({
                title: 'Error',
                description: "An error occurred while adding the project.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        });
    };
    
    return (
        <div className="col-12 grid-margin stretch-card" style={{ marginTop: '125px' }}>
        <NavbarFront/>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Create New Project</h4>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                        <FormControl id="projectname" isRequired>
                            <FormLabel>Project Name</FormLabel>
                            <Input name="projectname" value={form.projectname} onChange={handleChange} placeholder="Name" />
                        </FormControl>
                        <FormControl id="chefdeprojet" mt={4} isRequired>
                            <FormLabel>Project Manager</FormLabel>
                            <Input name="chefdeprojet" value={form.chefdeprojet} onChange={handleChange} placeholder="Project Manager" />
                        </FormControl>
                        <FormControl id="description" mt={4} isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Detailed description" />
                        </FormControl>
                        <FormControl id="startdate" mt={4} isRequired>
                            <FormLabel>Start Date</FormLabel>
                            <Input type="date" name="startdate" value={form.startdate} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="enddate" mt={4} isRequired>
                            <FormLabel>End Date</FormLabel>
                            <Input type="date" name="enddate" value={form.enddate} onChange={handleChange} />
                        </FormControl>
                        <Button mt={4} colorScheme="blue" type="submit">Submit</Button>
                        <Button mt={4} ml={2} onClick={() => setForm({ projectname: '', chefdeprojet: '', startdate: '', enddate: '', description: '' })}>Cancel</Button>
                    </form>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent bg='blue.50' borderColor='blue.500' borderWidth='2px'>
                    <ModalHeader color='blue.800'>Project Successfully Added</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text fontSize="lg" fontWeight="medium">
                            Congratulations! Your project <Box as='span' fontWeight='bold' color='blue.500'>{form.projectname}</Box> has been added successfully.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Great!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default CreateProjectForm;
