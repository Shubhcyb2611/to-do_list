import { TodoItemService } from "@/application/services/TodoItemService";
import { TodoItem } from "@/domain/entities/TodoItem";
import { getRepository } from "@/infrastructure/repositories";
import { Router } from "express";
import { TodoItemController } from "../controllers/todoitem.controller";
import { UseRequestDto, UseResponseDto } from "../middleware";
import { CreateTodoItemDTO } from "@/application/dtos/todoItem/createtodoItem";
import { TodoItemResponseDTO } from "@/application/dtos/todoItem/todoItem.dto";
import { UpdateTodoItemDTO } from "@/application/dtos/todoItem/updatetodoItem";

const router = Router();

const todoItemRepository = getRepository(TodoItem);
const todoItemService = new TodoItemService(todoItemRepository);
const todoItemController = new TodoItemController(todoItemService);

router
  .route("/")
  .post(
    UseRequestDto(CreateTodoItemDTO),
    UseResponseDto(TodoItemResponseDTO),
    todoItemController.createTodoItem
  )
  .get(UseResponseDto(TodoItemResponseDTO), todoItemController.getAllItems);

router
  .route("/:id")
  .get(UseResponseDto(TodoItemResponseDTO), todoItemController.getTodoItemById)
  .put(
    UseRequestDto(UpdateTodoItemDTO),
    UseResponseDto(TodoItemResponseDTO),
    todoItemController.updateTodoItem
  )
  .delete(todoItemController.deleteTodoItem);

router
  .route("/:id/markComplete")
  .put(
    UseRequestDto(UpdateTodoItemDTO),
    UseResponseDto(TodoItemResponseDTO),
    todoItemController.markComplete
  );

export default router;
