import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'geb-form-item',
  imports: [],
  template: `
    <div class="mb-3">
      <label for="{{ inputId() }}" class="form-label">{{ label() }}</label>
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormItemComponent {
  label = input('');
  inputId = input('');
}
