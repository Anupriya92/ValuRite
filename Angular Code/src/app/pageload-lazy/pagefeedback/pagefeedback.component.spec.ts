import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagefeedbackComponent } from './pagefeedback.component';

describe('PagefeedbackComponent', () => {
  let component: PagefeedbackComponent;
  let fixture: ComponentFixture<PagefeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagefeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
