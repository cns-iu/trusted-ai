import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Shallow } from 'shallow-render';

import { WorkTasksListComponent } from './work-tasks-list.component';

describe('WorkTasksListComponent', () => {
  let shallow: Shallow<WorkTasksListComponent>;

  const testToggleEvent = {
    value: 'test',
  } as MatButtonToggleChange;

  beforeEach(async () => {
    shallow = new Shallow(WorkTasksListComponent);
  });

  it('changes the toggle value', async () => {
    const { instance } = await shallow.render();
    instance.selectionChange(testToggleEvent);
    expect(instance.selection).toEqual('test');
  });

  it('returns the importance category', async () => {
    const { instance } = await shallow.render();
    expect(instance.importanceCategory(5)).toEqual('high');
    expect(instance.importanceCategory(3.7)).toEqual('med');
    expect(instance.importanceCategory(3.2)).toEqual('low');
    expect(instance.importanceCategory(2)).toEqual('lowest');
  });

  it('returns the frequency category', async () => {
    const { instance } = await shallow.render();
    expect(instance.frequencyCategory(95)).toEqual('high');
    expect(instance.frequencyCategory(60)).toEqual('med');
    expect(instance.frequencyCategory(40)).toEqual('low');
    expect(instance.frequencyCategory(20)).toEqual('lowest');
  });

  it('rounds the frequency value', async () => {
    const { instance } = await shallow.render();
    expect(instance.roundFrequency(95.8)).toEqual(96);
  });

  it('sorts task list by importance', async () => {
    const { instance } = await shallow.render();
    instance.tasks = [
      {
        importance: 1,
        relevance: 4,
        task: 'task1',
      },
      {
        importance: 3,
        relevance: 2,
        task: 'task2',
      },
    ];
    instance.selection = '0';
    instance.showAll = false;
    instance.ngDoCheck();
    expect(instance.tasksShown).toEqual([
      {
        importance: 3,
        relevance: 2,
        task: 'task2',
      },
      {
        importance: 1,
        relevance: 4,
        task: 'task1',
      },
    ]);
  });

  it('shows all tasks', async () => {
    const { instance } = await shallow.render();
    instance.tasks = [
      {
        importance: 1,
        relevance: 4,
        task: 'task1',
      },
      {
        importance: 3,
        relevance: 2,
        task: 'task2',
      },
      {
        importance: 6,
        relevance: 1,
        task: 'task2',
      },
      {
        importance: 5,
        relevance: 0,
        task: 'task2',
      },
    ];
    instance.selection = '1';
    instance.showAll = true;
    instance.ngDoCheck();
    expect(instance.tasksShown.length).toEqual(4);
  });
});
