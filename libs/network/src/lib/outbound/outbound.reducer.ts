import { Action, createReducer, on } from '@ngrx/store';
import * as OutboundActions from './outbound.actions';

export const outboundFeatureKey = 'outbound';

export interface State {
  ip_addr: string | undefined
}

export const initialState: State = {
  ip_addr: undefined
};

export const reducer = createReducer(
  initialState,

  on(OutboundActions.loadOutbounds, state => state),
  on(OutboundActions.loadedSuccess, (state, action) => ({ ...state, ip_addr: action.ip_addr }))
);
