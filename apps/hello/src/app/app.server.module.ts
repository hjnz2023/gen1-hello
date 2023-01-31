import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TransferStateModule } from '@gen1-hello/hydration';

@NgModule({
  imports: [AppModule, ServerModule, TransferStateModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
