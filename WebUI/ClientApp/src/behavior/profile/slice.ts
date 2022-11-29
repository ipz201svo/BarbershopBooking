import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../types';
import {getAuth} from '../auth/utils';

type ProfileState = {
  isAuthorized: boolean;
  token: string | null;
};

const initialState: ProfileState = {
  isAuthorized: false,
  token: getAuth(),
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    authorize: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: action.payload,
        isAuthorized: true,
      };
    },
    signout: (state) => {
      return {
        ...state,
        token: null,
        isAuthorized: false,
      };
    }
  },
});

export const {
  authorize,
  signout,
} = profileSlice.actions;

export default profileSlice.reducer;