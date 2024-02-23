import { app } from './app';

/**
 * Start Express server.
 */
app.listen(Number(process.env.PORT!), process.env.HOST!, () => {
  const domain = process.env.MAIL_DOMAIN || `http://localhost:${process.env.PORT}`;

  console.log(`App is running at ${domain} in ${process.env.NODE_ENV} mode`);
});
