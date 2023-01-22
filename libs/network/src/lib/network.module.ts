import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { networkRoutes } from './lib.routes';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { StoreModule } from '@ngrx/store';
import * as fromOutbound from './outbound/outbound.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OutboundEffects } from './outbound/outbound.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(networkRoutes),
    StoreModule.forFeature(fromOutbound.outboundFeatureKey, fromOutbound.reducer),
    EffectsModule.forFeature([OutboundEffects]),
  ],
  exports: [],
  declarations: [IndexComponent],
})
export class NetworkModule {}
