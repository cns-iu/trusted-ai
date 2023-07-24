import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PageFooterComponent } from './page-footer/page-footer.component';

/**
 * Main app component
 */
@Component({
  standalone: true,
  imports: [NavbarComponent, PageFooterComponent, RouterModule],
  selector: 'trust-ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Title of app component
   */
  title = 'trust-ai';
}
