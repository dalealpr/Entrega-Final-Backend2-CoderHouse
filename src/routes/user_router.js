import { Router } from 'express';
import { userController } from '../controllers/user_controller.js';
import passport from "passport";
import { checkRole } from '../middlewares/check_role.js';
// Validaciones
import { validate } from '../middlewares/validate.js';
import { userSchema } from '../validations/user_validation.js';
import { mongoIdSchema } from '../validations/mongoId_validation.js';

const router = Router();

// Auth
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post(
    '/refresh-token',
    passport.authenticate('jwt-header', { session: false }),
    userController.refreshToken
)
router.post(
    '/register',
    validate(userSchema), 
     userController.register)

// User Profile
router.get(
    '/profile/:id',
    passport.authenticate('jwt-header', { session: false }),
    (validate(mongoIdSchema, 'params')),
    userController.profile
);

// User CRUD
router.get(
    '/',
    passport.authenticate('jwt-header', { session: false }),
    checkRole(["admin"]),
    userController.getAll
) 

router.route('/:id')
    .all(passport.authenticate('jwt-header', { session: false }),checkRole(["admin"]),(validate(mongoIdSchema, 'params')))
    .put(
        validate(userSchema), 
        userController.update
    ) 
    .delete(userController.delete) 

export default router;