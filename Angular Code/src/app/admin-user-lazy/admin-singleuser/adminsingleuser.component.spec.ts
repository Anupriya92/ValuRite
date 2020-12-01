import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleuserComponent } from './adminsingleuser.component';

describe('AdminSingleuserComponent', () => {
  let component: AdminSingleuserComponent;
  let fixture: ComponentFixture<AdminSingleuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSingleuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
