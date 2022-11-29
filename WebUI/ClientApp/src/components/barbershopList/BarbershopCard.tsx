import React from 'react';
import {Card, Grid, CardMedia, CardContent, Typography, CardActionArea, Rating, Box} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {LinkBase} from '../common/base/navigation';

const BarbershopCard = ({barbershop}: any) => {
  const {id, name, address, image, rating, reviewsCount} = barbershop;
  return (
    <Card sx={{display: 'flex'}}>
      <CardActionArea LinkComponent={LinkBase} href={`/barbershops/${id}`}>
        <Grid container>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              image={image}
              loading='lazy'
              alt={`${name} image`} />
          </Grid>
          <Grid item xs={8}>
            <CardContent sx={{flex: '1 0 auto'}}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>
              <Box sx={{display: 'flex'}}>
                <Rating
                  value={rating}
                  precision={0.2}
                  size="small"
                  readOnly
                />
                <Typography variant='caption' component="div" sx={{ml: 1}}>{reviewsCount} reviews</Typography>
              </Box>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                <LocationOnIcon /> {address}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default BarbershopCard;
