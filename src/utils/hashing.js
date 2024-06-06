const bcrypt = require("bcrypt");
const config = require("../app/config/index.js");

// Hashing function
const hashPassword = async (password) => {
    console.debug(config.salt_round, password);

    const hashedPassword = bcrypt.hash(password, parseInt(config.salt_round));
    return hashedPassword;
};

// Comparison function
const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

module.exports = { hashPassword, comparePassword };
