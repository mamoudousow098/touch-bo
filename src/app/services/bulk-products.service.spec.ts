import { TestBed } from '@angular/core/testing';

import { BulkProductsService } from './bulk-products.service';

describe('BulkProductsService', () => {
  let service: BulkProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
