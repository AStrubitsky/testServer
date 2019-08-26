// import dotenv from "dotenv";
// import express from "express";
// import jwt from "jsonwebtoken";

// import { jwtSecret } from "../../config";

// dotenv.config();

// class JwtHandlerGenerator {
//   public login(req: express.Request, res: express.Response) {
//     const username = req.body.username;
//     const password = req.body.password;
//     // For the given username fetch user from DB
//     const mockedUsername = "admin";
//     const mockedPassword = "password";

//     if (username && password) {
//       if (username === mockedUsername && password === mockedPassword) {
//         const token = jwt.sign({ username }, jwtSecret.secret, {
//           expiresIn: "24h", // expires in 24 hours
//         });
//         // return the JWT token for the future API calls
//         res.json({
//           message: "Authentication successful!",
//           success: true,
//           token,
//         });
//       } else {
//         res.send(403).json({
//           message: "Incorrect username or password",
//           success: false,
//         });
//       }
//     } else {
//       res.send(400).json({
//         message: "Authentication failed! Please check the request",
//         success: false,
//       });
//     }
//   }
//   public index(req: express.Request, res: express.Response) {
//     res.json({
//       message: "Index page",
//       success: true,
//     });
//   }
// }

// export const jwtHandler = new JwtHandlerGenerator();
