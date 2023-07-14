import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchFilters } from '../pages/occupations-page/occupations-page.component';
import { OccupationsSearchAreaComponent } from './occupations-search-area.component';

describe('OccupationsSearchAreaComponent', () => {
  const testFilters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
    preparednessLevel: '0',
  };

  const testFilters2: SearchFilters = {
    searchTerm: '',
    showOccupations: 'test',
    preparednessLevel: '0',
  };

  const testToggleEvent = {
    value: 'test',
  } as MatButtonToggleChange;

  const testInputEvent = {
    target: {
      value: 'test',
    } as unknown as HTMLInputElement,
  } as unknown as Event;

  let component: OccupationsSearchAreaComponent;
  let fixture: ComponentFixture<OccupationsSearchAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationsSearchAreaComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OccupationsSearchAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit the changed filter value', async () => {
    jest.spyOn(component.filtersChanged, 'emit');
    component.filters = testFilters;
    component.filtersChange('showOccupations', testToggleEvent);
    expect(component.filtersChanged.emit).toHaveBeenCalledWith(testFilters2);
  });

  it('should emit the changed search input value', async () => {
    jest.spyOn(component.filtersChanged, 'emit');
    component.filters = testFilters;
    component.inputChange(testInputEvent);
    expect(component.filtersChanged.emit).toHaveBeenCalled();
  });
});
