import { Injector } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { META_REDUCERS } from '@ngrx/store';
import { HydrationEffects } from './effects';

import { metaReducerFactory } from './reducers';

export function provideRehydration() {
  return [
    provideEffects(HydrationEffects),
    {
      provide: META_REDUCERS,
      deps: [Injector],
      useFactory: metaReducerFactory,
      multi: true,
    },
  ];
}
