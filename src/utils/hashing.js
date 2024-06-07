const bcrypt = require("bcrypt");
const config = require("../app/config/index.js");

// Hashing function
const hashPassword = async (password) => {
    const hashedPassword = bcrypt.hash(
        password,
        parseInt(config.bcryptSaltRounds)
    );
    return hashedPassword;
};

// Comparison function
const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

module.exports = { hashPassword, comparePassword };
