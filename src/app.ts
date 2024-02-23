import express from 'express'; // express server
import * as Sentry from '@sentry/node';

import type { Application } from 'express';

import { UserController } from './controllers/User/User';
import { EventController } from './controllers/Event/Event';

export const app: Application = express();

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  release: 'SET_APP_VERSION',
  environment: process.env.NODE_ENV,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      // to trace all requests to the default router
      app,
      // alternatively, you can specify the routes you want to trace:
      // router: someRouter,
      methods: ['post', 'get', 'delete'],
    }),
  ],

  ignoreTransactions: ['/api/health'],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 0,
});

app.disable('x-powered-by');

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json({ limit: '35mb' }));

app.get('/logs', UserController.isAuthenticated, EventController.list);

app.use(Sentry.Handlers.errorHandler());
