import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { SearchFilters } from '../pages/occupations-page/occupations-page.component';

/** Occupations page search component */
@Component({
  selector: 'trust-ai-occupations-search-area',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
  ],
  templateUrl: './occupations-search-area.component.html',
  styleUrls: ['./occupations-search-area.component.scss'],
})
export class OccupationsSearchAreaComponent {
  /** MatDialog service */
  private readonly dialog = inject(MatDialog);

  /** Search filters */
  @Input() filters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
    preparednessLevel: '0',
  };

  /** List of options in the sort menu */
  @Input() menuListItems: string[] = [];

  /** Selected sorting method */
  @Input() sortBy = '';

  /** Number of jobs being displayed in the occupations list */
  @Input() numJobs = '0';

  /** Emits updated filters when a filter is changed */
  @Output() readonly filtersChanged = new EventEmitter<SearchFilters>();

  /** Emits selected sort option */
  @Output() readonly sortChanged = new EventEmitter<string>();

  /** Handles when a button toggle is changed */
  filtersChange(field: string, event: MatButtonToggleChange) {
    this.filters[field] = event.value;
    this.filtersChanged.emit(this.filters);
  }

  /** Handles when search term is changed */
  inputChange(event: Event) {
    this.filters['searchTerm'] = (event.target as HTMLInputElement).value;
    this.filtersChanged.emit(this.filters);
  }

  /**
   * Opens dialog for mobile filters
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(FiltersMobileDialogComponent, {
      data: { ...this.filters },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filters = result;
        this.filtersChanged.emit(this.filters);
      } else {
        return;
      }
    });
  }

  /**
   * Handles when sort selection is made
   * @param item selection
   */
  clickMenuItem(item: string) {
    this.sortBy = item;
    this.sortChanged.emit(item);
  }
}

/**
 * Filters dialog which appears only on mobile
 */
@Component({
  selector: 'trust-ai-filters-mobile-dialog',
  templateUrl: 'filters-mobile-dialog.html',
  styleUrls: ['filters-mobile-dialog.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
})
export class FiltersMobileDialogComponent {
  /** Mat Dialog reference */
  private readonly dialogRef = inject(MatDialogRef<FiltersMobileDialogComponent>);

  /**  Injected filter data */
  private readonly data: SearchFilters = inject(MAT_DIALOG_DATA);

  /** Current filters */
  filters: SearchFilters = this.data;

  /** Changes filter values */
  filtersChange(field: string, event: MatButtonToggleChange) {
    this.filters[field] = event.value;
  }

  /**
   * Closes dialog when cancel clicked
   */
  cancelClick() {
    this.dialogRef.close();
  }

  /**
   * Submits selected filters when submit clicked
   */
  submitClick() {
    this.dialogRef.close(this.filters);
  }
}
