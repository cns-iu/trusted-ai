import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown';

/**
 * Faq page component
 */
@Component({
  selector: 'trust-ai-faq-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MarkdownModule],
  providers: [MarkdownService, { provide: SECURITY_CONTEXT, useValue: 0 }],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent {}
