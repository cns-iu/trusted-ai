import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';
import { PreparednessLevels } from 'src/app/career-card/career-card.component';

export interface AllJobInfo {
  soc_id?: string;
  title?: string;
  descr?: string;
  alt_titles?: string[];
  job_zone?: number;
  name?: string;
  experience?: string;
  education?: string;
  job_training?: string;
  example?: string;
  svp_range?: string;
}

export interface JobDescription {
  soc_id?: string;
  title?: string;
  descr?: string;
  alt_titles?: string[];
}

export interface Preparedness {
  job_zone: number;
  name?: string;
  experience?: string;
  education?: string;
  job_training?: string;
  example?: string;
  svp_range?: string;
}

@Component({
  selector: 'trust-ai-profile-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatButtonModule, SearchBoxComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  preparednessLevels = PreparednessLevels;

  jobDescription: JobDescription = {
    soc_id: '',
    title: '',
    descr: '',
    alt_titles: [],
  };

  preparedness: Preparedness = {
    job_zone: 0,
    name: '',
    experience: '',
    education: '',
    job_training: '',
    example: '',
    svp_range: '',
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.scrollToTop();
      this.getData(params['code']).subscribe();
    });
  }

  private getData(code: string): Observable<unknown> {
    return this.http.get('assets/data/job_descriptions.json', { responseType: 'text' }).pipe(
      tap((result) => {
        const parsedResult: AllJobInfo[] = JSON.parse(result);
        const match = parsedResult.find((job) => job['soc_id'] === code);
        this.jobDescription = {
          soc_id: match?.soc_id,
          title: match?.title,
          descr: match?.descr,
          alt_titles: match?.alt_titles,
        };

        this.preparedness = {
          job_zone: match?.job_zone || 0,
          name: match?.name,
          experience: match?.experience,
          education: match?.education,
          job_training: match?.job_training,
          example: match?.example,
          svp_range: match?.svp_range,
        };
      })
    );
  }

  /** Scrolls to top of page */
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
