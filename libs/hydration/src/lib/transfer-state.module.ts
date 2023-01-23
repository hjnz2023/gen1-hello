import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferStateEffects } from './transfer-state.effects';
import { USER_PROVIDED_EFFECTS } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule],
  providers: [
    TransferStateEffects,
    {
      provide: USER_PROVIDED_EFFECTS,
      multi: true,
      useValue: [TransferStateEffects],
    },
  ],
})
export class TransferStateModule {}
