import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Shallow } from 'shallow-render';

import { SearchFilters } from '../pages/occupations-page/occupations-page.component';
import { OccupationsSearchAreaComponent } from './occupations-search-area.component';

describe('OccupationsSearchAreaComponent', () => {
  let shallow: Shallow<OccupationsSearchAreaComponent>;

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

  beforeEach(async () => {
    shallow = new Shallow(OccupationsSearchAreaComponent);
  });

  it('creates', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should emit the changed filter value', async () => {
    const { instance, outputs } = await shallow.render();
    instance.filters = testFilters;
    instance.filtersChange('showOccupations', testToggleEvent);
    expect(outputs.filtersChanged.emit).toHaveBeenCalledWith(testFilters2);
  });

  it('should emit the changed search input value', async () => {
    const { instance, outputs } = await shallow.render();
    instance.filters = testFilters;
    instance.inputChange(testInputEvent);
    expect(outputs.filtersChanged.emit).toHaveBeenCalled();
  });
});
