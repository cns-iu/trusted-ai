import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
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
export class NavbarComponent {
  /** Handles when search term is changed */
  private readonly router = inject(Router);

  /** Changes appearance of nav bar if not on home page */
  notHome$: Observable<boolean>;

  /**
   * Sets notHome$
   */
  constructor() {
    this.notHome$ = (this.router.events as Observable<RouterEvent>).pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => {
        return !(event.url === '/');
      })
    );
  }
}
