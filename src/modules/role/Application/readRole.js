import BaseRepository from "../../../utils/BaseRepository.js";
import Role from "../role.model.js";

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

export default new ReadRole();
