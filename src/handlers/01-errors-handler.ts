import express from "express";

export const errorHandler = {
  init: (app: express.Application) =>
    app.use(async (req: express.Request, res: express.Response, next: () => void) => {
      try {
        await next();
      } catch (e) {
        if (e.status) {
          res.send(e.message);
          res.status(e.status);
        } else {
          res.send("Error 500");
          res.status(500);
          // tslint:disable-next-line:no-console
          console.error(e.message, e.stack);
        }
      }
    }),
};
