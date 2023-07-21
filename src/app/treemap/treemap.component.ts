import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { createTreemap } from 'src/assets/visualizations.vl';
import embed from 'vega-embed';

import { TreemapData } from '../pages/profile-page/profile-page.component';

@Component({
  selector: 'trust-ai-treemap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss'],
})
export class TreemapComponent implements OnChanges {
  /** Visualization element */
  @ViewChild('vis') vis?: ElementRef;
  @Input() spec = {};
  @Input() activitiesData: TreemapData[] = [];
  @Input() skillsData: TreemapData[] = [];
  @Input() knowledgeData: TreemapData[] = [];
  @Input() abilitiesData: TreemapData[] = [];

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if ('activitiesData' in changes) {
      this.spec = createTreemap(this.activitiesData, 3);
    }
    if ('skillsData' in changes) {
      this.spec = createTreemap(this.skillsData, 2);
    }
    if ('knowledgeData' in changes) {
      this.spec = createTreemap(this.knowledgeData, 2);
    }
    if ('abilitiesData' in changes) {
      this.spec = createTreemap(this.abilitiesData, 3);
    }
    if (this.vis) {
      await embed(this.vis.nativeElement, this.spec, { actions: false });
    }
  }

  reload() {
    embed(this.vis?.nativeElement, this.spec, { actions: false });
  }
}
