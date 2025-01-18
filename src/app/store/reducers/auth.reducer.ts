import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { Session } from '../../core/services/interfaces/session.interface';

const persistedSession = localStorage.getItem('_session');

export interface AuthState {
  isAuthenticated: boolean;
  session: Session | null;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: !!persistedSession,
  session: !!persistedSession ? JSON.parse(persistedSession as string) : null,
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
  }))
);
