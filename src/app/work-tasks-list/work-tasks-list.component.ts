import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { WorkTasks } from '../pages/profile-page/profile-page.component';

/**
 * Work tasks section of job profile
 */
@Component({
  selector: 'trust-ai-work-tasks-list',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './work-tasks-list.component.html',
  styleUrls: ['./work-tasks-list.component.scss'],
})
export class WorkTasksListComponent implements DoCheck {
  /** List of all tasks */
  @Input() tasks: WorkTasks[] = [];

  /** Whether to show all tasks or not */
  @Input() showAll = false;

  /** List type selected (0 = importance, 1 = frequency) */
  @Input() selection = '0';

  /** Emits when show all is clicked */
  @Output() showAllButtonClick = new EventEmitter();

  /** Emits when list selection changed */
  @Output() readonly selectionChanged = new EventEmitter<string>();

  /** Currently visible tasks */
  tasksShown: WorkTasks[] = [];

  /**
   * Updates and sorts list of shown tasks when selection changes
   */
  ngDoCheck(): void {
    if (this.selection === '0') {
      this.tasks.sort((a, b) => b.importance - a.importance);
    } else {
      this.tasks.sort((a, b) => b.relevance - a.relevance);
    }
    this.tasksShown = this.showAll ? this.tasks : this.tasks.slice(0, 3);
  }

  /**
   * Sets current selection to value
   * @param event
   */
  selectionChange(event: MatButtonToggleChange) {
    this.selection = event.value;
  }

  /**
   * Returns task category from importance value
   * @param value Importance value
   * @returns Category name
   */
  importanceCategory(value: number): string {
    if (value > 4) {
      return 'high';
    }
    if (value > 3.5 && value <= 4) {
      return 'med';
    }
    if (value > 3 && value <= 3.5) {
      return 'low';
    } else {
      return 'lowest';
    }
  }

  /**
   * Returns frequency category from frequency value
   * @param value Frequency value
   * @returns Category name
   */
  frequencyCategory(value: number): string {
    if (value > 75) {
      return 'high';
    }
    if (value > 50 && value <= 75) {
      return 'med';
    }
    if (value > 25 && value <= 50) {
      return 'low';
    } else {
      return 'lowest';
    }
  }

  /**
   * Rounds frequency value to nearest integer
   * @param value Frequency value
   * @returns Rounded value
   */
  roundFrequency(value: number): number {
    return Math.round(value);
  }
}
