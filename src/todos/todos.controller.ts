import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo, TodoStatus } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private taskService: TodosService){}

    @Get() 
    getAllTodos(): Todo[] {
        return this.taskService.getAllTodos();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Todo {
        return this.taskService.getTodoById(id);
    }

    @Post()
    createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
        return this.taskService.createTodo(createTodoDto);
    }

    @Delete('/:id')
    deleteTodo(@Param('id') id: string): void {
        this.taskService.deleteTodo(id);
    }

    @Patch('/:id/status')
    updateTodoStatus(
        @Param('id') id: string,
        @Body('status') status: TodoStatus,
    ): Todo {
        return this.taskService.updateTodoStatus(id, status);
    }
}
