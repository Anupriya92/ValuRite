import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserlogComponent } from './adminuserlog.component';

describe('AdminUserlogComponent', () => {
  let component: AdminUserlogComponent;
  let fixture: ComponentFixture<AdminUserlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
