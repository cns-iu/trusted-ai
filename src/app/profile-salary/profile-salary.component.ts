import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { createSalaryIndPlot, createSalaryNatPlot, createStatePlot } from 'src/assets/visualizations.vl';
import embed, { VisualizationSpec } from 'vega-embed';

import { SalaryInfo } from '../pages/profile-page/profile-page.component';

/**
 * Salary statistics section of job profile
 */
@Component({
  selector: 'trust-ai-profile-salary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-salary.component.html',
  styleUrls: ['./profile-salary.component.scss'],
})
export class ProfileSalaryComponent implements OnChanges {
  /** Visualization element */
  @ViewChild('vis') vis?: ElementRef;
  /** Vega lite spec for visualization */
  @Input() spec: VisualizationSpec = {};
  /** State salary data */
  @Input() dataStates: SalaryInfo[] = [];
  /** National salary data */
  @Input() dataNat: SalaryInfo[] = [];
  /** Industry salary data */
  @Input() dataInd: SalaryInfo[] = [];

  /**
   * Updates visualizations on data changes
   * @param changes Changes
   * @returns Promise
   */
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if ('dataStates' in changes) {
      this.spec = createStatePlot(this.dataStates, 'salary');
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
