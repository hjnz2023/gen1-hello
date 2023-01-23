import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT
} from '@ngrx/effects';
import { tap } from 'rxjs';
import { TransferStateRegisterService } from './transfer-state-register.service';

@Injectable()
export class TransferStateEffects {
  init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => {
          this.transferStateRegister.register();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private transferStateRegister: TransferStateRegisterService
  ) {}
}
