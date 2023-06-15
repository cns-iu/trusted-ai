import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PreparednessLevels } from 'src/app/career-card/career-card.component';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';

/** Queried job data format */
export interface AllJobInfo {
  /** Job data value */
  [key: string]: unknown;
  /** List of alternative job titles */
  alt_titles?: string[];
  /** Job zone (preparedness level) */
  job_zone?: number;
}

/**
 * Profile page component
 */
@Component({
  selector: 'trust-ai-profile-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule, SearchBoxComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  /** Scrolls to top of page */
  private readonly route = inject(ActivatedRoute);

  /** Http client */
  private readonly http = inject(HttpClient);

  /** Scrolls to top of page */
  match: AllJobInfo = {};

  /**
   * Scrolls to top of page and fetches profile data on init
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.scrollToTop();
      this.getData(params['code']).subscribe();
    });
  }

  /**
   * Observable for fetching profile data for job code
   * @param code Job code
   * @returns Observable
   */
  private getData(code: string): Observable<unknown> {
    return this.http.get('assets/data/profile_data.json', { responseType: 'text' }).pipe(
      tap((result) => {
        const parsedResult: AllJobInfo[] = JSON.parse(result);
        const match = parsedResult.find((job) => job['soc_id'] === code);
        if (match) {
          this.match = match;
        }
      })
    );
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
}
