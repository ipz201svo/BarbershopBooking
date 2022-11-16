import React from 'react';
import {Box, Container, Toolbar} from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const Content = ({children}: Props) => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        {children}
      </Container>
    </Box>
  );
};

export default Content;