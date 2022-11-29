import React from 'react';
import {Card, CardActionArea, CardContent, Typography, Skeleton} from '@mui/material';

const BarbershopCardSkeleton = () => {
  return (
    <Card variant="outlined">
      <CardActionArea >
        <Skeleton sx={{height: 140}} variant="rectangular" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Skeleton />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Skeleton />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BarbershopCardSkeleton;
