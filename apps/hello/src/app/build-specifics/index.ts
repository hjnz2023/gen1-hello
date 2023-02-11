import { provideStoreDevtools } from '@ngrx/store-devtools';

// export const extModules = [
//   StoreDevtoolsModule.instrument({
//     maxAge: 25,
//   }),
// ];

export const extProviders = [provideStoreDevtools()];
