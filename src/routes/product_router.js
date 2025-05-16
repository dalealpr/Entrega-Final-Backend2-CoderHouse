import { Router } from "express";
import { productController } from "../controllers/product_controller.js";
import passport from "passport";
import { checkRole } from "../middlewares/check_role.js";
// Validaciones
import { validate } from "../middlewares/validate.js";
import { productSchema } from "../validations/product_validation.js";
import { mongoIdSchema } from "../validations/mongoId_validation.js";

const router = Router();

// Product CRUD
router.route("/")
  .all(passport.authenticate('jwt-header', { session: false }),)
  .get(productController.getAll)
  .post(
    checkRole(["admin"]),
    validate(productSchema),
    productController.create
  ) 

router.route("/:id")
  .all(passport.authenticate('jwt-header', { session: false }),(validate(mongoIdSchema, 'params')))
  .get(productController.getById)
  .put(
    validate(productSchema),
    checkRole(["admin"]),
    productController.update
  ) 
  .delete(
    checkRole(["admin"]),
    productController.delete
  ) 

export default router;