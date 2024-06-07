const config = require("../../../app/config/index.js");
const BaseRepository = require("../../../utils/BaseRepository.js");
const { comparePassword } = require("../../../utils/hashing.js");
const User = require("../user.model.js");
const jwt = require("jsonwebtoken");

class LoginUser {
    constructor() {
        this.repository = new BaseRepository(User);
    }

    async execute(data) {
        const { email, password } = data;

        const user = await this.repository.findOneByQuery({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // generate token
        const token = jwt.sign({ _id: user._id }, config.jwtSecretKey, {
            expiresIn: config.jwtExpiresIn,
        });

        console.log(token); // maa0ahakndnhaaiapjlam

        user.token = token;

        return user;
    }
}

module.exports = new LoginUser();
