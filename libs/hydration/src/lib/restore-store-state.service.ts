import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NGRX_STATE } from './keys';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RestoreStoreStateService {

  ngrxState$ = new Observable((observer) => {
    const state = isPlatformBrowser(this.platformId) && this.transferState.get(NGRX_STATE, null);
    if (state) {
      observer.next(state);
      this.transferState.remove(NGRX_STATE);
    }
    observer.complete();
  });

  transfer(getStoreState: () => unknown) {
    if(isPlatformBrowser(this.platformId)) {
      this.transferState.onSerialize(NGRX_STATE, getStoreState);
    }
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState
  ) {}
}
