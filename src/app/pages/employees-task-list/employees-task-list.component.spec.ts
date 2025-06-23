import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTaskListComponent } from './employees-task-list.component';

describe('EmployeesTaskListComponent', () => {
  let component: EmployeesTaskListComponent;
  let fixture: ComponentFixture<EmployeesTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesTaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
