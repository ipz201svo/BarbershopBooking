import React from 'react';
import {CssBaseline, Grid, Typography} from "@mui/material";

const NotFound = () => {
  return (
    <div>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{minHeight: '100vh'}}
      >
        <Grid item xs={3}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
          >
            404
          </Typography>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            gutterBottom
          >
            Lost in Hollywood
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
};

export default NotFound
