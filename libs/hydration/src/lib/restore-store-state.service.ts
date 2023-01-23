import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NGRX_STATE } from './keys';

@Injectable({
  providedIn: 'root',
})
export class RestoreStoreStateService {

  ngrxState$ = new Observable((observer) => {
    const state = this.getStateFromBrowser();
    if (state) {
      observer.next(state);
      this.transferState.remove(NGRX_STATE);
    }
    observer.complete();
  });

  getStateFromBrowser(): unknown {
    return (
      isPlatformBrowser(this.platformId) &&
      this.transferState.get(NGRX_STATE, null)
    );
  }


  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
  ) {}
}
