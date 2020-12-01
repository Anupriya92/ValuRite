import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserapprovalComponent } from './adminuserapproval.component';

describe('AdminUserapprovalComponent', () => {
  let component: AdminUserapprovalComponent;
  let fixture: ComponentFixture<AdminUserapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
