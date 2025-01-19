import { Component, input, output } from '@angular/core';
import { Trade } from '../../core/services/interfaces/trade.interface';

@Component({
  selector: 'geb-available-trades-list',
  imports: [],
  template: `
    <div class="list-group">
      @for (trade of trades(); track $index) {
      <a
        [class.active]="$index === selected"
        (click)="select(trade, $index)"
        class="list-group-item list-group-item-action"
        >Buy {{ trade?.energyQty }} energy units from {{ trade?.sellerName }}</a
      >
      } @empty {
      <div class="list-group-item">No trades available</div>
      }
    </div>
  `,
  styles: `
    .list-group-item {
      cursor: pointer;
    }
  `,
  host: {
    class: 'list-group',
  },
})
export class AvailableTradesListComponent {
  onSelect = output<Trade>();
  trades = input<Trade[]>([]);
  selected = 0;

  select(trade: any, index: number) {
    this.onSelect.emit(trade);
    this.selected = index;
  }
}
