import bcrypt from "bcrypt";
import config from "../app/config/index.js";

// Hashing function
export const hashPassword = async (password) => {
    console.debug(config.salt_round, password);

    const hashedPassword = bcrypt.hash(password, parseInt(config.salt_round));
    return hashedPassword;
};

// Comparison function
export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};
