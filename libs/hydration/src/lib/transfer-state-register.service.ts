import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';

import { NGRX_STATE } from './keys';

const selectRootState = (state: unknown) => state;

@Injectable({
  providedIn: 'root',
})
export class TransferStateRegisterService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly store = inject(Store);
  private readonly transferState = inject(TransferState);
  readonly register = this.createRegisterOnTransferState();

  private createRegisterOnTransferState(): () => void {
    const onBrowser = isPlatformBrowser(this.platformId);
    let registered = false;
    return () => {
      if (registered || onBrowser) {
        return;
      }
      this.transferState.onSerialize(NGRX_STATE, this.getCurrentState());
      registered = true;
    };
  }

  getCurrentState(): () => unknown {
    let state: unknown;
    return () => {
      if (state) return state;
      this.store
        .select(selectRootState)
        .pipe(first())
        .subscribe({
          next: (value) => {
            state = value;
          },
          complete: () => {
            console.log(
              'The state of NGRX Store has been serialized and transferred.',
              state
            );
          },
        });
      return state;
    };
  }
}
