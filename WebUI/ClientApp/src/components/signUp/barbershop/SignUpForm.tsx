import React, {useState} from "react";
import {Box, Grid, Button, Alert, Link} from "@mui/material";
import {Formik, Form} from "formik";
import {DatePickerBase, TextInputBase} from "../../common/base/forms";
import LinearProgress from '@mui/material/LinearProgress';
import {routes} from "../../common/navigation";
import {useSignUpMutation} from "../../../behavior/api";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {setAuth} from "../../../behavior/auth/utils";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  phoneNumber: string;
  dateOfBirth: Date | null;
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  city: yup
    .string()
    .required('City is required')
    .max(50, 'City must be less than 50 characters'),
  phoneNumber: yup
    .string()
    .required('Phone number is required'),
  dateOfBirth: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth must be in the past'),
});

const SignUpForm = () => {
  const [signUp, {isLoading}] = useSignUpMutation();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        city: '',
        phoneNumber: '',
        dateOfBirth: null,
      } as Values}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const {succeeded, data, errors} = await signUp({...values, dateOfBirth: values.dateOfBirth as Date}).unwrap();
        if (succeeded) {
          setAuth(data?.token as string);
          navigate(routes.home);
        } else {
          setErrors(errors as string[]);
        }
      }}>
      {({handleSubmit}) => (
        <Box component={Form} noValidate sx={{mt: 3}} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {errors.map((error, index) => (
              <Grid item xs={12}>
                <Alert severity="error" key={index}>{error}</Alert>
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <TextInputBase
                name='firstName'
                label="First Name"
                autoFocus
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInputBase
                name="lastName"
                label="Last Name"
                required
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInputBase
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInputBase
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInputBase
                fullWidth
                label="City"
                name="city"
              // autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePickerBase
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInputBase
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2
            }}>
            Sign Up
          </Button>

          {/* {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )} */}
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href="/signin" variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {isLoading && <LinearProgress />}
        </Box>
      )}
    </Formik>
  );
};

export default SignUpForm;