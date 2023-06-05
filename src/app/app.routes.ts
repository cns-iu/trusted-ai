import { Route } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OccupationsPageComponent } from './pages/occupations-page/occupations-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

/** App routes */
export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => LandingPageComponent,
  },
  {
    path: 'faq',
    loadComponent: () => LandingPageComponent,
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
