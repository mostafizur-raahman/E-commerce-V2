const BaseRepository = require("../../../utils/BaseRepository.js");
const User = require("../user.model.js");

class ReadUser {
    constructor() {
        this.repository = new BaseRepository(User);
    }

    async execute(options = {}) {
        const { projection, query, page, limit, sort } = options;

        const result = await this.repository.findAllWithPaigination(
            projection,
            query,
            { page, limit, sort }
        );

        return result;
    }
}

module.exports = new ReadUser();
