import express from 'express';

import passport from '../libs/passport';
import { IUser } from '../models/user';

export const loginRoute = {
  post: async (req: express.Request, res: express.Response, next: () => void) => {
    await passport.authenticate('local', async (err: any, user: IUser, info: string) => {
      if (err) {
        throw err;
      }

      if (user) {
        await req.login(user, error => {
          // tslint:disable-next-line:no-console
          console.error('error = ', error);
        });
        res.send({ username: user.username, email: user.email });
      } else {
        res.status(401);
        res.send(info);
      }
    })(req, res, next);
  },
};
