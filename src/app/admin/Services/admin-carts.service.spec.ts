import { TestBed } from '@angular/core/testing';

import { AdminCartsService } from './admin-carts.service';

describe('AdminCartsService', () => {
  let service: AdminCartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
