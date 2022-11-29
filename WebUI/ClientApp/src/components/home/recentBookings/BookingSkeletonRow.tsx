import {TableRow, TableCell, Skeleton, Typography} from '@mui/material';
import React from 'react';

const BookingSkeletonRow = () => {
  return (
    <TableRow>
      <TableCell><Skeleton /></TableCell>
      <TableCell><Skeleton /></TableCell>
      <TableCell><Skeleton /></TableCell>
      <TableCell>
        <Skeleton />
        <Skeleton />
      </TableCell>
      <TableCell><Skeleton /></TableCell>
      <TableCell align="right">
        <Typography fontWeight="500"><Skeleton /></Typography>
      </TableCell>
    </TableRow>
  );
};

export default BookingSkeletonRow;
