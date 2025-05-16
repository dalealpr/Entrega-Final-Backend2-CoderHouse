import { Schema, model } from "mongoose"

const roleSchema = new Schema({
    name: {
        type: String,
        enum: ["admin", "user"],
        required: true,
        unique: true,
    },
});

export const RoleModel = model("roles", roleSchema);