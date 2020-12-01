import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSortTableComponent } from './admin-sort-table.component';

describe('AdminSortTableComponent', () => {
  let component: AdminSortTableComponent;
  let fixture: ComponentFixture<AdminSortTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSortTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSortTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
