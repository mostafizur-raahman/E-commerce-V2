const CreateCategory = require("./Application/CreateCategory.js");
const ReadCategory = require("./Application/ReadCategory.js");

class CategoryController {
    async create(req, res, next) {
        try {
            const result = await CreateCategory.execute(req.body);

            res.status(200).json({
                message: "Category created successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async read(req, res, next) {
        try {
            const { page, limit, sort, ...query } = req.query;

            const options = {
                projection: null,
                query,
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
                sort: sort ? JSON.parse(sort) : {},
            };

            const result = await ReadCategory.execute(options);

            res.status(200).json({
                message: "Category fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();
