import { Shallow } from 'shallow-render';
import { OccupationsSearchAreaComponent } from './occupations-search-area.component';
import { SearchFilters } from '../pages/occupations-page/occupations-page.component';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TestBed } from '@angular/core/testing';

describe('OccupationsSearchAreaComponent', () => {
  let shallow: Shallow<OccupationsSearchAreaComponent>;

  const testFilters: SearchFilters = {
    searchTerm: '',
    showOccupations: '0',
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

  beforeEach(async () => {
    shallow = new Shallow(OccupationsSearchAreaComponent);

    TestBed.configureTestingModule({
      imports: [],
      providers: [],
    });
  });

  it('creates', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should emit the changed filter value', async () => {
    const { instance, outputs } = await shallow.render({ bind: { filters: testFilters } });
    instance.filtersChange('showOccupations', testToggleEvent);
    expect(outputs.filtersChanged.emit).toHaveBeenCalledWith(instance.filters);
  });

  it('should emit the changed search input value', async () => {
    const { instance, outputs } = await shallow.render({ bind: { filters: testFilters } });
    instance.inputChange(testInputEvent);
    expect(outputs.filtersChanged.emit).toHaveBeenCalledWith(instance.filters);
  });
});
