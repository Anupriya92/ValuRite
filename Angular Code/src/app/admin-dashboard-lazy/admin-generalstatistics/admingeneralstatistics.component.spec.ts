import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralstatisticsComponent } from './admingeneralstatistics.component';

describe('GeneralstatisticsComponent', () => {
  let component: AdminGeneralstatisticsComponent;
  let fixture: ComponentFixture<AdminGeneralstatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGeneralstatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGeneralstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
