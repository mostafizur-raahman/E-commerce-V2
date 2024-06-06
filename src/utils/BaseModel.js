const { Schema, model } = require("mongoose");

class BaseModel {
    constructor(modelName, schemaDefinition, options = {}) {
        const baseSchema = new Schema(
            {
                ...schemaDefinition,
                isDeleted: {
                    type: Boolean,
                    default: false,
                },
            },
            { timestamps: true, ...options }
        );

        this.model = model(modelName, baseSchema);
    }

    getModel() {
        return this.model;
    }
}

module.exports = BaseModel;
