import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

/**
 * Technology skills list of job profile
 */
@Component({
  selector: 'trust-ai-profile-technology-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-technology-skills.component.html',
  styleUrls: ['./profile-technology-skills.component.scss'],
})
export class ProfileTechnologySkillsComponent implements DoCheck {
  /** All job skills */
  @Input() allSkills: [string, string[]][] = [];

  /** If all skills should be shown */
  @Input() showAll = false;

  /** Emits when show all is clicked */
  @Output() showAllButtonClick = new EventEmitter();

  /** Job skills that are currently displayed */
  skillsShown: [string, string[]][] = [];

  /** Updates displayed skills whenever the list of skills or the show all setting is changed */
  ngDoCheck() {
    this.skillsShown = this.showAll ? this.allSkills : this.allSkills.slice(0, 3);
  }
}
