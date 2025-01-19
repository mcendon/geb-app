import { createAction, props } from '@ngrx/store';
import { User } from '../../core/services/interfaces/user.interface';

export const fetchUser = createAction(
  '[User] Fetch User',
  props<{ userId: number }>()
);

export const fetchUserSuccess = createAction(
  '[User] Fetch User Success',
  props<{ user: User }>()
);

export const fetchUserFailure = createAction(
  '[User] Fetch User Failure',
  props<{ error: any }>()
);
