import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { setLanguage, setMode } from '../actions/user-preferences.actions';
@Injectable()
export class PreferencesEffects {
  translate = inject(TranslateService);
  actions$ = inject(Actions);

  setLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setLanguage),
        tap((action) => {
          this.translate.use(action.language);
          localStorage.setItem('language', action.language);
        })
      ),
    { dispatch: false }
  );
  setMode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setMode),
        tap((action) => localStorage.setItem('mode', action.mode))
      ),
    { dispatch: false }
  );
}
