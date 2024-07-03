import { TodoItem } from "@/domain/entities/TodoItem";
import { GenericRepository } from "@/infrastructure/repositories";



export class TodoItemService{
    constructor(private todoitemRepository : GenericRepository<TodoItem>){}

    async createTodoItem(itemData){
        const item = await this.todoitemRepository.create(itemData);
        return item ;
    }
    async getTodoItemById(itemId : number){
        const item = await this.todoitemRepository.findById(itemId);
        if(!item) throw new Error("404::To-do Item not found ");
        return item ;
    }
     async updateTodoItem(itemId : number , itemData){
        const item = await this.todoitemRepository.findByIdAndUpdate(itemId , itemData)
        if(!item) throw new Error("404::To-do Item not found ");
        return item ;
    }
}