import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PreparednessLevels } from 'src/app/career-card/career-card.component';
import { ProfileSalaryComponent } from 'src/app/profile-salary/profile-salary.component';
import { ProfileTechnologySkillsComponent } from 'src/app/profile-technology-skills/profile-technology-skills.component';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';
import { WorkTasksListComponent } from 'src/app/work-tasks-list/work-tasks-list.component';

/** Queried job data format */
export interface AllJobInfo {
  /** Job data value */
  [key: string]: unknown;
  /** List of alternative job titles */
  alt_titles?: string[];
  /** Job zone (preparedness level) */
  job_zone?: number;
  /** List of technology skills */
  tech_skills?: TechSkill[];
  work_tasks?: WorkTasks[];
  salary?: SalaryInfo[];
  salary_nat?: SalaryInfo[];
  salary_ind?: SalaryInfo[];
}

/** Info on a technology skill */
export interface TechSkill {
  /** Name of skill */
  commodity_title: string;
  /** Example of skill */
  example: string;
}

export interface WorkTasks {
  task: string;
  importance: number;
  relevance: number;
}

export interface SalaryInfo {
  [key: string]: unknown;
}

/**
 * Profile page component
 */
@Component({
  selector: 'trust-ai-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    SearchBoxComponent,
    ProfileTechnologySkillsComponent,
    ProfileSalaryComponent,
    WorkTasksListComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  /** Scrolls to top of page */
  private readonly route = inject(ActivatedRoute);
  /** Http client */
  private readonly http = inject(HttpClient);

  /** Current job info */
  currentJobInfo: AllJobInfo = {};

  /** Tech skills for the job (each pair = type of tech, list of examples for that tech)  */
  techSkills: [string, string[]][] = [];

  workTasks: WorkTasks[] = [];

  /** Whether or not all technology skills should be displayed */
  showAllSkills = false;

  salaryInfo: SalaryInfo[] = [];
  salaryNatInfo: SalaryInfo[] = [];
  salaryIndInfo: SalaryInfo[] = [];

  showAllTasks = false;

  /**
   * Scrolls to top of page and fetches profile data on init
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.scrollToTop();
      this.getData(params['code']).subscribe();
      this.showAllSkills = false;
    });
  }

  /**
   * Observable for fetching profile data for job code
   * @param code Job code
   * @returns Observable
   */
  private getData(code: string): Observable<unknown> {
    return this.http.get(`assets/profiles/${code}/metadata.json`, { responseType: 'text' }).pipe(
      tap((result) => {
        this.currentJobInfo = JSON.parse(result);
        if (this.currentJobInfo['tech_skills']) {
          this.setSkillsGrouping(this.currentJobInfo['tech_skills']);
        }

        if (this.currentJobInfo['salary']) {
          this.salaryInfo = this.currentJobInfo['salary'];
        }

        if (this.currentJobInfo['salary_nat']) {
          this.salaryNatInfo = this.currentJobInfo['salary_nat'];
        }

        if (this.currentJobInfo['salary_ind']) {
          this.salaryIndInfo = this.currentJobInfo['salary_ind'];
        }
        if (this.currentJobInfo['work_tasks']) {
          this.workTasks = this.currentJobInfo['work_tasks'];
        }
      })
    );
  }

  /**
   * Processes technology skills data into format usable by the technology skills list component
   * @param skills Technology skills list
   */
  private setSkillsGrouping(skills: TechSkill[]) {
    const skillsGroup: Record<string, Set<string>> = {};
    for (const skill of skills) {
      const title = skill.commodity_title;
      if (skillsGroup[title]) {
        skillsGroup[title].add(skill.example);
      } else {
        const newGroup = new Set<string>();
        newGroup.add(skill.example);
        skillsGroup[title] = newGroup;
      }
    }
    this.techSkills = Object.entries(skillsGroup).map((entry) => [entry[0], Array.from(entry[1])]);
  }

  /** Scrolls to top of page */
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  /**
   * Returns preparednesslevel description
   * @param level preparedness level
   * @returns preparedness level description
   */
  preparednessLevel(level: number): string {
    return PreparednessLevels[level];
  }

  /**
   * Toggles showing all technology skills
   */
  showAllTechnologyButtonClicked(): void {
    this.showAllSkills = !this.showAllSkills;
  }

  showAllWorkTasksButtonClicked(): void {
    this.showAllTasks = !this.showAllTasks;
  }
}
