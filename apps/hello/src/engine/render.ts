// function inspect(
//   options: { req: Request; res?: Response; url: string } & any
// ): void {
//   const req: Request = options.req;

//   // console.log('url', url);
//   // console.log(options['settings']);
// }
import { StaticProvider } from '@angular/core';
import { RenderOptions } from './engine';

import { NgSetupOptions } from './express-engine-setup';

function getViewDirectory(options: any): string {
  /*
  A directory or an array of directories for the application's views.
  If an array, the views are looked up in the order they occur in the array.
  */
  const { settings } = options;
  if (settings.views instanceof Array) {
    throw new Error('Detected an array of views. This is not supported.');
  }
  return settings?.views;
}

function buildUrl(options: any) {
  const { req } = options;
  const host = req.get('host') || '';
  return `${req.protocol}://${host}${req.baseUrl}${req.url}`;
}

export function createRenderOptions(
  path: string,
  setupOptions: NgSetupOptions,
  extraProviders: StaticProvider[],
  options: object
): RenderOptions {
  const renderOpts: RenderOptions = {
    ...setupOptions,
    providers: [...(setupOptions.providers ?? []), ...extraProviders],
    documentFilePath: path,
    publicPath: getViewDirectory(options),
    url: buildUrl(options),
  };
  return renderOpts;
}
