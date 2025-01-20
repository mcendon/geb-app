import { Component, computed, inject, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { TradeTableComponent } from '../components/molecules/trade-table.component';
import { GALACTIC_ENERGY_PRICE } from '../core/constants';
import { GalacticCurrencyPipe } from '../core/pipes/currency-pipe.pipe';
import { EnergyTrade } from '../core/services/interfaces/energy-trade.interface';
import { TradeService } from '../core/services/trade-service.service';
import { PlanetState } from '../store/reducers/planet.reducer';
import * as PlanetSelectors from '../store/selectors/planet.selectors';

@Component({
  selector: 'geb-dashboard-page',
  imports: [TradeTableComponent, GalacticCurrencyPipe],
  template: `
    <div class="d-flex flex-column p-3">
      <h1>Planet {{ planetName() }} Dashboard</h1>
      <div class="row">
        <div class="col-md-8 p-2 col-12">
          <div class="mb-3">
            <h2 class="title">Open trades</h2>
            <geb-trade-table
              [showBuyer]="false"
              [trades]="openTrades()"
            ></geb-trade-table>
          </div>
          <div class="mb-3">
            <h2 class="title">Closed sales</h2>
            <geb-trade-table
              [showSeller]="false"
              [trades]="closedSales()"
            ></geb-trade-table>
          </div>
          <div class="mb-3">
            <h2 class="title">Closed purchases</h2>
            <geb-trade-table [trades]="closedPurchases()"></geb-trade-table>
          </div>
        </div>
        <div class="col-md-4">
          <div class="row p-2">
            <div
              class="col-md-12 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">Planet energy</h2>
              <span class="text-lg"> {{ totalEnergy() }} </span>
            </div>
          </div>
          <div class="row p-2">
            <div
              class="col-md-12 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">Planet budget</h2>
              <span class="text-md">{{
                planetMoney() | galacticCurrency
              }}</span>
            </div>
          </div>
          <div class="row p-2">
            <div
              class="col-md-12 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">Energy price</h2>
              <span class="text-md">
                {{ energyPrice() | galacticCurrency }}
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
  private readonly tradeService = inject(TradeService);
  private readonly destroy$ = new Subject<void>();

  planetName = signal('');
  totalEnergy = signal(0);
  planetMoney = signal(0);
  energyPrice = signal(0);
  planetPurchases!: Signal<EnergyTrade[] | undefined>;
  planetSales!: Signal<EnergyTrade[] | undefined>;

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

  ngOnInit() {
    this.store
      .select('planet')
      .pipe(
        takeUntil(this.destroy$),
        filter(({ planet }) => !!planet),
        tap(({ planet }: PlanetState) => {
          this.planetName.set(planet?.name!);
          this.totalEnergy.set(planet?.energy!);
          this.planetMoney.set(planet?.money!);
        })
      )
      .subscribe();

    // For practical reasons, I assume energy price is constant for all planets
    this.energyPrice.set(GALACTIC_ENERGY_PRICE);

    this.planetPurchases = this.store.selectSignal(
      PlanetSelectors.selectPurchases
    );
    this.planetSales = this.store.selectSignal(PlanetSelectors.selectSales);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
