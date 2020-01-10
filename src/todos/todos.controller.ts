import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipe';
import { Todo } from './todo.entity';
import { TodoStatus } from './todo-status.enum';
import { GetTodosFilterDto } from './dto/get-todo-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
    constructor(private taskService: TodosService){}

    @Get() 
    getTodos(
        @Query(ValidationPipe) filterDto: GetTodosFilterDto,
        @GetUser() user: User 
    ): Promise<Todo[]> {
        return this.taskService.getTodos(filterDto, user);
    }

    @Get('/:id')
    getTodoById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Todo> {
        return this.taskService.getTodoById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(
        @Body() createTodoDto: CreateTodoDto,
        @GetUser() user: User,
    ): Promise<Todo> {
        return this.taskService.createTodo(createTodoDto, user);
    }

    
    @Delete('/:id')
    deleteTodo(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.taskService.deleteTodo(id, user);
    }

    @Patch('/:id/status')
    updateTodoStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TodoStatusValidationPipe) status: TodoStatus,
        @GetUser() user: User,
    ): Promise<Todo> {
        return this.taskService.updateTodoStatus(id, status, user)
    } 
}
