import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { map, Observable, startWith, tap } from 'rxjs';

import { JobInfo } from '../pages/occupations-page/occupations-page.component';

/**
 * Search box which appears on the landing page
 */
@Component({
  selector: 'trust-ai-search-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit {
  /** Http client */
  private readonly http = inject(HttpClient);

  /** Angular router */
  private readonly router = inject(Router);

  /** Host binding */
  @HostBinding('class') readonly clsName = 'trust-ai-search-box';

  /** Disable autocomplete */
  @Input() autoCompleteDisabled = false;

  /** Search placeholder */
  @Input() placeholder = 'Job title, keywords';

  /** Emits an event any time the search changes */
  @Output() readonly search = new EventEmitter<string>();

  /** Emits the selected job */
  @Output() readonly jobSelected = new EventEmitter<string>();

  /** Job results */
  jobsResults: JobInfo[] = [];

  /** Alternate job title results */
  altJobsResults: JobInfo[] = [];

  /** Text to highlight in search results */
  highlightText = '';

  /** Input value control (State type: `string | string`) */
  readonly control = new FormControl('');

  /** Filtered jobs by current search */
  readonly filteredJobs = (() => {
    return this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterJobs(value || ''))
    );
  })();

  /**
   * Sets jobs on init
   */
  ngOnInit(): void {
    this.setJobs().forEach((obs) => obs.subscribe());
  }

  /**
   * Displays job name
   *
   * @param job The job
   * @returns The job name
   */
  displayJobName(job: string): string {
    return job;
  }

  /**
   * Filters jobs by a search
   *
   * @param search Search text
   * @returns Filtered jobs
   */
  filterJobs(search: string): string[] {
    const jobs = this.jobsResults.map((result) => result['Occupation']);
    const altJobs = this.altJobsResults.map((result) => result['Alt Title']);
    const combinedJobs = jobs.concat(altJobs);
    if (search.length > 2) {
      const combinedFilteredJobs = combinedJobs.filter((job) => job.toLowerCase().includes(search.toLowerCase()));
      return this.sortJobsByQuery(combinedFilteredJobs, search);
    } else {
      return [];
    }
  }

  /**
   * Sorts job titles by position the query matches
   * @param jobs Unsorted job title list
   * @param query Current search query
   * @returns sorted job list
   */
  private sortJobsByQuery(jobs: string[], query: string) {
    return jobs.sort((a, b) => {
      return a.toLowerCase().indexOf(query) > b.toLowerCase().indexOf(query) ? 1 : -1;
    });
  }

  /**
   * Sets lists of jobs and alternate job titles
   * @returns Observables
   */
  setJobs(): Observable<string>[] {
    const jobsObs = this.http.get('assets/data/index.json', { responseType: 'text' }).pipe(
      tap((result) => {
        this.jobsResults = JSON.parse(result);
      })
    );
    const jobsAltObs = this.http.get('assets/data/alt_titles.json', { responseType: 'text' }).pipe(
      tap((result) => {
        this.altJobsResults = JSON.parse(result);
      })
    );
    return [jobsObs, jobsAltObs];
  }

  /**
   * Loads profile when search result is selected
   * @param job
   */
  loadProfile(job: string): void {
    const code =
      this.jobsResults.find((result) => result.Occupation === job)?.Code ||
      this.altJobsResults.find((result) => result['Alt Title'] === job)?.Code;
    this.router.navigate(['/profile', { code: code }]);
  }
}
