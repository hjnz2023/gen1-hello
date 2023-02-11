import type { Request, Response } from 'express';
import type * as express from 'express';

export type TemplateEngineCallback = Parameters<
  ReturnType<typeof express>['engine']
>[1];

export type TemplateEngineOptions = {
  req: Request;
  res?: Response;
  settings: { views: string | string[] };
};

export function hasReq(options: object): options is TemplateEngineOptions {
  return (options as TemplateEngineOptions).req !== undefined;
}

export function hasSettings(options: object): options is TemplateEngineOptions {
  return (options as TemplateEngineOptions).settings !== undefined;
}

export function getViewDirectory(
  options: TemplateEngineOptions | object
): string {
  if (!hasSettings(options))
    throw new Error('Unable to get view directory. No settings found.');
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

export function buildUrl(options: TemplateEngineOptions | object): string {
  if (!hasReq(options))
    throw new Error('Unable to build URL. No request found.');

  const { req }: { req: Request } = options;
  const { protocol, baseUrl, url } = req;
  const host = req.get('host') || '';
  return `${protocol}://${host}${baseUrl}${url}`;
}
