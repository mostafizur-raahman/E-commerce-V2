const BaseRepository = require("../../../utils/BaseRepository.js");
const Role = require("../../Role/role.model.js");
const Product = require("../product.model.js");

class CreateProduct {
    constructor() {
        this.repository = new BaseRepository(Product);
        this.roleRepository = new BaseRepository(Role);
    }

    async execute(data) {
        const isExist = await this.repository.existsByQuery({
            slug: data.slug,
            isDeleted: false,
        });

        if (isExist) {
            throw new Error("slug already exist");
        }

        const merchant = await this.roleRepository.findById(data.roleId);

        if (!merchant) {
            throw new Error("Merchant not found");
        }
        if (merchant.name !== "merchant") {
            throw new Error("Only merchant can create product");
        }

        const projection = this.repository.defaultProjection;

        const result = await this.repository.create(data, projection);

        return result;
    }
}

module.exports = new CreateProduct();
