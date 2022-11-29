import React from "react";
import {Box, Grid, Button, Link} from "@mui/material";
import {Formik, Form} from "formik";
import {CheckboxBase, TextInputBase} from "../common/base/forms";
import * as yup from "yup";

type Values = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),

  rememberMe: yup
    .boolean(),
});

const initialValues: Values = {
  email: '',
  password: '',
  rememberMe: false,
};

const SignInForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({handleSubmit}) => (
        <Box component={Form} noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
          <TextInputBase
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextInputBase
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <CheckboxBase
            checkbox={{
              name: 'rememberMe',
              value: "remember",
              color: "primary"
            }}
            label={{label: "Remember me"}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have a customer account?"}
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/barbershop/signup" variant="body2">
                {"Don't have a barbershop account?"}
              </Link>
            </Grid>
          </Grid>
          {/* <Copyright sx={{mt: 5}} /> */}
        </Box>
      )}
    </Formik>
  );
};

export default SignInForm;