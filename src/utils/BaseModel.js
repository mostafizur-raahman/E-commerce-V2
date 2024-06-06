import { Schema, model } from "mongoose";

class BaseModel {
    constructor(modelName, schemaDefinition, options = {}) {
        const baseSchema = new Schema(
            {
                isDeleted: {
                    type: Boolean,
                    default: false,
                },
                ...schemaDefinition,
            },
            { timestamps: true, ...options }
        );

        this.model = model(modelName, baseSchema);
    }

    getModel() {
        return this.model;
    }
}

export default BaseModel;
