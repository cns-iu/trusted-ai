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
  private readonly dialog = inject(MatDialog);

  /** Search filters */
  @Input() filters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
    preparednessLevel: '0',
  };

  @Input() menuListItems: string[] = [];

  @Input() sortBy = '';

  @Input() numJobs = '0';

  /** Emits updated filters when a filter is changed */
  @Output() readonly filtersChanged = new EventEmitter<SearchFilters>();
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

  clickMenuItem(item: string) {
    this.sortBy = item;
    this.sortChanged.emit(item);
  }
}

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
  private readonly dialogRef = inject(MatDialogRef<FiltersMobileDialogComponent>);
  private readonly data: SearchFilters = inject(MAT_DIALOG_DATA);

  filters: SearchFilters = this.data;

  filtersChange(field: string, event: MatButtonToggleChange) {
    this.filters[field] = event.value;
  }

  cancelClick() {
    this.dialogRef.close();
  }

  submitClick() {
    this.dialogRef.close(this.filters);
  }
}
