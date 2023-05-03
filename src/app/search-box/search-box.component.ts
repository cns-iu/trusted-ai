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

export interface JobEntry {
  name: string;
  // TODO: add more stuff
}

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
  ],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  @HostBinding('class') readonly clsName = 'trust-ai-search-box';

  /** Searchable nodes */
  @Input() jobs: JobEntry[] = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

  /** Disable autocomplete */
  @Input() autoCompleteDisabled = false;

  /** Emits an event any time the search changes */
  @Output() readonly search = new EventEmitter<string>();

  /** Emits the selected node */
  @Output() readonly jobSelected = new EventEmitter<JobEntry>();

  /** Input value control (State type: `string | JobEntry`) */
  readonly control = new FormControl('');

  /** Filtered nodes by current search */
  readonly filteredJobs = (() => {
    return this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterJobs(value || ''))
    );
  })();

  /** Text to highlight in search results */
  highlightText = '';

  /**
   * Displays node name
   *
   * @param node The node
   * @returns The node name
   */
  displayJobName(job: JobEntry): string {
    return job.name;
  }

  /**
   * Filters nodes by a search
   *
   * @param search Search text
   * @returns Filtered nodes
   */
  private filterJobs(search: string): JobEntry[] {
    const lsearch = search.toLowerCase();
    return this.jobs.filter((job) => job.name.toLowerCase().includes(lsearch));
  }
}
