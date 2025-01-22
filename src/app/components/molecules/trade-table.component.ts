import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import { EnergyFormatPipe } from '../../core/pipes/energy-pipe.pipe';

@Component({
  selector: 'geb-trade-table',
  imports: [EnergyFormatPipe],
  template: `
    <div
      class="text-bg-light p-3 overflow-auto"
      style="max-height: 50vh; border-radius: 6px"
    >
      @if (!!trades() && trades()!.length > 0) {
      <div class="row">
        @if (showSeller()) {
        <div class="col"><strong>Seller</strong></div>
        } @if (showBuyer()) {
        <div class="col"><strong>Buyer</strong></div>
        }
        <div class="col"><strong>Energy</strong></div>
        <div class="col"><strong>Status</strong></div>
      </div>
      } @for(trade of trades(); track trade.id) {
      <div class="row">
        @if (showSeller()) {
        <div class="col">
          <span>{{ trade.planetSellerName }}</span>
        </div>
        } @if (showBuyer()) {
        <div class="col">
          <span>{{ trade.planetBuyerName || '-' }}</span>
        </div>
        }
        <div class="col">
          <span>{{ trade.energy | formatEnergy }}</span>
        </div>
        <div class="col">
          <span
            class="badge"
            [class.text-bg-success]="trade.status === 'completed'"
            [class.text-bg-primary]="trade.status === 'new'"
            >{{ trade.status }}</span
          >
        </div>
      </div>
      } @empty {
      <div class="col d-flex justify-content-center">
        <span>There is no available data</span>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class TradeTableComponent {
  trades = input<EnergyTrade[]>([]);
  showSeller = input<boolean>(true);
  showBuyer = input<boolean>(true);
}
