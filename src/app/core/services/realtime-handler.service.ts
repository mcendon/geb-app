import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { Planet } from '../../core/services/interfaces/planet.interface';
import * as PlanetActions from '../../store/actions/planet.actions';
import * as TradeActions from '../../store/actions/trade.actions';
import * as PlanetSelectors from '../../store/selectors/planet.selectors';
import { RealtimeDatabaseSimulatorService } from './realtime-database-simulator.service';

@Injectable({ providedIn: 'root' })
export class RealtimeHandlerService {
  private readonly store = inject(Store);
  private readonly realtimeDatabase = inject(RealtimeDatabaseSimulatorService);
  private readonly destroy$ = new Subject<void>();
  private started = false;

  start() {
    if (this.started) {
      return; //avoid multiple calls
    }
    this.store
      .select(PlanetSelectors.selectPlanet)
      .pipe(
        takeUntil(this.destroy$),
        filter((planet: Planet) => !!planet),
        take(1), //only take once to avoid multiple subscriptions
        switchMap((planet: Planet) => {
          return this.realtimeDatabase.pullIncomingTrades().pipe(
            takeUntil(this.destroy$),
            tap((trade) => {
              this.store.dispatch(TradeActions.pushNewTrade({ trade }));
              if (trade.status === 'open') {
                if (trade.planetSellerId !== planet?.id) {
                  //new available trade
                }
              } else if (trade.status === 'completed') {
                if (trade.planetBuyerId === planet?.id) {
                  this.store.dispatch(
                    PlanetActions.pushPurchaseRealTime({ trade })
                  );
                } else if (trade.planetSellerId === planet?.id) {
                  this.store.dispatch(
                    PlanetActions.pushSaleRealTime({ trade })
                  );
                }
              }
            })
          );
        })
      )
      .subscribe();
  }

  stop() {
    this.destroy$.next();
    this.destroy$.complete();
    this.started = false;
  }
}
