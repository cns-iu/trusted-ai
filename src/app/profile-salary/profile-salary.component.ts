import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { createSalaryIndPlot, createSalaryNatPlot, createStatePlot } from 'src/assets/visualizations.vl';
import embed, { VisualizationSpec } from 'vega-embed';

import { SalaryDataType, SalaryInfo } from '../pages/profile-page/profile-page.component';

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

  @Input() visualizationType: 'state' | 'national' | 'industry' = 'state';

  @Input() dataType: SalaryDataType = 'annual';

  /**
   * Updates visualizations on data changes
   * @param changes Changes
   * @returns Promise
   */
  async ngOnChanges(): Promise<void> {
    this.createPlot();
    if (this.vis) {
      await embed(this.vis.nativeElement, this.spec, { actions: false });
    }
  }

  isEmpty(dataset: SalaryInfo[], type: SalaryDataType): boolean {
    let parameter: string;
    switch (type) {
      case 'annual':
        parameter = 'a_mean';
        break;
      case 'hourly':
        parameter = 'h_mean';
        break;
      case 'emp':
        parameter = 'tot_emp';
        break;
    }
    return dataset.filter((value) => value['year'] === 2022).filter((entry) => entry[parameter]).length === 0;
  }

  private createPlot() {
    switch (this.visualizationType) {
      case 'state':
        if (!this.isEmpty(this.dataStates, this.dataType)) {
          this.spec = createStatePlot(this.dataStates, 'salary', this.dataType);
        }
        break;
      case 'national':
        if (!this.isEmpty(this.dataNat, this.dataType)) {
          this.spec = createSalaryNatPlot(this.dataNat, this.dataType);
        }
        break;
      case 'industry':
        if (!this.isEmpty(this.dataInd, this.dataType)) {
          this.spec = createSalaryIndPlot(this.dataInd, this.dataType);
        }
        break;
    }
  }
}
