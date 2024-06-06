import ReadRole from "./Application/readRole.js";
import CreateRole from "./Application/createRole.js";

class RoleController {
    create = async (req, res, next) => {
        try {
            const result = await CreateRole.execute(req.body);

            res.status(200).json({
                message: "Role created successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    read = async (req, res, next) => {
        try {
            const result = await ReadRole.execute();

            res.status(200).json({
                message: "Roles fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new RoleController();
