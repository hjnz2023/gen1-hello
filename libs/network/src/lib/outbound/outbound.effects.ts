import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap } from 'rxjs';

import { OutboundService } from '../outbound.service';
import { OutboundActions } from './outbound.actions';
import { selectIp_addr } from './outbound.reducer';

@Injectable()
export class OutboundEffects implements OnInitEffects {
  loadOutbound$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OutboundActions.opened),
      mergeMap(() => this.store.select(selectIp_addr)),
      mergeMap((addr) =>
        addr
          ? EMPTY
          : this.outboundService
              .getAll()
              .pipe(map(({ ip_addr }) => OutboundActions.loaded({ ip_addr })))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private outboundService: OutboundService
  ) {}

  ngrxOnInitEffects(): Action {
    return OutboundActions.opened();
  }
}
