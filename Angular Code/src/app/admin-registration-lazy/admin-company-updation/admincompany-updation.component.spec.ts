import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompanyUpdationComponent } from './admincompany-updation';

describe('CompanyUpdationComponent', () => {
  let component: AdminCompanyUpdationComponent;
  let fixture: ComponentFixture<AdminCompanyUpdationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompanyUpdationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompanyUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
