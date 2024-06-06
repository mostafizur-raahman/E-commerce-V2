import BaseRepository from "../../../utils/BaseRepository.js";
import User from "../user.model.js";

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

export default new ReadUser();
