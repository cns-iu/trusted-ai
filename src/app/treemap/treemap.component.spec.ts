import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreemapComponent } from './treemap.component';

describe('TreemapComponent', () => {
  let component: TreemapComponent;
  let fixture: ComponentFixture<TreemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreemapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create specs with data', async () => {
    const mockChange = {
      currentValue: [],
      previousValue: [],
      firstChange: false,
      isFirstChange: () => false,
    };
    component.activitiesData = [
      {
        level: 3,
        element_name: 'test',
        sub_group: 'subgroup',
        group: 'group',
        x0: 0,
        y0: 2,
        x1: 3,
        y1: 4,
      },
    ];
    component.skillsData = [
      {
        level: 3,
        element_name: 'test',
        sub_group: 'subgroup',
        group: 'group',
        x0: 0,
        y0: 2,
        x1: 3,
        y1: 4,
      },
    ];
    component.knowledgeData = [
      {
        level: 3,
        element_name: 'test',
        sub_group: 'subgroup',
        group: 'group',
        x0: 0,
        y0: 2,
        x1: 3,
        y1: 4,
      },
    ];
    component.abilitiesData = [
      {
        level: 3,
        element_name: 'test',
        sub_group: 'subgroup',
        group: 'group',
        x0: 0,
        y0: 2,
        x1: 3,
        y1: 4,
      },
    ];
    await component.ngOnChanges({
      activitiesData: mockChange,
      skillsData: mockChange,
      knowledgeData: mockChange,
      abilitiesData: mockChange,
    });
  });

  it('should create specs with data', async () => {
    component.reload();
  });
});
