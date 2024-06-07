const jwt = require("jsonwebtoken");
const config = require("../config/index.js");
const BaseRepository = require("../../utils/BaseRepository.js");
const User = require("../../modules/User/user.model.js");

class AuthMiddleware {
    constructor() {
        this.repository = new BaseRepository(User);
        this.handle = this.handle.bind(this); // Bind the handle method
    }

    async handle(req, res, next) {
        let token = req.header("Authorization");

        if (!token) {
            return res
                .status(401)
                .json({ message: "Authorization token missing" });
        }

        // Check if token has Bearer prefix and remove it if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecretKey);

            console.debug("decoded: ", decoded);

            const user = await this.repository.findById(decoded._id);

            console.debug("user: ", user);

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            // Log the error for debugging purposes
            console.error("Token verification error: ", error);

            // Handle specific JWT errors
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            } else if (error.name === "JsonWebTokenError") {
                return res.status(400).json({ message: "Invalid token" });
            } else {
                return res
                    .status(500)
                    .json({ message: "Internal server error" });
            }
        }
    }
}

module.exports = new AuthMiddleware();
