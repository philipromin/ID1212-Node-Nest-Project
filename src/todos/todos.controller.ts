import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipe';
import { Todo } from './todo.entity';
import { TodoStatus } from './todo-status.enum';
import { GetTodosFilterDto } from './dto/get-todo-filter.dto';

@Controller('todos')
export class TodosController {
    constructor(private taskService: TodosService){}

    @Get() 
    getTodos(@Query(ValidationPipe) filterDto: GetTodosFilterDto) {
        return this.taskService.getAllTodos();
    }

    @Get('/:id')
    getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
        return this.taskService.getTodoById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.taskService.createTodo(createTodoDto);
    }

    
    @Delete('/:id')
    deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTodo(id);
    }

    @Patch('/:id/status')
    updateTodoStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    ): Promise<Todo> {
        return this.taskService.updateTodoStatus(id, status);
    } 
}
