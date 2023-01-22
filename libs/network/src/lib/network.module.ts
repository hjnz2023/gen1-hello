import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { networkRoutes } from './lib.routes';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(networkRoutes),
  ],
  exports: [],
  declarations: [IndexComponent],
})
export class NetworkModule {}
