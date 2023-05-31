import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { parse } from 'papaparse';
import { Observable, tap } from 'rxjs';
import { OccupationsListingsComponent } from 'src/app/occupations-listings/occupations-listings.component';
import { OccupationsSearchAreaComponent } from 'src/app/occupations-search-area/occupations-search-area.component';

export interface SearchFilters {
  [key: string]: string;
}

export interface JobInfo {
  Code: string;
  'Data-level': string;
  'Job Zone': string;
  Occupation: string;
}

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
  private readonly http = inject(HttpClient);

  allJobs: JobInfo[] = [];

  filteredJobs: JobInfo[] = [];

  currentFilters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
    preparednessLevel: '0',
  };

  ngOnInit(): void {
    this.setJobs().subscribe();
  }

  setJobs(): Observable<unknown> {
    return this.http.get('assets/All_Occupations.csv', { responseType: 'text' }).pipe(
      tap((result) => {
        const parsedResult = parse<JobInfo>(result, { header: true }).data;
        this.allJobs = parsedResult;
        this.filterJobs(this.currentFilters);
      })
    );
  }

  filterJobs(filters: SearchFilters): void {
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

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
