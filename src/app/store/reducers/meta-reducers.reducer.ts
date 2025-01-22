import { Action, ActionReducer, State } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';

export function clearStateMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function clearStateFn(state: State<any>, action: Action<any>) {
    if (action.type === AuthActions.AUTH_LOGOUT_SUCCESS) {
      state = {} as State<any>;
    }
    return reducer(state, action);
  };
}

export function actionLoggerMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function actionLoggerFn(state: State<any>, action: Action<any>) {
    console.log('Action:', action);
    return reducer(state, action);
  };
}
