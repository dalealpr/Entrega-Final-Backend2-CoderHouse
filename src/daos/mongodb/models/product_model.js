import { Schema, model } from "mongoose";
// Paginado
import mongoosePaginate from "mongoose-paginate-v2"

export const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
})
// Metodo Paginado
productSchema.plugin(mongoosePaginate);

export const ProductModel = model('products', productSchema);