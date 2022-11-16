import {PaginatedListQueryResult} from "../common";

type CommandResult<T> = {
  data?: T;
  errors?: string[];
  succeeded: boolean;
};

export type QueryListRequest = {
  page: number;
  size: number;
  sort?: string;
  filter?: string;
};

export type CustomerSignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

export type SignInData = {
  email: string;
  password: string;
};

export type AuthToken = {
  token: string;
  refreshToken: string;
}

export type AuthResponse = CommandResult<AuthToken>;

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

export type BookingListResponse = PaginatedListQueryResult<Booking>;

export type BarbershopBrief = {
  id: number;
  name: string;
  description: string;
};

export type BarbershopBriefListResponse = PaginatedListQueryResult<BarbershopBrief>;