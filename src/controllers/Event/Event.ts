import type { Response, Request } from 'express';

export namespace EventController {
  export function list(req: Request, res: Response) {
    const user = res.locals.user;

    res
      .json({
        rows: [
          {
            ip: user.ip,
            status: 200,
            response: 'OK',
            referrer: 'no-referrer',
            created_at: '2024-02-22T15:07:33.000Z',
          },
        ],
      })
      .end();
  }
}
