import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose, { Document, Schema } from "mongoose";

dotenv.config();

export interface IUser extends Document {
  email: string;
  id: string;
  hash: string;
  salt: string;
  username: string;
  checkPassword?: any;
  validatePassword?: any;
}

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: [
      {
        validator(value: string) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
      },
    ],
  },
  hash: {
    type: String,
  },
  salt: {
    type: String,
  },
  username: {
    type: String,
  },
});

userSchema.methods.setPassword = function(password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

userSchema.methods.validatePassword = function(password: string) {
  const hashChecked = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return hashChecked === this.hash;
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      exp: expirationDate.getTime() / 1000,
      id: this._id,
    },
    "secret"
  );
};

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

userSchema.statics.findByLogin = async function(login: string): Promise<IUser> {
  const user = await this.findOne({
    email: login,
  });

  return user;
};

userSchema.pre("remove", function(next): void {
  this.model("Post").deleteMany({ user: this._id }, next);
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
