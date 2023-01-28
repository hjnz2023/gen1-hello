import { isPlatformServer } from '@angular/common';
import { Injector, PLATFORM_ID } from '@angular/core';
import { RootState } from '@gen1-hello/shared';
import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { rehydrate } from './actions';

function actionIsRehydrate(
  action: Action | ReturnType<typeof rehydrate>
): action is ReturnType<typeof rehydrate> {
  return (
    action.type === rehydrate.type &&
    (action as ReturnType<typeof rehydrate>).payload !== undefined
  );
}

export function metaReducerFactory(injector: Injector): MetaReducer<RootState> {
  const skipped = isPlatformServer(injector.get(PLATFORM_ID));
  let rehydrated = false;
  return (reducer: ActionReducer<RootState>) => (state, action) => {
    if (skipped || rehydrated || !actionIsRehydrate(action))
      return reducer(state, action);

    rehydrated = true;
    console.log('Rehydrated successfully!');
    return action.payload;
  };
}
