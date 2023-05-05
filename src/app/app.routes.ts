import { Route } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => LandingPageComponent,
  },
];
