import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OccupationsSearchAreaComponent } from './occupations-search-area.component';

describe('OccupationsSearchAreaComponent', () => {
  let component: OccupationsSearchAreaComponent;
  let fixture: ComponentFixture<OccupationsSearchAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationsSearchAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccupationsSearchAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
