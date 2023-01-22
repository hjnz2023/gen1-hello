import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOutbound from './outbound.reducer';

export const selectOutboundState = createFeatureSelector<fromOutbound.State>(
  fromOutbound.outboundFeatureKey
);

export const selectOutboundAddress = createSelector(
  selectOutboundState,
  (state) => state.ip_addr
);
