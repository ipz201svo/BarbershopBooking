import {Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps} from "@mui/material";
import {Field, useFormikContext} from "formik";
import React from "react";

type Props = {
  checkbox: Omit<CheckboxProps, 'error' | 'helperText'> & {
    name: string;
  };
  label?: Omit<FormControlLabelProps, 'control'>;
};

const CheckboxBase = (props: Props) => {
  const {label, checkbox: {name}} = props;
  const {touched, errors} = useFormikContext<any>();

  const control = <Field as={Checkbox}
    {...props.checkbox}
    error={touched[name] && !!errors[name]}
  // helperText={touched[name] && errors[name]}
  />;

  if (label === undefined)
    return control;
  else
    return <FormControlLabel
      {...label}
      control={control}
    />;
};

export default CheckboxBase;