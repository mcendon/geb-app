import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { logout } from '../../store/actions/auth.actions';

@Component({
  selector: 'geb-header',
  imports: [TranslatePipe],
  template: `
    <header class="geb_header">
      <h1 class="geb_header__title">{{ 'APP_NAME' | translate }}</h1>
      <button
        (click)="doLogout()"
        class="btn btn-danger geb_header__logout"
        type="button"
      >
        Logout
      </button>
    </header>
  `,
  styles: `
    .geb_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--bs-warning-bg-subtle);
      color: var(--bs-warning-text-emphasis);
      min-height: 4em;
      &__title {
        font-size: 1.2em;
        color: var(--bs-light-text-emphasis);
        margin: 0.5em;
      }
      &__logout {
        margin: 0.5em;
      }
    }
  
  `,
})
export class HeaderComponent {
  private readonly store = inject(Store);
  doLogout() {
    this.store.dispatch(logout());
  }
}
