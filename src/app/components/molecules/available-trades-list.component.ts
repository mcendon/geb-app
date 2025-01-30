import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { EnergyFormatPipe } from '../../core/pipes/energy-pipe.pipe';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'geb-available-trades-list',
  imports: [EnergyFormatPipe, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      class="list-group"
      #scrollViewport
      [itemSize]="30"
    >
      @if (trades()?.length > 0) {
      <a
        *cdkVirtualFor="let trade of trades()"
        [class.active]="trade.id === selected"
        (click)="select(trade)"
        class="list-group-item list-group-item-action"
        >Buy {{ trade?.energy | formatEnergy }} from
        {{ trade?.planetSellerName }}.</a
      >
      } @else {
      <div class="list-group-item">No trades available</div>
      }
    </cdk-virtual-scroll-viewport>
  `,
  styles: `
    .list-group-item {
      cursor: pointer;
    }
    .list-group {
      height: 50vh;
    }
  `,
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
