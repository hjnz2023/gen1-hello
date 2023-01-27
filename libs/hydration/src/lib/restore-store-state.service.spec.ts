import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { RestoreStoreStateService } from './restore-store-state.service';

describe('RestoreStoreStateService', () => {
  let service: RestoreStoreStateService;
  const initialState = { data: 'any' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(RestoreStoreStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
