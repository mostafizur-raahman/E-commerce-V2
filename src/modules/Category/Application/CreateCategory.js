const BaseRepository = require("../../../utils/BaseRepository.js");
const Category = require("../category.model.js");

class CreateCategory {
    constructor() {
        this.repository = new BaseRepository(Category);
    }

    async execute(data) {
        const projection = this.repository.defaultProjection;

        const isExists = await this.repository.existsByQuery({
            name: data.name,
            isDeleted: false,
        });

        if (isExists) {
            throw new Error("Category already exists");
        }

        const result = await this.repository.create(data, projection);

        return result;
    }
}

module.exports = new CreateCategory();
