import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

import { RenderOptions } from './engine';

import type { StaticProvider } from '@angular/core';
import type { Request, Response } from 'express';
import type { WithRequired } from '@gen1-hello/shared';
import type { RenderOptions as CommonRenderOptions } from '@nguniversal/common/engine';

export type NgSetupOptions = WithRequired<
  Pick<
    CommonRenderOptions & { appId: string },
    'bootstrap' | 'publicPath' | 'inlineCriticalCss' | 'appId' | 'document'
  > &
    Pick<RenderOptions, 'providers'>,
  'bootstrap' | 'appId'
>;

export type TemplateEngineOptions = {
  req: Request;
  res?: Response;
};

function hasReq(options: object): options is TemplateEngineOptions {
  return (options as TemplateEngineOptions).req !== undefined;
}

export function getReqResProviders(
  options: TemplateEngineOptions | object
): StaticProvider[] {
  if (!hasReq(options)) return [];

  const { req, res } = options;
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
