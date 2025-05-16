import { cartService } from "../services/cart_service.js";
import { createResponse } from "../utils/response.js";

export default class CartController {
    constructor(service){
        this.service = service
    }

    addProdToCart = async (req, res, next) => {
        try {
          const {cartId} = req.user;
          const { idProd } = req.params;
          console.log("cartId: ", cartId)
          const newProdToUserCart = await this.service.addProdToCart(
            cartId,
            idProd
          );
          createResponse(res, 200, newProdToUserCart);
        } catch (error) {
          next(error);
        }
    };

    removeProdToCart = async (req, res, next) => {
        try {
          const {cartId} = req.user;
          const { idProd } = req.params;
          const delProdToUserCart = await this.service.removeProdToCart(
            cartId,
            idProd
          );
          createResponse(res, 200, {
            msg: `Product ${delProdToUserCart._id} removed from cart`,
          });
        } catch (error) {
          next(error);
        }
    };

    updateProdQuantityToCart = async (req, res, next) => {
        try {
          const {cartId} = req.user;
          const { idProd } = req.params;
          const { quantity } = req.body;
          const updateProdQuantity = await this.service.updateProdQuantityToCart(
            cartId,
            idProd,
            quantity
          );
          createResponse(res, 200, updateProdQuantity);
        } catch (error) {
          next(error);
        }
    };

    clearCart = async (req, res, next) => {
        try {
          const { idCart } = req.params;
          const clearCart = await this.service.clearCart(idCart);
          createResponse(res, 200, clearCart);
        } catch (error) {
          next(error);
        }
    };

    // -------- CRUD  -------- //

    getAll = async (req, res, next) => {
        try {
          const data = await this.service.getAll();
          createResponse(res, 200, data);
        } catch (error) {
          next(error);
        }
      };
    
      getById = async (req, res, next) => {
        try {
          const { id } = req.params;
          const data = await this.service.getById(id);
          createResponse(res, 200, data);
        } catch (error) {
          next(error);
        }
      };
    
      create = async (req, res, next) => {
        try {
          const data = await this.service.create(req.body);
          createResponse(res, 200, data);
        } catch (error) {
          next(error);
        }
      };
    
      update = async (req, res, next) => {
        try {
          const { id } = req.params;
          const data = await this.service.update(id, req.body);
          createResponse(res, 200, data);
        } catch (error) {
          next(error);
        }
      };
    
      delete = async (req, res, next) => {
        try {
          const { id } = req.params;
          const data = await this.service.delete(id);
          createResponse(res, 200, data);
        } catch (error) {
          next(error);
        }
      };
    
}

export const cartController = new CartController(cartService)