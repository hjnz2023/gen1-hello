import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { IndexComponent } from './index/index.component';
import { OutboundEffects } from './outbound/outbound.effects';
import { outboundFeature } from './outbound/outbound.reducer';

export const networkRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(outboundFeature),
      provideEffects([OutboundEffects]),
    ],
    children: [
      {
        path: '',
        component: IndexComponent,
      },
    ],
  },
];
