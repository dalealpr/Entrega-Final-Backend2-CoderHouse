import { ticketDaoMongo } from "../daos/mongodb/ticket_dao.js";
import { productService } from "./product_service.js";
import { cartService } from "./cart_service.js";
import CustomError from "../utils/custom_error.js";
import { v4 as uuidv4 } from "uuid";

export default class TicketService {
  constructor(dao) {
    this.dao = dao;
  }

  generateTicket = async (user) => {
    try {
      // busca el Id del carrito
      const cart = await cartService.getById(user.cartId);
      console.log("CartIDService: ", cart);
      // Variable Monto total del carrito
      let amountAcc = 0;
      // Recorre el carrtito
      for (const prod of cart.products) {
        const idProd = prod.product;
        // Busca el producto por el id
        const prodDB = await productService.getById(idProd);
        // Ve si la cantidad del producto del carrito supera el stock
        if (prod.quantity > prodDB.stock) {
          throw new CustomError("The quantity exceeds the product stock", 404);
        }
        // si la cantidad del producto del carrito NO supera el stock
        const amount = prod.quantity * prodDB.price; //cantidad por precio del producto del carrito
        // Sumatoria montos
        amountAcc += amount;
      }
      // Creacion de ticket con el monto Total
      const ticket = await this.dao.create({
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
      });
      // Vaciar el carrito al crear el ticket
      await cartService.clearCart(user.cartId);

      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  };

  // ------------------------ CRUD ------------------------ //

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      if (!response) throw new CustomError("Ticket no encontrado", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };


  update = async (id, body) => {
    try {
      const response = await this.dao.update(id, body);
      if (!response) throw new CustomError("Ticket no encontrado", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new CustomError("Ticket no encontrado", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
}

export const ticketService = new TicketService(ticketDaoMongo);
