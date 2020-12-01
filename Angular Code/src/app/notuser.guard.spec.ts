import { TestBed, async, inject } from '@angular/core/testing';

import { NotuserGuard } from './notuser.guard';

describe('NotuserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotuserGuard]
    });
  });

  it('should ...', inject([NotuserGuard], (guard: NotuserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
