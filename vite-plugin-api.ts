import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Connect, Plugin, PreviewServer, ViteDevServer } from 'vite';
import { processContactSubmission } from './api/lib/contact';

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function createContactMiddleware(): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const pathname = req.url?.split('?')[0];
    if (pathname !== '/api/contact') {
      return next();
    }

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.statusCode = 200;
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'Method not allowed' });
      return;
    }

    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const result = await processContactSubmission(body, process.env);

      if (result.status >= 500) {
        console.error('[api/contact]', result.body.error ?? result.body);
      }

      sendJson(res, result.status, result.body);
    } catch (error) {
      console.error('[api/contact] Dev middleware error:', error);
      sendJson(res, 500, { error: 'Failed to send email. Please try again later.' });
    }
  };
}

function attachContactApi(server: ViteDevServer | PreviewServer) {
  server.middlewares.use(createContactMiddleware());
}

export function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev',
    configureServer(server) {
      attachContactApi(server);
    },
    configurePreviewServer(server) {
      attachContactApi(server);
    },
  };
}
