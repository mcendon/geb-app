import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { logout } from '../../store/actions/auth.actions';

@Component({
  selector: 'geb-header',
  imports: [TranslatePipe],
  template: `
    <header class="geb_header">
      <h1 class="geb_header__title">{{ 'APP_NAME' | translate }}</h1>
      <div>
        <span>{{
          'WELCOME_MESSAGE'
            | translate : { name: userName(), planet: userPlanet() }
        }}</span>
        <button
          (click)="doLogout()"
          class="btn btn-danger geb_header__logout"
          type="button"
        >
          Logout
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
    }
  
  `,
})
export class HeaderComponent {
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();

  userName = signal('');
  userPlanet = signal('');

  ngOnInit() {
    this.store
      .select('user')
      .pipe(
        takeUntil(this.destroy$),
        filter((user) => !!user.user),
        tap((user) => {
          this.userName.set(user.user?.name!);
        })
      )
      .subscribe();

    this.store
      .select('planet')
      .pipe(
        takeUntil(this.destroy$),
        filter((planet) => !!planet.planet),
        tap((planet) => {
          this.userPlanet.set(planet.planet?.name!);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  doLogout() {
    this.store.dispatch(logout());
  }
}
