import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const InputsReclamations= ({name , onChangeHandler ,value, errors}) => {
    return (
        <FormControl isInvalid={errors}>
            <FormLabel>{name}</FormLabel>
            <Input type="text" name={name} onChange={onChangeHandler} value={value}/>
            {errors && errors.map((err, index) => (
                <FormErrorMessage key={index}>{err}</FormErrorMessage>
            ))}
        </FormControl>
    );
};

export default InputsReclamations;
