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
  @Input() filters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
    preparednessLevel: '0',
  };

  @Output() readonly filtersChanged = new EventEmitter<SearchFilters>();

  filtersChange(field: string, event: MatButtonToggleChange) {
    this.filters[field] = event.value;
    this.filtersChanged.emit(this.filters);
  }

  inputChange(event: Event) {
    this.filters['searchTerm'] = (event.target as HTMLInputElement).value;
    this.filtersChanged.emit(this.filters);
  }
}
