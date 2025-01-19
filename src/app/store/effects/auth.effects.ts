import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth-service.service';
import * as AuthActions from '../actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((loginResponse) => {
            if (loginResponse.error) {
              return AuthActions.loginFailure({ error: 'Invalid credentials' });
            } else {
              return AuthActions.loginSuccess({
                session: loginResponse.session,
              });
            }
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          localStorage.setItem('_session', JSON.stringify(action.session)); // not secure, should be stored as signed JWT in HTTP-Only cookies
          this.router.navigate(['private/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          //Call "logout" service here....
          localStorage.removeItem('_session');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  restoreSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreSession),
      switchMap(() => {
        const session = localStorage.getItem('_session');
        if (session) {
          try {
            const parsedSession = JSON.parse(session);
            return of(
              AuthActions.restoreSessionSuccess({ session: parsedSession })
            );
          } catch (error) {
            return of(
              AuthActions.restoreSessionFailure({
                error: 'Failed to parse session',
              })
            );
          }
        } else {
          return of(
            AuthActions.restoreSessionFailure({ error: 'No session found' })
          );
        }
      })
    )
  );
}
