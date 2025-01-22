import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'geb-pie-chart',
  imports: [NgFor],
  template: `
    <section>
      <div class="pie" [style.background-image]="generateConicGradient()"></div>
      <div class="labels">
        <span
          *ngFor="let x of chartData"
          class="label"
          [style.color]="x.color"
          >{{ x.label }}</span
        >
      </div>
    </section>
  `,
  styles: `
  .pie {
    width: 400px;
    height: 400px;
    border-radius: 50%
  }
  span.label {
    display: inline-block;
    margin: 10px;
  }
  `,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent {
  @Input() chartData: { value: number; label: string; color: string }[] = [];

  generateConicGradient() {
    let gradientString = 'conic-gradient(';
    let currentPercentage = 0;

    this.chartData.forEach((item, index) => {
      let nextPercentage = currentPercentage + item.value;
      gradientString += `${item.color} ${currentPercentage}%, ${item.color} ${nextPercentage}%`;
      if (index < this.chartData.length - 1) {
        gradientString += ', ';
      }
      currentPercentage = nextPercentage;
    });

    gradientString += ')';
    return gradientString;
  }
}
