import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PlanetService } from '../../core/services/planet-service.service';
import * as PlanetActions from '../actions/planet.actions';

@Injectable()
export class PlanetEffects {
  private readonly actions$ = inject(Actions);
  private readonly planetService = inject(PlanetService);

  fetchPlanet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanetActions.fetchPlanet),
      switchMap(({ planetId }) =>
        this.planetService.getPlanet(planetId).pipe(
          map((planet) => PlanetActions.fetchPlanetSuccess({ planet })),
          catchError((error) =>
            of(PlanetActions.fetchPlanetFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
