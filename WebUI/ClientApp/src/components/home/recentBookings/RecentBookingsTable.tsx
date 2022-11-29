import {Table, TableHead, Link, TableRow, TableCell, TableBody, Skeleton, Typography, Stack} from '@mui/material';
import React from 'react';
import {Booking} from '../../../behavior/bookings';
import {formatAsDate, formatAsTime} from '../../common/utils';
import BookingSkeletonRow from './BookingSkeletonRow';

type Props = {
  bookings: Booking[] | undefined;
  isLoading: boolean;
}

const RecentBookingsTable = ({bookings, isLoading}: Props) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Start time</TableCell>
          <TableCell>End time</TableCell>
          <TableCell>Barbershop</TableCell>
          <TableCell>Services</TableCell>
          <TableCell>Barber</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading && Array.from(Array(5)).map((_, index) => (
          <BookingSkeletonRow key={index} />
        ))}
        {bookings?.map(({barberName, barbershop, startDate, endDate, id, services, status}) => {
          let statusColor = 'inherit';
          switch (status) {
            case 'Completed':
              statusColor = 'green';
              break;
            case 'Pending':
              statusColor = 'orange';
              break;
            case 'Cancelled':
              statusColor = 'red';
              break;
            default:
          }
          return (
            <TableRow key={id}>
              <TableCell>{formatAsDate(startDate)}</TableCell>
              <TableCell>{formatAsTime(startDate)}</TableCell>
              <TableCell>{formatAsTime(endDate)}</TableCell>
              <TableCell>
                <Link href={`/barbershops/${barbershop.id}`}>{barbershop.name}</Link>
              </TableCell>
              <TableCell>
                <Stack>
                  {services.map(service => <div key={service.id}>{service.name}</div>)}
                </Stack>
              </TableCell>
              <TableCell>{barberName}</TableCell>
              <TableCell align="right">
                <Typography fontWeight="500" color={statusColor}>{status}</Typography>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
};

export default RecentBookingsTable;
