import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { createStatePlot } from 'src/assets/visualizations.vl';
import embed, { VisualizationSpec } from 'vega-embed';

import { SalaryInfo } from '../pages/profile-page/profile-page.component';

/**
 * Employment section of job profile
 */
@Component({
  selector: 'trust-ai-profile-employment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-employment.component.html',
  styleUrls: ['./profile-employment.component.scss'],
})
export class ProfileEmploymentComponent implements OnChanges {
  /** Visualization element */
  @ViewChild('vis') vis?: ElementRef;

  /** Vega lite spec for visualization */
  @Input() spec: VisualizationSpec = {};

  /** State salary data */
  @Input() dataStates: SalaryInfo[] = [];

  /**
   * Creates visualization on data changes
   * @param changes Changes
   * @returns Promise
   */
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if ('dataStates' in changes) {
      this.spec = createStatePlot(this.dataStates, 'emp');
    }
    if (this.vis) {
      await embed(this.vis.nativeElement, this.spec, { actions: false, renderer: 'svg' });
    }
  }
}