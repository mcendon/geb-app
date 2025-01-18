import { Component, effect, inject, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import {
  selectLanguage,
  selectMode,
} from '../../store/selectors/user-preferences.selectors';
import {
  setLanguage,
  setMode,
} from '../../store/actions/user-preferences.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'geb-footer',
  imports: [FormsModule, TranslatePipe],
  template: `
    <footer class="container-fluid row py-3 mt-auto">
      <div class="col-md-9 d-flex align-items-center">
        <span>&copy; {{ year }} {{ appName() }}.</span>
      </div>
      <div class="col-md-3 d-flex flex-row gap-3 align-items-center">
        <div>
          <label for="language">
            {{ 'SELECT_LANGUAGE' | translate }} :&nbsp;</label
          >
          <select id="language" [(ngModel)]="selectedLanguage">
            @for(language of availableLanguages(); track $index) {
            <option
              [attr.selected]="
                selectedLanguage() === language.code ? true : null
              "
              value="{{ language.code }}"
            >
              {{ language.translationKey | translate }}
            </option>
            }
          </select>
        </div>
        <div>
          <label for="mode">{{ 'SELECT_MODE' | translate }} :&nbsp;</label>
          <select id="mode" [(ngModel)]="selectedMode">
            @for(mode of availableModes(); track $index) {
            <option
              [attr.selected]="selectedMode() === mode.code ? true : null"
              value="{{ mode.code }}"
            >
              {{ mode.translationKey | translate }}
            </option>
            }
          </select>
        </div>
      </div>
    </footer>
  `,
  styles: `
  :host {
    font-size: 0.8rem;
    background-color: var(--bs-warning-bg-subtle);
    color: var(--bs-warning-text-emphasis);
  }
  `,
  host: {
    class: 'mt-auto',
  },
})
export class FooterComponent {
  appName = input('');
  year = new Date().getFullYear();
  store = inject(Store);

  // Add more languages and modes as needed
  availableLanguages = signal([
    { translationKey: 'LANG.EN', code: 'en' },
    { translationKey: 'LANG.MA', code: 'ma' },
  ]);

  availableModes = signal([
    { translationKey: 'MODE.LIGHT', code: 'light' },
    { translationKey: 'MODE.DARK', code: 'dark' },
  ]);

  selectedLanguage = model('');
  selectedMode = model('');

  destroy$ = new Subject();

  constructor() {
    effect(() => {
      this.store.dispatch(setLanguage({ language: this.selectedLanguage() }));
    });
    effect(() => {
      this.store.dispatch(setMode({ mode: this.selectedMode() }));
    });
  }

  ngOnInit() {
    this.store
      .select(selectLanguage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((language) => {
        this.selectedLanguage.set(language);
      });
    this.store
      .select(selectMode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((mode) => {
        this.selectedMode.set(mode);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
