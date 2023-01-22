import { TestBed } from '@angular/core/testing';

import { RestoreStoreStateService } from './restore-store-state.service';

describe('RestoreStoreStateService', () => {
  let service: RestoreStoreStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestoreStoreStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
