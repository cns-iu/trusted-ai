import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { mock } from 'jest-mock-extended';
import { BehaviorSubject } from 'rxjs';
import { TreemapComponent } from 'src/app/treemap/treemap.component';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let controller: HttpTestingController;
  const paramsSubject = new BehaviorSubject({ code: '11111' });
  const treemap = mock<TreemapComponent>();

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

  it('gets data', () => {
    component.ngOnInit();
    const req = controller.expectOne('assets/profiles/11111/metadata.json');
    req.flush("{'soc_id':'11111'}");
  });

  it('gets data2', () => {
    component.ngOnInit();
    const req = controller.expectOne('assets/profiles/11111/metadata.json');
    req.flush("{'soc_id':'00000'}");
  });

  it('gets preparedness level', () => {
    expect(component.preparednessLevel(1)).toEqual('Little or No Preparation Needed');
  });

  it('updates job info from fetched data', () => {
    const testResult = {
      soc_id: '11111',
      tech_skills: [
        { commodity_title: 'title', example: 'example' },
        { commodity_title: 'title', example: 'example2' },
      ],
      salary_ind: [
        {
          a_pct10: 1,
          a_pct25: 2,
          a_median: 2.5,
          a_pct75: 3,
          a_pct90: 4,
          year: 2023,
        },
      ],
      salary_nat: [
        {
          a_pct10: 1,
          a_pct25: 2,
          a_pct75: 3,
          a_pct90: 4,
        },
      ],
      salary_states: [{ place_name: 'place', year: 2022, a_mean: 2 }],
      work_tasks: [{ task: 'taskTitle', importance: 1, relevance: 1 }],
      behaviors_work_activities: [],
      behaviors_skills: [],
      behaviors_knowledge: [],
      behaviors_abilities: [],
      projections: [],
    };
    component.ngOnInit();
    const req = controller.expectOne('assets/profiles/11111/metadata.json');
    req.flush(JSON.stringify(testResult));
  });

  it('shows all technology skills', () => {
    component.showAllTechnologyButtonClicked();
    expect(component.showAllSkills).toBeTruthy();
  });

  it('shows all work tasks', () => {
    component.showAllWorkTasksButtonClicked();
    expect(component.showAllTasks).toBeTruthy();
  });

  it('gets the automation description', () => {
    component.currentJobInfo = {
      automation_risk: 'low',
    };
    expect(component.automationDescription).toEqual('This job has a low risk of automation.');
    component.currentJobInfo = {
      automation_risk: undefined,
    };
    expect(component.automationDescription).toEqual('No data');
  });

  it('gets the outlook description if near future is available', () => {
    component.currentJobInfo = {
      near_future: 'near future',
    };
    expect(component.outlookDescription).toEqual('near future');
  });

  it('gets the outlook description if near future is unavailable', () => {
    component.currentJobInfo = {
      near_future: undefined,
      bright_futures: 'Bright',
    };
    expect(component.outlookDescription).toEqual('Many job openings predicted in the near future');
    component.currentJobInfo = {
      near_future: undefined,
      bright_futures: undefined,
    };
    expect(component.outlookDescription).toEqual('No data');
  });

  it('returns no data for outlook description', () => {
    component.currentJobInfo = {
      near_future: undefined,
      bright_futures: undefined,
    };
    expect(component.outlookDescription).toEqual('No data');
  });

  it('scrolls to top', () => {
    component.scrollToTop();
    expect(window.scrollY).toEqual(0);
  });

  it('refreshes the treemaps', () => {
    component.treemap1 = treemap;
    component.treemap2 = treemap;
    component.treemap3 = treemap;
    component.treemap4 = treemap;
    component.refreshTreemaps();
  });

  it('detects when there are no valid entries', () => {
    const test = [
      {
        a_mean: 1,
        h_mean: 3,
        tot_emp: 5,
        year: 2021,
      },
      {
        a_mean: 2,
        h_mean: 4,
        tot_emp: undefined,
        year: 2022,
      },
    ];
    expect(component.isEmpty(test, 'annual')).toBeFalsy();
    expect(component.isEmpty(test, 'hourly')).toBeFalsy();
    expect(component.isEmpty(test, 'emp')).toBeTruthy();
  });
});
