import { CommonEngine, RenderOptions } from './engine';
import { getReqResProviders, NgSetupOptions } from './express-engine-setup';

import { buildUrl, getViewDirectory, TemplateEngineCallback } from './render';

export function ngExpressEngine<T>(
  setupOptions: Readonly<NgSetupOptions<T>>
): TemplateEngineCallback {
  const { bootstrap, appId, providers = [], document } = setupOptions;
  const engine = new CommonEngine<T>(bootstrap);

  return function (path, options, callback) {
    const renderOpts: RenderOptions = {
      appId,
      document,
      documentFilePath: path,
      providers: [...providers, ...getReqResProviders(options)],
      publicPath: getViewDirectory(options),
      url: buildUrl(options),
    };

    engine
      .render(renderOpts)
      .then((html) => callback(null, html))
      .catch(callback);
  };
}
