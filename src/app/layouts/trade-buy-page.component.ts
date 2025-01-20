import { Component, computed, inject, signal } from '@angular/core';
import { AvailableTradesListComponent } from '../components/molecules/available-trades-list.component';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { PlanetState } from '../store/reducers/planet.reducer';
import { TradeService } from '../core/services/trade-service.service';
import { GalacticCurrencyPipe } from '../core/pipes/currency-pipe.pipe';
import { buyEnergy } from '../store/actions/trade.actions';
import { Planet } from '../core/services/interfaces/planet.interface';
import { GALACTIC_ENERGY_PRICE } from '../core/constants';

@Component({
  selector: 'geb-trade-buy-page',
  imports: [AvailableTradesListComponent, GalacticCurrencyPipe],
  template: `
    <!-- <div class="row">
      <div class="col-md-6">
        <h1>Available trades</h1>
        <geb-available-trades-list
          [trades]="availableTrades()"
          (onSelect)="selectTrade($event)"
        ></geb-available-trades-list>
      </div>
      <div class="col-md-6">
        <h1>Place order</h1>
        @if( planet()!.money > 0 ) {
        <p>
          You have
          <strong>{{ planet()!.money | galacticCurrency }}</strong> available.
          Global energy price is {{ energyPrice() | galacticCurrency }}.
        </p>
        } @else {
        <p>You don't have any credits to buy energy.</p>
        } @if (!!selectedTrade()) {
        <p>
          You are buying
          <strong>{{ selectedTrade()?.energyQty }}</strong> energy units from
          <strong>{{ selectedTrade()?.sellerName }}</strong
          >. <br />
          Total cost: <strong>{{ totalCost() | galacticCurrency }}</strong
          >.
        </p>
        <p>
          <button (click)="buy()" class="btn btn-primary w-100">Buy</button>
        </p>
        } @else {
        <p>Select a seller from the left list to buy.</p>
        }
      </div>
    </div> -->
  `,
  styles: ``,
})
export class TradeBuyPageComponent {
  // private readonly store = inject(Store);
  // private readonly tradeService = inject(TradeService);
  // private readonly destroy$ = new Subject<void>();
  // planet = signal<Planet | null>(null);
  // energyPrice = signal(0);
  // totalCost = computed(
  //   () => this.selectedTrade()?.energyQty! * this.energyPrice()
  // );
  // ngOnInit() {
  //   this.store
  //     .select('planet')
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       filter(({ planet }) => !!planet),
  //       tap(({ planet }: PlanetState) => {
  //         this.planet.set(planet);
  //         this.store.dispatch(getAvailableTrades({ planetId: planet?.id! }));
  //       })
  //     )
  //     .subscribe();
  //   this.store
  //     .select('trades')
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       filter(({ availableTrades }) => !!availableTrades),
  //       tap(({ availableTrades }) => {
  //         this.availableTrades.set(availableTrades);
  //         this.selectedTrade.set(availableTrades[0]);
  //       })
  //     )
  //     .subscribe();
  //   this.energyPrice.set(GALACTIC_ENERGY_PRICE); // I assume energy price is constant for all planets
  // }
  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
  // selectTrade(trade: Trade) {
  //   this.selectedTrade.set(trade);
  // }
  // buy() {
  //   // dispatch buy action
  //   if (this.planet() != null) {
  //     const planet: Planet = this.planet()!;
  //     this.store.dispatch(
  //       buyEnergy({ buyer: planet, trade: this.selectedTrade()! })
  //     );
  //   }
  // }
}
