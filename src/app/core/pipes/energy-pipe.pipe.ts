import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatEnergy',
})
export class EnergyFormatPipe implements PipeTransform {
  transform(value: number, unit: string = 'ZJ'): string {
    return `${value || ''} ${unit}`;
  }
}
