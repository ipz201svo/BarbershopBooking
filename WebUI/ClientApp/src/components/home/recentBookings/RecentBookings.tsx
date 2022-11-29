import React from 'react';
import {
  Alert,
  Link,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {Booking} from '../../../behavior/bookings';
import {useGetBookingsQuery} from '../../../behavior/api';
import RecentBookingsTable from './RecentBookingsTable';
import {FetchErrorBunner} from '../../common/utilityComponents';


// const rows: Booking[] = [
//   {
//     id: 2,
//     startDate: new Date(),
//     barbershop: {
//       id: 12,
//       name: 'Big hard balls',
//     },
//     services: [
//       {
//         id: 5,
//         name: 'Haircut',
//       },
//       {
//         id: 6,
//         name: 'Shaving',
//       },
//     ],
//     barber: 'John Smith',
//     status: 'Pending',
//   },
//   {
//     id: 1,
//     startDate: new Date(),
//     barbershop: {
//       id: 14,
//       name: 'Man\'s den',
//     },
//     services: [
//       {
//         id: 5,
//         name: 'Haircut',
//       },
//     ],
//     barber: 'John Smith',
//     status: 'Completed',
//   },
// ];

const numberOfBookingsToLoad = 5;

const RecentBookings = () => {
  const {data, error, isLoading, refetch} = useGetBookingsQuery({page: 0, size: numberOfBookingsToLoad});

  return (
    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', overflowX: 'auto'}}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Bookings
      </Typography>
      {error && !isLoading && (
        <FetchErrorBunner refetch={refetch}>Can not retrieve the Recent Bookings.</FetchErrorBunner>
      )}
      {(!error || isLoading) && <RecentBookingsTable
        bookings={data?.items}
        isLoading={isLoading} />}
      <Link color="primary" href="/bookings" sx={{mt: 3}}>
        See more bookings
      </Link>
    </Paper>
  )
};

export default RecentBookings;
