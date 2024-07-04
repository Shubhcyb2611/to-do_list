import { Column, Entity, OneToMany, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { TodoItem } from "./TodoItem";

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => TodoItem, (item) => item.createdBy)
  item: Relation<TodoItem>;
}
