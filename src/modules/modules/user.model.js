import BaseModel from "../../utils/BaseModel.js";

const roleSchemaDefinition = {
    name: {
        type: String,
        required: true,
    },
    image: String,
    phoneNo: {
        type: String,
        required: [true, "Please enter a phone number"],
    },
    email: {
        type: String,
        required: [true, "please enter an email address"],
    },
    password: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: [true, "please enter a password"],
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
};

class UserModel extends BaseModel {
    constructor() {
        super("User", roleSchemaDefinition);
    }
}

const User = new UserModel().getModel();

export default User;
