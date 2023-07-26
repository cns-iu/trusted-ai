import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule.withRoutes([{ path: 'profile', component: ProfilePageComponent }])],
      providers: [AppComponent],
    }).compileComponents();

    window.scrollTo = jest.fn();
    component = TestBed.inject(AppComponent);
    router = TestBed.inject(Router);
  });

  it('inits', () => {
    component.ngOnInit();
    router.navigate(['/profile']);
  });

  it('scrolls to top', () => {
    const spy = jest.spyOn(window, 'scrollTo');
    component.scrollToTop();
    expect(spy).toHaveBeenCalled();
  });
});
