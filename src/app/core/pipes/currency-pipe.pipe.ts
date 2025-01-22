import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'galacticCurrency',
})
export class GalacticCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string = '$GAL'): string {
    return `${value?.toFixed(2) || '-'} ${currencyCode}`;
  }
}
