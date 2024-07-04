import { Router } from "express";
import todoitemRouter from "./todoitem.router";
import uploadRouter from "./upload.router";

const appRouter = Router();

appRouter.use("/todos", todoitemRouter);
appRouter.use("/uploads", uploadRouter);

export { appRouter };
