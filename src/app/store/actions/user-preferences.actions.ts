import { createAction, props } from '@ngrx/store';

const SET_LANGUAGE = '[Preferences] Set Language';
const SET_MODE = '[Preferences] Set Mode';

export const setLanguage = createAction(
  SET_LANGUAGE,
  props<{ language: string }>()
);

export const setMode = createAction(SET_MODE, props<{ mode: string }>());
