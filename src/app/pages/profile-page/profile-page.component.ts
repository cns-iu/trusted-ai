import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PreparednessLevels } from 'src/app/career-card/career-card.component';
import { ProfileEmploymentComponent } from 'src/app/profile-employment/profile-employment.component';
import { ProfileOccupationProjectionComponent } from 'src/app/profile-occupation-projection/profile-occupation-projection.component';
import { ProfileSalaryComponent } from 'src/app/profile-salary/profile-salary.component';
import { ProfileTechnologySkillsComponent } from 'src/app/profile-technology-skills/profile-technology-skills.component';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';
import { WorkTasksListComponent } from 'src/app/work-tasks-list/work-tasks-list.component';

/** Queried job data format */
export interface AllJobInfo {
  /** Job data value */
  [key: string]: unknown;
  /** List of alternative job titles */
  alt_titles: string[];
  /** Job zone (preparedness level) */
  job_zone: number;
  /** List of technology skills */
  tech_skills: TechSkill[];
  /** List of work tasks */
  work_tasks: WorkTasks[];
  /** List of state salary info */
  salary_states: SalaryInfo[];
  /** List of national salary info */
  salary_nat: SalaryInfo[];
  /** List of industry salary info */
  salary_ind: SalaryInfo[];
  projections: ProjectionInfo[];
  employed_nat: number;
  employed_10_nat: number;
  per_change_10_nat: number;
  bright_futures: string;
  automation_risk: string;
  near_future: string;
}

/** Info on a technology skill */
export interface TechSkill {
  /** Name of skill */
  commodity_title: string;
  /** Example of skill */
  example: string;
}

/** Info on work tasks */
export interface WorkTasks {
  /** Name of task */
  task: string;
  /** Importance of task */
  importance: number;
  /** Relevance of task */
  relevance: number;
}

/** Info on salary */
export interface SalaryInfo {
  /** Avg annual salary at 10th percentile */
  a_pct10?: number;
  /** Avg annual salary at 25th percentile */
  a_pct25?: number;
  /** Avg annual salary at 50th percentile */
  a_median?: number;
  /** Avg annual salary at 75th percentile */
  a_pct75?: number;
  /** Avg annual salary at 90th percentile */
  a_pct90?: number;
  /** State name */
  place_name?: string;
  /** Year of data */
  year?: number;
  /** Annual mean salary */
  a_mean?: number | null;
  /** Industry name */
  industry_name?: string;
  /** Total employment */
  tot_emp?: number;
}

export interface ProjectionInfo {
  industry_title?: string;
  employed?: number;
  employed_10?: number;
  per_change_10?: number;
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
    ProfileEmploymentComponent,
    ProfileOccupationProjectionComponent,
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
  currentJobInfo: AllJobInfo = {
    alt_titles: [],
    job_zone: 1,
    tech_skills: [],
    work_tasks: [],
    salary_states: [],
    salary_nat: [],
    salary_ind: [],
    projections: [],
    employed_nat: 0,
    employed_10_nat: 0,
    per_change_10_nat: 0,
    bright_futures: '',
    automation_risk: '',
    near_future: '',
  };
  /** Tech skills for the job (each pair = type of tech, list of examples for that tech)  */
  techSkills: [string, string[]][] = [];
  /** Work tasks list */
  workTasks: WorkTasks[] = [];
  /** Salary states info */
  salaryStatesInfo: SalaryInfo[] = [];
  /** Salary national info */
  salaryNatInfo: SalaryInfo[] = [];
  /** Salary industry info */
  salaryIndInfo: SalaryInfo[] = [];
  /** Whether or not all work tasks should be displayed */
  showAllTasks = false;
  /** Whether or not all technology skills should be displayed */
  showAllSkills = false;
  projectionInfo: ProjectionInfo[] = [];

  outlookDescription: Record<string, string> = {
    Bright: 'Many job openings predicted in the near future',
    Average: 'Average outlook',
    'Below Average': 'Below average outlook',
  };

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
   * Observable for fetching profile data from job code
   * @param code Job code
   * @returns Observable
   */
  private getData(code: string): Observable<unknown> {
    return this.http.get(`assets/profiles/${code}/metadata.json`, { responseType: 'text' }).pipe(
      tap((result) => {
        this.currentJobInfo = JSON.parse(result);
        console.log(this.currentJobInfo);
        if (this.currentJobInfo['tech_skills']) {
          this.setSkillsGrouping(this.currentJobInfo['tech_skills']);
        }
        if (this.currentJobInfo['salary_states']) {
          this.salaryStatesInfo = this.currentJobInfo['salary_states'];
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
        if (this.currentJobInfo['projections']) {
          this.projectionInfo = this.currentJobInfo['projections'];
          this.projectionInfo.push({
            industry_title: 'National average',
            employed: this.currentJobInfo['employed_nat'],
            employed_10: this.currentJobInfo['employed_10_nat'],
            per_change_10: this.currentJobInfo['per_change_10_nat'],
          });
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

  /**
   * Toggles showing all work tasks
   */
  showAllWorkTasksButtonClicked(): void {
    this.showAllTasks = !this.showAllTasks;
  }

  automationDescription(): string {
    if (this.currentJobInfo['automation_risk']) {
      return `This job has a ${this.currentJobInfo['automation_risk'].toLowerCase()} risk of automation.`;
    } else {
      return 'No data';
    }
  }
}
