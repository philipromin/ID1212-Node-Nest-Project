import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatusValidationPipe } from './pipes/todo-status-validation.pipe';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
    constructor(private taskService: TodosService){}

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

    /*   
    @Get() 
    getAllTodos(): Todo[] {
        return this.taskService.getAllTodos();
    }

 

   


    @Patch('/:id/status')
    updateTodoStatus(
        @Param('id') id: string,
        @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    ): Todo {
        return this.taskService.updateTodoStatus(id, status);
    } 
    */
}
