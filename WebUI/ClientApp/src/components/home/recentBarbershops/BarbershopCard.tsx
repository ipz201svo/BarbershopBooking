import React from 'react';
import {Card, CardActionArea, CardMedia, CardContent, Typography, Box, Rating} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {LinkBase} from '../../common/base/navigation';

type Props = {
  id: number;
  name: string;
  address: string;
  image: string;
  rating: number;
  reviewsCount: number;
};

const BarbershopCard = ({id, name, address, image, rating, reviewsCount}: Props) => {
  return (
    <Card variant="outlined">
      <CardActionArea LinkComponent={LinkBase} href={`/barbershops/${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
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
      </CardActionArea>
    </Card>
  );
};

export default BarbershopCard;
