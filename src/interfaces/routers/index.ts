import { Router } from "express";
import todoitemRouter from "./todoitem.router";
import uploadRouter from "./upload.router";
import userRouter from "./user.router";

const appRouter = Router();

appRouter.use("/todos", todoitemRouter);
appRouter.use("/uploads", uploadRouter);
appRouter.use("/users", userRouter);

export { appRouter };
