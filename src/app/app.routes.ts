import { Route } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OccupationsPageComponent } from './pages/occupations-page/occupations-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';

/** App routes */
export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => LandingPageComponent,
  },
  {
    path: 'faq',
    loadComponent: () => FaqPageComponent,
  },
  {
    path: 'occupations',
    loadComponent: () => OccupationsPageComponent,
  },
  {
    path: 'profile',
    loadComponent: () => ProfilePageComponent,
  },
  {
    path: '**',
    loadComponent: () => LandingPageComponent,
  },
];
