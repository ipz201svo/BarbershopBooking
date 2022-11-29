import {Alert, Grid, IconButton, Link, Paper, Typography} from '@mui/material';
import React from 'react';
import {useGetBarbershopBriefsQuery} from '../../../behavior/api';
import BarbershopCard from './BarbershopCard';
import BarbershopCardSkeleton from './BarbershopCardSkeleton';
import ReplayIcon from '@mui/icons-material/Replay';
import {FetchErrorBunner} from '../../common/utilityComponents';

const barbershops = [
  {
    id: 1,
    name: 'Big hard balls',
    description: 'The best barbershop in town',
  },
  {
    id: 2,
    name: 'Cool barbers',
    description: 'The best barbershop in town',
  },
  {
    id: 3,
    name: 'Hot barbers',
    description: 'The best barbershop in town',
  },
  {
    id: 4,
    name: 'Whiskey enjoyers',
    description: 'The best barbershop in town',
  },
];

function RecentBarbershops() {
  const {data, error, isLoading, refetch} = useGetBarbershopBriefsQuery({page: 0, size: 4});

  return (
    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', overflowX: 'auto'}}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Barbershops visited
      </Typography>
      <Grid container alignItems="center" spacing={2}>
        {isLoading && Array.from(Array(4)).map((_, index) => (
          <Grid item key={index} sm={12} md={6} lg={3}>
            <BarbershopCardSkeleton />
          </Grid>
        ))}
        {error && !isLoading && (
          <Grid item sm={12}>
            <FetchErrorBunner refetch={refetch}>Can not retrieve the Recent Barbershops visited.</FetchErrorBunner>
          </Grid>
        )}
        {data?.items.map((barbershop) => (
          <Grid item key={barbershop.id} sm={12} md={6} lg={3}>
            <BarbershopCard
              {...barbershop}
            />
          </Grid>
        ))}
      </Grid>
      <Link color="primary" href="/barbershops" sx={{mt: 3}}>
        See more barbershops
      </Link>
    </Paper>
  );
};

export default RecentBarbershops;
