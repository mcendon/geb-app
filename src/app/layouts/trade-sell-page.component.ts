import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'geb-trade-sell-page',
  imports: [TranslatePipe],
  template: `
    <h1 class="p-3">Sell energy</h1>
    <p class="p-3">
      <!-- Example of translation fallback. No ma.json translation is specified -->
      {{ 'SELL_PAGE_MESSAGE' | translate }}
    </p>
  `,
  styles: ``,
})
export class TradeSellPageComponent {}
