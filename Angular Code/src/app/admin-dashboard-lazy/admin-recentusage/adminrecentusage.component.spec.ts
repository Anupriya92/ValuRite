import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecentUsageComponent } from './adminrecentusage.component';

describe('AdminRecentUsageComponent', () => {
  let component: AdminRecentUsageComponent;
  let fixture: ComponentFixture<AdminRecentUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRecentUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecentUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
