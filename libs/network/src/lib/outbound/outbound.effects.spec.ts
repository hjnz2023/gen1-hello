import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OutboundEffects } from './outbound.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from './outbound.reducer';

describe('OutboundEffects', () => {
  let actions$: Observable<any>;
  let effects: OutboundEffects;
  let store: MockStore<State>;
  const initialState = { ip_addr: '192.168.1.1' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OutboundEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OutboundEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
