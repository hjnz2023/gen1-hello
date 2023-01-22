import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { mergeMap, Observable, map, tap } from 'rxjs';
import { RestoreStoreStateService } from './restore-store-state.service';
import { rehydrate } from './actions';
import { Store } from '@ngrx/store';

@Injectable()
export class Effects {
  transferState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap(() => {
          this.restoreStoreState.transfer(() => {
            let state: unknown;
            this.store.select((state) => state).subscribe((value) => {
              state = value;
            }).unsubscribe();
            return state;
          });
        })
      ),
    { dispatch: false }
  );

  rehyreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => this.restoreStoreState.ngrxState$),
      map((state) => rehydrate({ payload: state }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private restoreStoreState: RestoreStoreStateService
  ) {}
}
