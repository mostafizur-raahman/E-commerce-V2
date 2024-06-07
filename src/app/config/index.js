const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS, // Consistent naming
    defaultPass: process.env.DEFAULT_PASS,
    jwtSecretKey: process.env.JWT_SECRET_KEY, // Consistent naming
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    appName: process.env.APP_NAME,
};

module.exports = config;
