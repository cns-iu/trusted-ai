import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

import { WorkTasks } from '../pages/profile-page/profile-page.component';
import { MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'trust-ai-work-tasks-list',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './work-tasks-list.component.html',
  styleUrls: ['./work-tasks-list.component.scss'],
})
export class WorkTasksListComponent implements DoCheck {
  @Input() tasks: WorkTasks[] = [];

  @Input() showAll = false;

  @Output() showAllButtonClick = new EventEmitter();

  @Input() selection = '0';

  @Output() readonly selectionChanged = new EventEmitter<string>();

  tasksShown: WorkTasks[] = [];

  ngDoCheck(): void {
    this.tasksShown = this.showAll ? this.tasks : this.tasks.slice(0, 3);
  }

  filtersChange(event: MatButtonToggleChange) {
    this.selection = event.value;
    if (event.value === '0') {
      this.tasks.sort((a, b) => b.importance - a.importance);
    } else {
      this.tasks.sort((a, b) => b.relevance - a.relevance);
    }
  }
}
