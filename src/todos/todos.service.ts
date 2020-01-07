import * as uuid from 'uuid/v1';

import { Injectable, NotFoundException} from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    getAllTodos(): Todo[] {
        return this.todos;
    }

    getTodoById(id: string): Todo {
        const found = this.todos.find(task => task.id === id);

        if(!found) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        return found;
    }

    createTodo(createTodoDto: CreateTodoDto): Todo {
        const { description } = createTodoDto;

        const todo: Todo = {
            id: uuid(),
            description,
            status: TodoStatus.IN_PROGRESS,
        }
        this.todos.push(todo);
        return todo;
    }

    deleteTodo(id: string): void {
        const found = this.getTodoById(id);
        this.todos = this.todos.filter(task => task.id !== found.id);
    }

    updateTodoStatus(id: string, status: TodoStatus): Todo {
        const todo = this.getTodoById(id);
        todo.status = status;
        return todo;
    }
}
