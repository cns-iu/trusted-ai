import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOccupationProjectionComponent } from './profile-occupation-projection.component';

describe('ProfileOccupationProjectionComponent', () => {
  let component: ProfileOccupationProjectionComponent;
  let fixture: ComponentFixture<ProfileOccupationProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOccupationProjectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileOccupationProjectionComponent);
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
    component.dataProjections = [
      {
        industry_title: 'title',
        employed: 1000,
        employed_10: 2000,
        per_change_10: 100,
      },
    ];
    await component.ngOnChanges({
      dataProjections: mockChange,
    });
  });
});
