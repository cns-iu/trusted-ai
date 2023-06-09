import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'papaparse';
import { Observable, tap } from 'rxjs';

import { JobInfo } from '../occupations-page/occupations-page.component';
import { MatButtonModule } from '@angular/material/button';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';

export interface JobDescription {
  soc_id: string;
  title: string;
  descr: string;
  alt_titles: string[];
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

  code = '';
  title = '';
  description = '';
  altTitles: string[] = [];

  ngOnInit() {
    this.getData().subscribe();
  }

  getData(): Observable<unknown> {
    return this.http.get('assets/data/job_descriptions.json', { responseType: 'text' }).pipe(
      tap((result) => {
        const code = this.route.snapshot.paramMap.get('code') || '';
        const parsedResult: JobDescription[] = JSON.parse(result);
        const match = parsedResult.find((job) => job['soc_id'] === code);
        console.log(match);
        this.code = code;
        this.title = match?.title || '';
        this.description = match?.descr || '';
        this.altTitles = match?.alt_titles || [];
      })
    );
  }

  /** Scrolls to top of page */
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
