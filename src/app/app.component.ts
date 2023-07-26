import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter, fromEvent, map, Observable } from 'rxjs';
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

  /** Whether to show the back to top button */
  showBackToTop = false;

  /** Whether the page is long enough to show the back to top button */
  longPage = false;

  /** Scrolls to top of page after each route change */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.longPage = event.url.includes('occupations') || event.url.includes('profile');
      this.scrollToTop();
    });
    this.handleScroll();
  }

  /** Cancels tooltip display on scrolling and checks if page is on top */
  private handleScroll(): void {
    fromEvent(document, 'scroll').subscribe(() => {
      const tooltip = document.getElementById('vg-tooltip-element');
      if (tooltip) {
        tooltip.className = 'vg-tooltip';
      }
      this.showBackToTop = this.longPage ? window.scrollY > 1000 : false;
    });
  }

  /**
   * Scrolls to top of page
   */
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
