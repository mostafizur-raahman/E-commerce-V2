const ReadRole = require("./Application/readRole.js");
const CreateRole = require("./Application/createRole.js");

class RoleController {
    async create(req, res, next) {
        try {
            const result = await CreateRole.execute(req.body);

            res.status(200).json({
                message: "Role created successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async read(req, res, next) {
        try {
            const result = await ReadRole.execute();

            res.status(200).json({
                message: "Roles fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RoleController();
