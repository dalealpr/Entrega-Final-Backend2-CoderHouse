
import { productService } from "../services/product_service.js";
import { createResponse } from "../utils/response.js";

class ProductController {
  constructor(service) {
    this.service = service;
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

export const productController = new ProductController(productService);