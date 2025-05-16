import { ticketService } from "../services/ticket_service.js";
import { createResponse } from '../utils/response.js'

export default class TicketController {
  constructor(service) {
    this.service = service;
  }

  generateTicket =  async (req, res, next) => {
    try {
     const user = req.user;
     const ticket = await this.service.generateTicket(user)
     createResponse(res, 201, ticket)
    } catch (error) {
      next(error);
    }
  }

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

export const ticketController = new TicketController(ticketService);