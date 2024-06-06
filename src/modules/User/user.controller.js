const CreateUser = require("./Application/CreateUser.js");
const LoginUser = require("./Application/LoginUser.js");
const ReadUser = require("./Application/ReadUser.js");

class UserController {
    async create(req, res, next) {
        try {
            const result = await CreateUser.execute(req.body);

            res.status(200).json({
                message: "User created successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async read(req, res, next) {
        try {
            const result = await ReadUser.execute();

            res.status(200).json({
                message: "User fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const user = await LoginUser.execute(req.body);

            console.log("User after login ", user);

            res.status(200).json({
                message: "Login successful",
                user,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
