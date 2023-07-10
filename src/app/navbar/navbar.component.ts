import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Application navbar
 */
@Component({
  selector: 'trust-ai-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  showNav$: Observable<boolean>;

  constructor() {
    this.showNav$ = (this.router.events as Observable<RouterEvent>).pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => {
        console.log(event);
        return !(event.url === '/');
      })
    );
  }

  ngOnInit() {
    console.log(this.route.url);
  }
}
