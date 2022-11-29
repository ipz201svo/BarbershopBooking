import {Box, Button, CssBaseline, Grid, Typography} from "@mui/material";
import React from "react";

const Landing = () => {
  return (
    <>
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
            // color="inherit"
            gutterBottom
          >
            The first barbershop booking app ever
          </Typography>
          <Box textAlign="center">
            <Button href="/signup" variant="outlined" sx={{my: 1, mx: 1.5}}>
              Sign up
            </Button>
          </Box>
        </Grid>

      </Grid>
    </>
  );
};

export default Landing;