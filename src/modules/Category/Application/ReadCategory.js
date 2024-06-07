const BaseRepository = require("../../../utils/BaseRepository.js");
const Category = require("../category.model.js");

class ReadCategory {
    constructor() {
        this.repository = new BaseRepository(Category);
    }

    async execute(options) {
        const { projection, query, page, limit, sort } = options;

        const result = await this.repository.findAllWithPaigination(
            projection,
            query,
            { page, limit, sort }
        );

        return result;
    }
}

module.exports = new ReadCategory();
