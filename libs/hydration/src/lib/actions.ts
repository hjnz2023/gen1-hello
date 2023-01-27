import { createAction, props } from '@ngrx/store';
import { RootState } from '@gen1-hello/shared';

export const rehydrate = createAction(
  '[Hydration] Rehydrate',
  props<{ payload: RootState }>()
);
