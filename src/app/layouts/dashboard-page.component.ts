import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { TradeTableComponent } from '../components/molecules/trade-table.component';
import { GalacticCurrencyPipe } from '../core/pipes/currency-pipe.pipe';
import { TradeService } from '../core/services/trade-service.service';
import { PlanetState } from '../store/reducers/planet.reducer';
import { TradeState } from '../store/reducers/trade.reducer';
import { Trade } from '../core/services/interfaces/trade.interface';
import { getPlanetHistoricTrades } from '../store/actions/trade.actions';

@Component({
  selector: 'geb-dashboard-page',
  imports: [TradeTableComponent, GalacticCurrencyPipe],
  template: `
    <div class="d-flex flex-column p-3">
      <h1>Planet {{ planetName() }} Dashboard</h1>
      <div class="row">
        <div class="col-md-8 p-2 col-12">
          <div class="mb-3">
            <h2 class="title">My trades</h2>
            <geb-trade-table [trades]="planetTrades()"></geb-trade-table>
          </div>
          <div class="mb-3">
            <h2 class="title">Last global trades</h2>
            <geb-trade-table></geb-trade-table>
          </div>
        </div>
        <div class="col-md-4">
          <div class="row p-2">
            <div
              class="col-md-6 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">Total energy</h2>
              <span class="text-lg"> {{ totalEnergy() }} </span>
            </div>
            <div
              class="col-md-6 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">Available energy</h2>
              <span class="text-lg">{{ availableEnergy() }}</span>
            </div>
          </div>
          <div class="row p-2">
            <div
              class="col-md-6 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">Credits</h2>
              <span class="text-md">{{
                planetCredits() | galacticCurrency
              }}</span>
            </div>
            <div
              class="col-md-6 d-flex flex-column justify-content-center align-items-center"
            >
              <h2 class="title">Energy price</h2>
              <span class="text-lg"> {{ energyPrice() }} </span>
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
    font-size: 1.2rem;
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
  availableEnergy = signal(0);
  planetCredits = signal(0);
  energyPrice = signal(0);
  planetTrades = signal<Trade[]>([]);

  ngOnInit() {
    this.store
      .select('planet')
      .pipe(
        takeUntil(this.destroy$),
        filter(({ planet }) => !!planet),
        tap(({ planet }: PlanetState) => {
          this.planetName.set(planet?.name!);
          this.totalEnergy.set(planet?.totalEnergy!);
          this.availableEnergy.set(planet?.availableEnergy!);
          this.planetCredits.set(planet?.credits!);

          this.store.dispatch(
            getPlanetHistoricTrades({ planetId: planet?.id! })
          );
        })
      )
      .subscribe();

    this.energyPrice.set(this.tradeService.getEnergyPrice()); // I assume energy price is constant for all planets

    this.store
      .select('trades')
      .pipe(
        takeUntil(this.destroy$),
        filter(({ planetTrades }: TradeState) => !!planetTrades),
        tap(({ planetTrades }) => {
          this.planetTrades.set(planetTrades);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
