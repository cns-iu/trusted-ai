import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkTasksListComponent } from './work-tasks-list.component';

describe('WorkTasksListComponent', () => {
  let component: WorkTasksListComponent;
  let fixture: ComponentFixture<WorkTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkTasksListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
