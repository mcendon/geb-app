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

  fetchPlanetSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanetActions.fetchPlanetSales),
      switchMap(({ planetId }) =>
        this.planetService.getPlanetSales(planetId).pipe(
          map((sales) => PlanetActions.fetchPlanetSalesSuccess({ sales })),
          catchError((error) =>
            of(PlanetActions.fetchPlanetSalesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  fetchPlanetPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanetActions.fetchPlanetPurchases),
      switchMap(({ planetId }) =>
        this.planetService.getPlanetPurchases(planetId).pipe(
          map((purchases) =>
            PlanetActions.fetchPlanetPurchasesSuccess({ purchases })
          ),
          catchError((error) =>
            of(
              PlanetActions.fetchPlanetPurchasesFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
