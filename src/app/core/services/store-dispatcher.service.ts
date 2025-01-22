import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, take, tap } from 'rxjs';
import * as PlanetActions from '../../store/actions/planet.actions';
import * as TradeActions from '../../store/actions/trade.actions';
import { UserState } from '../../store/reducers/user.reducer';

@Injectable({ providedIn: 'root' })
export class StoreDispatcherService {
  private store = inject(Store);

  dispatchAppInitActions(): Observable<any> {
    return this.store.select('user').pipe(
      filter((userState: UserState) => !!userState.user),
      take(1), //only take once to avoid multiple subscriptions
      tap((userState: UserState) => {
        if (!!userState?.user?.planetId) {
          this.store.dispatch(
            PlanetActions.fetchPlanet({ planetId: userState?.user?.planetId })
          );
          this.store.dispatch(
            PlanetActions.fetchPlanetSales({
              planetId: userState?.user?.planetId,
            })
          );
          this.store.dispatch(
            PlanetActions.fetchPlanetPurchases({
              planetId: userState?.user?.planetId,
            })
          );
          this.store.dispatch(
            TradeActions.fetchTrades({ planetId: userState?.user?.planetId })
          );
        }
      })
    );
  }
}
