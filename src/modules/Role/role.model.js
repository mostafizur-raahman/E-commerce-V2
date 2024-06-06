import BaseModel from "../../utils/BaseModel.js";

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

export default Role;
