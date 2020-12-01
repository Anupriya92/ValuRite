import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCurrentusersComponent } from './admincurrentusers.component';

describe('CurrentusersComponent', () => {
  let component: AdminCurrentusersComponent;
  let fixture: ComponentFixture<AdminCurrentusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCurrentusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCurrentusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
