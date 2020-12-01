import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterpageheaderComponent } from './masterpageheader.component';

describe('MasterpageheaderComponent', () => {
  let component: MasterpageheaderComponent;
  let fixture: ComponentFixture<MasterpageheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterpageheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterpageheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
