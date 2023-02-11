import { createReducer, on, createFeature } from '@ngrx/store';

import { OutboundActions } from './outbound.actions';

export interface State {
  ip_addr: string | undefined;
}

export const initialState: State = {
  ip_addr: undefined,
};

export const outboundFeature = createFeature({
  name: 'outbound',
  reducer: createReducer(
    initialState,
    on(OutboundActions.opened, (state: State): State => state),
    on(OutboundActions.loaded, (state, { ip_addr }): State => {
      return {
        ...state,
        ip_addr,
      };
    })
  ),
});

export const { name, selectOutboundState, selectIp_addr } = outboundFeature;
