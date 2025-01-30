import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VerticalMenuComponent } from '../molecules/vertical-menu.component';

@Component({
  selector: 'geb-sidebar',
  imports: [VerticalMenuComponent],
  template: ` <geb-vertical-menu [menuItems]="menuItems"></geb-vertical-menu> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  menuItems = [
    { label: 'MENU.DASHBOARD', link: '/private/dashboard' },
    { label: 'MENU.BUY', link: '/private/buy-energy' },
    { label: 'MENU.SELL', link: '/private/sell-energy' },
    { label: 'MENU.LEADERBOARD', link: '/private/leaderboard' },
  ];
}
