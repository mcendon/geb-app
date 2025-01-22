import { Component, computed, effect, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { TradeTableComponent } from '../components/molecules/trade-table.component';
import { GALACTIC_ENERGY_PRICE } from '../core/constants';
import { LoadingDirective } from '../core/directives/loading.directive';
import { GalacticCurrencyPipe } from '../core/pipes/currency-pipe.pipe';
import { EnergyFormatPipe } from '../core/pipes/energy-pipe.pipe';
import { EnergyTrade } from '../core/services/interfaces/energy-trade.interface';
import { Planet } from '../core/services/interfaces/planet.interface';
import * as PlanetSelectors from '../store/selectors/planet.selectors';
import * as TradeSelectors from '../store/selectors/trade.selectors';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'geb-dashboard-page',
  imports: [
    TradeTableComponent,
    GalacticCurrencyPipe,
    EnergyFormatPipe,
    LoadingDirective,
    TranslatePipe,
  ],
  template: `
    <div class="d-flex flex-column p-3">
      <h1>
        {{ 'DASHBOARD.TITLE' | translate : { planet: planetName() } }}
      </h1>
      <div class="row">
        <div class="col-md-8 p-2 col-12">
          <div class="mb-3">
            <h2 class="title">{{ 'DASHBOARD.GLOBAL_TRADES' | translate }}</h2>
            <geb-trade-table
              [appLoading]="loadingTrades()"
              [trades]="allTrades()"
            ></geb-trade-table>
          </div>
          <div class="mb-3">
            <h2 class="title">
              {{ 'DASHBOARD.PLANET_OPEN_SALES' | translate }}
            </h2>
            <geb-trade-table
              [appLoading]="loadingSales()"
              [showBuyer]="false"
              [trades]="openTrades()"
            ></geb-trade-table>
          </div>
          <div class="mb-3">
            <h2 class="title">
              {{ 'DASHBOARD.PLANET_CLOSED_SALES' | translate }}
            </h2>
            <geb-trade-table
              [appLoading]="loadingSales()"
              [showSeller]="false"
              [trades]="closedSales()"
            ></geb-trade-table>
          </div>
          <div class="mb-3">
            <h2 class="title">
              {{ 'DASHBOARD.PLANET_OPEN_PURCHASES' | translate }}
            </h2>
            <geb-trade-table
              [appLoading]="loadingPurchases()"
              [trades]="closedPurchases()"
            ></geb-trade-table>
          </div>
        </div>
        <div class="col-md-4">
          <div class="row p-2">
            <div
              class="col-md-12 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">{{ 'DASHBOARD.PLANET_ENERGY' | translate }}</h2>
              <span class="text-md">
                {{ planetEnergy() | formatEnergy }}
              </span>
            </div>
          </div>
          <div class="row p-2">
            <div
              class="col-md-12 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">{{ 'DASHBOARD.PLANET_MONEY' | translate }}</h2>
              <span class="text-md">{{
                planetMoney() | galacticCurrency
              }}</span>
            </div>
          </div>
          <div class="row p-2">
            <div
              class="col-md-12 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">{{ 'DASHBOARD.ENERGY_PRICE' | translate }}</h2>
              <span class="text-md">
                {{ energyPrice | galacticCurrency }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
  .text-lg {
    font-size: 3rem;
  }
  .text-md {
    font-size: 2rem;
  }
  .title {
    font-size: 1rem;
  }
  `,
})
export class DashboardPageComponent {
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();

  energyPrice = GALACTIC_ENERGY_PRICE;

  // RxJS Signals
  allTrades: Signal<EnergyTrade[]>;
  planet: Signal<Planet>;
  planetEnergy!: Signal<number>;
  planetMoney!: Signal<number>;
  planetName!: Signal<string>;

  planetPurchases: Signal<EnergyTrade[]>;
  planetSales: Signal<EnergyTrade[]>;

  loadingTrades: Signal<boolean>;
  loadingSales: Signal<boolean>;
  loadingPurchases: Signal<boolean>;

  // Filtered trades
  openTrades = computed(() => {
    return this.planetSales()?.filter((trade) => trade.status === 'new');
  });

  closedSales = computed(() => {
    return this.planetSales()?.filter((trade) => trade.status === 'completed');
  });

  closedPurchases = computed(() => {
    return this.planetPurchases()?.filter(
      (trade) => trade.status === 'completed'
    );
  });

  constructor() {
    // effect(() => console.log(this.planetSales()));
  }

  ngOnInit() {
    //All trades
    this.allTrades = this.store.selectSignal(TradeSelectors.selectTrades);

    // Planet specific data
    this.planet = this.store.selectSignal(PlanetSelectors.selectName);
    this.planetEnergy = this.store.selectSignal(PlanetSelectors.selectEnergy);
    this.planetMoney = this.store.selectSignal(PlanetSelectors.selectMoney);
    this.planetName = this.store.selectSignal(PlanetSelectors.selectName);

    this.planetPurchases = this.store.selectSignal(
      PlanetSelectors.selectPurchases
    );

    this.planetSales = this.store.selectSignal(PlanetSelectors.selectSales);

    this.loadingTrades = this.store.selectSignal(
      TradeSelectors.selectTradeLoading
    ); //global trades
    this.loadingSales = this.store.selectSignal(PlanetSelectors.isLoadingSales); //planet specific sales
    this.loadingPurchases = this.store.selectSignal(
      //planet specific purchases
      PlanetSelectors.isLoadingPurchases
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
