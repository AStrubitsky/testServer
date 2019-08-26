import express from "express";
import jwt from "express-jwt";

const getJWT = (req: express.Request) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  optional: jwt({
    credentialsRequired: false,
    getToken: getJWT,
    secret: "secret",
    userProperty: "payload",
  }),
  required: jwt({
    getToken: getJWT,
    secret: "secret",
    userProperty: "payload",
  }),
};

export default auth;
