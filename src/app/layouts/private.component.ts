import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { combineLatest, filter, skip, Subject, take, takeUntil } from 'rxjs';
import { FooterComponent } from '../components/organisms/footer.component';
import { HeaderComponent } from '../components/organisms/header.component';
import { SidebarComponent } from '../components/organisms/sidebar.component';
import { RealtimeHandlerService } from '../core/services/realtime-handler.service';
import { StoreDispatcherService } from '../core/services/store-dispatcher.service';
import * as UserActions from '../store/actions/user.actions';
import { AuthState } from '../store/reducers/auth.reducer';
import * as PlanetSelectors from '../store/selectors/planet.selectors';
import * as TradeSelectors from '../store/selectors/trade.selectors';

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
  private readonly storeDispatcherService = inject(StoreDispatcherService);
  private readonly realtimeHandlerService = inject(RealtimeHandlerService);
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.store.select('auth').subscribe((auth: AuthState) => {
      const userId = auth.session?.userId;
      if (!!userId) {
        this.store.dispatch(UserActions.fetchUser({ userId }));
      }
    });

    this.storeDispatcherService
      .dispatchAppInitActions()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    // Start the realtime handler when all the data is loaded
    // This is to ensure that we dont pull duplicated data from the server
    combineLatest({
      tradeLoading: this.store.select(TradeSelectors.selectTradeLoading),
      salesLoading: this.store.select(PlanetSelectors.isLoadingSales),
      purchasesLoading: this.store.select(PlanetSelectors.isLoadingPurchases),
    })
      .pipe(
        filter(
          ({ tradeLoading, salesLoading, purchasesLoading }) =>
            !tradeLoading && !salesLoading && !purchasesLoading
        ),
        skip(1),
        take(1)
      )
      .subscribe(() => {
        console.log('All data loaded, starting realtime handler');
        this.realtimeHandlerService.start();
      });
  }

  ngOnDestroy() {
    console.log('Destroying PrivateComponent');
    this.realtimeHandlerService.stop();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
