import React from 'react';
import {TextField, TextFieldProps} from '@mui/material';
import {Field, useFormikContext} from 'formik';
import {DatePicker, DatePickerProps} from '@mui/x-date-pickers';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from 'moment';

type Props<TInputDate, TDate> = Omit<DatePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>, 'renderInput'>
  & TextFieldProps
  & {name: string};

const DatePickerBase = (props: any) => {
  const {name} = props;
  const {touched, errors, setFieldValue} = useFormikContext<any>();

  return <Field type="date" id={name} name={name} />
  // return <Field
  //   {...props as Parameters<typeof DatePicker>}
  //   as={DatePicker}
  //   onChange={(value: any) => setFieldValue(name, moment(value).toDate())}
  //   renderInput={(params: Parameters<typeof TextField>) => (
  //     <TextField
  //       {...params}
  //       {...props as Parameters<typeof TextField>}
  //       name={name}
  //       error={touched[name] && !!errors[name]}
  //       helperText={touched[name] && errors[name] as string} />
  //   )}
  // />;
  // return <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //   <KeyboardDatePicker
  //     id={name}
  //     {...props}
  //     inputVariant="outlined"
  //     format="MM/dd/yyyy"
  //     onChange={(value: any) => setFieldValue(name, value)}
  //     KeyboardButtonProps={{
  //       "aria-label": "change date"
  //     }}
  //   />
  // </MuiPickersUtilsProvider>
};

export default DatePickerBase;