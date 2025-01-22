import { createAction, props } from '@ngrx/store';
import { Session } from '../../core/services/interfaces/session.interface';

export const AUTH_LOGIN = '[Auth] Login';
export const AUTH_LOGIN_SUCCESS = '[Auth] Login Success';
export const AUTH_LOGIN_FAILURE = '[Auth] Login Failure';
export const AUTH_RESTORE_SESSION = '[Auth] Restore Session';
export const AUTH_RESTORE_SESSION_SUCCESS = '[Auth] Restore Session Success';
export const AUTH_RESTORE_SESSION_FAILURE = '[Auth] Restore Session Failure';
export const AUTH_LOGOUT = '[Auth] Logout';
export const AUTH_LOGOUT_SUCCESS = '[Auth] Logout Success';
export const AUTH_LOGOUT_FAILURE = '[Auth] Logout Failure';

export const login = createAction(
  AUTH_LOGIN,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  AUTH_LOGIN_SUCCESS,
  props<{ session: Session }>()
);

export const loginFailure = createAction(
  AUTH_LOGIN_FAILURE,
  props<{ error: string }>()
);

export const restoreSession = createAction(AUTH_RESTORE_SESSION);

export const restoreSessionSuccess = createAction(
  AUTH_RESTORE_SESSION_SUCCESS,
  props<{ session: Session }>()
);

export const restoreSessionFailure = createAction(
  AUTH_RESTORE_SESSION_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(AUTH_LOGOUT);
export const logoutSuccess = createAction(AUTH_LOGOUT_SUCCESS);
export const logoutFailure = createAction(
  AUTH_LOGOUT_FAILURE,
  props<{ error: string }>()
);
