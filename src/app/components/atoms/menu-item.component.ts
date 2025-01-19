import { Component, input, output, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.Emulated,
})
export class MenuItemComponent {
  link = input<string>();
}
