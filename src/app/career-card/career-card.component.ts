import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface JobInfo {
  title: string;
  preparation: number;
  code: string;
}

const PreparednessLevels: Record<number, string> = {
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
    title: '',
    preparation: 1,
    code: '',
  };

  preparednessLevels = PreparednessLevels;
}
