import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/organisms/footer.component';
import { HeaderComponent } from '../components/organisms/header.component';
import { SidebarComponent } from '../components/organisms/sidebar.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'geb-dashboard-page',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    TranslatePipe,
  ],
  template: ` <geb-header></geb-header>
    <main class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <geb-sidebar></geb-sidebar>
        </div>
        <div class="col-md-10">
          <router-outlet></router-outlet>
        </div>
      </div>
    </main>
    <geb-footer [appName]="'APP_NAME' | translate"></geb-footer>`,
  styles: `
      :host {
      display: flex; 
      flex-direction: column; 
      min-height: 100vh; 
      background: var(--bs-light-bg-subtle);
      color: var(	--bs-light-text-emphasis);
    }`,
})
export class PrivateComponent {}
