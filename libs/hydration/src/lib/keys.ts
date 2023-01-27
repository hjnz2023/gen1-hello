import { makeStateKey } from '@angular/platform-browser';
import { RootState } from '@gen1-hello/shared';

export const NGRX_STATE = makeStateKey<RootState>('NGRX_STATE');
