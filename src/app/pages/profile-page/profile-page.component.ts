import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs';
import { parse } from 'papaparse';
import { JobInfo } from '../occupations-page/occupations-page.component';

@Component({
  selector: 'trust-ai-profile-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  code = '';
  title = '';

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code') || '';

    this.http
      .get('assets/All_Occupations.csv', { responseType: 'text' })
      .pipe(
        tap((result) => {
          const parsedResult = parse<JobInfo>(result, { header: true }).data;
          const match = parsedResult.find((job) => job.Code === this.code);
          this.code = match?.Code || '';
          this.title = match?.Occupation || '';
        })
      )
      .subscribe();
  }
}
