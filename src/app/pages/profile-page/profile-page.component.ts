import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PreparednessLevels } from 'src/app/career-card/career-card.component';
import { ProfileEmploymentComponent } from 'src/app/profile-employment/profile-employment.component';
import { ProfileOccupationProjectionComponent } from 'src/app/profile-occupation-projection/profile-occupation-projection.component';
import { ProfileSalaryComponent } from 'src/app/profile-salary/profile-salary.component';
import { ProfileTechnologySkillsComponent } from 'src/app/profile-technology-skills/profile-technology-skills.component';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';
import { TreemapComponent } from 'src/app/treemap/treemap.component';
import { WorkTasksListComponent } from 'src/app/work-tasks-list/work-tasks-list.component';

/** Queried job data format */
export interface AllJobInfo {
  /** Job id */
  soc_id?: string;
  /** Job title */
  title?: string;
  /** Job description */
  descr?: string;
  /** List of alternative job titles */
  alt_titles?: string[];
  /** Abilities treemap data */
  behaviors_abilities?: TreemapData[];
  /** Work activities treemap data */
  behaviors_work_activities?: TreemapData[];
  /** Skills treemap data */
  behaviors_skills?: TreemapData[];
  /** Knowledge treemap data */
  behaviors_knowledge?: TreemapData[];
  /** Job zone (preparedness level) */
  job_zone?: number;
  /** Preparedness education */
  education?: string;
  /** Preparedness related experience */
  experience?: string;
  /** Prepardness job training */
  job_training?: string;
  /** Preparedness examples */
  example?: string;
  /** Preparedness SVP description */
  svp_desc?: string;
  /** Preparedness SVP range */
  svp_range?: string;
  /** List of work tasks */
  work_tasks?: WorkTasks[];
  /** List of technology skills */
  tech_skills?: TechSkill[];
  /** List of state salary info */
  salary_states?: SalaryInfo[];
  /** List of national salary info */
  salary_nat?: SalaryInfo[];
  /** List of industry salary info */
  salary_ind?: SalaryInfo[];
  /** List of industry projection data */
  projections?: ProjectionInfo[];
  /** National employed total */
  employed_nat?: number;
  /** Projected national employed total */
  employed_10_nat?: number;
  /** National percent change */
  per_change_10_nat?: number;
  /** Bright future status */
  bright_futures?: string;
  /** Automation risk projection */
  automation_risk?: string;
  /** Near term outlook */
  near_future?: string;
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
  /** Alternate job id */
  soc_id_alt?: string;
  /** Alternate job title */
  title_id_alt?: string;
}

/** Info on salary */
export interface SalaryInfo {
  /** Job data value */
  [key: string]: unknown;
  /** Industry name */
  industry_name?: string;
  /** State name */
  place_name?: string;
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
  /** Annual mean salary */
  a_mean?: number | null;
  /** Avg hourly salary at 10th percentile */
  h_pct10?: number;
  /** Avg hourly salary at 25th percentile */
  h_pct25?: number;
  /** Avg hourly salary at 50th percentile */
  h_median?: number;
  /** Avg hourly salary at 75th percentile */
  h_pct75?: number;
  /** Avg hourly salary at 90th percentile */
  h_pct90?: number;
  /** Hourly mean salary */
  h_mean?: number | null;
  /** Year of data */
  year?: number;
  /** Total employment */
  tot_emp?: number;
}

/** Treemap data entry */
export interface TreemapData {
  /** Job id */
  soc_id: string;
  /** Element name */
  element_name: string;
  /** Parent group */
  sub_group: string;
  /** Highest level group */
  group: string;
  /** Level of element */
  level: number;
  /** x0 coordinate */
  x0: number;
  /** y0 coordinate */
  y0: number;
  /** x1 coordinate */
  x1: number;
  /** y1 coordinate */
  y1: number;
  /** Importance rating */
  importance_size: number;
  /** Proficiency level */
  level_col: number;
  /** Min value */
  min_anchor_val: number;
  /** Someone who is capable of the min */
  min_anchor_descr: string;
  /** Max value */
  max_anchor_val: number;
  /** Someone who is capable of the max */
  max_anchor_descr: string;
}

/** Occupation projection info */
export interface ProjectionInfo {
  /** Industry title */
  industry_title: string;
  /** Number employed in industry */
  employed?: number;
  /** Projected number employed in 10 years */
  employed_10?: number;
  /** Percent employment change in 10 years */
  per_change_10?: number;
}

/** Outlook descriptions */
const outlookDescriptions: Record<string, string> = {
  Bright: 'Many job openings predicted in the near future',
  Average: 'Average outlook',
  'Below Average': 'Below average outlook',
};

