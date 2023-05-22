import { Route } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { OccupationsPageComponent } from './pages/occupations-page/occupations-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => LandingPageComponent,
  },
  {
    path: '',
    loadComponent: () => OccupationsPageComponent,
  },
];
