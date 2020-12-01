import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGobiomsettingComponent } from './admingobiomsetting.component';

describe('GobiomsettingComponent', () => {
  let component: AdminGobiomsettingComponent;
  let fixture: ComponentFixture<AdminGobiomsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGobiomsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGobiomsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
