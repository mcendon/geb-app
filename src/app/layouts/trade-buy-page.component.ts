import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AvailableTradesListComponent } from '../components/molecules/available-trades-list.component';
import { GALACTIC_ENERGY_PRICE } from '../core/constants';
import { GalacticCurrencyPipe } from '../core/pipes/currency-pipe.pipe';
import { Planet } from '../core/services/interfaces/planet.interface';

import { AsyncPipe } from '@angular/common';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { EnergyFormatPipe } from '../core/pipes/energy-pipe.pipe';
import { EnergyTrade } from '../core/services/interfaces/energy-trade.interface';
import * as TradeActions from '../store/actions/trade.actions';
import * as PlanetSelectors from '../store/selectors/planet.selectors';
import * as TradeSelectors from '../store/selectors/trade.selectors';

@Component({
  selector: 'geb-trade-buy-page',
  imports: [
    AvailableTradesListComponent,
    GalacticCurrencyPipe,
    AsyncPipe,
    EnergyFormatPipe,
  ],
  template: `
    @if (planet$ | async; as planet) {
    <div class="row">
      <div class="col-md-6">
        <h1 class="p-2">Available trades</h1>
        <geb-available-trades-list
          class="p-2"
          [trades]="availableTrades$ | async"
          (onSelect)="selectTrade($event)"
        ></geb-available-trades-list>
      </div>
      <div class="col-md-6 p-2">
        <h1>Place order</h1>

        @if (!!selectedTrade()) { @if (planet.money >= totalCost()) {
        <p>
          You are buying
          <strong>{{ selectedTrade()?.energy | formatEnergy }}</strong> from
          <strong>{{ selectedTrade()?.planetSellerName }}</strong
          >. <br />
          Total cost: <strong>{{ totalCost() | galacticCurrency }}</strong
          >.
        </p>
        <p>
          <button (click)="buy()" class="btn btn-primary w-100">Buy</button>
        </p>
        } @else {
        <p>You don't have enough money to buy this energy.</p>
        } } @else {
        <p>Select a seller from the left list to buy.</p>
        }
      </div>
    </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeBuyPageComponent {
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();
  readonly planet$: Observable<Planet>;
  readonly availableTrades$!: Observable<EnergyTrade[]>;
  readonly selectedTrade = signal<EnergyTrade>(null);
  readonly totalCost = computed(
    () => this.selectedTrade()?.energy! * GALACTIC_ENERGY_PRICE
  );

  private planet: Planet; //i save a reference to the planet to avoid using the async pipe in the buy method

  constructor() {
    this.planet$ = this.store
      .select(PlanetSelectors.selectPlanet)
      .pipe(tap((planet) => (this.planet = planet)));

    this.availableTrades$ = this.store
      .select(TradeSelectors.selectAvailableTrades)
      .pipe(
        takeUntil(this.destroy$),
        filter((trades) => !!trades),
        tap(() => {
          this.selectedTrade.set(null);
        })
      );
  }

  ngOnInit() {
    console.log('TradeBuyPageComponent initialized');
  }

  ngOnDestroy() {
    console.log('TradeBuyPageComponent destroyed');
    this.destroy$.next();
    this.destroy$.complete();
  }

  buy() {
    if (this.selectedTrade() && !!this.planet) {
      this.store.dispatch(
        TradeActions.buyEnergy({
          planet: this.planet,
          trade: this.selectedTrade(),
        })
      );
    }
  }

  selectTrade(trade: EnergyTrade) {
    this.selectedTrade.set(trade);
  }
}
