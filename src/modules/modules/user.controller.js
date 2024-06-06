import User from "./user.model.js";
import BaseRepository from "../../utils/BaseRepository.js";

class UserController {
    constructor() {
        this.userRepository = new BaseRepository(User);
    }

    create = async (req, res, next) => {
        try {
            const result = await this.userRepository.create(req.body);
            // hashing the password

            res.status(200).json({
                message: "User created successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req, res, next) => {
        try {
            const projection = this.userRepository.defaultProjection;

            const result = await this.userRepository.findAll(projection);

            res.status(200).json({
                message: "Roles fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // Retrieve user by email
            const user = await this.userRepository.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare the provided password with the stored hash
            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Generate a JWT token (or handle sessions, etc.)
            // const token = generateToken(user); // implement token generation logic

            res.status(200).json({
                message: "Login successful",
                // token, // include the token in the response
                user: { id: user.id, email: user.email }, // send necessary user details
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new UserController();
