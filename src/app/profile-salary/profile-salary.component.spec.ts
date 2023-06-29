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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
