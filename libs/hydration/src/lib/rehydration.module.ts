import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestoreStoreStateEffects } from './restore-store-state.effects';
import { USER_PROVIDED_EFFECTS } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule],
  providers: [
    RestoreStoreStateEffects,
    {
      provide: USER_PROVIDED_EFFECTS,
      multi: true,
      useValue: [RestoreStoreStateEffects],
    },
  ],
})
export class RehydrationModule {}
