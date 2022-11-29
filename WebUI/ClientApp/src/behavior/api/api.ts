import {BaseQueryApi} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {FetchArgs, FetchBaseQueryArgs, FetchBaseQueryError, FetchBaseQueryMeta} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import {BaseQueryFn, createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import {getAuth} from '../auth/utils';
import {BarbershopBriefList} from '../barbershops';
import {BookingList} from '../bookings';
import {signout} from '../profile';
import {CustomerSignUpData, SignInData, AuthResponse, QueryListRequest} from './types';

const fetchQuery = ({
  baseUrl,
  prepareHeaders,
  fetchFn,
  paramsSerializer,
  ...baseFetchOptions
}: FetchBaseQueryArgs): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> => retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const query = (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => fetchBaseQuery({
      baseUrl,
      prepareHeaders,
      fetchFn,
      paramsSerializer,
      ...baseFetchOptions
    })(
      args,
      api,
      extraOptions
    );

    let result = await query(args, api, extraOptions);

    if (result.error?.status === 401) {
      const refreshResult = await query('/profile/refresh-token', api, extraOptions)
      if (refreshResult.data) {
        // api.dispatch(tokenReceived(refreshResult.data))
        result = await query(args, api, extraOptions)
      } else {
        api.dispatch(signout())
      }

      retry.fail(result.error);
    }

    return result;
  }
);

const api = createApi({
  baseQuery: fetchQuery({
    // baseUrl: 'https://4564a075-c24a-4a1f-983f-320de4017367.mock.pstmn.io/api',
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = getAuth();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    signUp: build.mutation<AuthResponse, CustomerSignUpData>({
      query: (data) => ({
        url: '/profile/signup',
        method: 'POST',
        body: data,
      }),
    }),

    signIn: build.mutation<AuthResponse, SignInData>({
      query: (data) => ({
        url: '/profile/signin',
        method: 'POST',
        body: data,
      }),
    }),

    getBookings: build.query<BookingList, QueryListRequest>({
      query: (data) => ({
        url: '/bookings',
        method: 'GET',
        params: {
          ...data
        },
      }),
    }),

    getBarbershopBriefs: build.query<BarbershopBriefList, QueryListRequest>({
      query: (data) => ({
        url: '/barbershops',
        method: 'GET',
        params: {
          ...data
        },
      }),
    }),
  }),
});

export default api;

export const {
  useSignUpMutation,
  useGetBookingsQuery,
  useGetBarbershopBriefsQuery,
} = api;