import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { rehydrate } from './actions';
import { RestoreStoreStateService } from './restore-store-state.service';

@Injectable()
export class RestoreStoreStateEffects {
  rehyreate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => this.restoreStoreState.ngrxState$),
      map((state) => rehydrate({ payload: state }))
    );
  });

  constructor(
    private actions$: Actions,
    private restoreStoreState: RestoreStoreStateService
  ) {}
}
