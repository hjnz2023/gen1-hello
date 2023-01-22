import * as fromOutbound from './outbound.reducer';
import { selectOutboundState } from './outbound.selectors';

describe('Outbound Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOutboundState({
      [fromOutbound.outboundFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
