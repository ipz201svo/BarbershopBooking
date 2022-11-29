import {TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableFooter, TablePagination, TableHead, Link, Stack, Typography, Skeleton} from '@mui/material';
import React from 'react';
import {useGetBookingsQuery} from '../../behavior/api';
import {PaginatedListQueryResult} from '../../behavior/common';
import {useDocumentTitle, usePaginationParams} from '../common/hooks';
import {FetchErrorBunner} from '../common/utilityComponents';
import PaginationActions from '../common/utilityComponents/paginatedTable/PaginationActions';
import {formatAsDate, formatAsTime} from '../common/utils';

function Bookings() {
  useDocumentTitle('Bookings');
  const {page, size} = usePaginationParams();
  const {isError, isLoading, data, refetch} = useGetBookingsQuery({page, size});

  return (
    <>
      <Typography component="h1" variant="h3" sx={{mb: 2}}>My Bookings</Typography>
      <PaginationTablePage paginatedData={data}>
        {(items, emptyRows) => (
          <>
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
              {!isLoading ?
                items!.map(({barberName, barbershop, startDate, endDate, id, services, status}) => (
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
                      <Typography fontWeight="500">{status}</Typography>
                    </TableCell>
                  </TableRow>
                ))
                : Array.from(Array(10)).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton /></TableCell>
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
                ))
              }
              {isError && !isLoading && (
                <FetchErrorBunner refetch={refetch}>Can not retrieve the Recent Bookings.</FetchErrorBunner>
              )}
              {emptyRows > 0 && (
                <TableRow style={{height: 73 * emptyRows}}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </>
        )}
      </PaginationTablePage>
    </>
  );
};

export default Bookings;

type Props<T> = {
  paginatedData: PaginatedListQueryResult<T> | undefined;
  children: (items: T[] | undefined, emptyRows: number) => React.ReactNode;
};

function PaginationTablePage<T>({paginatedData, children}: Props<T>) {
  const {setPage, size, setSize} = usePaginationParams();
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  let emptyRows = 0;
  if (paginatedData !== undefined)
    emptyRows = paginatedData.pageNumber > 1 ? Math.max(0, paginatedData.pageNumber * size - paginatedData.totalCount) : 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 500}}>
        {children(paginatedData?.items, emptyRows)}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
              colSpan={7}
              count={paginatedData?.totalCount ?? size}
              rowsPerPage={size}
              page={paginatedData?.pageNumber ? paginatedData.pageNumber - 1 : 0}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={PaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};