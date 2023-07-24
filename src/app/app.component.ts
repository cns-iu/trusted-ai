import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { fromEvent } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * Main app component
 */
@Component({
  standalone: true,
  imports: [CommonModule, NavbarComponent, PageFooterComponent, RouterModule, MatIconModule, MatButtonModule],
  selector: 'trust-ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /** Router service */
  private readonly router = inject(Router);

  onTop = true;

  /** Scrolls to top of page after each route click */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    fromEvent(document, 'scroll').subscribe(() => (this.onTop = window.scrollY === 0));
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
