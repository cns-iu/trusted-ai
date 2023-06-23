import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let controller: HttpTestingController;
  const paramsSubject = new BehaviorSubject({ code: '11111' });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProfilePageComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
          },
        },
      ],
    });

    jest.clearAllMocks();
    window.scrollTo = jest.fn();
    component = TestBed.inject(ProfilePageComponent);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to top on load', () => {
    const spy = jest.spyOn(component, 'scrollToTop');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('gets data', () => {
    component.ngOnInit();
    const req = controller.expectOne('assets/profiles/11111/metadata.json');
    req.flush('{"soc_id":"11111"}');
  });

  it('gets data2', () => {
    component.ngOnInit();
    const req = controller.expectOne('assets/profiles/11111/metadata.json');
    req.flush('{"soc_id":"00000"}');
  });

  it('gets preparedness level', () => {
    expect(component.preparednessLevel(1)).toEqual('Little or No Preparation Needed');
  });

  it('gets tech skills', () => {
    component.ngOnInit();
    const req = controller.expectOne('assets/profiles/11111/metadata.json');
    req.flush(
      '{"soc_id":"11111", "tech_skills": [{"commodity_title": "title", "example": "example"}, {"commodity_title": "title", "example": "example2"}]}'
    );
    expect(component.techSkills).toEqual([['title', ['example', 'example2']]]);
  });

  it('shows all technology skills', () => {
    component.showAllTechnologyButtonClicked();
    expect(component.showAllSkills).toBeTruthy();
  });
});
