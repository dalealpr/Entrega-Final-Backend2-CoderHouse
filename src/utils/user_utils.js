import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

// Hashea la contrasena 
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Compara la contrasena dada por el usuario con la que se encuentra hasheada en la DB
export const isValidPassword = (passwordPlain, passwordHash) => {
    return bcrypt.compareSync(passwordPlain, passwordHash);
};

// Generar Token 
export const generateTokens = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        cartId: user.cart
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    return { accessToken, refreshToken };
};