import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';

@Component({
  standalone: true,
  imports: [PageHeaderComponent, PageFooterComponent, RouterModule],
  selector: 'trust-ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'trust-ai';
}
