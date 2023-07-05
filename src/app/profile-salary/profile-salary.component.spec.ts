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
    component.dataStates = [
      {
        year: 2022,
        place_name: 'Alabama',
        a_mean: 1,
      },
    ];
    component.dataInd = [
      {
        ann_emp_rank: 5,
        year: 2022,
        industry_name: 'industry',
        tot_emp: 3000,
      },
    ];
    await component.ngOnChanges({
      dataStates: {
        currentValue: [],
        previousValue: [],
        firstChange: false,
        isFirstChange: () => false,
      },
      dataNat: {
        currentValue: [],
        previousValue: [],
        firstChange: false,
        isFirstChange: () => false,
      },
      dataInd: {
        currentValue: [
          {
            ann_emp_rank: 5,
            year: 2022,
            industry_name: 'industry',
            tot_emp: 3000,
          },
        ],
        previousValue: [],
        firstChange: false,
        isFirstChange: () => false,
      },
    });
  });
});
