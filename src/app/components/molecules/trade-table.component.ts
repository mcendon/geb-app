import { Component, input } from '@angular/core';
import { Trade } from '../../core/services/interfaces/trade.interface';

@Component({
  selector: 'geb-trade-table',
  imports: [],
  template: `
    <div
      class="text-bg-light p-3 overflow-auto"
      style="max-height: 50vh; border-radius: 6px"
    >
      <div class="row">
        <div class="col-3"><strong>Seller</strong></div>
        <div class="col-3"><strong>Buyer</strong></div>
        <div class="col-3"><strong>Quantity</strong></div>
        <div class="col-3"><strong>Status</strong></div>
      </div>
      @for(trade of trades(); track $index) {
      <div class="row">
        <div class="col-3">
          <span class="badge text-bg-warning">{{ trade.sellerName }}</span>
        </div>
        <div class="col-3">
          <span class="badge text-bg-success">{{ trade.buyerName }}</span>
        </div>
        <div class="col-3">
          <span>{{ trade.energyQty }}</span>
        </div>
        <div class="col-3">
          <span class="badge text-bg-primary">{{ trade.status }}</span>
        </div>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class TradeTableComponent {
  trades = input<Trade[]>([]);
}
