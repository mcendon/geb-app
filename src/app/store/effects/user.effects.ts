import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../core/services/user-service.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUser),
      switchMap(({ userId }) =>
        this.userService.getUser(userId).pipe(
          map((user) => UserActions.fetchUserSuccess({ user })),
          catchError((error) =>
            of(UserActions.fetchUserFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
