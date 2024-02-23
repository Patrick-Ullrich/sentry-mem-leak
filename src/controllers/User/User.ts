import * as Sentry from '@sentry/node';
import type { Request, Response, NextFunction } from 'express';

import { User } from '../../models/User';
import { AMS } from '../../services/AMS/AMS';

export namespace UserController {
  function fetchUserData() {
    return AMS.fetchMetaUser().then((data) => {
      return new User({
        ip: data.origin,
      });
    });
  }

  export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    fetchUserData().then(
      (user: User) => {
        res.locals.user = user;
        Sentry.setUser({ id: `account_${user.ip}` });

        return next();
      },
      () => {
        res.status(404).send('Account not found').end();
      },
    );
  }
}
