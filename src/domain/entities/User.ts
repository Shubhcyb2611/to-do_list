import { Column, OneToMany, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { TodoItem } from "./TodoItem";

export class User extends BaseEntity{
    @Column()
    name : string ;

    @OneToMany(() => TodoItem , item => item.createdBy)
    item : Relation<TodoItem>
}