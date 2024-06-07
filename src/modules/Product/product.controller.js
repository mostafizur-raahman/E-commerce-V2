const CreateProduct = require("./Application/CreateProduct");
const ReadProduct = require("./Application/ReadProduct");

class ProductController {
    async create(req, res, next) {
        try {
            const result = await CreateProduct.execute(req.body);

            res.status(200).json({
                message: "Product created successfully",
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
            const result = await ReadProduct.execute(options);
            res.status(200).json({
                message: "Products fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
