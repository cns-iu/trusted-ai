import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationsListingsComponent } from './occupations-listings.component';

describe('OccupationsListingsComponent', () => {
  let component: OccupationsListingsComponent;
  let fixture: ComponentFixture<OccupationsListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationsListingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccupationsListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start list with 50 jobs', () => {
    component.allJobs = Array(100).fill({
      'Alt Title': '',
      Code: '',
      'Data-level': '',
      'Job Zone': '',
      Occupation: '',
    });
    component.ngOnChanges();
    expect(component.jobsToDisplay.length).toEqual(50);
  });

  it('add more jobs when scrolling', () => {
    component.allJobs = Array(100).fill({
      'Alt Title': '',
      Code: '',
      'Data-level': '',
      'Job Zone': '',
      Occupation: '',
    });
    component.onScrollDown();
    expect(component.jobsToDisplay.length).toEqual(100);
  });
});
