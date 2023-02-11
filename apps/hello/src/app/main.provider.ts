import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideRehydration } from '@gen1-hello/hydration';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';

import { provideDevExt } from './build-specifics';
import { routes } from './routes';

export const mainProviders = [
  importProvidersFrom(
    BrowserModule.withServerTransition({ appId: 'serverApp' })
  ),
  provideRouter(routes),
  provideHttpClient(),
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
  provideRehydration(),
  provideDevExt(),
];
