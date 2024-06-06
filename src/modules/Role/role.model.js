const BaseModel = require("../../utils/BaseModel.js");

const roleSchemaDefinition = {
    name: {
        type: String,
        enum: ["customer", "merchant", "admin"],
        required: true,
    },
};

class RoleModel extends BaseModel {
    constructor() {
        super("Role", roleSchemaDefinition);
    }
}

const Role = new RoleModel().getModel();

module.exports = Role;
