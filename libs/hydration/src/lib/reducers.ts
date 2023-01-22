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
  return function (state, action) {
    if (actionIsRehydrate(action) && action.payload) {
      return action?.payload!;
    }

    return reducer(state, action);
  };
}
