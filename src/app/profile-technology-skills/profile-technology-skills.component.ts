import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'trust-ai-profile-technology-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-technology-skills.component.html',
  styleUrls: ['./profile-technology-skills.component.scss'],
})
export class ProfileTechnologySkillsComponent implements DoCheck {
  @Input() allSkills: [string, string[]][] = [];

  @Input() showAll = false;

  @Output() showAllButtonClick = new EventEmitter();

  skillsShown: [string, string[]][] = [];

  ngDoCheck() {
    this.skillsShown = this.showAll ? this.allSkills : this.allSkills.slice(0, 3);
  }
}
