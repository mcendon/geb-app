import { createReducer, on } from '@ngrx/store';
import { setLanguage, setMode } from '../actions/user-preferences.actions';

export interface PreferencesState {
  language: string;
  mode: string;
}

export const initialState: PreferencesState = {
  language: localStorage.getItem('language') || 'en',
  mode: localStorage.getItem('mode') || 'light',
};

export const preferencesReducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }) => ({ ...state, language })),
  on(setMode, (state, { mode }) => ({ ...state, mode }))
);
