// Lichtgewicht testhulp voor de losse Express-routers (contact.ts/leadMagnet.ts/
// newsletter.ts) — geen supertest/msw in de repo, dus geen extra dependency
// erbij. Pakt de handler direct van router.stack (Express 4 interne structuur)
// en bootst req/res met minimale mocks, i.p.v. een echte server te starten.
import type { Router } from 'express';

type RouterLayer = {
  route?: {
    path: string;
    methods: Record<string, boolean>;
    stack: Array<{ handle: (req: unknown, res: unknown) => unknown }>;
  };
};

export function getRouteHandler(router: Router, method: 'get' | 'post', routePath: string) {
  const layer = (router as unknown as { stack: RouterLayer[] }).stack.find(
    (l) => l.route?.path === routePath && l.route.methods[method]
  );
  if (!layer?.route) {
    throw new Error(`Geen ${method.toUpperCase()} ${routePath}-route gevonden op deze router.`);
  }
  return layer.route.stack[0].handle as (req: { body?: unknown }, res: MockResponse) => unknown;
}

export interface MockResponse {
  statusCode: number;
  body: unknown;
  headers: Record<string, string>;
  status(code: number): MockResponse;
  json(payload: unknown): MockResponse;
  send(payload: unknown): MockResponse;
  set(header: string, value: string): MockResponse;
}

export function mockResponse(): MockResponse {
  return {
    statusCode: 200,
    body: undefined,
    headers: {},
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
    send(payload: unknown) {
      this.body = payload;
      return this;
    },
    set(header: string, value: string) {
      this.headers[header] = value;
      return this;
    },
  };
}
