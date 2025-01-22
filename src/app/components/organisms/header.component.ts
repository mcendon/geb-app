import { Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { logout } from '../../store/actions/auth.actions';

import * as PlanetSelectors from '../../store/selectors/planet.selectors';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { GalacticCurrencyPipe } from '../../core/pipes/currency-pipe.pipe';
import { GALACTIC_ENERGY_PRICE } from '../../core/constants';
import { EnergyFormatPipe } from '../../core/pipes/energy-pipe.pipe';

@Component({
  selector: 'geb-header',
  imports: [TranslatePipe, GalacticCurrencyPipe, EnergyFormatPipe],
  template: `
    <header class="geb_header">
      <h1 class="geb_header__title">{{ 'APP_NAME' | translate }}</h1>
      <div>
        <span>{{
          'WELCOME_MESSAGE' | translate : { name: userName(), planet: planet() }
        }}</span>
        <span class="geb_header__badge badge text-bg-success"
          >{{ 'ENERGY' | translate }}: {{ planetEnergy() | formatEnergy }}</span
        >
        <span class="geb_header__badge badge text-bg-warning"
          >{{ 'MONEY' | translate }}:
          {{ planetMoney()! | galacticCurrency }}</span
        >
        <span class="geb_header__badge badge text-bg-info"
          >{{ 'ENERGY_PRICE' | translate }}:
          {{ energyPrice | galacticCurrency }}</span
        >
        <button
          (click)="doLogout()"
          class="btn btn-danger geb_header__logout"
          type="button"
        >
          {{ 'LOGOUT' | translate }}
        </button>
      </div>
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
      &__badge {
        margin: 0 0.5em;
      }
    }
  
  `,
})
export class HeaderComponent {
  private readonly store = inject(Store);
  userName!: Signal<string>;
  planet!: Signal<string>;
  planetEnergy!: Signal<number>;
  planetMoney!: Signal<number>;
  energyPrice = GALACTIC_ENERGY_PRICE;

  ngOnInit() {
    this.userName = this.store.selectSignal(UserSelectors.selectName);
    this.planet = this.store.selectSignal(PlanetSelectors.selectName);
    this.planetEnergy = this.store.selectSignal(PlanetSelectors.selectEnergy);
    this.planetMoney = this.store.selectSignal(PlanetSelectors.selectMoney);
  }

  doLogout() {
    this.store.dispatch(logout());
  }
}
