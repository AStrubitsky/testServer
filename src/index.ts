import dotenv from "dotenv";
import express from "express";

import { errorHandler } from "./handlers/01-errors-handler";
import { sessionHandler } from "./handlers/03-session-handler";
import { bodyParserHandler } from "./handlers/04-bodyParser-handler";
import { passportHandler } from "./handlers/05-passport-handler";
import models, { connectDb } from "./models";
import { loginRoute, logoutRoute } from "./routes/auth";
import { frontRoute } from "./routes/frontpage";
import { createUsersWithMessages } from "./seeds/user";

dotenv.config();

const eraseDatabaseOnSync = true;

const app = express();

errorHandler.init(app);
bodyParserHandler.init(app);
sessionHandler.init(app);
passportHandler.init(app);

app.get("/", frontRoute.get);
app.post("/login", loginRoute.post);
app.post("/logout", logoutRoute.post);

connectDb().then(
  async (): Promise<void> => {
    if (eraseDatabaseOnSync) {
      await Promise.all([models.User.deleteMany({}), models.Post.deleteMany({})]);
      await createUsersWithMessages();
    }

    app.listen(process.env.PORT, () =>
      // tslint:disable-next-line:no-console
      console.log(`localhost:${process.env.PORT}!`)
    );
  }
);
