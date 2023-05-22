import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OccupationsPageComponent } from './occupations-page.component';

describe('OccupationsPageComponent', () => {
  let component: OccupationsPageComponent;
  let fixture: ComponentFixture<OccupationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccupationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
