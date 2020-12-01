import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterCompanyComponent } from './adminregistercompany.component';

describe('AdminRegisterCompanyComponent', () => {
  let component: AdminRegisterCompanyComponent;
  let fixture: ComponentFixture<AdminRegisterCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
