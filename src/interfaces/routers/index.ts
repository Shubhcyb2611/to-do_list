import { Router } from "express";
import  todoitemRouter from "./todoitem.router"

const appRouter = Router();

appRouter.use("/todos" , todoitemRouter)

export {appRouter}