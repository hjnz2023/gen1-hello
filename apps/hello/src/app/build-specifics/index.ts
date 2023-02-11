import type { EnvironmentProviders } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export function provideDevExt(): EnvironmentProviders[] {
  return [provideStoreDevtools({ maxAge: 25 })];
}
