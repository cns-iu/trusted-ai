import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
    this.route.params.subscribe((params) => {
      this.getData(params['code']).subscribe();
    });
  }

  getData(code: string): Observable<unknown> {
    return this.http.get('assets/data/job_descriptions.json', { responseType: 'text' }).pipe(
      tap((result) => {
        const parsedResult: JobDescription[] = JSON.parse(result);
        const match = parsedResult.find((job) => job['soc_id'] === code);
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
