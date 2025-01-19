import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TradeService } from '../../core/services/trade-service.service';
import * as TradeActions from '../actions/trade.actions';
import * as PlanetActions from '../actions/planet.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TradeEffects {
  private readonly actions$ = inject(Actions);
  private readonly tradeService = inject(TradeService);

  getAvailableTrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradeActions.getAvailableTrades),
      mergeMap(({ planetId }) =>
        this.tradeService.getAvailableTrades(planetId).pipe(
          map((trades) => TradeActions.getAvailableTradesSuccess({ trades })),
          catchError((error) =>
            of(TradeActions.getAvailableTradesFailure({ error }))
          )
        )
      )
    )
  );

  getPlanetHistoricTrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradeActions.getPlanetHistoricTrades),
      mergeMap((action) =>
        this.tradeService.getTradesByPlanet(action.planetId).pipe(
          map((trades) =>
            TradeActions.getPlanetHistoricTradesSuccess({ trades })
          ),
          catchError((error) =>
            of(TradeActions.getPlanetHistoricTradesFailure({ error }))
          )
        )
      )
    )
  );

  buyEnergy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradeActions.buyEnergy)
      //   mergeMap((action) => {
      //     // This is a mock implementation of the buyEnergy method
      //     return this.tradeService.buyEnergy(action.energyAmount).pipe(
      //       mergeMap((response) => [
      //         TradeActions.buyEnergySuccess({ response }),
      //         PlanetActions.removePlanetCredits({ credits: action.energyAmount })
      //       ]),
      //       catchError((error) =>
      //         of(TradeActions.buyEnergyFailure({ error }))
      //       )
      //     );
      //   })
    )
  );
}
