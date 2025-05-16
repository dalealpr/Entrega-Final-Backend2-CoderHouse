import { Schema, model } from "mongoose";

export const cartSchema = new Schema({
    products:[
        {
            //Sin Id, Cada producto trae su propio ID
            _id:false, 
            // Cantidad del producto
            quantity: {
                type: Number,
                default: 1 
              },
            //   Id del producto del carrito (foreign key)
              product: {
                type: Schema.Types.ObjectId,
                ref: "products" 
              }
        }
    ]
})

export const CartModel = model("carts", cartSchema);