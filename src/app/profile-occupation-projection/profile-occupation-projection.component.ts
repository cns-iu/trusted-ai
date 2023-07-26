import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { createProjectionsPlot } from 'src/assets/visualizations.vl';
import embed, { VisualizationSpec } from 'vega-embed';

import { ProjectionInfo } from '../pages/profile-page/profile-page.component';

/**
 * Profile occupation projection visualization
 */
@Component({
  selector: 'trust-ai-profile-occupation-projection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-occupation-projection.component.html',
  styleUrls: ['./profile-occupation-projection.component.scss'],
})
export class ProfileOccupationProjectionComponent implements OnChanges {
  /** Visualization element */
  @ViewChild('vis') vis?: ElementRef;

  /** Vega lite spec for visualization */
  @Input() spec: VisualizationSpec = {};

  /** Projections data */
  @Input() dataProjections: ProjectionInfo[] = [];

  /**
   * Updates visualizations on data changes
   * @param changes Changes
   * @returns Promise
   */
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if ('dataProjections' in changes) {
      this.spec = createProjectionsPlot(this.dataProjections);
    }
    if (this.vis) {
      await embed(this.vis.nativeElement, this.spec, { actions: false, renderer: 'svg' });
    }
  }
}
