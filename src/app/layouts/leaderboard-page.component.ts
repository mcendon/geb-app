import { Component, computed, inject, signal, Signal } from '@angular/core';
import { EnergyTrade } from '../core/services/interfaces/energy-trade.interface';
import { Store } from '@ngrx/store';
import * as TradeSelectors from '../store/selectors/trade.selectors';
import { EnergyFormatPipe } from '../core/pipes/energy-pipe.pipe';
import { BarChartComponent } from '../components/molecules/bar-chart.component';

@Component({
  selector: 'geb-leaderboard-page',
  imports: [EnergyFormatPipe, BarChartComponent],
  template: `
    <div class="d-flex flex-column p-3">
      <h1>Leaderboard</h1>
      <div class="row">
        <div class="col">
          <div class="mb-1">
            <ul>
              @for(entry of leaderboard(); track $index ) {
              <li>
                <span>#{{ $index + 1 }}&nbsp;</span>
                <span class="mr-1">{{ entry.planet }}:&nbsp;</span>
                <span>{{ entry.totalEnergy | formatEnergy }}</span>
              </li>
              }
            </ul>
          </div>
        </div>
        <div class="col">
          <geb-bar-chart [chartData]="leaderboardForChart()"></geb-bar-chart>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class LeaderboardPageComponent {
  private readonly store = inject(Store);
  // RxJS Signals
  allTrades: Signal<EnergyTrade[]>;
  leaderboard = computed(() => {
    // every time allTrades changes, leaderboard will be recalculated
    const leaderboard = this.calculateLeaderboard(this.allTrades());
    return leaderboard;
  });

  leaderboardForChart = computed(() => {
    // computed property for the bar chart
    const leaderboard = this.leaderboard();
    const sumEnergy = leaderboard.reduce(
      (acc, entry) => acc + entry.totalEnergy,
      0
    );
    // colors for the chart
    // for this demo I assume that there will be no more than 5 planets
    const colors = ['blue', 'green', 'red', 'orange', 'purple'];
    return leaderboard.map((entry, i) => {
      return {
        value: Math.floor((entry.totalEnergy * 100) / sumEnergy),
        label: entry.planet,
        color: colors[i],
      };
    });
  });

  ngOnInit() {
    //All trades
    this.allTrades = this.store.selectSignal(TradeSelectors.selectTrades);
  }

  calculateLeaderboard(trades: EnergyTrade[]) {
    const leaderboard = {};
    trades
      .filter((trade) => trade.status === 'completed')
      .forEach((trade) => {
        // Calculate leaderboard
        leaderboard[trade.planetSellerName] =
          leaderboard[trade.planetSellerName] || 0;
        leaderboard[trade.planetSellerName] += trade.energy;
      });

    return Object.keys(leaderboard)
      .map((key) => {
        return { planet: key, totalEnergy: leaderboard[key] };
      })
      .sort((a, b) => b.totalEnergy - a.totalEnergy);
  }
}
