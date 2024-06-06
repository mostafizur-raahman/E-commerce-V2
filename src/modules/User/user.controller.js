import CreateUser from "./Application/CreateUser.js";
import ReadUser from "./Application/ReadUser.js";

class UserController {
    create = async (req, res, next) => {
        try {
            const result = await CreateUser.execute(req.body);

            res.status(200).json({
                message: "User created successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    read = async (req, res, next) => {
        try {
            const result = await ReadUser.execute();

            res.status(200).json({
                message: "User fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await this.userRepository.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            res.status(200).json({
                message: "Login successful",

                user: { id: user.id, email: user.email },
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new UserController();
