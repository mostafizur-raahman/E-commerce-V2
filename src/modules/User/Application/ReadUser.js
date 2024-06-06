const BaseRepository = require("../../../utils/BaseRepository.js");
const User = require("../user.model.js");

class ReadUser {
    constructor() {
        this.repository = new BaseRepository(User);
    }

    async execute() {
        const projection = this.repository.defaultProjection;

        const result = await this.repository.findAll(projection);

        return result;
    }
}

module.exports = new ReadUser();
