import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../components/organisms/footer.component';
import { HeaderComponent } from '../components/organisms/header.component';
import { SidebarComponent } from '../components/organisms/sidebar.component';
import * as UserActions from '../store/actions/user.actions';
import * as PlanetActions from '../store/actions/planet.actions';
import { AuthState } from '../store/reducers/auth.reducer';
import { UserState } from '../store/reducers/user.reducer';
import { filter, Subject, takeUntil } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateComponent {
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.store.select('auth').subscribe((auth: AuthState) => {
      const userId = auth.session?.userId;
      if (!!userId) {
        this.store.dispatch(UserActions.fetchUser({ userId }));
      }
    });

    this.store
      .select('user')
      .pipe(
        takeUntil(this.destroy$),
        filter((userState: UserState) => !!userState.user)
      )
      .subscribe((userState: UserState) => {
        if (!!userState?.user?.planetId) {
          this.store.dispatch(
            PlanetActions.fetchPlanet({ planetId: userState?.user?.planetId })
          );
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
