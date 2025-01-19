import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/services/interfaces/user.interface';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.fetchUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.fetchUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(UserActions.fetchUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
