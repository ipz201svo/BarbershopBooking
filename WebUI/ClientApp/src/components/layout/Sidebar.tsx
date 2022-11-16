import React, {useContext} from 'react';
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar
} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import {drawerWidth} from "./constants";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LayoutContext from './LayoutContext';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import {LinkBase} from '../common/base/navigation';

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Sidebar = () => {
  const {isSidebarOpen, setIsSidebarOpen} = useContext(LayoutContext);
  const toggleDrawer = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Drawer variant="permanent" open={isSidebarOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton component={LinkBase} href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={LinkBase} href="/barbershops">
          <ListItemIcon>
            <ContentCutIcon />
          </ListItemIcon>
          <ListItemText primary="Barbershops" />
        </ListItemButton>
        <ListItemButton component={LinkBase} href="/bookings">
          <ListItemIcon>
            <ShoppingBagIcon />
          </ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItemButton>
        {/* <Divider sx={{my: 1}} />
        {secondaryListItems} */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
