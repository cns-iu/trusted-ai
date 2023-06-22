import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'trust-ai-profile-technology-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-technology-skills.component.html',
  styleUrls: ['./profile-technology-skills.component.scss'],
})
export class ProfileTechnologySkillsComponent implements DoCheck {
  @Input() allSkills: [string, string[]][] = [];

  s: [string, string[]][] = [];

  showAll = false;

  ngDoCheck() {
    this.s = this.showAll ? this.allSkills : this.allSkills.slice(0, 3);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
