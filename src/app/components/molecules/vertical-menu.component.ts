import { Component, input } from '@angular/core';
import { MenuItemComponent } from '../atoms/menu-item.component';
import { TranslatePipe } from '@ngx-translate/core';

type MenuItems = {
  label: string;
  link: string;
}[];

@Component({
  selector: 'geb-vertical-menu',
  imports: [MenuItemComponent, TranslatePipe],
  template: `
    @for(menuItem of menuItems(); track $index) {
    <geb-menu-item [link]="menuItem.link">{{
      menuItem.label | translate
    }}</geb-menu-item>
    }
  `,
  styles: ``,
  host: {
    class: 'nav flex-column',
  },
})
export class VerticalMenuComponent {
  menuItems = input<MenuItems>();
}
