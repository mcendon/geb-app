import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'geb-menu-item',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a class="nav-link" [routerLink]="link()" routerLinkActive="link-danger">
      <ng-content></ng-content>
    </a>
  `,
  styles: `
    a.nav-link {
      cursor: pointer;
    }
  `,
  host: {
    class: 'nav-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  link = input<string>();
}
