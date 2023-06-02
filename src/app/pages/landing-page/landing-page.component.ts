import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SearchBoxComponent } from 'src/app/search-box/search-box.component';

/**
 * Landing page component
 */
@Component({
  selector: 'trust-ai-landing-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, SearchBoxComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {}
