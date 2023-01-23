import { Action, ActionReducer } from '@ngrx/store';
import { rehydrate } from './actions';

function actionIsRehydrate(
  action: Action | ReturnType<typeof rehydrate>
): action is ReturnType<typeof rehydrate> {
  return (
    action.type === rehydrate.type &&
    (action as ReturnType<typeof rehydrate>).payload !== undefined
  );
}

export function rehydrateReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  let rehydrated = false;
  return function (state, action) {
    if (!rehydrated && actionIsRehydrate(action) && action.payload) {
      rehydrated = true;
      return action.payload;
    }

    return reducer(state, action);
  };
}
