import { cartDaoMongo } from "../daos/mongodb/cart_dao.js";
import CustomError from "../utils/custom_error.js";
import { productService } from "./product_service.js";

class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  // ------ Metodos Privados de la clase ------//
  #existCart = async (id) => {
    const cart = await this.dao.getById(id);
    if (!cart) throw new CustomError("Carrito no encontrado", 404);
    return cart;
  };

  #existProdInCart = async (cartId, prodId) => {
    const product = await this.dao.existProdInCart(cartId, prodId);
    if (!product) throw new CustomError("Producto no encontrado", 404);
    return product;
  };

  // ------ Métodos Públicos ------ //
  getById = async (id) => {
    return await this.#existCart(id);
  };

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  existProdInCart = async (cartId, prodId) => {
    return await this.#existProdInCart(cartId, prodId);
  };

  addProdToCart = async (cartId, prodId) => {
    const cart = await this.#existCart(cartId);
    await productService.getById(prodId); // lanza error si no existe
    return await this.dao.addProdToCart(cart._id, prodId);
  };

  removeProdToCart = async (cartId, prodId) => {
    const cart = await this.#existCart(cartId);
    await this.#existProdInCart(cartId, prodId);
    return await this.dao.removeProdToCart(cart._id, prodId);
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    const cart = await this.#existCart(cartId);
    await this.#existProdInCart(cartId, prodId);
    return await this.dao.updateProdQuantityToCart(cart._id, prodId, quantity);
  };

  clearCart = async (cartId) => {
    const cart = await this.#existCart(cartId);
    return await this.dao.clearCart(cart._id);
  };


  delete = async (cartId) => {
    try {
      const response = await this.dao.delete(cartId);
      if (!response) throw new CustomError("Carrito no encontrado", 404);
    } catch (error) {
      throw error; 
    }
  };
}

export const cartService = new CartService(cartDaoMongo);