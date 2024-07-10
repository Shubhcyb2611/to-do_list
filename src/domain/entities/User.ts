import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  Relation,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { TodoItem } from "./TodoItem";
import bcrypt from "bcryptjs";

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  name: string;
  @Column({ nullable: true })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword() {
    if (this.password) {
      const hashedPassword = await bcrypt.hash(this.password, 12);
      this.password = hashedPassword;
    }
  }

  @OneToMany(() => TodoItem, (item) => item.createdBy)
  item: Relation<TodoItem>;
}
