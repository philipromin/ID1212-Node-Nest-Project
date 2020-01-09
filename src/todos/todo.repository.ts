import { Repository, EntityRepository } from "typeorm";
import { Todo } from "./todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoStatus } from "./todo-status.enum";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const { description } = createTodoDto;

        const todo = new Todo();
        todo.description = description;
        todo.status = TodoStatus.IN_PROGRESS;
        await todo.save();

        return todo;
    }
}