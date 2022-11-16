import React from 'react';
import {useRoutes, createBrowserRouter, RouterProvider} from 'react-router-dom';
import {config as routesConfig} from './components/common/navigation';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {themeConfiguration} from './components/common/configuration';

const theme = createTheme(themeConfiguration);
const router = createBrowserRouter(routesConfig);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    // <LocalizationProvider dateAdapter={AdapterMoment}>
    // {element}
    // </LocalizationProvider>
  );
};

export default App;