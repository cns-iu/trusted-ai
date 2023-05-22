import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OccupationsListingsComponent } from './occupations-listings.component';

describe('OccupationsListingsComponent', () => {
  let component: OccupationsListingsComponent;
  let fixture: ComponentFixture<OccupationsListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationsListingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccupationsListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
