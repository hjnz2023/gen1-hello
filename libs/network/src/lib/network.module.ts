import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IndexComponent } from './index/index.component';
import { networkRoutes } from './lib.routes';
import { OutboundEffects } from './outbound/outbound.effects';
import * as fromOutbound from './outbound/outbound.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(networkRoutes),
    StoreModule.forFeature(
      fromOutbound.outboundFeatureKey,
      fromOutbound.reducer
    ),
    EffectsModule.forFeature([OutboundEffects]),
  ],
  exports: [],
  declarations: [IndexComponent],
})
export class NetworkModule {}
