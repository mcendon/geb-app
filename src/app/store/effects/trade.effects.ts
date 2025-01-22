import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GALACTIC_ENERGY_PRICE } from '../../core/constants';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import { TradeService } from '../../core/services/trade-service.service';
import * as PlanetActions from '../actions/planet.actions';
import * as TradeActions from '../actions/trade.actions';

@Injectable()
export class TradeEffects {
  private readonly actions$ = inject(Actions);
  private readonly tradeService = inject(TradeService);
  private readonly store = inject(Store);

  fetchTrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradeActions.fetchTrades),
      mergeMap(({ planetId }) =>
        this.tradeService.getAllTrades().pipe(
          map((trades: EnergyTrade[]) =>
            TradeActions.fetchTradesSuccess({ trades, planetId })
          ),
          catchError((error) => of(TradeActions.fetchTradesFailure({ error })))
        )
      )
    )
  );

  //Buy Energy
  buyEnergy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TradeActions.buyEnergy),
      mergeMap(({ planet, trade }) => {
        try {
          if (planet.money < trade.energy * GALACTIC_ENERGY_PRICE) {
            //simulate not enough money
            throw new Error('Not enough money to buy energy');
          }
          // Here we would call the service to buy energy
          return of(TradeActions.buyEnergySuccess({ trade }));
        } catch (e: any) {
          return of(TradeActions.buyEnergyFailure({ error: e.message }));
        }
      })
    )
  );

  buyEnergySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TradeActions.buyEnergySuccess),
        map(({ trade }) => {
          this.store.dispatch(PlanetActions.addNewPurchase({ trade }));
        })
      ),
    { dispatch: false }
  );
}
