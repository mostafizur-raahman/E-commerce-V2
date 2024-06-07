const BaseModel = require("../../utils/BaseModel.js");

const SchemaDefinition = {
    name: {
        type: String,
        unique: true,
        required: true,
    },
};

class CategoryModel extends BaseModel {
    constructor() {
        super("Category", SchemaDefinition);
    }
}

const Category = new CategoryModel().getModel();

module.exports = Category;
