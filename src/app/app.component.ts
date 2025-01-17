import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PreferencesState } from './store/reducers/user-preferences.reducer';
import {
  selectLanguage,
  selectMode,
} from './store/selectors/user-preferences.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'geb-root',
  imports: [RouterOutlet, TranslateModule],
  template: `<router-outlet></router-outlet> `,
  styles: `
  :host {
    &[data-bs-theme="dark"] {
      background-color: var(--bs-light-bg-subtle);
    }
  }
  `,
  host: {
    '[attr.data-bs-theme]': 'mode()',
  },
})
export class AppComponent {
  translate = inject(TranslateService);
  store = inject(Store);
  mode = signal('dark');

  mode$ = this.store.select(selectMode);
  language$ = this.store.select(selectLanguage);
  destroy$ = new Subject();

  constructor() {
    this.translate.addLangs(['en', 'ma']);
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.language$.pipe(takeUntil(this.destroy$)).subscribe((language) => {
      this.translate.use(language);
    });

    this.mode$.pipe(takeUntil(this.destroy$)).subscribe((mode) => {
      this.mode.set(mode);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
