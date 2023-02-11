import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RehydrationModule } from '@gen1-hello/hydration';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';

import { extProviders } from './build-specifics';
import { routes } from './routes';

export const mainProviders = [
  importProvidersFrom(
    BrowserModule.withServerTransition({ appId: 'serverApp' })
  ),
  provideRouter(routes),
  importProvidersFrom(HttpClientModule),
  { provide: APP_BASE_HREF, useValue: '/' },
  provideStore(
    {},
    {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }
  ),
  provideRouterStore(),
  provideEffects(),
  ...extProviders,
  importProvidersFrom(RehydrationModule),
];
