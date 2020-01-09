import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {

    constructor(
        @InjectRepository(TodoRepository)
        private todoRepository: TodoRepository
    ) {}

    async getTodoById(id: number): Promise<Todo> {
        const found =  await this.todoRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        return found;
    }

    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoRepository.createTodo(createTodoDto);
    }

    async deleteTodo(id: number): Promise<void> {
        const result = await this.todoRepository.delete(id);
    }

    /* 
    getAllTodos(): Todo[] {
        return this.todos;
    }

    

    updateTodoStatus(id: string, status: TodoStatus): Todo {
        const todo = this.getTodoById(id);
        todo.status = status;
        return todo;
    } 
    */
}
