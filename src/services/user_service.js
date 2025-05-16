import { cartDaoMongo } from "../daos/mongodb/cart_dao.js";
import { rolDaoMongo } from "../daos/mongodb/rol_dao.js";
import { userDaoMongo } from "../daos/mongodb/user_dao.js";
import UserDTO from "../dto/user_dto.js";
import CustomError from "../utils/custom_error.js";
import { createHash, generateTokens, isValidPassword } from "../utils/user_utils.js";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../services/email_service.js";


export default class UserService {
    constructor(dao) {
        this.dao = dao;
    }

    // ------------------------------- AUTH ------------------------------- //
    register = async (body) => {
        try {
            const { email, password, role } = body;
            const existUser = await this.dao.getByEmail(email);
            if (existUser) throw new CustomError("El correo electrónico ya está registrado", 400);
            const cartUser = await cartDaoMongo.create();

            // Normalizar el rol (minúsculas y sin espacios), o asignar 'user' por defecto
            const normalizedRole = role?.trim().toLowerCase() || "user";

            // Buscar el rol normalizado
            const roleDoc = await rolDaoMongo.getByFilter({ name: normalizedRole });

            if (!roleDoc) {
                throw new CustomError("Rol no válido. Solo se permite 'admin' o 'user'", 400);
            }

            const response = await this.dao.create({
                ...body,
                password: createHash(password),
                cart: cartUser._id,
                role: roleDoc._id
            });

            if (!response) throw new CustomError("Error al registrar usuario", 400);

            try {
                const subject = 'Bienvenido a la familia Ecommerce';
                const html = `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>¡Bienvenido/a a la familia Ecommerce!</h2>
                    <p>Nos complace tenerte en nuestra familia. Esperamos que realices tu primera compra.</p>
                    <p style="margin-top: 20px;">El equipo de Ecommerce</p>
                </div>
            `;
                await sendEmail(email, subject, html);
            } catch (mailError) {
                console.error("No se pudo enviar el correo de bienvenida:", mailError);
            }
            return response;
        } catch (error) {
            throw error; 
        }
    };

    login = async (email, password) => {
        try {
            // Busca si el usuario con el email ingresado existe en la DB  
            const userExist = await this.dao.getByEmail(email);
            if (!userExist) throw new CustomError("Credenciales incorrectas", 400);
            // Compara la contrasena ingresada con la contrasena hash de la DB 
            const passValid = isValidPassword(password, userExist.password);
            if (!passValid) throw new CustomError("Credenciales incorrectas", 400);
            // Si esta ok retorna el usuario
            return new UserDTO(userExist);
        } catch (error) {
            throw error;
        }
    };

    refreshToken = async (tokenFromCookie) => {
        try {
            if (!tokenFromCookie) throw new CustomError("No se proporcionó un token", 403);

            const decoded = jwt.verify(tokenFromCookie, process.env.JWT_REFRESH_SECRET);
            if (!decoded.id) throw new CustomError("Token inválido: sin ID", 400);

            const user = await this.dao.getById(decoded.id); // Usa su propio método ya validado

            const { accessToken, refreshToken } = generateTokens(user);

            return { accessToken, refreshToken };
        } catch (error) {
            throw error;
        }
    };


    // -------------------------------------------------------------- //

    getAll = async () => {
        try {
            const users = await this.dao.getAll();
            return users.map(user => new UserDTO(user));
        } catch (error) {
            throw new Error(error);
        }
    };

    getUserById = async (id) => {
        try {
            const user = await this.dao.getById(id);
            if (!user) throw new CustomError("Usuario no encontrado", 404);
            return new UserDTO(user);
        } catch (error) {
            throw error;
        }
    };

    getByEmail = async (email) => {
        try {
            const response = await this.dao.getByEmail(email);
            if (!response) throw new CustomError("Usuario no encontrado", 404);
            return response
        } catch (error) {
            throw error;
        }
    };

    update = async (id, body) => {
        try {
            const response = await this.dao.update(id, body);
            if (!response) throw new CustomError("Usuario no encontrado", 404);
            return new UserDTO(response);
        } catch (error) {
            throw error; // cambio a esto para no pizar el error seteado arriba con el CustomError()
        }
    };

    delete = async (id) => {
        try {
            const response = await this.dao.delete(id);
            if (!response) throw new CustomError("Usuario no encontrado", 404);
            return new UserDTO(response);
        } catch (error) {
            throw error; // cambio a esto para no pizar el error seteado arriba con el CustomError()
        }
    };

}

export const userService = new UserService(userDaoMongo);