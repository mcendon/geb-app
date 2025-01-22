import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/mock-api/in-memory-data.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { PreferencesEffects } from './store/effects/user-preferences.effects';
import { preferencesReducer } from './store/reducers/user-preferences.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducer';
import { planetReducer } from './store/reducers/planet.reducer';
import { PlanetEffects } from './store/effects/planet.effects';
import { tradeReducer } from './store/reducers/trade.reducer';
import { TradeEffects } from './store/effects/trade.effects';
import * as MetaReducers from './store/reducers/meta-reducers.reducer';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, '/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom([
      isDevMode()
        ? InMemoryWebApiModule.forRoot(InMemoryDataService, {
            delay: 100, //adding global delay to simulate network latency
            passThruUnknownUrl: true,
          })
        : [],
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      {
        preferences: preferencesReducer,
        auth: authReducer,
        user: userReducer,
        planet: planetReducer,
        trade: tradeReducer,
      },
      {
        metaReducers: [
          MetaReducers.clearStateMetaReducer,
          // isDevMode() ? MetaReducers.actionLoggerMetaReducer : null,
        ],
      }
    ),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideEffects(
      PreferencesEffects,
      AuthEffects,
      UserEffects,
      PlanetEffects,
      TradeEffects
    ),
  ],
};
