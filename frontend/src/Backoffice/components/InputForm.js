<<<<<<< HEAD
=======
<<<<<<< HEAD
import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const InputForm = ({ name, onChangeHandler, value, errors }) => {
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
=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
import React, { useContext } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

const InputForm = ({ name, onChangeHandler, value, errors }) => {
  
  return (
    <FormControl isInvalid={errors}>
      <FormLabel>{name}</FormLabel>
      <Input type="text" name={name} onChange={onChangeHandler} value={value} />
      {errors &&
        errors.map((err, index) => {
          return <FormErrorMessage key={index}>{err}</FormErrorMessage>;
        })}
<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    </FormControl>
  );
};

export default InputForm;
