import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulkuserComponent } from './adminbulkuser.component';

describe('BulkuserComponent', () => {
  let component: AdminBulkuserComponent;
  let fixture: ComponentFixture<AdminBulkuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBulkuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulkuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
