const BaseRepository = require("../../../utils/BaseRepository.js");
const Role = require("../role.model.js");

class ReadRole {
    constructor() {
        this.roleRepository = new BaseRepository(Role);
    }

    async execute() {
        const projection = this.roleRepository.defaultProjection;

        const result = await this.roleRepository.findAll(projection);

        return result;
    }
}

module.exports = new ReadRole();
