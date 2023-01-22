import { createAction, props } from '@ngrx/store';

export const loadOutbounds = createAction(
  '[Outbound] Load Outbounds'
);

export const loadedSuccess = createAction(
  '[Outbound] Loaded Success',
  props<{ ip_addr: string }>()
);




