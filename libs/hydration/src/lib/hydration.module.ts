import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestoreStoreStateEffects } from './restore-store-state.effects';
import { USER_PROVIDED_EFFECTS } from '@ngrx/effects';
import { META_REDUCERS } from '@ngrx/store';
import { metaReducerFactory } from './reducers';

@NgModule({
  imports: [CommonModule],
  providers: [
    RestoreStoreStateEffects,
    {
      provide: USER_PROVIDED_EFFECTS,
      multi: true,
      useValue: [RestoreStoreStateEffects],
    },
    {
      provide: META_REDUCERS,
      deps: [Injector],
      useFactory: metaReducerFactory,
      multi: true,
    },
  ],
})
export class RehydrationModule {}

export function provideRehydration() {
  // TODO: implement
  return [];
}
