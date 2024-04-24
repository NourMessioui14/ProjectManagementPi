import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const InputFormSprint = ({ name, onChangeHandler, value, errors }) => {
  return (
    <FormControl isInvalid={!!errors}>
      <FormLabel>{name}</FormLabel>
      <Input type="text" name={name} onChange={onChangeHandler} value={value} />
      {errors && typeof errors === 'string' && (
        <FormErrorMessage>{errors}</FormErrorMessage>
      )}
      {errors && Array.isArray(errors) && errors.map((err, index) => (
        <FormErrorMessage key={index}>{err}</FormErrorMessage>
      ))}
    </FormControl>
  );
};

export default InputFormSprint;