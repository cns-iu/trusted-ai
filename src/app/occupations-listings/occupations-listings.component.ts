import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CareerCardComponent } from '../career-card/career-card.component';
import { JobInfo } from '../pages/occupations-page/occupations-page.component';

@Component({
  selector: 'trust-ai-occupations-listings',
  standalone: true,
  imports: [CommonModule, CareerCardComponent],
  templateUrl: './occupations-listings.component.html',
  styleUrls: ['./occupations-listings.component.scss'],
})
export class OccupationsListingsComponent {
  @Input() allJobs: JobInfo[] | null | undefined = [];

  @Output() jobClicked = new EventEmitter<JobInfo>();
}
