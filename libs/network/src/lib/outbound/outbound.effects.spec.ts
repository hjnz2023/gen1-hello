import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OutboundEffects } from './outbound.effects';

describe('OutboundEffects', () => {
  let actions$: Observable<any>;
  let effects: OutboundEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OutboundEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OutboundEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
