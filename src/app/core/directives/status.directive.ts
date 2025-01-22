import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[status]' })
export class StatusDirective {
  private _status: string;

  get status(): string {
    return this._status;
  }

  @Input()
  set status(value: string) {
    debugger;
    this._status = value;
  }
}
