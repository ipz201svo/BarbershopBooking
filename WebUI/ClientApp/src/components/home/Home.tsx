import React from 'react';
import {Grid} from '@mui/material';
import {useDocumentTitle} from '../common/hooks';
import RecentBookings from './recentBookings';
import RecentBarbershops from './recentBarbershops';

const Home = () => {
  useDocumentTitle('Home');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <RecentBookings />
      </Grid>
      <Grid item xs={12}>
        <RecentBarbershops />
      </Grid>
    </Grid>
  )
};

export default Home;
