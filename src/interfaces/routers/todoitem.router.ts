import { TodoItemService } from "@/application/services/TodoItemService";
import { TodoItem } from "@/domain/entities/TodoItem";
import { getRepository } from "@/infrastructure/repositories";
import { Router } from "express";
import { TodoItemController } from "../controllers/todoitem.controller";

const router = Router();

const todoItemRepository = getRepository(TodoItem);
const todoItemService = new TodoItemService(todoItemRepository);
const todoItemController = new TodoItemController(todoItemService);

router
  .route("/")
  .post(todoItemController.createTodoItem)
  .get(todoItemController.getAllItems);

router
  .route("/:id")
  .get(todoItemController.getTodoItemById)
  .put(todoItemController.updateTodoItem)
  .delete(todoItemController.deleteTodoItem);

router.route("/:id/markComplete").put(todoItemController.markComplete);

export default router;
