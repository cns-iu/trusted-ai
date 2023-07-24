import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmploymentComponent } from './profile-employment.component';

describe('ProfileEmploymentComponent', () => {
  let component: ProfileEmploymentComponent;
  let fixture: ComponentFixture<ProfileEmploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEmploymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEmploymentComponent);
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
        tot_emp: 100,
      },
    ];
    await component.ngOnChanges({
      dataStates: mockChange,
    });
  });
});
