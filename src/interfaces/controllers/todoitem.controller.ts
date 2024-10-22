import { TodoItemService } from "@/application/services/TodoItemService";
import { Request, Response } from "express";

export class TodoItemController {
  constructor(private todoItemService: TodoItemService) {
    this.todoItemService = todoItemService;
  }

  createTodoItem = async (req: Request, res: Response) => {
    const item = await this.todoItemService.createTodoItem(req.body);
    return res.status(201).json(item);
  };

  getTodoItemById = async (req: Request, res: Response) => {
    const item = await this.todoItemService.getTodoItemById(
      Number(req.params.id)
    );
    return res.status(200).json(item);
  };

  updateTodoItem = async (req: Request, res: Response) => {
    const item = await this.todoItemService.updateTodoItem(
      Number(req.params.id),
      req.body
    );
    return res.status(202).json(item);
  };

  deleteTodoItem = async (req: Request, res: Response) => {
    const item = await this.todoItemService.deleteTodoItem(
      Number(req.params.id)
    );
    return res.status(204).end();
  };

  getAllItems = async (req: Request, res: Response) => {
    const items = await this.todoItemService.getAllItems();
    return res.status(200).json(items);
  };

  markComplete = async (req: Request, res: Response) => {
    const item = await this.todoItemService.markComplete(Number(req.params.id));
    return res.status(202).json(item);
  };
}
