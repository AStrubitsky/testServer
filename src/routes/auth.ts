import express from "express";
// import jwt from "express-jwt";

import passport from "../libs/passport";
import { IUser } from "../models/user";

export const loginRoute = {
  post: async (req: express.Request, res: express.Response, next: () => void) => {
    await passport.authenticate("local", async (err: any, user: IUser, info: string) => {
      if (err) {
        throw err;
      }

      if (user) {
        await req.login(user, (error) => {
          // tslint:disable-next-line:no-console
          console.error("error = ", error);
        });
        res.send({ username: user.username, email: user.email });
      } else {
        res.status(401);
        res.send(info);
      }
    })(req, res, next);
  },
};

export const logoutRoute = {
  post: async (req: express.Request, res: express.Response): Promise<void> => {
    await req.logout();
    res.send();
  },
};

// const getJWT = (req: express.Request) => {
//   const {
//     headers: { authorization },
//   } = req;

//   if (authorization && authorization.split(" ")[0] === "Token") {
//     return authorization.split(" ")[1];
//   }
//   return null;
// };

// const auth = {
//   optional: jwt({
//     credentialsRequired: false,
//     getToken: getJWT,
//     secret: "secret",
//     userProperty: "payload",
//   }),
//   required: jwt({
//     getToken: getJWT,
//     secret: "secret",
//     userProperty: "payload",
//   }),
// };

// export default auth;
