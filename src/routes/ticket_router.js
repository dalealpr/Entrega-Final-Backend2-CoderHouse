import { Router } from "express";
import { ticketController } from "../controllers/ticket_controller.js";
import passport from "passport";
import { checkRole } from "../middlewares/check_role.js";
// Validaciones
import { validate } from "../middlewares/validate.js";
import { ticketSchema } from "../validations/ticket_validation.js";
import { mongoIdSchema } from "../validations/mongoId_validation.js";

const router = Router();

// Generate Ticket
router.post(
    "/purchase", 
    passport.authenticate('jwt-header', { session: false }),   
    validate(ticketSchema), 
    ticketController.generateTicket
);

// Ticket CRUD
router.get(
    "/",
    passport.authenticate('jwt-header', { session: false }),  
    checkRole(["admin"]),
    ticketController.getAll
); 

router.route('/:id')
    .all(passport.authenticate('jwt-header', { session: false }),(validate(mongoIdSchema, 'params')))
    .get(ticketController.getById) 
    .put(
        checkRole(["admin"]),
        validate(ticketSchema),
        ticketController.update
    ) 
    .delete(
        checkRole(["admin"]),
        ticketController.delete
    )  

export default router;

