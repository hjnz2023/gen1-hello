import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { extModules } from './build-specifics';
import { HttpClientModule } from '@angular/common/http';
import * as fromHydration from '@gen1-hello/hydration';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [fromHydration.rehydrateReducer],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    // Instrumentation must be imported after importing StoreModule
    extModules,
    EffectsModule.forRoot([fromHydration.Effects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
