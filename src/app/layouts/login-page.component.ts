import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../components/organisms/footer.component';
import { LoginBoxComponent } from '../components/organisms/login-box.component';
import { login } from '../store/actions/auth.actions';

@Component({
  selector: 'geb-login-page',
  imports: [LoginBoxComponent, FooterComponent, TranslatePipe],
  template: `
    <main class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <geb-login-box
            (onSubmit)="doLogin($event)"
            [title]="'LOGIN.TITLE' | translate"
          ></geb-login-box>
        </div>
      </div>
    </main>
    <geb-footer [appName]="'APP_NAME' | translate"></geb-footer>
  `,
  styles: `
    :host {
      display: flex; 
      flex-direction: column; 
      min-height: 100vh; 
      background: var(--bs-light-bg-subtle);
      color: var(	--bs-light-text-emphasis);
    }
  `,
})
export class LoginPageComponent {
  private readonly store = inject(Store);

  doLogin({ email, password }: { email: string; password: string }) {
    this.store.dispatch(login({ email, password }));
  }
}
