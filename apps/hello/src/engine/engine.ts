import type { EnvironmentProviders, Provider, Type } from '@angular/core';
import {
  INITIAL_CONFIG,
  renderApplication,
  renderModule,
} from '@angular/platform-server';
import { ɵInlineCriticalCssProcessor as InlineCriticalCssProcessor } from '@nguniversal/common/tools';
import * as fs from 'fs';
import { dirname, resolve } from 'path';
import { URL } from 'url';

/** These are the allowed options for the render */
export interface RenderOptions {
  appId: string;
  providers?: (Provider | EnvironmentProviders)[];
  url?: string;
  document?: string;
  documentFilePath?: string;
  /**
   * Reduce render blocking requests by inlining critical CSS.
   * Defaults to true.
   */
  inlineCriticalCss?: boolean;
  /**
   * Base path location of index file.
   * Defaults to the 'documentFilePath' dirname when not provided.
   */
  publicPath?: string;
}

export class CommonEngine<T> {
  private readonly templateCache = new Map<string, string>();
  private readonly inlineCriticalCssProcessor: InlineCriticalCssProcessor;
  private readonly pageExists = new Map<string, boolean>();

  constructor(private readonly bootstrap: Type<T>) {
    this.inlineCriticalCssProcessor = new InlineCriticalCssProcessor({
      minify: true,
    });
  }

  async render(opts: RenderOptions): Promise<string> {
    // console.log('opts', { ...opts, bootstrap: undefined });
    const html = await renderApplication(this.bootstrap, { ...opts });

    return html;
  }
}
