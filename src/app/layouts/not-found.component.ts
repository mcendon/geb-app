import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'geb-not-found',
  imports: [TranslatePipe],
  template: `
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div>
        <h1>{{ 'NOT_FOUND.TITLE' | translate }}</h1>
        <p>{{ 'NOT_FOUND.MESSAGE' | translate }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class NotFoundComponent {}
