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
    fixture.detectChanges();
  });

  it('should create specs with data', async () => {
    const mockChange = {
      currentValue: [],
      previousValue: [],
      firstChange: false,
      isFirstChange: () => false,
    };
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
      },
    ];
    await component.ngOnChanges({
      dataStates: mockChange,
      dataNat: mockChange,
      dataInd: mockChange,
    });
  });
});
