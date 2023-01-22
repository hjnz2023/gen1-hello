import { createAction, props } from '@ngrx/store';
export const rehydrate = createAction(
  '[Hydration] Rehydrate',
  props<{ payload: unknown }>()
);
