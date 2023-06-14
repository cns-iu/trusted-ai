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
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  /** Host binding */
  @HostBinding('class') readonly clsName = 'trust-ai-search-box';

  /** Searchable jobs */
  @Input() jobs: string[] = [];

  /** Disable autocomplete */
  @Input() autoCompleteDisabled = false;

  @Input() placeholder = 'Job title, keywords';

  /** Emits an event any time the search changes */
  @Output() readonly search = new EventEmitter<string>();

  /** Emits the selected job */
  @Output() readonly jobSelected = new EventEmitter<string>();

  jobsResults: JobInfo[] = [];

  /** Input value control (State type: `string | string`) */
  readonly control = new FormControl('');

  /** Filtered jobs by current search */
  readonly filteredJobs = (() => {
    return this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterJobs(value || ''))
    );
  })();

  /** Text to highlight in search results */
  highlightText = '';

  ngOnInit(): void {
    this.setJobs().subscribe();
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
  private filterJobs(search: string): string[] {
    return this.jobs.filter((job) => job.toLowerCase().includes(search.toLowerCase()));
  }

  private setJobs(): Observable<unknown> {
    return this.http.get('assets/data/index.json', { responseType: 'text' }).pipe(
      tap((result) => {
        const parsedResult: JobInfo[] = JSON.parse(result);
        this.jobsResults = parsedResult;
        this.jobs = parsedResult.map((result) => result['Occupation']);
      })
    );
  }

  loadProfile(job: string): void {
    const code = this.jobsResults.find((result) => result.Occupation === job)?.Code;
    this.router.navigate(['/profile', { code: code }]);
  }
}
