import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {
  createSalaryStatePlot,
  createSalaryNatPlot,
  createSalaryIndPlot,
} from 'src/assets/visualizations/salary-states.vl';
import embed, { VisualizationSpec } from 'vega-embed';

import { SalaryInfo } from '../pages/profile-page/profile-page.component';

@Component({
  selector: 'trust-ai-profile-salary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-salary.component.html',
  styleUrls: ['./profile-salary.component.scss'],
})
export class ProfileSalaryComponent implements OnChanges {
  @ViewChild('vis') vis?: ElementRef;

  @Input() spec: VisualizationSpec = {};

  @Input() data: SalaryInfo[] = [];

  @Input() dataNat: SalaryInfo[] = [];

  @Input() dataInd: SalaryInfo[] = [];

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if ('data' in changes) {
      this.spec = createSalaryStatePlot(this.data);
    }
    if ('dataNat' in changes) {
      this.spec = createSalaryNatPlot(this.dataNat);
    }
    if ('dataInd' in changes) {
      this.spec = createSalaryIndPlot(this.dataInd);
    }
    if (this.vis) {
      await embed(this.vis.nativeElement, this.spec);
    }
  }
}
