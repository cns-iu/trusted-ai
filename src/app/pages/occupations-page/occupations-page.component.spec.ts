import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OccupationsPageComponent, SearchFilters } from './occupations-page.component';

describe('OccupationsPageComponent', () => {
  let component: OccupationsPageComponent;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OccupationsPageComponent],
    });

    jest.clearAllMocks();
    window.scrollTo = jest.fn();
    component = TestBed.inject(OccupationsPageComponent);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets jobs', () => {
    component.setJobs().subscribe((jobs) => {
      expect(jobs).toEqual({ data: [] });
    });
    const request = controller.expectOne('assets/All_Occupations.csv');
    request.flush({ data: [] });
  });

  it('sets jobs on init', () => {
    const spy = jest.spyOn(component, 'setJobs');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('filters jobs by job title', () => {
    const testFilters: SearchFilters = {
      preparednessLevel: '0',
      showOccupations: '0',
      searchTerm: 'test',
    };
    component.allJobs = [
      {
        Occupation: 'test',
        Code: '111',
        'Job Zone': '0',
        'Data-level': '0',
      },
    ];
    component.filterJobs(testFilters);
    expect(component.filteredJobs).toEqual(component.allJobs);
  });

  it('filters jobs by code', () => {
    const testFilters: SearchFilters = {
      preparednessLevel: '0',
      showOccupations: '0',
      searchTerm: '111',
    };
    component.allJobs = [
      {
        Occupation: 'test',
        Code: '111',
        'Job Zone': '0',
        'Data-level': '0',
      },
    ];
    component.filterJobs(testFilters);
    expect(component.filteredJobs).toEqual(component.allJobs);
  });

  it("doesn't display job if Occupation is missing", () => {
    const testFilters: SearchFilters = {
      preparednessLevel: '0',
      showOccupations: '0',
      searchTerm: 'test',
    };
    component.allJobs = [
      {
        Occupation: '',
        Code: '111',
        'Job Zone': '0',
        'Data-level': '0',
      },
    ];
    component.filterJobs(testFilters);
    expect(component.filteredJobs).toEqual([]);
  });

  it('finds jobs with matching preparedness level', () => {
    const testFilters: SearchFilters = {
      preparednessLevel: '0',
      showOccupations: '0',
      searchTerm: 'title',
    };
    component.allJobs = [
      {
        Occupation: 'title',
        Code: '111',
        'Job Zone': '0',
        'Data-level': '0',
      },
    ];
    component.filterJobs(testFilters);
    expect(component.filteredJobs).toEqual(component.allJobs);
  });

  it('finds jobs with matching data-level', () => {
    const testFilters: SearchFilters = {
      preparednessLevel: '3',
      showOccupations: '1',
      searchTerm: 'title',
    };
    component.allJobs = [
      {
        Occupation: 'title',
        Code: '111',
        'Job Zone': '3',
        'Data-level': 'Y',
      },
    ];
    component.filterJobs(testFilters);
    expect(component.filteredJobs).toEqual(component.allJobs);
  });

  it('scrolls to top', () => {
    const spy = jest.spyOn(window, 'scrollTo');
    component.scrollToTop();
    expect(spy).toHaveBeenCalled();
  });
});
