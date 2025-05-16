import express from "express";
import { initMongoDb } from "./config/db/connect_mongo.js";
import { errorHandler } from "./middlewares/error_handler.js";
import { logger } from "./middlewares/logger.js";
import 'dotenv/config'
import cors from "cors"
// Passport Auth
import passport from "passport";
import "./config/passport/jwt_strategy.js"; 
// Cookies
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/index_router.js";
// Variables de entorno
import dotenv from "dotenv";
import { initializeRoles } from "./config/initialize_roles.js";

dotenv.config();

const app = express()

// --------  CORS -------- //
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto al origen correcto de tu frontend
    credentials: true, // Permitir el envío de cookies y credenciales
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
  })
);

app
  // Uso de cookies
  .use(cookieParser())
  // Envio y lectura solicitudes Json
  .use(express.json())
  // Enviar solicitudes a travez de formularios HTML
  .use(express.urlencoded({ extended: true }))
  // Error middleware
  .use(errorHandler)
  // Middleware que muestra las respuestas en consola
  .use(logger)
  // 🟢 Inicializa passport
 .use(passport.initialize())
  // Routes
  .use("/api/v1", apiRouter.getRouter())

// ------------- Conexion MongoDB ------------- //
initMongoDb()
  .then(() => console.log("Conectado a mongoDB 🌿"))
  .catch((error) => console.log(error));

// Inicializar roles
await initializeRoles()  

// --------  RUTA PRUEBA -------- //
app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("\nServidor andando en el puerto " + PORT + " 🌎"));