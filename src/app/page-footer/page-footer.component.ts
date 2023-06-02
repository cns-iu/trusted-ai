import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Page footer containing links to sponsors and CNS
 */
@Component({
  selector: 'trust-ai-page-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent {}
