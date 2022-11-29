import React from 'react';
import {useDocumentTitle} from '../common/hooks';
import * as yup from "yup";
import {Form, Formik} from 'formik';
import {Box, Button, Typography} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import Address from './Address';
import ImageTiles from './imageTiles';

type Values = {
  name: string;
  description: string;
  images: string[];
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Barbershop name is required')
    .max(50, 'Barbershop name must be less than 50 characters'),
  description: yup
    .string(),
  street: yup
    .string()
    .required('Street is required'),
  city: yup
    .string()
    .required('City is required'),
  state: yup
    .string()
    .required('State is required'),
  postCode: yup
    .string()
    .required('Post code is required'),
  images: yup.array(),
});

const MyBarbershop = () => {
  useDocumentTitle('My Barbershop');
  return (
    <div>
      <Typography component='h1' variant='h3' sx={{mb: 2}}>My Barbershop</Typography>
      <Box>
        <Formik
          initialValues={{
            name: '',
            description: '',
            street: '',
            city: '',
            state: '',
            postCode: '',
            images: [],
          } as Values}
          validationSchema={validationSchema}
          onSubmit={async (values, {setErrors}) => console.log(values)}
        >
          {({handleSubmit}) => (
            <Box component={Form} noValidate onSubmit={handleSubmit}>
              <GeneralInfo />
              <Address />
              <ImageTiles />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  mb: 2
                }}>
                Save changes
              </Button>
            </Box>
          )}
        </Formik >
      </Box >
    </div >
  )
}

export default MyBarbershop;
