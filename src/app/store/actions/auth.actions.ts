import { createAction, props } from '@ngrx/store';
import { Session } from '../../core/services/interfaces/session.interface';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ session: Session }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const restoreSession = createAction('[Auth] Restore Session');

export const restoreSessionSuccess = createAction(
  '[Auth] Restore Session Success',
  props<{ session: Session }>()
);

export const restoreSessionFailure = createAction(
  '[Auth] Restore Session Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
