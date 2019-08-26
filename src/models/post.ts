import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  id: string;
  text: string;
  user: string;
}

const postSchema = new Schema({
  text: {
    required: true,
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
