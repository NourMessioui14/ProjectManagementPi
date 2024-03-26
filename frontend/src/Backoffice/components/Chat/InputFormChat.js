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
    </FormControl>
  );
};

export default InputForm;