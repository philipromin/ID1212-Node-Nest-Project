import * as uuid from 'uuid/v1';

import { Injectable} from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    getAllTodos(): Todo[] {
        return this.todos;
    }

    getTodoById(id: string): Todo {
        return this.todos.find(task => task.id === id);
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

    deleteTodo(id: string) {
        this.todos = this.todos.filter(task => task.id !== id);
    }

    updateTodoStatus(id: string, status: TodoStatus): Todo {
        const todo = this.getTodoById(id);
        todo.status = status;
        return todo;
    }
}
