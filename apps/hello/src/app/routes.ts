import { Routes } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const routes: Routes = [
  {
    path: 'network',
    loadChildren: () =>
      import('@gen1-hello/network').then((m) => m.networkRoutes),
  },
  { path: 'welcome', component: NxWelcomeComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
