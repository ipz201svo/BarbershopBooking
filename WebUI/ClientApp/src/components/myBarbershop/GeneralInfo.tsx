import React from 'react';
import {Box, Typography, Grid} from '@mui/material';
import {TextInputBase} from '../common/base/forms';

const GeneralInfo = () => {
  return (
    <Box>
      <Typography variant='h5' component="h2">General Information</Typography>
      <Grid container spacing={2} mt={0}>
        <Grid item xs={12}>
          <TextInputBase
            name='name'
            label="Barbershop name"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextInputBase
            name='description'
            label="Description"
            fullWidth
            multiline
            minRows={5}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralInfo;
