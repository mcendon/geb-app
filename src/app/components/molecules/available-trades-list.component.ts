import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { EnergyFormatPipe } from '../../core/pipes/energy-pipe.pipe';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';

@Component({
  selector: 'geb-available-trades-list',
  imports: [EnergyFormatPipe],
  template: `
    <div class="list-group">
      @for (trade of trades(); track trade.id) {
      <a
        [class.active]="trade.id === selected"
        (click)="select(trade)"
        class="list-group-item list-group-item-action"
        >Buy {{ trade?.energy | formatEnergy }} from
        {{ trade?.planetSellerName }}.</a
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableTradesListComponent {
  onSelect = output<EnergyTrade>();
  trades = input<EnergyTrade[]>([]);
  selected = 0;

  select(trade: EnergyTrade) {
    this.onSelect.emit(trade);
    this.selected = trade.id;
  }
}
