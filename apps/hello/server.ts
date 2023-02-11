import 'zone.js/dist/zone-node';

import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import * as express from 'express';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { AppComponent } from './src/app/app.component';
import { TransferStateModule } from './src/app/app.server.module';
import { mainProviders } from './src/app/main.provider';
import { ngExpressEngine } from './src/engine/express-engine';
import { environment } from './src/environments/environment';

if (environment.production) {
  enableProdMode();
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/apps/hello/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  const document = readFileSync(
    join(distFolder, 'index.html'),
    'utf8'
  ).toString();

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      appId: 'serverApp',
      bootstrap: AppComponent,
      document,
      providers: [
        ...mainProviders,
        importProvidersFrom(ServerModule),
        importProvidersFrom(TransferStateModule),
      ],
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  server.get('/api/**', (req, res) => {
    res.send({ message: 'Hello from server!' });
  });

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

// export * from './src/main.server';
