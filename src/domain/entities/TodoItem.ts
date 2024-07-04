import { Column, Entity, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class TodoItem extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: "boolean", default: false })
  completed: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "timestamp", nullable: true })
  dateOfCompletion: Date;

  @Column()
  // @ManyToOne(() => User, (user) => user.item)
  createdBy: string;
}
