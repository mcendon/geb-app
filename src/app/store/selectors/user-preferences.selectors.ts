import { createSelector } from '@ngrx/store';
import { PreferencesState } from '../reducers/user-preferences.reducer';

export const selectPreferences = (state: { preferences: PreferencesState }) =>
  state.preferences;

export const selectLanguage = createSelector(
  selectPreferences,
  (state: PreferencesState) => state.language
);

export const selectMode = createSelector(
  selectPreferences,
  (state: PreferencesState) => state.mode
);
