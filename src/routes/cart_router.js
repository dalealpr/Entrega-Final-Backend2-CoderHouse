import { Router } from "express";
import { cartController } from "../controllers/cart_controller.js";
import passport from "passport";
import { checkRole } from "../middlewares/check_role.js";
// Validaciones
import { validate } from "../middlewares/validate.js";
import { cartSchema } from "../validations/cart_validation.js";
import { mongoIdSchema } from "../validations/mongoId_validation.js";

const router = Router();

router.route("/products/:idProd")
    .all(passport.authenticate('jwt-header', { session: false }),)
    .post(cartController.addProdToCart)
    .delete(cartController.removeProdToCart)
    .put(cartController.updateProdQuantityToCart)

router.delete(
    "/clear/:idCart",
    passport.authenticate('jwt-header', { session: false }),
    (validate(mongoIdSchema, 'params')),
    cartController.clearCart
);

// Cart CRUD
router.route("/")
    .all(passport.authenticate('jwt-header', { session: false }))
    .get(
        checkRole(["admin"]),
        cartController.getAll
    )
//No se puede usar (create) ya que no se puede crear un carrito sin un user asociadoa este
// .post(cartController.create) 

router.route("/:id")
    .all(passport.authenticate('jwt-header', { session: false }),(validate(mongoIdSchema, 'params')))
    .put(
        validate(cartSchema),//Validacion
        checkRole(["admin"]),
        cartController.update
    )
    //No se puede usar (delete) ya que al eliminar un carrito un user quedaria sin su cart asociado
    // .delete(cartController.delete) 
    .get(cartController.getById)

export default router;