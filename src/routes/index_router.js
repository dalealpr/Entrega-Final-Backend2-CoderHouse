import { Router } from "express";
import productRouter from "./product_router.js";
import userRouter from "./user_router.js";
import cartRouter from "./cart_router.js";
import ticketRouter from "./ticket_router.js";


export default class MainRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.use("/products", productRouter);
        this.router.use("/users", userRouter);
        this.router.use("/carts", cartRouter);
        this.router.use("/tickets", ticketRouter);
    }

    getRouter() {
        return this.router;
    }
}

export const apiRouter = new MainRouter();