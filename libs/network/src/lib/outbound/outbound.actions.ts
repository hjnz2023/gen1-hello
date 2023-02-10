import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const OutboundActions = createActionGroup({
  source: 'Outbound',
  events: {
    Opened: emptyProps(),
    Loaded: props<{ ip_addr: string }>(),
  },
});
