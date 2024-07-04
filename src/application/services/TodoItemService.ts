import { TodoItem } from "@/domain/entities/TodoItem";
import { GenericRepository } from "@/infrastructure/repositories";

export class TodoItemService {
  constructor(private todoitemRepository: GenericRepository<TodoItem>) {}

  async createTodoItem(itemData) {
    const item = await this.todoitemRepository.create(itemData);
    return item;
  }

  async getTodoItemById(itemId: number) {
    try {
      const item = await this.todoitemRepository.findById(itemId);
      if (!item) throw new Error("404::To-do Item not found ");
      return item;
    } catch (error) {
      throw new Error("500::Internal Server Error");
    }
  }

  async updateTodoItem(itemId: number, itemData) {
    try {
      const item = await this.todoitemRepository.findByIdAndUpdate(
        itemId,
        itemData
      );
      if (!item) throw new Error("404::To-do Item not found ");

      return item;
    } catch (error) {
      console.log(error);
      throw new Error("500::Internal Server Error");
    }
  }

  async deleteTodoItem(itemId: number) {
    const item = await this.todoitemRepository.findByIdAndDelete(itemId);

    return item;
  }

  async getAllItems() {
    const items = await this.todoitemRepository.findMany({});
    return items;
  }

  async markComplete(itemId: number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const item = await this.todoitemRepository.findByIdAndUpdate(itemId, {
      completed: true,
      dateOfCompletion: new Date(),
    });
    return item;
  }
}
