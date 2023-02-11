import { CommonEngine } from './engine';
import { getReqResProviders, NgSetupOptions } from './express-engine-setup';

import type * as express from 'express';
import { createRenderOptions } from './render';

export function ngExpressEngine(
  setupOptions: Readonly<NgSetupOptions>
): Parameters<ReturnType<typeof express>['engine']>[1] {
  const engine = new CommonEngine(setupOptions.bootstrap);

  return function (path, options, callback) {
    const renderOpts = createRenderOptions(
      path,
      setupOptions,
      getReqResProviders(options),
      options
    );

    engine
      .render(renderOpts)
      .then((html) => callback(null, html))
      .catch(callback);
  };
}
