const BaseRepository = require("../../../utils/BaseRepository.js");
const Product = require("../product.model.js");

class ReadProduct {
    constructor() {
        this.repository = new BaseRepository(Product);
    }

    async execute(options) {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;

        const pipeline = [
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: {
                    path: "$category",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    categoryName: "$category.name",
                },
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "role",
                },
            },
            {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    roleName: "$role.name",
                },
            },
            {
                $project: {
                    role: 0,
                    category: 0,
                },
            },
            {
                $facet: {
                    paginatedResults: [{ $skip: skip }, { $limit: limit }],
                    totalCount: [{ $count: "count" }],
                },
            },
        ];

        const aggregatedResults = await this.repository.aggregate(pipeline);

        const results = aggregatedResults[0].paginatedResults;
        const totalCount = aggregatedResults[0].totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalCount / limit);

        return {
            results,
            page,
            totalPages,
            totalCount,
        };
    }
}

module.exports = new ReadProduct();
