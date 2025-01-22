import { createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUser = (state: { user: UserState }) => state.user;

export const selectName = createSelector(
  selectUser,
  (state: UserState) => state.user?.name
);
