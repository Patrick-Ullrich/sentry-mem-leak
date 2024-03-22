import * as Sentry from '@sentry/node';
import express from 'express';

const app = express();
Sentry.init({
  dsn: '',
  integrations: [new Sentry.Integrations.Express({ app: app })],
  sampleRate: 0,
  tracesSampleRate: 0,
});

// ❌  mem leak :(
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.requestHandler());

// ✅ No mem leak
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());

app.get('/test', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('health check');
  res.send({ connected: 'true' });
});

app.listen(3000);
