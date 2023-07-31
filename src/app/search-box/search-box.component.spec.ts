import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfilePageComponent } from '../pages/profile-page/profile-page.component';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let controller: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'profile', component: ProfilePageComponent }]),
      ],
      providers: [SearchBoxComponent],
    });

    component = TestBed.inject(SearchBoxComponent);
    controller = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets data', () => {
    component.ngOnInit();
    const req = controller.expectOne('assets/data/index.json');
    req.flush('[{"Code":"11111", "Occupation":"title", "Job Zone":1}]');
  });

  it('filters jobs', () => {
    component.jobsResults = [
      {
        Code: '11111',
        'Data-level': '',
        'Job Zone': '',
        Occupation: 'test',
        'Alt Title': '',
      },
    ];
    component.altJobsResults = [
      {
        Code: '11111',
        'Data-level': '',
        'Job Zone': '',
        Occupation: 'test',
        'Alt Title': 'alt',
      },
    ];
    expect(component.filterJobs('alt')).toEqual(['alt']);
  });

  it('loads profile', () => {
    const spy = jest.spyOn(router, 'navigate');
    component.jobsResults = [
      {
        Code: '11111',
        'Data-level': '',
        'Job Zone': '',
        Occupation: 'test',
        'Alt Title': 'alt',
      },
    ];
    component.loadProfile('test');
    expect(spy).toHaveBeenCalledWith(['/profile', { code: '11111' }]);
  });

  it("doesn't load profile if job not count", () => {
    const spy = jest.spyOn(router, 'navigate');
    component.jobsResults = [
      {
        Code: '11111',
        'Data-level': '',
        'Job Zone': '',
        Occupation: 'test',
        'Alt Title': 'alt',
      },
    ];
    component.loadProfile('aaa');
    expect(spy).toHaveBeenCalledWith(['/profile', { code: undefined }]);
  });
});
