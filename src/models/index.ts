import mongoose from "mongoose";

import Post from "./post";
import User from "./user";

const connectDb = (): Promise<typeof import("mongoose")> => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Post };

export { connectDb };

export default models;
