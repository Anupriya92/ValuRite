import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStackBarComponent } from './admin-stack-bar.component';

describe('AdminStackBarComponent', () => {
  let component: AdminStackBarComponent;
  let fixture: ComponentFixture<AdminStackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
