import React from 'react';
import {Box, Typography, Grid} from '@mui/material';
import {TextInputBase} from '../common/base/forms';

const Address = () => {
  return (
    <Box mt={3}>
      <Typography variant='h5' component="h2">Address</Typography>
      <Grid container spacing={2} mt={0}>
        <Grid item xs={12} md={3}>
          <TextInputBase
            name="street"
            label="Street"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInputBase
            name="city"
            label="City"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInputBase
            name="state"
            label="State"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextInputBase
            name="postCode"
            label="Post code"
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Address;
