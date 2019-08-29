import passport from "passport";
import passportLocal from "passport-local";

import User, { IUser } from "../../models/user";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      passwordField: "password",
      usernameField: "email",
    },
    (email: string, password: string, done: any) => {
      User.findOne({ email: email.toLowerCase() })
        .then((user: IUser) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { errorMessage: "email or password is invalid" },
            });
          }

          return done(null, user, { message: "welcome" });
        })
        .catch(done);
    }
  )
);

export default passport;
