import { isPlatformBrowser } from '@angular/common';
import { Injector, PLATFORM_ID } from '@angular/core';
import { RootState } from '@gen1-hello/shared';
import { Action, ActionReducer, MetaReducer } from '@ngrx/store';

import { rehydrate } from './actions';

function isRehydrateAction(
  action: Action | ReturnType<typeof rehydrate>
): action is ReturnType<typeof rehydrate> {
  return (
    action.type === rehydrate.type &&
    (action as ReturnType<typeof rehydrate>).payload !== undefined
  );
}

export function metaReducerFactory(injector: Injector): MetaReducer<RootState> {
  let rehydrated = false;
  const onBrowser = isPlatformBrowser(injector.get(PLATFORM_ID));
  return (reducer: ActionReducer<RootState>) => (state, action) => {
    if (onBrowser && !rehydrated && isRehydrateAction(action)) {
      rehydrated = true;
      return action.payload;
    }
    return reducer(state, action);
  };
}
