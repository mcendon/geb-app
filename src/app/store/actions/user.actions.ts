import { createAction, props } from '@ngrx/store';
import { User } from '../../core/services/interfaces/user.interface';

const FETCH_USER = '[User] Fetch User';
const FETCH_USER_SUCCESS = '[User] Fetch User Success';
const FETCH_USER_FAILURE = '[User] Fetch User Failure';

export const fetchUser = createAction(FETCH_USER, props<{ userId: number }>());

export const fetchUserSuccess = createAction(
  FETCH_USER_SUCCESS,
  props<{ user: User }>()
);

export const fetchUserFailure = createAction(
  FETCH_USER_FAILURE,
  props<{ error: any }>()
);
