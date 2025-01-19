import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { Session } from '../../core/services/interfaces/session.interface';

export interface AuthState {
  isAuthenticated: boolean;
  session: Session | null;
  sessionRestored: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  session: null,
  sessionRestored: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { session }) => ({
    ...state,
    isAuthenticated: true,
    session,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    session: null,
    sessionRestored: false,
  })),
  on(AuthActions.restoreSessionSuccess, (state, { session }) => ({
    ...state,
    isAuthenticated: true,
    sessionRestored: true,
    session,
  })),
  on(AuthActions.restoreSessionFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    sessionRestored: true,
    error,
  }))
);
