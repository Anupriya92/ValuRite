import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBarchartComponent } from './adminbarchart.component';

describe('BarchartComponent', () => {
  let component: AdminBarchartComponent;
  let fixture: ComponentFixture<AdminBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
