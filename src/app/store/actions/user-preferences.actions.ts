import { createAction, props } from '@ngrx/store';
export const setLanguage = createAction(
  '[Preferences] Set Language',
  props<{ language: string }>()
);
export const setMode = createAction(
  '[Preferences] Set Mode',
  props<{ mode: string }>()
);
