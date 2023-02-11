import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

import { RenderOptions } from './engine';
import { hasReq, TemplateEngineOptions } from './render';

import type { StaticProvider, Type } from '@angular/core';
import type { RenderOptions as CommonRenderOptions } from '@nguniversal/common/engine';
export type NgSetupOptions<T> = Pick<
  CommonRenderOptions & { appId: string },
  'publicPath' | 'inlineCriticalCss' | 'appId' | 'document'
> &
  Pick<RenderOptions, 'providers'> & { bootstrap: Type<T> };

export function getReqResProviders(
  options: TemplateEngineOptions | object
): StaticProvider[] {
  if (!hasReq(options)) throw new Error('Req property not found on options.');

  const { req, res = req.res } = options;
  const providers: StaticProvider[] = [
    {
      provide: REQUEST,
      useValue: req,
    },
  ];
  if (res) {
    providers.push({
      provide: RESPONSE,
      useValue: res,
    });
  }
  return providers;
}
