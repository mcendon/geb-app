import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../components/organisms/footer.component';
import { LoginBoxComponent } from '../components/organisms/login-box.component';

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
    <footer class="flex mt-auto py-3 bg-light">
      <geb-footer [appName]="'APP_NAME' | translate"></geb-footer>
    </footer>
  `,
  styles: `
    :host {
      display: flex; 
      flex-direction: column; 
      min-height: 100vh; 
    }
  `,
})
export class LoginPageComponent {
  doLogin(loginData: { email: string; password: string }) {
    console.log(loginData);
  }
}
