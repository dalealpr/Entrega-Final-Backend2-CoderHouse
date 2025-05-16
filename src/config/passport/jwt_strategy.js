import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";


const strategyHeaderJwt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyToken = async (jwt_payload, done) => {
  try {
    if (!jwt_payload) return done(null, false, { message: "Invalid Token" });

    return done(null, jwt_payload); // Se guarda como req.user
  } catch (error) {
    return done(error, false);
  }
};

passport.use('jwt-header', new JwtStrategy(strategyHeaderJwt, verifyToken));