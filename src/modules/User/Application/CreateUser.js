const BaseRepository = require("../../../utils/BaseRepository.js");
const { hashPassword } = require("../../../utils/hashing.js");
const User = require("../user.model.js");

class CreateUser {
    constructor() {
        this.repository = new BaseRepository(User);
    }

    async execute(data) {
        const { email, password } = data;

        const isExist = await this.repository.existsByQuery({
            email,
            isDeleted: false,
        });

        data.password = await hashPassword(password);

        if (isExist) {
            throw new Error("User already exist");
        }

        const projection = this.repository.defaultProjection;

        const result = await this.repository.create(data, projection);

        return result;
    }
}

module.exports = new CreateUser();
