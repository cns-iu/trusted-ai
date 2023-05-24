import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { map, startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
    RouterModule,
  ],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  @HostBinding('class') readonly clsName = 'trust-ai-search-box';

  /** Searchable jobs */
  @Input() jobs: string[] = ['One', 'Two', 'Three'];

  /** Disable autocomplete */
  @Input() autoCompleteDisabled = false;

  /** Emits an event any time the search changes */
  @Output() readonly search = new EventEmitter<string>();

  /** Emits the selected job */
  @Output() readonly jobSelected = new EventEmitter<string>();

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
}
