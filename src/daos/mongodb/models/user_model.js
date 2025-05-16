import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },

  // Id Carrito del usuario (foreign key)
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
    default: null
  }
});

export const UserModel = model('users', usersSchema); 