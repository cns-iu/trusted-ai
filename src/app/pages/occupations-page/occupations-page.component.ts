import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { OccupationsListingsComponent } from 'src/app/occupations-listings/occupations-listings.component';
import { OccupationsSearchAreaComponent } from 'src/app/occupations-search-area/occupations-search-area.component';

/** Search filter data layout */
export interface SearchFilters {
  /** Filter value */
  [key: string]: string;
}

/** Job info from csv */
export interface JobInfo {
  [key: string]: string;
  /** Job code */
  Code: string;
  /** Data level */
  'Data-level': string;
  /** Preparedness level */
  'Job Zone': string;
  /** Job title */
  Occupation: string;
  /** Alternate job title */
  'Alt Title': string;
}

/**
 * Occupations page component
 */
@Component({
  selector: 'trust-ai-occupations-page',
  standalone: true,
  imports: [
    CommonModule,
    OccupationsListingsComponent,
    OccupationsSearchAreaComponent,
    HttpClientModule,
    MatButtonModule,
  ],
  templateUrl: './occupations-page.component.html',
  styleUrls: ['./occupations-page.component.scss'],
})
export class OccupationsPageComponent implements OnInit {
  /** Http client */
  private readonly http = inject(HttpClient);

  /** Angular router */
  private readonly router = inject(Router);

  /** Main job list */
  jobsResults: JobInfo[] = [];

  /** Alternate job title list  */
  altJobsResults: JobInfo[] = [];

  /** List of filtered jobs */
  filteredJobs: JobInfo[] = [];

  /** Current search filters */
  currentFilters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
    preparednessLevel: '0',
  };

  /** Sort menu items */
  menuListItems = [
    'Job Title: A - Z',
    'Job Title: Z - A',
    'Code: Low - High',
    'Code: High - Low',
    'Preparedness Level: 1 - 5',
    'Preparedness Level: 5 - 1',
  ];

  /** Current sort setting */
  sortBy = this.menuListItems[0];

  /** Subscribes to setJobs on init */
  ngOnInit(): void {
    this.setJobs().forEach((obs) => obs.subscribe());
  }

  /**
   * Converts csv to job entries and updates the shown list when filter is changed, also fetches alternate job title data
   * @returns Observables
   */
  setJobs(): Observable<string>[] {
    const jobsObs = this.http.get('assets/data/index.json', { responseType: 'text' }).pipe(
      tap((result) => {
        this.jobsResults = JSON.parse(result);
        this.filterJobs(this.currentFilters);
      })
    );
    const jobsAltObs = this.http.get('assets/data/alt_titles.json', { responseType: 'text' }).pipe(
      tap((result) => {
        this.altJobsResults = JSON.parse(result);
      })
    );
    return [jobsObs, jobsAltObs];
  }

  /** Filters list of jobs based on search filters */
  filterJobs(filters: SearchFilters): void {
    this.currentFilters = filters;
    this.filteredJobs = this.jobsResults
      .filter((job) =>
        job['Occupation']
          ? job['Occupation'].toLowerCase().includes(filters['searchTerm'].toLowerCase()) ||
            job['Code'].includes(filters['searchTerm'])
          : false
      )
      .filter(
        (job) => filters['preparednessLevel'] === '0' || job['Job Zone'].toString() === filters['preparednessLevel']
      );
    this.sortJobs(this.sortBy);
  }

  /**
   * Sorts jobs by criteria
   * @param sortBy Sort selection
   */
  sortJobs(sortBy: string): void {
    this.sortBy = sortBy;
    switch (sortBy) {
      case 'Job Title: A - Z':
        this.sort('Occupation', 0);
        break;
      case 'Job Title: Z - A':
        this.sort('Occupation', 1);
        break;
      case 'Code: Low - High':
        this.sort('Code', 0);
        break;
      case 'Code: High - Low':
        this.sort('Code', 1);
        break;
      case 'Preparedness Level: 1 - 5':
        this.sort('Job Zone', 0);
        break;
      case 'Preparedness Level: 5 - 1':
        this.sort('Job Zone', 1);
        break;
    }
  }

  /** Sorts current displayed jobs by category and direction */
  private sort(category: string, direction: number) {
    this.filteredJobs.sort((a, b) => {
      const x = a[category],
        y = b[category];
      if (direction === 0) {
        return x == y ? 0 : x > y ? 1 : -1;
      } else {
        return x == y ? 0 : x < y ? 1 : -1;
      }
    });
    this.filteredJobs = [
      ...new Set([...this.filteredJobs, ...this.findMatchingJobs(this.currentFilters['searchTerm'])]),
    ];
  }

  /**
   * Finds entries in the main jobs list that match an alternate job title search
   * @param query Search query
   * @returns matching jobs
   */
  private findMatchingJobs(query: string): JobInfo[] {
    const matchingAlts = this.altJobsResults.filter((result) =>
      result['Alt Title'].toLowerCase().includes(query.toLowerCase())
    );
    const matchingCodes = new Set(matchingAlts.map((alt) => alt.Code));
    return this.jobsResults.filter((result) => matchingCodes.has(result.Code));
  }

  /** Scrolls to top of page */
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  /** Loads job profile */
  loadProfile(job: JobInfo): void {
    this.router.navigate(['/profile', { code: job.Code }]);
  }
}
