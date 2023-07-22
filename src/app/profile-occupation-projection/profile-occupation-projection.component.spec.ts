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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
