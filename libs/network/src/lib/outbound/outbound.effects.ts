import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  OnInitEffects
} from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { map, mergeMap } from 'rxjs';
import { OutboundService } from '../outbound.service';
import * as OutboundActions from './outbound.actions';

@Injectable()
export class OutboundEffects implements OnInitEffects {

  loadOutbounds$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OutboundActions.loadOutbounds),
      mergeMap(() =>
        this.outboundService
          .getAll()
          .pipe(
            map((o) => OutboundActions.loadedSuccess({ ip_addr: o.ip_addr }))
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private outboundService: OutboundService
  ) {}

  ngrxOnInitEffects(): Action {
    return OutboundActions.loadOutbounds();
  }
}
