import { UserModel } from "../daos/mongodb/models/user_model.js";
import CustomError from "../utils/custom_error.js";

export const checkRole = (roles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        throw new CustomError("No autorizado", 401);
      }

      // Buscamos al usuario y populamos su rol
      const user = await UserModel.findById(req.user.id).populate("role");
      console.log("user")

      if (!user) {
        throw new CustomError("Usuario no encontrado", 404);
      }

      if (!roles.includes(user.role.name)) {
        throw new CustomError("No tiene permisos para acceder a este recurso", 403);
      }

      // Pasamos al siguiente middleware o controlador
      next();
    } catch (error) {
      next(error);
    }
  };
};