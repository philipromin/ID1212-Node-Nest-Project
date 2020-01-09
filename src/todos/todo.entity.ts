import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TodoStatus } from "./todo-status.enum";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    status: TodoStatus;
}