import { TodoItemService } from "@/application/services/TodoItemService";
import { TodoItem } from "@/domain/entities/TodoItem";
import { getRepository } from "@/infrastructure/repositories";
import { Router } from "express";
import { TodoItemController } from "../controllers/todoitem.controller";

const router = Router();

const todoitemRepository = getRepository(TodoItem);
const todoItemService = new TodoItemService(todoitemRepository);
const todoitemController = new TodoItemController(todoItemService);

router.route("/").post(todoitemController.createTodoItem);
router
  .route("/:id")
  .get(todoitemController.getTodoItemById)
  .put(todoitemController.updateTodoItem);

export default router;
