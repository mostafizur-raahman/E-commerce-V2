const { mongoose } = require("mongoose");

class BaseRepository {
    constructor(model) {
        this.model = model;

        this.defaultProjection = {
            password: 0,
            __v: 0,
            isDeleted: 0,
            editors: 0,
        };

        // v2, updated
        this.baseProjection = {
            negative: {
                default: {
                    __v: 0,
                    isDeleted: 0,
                    states: 0,
                    createdBy: 0,
                },
                date: {
                    createdAt: 0,
                    updatedAt: 0,
                },
            },
        };

        this.modelName = model.modelName;
    }

    createObjectId(id) {
        mongoose.Types.ObjectId.createFromTime(id);
    }

    async createDocIfNotExist(query, entity, userId) {
        try {
            const doc = await this.model.findOne(query);

            if (!doc) {
                const newDoc = await this.create({
                    ...entity,
                    createdBy: userId,
                });

                return newDoc;
            }

            return doc;
        } catch (error) {
            throw error;
        }
    }

    async checkForUnAllowedItems(query, ids) {
        console.group("Checking for UnAllowed Items on ", this.modelName);
        console.debug(query);
        console.debug(ids);

        const doc = await this.model.findOne(query);

        console.debug(doc ? doc._id : null);
        console.groupEnd("Checking for UnAllowed Items on ", this.modelName);

        if (
            doc &&
            ((Array.isArray(ids) && ids.includes(doc._id.toString())) ||
                ids === doc._id.toString())
        ) {
            return false;
        }

        return true;
    }

    createLookupStage({ localField, foreignField = "_id", as, from }) {
        return [
            {
                $lookup: {
                    from: from,
                    localField: localField,
                    foreignField: foreignField,
                    as: as,
                },
            },
        ];
    }

    createLookupAndUnWindStage({ localField, foreignField = "_id", as, from }) {
        return [
            {
                $lookup: {
                    from: from,
                    localField: localField,
                    foreignField: foreignField,
                    as: as,
                },
            },
            {
                $unwind: {
                    path: "$" + `${as}`,
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];
    }

    async create(entity) {
        try {
            const doc = new this.model(entity);
            const newDoc = await doc.save(entity);

            return newDoc;
        } catch (error) {
            throw error;
        }
    }

    async createMany(entities) {
        try {
            const docs = await this.model.insertMany(entities);

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const doc = await this.model.findOne({ _id: id, isDeleted: false });

            return doc;
        } catch (error) {
            throw error;
        }
    }

    async findAll(projection = {}) {
        try {
            const docs = await this.model.find(
                { isDeleted: false },
                projection
            );

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async findAllWithPaigination(
        projection = this.defaultProjection,
        query = {},
        options = {}
    ) {
        const { page = 1, limit = 10, sort = {} } = options;
        const skip = (page - 1) * limit;

        const results = await this.model
            .find(query, projection)
            .skip(skip)
            .limit(limit)
            .sort(sort);

        const totalCount = await this.model.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        return {
            results,
            page,
            totalPages,
            totalCount,
        };
    }

    async updateById(id, entity) {
        try {
            const doc = await this.model.findOneAndUpdate(
                { _id: id, isDeleted: false },
                entity,
                { new: true }
            );

            return doc;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            const doc = await this.model.findOneAndUpdate(
                { _id: id, isDeleted: false },
                { isDeleted: true },
                { new: true }
            );

            return doc;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const docs = await this.model.updateMany(
                { isDeleted: false },
                { isDeleted: true },
                { new: true }
            );

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async findByQuery(query, sortOptions = {}, _selection = "-password") {
        try {
            const docs = await this.model
                .find(query)
                .select(_selection)
                .sort(sortOptions);

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async findOneByQuery(query) {
        console.group(this.model.modelName, "findOneByQuery");
        console.debug(query);
        console.groupEnd(this.model.modelName, "findOneByQuery");

        try {
            const doc = await this.model.findOne(query).lean().exec();

            return doc;
        } catch (error) {
            throw error;
        }
    }

    async updateManyByQuery(query, entity) {
        try {
            const docs = await this.model.updateMany(query, entity);

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async deleteManyByQuery(query, deletedBy) {
        try {
            const docs = await this.model.updateMany(query, {
                $set: {
                    isDeleted: true,
                    ...deletedBy,
                },
            });

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async hardDeleteManyByQuery(query) {
        try {
            const docs = await this.model.deleteMany(query);

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async countAll(query = { isDeleted: false }) {
        try {
            const count = await this.model.countDocuments(query);

            return count;
        } catch (error) {
            throw error;
        }
    }

    async countByQuery(query) {
        try {
            const count = await this.model.countDocuments(query);

            return count;
        } catch (error) {
            throw error;
        }
    }

    async existsById(id) {
        try {
            const doc = await this.model.findOne({ _id: id });

            return !!doc;
        } catch (error) {
            throw error;
        }
    }

    async existsByQuery(query) {
        try {
            const doc = await this.model.findOne(query);

            return !!doc;
        } catch (error) {
            throw error;
        }
    }

    async aggregate(queries) {
        try {
            console.time("Time spent in DB Query");

            const docs = await this.model.aggregate(queries);

            console.timeEnd("Time spent in DB Query");

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async getDistinct(
        field,
        query = { [field]: { $exists: true, $ne: null } }
    ) {
        try {
            const docs = await this.model.distinct(field, query);

            return docs;
        } catch (error) {
            throw error;
        }
    }

    async findLast() {
        try {
            const doc = await this.model.findOne().sort({ createdAt: -1 });

            return doc;
        } catch (error) {
            throw error;
        }
    }

    async createDateRangeQuery(range) {
        let _date = null;

        if (range === "daily") {
            _date = new Date();
        } else if (range === "weekly") {
            _date = new Date();
            _date.setDate(_date.getDate() - 7);
        } else if (range === "monthly") {
            _date = new Date();
            _date.setDate(_date.getDate() - 30);
        }

        _date.setHours(0, 0, 0, 0);
        return _date;
    }
}
module.exports = BaseRepository;
