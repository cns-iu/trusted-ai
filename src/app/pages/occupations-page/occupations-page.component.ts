import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { parse } from 'papaparse';
import { Observable, tap } from 'rxjs';
import { OccupationsListingsComponent } from 'src/app/occupations-listings/occupations-listings.component';
import { OccupationsSearchAreaComponent } from 'src/app/occupations-search-area/occupations-search-area.component';

/** Search filter data layout */
export interface SearchFilters {
  [key: string]: string;
}

/** Job info from csv */
export interface JobInfo {
  /** Job code */
  Code: string;
  /** Data level */
  'Data-level': string;
  /** Preparedness level */
  'Job Zone': string;
  /** Job title */
  Occupation: string;
}

/**
 * Occupations page
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

  /** List of all jobs */
  allJobs: JobInfo[] = [];

  /** List of filtered jobs */
  filteredJobs: JobInfo[] = [];

  /** Current search filters */
  currentFilters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
    preparednessLevel: '0',
  };

  /** Subscribes to setJobs on init */
  ngOnInit(): void {
    this.setJobs().subscribe();
  }

  /** Converts csv to job entries and updates the shown list when filter is changed */
  setJobs(): Observable<unknown> {
    return this.http.get('assets/All_Occupations.csv', { responseType: 'text' }).pipe(
      tap((result) => {
        const parsedResult = parse<JobInfo>(result, { header: true }).data;
        this.allJobs = parsedResult;
        this.filterJobs(this.currentFilters);
      })
    );
  }

  /** Filters list of jobs based on search filters */
  filterJobs(filters: SearchFilters): void {
    this.currentFilters = filters;
    this.filteredJobs = this.allJobs
      .filter((job) =>
        job['Occupation']
          ? job['Occupation'].toLowerCase().includes(filters['searchTerm'].toLowerCase()) ||
            job['Code'].includes(filters['title'])
          : false
      )
      .filter((job) => filters['preparednessLevel'] === '0' || job['Job Zone'] === filters['preparednessLevel'])
      .filter((job) => filters['showOccupations'] === '0' || job['Data-level'] === 'Y');
  }

  /** Scrolls to top of page */
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
