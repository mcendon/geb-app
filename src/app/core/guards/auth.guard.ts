import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { restoreSession } from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  canActivate(): Observable<boolean> {
    return this.store.select('auth').pipe(
      switchMap((auth) => {
        if (!auth.sessionRestored) {
          this.store.dispatch(restoreSession());
          return this.store.select('auth').pipe(
            filter((auth) => auth.sessionRestored),
            take(1)
          );
        }
        return [auth];
      }),
      map((auth) => {
        if (auth.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
