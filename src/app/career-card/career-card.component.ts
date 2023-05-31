import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { JobInfo } from '../pages/occupations-page/occupations-page.component';

const PreparednessLevels: Record<string, string> = {
  1: 'Little or No Preparation Needed',
  2: 'Some Preparation',
  3: 'Medium Preparation Needed',
  4: 'Considerable Preparation Needed',
  5: 'Extensive Preparation Needed',
};

@Component({
  selector: 'trust-ai-career-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './career-card.component.html',
  styleUrls: ['./career-card.component.scss'],
})
export class CareerCardComponent {
  @Input() jobInfo: JobInfo = {
    Occupation: '',
    'Job Zone': '1',
    'Data-level': '',
    Code: '',
  };

  @Output() jobClicked = new EventEmitter<JobInfo>();

  preparednessLevels = PreparednessLevels;
}