/** Type of entries from salary data that are used for visualizations */
export type SalaryDataType = 'annual' | 'hourly' | 'emp';

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
    TreemapComponent,
    MatTabsModule,
    ProfileOccupationProjectionComponent,
    MatBadgeModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  /** Scrolls to top of page */
  private readonly route = inject(ActivatedRoute);

  /** Http client */
  private readonly http = inject(HttpClient);

  /** Treemap1 element */
  @ViewChild('treemap1') treemap1: TreemapComponent = new TreemapComponent();

  /** Treemap2 element */
  @ViewChild('treemap2') treemap2: TreemapComponent = new TreemapComponent();

  /** Treemap3 element */
  @ViewChild('treemap3') treemap3: TreemapComponent = new TreemapComponent();

  /** Treemap4 element */
  @ViewChild('treemap4') treemap4: TreemapComponent = new TreemapComponent();

  /** Current job info */
  currentJobInfo: AllJobInfo = {};

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

  /** Work Activities data */
  treemapWorkActivitiesData: TreemapData[] = [];

  /** Skills data */
  treemapSkillsData: TreemapData[] = [];

  /** Knowledge data */
  treemapKnowledgeData: TreemapData[] = [];

  /** Abilities data */
  treemapAbilitiesData: TreemapData[] = [];

  /** Whether all treemap data is missing */
  noTreemap = false;

  /** Occupation projection data */
  projectionInfo: ProjectionInfo[] = [];

  /** Type of national salary data chosen */
  salaryNatSelection: SalaryDataType = 'annual';

  /** Type of state salary data chosen */
  salaryStatesSelection: SalaryDataType = 'annual';

  /** Type of industry salary data chosen */
  salaryIndSelection: SalaryDataType = 'annual';

  /**
   * Gets automation description
   */
  get automationDescription(): string {
    if (this.currentJobInfo.automation_risk) {
      return `This job has a ${this.currentJobInfo.automation_risk.toLowerCase()} risk of automation.`;
    } else {
      return 'No data';
    }
  }

  /**
   * Gets outlook description
   */
  get outlookDescription(): string {
    return this.currentJobInfo.near_future
      ? this.currentJobInfo.near_future
      : outlookDescriptions[this.currentJobInfo.bright_futures || ''] || 'No data';
  }

  /**
   * Scrolls to top of page and fetches profile data on init
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getData(params['code']).subscribe();
      this.showAllSkills = false;
    });
  }

  /**
   * Determines whether the dataset has any relevant data from 2022
   * @param dataset Data
   * @param type Type of data
   * @returns true if empty
   */
  isEmpty(dataset: SalaryInfo[], type: SalaryDataType): boolean {
    let parameter: string;
    switch (type) {
      case 'annual':
        parameter = 'a_mean';
        break;
      case 'hourly':
        parameter = 'h_mean';
        break;
      case 'emp':
        parameter = 'tot_emp';
        break;
    }
    return dataset.filter((value) => value.year === 2022).filter((entry) => entry[parameter]).length === 0;
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
        const {
          tech_skills,
          salary_states,
          salary_nat,
          salary_ind,
          work_tasks,
          behaviors_work_activities,
          behaviors_skills,
          behaviors_knowledge,
          behaviors_abilities,
          projections,
          employed_nat,
          employed_10_nat,
          per_change_10_nat,
        } = this.currentJobInfo;

        if (tech_skills) {
          this.setSkillsGrouping(tech_skills);
        }
        if (salary_states) {
          this.salaryStatesInfo = salary_states;
        }
        if (salary_nat) {
          this.salaryNatInfo = salary_nat;
        }
        if (salary_ind) {
          this.salaryIndInfo = salary_ind;
        }
        if (work_tasks) {
          this.workTasks = work_tasks;
        }
        if (behaviors_work_activities) {
          this.treemapWorkActivitiesData = behaviors_work_activities;
        }
        if (behaviors_skills) {
          this.treemapSkillsData = behaviors_skills;
        }
        if (behaviors_knowledge) {
          this.treemapKnowledgeData = behaviors_knowledge;
        }
        if (behaviors_abilities) {
          this.treemapAbilitiesData = behaviors_abilities;
        }
        if (!behaviors_abilities && !behaviors_knowledge && !behaviors_skills && !behaviors_work_activities) {
          this.noTreemap = true;
        }
        if (projections) {
          this.projectionInfo = projections;
          this.projectionInfo.push({
            industry_title: 'National average',
            employed: employed_nat,
            employed_10: employed_10_nat,
            per_change_10: per_change_10_nat,
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

  /**
   * Refreshs all treemaps
   */
  refreshTreemaps(): void {
    [this.treemap1, this.treemap2, this.treemap3, this.treemap4].forEach((treemap) => {
      if (treemap) {
        treemap.reload();
      }
    });
  }
}
