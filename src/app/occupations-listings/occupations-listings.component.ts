import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CareerCardComponent } from '../career-card/career-card.component';
import { JobInfo } from '../pages/occupations-page/occupations-page.component';

/** List of occupations */
@Component({
  selector: 'trust-ai-occupations-listings',
  standalone: true,
  imports: [CommonModule, CareerCardComponent, InfiniteScrollModule],
  templateUrl: './occupations-listings.component.html',
  styleUrls: ['./occupations-listings.component.scss'],
})
export class OccupationsListingsComponent implements OnChanges {
  /** Jobs to be displayed in the list */
  @Input() allJobs: JobInfo[] | null | undefined = [];

  /** Emits job info when occupation is clicked */
  @Output() jobClicked = new EventEmitter<JobInfo>();

  /** Jobs to display */
  jobsToDisplay: JobInfo[] = [];

  /** Current length of the jobs list */
  currentLength = 50;

  /**
   * Updates job list on changes
   */
  ngOnChanges() {
    if (this.allJobs) {
      this.jobsToDisplay = this.allJobs.slice(0, this.currentLength);
    }
  }

  /**
   * Adds more jobs to display if user scrolls down enough
   */
  onScrollDown() {
    this.currentLength += 50;
    if (this.allJobs) {
      this.jobsToDisplay = this.allJobs.slice(0, this.currentLength);
    }
  }
}
