import { Component, input, model, output } from '@angular/core';
import { FormItemComponent } from '../molecules/form-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

type LoginData = {
  email: string;
  password: string;
};

@Component({
  selector: 'geb-login-box',
  imports: [FormItemComponent, TranslatePipe, FormsModule],
  template: `
    <div class="card">
      <div class="card-header text-center">
        <h3>{{ title() }}</h3>
      </div>
      <div class="card-body">
        <form (submit)="doSubmit()">
          <geb-form-item [label]="'LOGIN.EMAIL' | translate" inputId="email">
            <input
              [(ngModel)]="email"
              type="email"
              class="form-control"
              name="email"
              [placeholder]="'LOGIN.EMAIL_PLACEHOLDER' | translate"
            />
          </geb-form-item>
          <geb-form-item
            [label]="'LOGIN.PASSWORD' | translate"
            inputId="password"
          >
            <input
              [(ngModel)]="password"
              type="password"
              class="form-control"
              name="password"
              [placeholder]="'LOGIN.PASSWORD_PLACEHOLDER' | translate"
            />
          </geb-form-item>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">
              {{ 'LOGIN.LOGIN' | translate }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class LoginBoxComponent {
  title = input('');
  email = model('');
  password = model('');
  onSubmit = output<LoginData>();

  doSubmit() {
    const email = this.email();
    const password = this.password();
    if (!!email && !!password) {
      this.onSubmit.emit({ email, password });
    }
  }
}
