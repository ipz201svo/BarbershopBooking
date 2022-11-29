import {Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, FormControl, InputLabel, MenuItem, Select, Grid, Card, CardContent, CardMedia, Typography, Pagination, PaginationItem} from '@mui/material';
import React, {useRef} from 'react';
import {useGetBarbershopBriefsQuery} from '../../behavior/api';
import {LinkBase} from '../common/base/navigation';
import {useDocumentTitle, usePaginationParams} from '../common/hooks';
import {ScrollTop} from '../common/utilityComponents';
import {drawerWidth} from '../layout/constants';
import BarbershopCard from './BarbershopCard';

const barbershops = [
  {
    id: 1,
    name: 'Barbershop 1',
    address: '18 Wall Street, New York, NY 10005',
    image: 'https://source.unsplash.com/random/300x300/?barbershop',
  },
  {
    id: 2,
    name: 'Barbershop 2',
    address: '18 Wall Street, New York, NY 10005',
    image: 'https://source.unsplash.com/random/300x300/?barbershop',
  },
  {
    id: 3,
    name: 'Barbershop 3',
    address: '18 Wall Street, New York, NY 10005',
    image: 'https://source.unsplash.com/random/300x300/?barbershop',
  },
  {
    id: 4,
    name: 'Barbershop 4',
    address: '18 Wall Street, New York, NY 10005',
    image: 'https://source.unsplash.com/random/300x300/?barbershop',
  },
];

const Barbershops = () => {
  useDocumentTitle('Barbershops');
  const {page, size} = usePaginationParams();
  const {isLoading, isError, data, isSuccess} = useGetBarbershopBriefsQuery({page, size});
  const topBar = useRef(null);

  const [sorting, setSorting] = React.useState('Newest');
  return (
    <>
      <Typography component="h1" variant="h3" ref={topBar}>Barbershops</Typography>
      <Toolbar sx={{justifyContent: 'flex-end', mb: 1}}>
        <FormControl sx={{width: 120}}>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sorting}
            label="Age"
            onChange={(e) => setSorting(e.target.value)}
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
      <Box sx={{mb: 1}}>
        <Grid container spacing={2}>
          {data?.items.map(barbershop =>
            <Grid item xs={12} md={6} key={barbershop.id}>
              <BarbershopCard barbershop={barbershop} />
            </Grid>
          )}
        </Grid>
      </Box>
      {isSuccess && (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Pagination
            count={data.totalPages}
            renderItem={item => (
              <PaginationItem
                component={LinkBase}
                href={`/barbershops${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Box>
      )}
      <ScrollTop anchor={topBar.current} />

    </>
  );
};

export default Barbershops;
