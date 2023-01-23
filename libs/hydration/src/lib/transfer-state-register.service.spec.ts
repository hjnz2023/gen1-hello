import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { TransferStateRegisterService } from './transfer-state-register.service';

describe('TransferStateRegisterService', () => {
  let service: TransferStateRegisterService;
  const initialState = { data: 'any' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(TransferStateRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
