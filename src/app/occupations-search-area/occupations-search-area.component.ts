import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { SearchFilters } from '../pages/occupations-page/occupations-page.component';

@Component({
  selector: 'trust-ai-occupations-search-area',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonToggleModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './occupations-search-area.component.html',
  styleUrls: ['./occupations-search-area.component.scss'],
})
export class OccupationsSearchAreaComponent {
  /** Search filters */
  @Input() filters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
    preparednessLevel: '0',
  };

  /** Emits updated filters when a filter is changed */
  @Output() readonly filtersChanged = new EventEmitter<SearchFilters>();

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
}
