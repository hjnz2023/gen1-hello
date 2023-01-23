import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import {
  rehydrateReducer,
  RehydrationModule
} from '@gen1-hello/hydration';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { extModules } from './build-specifics';
import { NxWelcomeComponent } from './nx-welcome.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [rehydrateReducer],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    // Instrumentation must be imported after importing StoreModule
    extModules,
    EffectsModule.forRoot([]),
    RehydrationModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
