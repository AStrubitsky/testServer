// import jwt from "jsonwebtoken";
// import { jwtSecret } from "../../config";

// const checkToken = (req: any, res: any, next: any) => {
//   let token = req.headers["x-access-token"] || req.headers.authorization;

//   if (token && token.startsWith("Bearer ")) {
//     // Remove Bearer from string
//     token = token.slice(7, token.length);
//   }

//   if (token) {
//     jwt.verify(token, jwtSecret.secret, (err: any, decoded: any) => {
//       if (err) {
//         return res.json({
//           message: "Token is not valid",
//           success: false,
//         });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.json({
//       message: "Auth token is not supplied",
//       success: false,
//     });
//   }
// };

// export const jwtMiddleware = {
//   checkToken,
// };
