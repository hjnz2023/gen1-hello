import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { rehydrate } from './actions';
import { RestoreStoreStateService } from './restore-store-state.service';
import { TransferStateRegisterService } from './transfer-state-register.service';

@Injectable()
export class HydrationEffects {
  rehyreate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => this.restoreStoreState.ngrxState$),
      map((state) => rehydrate({ payload: state }))
    );
  });

  init$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => {
          this.transferStateRegister.register();
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private restoreStoreState: RestoreStoreStateService,
    private transferStateRegister: TransferStateRegisterService
  ) {}
}
