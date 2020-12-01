import { TestBed, inject } from '@angular/core/testing';

import { AdminLoginServiceService } from './admin-service.service';

describe('AdminLoginServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLoginServiceService]
    });
  });

  it('should be created', inject([AdminLoginServiceService], (service: AdminLoginServiceService) => {
    expect(service).toBeTruthy();
  }));
});
