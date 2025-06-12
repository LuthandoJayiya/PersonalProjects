import app from '../src/app';
import { createServer } from 'http';
import { parse } from 'url';
import type { IncomingMessage, ServerResponse } from 'http';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url || '', true);
  app(req as any, res as any);
});

export default function handler(req: IncomingMessage, res: ServerResponse) {
  server.emit('request', req, res);
}
