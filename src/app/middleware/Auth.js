// import jwt from "jsonwebtoken";
// import config from "../config/index.js";
// import { UserServices } from "../../modules/user/user.service.js";

// class AuthMiddleware {
//     constructor() {
//         this.userService = new UserServices();
//     }

//     async handle(req, res, next) {
//         let token = req.header("Authorization");

//         if (!token) {
//             return res
//                 .status(401)
//                 .json({ message: "Authorization token missing" });
//         }

//         // Check if token has Bearer prefix and remove it if present
//         if (token.startsWith("Bearer ")) {
//             token = token.slice(7, token.length);
//         }

//         try {
//             const decoded = jwt.verify(token, config.jwt_secret_key);

//             const user = await this.userService.findById(decoded._id);

//             if (!user) {
//                 return res.status(401).json({ message: "User not found" });
//             }

//             req.user = user;
//             next();
//         } catch (error) {
//             // Log the error for debugging purposes
//             console.error("Token verification error: ", error);

//             // Handle specific JWT errors
//             if (error.name === "TokenExpiredError") {
//                 return res.status(401).json({ message: "Token expired" });
//             } else if (error.name === "JsonWebTokenError") {
//                 return res.status(400).json({ message: "Invalid token" });
//             } else {
//                 return res
//                     .status(500)
//                     .json({ message: "Internal server error" });
//             }
//         }
//     }
// }

// export default new AuthMiddleware();
