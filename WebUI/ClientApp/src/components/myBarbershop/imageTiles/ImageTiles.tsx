import React from 'react';
import {Box, Card, CardMedia, Grid, Typography} from '@mui/material';
import AddImageTile from './AddImageTile';
import {useFormikContext} from 'formik';

const ImageTiles = () => {
  const {values} = useFormikContext<any>();
  return (
    <Box mt={3}>
      <Typography variant='h5' component="h2">Gallery</Typography>
      <Grid container spacing={2} mt={0}>
        {values.images.map((image: string, index: number) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{height: 350}}>
              <CardMedia component="img" image={image} />
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3}>
          <AddImageTile />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageTiles;
