import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSalaryComponent } from './profile-salary.component';

describe('ProfileSalaryComponent', () => {
  let component: ProfileSalaryComponent;
  let fixture: ComponentFixture<ProfileSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSalaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSalaryComponent);
    component = fixture.componentInstance;
    component.dataStates = [
      {
        year: 2022,
        place_name: 'Alabama',
        a_mean: 1,
      },
    ];
    component.dataInd = [
      {
        year: 2022,
        industry_name: 'industry',
        a_pct10: 0,
        a_pct25: 1,
        a_median: 2,
        a_pct75: 3,
        a_pct90: 4,
        a_mean: 100,
        h_pct10: 0,
        h_pct25: 1,
        h_median: 2,
        h_pct75: 3,
        h_pct90: 4,
        h_mean: 100,
      },
      {
        year: 2022,
        industry_name: 'industry',
        a_pct10: 0,
        a_pct25: 1,
        a_median: 2,
        a_pct75: 3,
        a_pct90: 4,
        a_mean: 200,
        h_pct10: 0,
        h_pct25: 1,
        h_median: 2,
        h_pct75: 3,
        h_pct90: 4,
        h_mean: 200,
      },
    ];
    component.dataNat = [
      {
        year: 2022,
        industry_name: 'industry',
        a_pct10: 0,
        a_pct25: 1,
        a_median: 2,
        a_pct75: 3,
        a_pct90: 4,
        a_mean: 100,
        h_pct10: 0,
        h_pct25: 1,
        h_median: 2,
        h_pct75: 3,
        h_pct90: 4,
        h_mean: 100,
      },
      {
        year: 2022,
        industry_name: 'industry',
        a_pct10: 0,
        a_pct25: 1,
        a_median: 2,
        a_pct75: 3,
        a_pct90: 4,
        a_mean: 200,
        h_pct10: 0,
        h_pct25: 1,
        h_median: 2,
        h_pct75: 3,
        h_pct90: 4,
        h_mean: 200,
      },
    ];
    fixture.detectChanges();
  });

  it('should create state visualization', async () => {
    component.dataType = 'hourly';
    await component.ngOnChanges();
    component.dataType = 'annual';
    await component.ngOnChanges();
  });

  it('should create national visualization', async () => {
    component.visualizationType = 'national';
    component.dataType = 'hourly';
    await component.ngOnChanges();
    component.dataType = 'annual';
    await component.ngOnChanges();
  });

  it('should create industry visualization', async () => {
    component.visualizationType = 'industry';
    component.dataType = 'hourly';
    await component.ngOnChanges();
    component.dataType = 'annual';
    await component.ngOnChanges();
  });
});
