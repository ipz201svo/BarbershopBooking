import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import {useScrollTrigger} from '@mui/material';

type Props = {
  anchor: Element | null;
};

const ScrollTop = ({anchor}: Props) => {
  // const trigger = useScrollTrigger({
  //   target: document,
  //   disableHysteresis: true,
  //   threshold: 100,
  // });
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // const anchor = (
    //   (event.target as HTMLDivElement).ownerDocument || document
    // ).querySelector('#back-to-top-anchor');


    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    // <Fade in={trigger}>
    <Box
      onClick={handleClick}
      role="presentation"
      sx={{position: 'fixed', bottom: 32, right: 32}}
    >
      <Fab size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
    // </Fade>
  );
};

export default ScrollTop;