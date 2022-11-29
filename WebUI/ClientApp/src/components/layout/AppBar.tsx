import React, {useContext} from "react";
import {IconButton, styled, Toolbar, Typography} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import LayoutContext from "./LayoutContext";
import {drawerWidth} from "./constants";

type Props = MuiAppBarProps & {
  open?: boolean
};

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<Props>(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = () => {
  const {setIsSidebarOpen, isSidebarOpen} = useContext(LayoutContext);
  const toggleDrawer = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <StyledAppBar position="absolute" open={isSidebarOpen}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(isSidebarOpen && {display: 'none'}),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{flexGrow: 1}}
        >
          Barber Market
        </Typography>

      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;