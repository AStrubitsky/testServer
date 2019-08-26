import models from "../models";
// import IUser from "../models/user";

export const createUsersWithMessages = async () => {
  const user1 = new models.User({
    email: "admin@mail.ru",
    password: "password",
    username: "admin",
  });
  const user2 = new models.User({
    email: "admin1@mail.ru",
    password: "password",
    username: "admin1",
  });
  const Post1 = new models.Post({
    text: "Post1",
    user: user1.id,
  });
  const Post2 = new models.Post({
    text: "Post2",
    user: user1.id,
  });
  const Post3 = new models.Post({
    text: "Post3",
    user: user2.id,
  });
  await Post1.save();
  await Post2.save();
  await Post3.save();
  await user1.save();
  await user2.save();
  await user1.save();
};
