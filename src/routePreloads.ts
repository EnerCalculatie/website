import type { ComponentType } from 'react';

export type RouteModule = { default: ComponentType };

// Pad -> module-loader van elke lazy route (gevuld door lazyRoute in App.tsx).
// Gebruikt door entry-server.tsx (alles laden vóór renderToString) en main.tsx
// (huidige route laden vóór hydrateRoot, tegen content-flash).
export const routePreloads: Record<string, () => Promise<RouteModule>> = {};
