import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { EnergyFormatPipe } from '../../core/pipes/energy-pipe.pipe';
import { EnergyTrade } from '../../core/services/interfaces/energy-trade.interface';

@Component({
  selector: 'geb-trade-table',
  imports: [EnergyFormatPipe, ScrollingModule],
  template: `
    @if (!!trades() && trades()!.length > 0) {
    <div>
      <input
        type="checkbox"
        [checked]="autoScroll()"
        (change)="toggleAutoScroll()"
      />
      <span>Auto scroll</span>
    </div>
    <cdk-virtual-scroll-viewport
      #scrollViewport
      [itemSize]="30"
      class="text-bg-light p-3 scroll-viewport"
    >
      <div class="row fixed-height">
        @if (showSeller()) {
        <div class="col"><strong>Seller</strong></div>
        } @if (showBuyer()) {
        <div class="col"><strong>Buyer</strong></div>
        }
        <div class="col"><strong>Energy</strong></div>
        <div class="col"><strong>Status</strong></div>
      </div>

      <div *cdkVirtualFor="let trade of trades()" class="row fixed-height">
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
    </cdk-virtual-scroll-viewport>
    } @else {
    <div class="col d-flex justify-content-center">
      <span>There is no available data</span>
    </div>
    }
  `,
  styles: `
  :host {
    display: block;
    min-height: 10vh;
  }
  .scroll-viewport {
    min-height: 40vh; 
    max-height: 60vh;
    border-radius: 6px
  }
  .fixed-height {
    height: 30px;
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeTableComponent {
  trades = input<EnergyTrade[]>([]);
  showSeller = input<boolean>(true);
  showBuyer = input<boolean>(true);
  autoScroll = signal<boolean>(true);
  @ViewChild('scrollViewport') scrollViewport: CdkVirtualScrollViewport;

  constructor() {
    effect(() => {
      if (
        this.trades().length > 0 &&
        this.scrollViewport &&
        this.autoScroll()
      ) {
        // Scroll to the bottom of the list
        this.scrollViewport.scrollTo({ bottom: 0, behavior: 'smooth' });
      }
    });
  }

  toggleAutoScroll() {
    this.autoScroll.set(!this.autoScroll());
  }
}
