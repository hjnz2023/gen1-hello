import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { NGRX_STATE } from './keys';

const selectRootState = (state: unknown) => state;

@Injectable({
  providedIn: 'root',
})
export class TransferStateRegisterService {
  readonly register = this.createRegisterOnTransferState();
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    private store: Store
  ) {}

  private createRegisterOnTransferState(): () => void {
    const notOnServer = !isPlatformServer(this.platformId);
    let registered = false;
    return () => {
      if (registered || notOnServer) {
        return;
      }
      this.transferState.onSerialize(NGRX_STATE, () => this.getCurrentState());
      registered = true;
    };
  }

  getCurrentState(): unknown {
    let state: unknown;
    this.store
      .select(selectRootState)
      .pipe(first())
      .subscribe({
        next: (value) => {
          state = value;
        },
        complete: () => {
          console.log(
            'The state of NGRX Store has been serialized and transferred.'
          );
        },
      });
    return state;
  }
}
