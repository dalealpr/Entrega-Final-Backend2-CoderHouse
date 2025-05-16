import { userService } from "../services/user_service.js";
import { cartService } from "../services/cart_service.js";
import { createResponse } from "../utils/response.js";
import { generateTokens } from "../utils/user_utils.js";


export default class UserController {
    constructor(service) {
        this.service = service;
    }

    // ------------------------------- AUTH ------------------------------- //
    register = async (req, res, next) => {
        try {
            const response = await this.service.register(req.body)
            res.status(201).json(response)
        } catch (error) {
            next(error);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await this.service.login(email, password);
            //   Token
            const { accessToken, refreshToken } = generateTokens(user);

            // Puedes guardar el refreshToken en BD si quieres invalidarlo luego (opcional)
            // await this.service.saveRefreshToken(user._id, refreshToken);

            res
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
                    sameSite: "Lax",
                })
                .status(200)
                .json({
                    message: "Login exitoso",
                    user,
                    accessToken, // este se maneja en memoria en el front
                });
        } catch (error) {
            next(error);
        }
    };

    refreshToken = async (req, res, next) => {
        try {
            const tokenFromCookie = req.cookies.refreshToken;
            const { accessToken, refreshToken } = await this.service.refreshToken(tokenFromCookie);

            res
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sameSite: "Lax",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                })
                .status(200)
                .json({ message: "Token refreshed", accessToken });
        } catch (error) {
            next(error);
        }
    };

    logout = async (req, res, next) => {
        try {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "Lax",
            });
            res.status(200).json({ message: "Logout exitoso" });
        } catch (error) {
            next(error);
        }
    };


    // ------------------------ CRUD  ------------------------ //
    getAll = async (req, res, next) => {
        try {
            const response = await this.service.getAll();
            res.status(200).json(response)
        } catch (error) {
            next(error); // Pasamos el error al servicio
        }
    };

    profile = async (req, res, next) => {
        try {
            const { id } = req.params; //req.user
            const user = await this.service.getUserById(id);
            createResponse(res, 200, user);
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await this.service.update(id, req.body);
            res.status(200).json(response)
        } catch (error) {
            next(error); // Pasamos el error al servicio
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params
            // Buscar al usuario primero para obtener su cartId
            const user = await this.service.getUserById(id);
            const cartId = user.cart;

            if (cartId) {
                await cartService.delete(cartId); // Usa tu método delete del cartService
            }

            const response = await this.service.delete(id);
            res.status(200).json(response)
        } catch (error) {
            next(error); // Pasamos el error al servicio
        }
    };
}

export const userController = new UserController(userService)