import { Component, input } from '@angular/core';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';

@Component({
  selector: 'geb-trade-table',
  imports: [],
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
        <div class="col"><strong>Quantity</strong></div>
        <div class="col"><strong>Status</strong></div>
      </div>
      } @for(trade of trades(); track $index) {
      <div class="row">
        @if (showSeller()) {
        <div class="col">
          <span class="badge text-bg-warning">{{
            trade.planetSellerName
          }}</span>
        </div>
        } @if (showBuyer()) {
        <div class="col">
          <span class="badge text-bg-success">{{ trade.planetBuyerName }}</span>
        </div>
        }
        <div class="col">
          <span>{{ trade.energy }}</span>
        </div>
        <div class="col">
          <span class="badge text-bg-primary">{{ trade.status }}</span>
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
  trades = input<EnergyTrade[] | undefined>([]);
  showSeller = input<boolean>(true);
  showBuyer = input<boolean>(true);
}
