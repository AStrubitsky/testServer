import passport from "passport";
import passportLocal from "passport-local";

import User, { IUser } from "../../models/user";

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    {
      passwordField: "user[password]",
      usernameField: "user[email]",
    },
    (email: string, password: string, done: any) => {
      User.findOne({ email })
        .then((user: IUser) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { "email or password": "is invalid" } });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);

export default passport;
