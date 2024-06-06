const BaseRepository = require("../../../utils/BaseRepository.js");
const Role = require("../role.model.js");

class CreateRole {
    constructor() {
        this.roleRepository = new BaseRepository(Role);
    }

    async execute(data) {
        const { name } = data;

        const isExist = await this.roleRepository.existsByQuery({
            name,
            isDeleted: false,
        });

        console.debug(isExist, name);

        if (isExist) {
            throw new Error("Role already exist");
        }

        const projection = this.roleRepository.defaultProjection;

        const result = await this.roleRepository.create(data, projection);

        return result;
    }
}

module.exports = new CreateRole();
