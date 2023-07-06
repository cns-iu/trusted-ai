import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileTechnologySkillsComponent } from './profile-technology-skills.component';

describe('ProfileTechnologySkillsComponent', () => {
  let component: ProfileTechnologySkillsComponent;
  let fixture: ComponentFixture<ProfileTechnologySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTechnologySkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTechnologySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows all technology skills', () => {
    component.showAll = true;
    component.allSkills = [['skill', ['example', 'example']]];
    component.ngDoCheck();
    expect(component.skillsShown).toBeTruthy();
  });
});
