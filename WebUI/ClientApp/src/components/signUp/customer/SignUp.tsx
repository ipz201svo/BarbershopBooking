import React from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Typography
} from '@mui/material';
import SignUpForm from './SignUpForm';
import {useDocumentTitle} from '../../common/hooks';


const SignUp = () => {
  useDocumentTitle('Sign Up');

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <AddCircleOutlineOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>Sign up as a Customer</Typography>
        <SignUpForm />
      </Box>
    </Container>
  );
};

export default SignUp;