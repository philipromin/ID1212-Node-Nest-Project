import { Repository, EntityRepository } from "typeorm";
import { Todo } from "./todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoStatus } from "./todo-status.enum";
import { GetTodosFilterDto } from "./dto/get-todo-filter.dto";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    
    async getTodos(filterDto: GetTodosFilterDto): Promise<Todo[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('todo');

        if(status) {
            query.andWhere('todo.status = :status', { status });
        }

        if(search) {
            query.andWhere('todo.description LIKE :search', { search: `%${search}%`});
        }

        const todos = await query.getMany();
        return todos;
    }
    
    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const { description } = createTodoDto;

        const todo = new Todo();
        todo.description = description;
        todo.status = TodoStatus.IN_PROGRESS;
        await todo.save();

        return todo;
    }
}