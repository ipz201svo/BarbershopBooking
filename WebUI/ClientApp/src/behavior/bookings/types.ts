import {PaginatedListQueryResult} from "../common";

export type Booking = {
  id: number,
  startDate: string,
  endDate: string,
  barbershop: {
    id: number,
    name: string,
  },
  services:
  {
    id: number,
    name: string,
  }[],
  barberName: string,
  status: 'Completed' | 'Cancelled' | 'Pending',
};

export type BookingList = PaginatedListQueryResult<Booking>;