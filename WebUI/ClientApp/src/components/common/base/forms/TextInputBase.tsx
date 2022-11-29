import React from 'react';
import {TextField, TextFieldProps} from '@mui/material';
import {Field, useFormikContext} from 'formik';

type Props = Omit<TextFieldProps, 'error' | 'helperText'> & {
  name: string;
};

const TextInputBase = (props: Props) => {
  const {name} = props;
  const {touched, errors} = useFormikContext<any>();
  return <Field as={TextField}
    {...props}
    error={touched[name] && !!errors[name]}
    helperText={touched[name] && errors[name]} />
};

export default TextInputBase;
