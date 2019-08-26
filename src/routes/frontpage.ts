import express from "express";

export const frontRoute = {
  get: async (req: express.Request, res: express.Response) => {
    if (req.isAuthenticated()) {
      res.send("welcome");
    } else {
      res.send("not logget");
    }
  },
};
