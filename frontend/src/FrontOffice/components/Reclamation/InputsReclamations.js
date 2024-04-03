<<<<<<< HEAD
import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const InputsReclamations = ({ name, onChangeHandler, value, errors }) => {
    return (
        <FormControl isInvalid={errors}>
            <FormLabel>{name}</FormLabel>
            <Input type="text" name={name} onChange={onChangeHandler} value={value} />
=======
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const InputsReclamations= ({name , onChangeHandler ,value, errors}) => {
    return (
        <FormControl isInvalid={errors}>
            <FormLabel>{name}</FormLabel>
            <Input type="text" name={name} onChange={onChangeHandler} value={value}/>
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
            {errors && errors.map((err, index) => (
                <FormErrorMessage key={index}>{err}</FormErrorMessage>
            ))}
        </FormControl>
    );
};

<<<<<<< HEAD
export default InputsReclamations;
=======
export default InputsReclamations;
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
