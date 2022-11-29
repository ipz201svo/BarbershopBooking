import {Box, CssBaseline} from '@mui/material';
import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import AppBar from './AppBar';
import Content from './Content';
import LayoutContext from './LayoutContext';
import Sidebar from './Sidebar';
import {LayoutContextType} from './types';

// type Props = {
//   children: React.ReactNode;
// };

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const defaultContext: LayoutContextType = {
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <LayoutContext.Provider value={defaultContext}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar />
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Box>
    </LayoutContext.Provider>
  );
};

export default Layout;